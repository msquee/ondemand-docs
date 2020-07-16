---
id: app-development-tutorials-interactive-apps-add-jupyter-software-requirements
title: app-development-tutorials-interactive-apps/add-jupyter-software-requirements
sidebar_label: Software Requirements
---
Software Requirements {#app-development-tutorials-interactive-apps-add-jupyter-software-requirements}
=====================

The Jupyter app requires the following software to be installed on the
**compute** nodes that batch job is meant to run on, **NOT** the
OnDemand node:

-   [Jupyter Notebook](http://jupyter.readthedocs.io/en/latest/) 4.2.3+
    (earlier versions are untested but may work for you)
-   [OpenSSL](https://www.openssl.org/) 1.0.1+ (used to hash the Jupyter
    Notebook server password)

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
