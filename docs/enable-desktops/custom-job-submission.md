---
id: enable-desktops-custom-job-submission
title: enable-desktops-custom-job-submission
sidebar_label: Custom Job-submission
---
Custom Job Submission {#enable-desktops-custom-job-submission}
=====================

The `app-development-interactive-submit`{.interpreted-text role="ref"}
configuration file describes how the batch job should be submitted to
your cluster. The location of this file **must** be specified in the
respective
`/etc/ood/config/apps/bc_desktop/{my_cluster}.yml`{.interpreted-text
role="file"} form configuration file, so that when a user submits the
form, the specified submission configuration is used when submitting the
batch job.

To customize job submission we will need to first edit our custom
desktop app `app-development-interactive-form`{.interpreted-text
role="ref"} YAML file as such:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/my_cluster.yml
---
title: "My Cluster Desktop"
cluster: "my_cluster"
submit: "submit/my_submit.yml.erb"
```

Notice we included the configuration option `submit` that points to our
custom `app-development-interactive-submit`{.interpreted-text
role="ref"} YAML configuration file. This can be an absolute file path
or a relative file path with respect to the
`/etc/ood/config/apps/bc_desktop/`{.interpreted-text role="file"}
directory.

::: {.note}
::: {.title}
Note
:::

The `*.erb` file extension will cause the YAML configuration file to be
processed using the [eRuby (Embedded
Ruby)](https://en.wikipedia.org/wiki/ERuby) templating system. This
allows you to embed Ruby code into the YAML configuration file for flow
control, variable substitution, and more.
:::

::: {.danger}
::: {.title}
Danger
:::

Do not put the `app-development-interactive-submit`{.interpreted-text
role="ref"} configuration file directly underneath
`/etc/ood/config/apps/bc_desktop`{.interpreted-text role="file"} or it
will think this an Interactive Desktop app. Instead we typically create
the directory `submit/`{.interpreted-text role="file"} underneath and
put our `app-development-interactive-submit`{.interpreted-text
role="ref"} configuration files underneath that.
:::

We can now create and modify the
`app-development-interactive-submit`{.interpreted-text role="ref"}
configuration file at:

    /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb

Since it has the extension `.erb` we can take advantage of the Ruby
language to make the configuration file dynamic. In particular, you will
now have access to the user-submitted form arguments defined as:

bc\_num\_hours

:   *Default:* `"1"`

    A Ruby `String` containing the number of hours a user requested for
    the Desktop batch job to run.

bc\_num\_slots

:   *Default:* `"1"`

    A Ruby `String` containing either the number of nodes or processors
    (depending on the type of resource manager the cluster uses) a user
    requested.

bc\_account

:   *Default:* `""`

    A Ruby `String` that holds the account the user supplied to charge
    the job against.

bc\_queue

:   *Default:* `""`

    A Ruby `String` that holds the queue the user requested for the job
    to run on.

bc\_email\_on\_started

:   *Default:* `"0"`

    A Ruby `String` that can either be `"0"` (do not send the user an
    email when the job starts) or `"1"` (send an email to the user when
    the job starts).

node\_type

:   *Default:* `""`

    A Ruby `String` that can be used for more advanced job submission.
    This is an advanced option that is disabled by default and does
    nothing if you do enable it, unless you add it to a custom job
    submission configuration file.

Some examples on how to submit jobs using the above form attributes are
given in the following sections for the given resource manager.

Slurm
-----

For most cases of Slurm you will want to modify how the `bc_num_slots`
(number of nodes) is submitted to the batch server.

This can be handled in your custom job submission configuration file as
such:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb
---
script:
  native:
    - "-N"
    - "<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>"
```

All [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script) are
underneath the `script` configuration option. In particular since there
is no option to modify number of nodes, we need to directly interact
with the `native` command line arguments. This is specified as an array
of `sbatch`{.interpreted-text role="command"} arguments.

::: {.note}
::: {.title}
Note
:::

It is recommended you use the corresponding [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script)
before using the `native` fallback.
:::

Torque
------

For most cases of Torque you will want to modify how the `bc_num_slots`
(number of nodes) is submitted to the batch server.

This can be handled in your custom job submission configuration file as
such:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb
---
script:
  native:
    resources:
      nodes: "<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>:ppn=28"
```

All [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script) are
underneath the `script` configuration option. In particular since there
is no option to modify number of nodes, we need to directly interact
with the `native` command line arguments.

For more information on the available options for the `native` attribute
when using Torque please see the [pbs-ruby
documentation](http://www.rubydoc.info/gems/pbs/PBS/Batch#submit_script-instance_method).

::: {.note}
::: {.title}
Note
:::

It is recommended you use the corresponding [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script)
before using the `native` fallback.
:::

PBS Professional
----------------

For most cases of PBS Professional you will want to modify how the
`bc_num_slots` (number of CPUs on a single node) is submitted to the
batch server.

This can be handled in your custom job submission configuration file as
such:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb
---
script:
  native:
    - "-l"
    - "select=1:ncpus=<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>"
```

All [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script) are
underneath the `script` configuration option. In particular since there
is no option to modify number of nodes/cpus, we need to directly
interact with the `native` command line arguments. This is specified as
an array of `qsub`{.interpreted-text role="command"} arguments.

If you would like to mimic how Torque handles `bc_num_slots` (number of
**nodes**), then we will first need to change the form label of
`bc_num_slots` that the user sees in the form. This can be done by
modifying our Desktop app local YAML configuration file:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb
---
title: "Cluster1 Desktop"
cluster: "cluster1"
attributes:
  bc_num_slots:
    label: "Number of nodes"
submit: "submit/my_submit.yml.erb"
```

Now when we go to the Desktop app form in our browser it will have the
new label \"Number of nodes\" instead of \"Number of CPUs on a single
node\".

Next we will need to handle how we submit the `bc_num_slots` since it
means something different now. So now modify the job submission
configuration file as such:

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/my_submit.yml.erb
---
script:
  native:
    - "-l"
    - "select=<%= bc_num_slots.blank? ? 1 : bc_num_slots.to_i %>:ncpus=28"
```

You can also append `mem=...gb` to the `select=...` statement if you\'d
like.

::: {.note}
::: {.title}
Note
:::

It is recommended you use the corresponding [batch script
options](http://www.rubydoc.info/gems/ood_core/OodCore/Job/Script)
before using the `native` fallback.
:::

LinuxHost Adapter
-----------------

If you\'re using the `resource-manager-linuxhost`{.interpreted-text
role="ref"} you actually don\'t *need* a specialized submit.yml.erb.
There is no need to specify resources like the other adapters above.

You can however, use it to override the adapter\'s global fields for
mount binding and specifying which container use.

``` {.yaml}
# /etc/ood/config/apps/bc_desktop/submit/linuxhost_submit.yml.erb
 ---
 batch_connect:
   native:
      singularity_bindpath: /etc,/media,/mnt,/opt,/run,/srv,/usr,/var,/fs,/home
      singularity_container: /usr/local/modules/netbeans/netbeans_2019.sif
```
