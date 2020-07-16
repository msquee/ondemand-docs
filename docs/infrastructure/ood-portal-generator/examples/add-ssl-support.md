---
id: infrastructure-ood-portal-generator-examples-add-ssl-support
title: infrastructure-ood-portal-generator/examples-add-ssl-support
sidebar_label: Add Ssl-support
---
Add SSL Support
===============

Highly recommended for a production OnDemand Server. The SSL protocol
provides for a secure channel of communication between the user's
browser and the Open OnDemand portal.

The following prerequisites need to be satisfied:

-   The OnDemand Server will need a public facing host name, e.g.,
    `ondemand.my-center.edu`
-   An SSL certificate associated with this host name

Then you can modify your `ood-portal-generator`{.interpreted-text
role="program"} configuration file as such:

``` {.yaml}
# /etc/ood/config/ood_portal.yml
---

servername: ondemand.my-center.edu
ssl:
  - "SSLCertificateFile \"/path/to/public.crt\""
  - "SSLCertificateKeyFile \"/path/to/private.key\""
```

Each array item is treated as a line in the Apache configuration file.
You can add more Apache [SSL
directives](https://httpd.apache.org/docs/2.4/mod/mod_ssl.html) as
separate array items.

Build the Apache configuration file and install it.
