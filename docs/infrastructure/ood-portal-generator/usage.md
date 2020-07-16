---
id: infrastructure-ood-portal-generator-usage
title: infrastructure-ood-portal-generator-usage
sidebar_label: Usage
---
Usage {#ood-portal-generator-usage}
=====

The `ood-portal-generator`{.interpreted-text role="program"} tool takes
a user-defined YAML configuration file and generates an [Apache
configuration](https://httpd.apache.org/docs/2.4/configuring.html) file
from the provided template file. This Apache configuration file can then
be used in an Apache HTTP server to host an Open OnDemand portal.

The command that generates the Apache configuration file is given as:

``` {.sh}
bin/generate [OPTIONS]
```

At any point you can display a quick reference of the capabilities
offered by `bin/generate`{.interpreted-text role="program"} with:

``` {.sh}
bin/generate --help
# Usage: generate [options]
#    -c, --config CONFIG              YAML config file used to render template
#    -t, --template TEMPLATE          ERB template that is rendered
#    -o, --output OUTPUT              File that rendered template is output to
#    -v, --version                    Print current version
#    -h, --help                       Show this help message
#
# Default:
#  generate \
#    -c /etc/ood/config/ood_portal.yml \
#    -t /opt/ood/ood-portal-generator/templates/ood-portal.conf.erb
```

::: {.program}
ood-portal-generator
:::

Options
-------

::: {.option}
-c \<config\>, \--config \<config\>

the `ood-portal-generator`{.interpreted-text role="program"} YAML
configuration file

Default

:   `/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"}

Example

:   Use a local configuration file

    ``` {.sh}
    bin/generate -c my_conf.yml
    ```
:::

::: {.option}
-o \<output\>, \--output \<output\>

the Apache configuration file that is rendered

Default

:   piped to standard output

Example

:   Output Apache configuration file to local file

    ``` {.sh}
    bin/generate -o my_portal.conf
    ```
:::

::: {.option}
-t \<template\>, \--template \<template\>

the ERB template that is used to render the Apache configuration file

Default

:   use built-in template

Example

:   Use a custom ERB template for the Apache config (not recommended)

    ``` {.sh}
    bin/generate -t my_portal.conf.erb
    ```
:::
