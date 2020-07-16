---
id: infrastructure-ood-portal-generator-examples-default-authentication
title: infrastructure-ood-portal-generator/examples-default-authentication
sidebar_label: Default Authentication
---
Default Authentication
======================

The default `ood-portal-generator`{.interpreted-text role="program"}
configuration sets up the Apache configuration file to use HTTP Basic
authentication to restrict access by looking up users in plain text
password files.

``` {.yaml}
# /etc/ood/config/ood_portal.yml
---

auth:
  - "AuthType Basic"
  - "AuthName \"private\""
  - "AuthUserFile \"/opt/rh/httpd24/root/etc/httpd/.htpasswd\""
  - "RequestHeader unset Authorization"
  - "Require valid-user"
```

Where the `RequestHeader` setting is used to strip private session
information from being sent to the backend web servers.

By default it will look up users in the following password file:

    /opt/rh/httpd24/root/etc/httpd/.htpasswd

You can read about the [basics of password
files](https://httpd.apache.org/docs/2.4/howto/auth.html#gettingitworking)
for more information on setting up this file.

::: {.warning}
::: {.title}
Warning
:::

The user name specified in the password file must correspond to a system
user, but the passwords need not match.
:::
