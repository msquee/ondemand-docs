---
id: app-development-interactive-view
title: app-development-interactive-view
sidebar_label: View
---
Connection View {#app-development-interactive-view}
===============

The HTML template file `view.html.erb` is responsible for providing the
user with a small web interface that makes connecting to the backend web
server running on the compute node for a given interactive session as
simple as possible. It is located in the root of the application
directory.

Assuming we already have a sandbox Interactive App deployed under:

    ${HOME}/ondemand/dev/my_app

The `view.html.erb` configuration file can be found at:

    ${HOME}/ondemand/dev/my_app/view.html.erb

The `.erb` file extension will cause the HTML file to be processed using
the [eRuby (Embedded Ruby)](https://en.wikipedia.org/wiki/ERuby)
templating system. This allows you to embed Ruby code into the HTML file
for flow control, variable substitution, and more.

::: {.danger}
::: {.title}
Danger
:::

If developing a VNC Interactive App, **DO NOT** include the
`view.html.erb` file. The Dashboard has internal logic in place for
displaying connection information of VNC sessions to the user.
:::

Session Information
-------------------

A **running** interactive session will generate a connection information
file in the working directory of the corresponding batch job. This
information is then made available to the HTML template `view.html.erb`
when it is rendered. The possible connection information attributes are:

host

:   the hostname of the compute node that the interactive session is
    running on

port

:   the port number that the running web server is listening on

password

:   the password that the web server expects when authenticating the
    user

Typically these attributes are used to construct links or forms within
the `view.html.erb` file. See the various
`app-development-interactive-view-examples`{.interpreted-text
role="ref"} below.

Reverse Proxy
-------------

A detailed introduction to the reverse proxy can be found in
`ood-portal-generator-configuration-configure-reverse-proxy`{.interpreted-text
role="ref"}. Under a default installation the following URL paths will
be enabled:

::: {.note}
::: {.title}
Note
:::

In order to leverage the reverse proxy that comes with Open OnDemand the
system administrator must have it enabled as outlined under
`app-development-interactive-setup-enable-reverse-proxy`{.interpreted-text
role="ref"}. It only needs to be enabled once and then all developers
can take advantage of it within their applications.
:::

Typically generating links with `/node` is preferred if the web server
can be configured with a sub-URI. For instance, the [Jupyter Notebook
server](http://jupyter.readthedocs.io/en/latest/) can be
[configured](http://jupyter-notebook.readthedocs.io/en/stable/config.html)
with a sub-URI using the `NotebookApp.base_url` option:

``` {.python}
c.NotebookApp.base_url = '/node/node01.my_center.edu/8080/'
```

Some web servers that are known to work with `/node`:

-   [Jupyter Notebook server](http://jupyter.readthedocs.io/en/latest/)

Links can be generated with `/rnode` if the web server relies **ONLY**
on relative links and does not use any absolute links. Some web servers
that are known to work with `/rnode` are:

-   [COMSOL Server](https://www.comsol.com/comsol-server)
-   [RStudio Server](https://www.rstudio.com/products/rstudio-server/)

Stylizing
---------

The `view.html.erb` HTML template has access to [Bootstrap
3](https://getbootstrap.com/docs/3.3/) and [Font
Awesome](https://fontawesome.com/) allowing any stylistic pizzazz to be
added to it.

For example, to make a link that appears as a button with an icon in it,
you can do:

``` {.html}
<a href="#" class="btn btn-primary">
  <i class="fa fa-eye"></i> Connect to My App
</a>
```

All stylization is handled through the HTML [class global
attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)
using predefined Bootstrap and Font Awesome classes.

Examples {#app-development-interactive-view-examples}
--------

The simplest example of a `view.html.erb` consists of just a plain link
to the backend running web server using the Open OnDemand reverse proxy:

``` {.html+erb}
<a href="/node/<%= host %>/<%= port %>/">Click me!</a>
```

where `host` and `port` are rendered using the interactive session\'s
connection information.

::: {.danger}
::: {.title}
Danger
:::

It is not safe to submit `password` in a `GET` request as this can
appear in logs. It is recommended to use a `POST` request if available,
see below.
:::

### POST Password

For some Interactive Apps you may want a single click solution that not
only connects the user to the backend web server but also logs them in
with the generated session password. This may be possible depending on
the web server you use.

For the case of a [Jupyter Notebook
server](http://jupyter.readthedocs.io/en/latest/) we can create a button
that submits a form with the `password` included in it to the Jupyter
server\'s login page.

``` {.html+erb}
<form action="/node/<%= host %>/<%= port %>/login" method="post">
  <input type="hidden" name="password" value="<%= password %>">
  <button class="btn btn-primary" type="submit">
    <i class="fa fa-eye"></i> Connect to Jupyter
  </button>
</form>
```

In this example, the password is stored in a hidden input field that the
user doesn\'t see and it gets communicated to the Jupyter server in the
`POST` request.
