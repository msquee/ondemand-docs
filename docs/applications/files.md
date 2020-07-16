---
id: applications-files
title: applications-files
sidebar_label: Files
---
Files App {#files}
=========

[View on GitHub](https://github.com/OSC/ondemand/tree/master/apps/files)

![Example of the Files App viewing the contents of a
directory.](/images/files-app.png){.align-center}

This Open OnDemand application provides a web-based file explorer that
allows the user to remotely interact with the files on the HPC center\'s
local file system. This application uses
[Node.js](https://nodejs.org/en/) as the code base and is based on the
[CloudCommander](http://cloudcmd.io/) file explorer app.

The Files App provides access to create files and folders, view files,
manipulate file locations, upload files, and download files. It also
provides integrated support for launching the Shell App in the currently
browsed directory as well as launching the File Editor App for the
currently selected file.

Usage
-----

This app is deployed on the OnDemand Server under the following path on
the local file system:

    /var/www/ood/apps/sys/files

and can be accessed with the following browser request:

How it Works
------------

Requirements needed for the Files App to work on your local HPC network:

-   OnDemand Server

-   Shared File System

    > Diagram detailing how the Files App interacts with the HPC
    > infrastructure.

`files-diagram`{.interpreted-text role="numref"} details how the Files
App works on a local HPC system. The user\'s PUN running on the OnDemand
Server launches the Node.js Files App through
[Passenger](https://www.phusionpassenger.com/) as the user. The Files
App then utilizes the [Node.js File
System](https://nodejs.org/docs/latest-v0.10.x/api/fs.html) core library
for interacting with the local and shared file systems.

::: {.warning}
::: {.title}
Warning
:::

For File Uploads, [NGINX](https://nginx.org/en/) will buffer the entire
file under the following path:

    /var/lib/ondemand-nginx/tmp/<user>/client_body

before [Passenger](https://www.phusionpassenger.com/) and subsequently
the Files App can gain access to it. The space allocated for this
location is one of the limiting factors on the size of file uploads.
:::
