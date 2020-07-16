---
id: authentication-overview-configure-authentication
title: authentication-overview-configure-authentication
sidebar_label: Configure Authentication
---
Configure Apache Authentication {#authentication-overview-configure-authentication}
===============================

Compile Authentication Module
-----------------------------

Open OnDemand uses [Apache HTTP Server
2.4](https://www.softwarecollections.org/en/scls/rhscl/httpd24/)
provided by Software Collections. This means that any Apache
authentication module (`mod_auth_*`) used will need to be compiled
against the `apxs` and `apr` tools that reside under:

``` {.text}
/opt/rh/httpd24/root/usr/bin
```

and **not** the versions that come with the default system version of
Apache HTTP Server.

Configure Authentication Module
-------------------------------

Any Apache authentication module specific configuration directives
(e.g., `OIDCCLientID`, `CASLoginURL`, \...) should reside outside of the
`/opt/rh/httpd24/root/etc/httpd/conf.d/ood-portal.conf`{.interpreted-text
role="file"} configuration file. The Apache configuration files are
loaded in lexical order, so placing these module specific configuration
directives in the file:

``` {.text}
/opt/rh/httpd24/root/etc/httpd/conf.d/auth-config.conf
```

will cause your authentication configuration directives to be loaded
before
`/opt/rh/httpd24/root/etc/httpd/conf.d/ood-portal.conf`{.interpreted-text
role="file"}. If there are any secrets inside this file you can ensure
privacy by adding restrictive file permissions:

``` {.sh}
sudo chmod 640 /opt/rh/httpd/root/etc/httpd/conf.d/auth-config.conf
```

Add to OnDemand Portal
----------------------

::: {.danger}
::: {.title}
Danger
:::

**Never** directly edit the
`/opt/rh/httpd24/root/etc/httpd/conf.d/ood-portal.conf`{.interpreted-text
role="file"} to include this authentication module within your Open
OnDemand portal. This could cause future upgrades of OnDemand to break.
:::

Edit the YAML configuration file for the
`ood-portal-generator`{.interpreted-text role="ref"} located under
`/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"}. For
example, to add support for an authentication module with `AuthType` of
`my-auth`, you would modify the
`/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"} file as
such:

``` {.yaml}
# /etc/ood/config/ood_portal.yml
---
# ...
# Your other custom configuration options...
# ...

auth:
  - 'AuthType my-auth'
  - 'Require valid-user'
```

You would then build and install the new Apache configuration file with:

``` {.sh}
sudo /opt/ood/ood-portal-generator/sbin/update_ood_portal
```

Finally you will need to restart your Apache HTTP Server for the changes
to take effect.

::: {.note}
::: {.title}
Note
:::

You can find more `ood-portal-generator`{.interpreted-text role="ref"}
configuration examples under
`ood-portal-generator-examples`{.interpreted-text role="ref"}.
:::

Sanitize Session Information
----------------------------

You will need to sanitize any session-specific request headers that may
be passed to the backend web servers that a user is proxied to. For most
Apache authentication modules there are module-specific directives that
can be enabled to wipe session information from being passed as headers
(e.g., `OIDCStripCookies ...`). In other cases you may have to use
regular expressions to search for the session cookies and remove them
manually.

For example, Shibboleth does not have a directive to strip session
information from the cookies, so we accomplish this with the following
options in our `ood-portal-generator`{.interpreted-text role="ref"}
configuration file:

``` {.yaml}
# /etc/ood/config/ood_portal.yml
---
# ...
# Your other custom configuration options...
# ...

auth:
  - 'AuthType shibboleth'
  - 'ShibRequestSetting requireSession 1'
  - 'RequestHeader edit* Cookie "(^_shibsession_[^;]*(;\s*)?|;\s*_shibsession_[^;]*)" ""'
  - 'RequestHeader unset Cookie "expr=-z %{req:Cookie}"'
  - 'Require valid-user'
```

where we use a regular expression to replace any `shibsession` cookies
with empty strings and delete the cookie header if it becomes empty.
