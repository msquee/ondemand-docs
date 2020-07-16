---
id: applications-interactive
title: applications-interactive
sidebar_label: Interactive
---
Interactive Apps (Plugins) {#interactive}
==========================

![An example Interactive App that launches a desktop on the Owens
cluster at the [Ohio Supercomputer
Center](https://www.osc.edu/).](/images/interactive-app.png){.align-center}

Interactive Apps provide a means for a user to launch and connect to an
interactive batch job running a local web server (called Interactive App
sessions) through the OnDemand portal (e.g., [VNC
server](https://en.wikipedia.org/wiki/Virtual_Network_Computing),
[Jupyter Notebook server](http://jupyter.org/), [RStudio
server](https://www.rstudio.com/), [COMSOL
server](https://www.comsol.com/comsol-server/)). They are considered
**Dashboard App Plugins** and not
[Passenger](https://www.phusionpassenger.com/) apps such as the
`dashboard`{.interpreted-text role="ref"}, `shell`{.interpreted-text
role="ref"}, `files`{.interpreted-text role="ref"}, and etc.

This means that the Dashboard is responsible for building the
Interactive App\'s web form, submitting the batch job, and displaying
connection information to the user for a running Interactive App
session.

To get started it is **recommended** that an administrator walks through
`enable-desktops`{.interpreted-text role="ref"} at least once for your
Open OnDemand portal. This will ensure your Open OnDemand portal is
properly configured to host Interactive Apps.

Usage
-----

A **production** Interactive App (denoted by `sys`) is deployed on the
OnDemand Server under the following path on the local file system:

    /var/www/ood/apps/sys/my_app

A personal **sandbox** Interactive App (denoted by `dev`) that you are
developing is deployed in your home directory under the following path:

    ${HOME}/ondemand/dev/my_app

Interactive Apps are `dashboard`{.interpreted-text role="ref"} plugins.
They can be directly accessed through the following URLs:
