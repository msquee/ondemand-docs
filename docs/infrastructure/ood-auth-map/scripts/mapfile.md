---
id: infrastructure-ood-auth-map-scripts-mapfile
title: infrastructure-ood-auth-map/scripts-mapfile
sidebar_label: Mapfile
---
ood\_auth\_map.mapfile {#ood-auth-map-mapfile}
======================

This script parses a mapfile with each entry given in the following
format:

    "authenticated_username" local_username

and separated by newlines. The script will systematically parse each
line in the mapfile looking for a match to the `authenticated_username`.
When a match is found it breaks from the scan and outputs the
`local_username` to `STDOUT`.

``` {.sh}
bin/ood_auth_map.mapfile [OPTIONS] <REMOTE_USER>
```

::: {.program}
ood\_auth\_map.mapfile
:::

General Options
---------------

::: {.option}
-f \<file\>, \--file \<file\>

Default: `/etc/grid-security/grid-mapfile`

File used to scan for matches.
:::

Examples
--------

To scan the default grid-mapfile using a URL-encoded authenticated
username:

``` {.sh}
$ bin/ood_auth_map.mapfile 'http%3A%2F%2Fcilogon.org%2FserverA%2Fusers%2F58606%40cilogon.org'
bob
$
```

To scan a custom mapfile using an authenticated username:

``` {.sh}
$ bin/ood_auth_map.mapfile --file '/path/to/mapfile' 'opaque_remote_username'
bob
$
```

Recall that if no match is found within the mapfile for the supplied
authenticated username that an empty string is returned instead:

``` {.sh}
$ bin/ood_auth_map.mapfile 'this_remote_username_does_not_exist'

$
```
