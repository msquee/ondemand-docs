---
id: infrastructure-ood-portal-generator-configuration
title: infrastructure-ood-portal-generator-configuration
sidebar_label: Configuration
---
Configuration {#ood-portal-generator-configuration}
=============

Relying on the default build is fine for a demo deployment, but it is
not recommended for a production environment. Options can be configured
by default under the file
`/etc/ood/config/ood_portal.yml`{.interpreted-text role="file"}.

This project includes a good starting configuration file that you can
use:

``` {.sh}
sudo cp share/ood_portal_example.yml /etc/ood/config/ood_portal.yml
```

All the default options are listed in this configuration file. Feel free
to read it through before continuing on.

Configure General Options
-------------------------

::: {.describe}
listen\_addr\_port (String, Array\<String\>, null)

the address and port server listens on for connections

Default

:   Don\'t add a `Listen` directive in this Apache config (typically it
    exists in another config)

    ``` {.yaml}
    listen_addr_port: null
    ```

Example

:   Explicitly listen on port 443

    ``` {.yaml}
    listen_addr_port: "443"
    ```
:::

::: {.describe}
servername (String, null)

the host name used to access the Open OnDemand portal

Default

:   Access website through IP address only

    ``` {.yaml}
    servername: null
    ```

Example

:   Access website through the host name `www.example.com`

    ``` {.yaml}
    servername: "www.example.com"
    ```
:::

::: {.describe}
port (Integer, null)

the port used to access the Open OnDemand portal (if different than `80`
or `443`)

Default

:   Use port `80` or port `443` if SSL is enabled

    ``` {.yaml}
    port: null
    ```

Example

:   Use a higher numbered port to access the website

    ``` {.yaml}
    port: 8080
    ```
:::

::: {.describe}
ssl (Array\<String\>, null)

a list of Apache directives that enable SSL support

Default

:   Disable SSL support

    ``` {.yaml}
    ssl: null
    ```

Example

:   See `add-ssl-support`{.interpreted-text role="ref"}
:::

::: {.describe}
logroot (String)

the root directory where log files are stored (can be relative to
`ServerRoot`)

Default

:   Store logs in `$ServerRoot/logs` directory

    ``` {.yaml}
    logroot: "logs"
    ```

Example

:   Store logs in a different directory

    ``` {.yaml}
    logroot: "/path/to/my/logs"
    ```
:::

::: {.describe}
use\_rewrites (Boolean)

Should RewriteEngine be used

Default

:   Use RewriteEngine

    ``` {.yaml}
    use_rewrites: true
    ```

Example

:   Disable RewriteEngine usage

    ``` {.yaml}
    use_rewrites: false
    ```
:::

::: {.describe}
use\_maintenance (Boolean)

Enable Rewrite rules for supporting maintenance mode of OnDemand
Requires [use\_rewrites]{.title-ref} to be [true]{.title-ref}

Default

:   Support maintenance mode support

    ``` {.yaml}
    use_maintenance: true
    ```

Example

:   Disable maintenance mode support

    ``` {.yaml}
    use_maintenance: false
    ```
:::

::: {.describe}
maintenance\_ip\_whitelist (Array\<String\>)

List of IP regular expressions to be allowed to access OnDemand when
maintenance is enabled

Default

:   No IPs are whitelisted

    ``` {.yaml}
    maintenance_ip_whitelist: []
    ```

Example

:   Allow 192.168.1.0/24 and 10.0.0.1 to access OnDemand during
    maintenance

    ``` {.yaml}
    maintenance_ip_whitelist:
      - '192.168.1..*'
      - '10.0.0.1'
    ```
:::

::: {.describe}
lua\_root (String)

the root directory where the Lua handler code resides

Default

:   Point to the install location of `mod-ood-proxy`{.interpreted-text
    role="ref"}

    ``` {.yaml}
    lua_root: "/opt/ood/mod_ood_proxy/lib"
    ```

Example

:   Point to a different directory

    ``` {.yaml}
    lua_root: "/path/to/lua/handlers"
    ```
:::

::: {.describe}
lua\_log\_level (String, null)

the verbosity of the Lua module in the logs

Default

:   Use default log level of `info`

    ``` {.yaml}
    lua_log_level: null
    ```

Example

:   Decrease verbosity

    ``` {.yaml}
    lua_log_level: "warn"
    ```

the system command used to map authenticated user name to a system user
name

Default

:   Use `ood-auth-map`{.interpreted-text role="ref"} and echo back the
    authenticated user name as the system user name

    ``` {.yaml}
    user_map_cmd: "/opt/ood/ood_auth_map/bin/ood_auth_map.regex"
    ```

Example

:   Capture system user name from regular expression

    ``` {.yaml}
    user_map_cmd: "/opt/ood/ood_auth_map/bin/ood_auth_map.regex --regex='^(\\w+)@example.com'"
    ```

the CGI environment variable that holds the authenticated user name used
as the argument for the user mapping command

Default

:   Use `REMOTE_USER` if not defined

    ``` {.yaml}
    user_env: null
    ```

Example

:   Use a custom environment variable instead

    ``` {.yaml}
    user_env: "OIDC_CLAIM_preferred_username"
    ```
:::

::: {.describe}
map\_fail\_uri (String, null)

the URI a user is redirected to if we fail to map the authenticated user
name to a system user name

Default

:   Don\'t redirect the user and just display an error message

    ``` {.yaml}
    map_fail_uri: null
    ```

Example

:   Redirect the user to a registration page you set up beforehand

    ``` {.yaml}
    map_fail_uri: "/register"
    ```
:::

::: {.describe}
pun\_stage\_cmd (String)

the system command used to launch the `nginx-stage`{.interpreted-text
role="ref"} command with `sudo`{.interpreted-text role="program"}
privileges

Default

:   Use default install location

    ``` {.yaml}
    pun_stage_cmd: "sudo /opt/ood/nginx_stage/sbin/nginx_stage"
    ```

Example

:   Use a different install location

    ``` {.yaml}
    pun_stage_cmd: "sudo /path/to/nginx_stage"
    ```
:::

::: {.describe}
auth (Array\<String\>)

the list of Apache directives defining how authentication is handled for
various protected resources on the website

Default

:   Use basic authentication with a plain-text password file (see
    `default-authentication`{.interpreted-text role="ref"})

    ``` {.yaml}
    auth:
      - "AuthType Basic"
      - "AuthName \"private\""
      - "AuthUserFile \"/opt/rh/httpd24/root/etc/httpd/.htpasswd\""
      - "RequestHeader unset Authorization"
      - "Require valid-user"
    ```

Example

:   See:

    -   `add-ldap-authentication`{.interpreted-text role="ref"}
    -   `add-shibboleth-authentication`{.interpreted-text role="ref"}
    -   `add-cilogon-authentication`{.interpreted-text role="ref"}
:::

::: {.describe}
root\_uri (String)

the URI a user is redirected to when they access the root of the website
(e.g., `https://www.example.com/`)

Default

:   Redirect the user to the `dashboard`{.interpreted-text role="ref"}

    ``` {.yaml}
    root_uri: "/pun/sys/dashboard"
    ```

Example

:   Redirect to a different URI

    ``` {.yaml}
    root_uri: "/my_uri"
    ```
:::

::: {.describe}
analytics (Hash, null)

the object describing how to track server-side analytics with a Google
Analytics account and property

Default

:   Do not track analytics

    ``` {.yaml}
    analytics: null
    ```

Example

:   See `add-google-analytics`{.interpreted-text role="ref"}
:::

Configure Public Assets
-----------------------

This is a location where files can be served without a user being
authenticated. Useful to serve favicon, images, or user documentation.
If either of these properties are `null` then users won\'t be able to
access public assets through the website.

::: {.describe}
public\_uri (String, null)

the URI used to access public assets (no authentication needed)

Default

:   Access as `http://www.example.com/public`

    ``` {.yaml}
    public_uri: "/public"
    ```

Example

:   Access under a different URI

    ``` {.yaml}
    public_uri: "/assets"
    ```
:::

::: {.describe}
public\_root (String, null)

the root directory where the public assets are served from

Default

:   Using a default installation

    ``` {.yaml}
    public_root: "/var/www/ood/public"
    ```

Example

:   Serve files under a different directory

    ``` {.yaml}
    public_root: "/path/to/public/files"
    ```
:::

Configure Logout Redirect
-------------------------

The `dashboard`{.interpreted-text role="ref"} will send the user to this
URI when they click the Logout button. This URI will then redirect the
user to the logout mechanism for your corresponding authentication
mechanism. If either of these properties are `null` then users will get
an error when they try to logout from the `dashboard`{.interpreted-text
role="ref"}.

::: {.describe}
logout\_uri (String, null)

the URI used to logout from an Apache session

Default

:   Access as `http://www.example.com/logout`

    ``` {.yaml}
    logout_uri: "/logout"
    ```

Example

:   Access under a different URI

    ``` {.yaml}
    logout_uri: "/log_me_out"
    ```
:::

::: {.describe}
logout\_redirect (String, null)

the URI the user is redirected to when accessing the logout URI above

Default

:   Fallback to the `dashboard`{.interpreted-text role="ref"} log out
    page

    ``` {.yaml}
    logout_redirect: "/pun/sys/dashboard/logout"
    ```

Example

:   See:

    -   `add-shibboleth-authentication`{.interpreted-text role="ref"}
    -   `add-cilogon-authentication`{.interpreted-text role="ref"}
:::

Configure Reverse Proxy {#ood-portal-generator-configuration-configure-reverse-proxy}
-----------------------

The reverse proxy will proxy a request to any specified host and port
through IP sockets. This is different than what is used for proxying to
per-user NGINX processes through Unix domain sockets. This can be used
to connect to Jupyter notebook servers, RStudio servers, VNC servers,
and more\... This is disabled by default as it can be security risk if
not properly setup using a good `host_regex`.

A URL request to the `node_uri` will reverse proxy to the given `host`
and `port` using the **full** URI path. So a request to the frontend
Apache proxy that looks like:

``` {.http}
GET /<node_uri>/<host>/<port>/... HTTP/1.1
Host: ondemand.example.edu
```

will be reverse proxied to the backend server with the following request
format:

``` {.http}
GET /<node_uri>/<host>/<port>/... HTTP/1.1
Host: <host>:<port>
```

A URL request to the `rnode_uri` will reverse proxy to the given `host`
and `port` using the **relative** URI path. So a request to the frontend
Apache proxy that looks like:

``` {.http}
GET /<rnode_uri>/<host>/<port>/... HTTP/1.1
Host: ondemand.example.edu
```

will be reverse proxied to the backend server with the following request
format:

``` {.http}
GET /... HTTP/1.1
Host: <host>:<port>
```

Notice that we strip off the portion of the URI request path that is
used to determine the backend web server.

Both formats are provided to better support the varying capabilities for
the multitude of web application servers. For the case of using
`node_uri` the developer will need to modify the web server to
accommodate requests with a sub-URI that follows the dynamic formatting
of `/<node_uri>/<host>/<port>`. For the case of using `rnode_uri` the
developer needs to confirm that all assets and links supplied by the web
server are relative and not absolute.

::: {.describe}
host\_regex (String)

the regular expression used as a whitelist for allowing a user to
reverse proxy to a given host

Default

:   Allow proxying to all hosts in the world (please change this if you
    enable this feature)

    ``` {.yaml}
    host_regex: "[^/]+"
    ```

Example

:   Restrict access to only within internal network

    ``` {.yaml}
    host_regex: "[\\w.-]+\\.example\\.com"
    ```
:::

::: {.describe}
node\_uri (String, null)

the URI used to reverse proxy a user to a server running on a given host
and port that knows the **full** URI path

Default

:   This feature is disabled by default

    ``` {.yaml}
    node_uri: null
    ```

Example

:   Use the recommended URI by our team

    ``` {.yaml}
    node_uri: "/node"
    ```
:::

::: {.describe}
rnode\_uri (String, null)

the URI used to reverse proxy a user to a server running on a given host
and port that knows the **relative** URI path

Default

:   This feature is disabled by default

    ``` {.yaml}
    rnode_uri: null
    ```

Example

:   Use the recommended URI by our team

    ``` {.yaml}
    rnode_uri: "/rnode"
    ```
:::

Configure per-user NGINX
------------------------

The reverse proxy will proxy a request under the `pun_uri` URI to the
user\'s per-user NGINX (PUN) process through Unix domain sockets. It
will send process signals to the user\'s PUN through the `nginx_uri`
URI. If either of these properties are `null` then PUN access will be
disabled.

::: {.describe}
nginx\_uri (String, null)

the URI used to control the PUN process

Default

:   User\'s can send signals to PUN through
    `http://www.example.com/nginx`

    ``` {.yaml}
    nginx_uri: "/nginx"
    ```

Example

:   Use a different URI

    ``` {.yaml}
    node_uri: "/my_pun_controller"
    ```
:::

::: {.describe}
pun\_uri (String, null)

the URI used to access the PUN process

Default

:   User\'s access their PUN through `http://www.example.com/pun`

    ``` {.yaml}
    pun_uri: "/pun"
    ```

Example

:   Use a different URI

    ``` {.yaml}
    pun_uri: "/my_pun_apps"
    ```
:::

::: {.describe}
pun\_socket\_root (String)

the root directory that contains the socket files for the running PUNs

Default

:   Using a default installation

    ``` {.yaml}
    pun_socket_root: "/var/run/ondemand-nginx"
    ```

Example

:   Socket files are located in a different directory

    ``` {.yaml}
    pun_socket_root: "/path/to/pun/sockets"
    ```
:::

::: {.describe}
pun\_max\_retries (Integer)

the number of times the proxy attempt to connect to the PUN before
giving up and displaying an error to the user

Default

:   Only try 5 times

    ``` {.yaml}
    pun_max_retries: 5
    ```

Example

:   Try 25 times

    ``` {.yaml}
    pun_max_retries: 25
    ```
:::

Configure OpenID Connect
------------------------

If using OpenID Connect for authentication, these are a few properties
you will need to tweak. For a better understanding of these options you
should read more on
[mod\_auth\_openidc](https://github.com/zmartzone/mod_auth_openidc).

::: {.describe}
oidc\_uri (String, null)

the redirect URI used by
[mod\_auth\_openidc](https://github.com/zmartzone/mod_auth_openidc) for
authentication

Default

:   This is disabled by default

    ``` {.yaml}
    oidc_uri: null
    ```

Example

:   Enable it on a recommended URI

    ``` {.yaml}
    oidc_uri: "/oidc"
    ```
:::

::: {.describe}
oidc\_discover\_uri (String, null)

the URI a user is redirected to if they are not authenticated by
[mod\_auth\_openidc](https://github.com/zmartzone/mod_auth_openidc) and
is used to discover the ID provider the user will use to login through

Default

:   This is disabled by default

    ``` {.yaml}
    oidc_discover_uri: null
    ```

Example

:   Enable it to a recommended URI

    ``` {.yaml}
    oidc_discover_uri: "/discover"
    ```
:::

::: {.describe}
oidc\_discover\_root (String, null)

the root directory on the file system that serves the HTML code used for
the discovery page

Default

:   This is disabled by default

    ``` {.yaml}
    oidc_discover_root: null
    ```

Example

:   Enable it to the recommended path

    ``` {.yaml}
    oidc_discover_root: "/var/www/ood/discover"
    ```
:::

Configure User Registration
---------------------------

If you are using a `grid-mapfile`{.interpreted-text role="program"} to
map the authenticated user name to a system user name, then this will be
used to generate mappings in the file for a user\'s first time accessing
your website. Setting either property below to `null` will disable this
feature.

::: {.note}
::: {.title}
Note
:::

This is unnecessary if you use regular expressions for mapping the
authenticated user name to a system user name.
:::

::: {.describe}
register\_uri (String, null)

the URI a user is redirected to if no mapping exists between an
authenticated user name and a system user name

Default

:   This is disabled by default. An error is displayed the user if
    mapping fails.

    ``` {.yaml}
    register_uri: null
    ```

Example

:   Enable it to a recommended URI

    ``` {.yaml}
    register_uri: "/register"
    ```
:::

::: {.describe}
register\_root (String, null)

the root directory on the file system that serves the HTML code used for
the registration page

Default

:   This is disabled by default. An error is displayed the user if
    mapping fails.

    ``` {.yaml}
    register_root: null
    ```

Example

:   Enable it to the recommended path

    ``` {.yaml}
    register_root: "/var/www/ood/register"
    ```
:::
