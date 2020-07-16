---
id: installation-resource-manager-torque
title: installation-resource-manager-torque
sidebar_label: Torque
---
Configure Torque {#resource-manager-torque}
================

A YAML cluster configuration file for a Torque/PBS resource manager on
an HPC cluster looks like:

``` {.yaml}
# /etc/ood/config/clusters.d/my_cluster.yml
---
v2:
  metadata:
    title: "My Cluster"
  login:
    host: "my_cluster.my_center.edu"
  job:
    adapter: "torque"
    host: "my_cluster-batch.my_center.edu"
    lib: "/path/to/torque/lib"
    bin: "/path/to/torque/bin"
  # bin_overrides:
      # qsub: "/usr/local/bin/qsub"
```

with the following configuration options:

adapter

:   This is set to `torque`.

host

:   The host of the Torque batch server.

lib

:   The path to the Torque client libraries.

bin

:   The path to the Torque client binaries.

bin\_overrides

:   Replacements/wrappers for Torque\'s job submission and control
    clients. *Optional*

    The Torque adapter uses the foreign function interface interact with
    [libtorque.so]{.title-ref} and so it is only possible to override
    [qsub]{.title-ref}.

::: {.warning}
::: {.title}
Warning
:::

The corresponding cluster\'s batch server will need to be configured
with the Open OnDemand server as a valid `submit_host` to allow the
`job-composer`{.interpreted-text role="ref"} to submit jobs to it.
:::
