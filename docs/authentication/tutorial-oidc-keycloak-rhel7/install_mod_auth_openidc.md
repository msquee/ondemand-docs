---
id: authentication-tutorial-oidc-keycloak-rhel7-install_mod_auth_openidc
title: authentication-tutorial-oidc-keycloak-rhel7-install_mod_auth_openidc
sidebar_label: Install_mod_auth_openidc
---
Configure OnDemand to authenticate with Keycloak {#authentication-tutorial-oidc-keycloak-rhel7-install-mod_auth_openidc}
================================================

OnDemand\'s Apache needs to use mod\_auth\_openidc to be able to act as
an OpenID Connect client to Keycloak. We will install mod\_auth\_openidc
and modify OnDemand\'s Apache configs to enable authentication via
Keycloak.

Install mod\_auth\_openidc
--------------------------

1.  Install httpd24-mod\_auth\_openidc from ondemand-web repo

    ``` {.sh}
    sudo yum install httpd24-mod_auth_openidc
    ```

Re-generate main config using ood-portal-generator
--------------------------------------------------

1.  Edit the YAML configuration file for the
    `ood-portal-generator`{.interpreted-text role="ref"} located under
    `/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"} as
    such:

    ``` {.yaml}
    # /etc/ood/config/ood_portal.yml
    ---
    # List of Apache authentication directives
    # NB: Be sure the appropriate Apache module is installed for this
    # Default: (see below, uses basic auth with an htpasswd file)
    auth:
      - 'AuthType openid-connect'
      - 'Require valid-user'

    # Redirect user to the following URI when accessing logout URI
    # Example:
    #     logout_redirect: '/oidc?logout=https%3A%2F%2Fwww.example.com'
    # Default: '/pun/sys/dashboard/logout' (the Dashboard app provides a simple
    # HTML page explaining logout to the user)
    logout_redirect: '/oidc?logout=https%3A%2F%2Fondemand-dev.hpc.osc.edu'

    # Sub-uri used by mod_auth_openidc for authentication
    # Example:
    #     oidc_uri: '/oidc'
    # Default: null (disable OpenID Connect support)
    oidc_uri: '/oidc'
    ```

    Notice that we are

    > -   changing the Authentication directives for openid-connect
    > -   specifying /oidc to be the sub-uri used by mod\_auth\_openidc
    > -   specifying that /logout should redirect to this /oidc sub-uri
    >     to handle logout and specifying after logout, the user should
    >     be redirected back to OnDemand (which in this tutorial\'s case
    >     is `https%3A%2F%2Fondemand-dev.hpc.osc.edu`, the query param
    >     escaped format of `https://ondemand-dev.hpc.osc.edu`)

2.  Then build and install the new Apache configuration file with:

    ``` {.sh}
    sudo /opt/ood/ood-portal-generator/sbin/update_ood_portal
    ```

    The effect of this change in the Apache config (in case you want to
    apply the changes manually) are:

    1.  Change the authentication directives for all of the Locations
        that require authentication i.e.:

        ``` {.diff}
        <Location "/nginx">
        -    AuthType Basic
        -    AuthName "Private"
        -    AuthUserFile "/opt/rh/httpd24/root/etc/httpd/.htpasswd"
        -    RequestHeader unset Authorization
        +    AuthType openid-connect
          Require valid-user

          LuaHookFixups nginx.lua nginx_handler
        </Location>
        ```

    2.  Update the `Redirect "logout"` directive

        ``` {.diff}
        -  Redirect "/logout" "/pun/sys/dashboard/logout"
        +  Redirect "/logout" "/oidc?logout=https%3A%2F%2Fondemand-dev.hpc.osc.edu"
        ```

    3.  Add the `<Location "/oidc">` directive

        ``` {.none}
        # OpenID Connect redirect URI:
        #
        #     https://ondemand-dev.hpc.osc.edu:443/oidc
        #     #=> handled by mod_auth_openidc
        #
        <Location "/oidc">
          AuthType openid-connect
          Require valid-user
        </Location>
        ```

Add Keycloak config to OnDemand Apache for mod\_auth\_openidc
-------------------------------------------------------------

1.  Add the file
    /opt/rh/httpd24/root/etc/httpd/conf.d/auth\_openidc.conf with the
    contents:

    ``` {.none}
    OIDCProviderMetadataURL https://ondemand-idpdev.hpc.osc.edu/auth/realms/ondemand/.well-known/openid-configuration
    OIDCClientID        "ondemand-dev.hpc.osc.edu"
    OIDCClientSecret    "1111111-1111-1111-1111-111111111111"
    OIDCRedirectURI      https://ondemand-dev.hpc.osc.edu/oidc
    OIDCCryptoPassphrase "4444444444444444444444444444444444444444"

    # Keep sessions alive for 8 hours
    OIDCSessionInactivityTimeout 28800
    OIDCSessionMaxDuration 28800

    # Set REMOTE_USER
    OIDCRemoteUserClaim preferred_username

    # Don't pass claims to backend servers
    OIDCPassClaimsAs environment

    # Strip out session cookies before passing to backend
    OIDCStripCookies mod_auth_openidc_session mod_auth_openidc_session_chunks mod_auth_openidc_session_0 mod_auth_openidc_session_1
    ```

    1.  OIDCClientID: replace with the client id specified when
        installing the client in Keycloak admin interface
    2.  OIDCClientSecret: replace `1111111-1111-1111-1111-1111111111111`
        with client secret specified from the Credentials tab of the
        client in Keycloak admin interface
    3.  OIDCCryptoPassphrase: replace
        `4444444444444444444444444444444444444444` with random generated
        password. I used `openssl rand -hex 40`.
    4.  Verify the OIDCProviderMetadataURL uses the correct realm and
        the port Apache exposes to the world for Keycloak by accessing
        the URL.

2.  Change permission on file to be readable by apache and no one else:

    ``` {.sh}
    sudo chgrp apache /opt/rh/httpd24/root/etc/httpd/conf.d/auth_openidc.conf
    sudo chmod 640 /opt/rh/httpd24/root/etc/httpd/conf.d/auth_openidc.conf
    ```

3.  Then restart OnDemand\'s Apache. OnDemand should now be
    authenticating using KeyCloak.

> Stop both servives:
>
> > ``` {.sh}
> > sudo systemctl restart httpd24-httpd
> > ```

::: {.note}
::: {.title}
Note
:::

We prevent OIDC\_CLAIM headers from being passed through to the PUN by
specifying in this file to pass claims as environment, instead of as
HTTP headers, since Apache won\'t pass any environment off to the PUN
when proxying requests, but would pass HTTP headers.
:::
