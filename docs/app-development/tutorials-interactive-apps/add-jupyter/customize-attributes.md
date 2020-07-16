---
id: app-development-tutorials-interactive-apps-add-jupyter-customize-attributes
title: app-development-tutorials-interactive-apps/add-jupyter-customize-attributes
sidebar_label: Customize Attributes
---
Customize Attributes {#app-development-tutorials-interactive-apps-add-jupyter-customize-attributes}
====================

Now we will customize the app to work on a given cluster. Be sure that
you walk through
`app-development-tutorials-interactive-apps-add-jupyter-software-requirements`{.interpreted-text
role="ref"} for the given cluster ahead of time.

The main responsibility of the `form.yml` file
(`app-development-interactive-form`{.interpreted-text role="ref"})
located in the root of the app is for defining the attributes (their
values or HTML form elements) used when generating the batch script.

1.  We will begin by adding a cluster for the Jupyter app to use. You do
    this by editing the `form.yml` in your favorite editor as such:

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

    where we replace `my_cluster` with a valid cluster that corresponds
    to a cluster configuration file located under
    `/etc/ood/config/clusters.d/{my_cluster}.yml`{.interpreted-text
    role="file"}.

2.  We will also edit the module(s) that is(are) required to be loaded
    within our batch job to get a Jupyter Notebook Server running:

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

    where we replace `python` with a list of required modules for our
    given cluster.

    This will be called within the batch script as:

    ``` {.sh}
    module load <modules>
    ```

3.  We test our changes by again clicking the *Launch Jupyter Notebook*
    button back in our details view of our sandbox app.

4.  You should see a web form for the Jupyter app. Fill in the form now
    and try to *Launch* a Jupyter batch job.

    ::: {.note}
    ::: {.title}
    Note
    :::

    While you are waiting for the job to start it is **recommended**
    that you click the link under the \"Session ID:\". This will open
    the File Explorer in the working directory of the currently launched
    Jupyter batch job.

    Useful debugging files (before job runs):

    `user_defined_context.json`

    :   attributes submitted by the user in the web form

    `job_script_content.sh`

    :   the batch script content

    `job_script_options.json`

    :   the job submission parameters (this will be used in the next
        section if you have trouble submitting the job)

    `/var/log/ondemand-nginx/<user>/error.log`

    :   the per-user NGINX (PUN) log file (this will contain the command
        line called when submitting the batch job, look for
        `execve=...`)

    Useful debugging files (after job runs):

    `output.log`

    :   this is the log file of the batch job (useful if batch job runs
        but then dies abruptly)
    :::

Continue to the next section to learn about job submission parameters.

::: {.note}
::: {.title}
Note
:::

It is recommended you commit any changes you made to `form.yml` to
[git](https://git-scm.com/).

``` {.sh}
git commit form.yml -m 'updated form with cluster attributes'
```
:::
