---
id: infrastructure-nginx-stage-commands-app-list
title: infrastructure-nginx-stage/commands-app-list
sidebar_label: App List
---
nginx\_stage app\_list {#nginx-stage-app-list}
======================

This command lists all the deployed web application NGINX configuration
files.

``` {.sh}
sudo nginx_stage app_list [OPTIONS]
```

::: {.program}
nginx\_stage app\_list
:::

Examples
--------

To list all the deployed app configs:

``` {.sh}
sudo nginx_stage app_list
```

This will return the paths to all the deployed app configs.
