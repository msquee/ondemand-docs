---
id: enable-desktops-software-requirements
title: enable-desktops-software-requirements
sidebar_label: Software Requirements
---
Software Requirements {#enable-desktops-software-requirements}
=====================

The interactive Desktop app requires a Desktop Environment be installed
on the nodes that the batch job is meant to run on, **NOT** the OnDemand
node.

The following desktops are currently supported:

-   [Xfce Desktop](https://xfce.org/) 4+
-   [Mate Desktop](https://mate-desktop.org/) 1+ (**default**)
-   [Gnome Desktop](https://www.gnome.org/) 2 (currently we do not
    support Gnome 3)

::: {.warning}
::: {.title}
Warning
:::

Do **NOT** install the Desktop Environment on the **OnDemand node**. The
above Desktop Environments are **ONLY** for the **compute or login
nodes** you intend on launching Desktops on within batch jobs.
:::
