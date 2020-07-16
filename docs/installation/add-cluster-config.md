---
id: installation-add-cluster-config
title: installation-add-cluster-config
sidebar_label: Add Cluster-config
---
Add Cluster Configuration Files {#add-cluster-config}
===============================

Cluster configuration files describe each cluster a user may submit jobs
to and login hosts the user can ssh to. Without cluster config files,
the only apps that work are the `dashboard`{.interpreted-text
role="ref"} and `files`{.interpreted-text role="ref"} apps, and
`shell`{.interpreted-text role="ref"} if you only want to support ssh to
localhost on the web host.

Apps that require proper cluster configuration include:

-   `shell`{.interpreted-text role="ref"} (connect to a cluster login
    node from the Dashboard App)
-   `active-jobs`{.interpreted-text role="ref"} (view a list of active
    jobs for the various clusters)
-   `job-composer`{.interpreted-text role="ref"} (submit jobs to various
    clusters)
-   All interactive apps such as Jupyter and RStudio

The cluster config files are where the
`resource-manager`{.interpreted-text role="ref"} configuration goes,
which is necessary for enabling apps to submit batch jobs.

1.  Create the default directory that the cluster configuration files
    reside under:

    ``` {.sh}
    sudo mkdir -p /etc/ood/config/clusters.d
    ```

2.  Create a cluster YAML configuration file for each HPC cluster you
    want to provide access to. They must have the `*.yml` extension.

    ::: {.note}
    ::: {.title}
    Note
    :::

    It is best to name the file after the HPC cluster it is defining.
    For example, we added the cluster configuration file
    `/etc/ood/config/clusters.d/oakley.yml`{.interpreted-text
    role="file"} for the Oakley cluster here at OSC.
    :::

    The *simplest* cluster configuration file for an HPC cluster with
    only a login node and **no resource manager** looks like:

    ``` {.yaml}
    # /etc/ood/config/clusters.d/my_cluster.yml
    ---
    v2:
      metadata:
        title: "My Cluster"
      login:
        host: "my_cluster.my_center.edu"
    ```

    Where `host` is the SSH server host for the given cluster.

    In production you will also want to add a resource manager. That is
    because the `active-jobs`{.interpreted-text role="ref"} and the
    `job-composer`{.interpreted-text role="ref"} won\'t be able to list
    or submit jobs without a defined resource manager.

    See `resource-manager`{.interpreted-text role="ref"} for how to
    modify the cluster config so OnDemand works with your particular
    resource manager.

::: {.toctree maxdepth="1" caption="Cluster Config"}
cluster-config-schema
:::
