---
id: authentication-tutorial-oidc-keycloak-rhel7-install-keycloak
title: authentication-tutorial-oidc-keycloak-rhel7-install-keycloak
sidebar_label: Install Keycloak
---
Install Keycloak {#authentication-tutorial-oidc-keycloak-rhel7-install-keycloak}
================

We will install and launch Keycloak server behind Apache.

Login to the host where you will install Keycloak. In this tutorial, we
are installing Keycloak on the same host as OnDemand, which is
webdev07.hpc.osc.edu.

::: {.warning}
::: {.title}
Warning
:::

In production we recommend installing Keycloak on a separate host from
OnDemand.
:::

Initial Installation Steps
--------------------------

1.  Download and unpack Keycloak 9.0.0 (from
    <https://www.keycloak.org/downloads.html>)

    ``` {.sh}
    cd /opt
    sudo wget https://downloads.jboss.org/keycloak/9.0.0/keycloak-9.0.0.tar.gz
    sudo tar xzf keycloak-9.0.0.tar.gz
    ```

2.  Add keycloak user and change ownership of files

    ``` {.sh}
    sudo groupadd -r keycloak
    sudo useradd -m -d /var/lib/keycloak -s /sbin/nologin -r -g keycloak keycloak
    ```

    If `-m` doesn\'t work, do this:

    ``` {.sh}
    sudo install -d -o keycloak -g keycloak /var/lib/keycloak
    ```

    This makes a home directory, which is needed when running API calls
    as keycloak user. Finally we set proper permissions:

    ``` {.sh}
    sudo chown keycloak: -R keycloak-9.0.0
    ```

3.  Restrict access to keycloak-9.0.0/standalone, which will contain
    sensitive data for the Keycloak server

    ``` {.sh}
    cd keycloak-9.0.0
    sudo -u keycloak chmod 700 standalone
    ```

4.  Install JDK 1.8.0

    ``` {.sh}
    sudo yum install java-1.8.0-openjdk-devel
    ```

5.  Added \'admin\' to
    \'/opt/keycloak-9.0.0/standalone/configuration/keycloak-add-user.json\',
    (re)start server to load user.

    If you are not already there:

    ``` {.sh}
    cd /opt/keycloak-9.0.0
    ```

    Generate a password to use for the admin user:

    ``` {.sh}
    openssl rand -hex 20 # generate a password to use for admin user
    sudo -u keycloak ./bin/add-user-keycloak.sh --user admin --password KEYCLOAKPASS --realm master
    ```

    **Replace KEYCLOAKPASS with a good password and save password for
    later use**

6.  Modify `standalone/configuration/standalone.xml` to enable proxying
    to Keycloak:

    Simplest is to run these three commands:

    ``` {.sh}
    sudo -u keycloak ./bin/jboss-cli.sh 'embed-server,/subsystem=undertow/server=default-server/http-listener=default:write-attribute(name=proxy-address-forwarding,value=true)'
    sudo -u keycloak ./bin/jboss-cli.sh 'embed-server,/socket-binding-group=standard-sockets/socket-binding=proxy-https:add(port=443)'
    sudo -u keycloak ./bin/jboss-cli.sh 'embed-server,/subsystem=undertow/server=default-server/http-listener=default:write-attribute(name=redirect-socket,value=proxy-https)'
    ```

    Or you can use a config.cli file that contains these commands. We
    have provided an example file to make use of in this gist, with
    blocks commented out so you can wget the file, edit as appropriate,
    and run via:

    ``` {.sh}
    sudo -u keycloak ./bin/jboss-cli.sh --file=config.cli
    ```

    Where the config.cli looks like:

    ::: {.literalinclude}
    example-keycloak-jboss-config.cli
    :::

Start Keycloak Server
---------------------

1.  Create keycloak.service to start and stop the server:

    ``` {.sh}
    sudo cat > /etc/systemd/system/keycloak.service <<EOF

    [Unit]
    Description=Jboss Application Server
    After=network.target

    [Service]
    Type=idle
    User=keycloak
    Group=keycloak
    ExecStart=/opt/keycloak-9.0.0/bin/standalone.sh -b 0.0.0.0
    TimeoutStartSec=600
    TimeoutStopSec=600

    [Install]
    WantedBy=multi-user.target
    EOF
    ```

    Then start keycloak:

    ``` {.sh}
    sudo systemctl daemon-reload
    sudo systemctl start keycloak
    ```

    It may take a little time to load; verify it has loaded:

    ``` {.sh}
    sudo systemctl status keycloak
    # keycloak.service - Jboss Application Server
    # Loaded: loaded (/etc/systemd/system/keycloak.service; disabled; vendor preset: disabled)
    # Active: active (running) since Mon 2017-09-25 16:19:47 EDT; 2s ago
    # ...
    # Sep 25 16:19:49 webdev07.hpc.osc.edu standalone.sh[111998]: 16:19:49,644 INFO  [#org.wildfly.extension.undertow] (MSC service thread ...0:8080)
    # Hint: Some lines were ellipsized, use -l to show in full.
    ```

Place Apache in front of Keycloak
---------------------------------

1.  Define apache config to proxy keycloak requests

    ::: {.note}
    ::: {.title}
    Note
    :::

    This is the only step in the tutorial that differs significantly
    based on whether you install Keycloak on a separate host from
    OnDemand or on the same host. See below for example differences.
    :::

    We will stick Apache in front of Keycloak. In this tutorial Keycloak
    is installed on the same node as OnDemand, and we use the same
    Apache instance to serve both OnDemand and Keycloak with the same
    host, so we can reuse the same SSL certificates. You may want to run
    Keycloak on a separate host, however.

    Add `/opt/rh/httpd24/root/etc/httpd/conf.d/ood-keycloak.conf`,
    making changes for the appropriate SSL certificate locations. Notice
    we are proxying `https://ondemand-idpdev.hpc.osc.edu` to
    `http://localhost:8080` which is the default port the Keycloak
    webserver runs as.

    ::: {.literalinclude}
    example-keycloak-apache.conf
    :::

    ::: {.note}
    ::: {.title}
    Note
    :::

    We can use the same host because Keycloak properly scopes all
    cookies it sets to the realm. For example, if I have a realm called
    \"ondemand\", then the Keycloak login page will be at
    `https://ondemand-idpdev.hpc.osc.edu/auth/realms/ondemand/protocol/openid-connect/auth`
    and cookies set during authentication will be set with the path
    `/auth/realms/ondemand`, including `KEYCLOAK_SESSION`,
    `KEYCLOAK_STATE_CHECKER`, `KEYCLOAK_IDENTITY`, and `KC_RESTART`.
    :::

2.  Now you should be able to access Keycloak:
    `https://ondemand-idpdev.hpc.osc.edu`

Differences if installing Keycloak on separate host
---------------------------------------------------

When installing Keycloak on a separate host, the difference between this
tutorial would be:

1.  throughout the rest of the tutorial replace
    `https://ondemand-idpdev.hpc.osc.edu` with the keycloak host
2.  possibly use Apache 2.4 default distribution instead of software
    collections, meaning that configuration would be at
    /etc/httpd/conf.d/ instead of /opt/rh/httpd24/root/etc/httpd/conf.d/
    and starting the service is likely `sudo systemctl start httpd`
    instead of `sudo systemctl start httpd24-httpd`

For example, if Keycloak were installed on a separate host idp.hpc.edu
then the Apache config might look like:

::: {.literalinclude}
example-keycloak-apache-separate-host.conf
:::
