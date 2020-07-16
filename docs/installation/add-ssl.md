---
id: installation-add-ssl
title: installation-add-ssl
sidebar_label: Add Ssl
---
Add SSL Support {#add-ssl}
===============

**(Optional, but recommended)**

The SSL protocol provides for a secure channel of communication between
the user\'s browser and the Open OnDemand portal.

Requirements:

-   a server name that points to the Open OnDemand server
    (`ondemand.my_center.edu`)
-   signed SSL certificates with possible intermediate certificates

::: {.note}
::: {.title}
Note
:::

You may use [Let\'s Encrypt](https://letsencrypt.org/) to obtain a free
SSL certificate. You can read more about it in their [Getting
Started](https://letsencrypt.org/getting-started/) documentation.
:::

In this example we assume the following certificates are provided:

Public certificate

:   `/etc/pki/tls/certs/ondemand.my_center.edu.crt`{.interpreted-text
    role="file"}

Private key

:   `/etc/pki/tls/private/ondemand.my_center.edu.key`{.interpreted-text
    role="file"}

Intermediate certificate

:   `/etc/pki/tls/certs/ondemand.my_center.edu-interm.crt`{.interpreted-text
    role="file"}

#\. Edit the Open OnDemand Portal `ood-portal-generator-configuration`{.interpreted-text role="ref"} file

:   `/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"} as
    such:

    ``` {.yaml}
    # /etc/ood/config/ood_portal.yml
    ---

    # ...

    servername: ondemand.my_center.edu
    ssl:
      - 'SSLCertificateFile "/etc/pki/tls/certs/ondemand.my_center.edu.crt"'
      - 'SSLCertificateKeyFile "/etc/pki/tls/private/ondemand.my_center.edu.key"'
      - 'SSLCertificateChainFile "/etc/pki/tls/certs/ondemand.my_center.edu-interm.crt"'
    ```

    ::: {.note}
    ::: {.title}
    Note
    :::

    For documentation on SSL directives please see:
    <https://httpd.apache.org/docs/2.4/mod/mod_ssl.html>
    :::

1.  Build/install the updated Apache configuration file:

    ``` {.sh}
    sudo /opt/ood/ood-portal-generator/sbin/update_ood_portal
    ```

2.  Restart the Apache server to have the changes take effect:

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

Now when you browse to your OnDemand portal at:

    http://ondemand.my_center.edu

it should redirect you to the HTTP over SSL protocol deployment:

    https://ondemand.my_center.edu

where depending on your browser, should display a green lock of some
kind to indicate that the site is secure.
