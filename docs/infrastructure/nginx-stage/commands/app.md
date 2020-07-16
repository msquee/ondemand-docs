---
id: infrastructure-nginx-stage-commands-app
title: infrastructure-nginx-stage/commands-app
sidebar_label: App
---
nginx\_stage app {#nginx-stage-app}
================

This command will generate a web application NGINX configuration file
and subsequently restart the NGINX process as the user.

``` {.sh}
sudo nginx_stage app [OPTIONS]
```

::: {.program}
nginx\_stage app
:::

Required Options
----------------

::: {.option}
-u \<user\>, \--user \<user\>

The user of the per-user NGINX process.
:::

::: {.option}
-r \<sub\_request\>, \--sub-request \<sub\_request\>

The request URI path beneath the sub-URI path.
:::

General Options
---------------

::: {.option}
-i \<sub\_uri\>, \--sub-uri \<sub\_uri\>

The sub-URI path in the request.
:::

::: {.option}
-N, \--skip-nginx

Skip execution of the per-user NGINX process.
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

To generate an app config from the request:

    http://ondemand.center.edu/pun/usr/jim/myapp/session/1

and subsequently restart the per-user NGINX process:

``` {.sh}
sudo nginx_stage app --user 'bob' --sub-uri '/pun' --sub-request '/usr/jim/myapp/session/1'
```

To generate **only** the app config:

``` {.sh}
sudo nginx_stage app --user 'bob' --sub-uri '/pun' --sub-request '/sys/dashboard' --skip-nginx
```

This will return the path to the app config and will not restart the
NGINX process.

### Default Installation

`app-mapping-table`{.interpreted-text role="numref"} details the mapping
between the requested URL path to the app root directory for in the
NGINX app config under a default installation.

> -   -   App type
>     -   URL path
>     -   File system path
>
> -   -   dev
>     -   `/dev/{app_name}/\*`{.interpreted-text role="file"}
>     -   `~{user}/ondemand/dev/{app_name}`{.interpreted-text
>         role="file"}
>
> -   -   usr
>     -   `/usr/{app_owner}/{app_name}/\*`{.interpreted-text
>         role="file"}
>     -   `/var/ww/ood/apps/usr/{app_owner}/gateway/{app_name}`{.interpreted-text
>         role="file"}
>
> -   -   sys
>     -   `/sys/{app_name}/\*`{.interpreted-text role="file"}
>     -   `/var/www/ood/apps/sys/{app_name}`{.interpreted-text
>         role="file"}
