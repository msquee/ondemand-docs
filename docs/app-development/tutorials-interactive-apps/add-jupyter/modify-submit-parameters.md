---
id: app-development-tutorials-interactive-apps-add-jupyter-modify-submit-parameters
title: app-development-tutorials-interactive-apps/add-jupyter-modify-submit-parameters
sidebar_label: Modify Submit-parameters
---
Modify Submit Parameters {#app-development-tutorials-interactive-apps-add-jupyter-modify-submit-parameters}
========================

In some cases the Jupyter app batch job fails to submit to the given
cluster or you are not happy with the default chosen submission
parameters. This section explains how to modify the submission
parameters.

The main responsibility of the `submit.yml.erb` file
(`app-development-interactive-submit`{.interpreted-text role="ref"})
located in the root of the app is for modifying the underlying batch
script that is generated from an internal template and its submission
parameters.

::: {.note}
::: {.title}
Note
:::

The `.erb` file extension will cause the YAML configuration file to be
processed using the [eRuby (Embedded
Ruby)](https://en.wikipedia.org/wiki/ERuby) templating system. This
allows you to embed Ruby code into the YAML configuration file for flow
control, variable substitution, and more.
:::

The simplest `submit.yml.erb` will look like:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
```

Which only describes which internal template to use when generating the
batch script. From here we can add more options to the batch script,
such as:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
  set_host: "host=$(hostname -A | awk '{print $2}')"
```

where we override the `bash`{.interpreted-text role="command"} script
used to determine the host name of the compute node from within a
running batch job.

You can learn more about possible `batch_connect` options here:

<http://www.rubydoc.info/gems/ood_core/OodCore%2FBatchConnect%2FTemplate:initialize>

::: {.warning}
::: {.title}
Warning
:::

It is recommended any global `batch_connect` attributes be defined in
the corresponding cluster configuration file under:

    /etc/ood/config/clusters.d/my_cluster.yml

There is further discussion on this under
`app-development-interactive-setup-modify-cluster-configuration`{.interpreted-text
role="ref"}.
:::

But in most cases you will want to change the actual job submission
parameters (e.g., node type). These are defined under the `script`
option as:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
script:
  ...
```

You can read more about all the available `script` options here:

<http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script>

Although in most cases you will want to modify the `native` attribute,
which is resource manager dependent. Some examples are given below.

::: {.note}
::: {.title}
Note
:::

It is recommended you commit the changes you made to `submit.yml.erb` to
[git](https://git-scm.com/).

``` {.sh}
git commit submit.yml.erb -m 'updated batch job options'
```
:::

Slurm {#app-development-tutorials-interactive-apps-add-jupyter-modify-submit-parameters-slurm}
-----

For Slurm, you can choose the features on a requested node with:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
script:
  native:
    - "-N"
    - "<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>"
    - "-C"
    - "c12"
```

where we define the `sbatch`{.interpreted-text role="command"}
parameters as an array under `script` and `native`.

::: {.note}
::: {.title}
Note
:::

The `native` attribute is an array of command line arguments. So the
above example is equivalent to appending to `sbatch`{.interpreted-text
role="command"}:

``` {.sh}
sbatch ... -N <bc_num_slots> -C c12
```

The `bc_num_slots` shown above located within the ERB syntax is the
value returned from web form for \"Number of nodes\". We check if it is
blank and return a valid number (since it wouldn\'t make sense to return
`0`).
:::

Torque
------

For Torque, you can choose processors-per-node with:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
script:
  native:
    resources:
      nodes: "<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>:ppn=28"
```

::: {.note}
::: {.title}
Note
:::

See <http://www.rubydoc.info/gems/pbs/PBS%2FBatch:submit_script> for
more information on possible values for the `native` attribute.

The `bc_num_slots` shown above located within the ERB syntax is the
value returned from web form for \"Number of nodes\". We check if it is
blank and return a valid number (since it wouldn\'t make sense to return
`0`).
:::

PBS Professional
----------------

For most cases of PBS Professional you will want to modify how the
`bc_num_slots` (number of CPUs on a single node) is submitted to the
batch server.

This can be specified as such:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
script:
  native:
    - "-l"
    - "select=1:ncpus=<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>"
```

where we define the `qsub`{.interpreted-text role="command"} parameters
as an array under `script` and `native`.

If you would like to mimic how Torque handles `bc_num_slots` (number of
**nodes**), then we will first need to change the form label of
`bc_num_slots` that the user sees in the form. This can be done by
adding to the form configuration file the highlighted lines:

``` {.yaml}
# ~/ondemand/dev/jupyter/form.yml
---
cluster: "cluster1"
attributes:
  modules: "python"
  extra_jupyter_args: ""
  bc_num_slots:
    label: "Number of nodes"
form:
  - modules
  - extra_jupyter_args
  - bc_num_hours
  - bc_num_slots
  - bc_account
  - bc_queue
  - bc_email_on_started
```

Now when we click *Launch Jupyter Notebook* from the app details view,
the form in the browser will have the new label \"Number of nodes\"
instead of \"Number of CPUs on a single node\".

Next we will need to handle how we submit the `bc_num_slots` since it
means something different now. So we modify the job submission
configuration file as such:

``` {.yaml}
# ~/ondemand/dev/jupyter/submit.yml.erb
---
batch_connect:
  template: "basic"
script:
  native:
    - "-l"
    - "select=<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>:ncpus=28"
```

where we replace `ncpus=28` with the correct number for your cluster.
You can also append `mem=...gb` to the `select=...` statement if you\'d
like.

::: {.note}
::: {.title}
Note
:::

The `native` attribute is an array of command line arguments. So the
above example is equivalent to appending to `qsub`{.interpreted-text
role="command"}:

``` {.sh}
qsub ... -l select=<bc_num_slots>:ncpus=28
```

The `bc_num_slots` shown above located within the ERB syntax is the
value returned from web form for \"Number of nodes\". We check if it is
blank and return a valid number (since it wouldn\'t make sense to return
`0`).
:::

Other Resource Manager
----------------------

For most of our other adapters (aside from Torque) the `native`
attribute is an array of command line arguments formatted similarly to
the
`app-development-tutorials-interactive-apps-add-jupyter-modify-submit-parameters-slurm`{.interpreted-text
role="ref"} example above.
