---
id: installation-add-ldap
title: installation-add-ldap
sidebar_label: Add Ldap
---
Add LDAP Support {#add-ldap}
================

**(Optional, but recommended)**

::: {.warning}
::: {.title}
Warning
:::

This page explains how to add LDAP support to basic auth in Open
OnDemand. Basic auth should only be used for evaluation purposes. For a
more robust authentication solution, see
`authentication`{.interpreted-text role="ref"}.
:::

LDAP support allows for your users to log in using their local username
and password. It also removes the need for the system administrator to
keep updating the `.htpasswd` file.

Requirements:

-   an LDAP server preferably with SSL support
    (`openldap.my_center.edu:636`)

1.  Edit the Open OnDemand Portal
    `ood-portal-generator-configuration`{.interpreted-text role="ref"}
    file `/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"}
    as such:

    ``` {.yaml}
    # /etc/ood/config/ood_portal.yml
    ---

    # ...

    auth:
      - 'AuthType Basic'
      - 'AuthName "private"'
      - 'AuthBasicProvider ldap'
      - 'AuthLDAPURL "ldaps://openldap.my_center.edu:636/ou=People,ou=hpc,o=my_center?uid"'
      - 'AuthLDAPGroupAttribute memberUid'
      - 'AuthLDAPGroupAttributeIsDN off'
      - 'RequestHeader unset Authorization'
      - 'Require valid-user'
    ```

    ::: {.note}
    ::: {.title}
    Note
    :::

    For documentation on LDAP directives please see:
    <https://httpd.apache.org/docs/2.4/mod/mod_authnz_ldap.html>
    :::

2.  Build/install the updated Apache configuration file:

    ``` {.sh}
    sudo /opt/ood/ood-portal-generator/sbin/update_ood_portal
    ```

3.  Restart the Apache server to have the changes take effect:

    CentOS/RHEL 6:

    :   ``` {.sh}
        sudo service httpd24-httpd condrestart
        # Stopping httpd:                                            [  OK  ]
        # Starting httpd:                                            [  OK  ]
        sudo service httpd24-htcacheclean condrestart
        ```

    CentOS/RHEL 7:

    :   ``` {.sh}
        sudo systemctl try-restart httpd24-httpd.service httpd24-htcacheclean.service
        ```

Close your browser so that you are properly logged out. Then open your
browser again and access the portal. You should now be able to
authenticate with your local username and password.
