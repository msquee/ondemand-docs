---
id: authentication-overview-map-user
title: authentication-overview-map-user
sidebar_label: Map User
---
Setup User Mapping {#authentication-overview-map-user}
==================

Every HTTP request sent to the OnDemand portal triggers a call to the
`ood-auth-map`{.interpreted-text role="ref"} script to map the remote
authenticated user name to the local system user name. Mapping to the
local system user not only restricts access of OnDemand to local users
but it is also required by the OnDemand proxy to traffic the HTTP data
to the user\'s corresponding per-user NGINX (PUN) server.

The `ood-portal-generator`{.interpreted-text role="ref"} and its
corresponding `ood-portal-generator-configuration`{.interpreted-text
role="ref"} are used to configure both the system command that performs
the mapping (`user_map_cmd
<ood-portal-generator-user-map-cmd>`{.interpreted-text role="ref"}) and
the argument fed to the system command
(`user_env <ood-portal-generator-user-env>`{.interpreted-text
role="ref"}). By default these configuration options are defined as:

``` {.yaml}
# /etc/ood/config/ood_portal.yml
---
# ...
user_map_cmd: '/opt/ood/ood_auth_map/bin/ood_auth_map.regex'
user_env: 'REMOTE_USER'
```

which uses `ood-auth-map`{.interpreted-text role="ref"} for the mapping
command and `REMOTE_USER` (this variable holds the name of the
authenticated user by the web server) as its command line argument.

This is equivalent to calling from the command line:

``` {.sh}
/opt/ood/ood_auth_map/bin/ood_auth_map.regex "$REMOTE_USER"
```

which just echos back the value of `REMOTE_USER`.

::: {.note}
::: {.title}
Note
:::

The default user mapping employed by an OnDemand portal **directly**
maps the remote authenticated user name to the local user name. So the
Apache authentication module used is expected to set the correct local
user name in `REMOTE_USER`.
:::

Custom Mapping
--------------

As mentioned previously the `ood-portal-generator`{.interpreted-text
role="ref"} configuration options of interest are:

-   `user_map_cmd <ood-portal-generator-user-map-cmd>`{.interpreted-text
    role="ref"}
-   `user_env <ood-portal-generator-user-env>`{.interpreted-text
    role="ref"}

It is recommended you read the discussion on
`ood-auth-map`{.interpreted-text role="ref"} before modifying these
values.

After modifying `/etc/ood/config/ood_portal.yml`{.interpreted-text
role="file"} with the mapping you want you would then build and install
the new Apache configuration file with:

``` {.sh}
sudo /opt/ood/ood-portal-generator/sbin/update_ood_portal
```

Finally you will need to restart your Apache HTTP Server for the changes
to take effect.
