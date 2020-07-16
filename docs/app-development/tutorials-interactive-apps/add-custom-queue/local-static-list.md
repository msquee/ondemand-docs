---
id: app-development-tutorials-interactive-apps-add-custom-queue-local-static-list
title: app-development-tutorials-interactive-apps/add-custom-queue-local-static-list
sidebar_label: Local Static-list
---
Use a Local Static List {#app-development-tutorials-interactive-apps-add-custom-queue-local-static-list}
=======================

The *simplest* customization can be done by defining a static list of
queues/partitions within the Interactive App that a user can submit the
batch job to. This is accomplished by:

1.  `app-development-tutorials-interactive-apps-add-custom-queue-local-static-list-add-custom-attribute`{.interpreted-text
    role="ref"}
2.  `app-development-tutorials-interactive-apps-add-custom-queue-local-static-list-handle-custom-attribute`{.interpreted-text
    role="ref"}

Add Custom Attribute to Form {#app-development-tutorials-interactive-apps-add-custom-queue-local-static-list-add-custom-attribute}
----------------------------

We want to **replace** the `bc_queue` form attribute with a custom HTML
`<select>` element (a drop-down list of options).

::: {.note}
::: {.title}
Note
:::

You can read more about customizing attributes in the `form.yml` file
for Interactive Apps under the
`interactive-development-form-customizing-attributes`{.interpreted-text
role="ref"} section.
:::

1.  We first start with the default `form.yml` for the Jupyter
    Interactive App:

    ``` {.yaml}
    # ~/ondemand/dev/jupyter/form.yml
    ---
    cluster: "my_cluster"
    attributes:
      modules: "python"
      extra_jupyter_args: ""
    form:
      - modules
      - extra_jupyter_args
      - bc_account
      - bc_queue
      - bc_num_hours
      - bc_num_slots
      - bc_email_on_started
    ```

2.  Next we remove the `bc_queue` field from our `form.yml` for the
    Jupyter Interactive App by removing the following line from this
    file:

    ``` {.yaml}
    - bc_account
    - bc_queue
    - bc_num_hours
    ```

    Now when we refresh the web page for our sandbox Jupyter App we
    won\'t see the \"Queue\" form element anymore.

3.  We now add in our custom drop-down attribute with a defined list of
    queues/partitions:

    ``` {.yaml}
    # ~/ondemand/dev/jupyter/form.yml
    ---
    cluster: "my_cluster"
    attributes:
      modules: "python"
      extra_jupyter_args: ""
      custom_queue:
        label: Queue
        help: Please select a queue from the drop-down.
        widget: select
        options:
          - [ "Queue 1", "queue1" ]
          - [ "Queue 2", "queue2" ]
    form:
      - modules
      - extra_jupyter_args
      - bc_account
      - custom_queue
      - bc_num_hours
      - bc_num_slots
      - bc_email_on_started
    ```

    Now when we refresh the web page for our sandbox Jupyter App we will
    see a \"Queue\" form element with a drop-down that lists \"queue1\"
    and \"queue2\". Underneath this will be our custom help message
    defined above.

    ::: {.note}
    ::: {.title}
    Note
    :::

    An attribute with the field `widget: select` expects an `options:`
    field with an array of pairs. The first string in the pair is the
    option text and the second string in the pair is the option value.

    For example:

    ``` {.yaml}
    widget: select
    options:
      - [ "Volvo", "volvo" ]
      - [ "Ford", "ford" ]
      - [ "Toyota", "toyota" ]
    ```

    The user will see a list of options: \"Volvo\", \"Ford\", and
    \"Toyota\" to choose from in the HTML form, but the backend will
    process a value of either \"volvo\", \"ford\", or \"toyota\"
    depending on what the user chose.
    :::

Handle Custom Attribute in Job Submission {#app-development-tutorials-interactive-apps-add-custom-queue-local-static-list-handle-custom-attribute}
-----------------------------------------

Now that we have our custom form attribute called `custom_queue`, we
need to tell our app how to handle it when submitting the job. As of
right now our app has no idea what to do with this value when the user
clicks \"Launch\" after filling out the form.

::: {.note}
::: {.title}
Note
:::

You can read more about customizing submission arguments in the
`submit.yml.erb` file for Interactive Apps under the
`app-development-interactive-submit`{.interpreted-text role="ref"}
section.
:::

1.  We first start with the default `submit.yml.erb` for the Jupyter
    Interactive App:

    ``` {.yaml}
    # ~/ondemand/dev/jupyter/submit.yml.erb
    ---
    batch_connect:
      template: "basic"
    ```

2.  We now create a `script:` section if it doesn\'t already exist and
    handle the value of the `custom_queue` attribute submitted by the
    user:

    ``` {.yaml}
    # ~/ondemand/dev/jupyter/submit.yml.erb
    ---
    batch_connect:
      template: "basic"
    script:
      queue_name: <%= custom_queue %>
    ```

    Where we take advantage of the generic
    [OodCore::Job::Script\#queue\_name](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script#queue_name-instance_method)
    method to supply a queue/partition that is resource manager (e.g.,
    Slurm, Torque, \...) agnostic.

    ::: {.note}
    ::: {.title}
    Note
    :::

    For the queue/partition we do not need to use the `native:` field
    which **must be** customized for the specific resource manager you
    are leveraging.

    You can find a list of generic fields that are resource manager
    agnostic under the
    [OodCore::Job::Script](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script)
    documentation.
    :::
