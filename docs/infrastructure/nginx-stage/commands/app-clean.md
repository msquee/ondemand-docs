---
id: infrastructure-nginx-stage-commands-app-clean
title: infrastructure-nginx-stage/commands-app-clean
sidebar_label: App Clean
---
nginx\_stage app\_clean {#nginx-stage-app-clean}
=======================

This command will remove any deployed web application NGINX
configuration files for applications that don\'t exist anymore on the
file system.

``` {.sh}
sudo nginx_stage app_clean [OPTIONS]
```

::: {.program}
nginx\_stage app\_clean
:::

Examples
--------

To clean up all the stale app configs:

``` {.sh}
sudo nginx_stage app_clean
```

This displays the paths to all the app configs that were deleted.
