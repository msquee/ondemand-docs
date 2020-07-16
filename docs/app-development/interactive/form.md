---
id: app-development-interactive-form
title: app-development-interactive-form
sidebar_label: Form
---
User Form {#app-development-interactive-form}
=========

The configuration file `form.yml` is responsible for:

-   defining all the attributes used throughout the various ERB files
    (defined as the session context) that make up the Interactive App
-   setting the HTML form input or hard-coded value of each attribute
-   designating a cluster to submit the batch job to

It is located in the root of the application directory.

Assuming we already have a sandbox Interactive App deployed under:

    ${HOME}/ondemand/dev/my_app

The `form.yml` configuration file can be found at:

    ${HOME}/ondemand/dev/my_app/form.yml

Then in the browser, navigate to the `dashboard`{.interpreted-text
role="ref"} and choose in the top right menu: *Develop* → *My Sandbox
Apps (Development)*. Finally click *Launch My App* from the list of
sandbox apps.

You should now see the HTML form used to gather the user-defined
attributes for building and launching the `my_app` Interactive App
session.

::: {.tip}
::: {.title}
Tip
:::

You can include dynamically generated content in the form by renaming
the form file to `form.yml.erb` and incorporating ERB syntax.
:::

Configuration
-------------

::: {.describe}
cluster (String)

the cluster id that the Interactive App session is submitted to

::: {.warning}
::: {.title}
Warning
:::

The cluster id must correspond to a cluster configuration file located
under:

    /etc/ood/config/clusters.d
:::
:::

::: {.describe}
form (Array\<String\>)

a list of **all** the attributes that will be used as the context for
describing an Interactive App session

::: {.note}
::: {.title}
Note
:::

The attributes that appear as HTML form elements will appear to the user
in the order they are listed in this configuration option.
:::
:::

::: {.describe}
attributes (Hash)

the object defining the hard-coded value or HTML form element used for
the various custom attributes
:::

Attributes
----------

Attributes are *variables* whose values can be set either by the user
from within an HTML form or hard-coded to a specific value in the form
configuration. These attributes and their corresponding values are then
made available to the Interactive App through its intermediate steps:
`app-development-interactive-template`{.interpreted-text role="ref"} and
`app-development-interactive-submit`{.interpreted-text role="ref"}.

### Predefined Attributes {#app-development-interactive-form-predefined-attributes}

The Dashboard that supports these plugins provides the plugins with some
useful predefined attributes that can be included in the `form:`
configuration list with very little or no modification on the part of
the developer.

So a very simple `form.yml` that requests the user input a queue
followed by an account to submit the batch job (interactive session) to,
and then subsequently submits the job to that queue without any
customization on the part of the app developer can look like:

``` {.yaml}
# ${HOME}/ondemand/dev/my_app/form.yml
---
cluster: "owens"
form:
  - bc_queue
  - bc_account
```

The most commonly used predefined attributes are given as:

bc\_account

:   This adds a `text_field` to the HTML form that will be used as the
    charged account for the submitted job.

    This attribute gets directly set on
    [OodCore::Job::Script\#accounting\_id](http://www.rubydoc.info/gems/ood_core/OodCore%2FJob%2FScript:accounting_id).

bc\_queue

:   This adds a `text_field` to the HTML form that will supply the name
    of the queue that the batch job is submitted to.

    This attribute gets directly set on
    [OodCore::Job::Script\#queue\_name](http://www.rubydoc.info/gems/ood_core/OodCore%2FJob%2FScript:queue_name).

bc\_num\_hours

:   This adds a `number_field` to the HTML form that describes the
    maximum amount of hours the submitted batch job may run.

    This attribute gets converted to seconds and then set on
    [OodCore::Job::Script\#wall\_time](http://www.rubydoc.info/gems/ood_core/OodCore%2FJob%2FScript:wall_time).

bc\_num\_slots

:   This adds a `number_field` to the HTML form that describes the
    number of processors, CPUs on a single node, or nodes that the
    submitted job may use (depends on the resource manager used, e.g.,
    Torque, Slurm, \...).

    This attribute manipulates the brittle
    [OodCore::Job::Script\#native](http://www.rubydoc.info/gems/ood_core/OodCore%2FJob%2FScript:native)
    field with a value that depends on the given resource manager for
    the cluster.

    ::: {.warning}
    ::: {.title}
    Warning
    :::

    This predefined attribute is very resource manager specific, and is
    the most brittle of all the other predefined attributes. May require
    customization (see
    `interactive-development-form-customizing-attributes`{.interpreted-text
    role="ref"}) to work at your center.
    :::

bc\_email\_on\_started

:   This adds a `check_box` to the HTML form that determines whether the
    user should be notified by email when the batch job starts.

    This attribute sets value of
    [OodCore::Job::Script\#email\_on\_started](http://www.rubydoc.info/gems/ood_core/OodCore%2FJob%2FScript:email_on_started)
    depending on whether the user checked the box or not.

### Customizing Attributes {#interactive-development-form-customizing-attributes}

For each defined attribute in the `form:` configuration option, you can
modify/override any component that makes up the HTML form element in the
`attributes:` configuration option, e.g.:

``` {.yaml}
attributes:
  my_custom_attribute:
    label: "My custom label"
    ...
```

The available configuration options that can be modified for a given
attribute are:

::: {.describe}
widget (String, null)

the type of HTML form element to use for input

-   `text_field`
-   `text_area`
-   `number_field` - can use `min`, `max`, `step`
-   `check_box`
-   `select` - can use `options`
-   `hidden_field`
-   `resolution_field` (used for specifying resolution dimensions
    necessary for VNC)

Some other fields that have varying support across different browsers
include: `range_field`, `date_field`, `search_field`, `email_field`,
`telephone_field`, `url_field`, `password_field`.

Default

:   Accepts any text

    ``` {.yaml}
    widget: "text_field"
    ```

Example

:   Accepts only numbers

    ``` {.yaml}
    widget: "number_field"
    ```
:::

::: {.describe}
value (String, null)

the default value used for the input field

Default

:   None

    ``` {.yaml}
    value: ""
    ```

Example

:   Set default value of 5

    ``` {.yaml}
    value: "5"
    ```

::: {.warning}
::: {.title}
Warning
:::

Values get cached so that users do not need to repeat previous session
submissions. So this default value will only appear for the user if they
have no cached value.
:::
:::

::: {.describe}
label (String, null)

the label displayed above the input field

Default

:   Uses the name of the attribute

Example

:   Better describe the attribute

    ``` {.yaml}
    label: "Number of nodes"
    ```
:::

::: {.describe}
required (Boolean, null)

whether this field must be filled out before submitting the form

Default

:   Not required by default

    ``` {.yaml}
    required: false
    ```

Example

:   Make field required

    ``` {.yaml}
    required: true
    ```
:::

::: {.describe}
help (String, null)

help text that appears below the field (can be written in
[Markdown](https://en.wikipedia.org/wiki/Markdown))

Default

:   No help text appears below input field

    ``` {.yaml}
    help: null
    ```

Example

:   Leave a long descriptive help message using
    [Markdown](https://en.wikipedia.org/wiki/Markdown)

    ``` {.yaml}
    help: |
      Please fill in this field with **one** of the following
      options:

      - `red`
      - `blue`
      - `green`
    ```
:::

::: {.describe}
pattern (String, null)

a regular expression that the control\'s value is checked against (only
applies to widgets: `text_field`, `search_field`, `telephone_field`,
`url_field`, `email_field`, `password_field`)

Default

:   No pattern

    ``` {.yaml}
    pattern: null
    ```

Example

:   Only accept three letter country codes

    ``` {.yaml}
    pattern: "[A-Za-z]{3}"
    ```
:::

::: {.describe}
min (Integer, null)

specifies minimum value for this item, which must not be greater than
its maximum value (only applies to widget: `number_field`)

Default

:   No minimum value

    ``` {.yaml}
    min: null
    ```

Example

:   Set minimum value of 5

    ``` {.yaml}
    min: 5
    ```
:::

::: {.describe}
max (Integer, null)

specifies maximum value for this item, which must not be less than its
minimum value (only applies to widget: `number_field`)

Default

:   No maximum value

    ``` {.yaml}
    min: null
    ```

Example

:   Set maximum value of 15

    ``` {.yaml}
    min: 15
    ```
:::

::: {.describe}
step (Integer, null)

works with `min` and `max` options to limit the increments at which a
value can be set, it can be the string `"any"` or positive floating
point number (only applies to widget: `number_field`)

Default

:   No step size

    ``` {.yaml}
    step: null
    ```

Example

:   Only accept integer values

    ``` {.yaml}
    step: 1
    ```
:::

::: {.describe}
options (Array\<Array\<String\>\>, null)

a list of options for the `select` widget

Default

:   No options are supplied

    ``` {.yaml}
    options: []
    ```

Example

:   Provide a list of cars

    ``` {.yaml}
    options:
      - ["Volvo", "volvo"]
      - ["Ford", "ford"]
      - ["Toyota", "toyota"]
    ```

::: {.note}
::: {.title}
Note
:::

Typically the options are given as a list of pairs. The first string in
the pair is the option text and the second string in the pair is the
option value.

The user will see a list of options \"Volvo\", \"Ford\", and \"Toyota\"
to choose from in the HTML form, but the backend will process a value of
either \"volvo\", \"ford\", or \"toyota\" depending on what the user
chose.
:::
:::

Examples
--------

The simplest example consists of only a cluster id

``` {.yaml}
# ${HOME}/ondemand/dev/my_app/form.yml
---
cluster: "owens"
```

where we expect the Interactive App session to be submitted with the
following cluster configuration file:

    /etc/ood/config/clusters.d/owens.yml

After modifying the `form.yml` click *Launch My App* from the Dashboard
sandbox app list and you should be presented with **ONLY** a Launch
button, since we didn\'t define `form:` or `attributes:`.

### User-defined Attributes

The following configuration file

``` {.yaml}
# ${HOME}/ondemand/dev/my_app/form.yml
---
cluster: "owens"
form:
  - my_module_version
```

defines a session context attribute called `my_module_version`.

After modifying the `form.yml` click *Launch My App* from the Dashboard
sandbox app list and you will see an empty text box with the label \"My
Module Version\". The user can input any value here and launch the
Interactive App session. This value will be made available to the batch
job script and submission parameters that are discussed in a later
section.

### Hard-coded Attributes

The following configuration file

``` {.yaml}
# ${HOME}/ondemand/dev/my_app/form.yml
---
cluster: "owens"
form:
  - my_module_version
attributes:
  my_module_version: "2.2.0"
```

does two things:

-   it defines a context attribute called `my_module_version` in the
    `form:` configuration option
-   it then sets the value of `my_module_version` to `"2.2.0"` in the
    `attributes:` configuration option to later be used when defining
    the batch job script and/or submission parameters

The user will now **ONLY** be presented with a Launch button in the HTML
form because the attribute `my_module_version` is hard-coded, so there
is no need for a input text box.

### Customize User-defined Attributes

The following configuration file

``` {.yaml}
# ${HOME}/ondemand/dev/my_app/form.yml
---
cluster: "owens"
form:
  - my_module_version
attributes:
  my_module_version:
    widget: "number_field"
    label: "Module version #"
    required: true
    help: "Please input a version number between 1-10"
    min: 1
    max: 11
    step: 1
```

does two things:

-   it defines a context attribute called `my_module_version` in the
    `form:` configuration option
-   it then describes the HTML form element to use for the
    `my_module_version` attribute
