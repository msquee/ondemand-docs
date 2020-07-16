---
id: app-development-interactive-setup-software-requirements
title: app-development-interactive/setup-software-requirements
sidebar_label: Software Requirements
---
Software Requirements {#app-development-interactive-setup-software-requirements}
=====================

A class of `interactive`{.interpreted-text role="ref"} will need a VNC
server on the compute node (e.g., the Desktop app). This requires the
following software to be installed on the nodes that the batch job
submitted by the Interactive App is meant to run on, **NOT** the
OnDemand node.

For VNC server support:

-   [nmap-ncat](https://nmap.org/ncat/)
-   [TurboVNC](https://turbovnc.org/) 2.1+
-   [websockify](https://github.com/novnc/websockify) 0.8.0+

::: {.warning}
::: {.title}
Warning
:::

Do **NOT** install the above software on the **OnDemand node**. The
above software requirements are **ONLY** for the **compute nodes** you
intend on launching Desktops on within batch jobs.
:::
