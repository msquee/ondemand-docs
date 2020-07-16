---
id: infrastructure-ood-auth-map-usage
title: infrastructure-ood-auth-map-usage
sidebar_label: Usage
---
Usage {#ood-auth-map-usage}
=====

The `ood-auth-map`{.interpreted-text role="ref"} scripts are all
designed to take a URL-encoded authenticated username and map it to a
local system username. In all cases the included scripts follow the
given format:

``` {.sh}
bin/ood_auth_map.<TYPE> [OPTIONS] <REMOTE_USER>
```

Where `TYPE` can be either `regex` or `mapfile`.

A **successful** mapping will return the local username to `STDOUT`:

``` {.sh}
$ bin/ood_auth_map.mapfile http%3A%2F%2Fcilogon.org%2FserverA%2Fusers%2F50191
jnicklas
$
```

An **unsuccessful** mapping will return an empty string to `STDOUT`:

``` {.sh}
$ bin/ood_auth_map.regex -r '^(\w+)@osc.edu$' jnicklas@gmail.com

$
```

::: {.note}
::: {.title}
Note
:::

The authenticated username can be specified as a URL-encoded string to
avoid having to escape special characters in the shell.
:::

For any of the provided scripts you can display a quick reference of the
capabilities offered by that script with:

``` {.sh}
bin/ood_auth_map.<TYPE> --help
```

::: {.toctree maxdepth="2" caption="Provided Scripts"}
scripts/regex scripts/mapfile
:::
