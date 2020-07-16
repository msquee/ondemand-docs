---
id: installation-cluster-config-schema
title: installation-cluster-config-schema
sidebar_label: Cluster Config-schema
---
Cluster Config Schema v2 {#cluster-config-schema}
========================

The cluster config controls many OnDemand features including job
submission, shell access, names in menus.

First an example:
-----------------

Below is the production configuration for OSC\'s Owens cluster.

``` {.yaml}
---
v2:
  metadata:
    title: "Owens"
    url: "https://www.osc.edu/supercomputing/computing/owens"
    hidden: false
  login:
    host: "owens.osc.edu"
  job:
    adapter: "torque"
    host: "owens-batch.ten.osc.edu"
    lib: "/opt/torque/lib64"
    bin: "/opt/torque/bin"
    version: "6.0.1"
  acls:
  - adapter: "group"
    groups:
      - "cluster_users"
      - "other_users_of_the_cluster"
    type: "whitelist"
  custom:
    grafana:
          host: "https://grafana.osc.edu"
          orgId: 3
          dashboard:
            name: "ondemand-clusters"
            uid: "aaba6Ahbauquag"
            panels:
              cpu: 20
              memory: 24
          labels:
            cluster: "cluster"
            host: "host"
            jobid: "jobid"
  batch_connect:
      basic:
        script_wrapper: "module restore\n%s"
      vnc:
        script_wrapper: "module restore\nmodule load ondemand-vnc\n%s"
```

::: {.warning}
::: {.title}
Warning
:::

Quick warning: be aware that YAML requires the use of spaces as
indentation characters, tabs are not permitted by [the YAML
spec](http://yaml.org/spec/1.2/spec.html#id2777534).
:::

A Break Down
------------

### v2:

Version 2 is the current schema, and is the top level mapping for the
cluster configuration.

``` {.yaml}
---
v2:
```

### meta:

Meta describes how the cluster will be displayed to the user

``` {.yaml}
metadata:
    # title: is the display label that will be used anywhere the cluster is referenced
    title: "Owens"
    # url: provides the ability to show a link to information about the cluster
    url: "https://www.osc.edu/supercomputing/computing/owens"
    # hidden: setting this to true causes OnDemand to not show this cluster to the user, the cluster is still available for use by other applications
    hidden: false
```

### login:

Login controls what hosts should be used when trying to SSH via the
Shell app. Used by the Dashboard and the Job Composer (MyJobs).

``` {.yaml}
login:
  host: "owens.osc.edu"
```

### job:

The job mapping is specific to a cluster\'s resource manager.

``` {.yaml}
job:
  adapter: "torque"
  host: "owens-batch.ten.osc.edu"
  lib: "/opt/torque/lib64"
  bin: "/opt/torque/bin"
  version: "6.0.1"
```

#### bin\_overrides:

[bin\_overrides]{.title-ref} adds the ability for a site to specify full
paths to alternatives to the configured resource manager\'s client
executables. This advanced feature allows a site considerable flexibilty
to write wrappers to handle logging, environment or default setting, or
use 3rd party API compatible alternative clients without having to alter
the resource manager installation.

Adapter support for this feature is mixed. For example for Slurm
[sbatch]{.title-ref}, [scontrol]{.title-ref}, [scancel]{.title-ref} and
[squeue]{.title-ref} are all supported. For Torque only
[qsub]{.title-ref} is supported. Unsupported options are ignored.

### acls:

Access control lists provide a method to limit cluster access by group
membership. ACLs are implicitly whitelists but may be set explicitly to
either [whitelist]{.title-ref} or [blacklist]{.title-ref}.

Note that to look up group membership ood\_core uses the ood\_support
library which uses `id -G USERNAME` to get the list groups the user is
in, and `getgrgid` to look up the name of the group.

### custom:

The custom mapping is a space that is available for extension, and does
not have a schema. In OSC\'s usage the custom namespace has been used to
provide more cluster-specific information for in-house custom
applications.

For details on configuring Grafana see the
`Grafana Support <grafana-support>`{.interpreted-text role="ref"}
documentation.

### batch\_connect:

Batch connect controls the defaults for interactive applications such as
Jupyter or interactive desktops.

``` {.yaml}
batch_connect:
    basic:
      script_wrapper: "module restore\n%s"
    vnc:
      script_wrapper: "module restore\nmodule load ondemand-vnc\n%s"
```

Script wrappers may contain Bash statements, and are useful for setting
up a default environment, and or cleaning up after a script. The keys
[basic]{.title-ref} and [vnc]{.title-ref} refer to the two types of
batch connect application templates. [script\_wrapper\'s]{.title-ref}
have the content of a batch connect script interpolated into them.
String interpolation is performed using [sprintf]{.title-ref}, with the
script\'s content replacing the [%s]{.title-ref}.

::: {.note}
::: {.title}
Note
:::

The user is responsible for providing the [%s]{.title-ref} that is used
to place the script content. If a [script\_wrapper]{.title-ref} is
provided without [%s]{.title-ref} then batch connect applications are
unlikely to work properly.
:::
