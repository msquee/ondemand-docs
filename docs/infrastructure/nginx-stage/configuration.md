---
id: infrastructure-nginx-stage-configuration
title: infrastructure-nginx-stage-configuration
sidebar_label: Configuration
---
Configuration {#nginx-stage-configuration}
=============

Many of the options in the per-user NGINX staging and configuration can
be configured within `nginx_stage`{.interpreted-text role="program"}. In
a default installation this YAML configuration file is located at:

    /etc/ood/config/nginx_stage.yml

On a fresh installation you may need to create this file or copy the
default file from:

    /opt/ood/nginx_stage/share/nginx_stage_example.yml

In most cases it is recommended that you don\'t edit this file as the
chosen defaults should work out of the box for most scenarios.

::: {.warning}
::: {.title}
Warning
:::

Modifying application specific configuration options or URI options can
have unintended consequences for some of the Open OnDemand applications,
so be sure you know what you are doing.
:::

Configuration Options
---------------------

::: {.describe}
ondemand\_version\_path (String)

path to the OnDemand version file

Default

:   Set to default path

    ``` {.yaml}
    ondemand_version_path: "/opt/ood/VERSION"
    ```

Example

:   Supply a custom version file with a different version in it

    ``` {.yaml}
    ondemand_version_path: "/path/to/VERSION"
    ```
:::

::: {.describe}
ondemand\_portal (String, null)

unique name of this OnDemand portal used to namespace multiple hosted
portals

Default

:   Do not set a custom namespace for this portal

    ``` {.yaml}
    ondemand_portal: null
    ```

Example

:   Use a custom namespace for this portal

    ``` {.yaml}
    ondemand_portal: "custom"
    ```

::: {.note}
::: {.title}
Note
:::

If this is not set then most apps will use the default namespace
`ondemand`.
:::
:::

::: {.describe}
ondemand\_title (String, null)

title of this OnDemand portal that apps *should* display in their navbar

Default

:   Do not set a custom title for this portal

    ``` {.yaml}
    ondemand_title: null
    ```

Example

:   Use a custom title for this portal

    ``` {.yaml}
    ondemand_title: "My Custom Portal"
    ```

::: {.note}
::: {.title}
Note
:::

If this is not set then most apps will use the default title
`Open OnDemand`.
:::
:::

::: {.describe}
template\_root (String)

the root directory containing the ERB templates used in generating the
NGINX configuration files

Default

:   Set to default installation location

    ``` {.yaml}
    template_root: "/opt/ood/nginx_stage/templates"
    ```

Example

:   Use custom templates

    ``` {.yaml}
    template_root: "/path/to/my/templates"
    ```
:::

::: {.describe}
proxy\_user (String)

the user name that the Apache proxy runs as so permissions can be added
to the Unix domain sockets

Default

:   Set to the typical apache user

    ``` {.yaml}
    proxy_user: "apache"
    ```

Example

:   Use a different user for the Apache proxy

    ``` {.yaml}
    proxy_user: "proxy_user"
    ```
:::

::: {.describe}
nginx\_bin (String)

the path to the NGINX binary

Default

:   Use NGINX installed by OnDemand Software Collections

    ``` {.yaml}
    nginx_bin: "/opt/ood/ondemand/root/usr/sbin/nginx"
    ```

Example

:   NGINX is installed in a different directory

    ``` {.yaml}
    nginx_bin: "/path/to/sbin/nginx"
    ```
:::

::: {.describe}
nginx\_signals (Array\<String\>)

valid signals that can be sent to the NGINX process

Default

:   Supported NGINX signals

    ``` {.yaml}
    nginx_signals: [stop, quit, reopen, reload]
    ```

Example

:   Further restrict valid signals

    ``` {.yaml}
    nginx_signals: [stop]
    ```

::: {.note}
::: {.title}
Note
:::

This option is sent as `-s signal` to the [NGINX command
line](https://www.nginx.com/resources/wiki/start/topics/tutorials/commandline/).
:::
:::

::: {.describe}
mime\_types\_path (String)

the path to the system-installed NGINX `mime.types` file

Default

:   Use the NGINX installed by OnDemand Software Collections file

    ``` {.yaml}
    mime_types_path: "/opt/ood/ondemand/root/etc/nginx/mime.types"
    ```

Example

:   Use a custom mime file

    ``` {.yaml}
    mime_types_path: "/path/to/custom/mime.types"
    ```
:::

::: {.describe}
passenger\_root (String)

the `locations.ini` file that describes Passenger installation

Default

:   Use the file supplied by Passenger from OnDemand Software
    Collections

    ``` {.yaml}
    passenger_root: "/opt/ood/ondemand/root/usr/share/ruby/vendor_ruby/phusion_passenger/locations.ini"
    ```

Example

:   Use a custom file

    ``` {.yaml}
    passenger_root: "/path/to/custom/locations.ini"
    ```
:::

::: {.describe}
passenger\_ruby (String)

the path to the Ruby binary that Passenger uses for itself and web apps

Default

:   Use the Ruby wrapper script supplied by this code

    ``` {.yaml}
    passenger_ruby: "/opt/ood/nginx_stage/bin/ruby"
    ```

Example

:   Use the binary supplied by Ruby 2.4 installed by Software
    Collections

    ``` {.yaml}
    passenger_ruby: "/opt/rh/rh-ruby25/root/usr/bin/ruby"
    ```
:::

::: {.describe}
passenger\_nodejs (String, null)

the path to the Node.js binary that Passenger uses for web apps

Default

:   Use the Node.js wrapper script supplied by this code

    ``` {.yaml}
    passenger_nodejs: "/opt/ood/nginx_stage/bin/node"
    ```

Example

:   Use the binary supplied by Node.js installed by Software Collections

    ``` {.yaml}
    passenger_nodejs: "/opt/rh/rh-nodejs6/root/usr/bin/node"
    ```
:::

::: {.describe}
passenger\_python (String, null)

the path to the Python binary that Passenger uses for web apps

Default

:   Use the Python wrapper script supplied by this code

    ``` {.yaml}
    passenger_python: "/opt/ood/nginx_stage/bin/python"
    ```

Example

:   Use the system-installed Python binary

    ``` {.yaml}
    passenger_python: "/usr/bin/python"
    ```
:::

::: {.describe}
pun\_config\_path (String)

the interpolated path to the user\'s PUN config file

Default

:   Namespace the user config files by their user name

    ``` {.yaml}
    pun_config_path: "/var/lib/ondemand-nginx/config/puns/%{user}.conf"
    ```

Example

:   Namespace configs under user directories

    ``` {.yaml}
    pun_config_path: "/var/lib/ondemand-nginx/config/puns/%{user}/nginx.conf"
    ```
:::

::: {.describe}
pun\_tmp\_root (String)

the interpolated root directory used for NGINX tmp directories

Default

:   Namespace under user directories

    ``` {.yaml}
    pun_tmp_root: "/var/lib/ondemand-nginx/tmp/%{user}"
    ```

Example

:   Use a custom namespace for root directory

    ``` {.yaml}
    pun_tmp_root: "/path/to/%{user}-tmp"
    ```

::: {.warning}
::: {.title}
Warning
:::

NGINX will store the full request body in this location before sending
it to the Passenger app. The size of the disk partition this directory
resides in will limit the maximum file upload size.
:::
:::

::: {.describe}
pun\_access\_log\_path (String)

the interpolated path to the NGINX access log

Default

:   Namespace access logs under user directories

    ``` {.yaml}
    pun_access_log_path: "/var/log/ondemand-nginx/%{user}/access.log"
    ```

Example

:   Use a custom location for the access log file

    ``` {.yaml}
    pun_access_log_path: "/custom/path/access-%{user}.log"
    ```
:::

::: {.describe}
pun\_error\_log\_path (String)

the interpolated path to the NGINX error log

Default

:   Namespace error logs under user directories

    ``` {.yaml}
    pun_error_log_path: "/var/log/ondemand-nginx/%{user}/error.log"
    ```

Example

:   Use a custom location for the error log file

    ``` {.yaml}
    pun_error_log_path: "/custom/path/error-%{user}.log"
    ```
:::

::: {.describe}
pun\_pid\_path (String)

the interpolated path to the NGINX pid file

Default

:   Namespace pid files under user directories

    ``` {.yaml}
    pun_pid_path: "/var/run/ondemand-nginx/%{user}/passenger.pid"
    ```

Example

:   Use a custom location for the pid files

    ``` {.yaml}
    pun_pid_path: "/custom/path/pid-%{user}.pid"
    ```
:::

::: {.describe}
pun\_socket\_path (String)

the interpolated path to the NGINX socket file

Default

:   Namespace socket files under user directories

    ``` {.yaml}
    pun_pid_path: "/var/run/ondemand-nginx/%{user}/passenger.sock"
    ```

Example

:   Use a custom location for the socket files

    ``` {.yaml}
    pun_pid_path: "/custom/path/socket-%{user}.sock"
    ```

::: {.warning}
::: {.title}
Warning
:::

The root directory containing the Unix domain socket file will have
restricted permissions so that only the Apache proxy user can access
this socket file.
:::

::: {.danger}
::: {.title}
Danger
:::

Currently `mod-ood-proxy`{.interpreted-text role="ref"} will only look
for socket files following the format:

    $OOD_PUN_SOCKET_ROOT/<user>/passenger.sock

It is not recommended to alter `pun_pid_path` unless you know what you
are doing.
:::
:::

::: {.describe}
pun\_sendfile\_root (String)

the root directory that NGINX serves files from using
[sendfile](http://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile)

Default

:   Serve all files on file system

    ``` {.yaml}
    pun_sendfile_root: "/"
    ```

Example

:   Only serve files under home directories

    ``` {.yaml}
    pun_sendfile_root: "/home"
    ```

::: {.warning}
::: {.title}
Warning
:::

All URL requests to
[sendfile](http://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile)
will be relative to the `pun_sendfile_root`. If you alter this
configuration option you may break certain web applications that expect
it under `/`.
:::
:::

::: {.describe}
pun\_sendfile\_uri (String)

the internal URL path used by NGINX to serve files from using
[sendfile](http://nginx.org/en/docs/http/ngx_http_core_module.html#sendfile)
(not directly accessible by the client browser)

Default

:   Serve files under a unique path

    ``` {.yaml}
    pun_sendfile_uri: "/sendfile"
    ```

Example

:   Server files under a custom URL path

    ``` {.yaml}
    pun_sendfile_root: "/custom/files"
    ```
:::

::: {.describe}
pun\_app\_configs (Array\<Hash\>)

a list of interpolated hashes that define what wildcard app config file
paths to include in a user\'s NGINX config (the hashes are arguments for
`app_config_path`)

Default

:   Serve a user\'s dev apps, all shared apps, all system apps through
    NGINX

    ``` {.yaml}
    pun_app_configs:
      -
        env: dev
        name: "*"
        owner: "%{user}"
      -
        env: usr
        name: "*"
        owner: "*"
      -
        env: sys
        name: "*"
        owner: "*"
    ```

Example

:   Serve only system apps through NGINX

    ``` {.yaml}
    pun_app_configs:
      -
        env: dev
        name: "*"
        owner: "%{user}"
    ```
:::

::: {.describe}
app\_config\_path (Hash)

an interpolated hash detailing the path to the NGINX app configs for
each app type

Default

:   A recommended solution for app config locations

    ``` {.yaml}
    app_config_path:
      dev: "/var/lib/ondemand-nginx/config/apps/dev/%{owner}/%{name}.conf"
      usr: "/var/lib/ondemand-nginx/config/apps/usr/%{owner}/%{name}.conf"
      sys: "/var/lib/ondemand-nginx/config/apps/sys/%{name}.conf"
    ```
:::

::: {.describe}
app\_root (Hash)

an interpolated hash detailing the root directory where the app is
installed for each app type

Default

:   A recommended solution for app deployment locations

    ``` {.yaml}
    app_root:
      dev: "~%{owner}/ondemand/dev/%{name}"
      usr: "/var/www/ood/apps/usr/%{owner}/gateway/%{name}"
      sys: "/var/www/ood/apps/sys/%{name}"
    ```

::: {.note}
::: {.title}
Note
:::

A common solution is to map the user shared app location as a symlink to
the user\'s home directory:

    /var/www/ood/apps/usr/<owner>/gateway => ~<owner>/ondemand/share

This allows the owner of the app to update the app in real time as well
as maintain file permissions.
:::

::: {.warning}
::: {.title}
Warning
:::

Modifying this configuration option may break how the Dashboard app
searches for apps.
:::
:::

::: {.describe}
app\_request\_uri (Hash)

an interpolated hash detailing the URL path used to access the given
type of app (not including the base-URI)

Default

:   A recommended solution for app request URL\'s

    ``` {.yaml}
    app_request_uri:
      dev: "/dev/%{name}"
      usr: "/usr/%{owner}/%{name}"
      sys: "/sys/%{name}"
    ```

::: {.note}
::: {.title}
Note
:::

Modifying this will require you also modify `app_request_regex`.
:::

::: {.warning}
::: {.title}
Warning
:::

Modifying this configuration option may break how the various apps link
to each other.
:::
:::

::: {.describe}
app\_request\_regex (Hash)

a hash detailing the regular expressions used to determine the type of
app and its corresponding parameters from a URL request (this should
match what you used in `app_request_uri`)

Default

:   A recommended solution for app request URL regular expressions

    ``` {.yaml}
    app_request_regex:
      dev: "^/dev/(?<name>[-\\w.]+)"
      usr: "^/usr/(?<owner>[\\w]+)/(?<name>[-\\w.]+)"
      sys: "^/sys/(?<name>[-\\w.]+)"
    ```

::: {.note}
::: {.title}
Note
:::

Modifying anything in this configuration option other than the
whitelisted characters will require you modify `app_request_uri` as
well.
:::
:::

::: {.describe}
app\_token (Hash)

an interpolated hash detailing a uniquely identifiable string for each
app

Default

:   A recommended solution for generating app tokens

    ``` {.yaml}
    app_token:
      dev: "dev/%{owner}/%{name}"
      usr: "usr/%{owner}/%{name}"
      sys: "sys/%{name}"
    ```

::: {.note}
::: {.title}
Note
:::

Not currently used and may be deprecated in the future.
:::
:::

::: {.describe}
app\_passenger\_env (Hash)

a hash detailing the [Passenger
environment](https://www.phusionpassenger.com/library/config/nginx/reference/#passenger_app_env)
to run the type of app under

Default

:   A recommended solution for setting Passenger environments

    ``` {.yaml}
    app_passenger_env:
      dev: "development"
      usr: "production"
      sys: "production"
    ```

::: {.warning}
::: {.title}
Warning
:::

Modifying this configuration option can lead to unintended consequences
for web apps such as issues with serving their assets.
:::
:::

::: {.describe}
user\_regex (String)

regular expression used to validate a given user name

Default

:   Username can consist of any characters typically found in an email
    address

    ``` {.yaml}
    user_regex: '[\w@\.\-]+'
    ```

Example

:   Restrict user name to just alphanumeric characters

    ``` {.yaml}
    user_regex: '\w+'
    ```
:::

::: {.describe}
min\_uid (Integer)

the minimum user id required to start a per-user NGINX process as

Default

:   User id\'s typically start at `1000`

    ``` {.yaml}
    min_uid: 1000
    ```

Example

:   Using CentOS 6

    ``` {.yaml}
    min_uid: 500
    ```

::: {.note}
::: {.title}
Note
:::

For RHEL6 and CentOS 6 the user id\'s begin at `500`.
:::
:::

::: {.describe}
disabled\_shell (String)

restrict starting a per-user NGINX process as a user with the given
shell

Default

:   For OSC restrictions

    ``` {.yaml}
    disabled_shell: "/access/denied"
    ```

::: {.note}
::: {.title}
Note
:::

This will only restrict access to a per-user NGINX process started with
the `nginx-stage-pun`{.interpreted-text role="ref"} command (used by the
Apache proxy). This doesn\'t restrict the other administrative commands
`nginx-stage-nginx`{.interpreted-text role="ref"} and
`nginx-stage-nginx-clean`{.interpreted-text role="ref"} when manually
starting and stopping the NGINX process.
:::
:::
