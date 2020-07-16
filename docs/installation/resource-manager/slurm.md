---
id: installation-resource-manager-slurm
title: installation-resource-manager-slurm
sidebar_label: Slurm
---
Configure Slurm {#resource-manager-slurm}
===============

A YAML cluster configuration file for a Slurm resource manager on an HPC
cluster looks like:

``` {.yaml}
# /etc/ood/config/clusters.d/my_cluster.yml
---
v2:
  metadata:
    title: "My Cluster"
  login:
    host: "my_cluster.my_center.edu"
  job:
    adapter: "slurm"
    cluster: "my_cluster"
    bin: "/path/to/slurm/bin"
    conf: "/path/to/slurm.conf"
    # bin_overrides:
      # sbatch: "/usr/local/bin/sbatch"
      # squeue: ""
      # scontrol: ""
      # scancel: ""
```

with the following configuration options:

adapter

:   This is set to `slurm`.

cluster

:   The Slurm cluster name. *Optional*

bin

:   The path to the Slurm client installation binaries.

conf

:   The path to the Slurm configuration file for this cluster.
    *Optional*

bin\_overrides

:   Replacements/wrappers for Slurm\'s job submission and control
    clients. *Optional*

    Supports the following clients:

    -   [sbatch]{.title-ref}
    -   [squeue]{.title-ref}
    -   [scontrol]{.title-ref}
    -   [scancel]{.title-ref}

::: {.note}
::: {.title}
Note
:::

If you do not have a multi-cluster Slurm setup you can remove the
`cluster: "my_cluster"` line from the above configuration file.
:::

::: {.tip}
::: {.title}
Tip
:::

When installing Slurm ensure that all nodes on your cluster including
the node running the Open OnDemand server have the same
[MUNGE](https://dun.github.io/munge/) key installed. Read the [Slurm
Quick Start Administrator
Guide](https://slurm.schedmd.com/quickstart_admin.html) for more
information on installing and configuring Slurm itself.
:::
