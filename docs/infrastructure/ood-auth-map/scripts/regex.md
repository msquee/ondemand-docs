---
id: infrastructure-ood-auth-map-scripts-regex
title: infrastructure-ood-auth-map/scripts-regex
sidebar_label: Regex
---
ood\_auth\_map.regex {#ood-auth-map-regex}
====================

This script parses the authenticated username using a regular expression
pattern to capture the local system username. The default regular
expression if none is provided is to just *echo* back the supplied
authenticated username. If no local system username is captured by the
regular expression, then a blank string is returned.

``` {.sh}
bin/ood_auth_map.regex [OPTIONS] <REMOTE_USER>
```

::: {.program}
ood\_auth\_map.regex
:::

General Options
---------------

::: {.option}
-r \<regex\>, \--regex \<regex\>

Default: `^(.+)$`

The regular expression used to capture the local system username.
:::

Examples
--------

To echo back the username supplied (useful for LDAP authentication):

``` {.sh}
$ bin/ood_auth_map.regex 'bob'
bob
$
```

To capture the local username from a common Shibboleth supplied remote
username:

``` {.sh}
$ bin/ood_auth_map.regex --regex '^(\w+)@center.edu$' 'bob@center.edu'
bob
$
```

Recall that if no match is found from the supplied regular expression
and authenticated username that an empty string is returned instead:

``` {.sh}
$ bin/ood_auth_map.regex --regex '^(\w+)@center.edu$' 'bob@mit.edu'

$
```
