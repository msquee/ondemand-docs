---
id: installation-requirements
title: Requirements
sidebar_label: Requirements
---

## Software Requirements
### Web nodes

- [Software Collections repositories](https://www.softwarecollections.org/en/)
- [lsof](https://en.wikipedia.org/wiki/Lsof)
- [sudo](https://www.sudo.ws/)
- [OnDemand repository](https://openondemand.org/): 
    - ondemand-{{ondemand\_version}}-1.el7.x86\_64.rpm

### Compute nodes

:::info Note
The following are required for using OnDemand with interactive
applications such as desktop environments, Jupyter Notebooks and
RStudio. If you do not intend to install interactive applications then
these are not necessary.
:::

-   [nmap-ncat](https://nmap.org/ncat/)
-   [TurboVNC](https://turbovnc.org/) 2.1+
-   [websockify](https://github.com/novnc/websockify) 0.8.0+

Hardware Requirements
---------------------

At [OSC](https://osc.edu) we have not quantified the minimum hardware
requirements for OnDemand. The VMs that run OnDemand have 16 cores and
64GB RAM. According to our Ganglia metrics that is over powered for our
normal utilization. We average 150MB memory per PUN and the average CPU
percentage per Per User NGINX (PUN) is 4%. Our OnDemand instance serves
over 600 unique users each month and at any given time usually has
60-100 PUN processes running.

The Passenger apps that make up the core of OnDemand (that NGINX is
configured with), are each killed after a short period (5 minutes) of
inactivity from the user, and when users are using NoVNC or connecting
to Jupyter Notebook or RStudio on a compute node, Apache is proxying
these users, bypassing the PUN completely. So it can happen that 60 PUNs
are running but twice the number of users are actually being served.

Another sizing factor that has impacted us in the past is the size of
the `/tmp` partition. We have had incidents where `/tmp` is exhausted
and so have increased the size from 20GB to 50GB.
