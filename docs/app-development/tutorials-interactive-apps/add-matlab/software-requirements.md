---
id: app-development-tutorials-interactive-apps-add-matlab-software-requirements
title: app-development-tutorials-interactive-apps/add-matlab-software-requirements
sidebar_label: Software Requirements
---
Software Requirements {#app-development-tutorials-interactive-apps-add-matlab-software-requirements}
=====================

The MATLAB app requires the following software to be installed on the
**compute** nodes that batch job is meant to run on, **NOT** the
OnDemand node:

-   [MATLAB](https://www.mathworks.com/products/matlab.html)
-   [Xfce Desktop](https://xfce.org/) 4+ or [Mate
    Desktop](https://mate-desktop.org/) 1+ (provides window manager,
    terminal, file manager)
-   [OpenJDK runtime](https://openjdk.java.net/)
-   [VirtualGL](https://www.virtualgl.org/) 2.5+ only necessary to
    enable GPU acceleration; if you do not have GPU nodes available you
    do not need this

**Optional** (but recommended) software:

-   [Lmod](https://www.tacc.utexas.edu/research-development/tacc-projects/lmod)
    6.0.1+ or any other CLI tool used to load appropriate environments
    within the batch job before launching the Jupyter Notebook Server,
    e.g.,

    ``` {.sh}
    module purge
    module load python
    ```

::: {.warning}
::: {.title}
Warning
:::

Do **NOT** install the above software on the **OnDemand node**. The
above software requirements are **ONLY** for the **compute nodes** you
intend on launching the Jupyter Notebook Server on within batch jobs.
:::

::: {.note}
::: {.title}
Note
:::

We believe that the desktop based approach is superior, but are aware
that other sites may prefer an implemenation that does not require a
full desktop be installed. [Fluxbox](http://fluxbox.org/) is a window
manager that has been used in place of XFCE/Mate. An example of OSC\'s
deprecated [Fluxbox based
implementation](https://github.com/OSC/bc_osc_matlab/tree/bcff07264b318688c3f4272a9662b13477833373/template)
is available on Github.
:::
