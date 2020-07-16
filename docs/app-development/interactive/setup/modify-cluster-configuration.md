---
id: app-development-interactive-setup-modify-cluster-configuration
title: app-development-interactive/setup-modify-cluster-configuration
sidebar_label: Modify Cluster-configuration
---
Modify Cluster Configuration {#app-development-interactive-setup-modify-cluster-configuration}
============================

If you haven\'t already done so, you will need to first have a
corresponding cluster configuration file for the cluster you intend to
submit `interactive`{.interpreted-text role="ref"} batch jobs to. It is
recommended you follow the directions on
`add-cluster-config`{.interpreted-text role="ref"}.

Modify the cluster configuration file with the necessary information so
that a batch script generated from an interactive app can find the
installed copies of [TurboVNC](https://turbovnc.org/) and
[websockify](https://github.com/novnc/websockify):

``` {.yaml}
# /etc/ood/config/clusters.d/my_cluster.yml
---
v2:
  metadata:
    title: "Cluster 1"
  login:
    host: "my_cluster.my_center.edu"
  job:
    adapter: "..."
    ...
  batch_connect:
    basic:
      script_wrapper: |
        module purge
        %s
    vnc:
      script_wrapper: |
        module purge
        export PATH="/usr/local/turbovnc/bin:$PATH"
        export WEBSOCKIFY_CMD="/usr/local/websockify/run"
        %s
```

where we introduced the configuration option `batch_connect` that allows
us to add global settings for both a `basic` interactive web server as
well as a `vnc` interactive web server.

In the above case we modify the global setting `script_wrapper` for both
`basic` and `vnc` sessions. This allows us to supply
`bash`{.interpreted-text role="command"} code that wraps around the body
of the template script (specified by `%s`). First, we purge the module
environment to remove any conflicting modules that may have been loaded
by the user\'s `.bashrc` or `.bash_profile` files. Then we specify the
required environment needed by the `vnc` script to launch
[TurboVNC](https://turbovnc.org/) and
[websockify](https://github.com/novnc/websockify).

::: {.note}
::: {.title}
Note
:::

You will most likely need to replace the block of code below in your
cluster configuration file:

``` {.yaml}
script_wrapper: |
  module purge
  export PATH="/usr/local/turbovnc/bin:$PATH"
  export WEBSOCKIFY_CMD="/usr/local/websockify/run"
  %s
```

with a block that adds the full path to the TurboVNC binaries into the
`PATH` environment variable as well as the corresponding websockify
launcher into the `WEBSOCKIFY_CMD` environment variable.
:::

::: {.warning}
::: {.title}
Warning
:::

Do not forget to include the `%s` in the `script_wrapper` configuration
option. Otherwise the actual `bash`{.interpreted-text role="command"}
code that launches the corresponding web servers will never be
interpolated into the main batch script and run.
:::
