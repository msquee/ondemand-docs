---
id: infrastructure-mod-ood-proxy-handlers-nginx-handler
title: infrastructure-mod-ood-proxy/handlers-nginx-handler
sidebar_label: Nginx Handler
---
nginx\_handler {#nginx-handler}
==============

This handler provides the following HTTP request options:

::: {.note}
::: {.title}
Note
:::

This handler requires the `pun-proxy-handler`{.interpreted-text
role="ref"} for redirecting the user to after the app\'s NGINX
configuration file is generated.
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
OOD\_NGINX\_URI

The base URI that namespaces this handler from the other handlers.
Recommended value is `/nginx`.
:::

::: {.envvar}
OOD\_PUN\_URI

The base URI that namespaces the `pun-proxy-handler`{.interpreted-text
role="ref"} from the other handlers. Recommended value is `/pun`.
:::
