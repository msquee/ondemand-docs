---
id: infrastructure-mod-ood-proxy-handlers-pun-proxy-handler
title: infrastructure-mod-ood-proxy/handlers-pun-proxy-handler
sidebar_label: Pun Proxy-handler
---
pun\_proxy\_handler {#pun-proxy-handler}
===================

This handler proxies a user\'s traffic to his/her backend PUN listening
on a protected Unix domain socket. If the user\'s PUN is down, then this
handler will attempt to start up their PUN process.

::: {.note}
::: {.title}
Note
:::

This handler requires the `nginx-handler`{.interpreted-text role="ref"}
to initialize an app\'s NGINX configuration file if the app does not
exist in the backend PUN.
:::

Configuration
-------------

Configuration is handled by setting CGI environment variables within the
Apache configuration file with the following format:

``` {.apache}
SetEnv ARG_FOR_LUA "value of argument"
```

::: {.envvar}
OOD\_USER\_MAP\_CMD

Absolute path to the script that maps the authenticated user name to the
local user name. See `ood-auth-map`{.interpreted-text role="ref"}.
:::

::: {.envvar}
OOD\_USER\_ENV

*Optional*

Points to the CGI environment variable that stores the authenticated
user name if different than `REMOTE_USER`.
:::

::: {.envvar}
OOD\_MAP\_FAIL\_URI

*Optional*

URL the user redirected to if we fail to map the authenticated user name
to a local user name. If not specified then return an error message to
the user.
:::

::: {.envvar}
OOD\_PUN\_STAGE\_CMD

Absolute path to the script that stages the PUN processes. See
`nginx-stage`{.interpreted-text role="ref"}.
:::

::: {.envvar}
OOD\_PUN\_SOCKET\_ROOT

Absolute path to the directory that contains the user directories with
the corresponding Unix domain socket files. Under a default installation
this should be `/var/run/ondemand-nginx`.
:::

::: {.envvar}
OOD\_PUN\_MAX\_RETRIES

Maximum number of attempts to start up a user\'s PUN before giving up
and displaying an error to the user. Recommended value is `5`.
:::

::: {.envvar}
OOD\_NGINX\_URI

The base URI that namespaces the `nginx-handler`{.interpreted-text
role="ref"} from the other handlers. Recommended value is `/nginx`.
:::
