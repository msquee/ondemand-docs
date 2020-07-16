---
id: infrastructure-mod-ood-proxy-handlers-analytics-handler
title: infrastructure-mod-ood-proxy/handlers-analytics-handler
sidebar_label: Analytics Handler
---
analytics\_handler {#analytics-handler}
==================

This handler submits an HTTP request using the [Google Analytics
Measurement
Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/)
with data accumulated by the user page request. It only submits the data
if the user is authenticated and mapped to a local user name.

It is recommended that this handler be included under the `/pun`
location only. So an example Apache configuration file may look like:

``` {.apache}
<Location "/pun">
  ...

  SetEnv OOD_ANALYTICS_TRACKING_URL "http://www.google-analytics.com/collect"
  SetEnv OOD_ANALYTICS_TRACKING_ID  "UA-XXXXXXXX-X"
  LuaHookLog analytics.lua analytics_handler
</Location>
```

This handler is called in the `LuaHookLog` phase of the request-response
lifecycle. This occurs after the client has received the response so it
does not affect page load time for the client.

::: {.note}
::: {.title}
Note
:::

Please contact us if you\'d like to enable this feature and have access
to it. This will require us to generate a new Property ID for your
center that we can then share with you.
:::

Configuration
-------------

Configuration is handled by setting CGI environment variables within the
Apache configuration file with the following format:

``` {.apache}
SetEnv ARG_FOR_LUA "value of argument"
```

::: {.envvar}
OOD\_ANALYTICS\_TRACKING\_URL

The [Google Analytics Measurement
Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/)
URL that this handler submits the data to. Recommended value is
`http://www.google-analytics.com/collect`.
:::

::: {.envvar}
OOD\_ANALYTICS\_TRACKING\_ID

The Tracking ID / Property ID assigned by Google Analytics that contains
the appropriate custom dimensions and metrics.
:::
