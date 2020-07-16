---
id: app-development-tutorials-interactive-apps-add-rstudio-software-requirements
title: app-development-tutorials-interactive-apps/add-rstudio-software-requirements
sidebar_label: Software Requirements
---
Software Requirements {#app-development-tutorials-interactive-apps-add-rstudio-software-requirements}
=====================

The RStudio app requires the following software to be installed on the
**compute** nodes that that batch job is meant to run on, **NOT** the
OnDemand node:

-   [R](https://www.r-project.org/)
-   [RStudio](https://www.rstudio.com/)
-   [Singularity](https://www.sylabs.io/) (2.x or 3.x)

**Optional** (but recommended) software:

-   [Lmod](https://www.tacc.utexas.edu/research-development/tacc-projects/lmod)
    6.0.1+ or any other CLI tool used to load appropriate environments
    within the batch job before launching the RStudio Server, e.g.,

``` {.sh}
module purge
module load R/3.5.2
```

::: {.warning}
::: {.title}
Warning
:::

Do **NOT** install the above software on the **OnDemand node**. The
above software requirements are **ONLY** for the **compute nodes** you
intend on launching the RStudio Server on within batch jobs.
:::

RPM based RStudio installations may attempt to install themselves as a
service, which is not desired in a batch computing environment.

``` {.sh}
# Prevent RStudio from running at start up
systemctl stop rstudio-server.service
systemctl disable rstudio-server.service
```

::: {.note}
::: {.title}
Note
:::

An example script which installs all the dependencies is available in
the cloned app at
`~/ondemand/dev/bc_example_rstudio/install-compute-dependencies.sh`.
:::
