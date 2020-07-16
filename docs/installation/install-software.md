---
id: installation-install-software
title: Install Software From RPM
sidebar_label: Install Software From RPM
---
We will use [Software Collections](https://www.softwarecollections.org/en/) to satisfy
majority of the following software requirements:

- [Apache HTTP Server 2.4](https://www.softwarecollections.org/en/scls/rhscl/httpd24/)
- [Ruby 2.5](https://www.softwarecollections.org/en/scls/rhscl/rh-ruby25/) with `rake`, `bundler`, and development libraries
- [Node.js 10](https://www.softwarecollections.org/en/scls/rhscl/rh-nodejs10/)

:::info Note
This tutorial is run from the perspective of an account that has `sudo` access but is not root.
:::

1.  Enable the Software Collections repositories **on CentOS/RHEL 7
    only**:

    CentOS 7
    ```bash
    sudo yum install centos-release-scl
    ```

    RHEL 7
    ```bash
    sudo subscription-manager repos --enable=rhel-server-rhscl-7-rpms
    # Repository 'rhel-server-rhscl-7-rpms' is enabled for this system.
    ```

    :::caution Warning
    For **RedHat** you may also need to enable the *Optional* channel
    and attach a subscription providing access to RHSCL to be able to
    use this repository.
    :::

2.  Add Open OnDemand's repository hosted by the [Ohio Supercomputer Center](https://www.osc.edu/):

    ```bash
    sudo yum install https://yum.osc.edu/ondemand/{{ ondemand_version }}/ondemand-release-web-{{ ondemand_version }-1.noarch.rpm
    ```

3.  Install OnDemand and all of its dependencies:

    ```bash
    sudo yum install ondemand
    ```

4.  Install OnDemand SELinux support if you have SELinux enabled. For details see `ood_selinux`

    ```bash
    sudo yum install ondemand-selinux
    ```

:::info Note

For some older systems, user ids (UID) may start at `500` and not the
expected `1000`. If this true for your system, you will need to modify
the `/etc/ood/config/nginx_stage.yml` configuration file to allow these users access to OnDemand:

```yaml title="/etc/ood/config/nginx_stage.yml"
---

# ...

# Minimum user id required to generate per-user NGINX server as the requested
# user (default: 1000)
#
min_uid: 500

# ...
```
:::