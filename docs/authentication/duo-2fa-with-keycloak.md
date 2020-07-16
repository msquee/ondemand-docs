---
id: authentication-duo-2fa-with-keycloak
title: authentication-duo-2fa-with-keycloak
sidebar_label: Duo 2fa-with-keycloak
---
Two Factor Auth using Duo with Keycloak {#authentication-duo-2fa-with-keycloak}
=======================================

These are the steps to setup two factor authentication with Duo using
Keycloak.

Install Keycloak Duo SPI
------------------------

1.  Clone the Keycloak Duo SPI repo

    ``` {.}
    git clone https://github.com/OSC/keycloak-duo-spi.git
    cd keycloak-duo-spi
    git submodule update --init
    ```

2.  Edit `pom.xml` and ensure `keycloak.version` matches the version of
    Keycloak you are running.

3.  Build (with Docker) - produces
    `target/keycloak-duo-spi-jar-with-dependencies.jar`

    ``` {.}
    docker run --rm -it -v $(pwd):/keycloak-duo-spi -w /keycloak-duo-spi \
      ohiosupercomputer/keycloak_duo_spi_buildbox:latest mvn clean test package
    ```

4.  Build (without Docker) - produces
    `target/keycloak-duo-spi-jar-with-dependencies.jar`

    ``` {.}
    yum -y install maven
    cd build/duo_java/DuoWeb
    mvn clean test install
    cd ../../..
    mvn clean test package
    ```

5.  Copy the JAR file to Keycloak and instruct Keycloak to install the
    SPI

    ``` {.}
    sudo install -o keycloak -g keycloak -m 0644 target/keycloak-duo-spi-jar-with-dependencies.jar \
      /opt/keycloak-9.0.0/standalone/deployments/keycloak-duo-spi-jar-with-dependencies.jar
    sudo install -o keycloak -g keycloak -m 0644 /dev/null \
      /opt/keycloak-9.0.0/standalone/deployments/keycloak-duo-spi-jar-with-dependencies.jar.dodeploy
    ```

Configure Duo SPI
-----------------

1.  Log into your Keycloak instance
2.  Choose the realm to configure in upper left corner, eg `ondemand`
3.  Choose `Realm Settings` in the left menu then `Security Defenses`
    tab
4.  Add `frame-src https://*.duosecurity.com/ 'self';` to the beginning
    of the value for `Content-Security-Policy`
5.  Choose `Authentication` in the left menu
6.  While on `Flows` tab ensure the dropdown for the flow name is
    `Browser` and click `Copy`
7.  Name the new flow `browser-with-duo`
8.  For all items below `Username Password Form` delete them by choosing
    `Actions` then `Delete`
9.  Choose `Actions` for `Browser-with-duo Forms` and choose
    `Add Execution`
10. Select the `Duo MFA` provider and click `Save`
11. Click `Actions` for `Duo MFA` and select `Config`. Fill in all
    values as appropriate and select `Save`.
12. Select `Required` for `Duo MFA`
13. Choose the `Bindings` tab and set `Browser Flow` to
    `browser-with-duo` and choose `Save`

Users logging into Keycloak will be required to verify their identity
using Duo.
