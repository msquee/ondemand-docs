---
id: infrastructure-nginx-stage-usage
title: infrastructure-nginx-stage-usage
sidebar_label: Usage
---
Usage {#nginx-stage-usage}
=====

The `nginx_stage`{.interpreted-text role="program"} is meant to be run
as a privileged process so that it can fork and kill processes owned by
other users, as well as read and write to `root` owned files and
directories. It is therefore recommended to run it under a
`sudo`{.interpreted-text role="program"} environment.

::: {.note}
::: {.title}
Note
:::

All options to `nginx_stage`{.interpreted-text role="program"} can be
specified as URL-encoded strings to avoid having to escape special
characters in the shell.
:::

At any point you can display a quick reference of the capabilities
offered by `nginx_stage`{.interpreted-text role="program"} with:

``` {.sh}
nginx_stage [COMMAND] --help
```

::: {.toctree maxdepth="2" caption="Commands"}
commands/pun commands/app commands/app-reset commands/app-list
commands/app-clean commands/nginx commands/nginx-show
commands/nginx-list commands/nginx-clean
:::
