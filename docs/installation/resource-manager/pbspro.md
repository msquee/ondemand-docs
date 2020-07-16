---
id: installation-resource-manager-pbspro
title: installation-resource-manager-pbspro
sidebar_label: Pbspro
---
Configure PBS Professional {#resource-manager-pbspro}
==========================

A YAML cluster configuration file for a PBS Professional resource
manager on an HPC cluster looks like:

``` {.yaml}
# /etc/ood/config/clusters.d/my_cluster.yml
---
v2:
  metadata:
    title: "My Cluster"
  login:
    host: "my_cluster.my_center.edu"
  job:
    adapter: "pbspro"
    host: "my_cluster-batch.my_center.edu"
    exec: "/opt/pbs"
   # bin_overrides:
      # qsub: "/usr/local/bin/qsub"
      # qselect: ""
      # qstat: ""
      # qhold: ""
      # qrls: ""
      # qdel: ""
```

with the following configuration options:

adapter

:   This is set to `pbspro`.

host

:   The host of the PBS Pro batch server.

exec

:   The installation path for the PBS Pro executables and libraries on
    the OnDemand host. For default installs from Github RPM releases
    this value should be `/opt/pbs`.

bin\_overrides

:   Replacements/wrappers for PBSPro\'s job submission and control
    clients. *Optional*

    Supports the following clients:

    -   [qsub]{.title-ref}
    -   [qselect]{.title-ref}
    -   [qstat]{.title-ref}
    -   [qhold]{.title-ref}
    -   [qrls]{.title-ref}
    -   [qdel]{.title-ref}
