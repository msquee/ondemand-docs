---
id: authentication-overview-configure-logout
title: authentication-overview-configure-logout
sidebar_label: Configure Logout
---
Configure Logout {#authentication-overview-configure-logout}
================

The logout link on the dashboard is `/logout`. OnDemand\'s Apache config
has a separate directive to handle `/logout`, which by default redirects
the user to `/pun/sys/dashboard/logout`, which is a default logout page
displayed by the dashboard. Because authentication handled by Apache,
this approach enables the logout URL to be changed based on the
authentication strategy used.

To change the logout\_redirect URL, set
`logout_redirect: "https:://URL/TO/LOGOUT/USER"` in the
ood-portal-generator config at `/etc/ood/config/ood_portal.yml` and
regenerate the config.

::: {.describe}
logout\_redirect (String, null)

the URI the user is redirected to when accessing the logout URI above

Default

:   Redirect to the `dashboard`{.interpreted-text role="ref"} log out
    page

    ``` {.yaml}
    logout_redirect: "/pun/sys/dashboard/logout"
    ```

Using OpenID Connect Apache module

:   Redirect to the mod\_auth\_oidc logout location:

    ``` {.yaml}
    logout_redirect: "/oidc?logout=https%3A%2F%2Fondemand.my-center.edu"
    ```

Using Shibboleth Apache module

:   If the Shibboleth IdP server deployed is at idp.my-center.edu, this
    is an example redirect with mod\_auth\_shib:

    ``` {.yaml}
    logout_redirect: "/Shibboleth.sso/Logout?return=https%3A%2F%2Fidp.my-center.edu%2Fidp%2Fprofile%2FLogout"
    ```

    See `add-shibboleth-authentication`{.interpreted-text role="ref"}
    for more details regarding setting up authentication with the
    Shibboleth Apache module.
:::
