---
id: infrastructure-nginx-stage-commands-nginx
title: infrastructure-nginx-stage/commands-nginx
sidebar_label: Nginx
---
nginx\_stage nginx {#nginx-stage-nginx}
==================

This command will start an NGINX process as the user as well as control
this process.

``` {.sh}
sudo nginx_stage nginx [OPTIONS]
```

::: {.program}
nginx\_stage nginx
:::

Required Options
----------------

::: {.option}
-u \<user\>, \--user \<user\>

The user of the per-user NGINX process.
:::

General Options
---------------

::: {.option}
-s \<signal\>, \--signal \<signal\>

Send the given signal to the per-user NGINX process.
:::

::: {.option}
-N, \--skip-nginx

Skip the execution of the per-user NGINX process.
:::

::: {.note}
::: {.title}
Note
:::

Under a default installation, the possible signals are
`stop/quit/reopen/reload`.
:::

::: {.note}
::: {.title}
Note
:::

If no signal is specified, then it will attempt to start the user\'s
per-user NGINX process.
:::

Examples
--------

To stop Bob\'s NGINX process:

``` {.sh}
sudo nginx_stage nginx --user 'bob' --signal 'stop'
```

This sends a `stop` signal to Bob\'s per-user NGINX process.

If you run `nginx_stage nginx --skip-nginx`{.interpreted-text
role="option"}, it will **only** display the system command that would
have been called.
