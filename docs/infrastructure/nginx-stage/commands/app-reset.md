---
id: infrastructure-nginx-stage-commands-app-reset
title: infrastructure-nginx-stage/commands-app-reset
sidebar_label: App Reset
---
nginx\_stage app\_reset {#nginx-stage-app-reset}
=======================

This command will update all the deployed application NGINX
configuration files using the current template.

``` {.sh}
sudo nginx_stage app_reset [OPTIONS]
```

::: {.program}
nginx\_stage app\_reset
:::

General Options
---------------

::: {.option}
-i \<sub\_uri\>, \--sub-uri \<sub\_uri\>

The sub-URI path in the request.
:::

::: {.note}
::: {.title}
Note
:::

The sub-URI corresponds to any reverse proxy namespace that denotes the
request should be proxied to the per-user NGINX server (e.g., `/pun`)
:::

Examples
--------

To update all the deployed app configs using the currently available
template:

``` {.sh}
sudo nginx_stage app_reset --sub-uri '/pun'
```

This will return the paths to the newly generated app configs.
