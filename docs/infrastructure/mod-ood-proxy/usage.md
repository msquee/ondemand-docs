---
id: infrastructure-mod-ood-proxy-usage
title: infrastructure-mod-ood-proxy-usage
sidebar_label: Usage
---
Usage {#mod-ood-proxy-usage}
=====

`mod-ood-proxy`{.interpreted-text role="ref"} provides a number of
handlers listed below that should be incorporated into the Apache
configuration file through the `LuaHookFixups` hook. This hook is
defined as the *fix anything* phase before the content handlers are run.
This will ensure that any authentication modules are called before the
`mod-ood-proxy`{.interpreted-text role="ref"} handlers are loaded.

A minimal Apache configuration file will look like:

``` {.apache}
# Lua configuration
#
LuaRoot "/opt/ood/mod_ood_proxy/lib"
#LogLevel lua_module:info
```

where `LuaRoot` should point to the installation location and `LogLevel`
can be uncommented if you want a more verbose log.

Also, all configuration for this mod is done through CGI environment
variables specified within your Apache configuration as:

``` {.apache}
# Argument set before LuaHookFixups phase and used by mod_ood_proxy handler
SetEnv ARG_FOR_LUA "value of argument"
```

::: {.toctree maxdepth="2" caption="Handlers"}
handlers/nginx-handler handlers/pun-proxy-handler
handlers/node-proxy-handler handlers/analytics-handler
:::
