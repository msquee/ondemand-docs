---
id: enable-desktops-add-cluster
title: enable-desktops-add-cluster
sidebar_label: Add Cluster
---
Add a Cluster {#enable-desktops-add-cluster}
=============

We now need to add this cluster as a Desktop option in the Interactive
Apps list. All customization is done underneath the root directory
`/etc/ood/config/apps/bc_desktop`{.interpreted-text role="file"} which
requires escalated privileges to modify.

1.  Start by creating the working directory:

    ``` {.sh}
    mkdir -p /etc/ood/config/apps/bc_desktop
    ```

2.  For *each* cluster that we want to launch a Desktop session on we
    will need a corresponding
    `app-development-interactive-form`{.interpreted-text role="ref"}
    configuration file in YAML format located in this directory.

    Assuming we want to launch a desktop on OSC\'s Oakley cluster we
    would have:

    ``` {.yaml}
    # /etc/ood/config/apps/bc_desktop/oakley.yml
    ---
    title: "Oakley Desktop"
    cluster: "oakley"
    ```

    ::: {.warning}
    ::: {.title}
    Warning
    :::

    The `cluster` attribute above **MUST** match a valid cluster
    configuration file located underneath
    `/etc/ood/config/clusters.d/`{.interpreted-text role="file"}.
    :::

3.  Navigate to your OnDemand site, in particular the Dashboard App, and
    you should see in the top dropdown menu \"Interactive Apps\" ⇒
    \"Oakley Desktop\" (or whatever you set as the `title`).

    After choosing \"Oakley Desktop\" from the menu, you should be
    presented with a form to \"Launch\" a Desktop session to the given
    cluster.

    Most likely if you click \"Launch\" it will fail miserably. That is
    because we will need to configure the submission parameters for
    cluster\'s resource manager.

    ::: {.note}
    ::: {.title}
    Note
    :::

    If by some chance when you click \"Launch\" and it actually
    successfully submits a job to your cluster, it is **highly**
    recommended that you click the link under \"Session ID:\". This will
    open the `files`{.interpreted-text role="ref"} underneath the
    working directory of the batch job. This will allow you to read all
    the logs generated to help debug any issues that may crop up.
    :::
