---
id: app-development-interactive-setup-enable-reverse-proxy
title: app-development-interactive/setup-enable-reverse-proxy
sidebar_label: Enable Reverse-proxy
---
Enable Reverse Proxy {#app-development-interactive-setup-enable-reverse-proxy}
====================

The [reverse proxy](https://en.wikipedia.org/wiki/Reverse_proxy) will
proxy a request to any specified host and port through IP sockets. This
can be used to connect to Jupyter notebook servers, RStudio servers, VNC
servers, and more\... This is disabled by default as it can be a
security risk if not properly setup using a good `host_regex`.

You can read more about how this works in Open OnDemand under
`ood-portal-generator-configuration-configure-reverse-proxy`{.interpreted-text
role="ref"}.

Requirements
------------

-   a regular expression that best describes all the hosts that you
    would want a user to connect to through the proxy (e.g.,
    `[\w.-]+\.osc\.edu`)

-   confirm that if you run the command `hostname` from a compute node
    it will return a string that matches the above regular expression

    ``` {.sh}
    hostname
    # n0001.ten.osc.edu
    ```

    ::: {.note}
    ::: {.title}
    Note
    :::

    If the `hostname`{.interpreted-text role="command"} command gives
    you a value that cannot be used to connect to the compute node from
    the OnDemand host, then you can override it in the cluster config
    with a `bash`{.interpreted-text role="command"} command that will
    work, e.g.:

    ``` {.yaml}
    # /etc/ood/config/clusters.d/cluster1.yml
    ---
    v2:
      metadata:
        title: "Cluster 1"
      login:
        host: "cluster1.my_center.edu"
      job:
        adapter: "..."
        ...
      batch_connect:
        basic:
          script_wrapper: |
            module purge
            %s
          set_host: "host=$(hostname -A | awk '{print $1}')"
        vnc:
          script_wrapper: |
            module purge
            export PATH="/usr/local/turbovnc/bin:$PATH"
            export WEBSOCKIFY_CMD="/usr/local/websockify/run"
            %s
          set_host: "host=$(hostname -A | awk '{print $1}')"
    ```
    :::

Steps to Enable in Apache
-------------------------

1.  This requires modifying the YAML configuration file for
    `ood-portal-generator`{.interpreted-text role="ref"} located at
    `/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"} as
    such:

    ``` {.yaml}
    # /etc/ood/config/ood_portal.yml
    ---
    servername: ondemand.my_center.edu
    ssl:
      - 'SSLCertificateFile "/etc/pki/tls/certs/ondemand.my_center.edu.crt"'
      - 'SSLCertificateKeyFile "/etc/pki/tls/private/ondemand.my_center.edu.key"'
      - 'SSLCertificateChainFile "/etc/pki/tls/certs/ondemand.my_center.edu-interm.crt"'
    auth:
      - 'AuthType Basic'
      - 'AuthName "private"'
      - 'AuthBasicProvider ldap'
      - 'AuthLDAPURL "ldaps://openldap.my_center.edu:636/ou=People,ou=hpc,o=my_center?uid"'
      - 'AuthLDAPGroupAttribute memberUid'
      - 'AuthLDAPGroupAttributeIsDN off'
      - 'RequestHeader unset Authorization'
      - 'Require valid-user'
    host_regex: '[\w.-]+\.my_center\.edu'
    node_uri: '/node'
    rnode_uri: '/rnode'
    ```

    You can read more about these options under
    `ood-portal-generator-configuration-configure-reverse-proxy`{.interpreted-text
    role="ref"}.

    ::: {.tip}
    ::: {.title}
    Tip
    :::

    What if my site foregos the FQDN in the host names for compute
    nodes, and we have compute names that give their hosts as:

    -   `ab001` \... `ab100` (for the AB cluster)
    -   `pn001` \... `pn500` (for the PN cluster)
    -   `xy001` \... `xy125` (for the XY cluster)

    You could then use the following regular expression in your
    configuration file:

    ``` {.yaml}
    host_regex: '(ab|pn|xy)\d+'
    node_uri: '/node'
    rnode_uri: '/rnode'
    ```
    :::

    ::: {.warning}
    ::: {.title}
    Warning
    :::

    Do not add start (`^`, `A`) or end (`$`, `Z`) of string/line anchors
    as this regular expression will be inserted into another regular
    expression.
    :::

    ::: {.danger}
    ::: {.title}
    Danger
    :::

    Failing to add an appropriate regular expression to the Reverse
    Proxy opens you up to possible phishing attacks. As a malicious
    party could send links to unsuspecting users as:

        https://ondemand.my_center.edu/rnode/phishing.site.com/80/...

    And users will implicitly trust the link since it points to the
    trusting domain of `ondemand.my_center.edu`.
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

Verify it Works
---------------

We can test that the reverse proxy is now functional by starting up a
simple server on a compute node and connecting to it through the proxy
with our browser.

1.  SSH to any compute node that matches the regular expression above:

    ``` {.sh}
    ssh n0001.ten.osc.edu
    ```

2.  Start up a very simple listening server on a high number port:

    ``` {.sh}
    nc -l 5432
    ```

3.  In your browser navigate to this server using the Apache reverse
    proxy with the following URL format:

        http://ondemand.my_center.edu/node/<host>/<port>/...

    So for our simplified case lets use:

        http://ondemand.my_center.edu/node/n0001.ten.osc.edu/5432/

4.  Go back to your SSH session and verify that it received the browser
    request:

    ``` {.sh}
    nc -l 5432
    # GET /node/n0691.ten.osc.edu/5432/ HTTP/1.1
    # Host: n0691.ten.osc.edu:5432
    # Upgrade-Insecure-Requests: 1
    ...
    ```

    ::: {.note}
    ::: {.title}
    Note
    :::

    As we don\'t have the simple server return anything to the browser,
    you can ignore any errors or warnings you see in your browser.
    :::
