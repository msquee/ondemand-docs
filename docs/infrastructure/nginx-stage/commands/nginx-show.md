---
id: infrastructure-nginx-stage-commands-nginx-show
title: infrastructure-nginx-stage/commands-nginx-show
sidebar_label: Nginx Show
---
nginx\_stage nginx\_show {#nginx-stage-nginx-show}
========================

This command will show the relevant details of a running per-user NGINX
(PUN) process for a given user.

``` {.sh}
sudo nginx_stage nginx_show [OPTIONS]
```

::: {.program}
nginx\_stage nginx\_show
:::

Required Options
----------------

::: {.option}
-u \<user\>, \--user \<user\>

The user of the per-user NGINX process.
:::

Examples
--------

To display the details of Bob\'s PUN process:

``` {.sh}
sudo nginx_stage nginx_show --user 'bob'
# User: bob
# Instance: 24214
# Socket: /var/run/ondemand-nginx/bob/passenger.sock
# Sessions: 1
```

Where `Sessions` is the number of active connections to the given Unix
domain socket file.
