---
id: applications-editor
title: applications-editor
sidebar_label: Editor
---
File Editor App {#editor}
===============

[View on
GitHub](https://github.com/OSC/ondemand/tree/master/apps/file-editor)

![Example of the File Editor App viewing the contents of a
file.](/images/editor-app.png){.align-center}

This Open OnDemand application provides a web-based file editor that
allows the user to remotely edit files on the HPC center\'s local file
system. This application is built with the [Ruby on
Rails](http://rubyonrails.org/) web application framework.

The File Editor App uses the [Ace Editor](https://ace.c9.io/) (an
embeddable code editor written in JavaScript) as the client-side editor.
This client provides syntax highlighting, automatic indenting, key
bindings, code folding, and many more features.

Usage
-----

This app is deployed on the OnDemand Server under the following path on
the local file system:

    /var/www/ood/apps/sys/file-editor

and can be accessed with the following browser request:

How it Works
------------

Requirements needed for the File Editor App to work on your local HPC
network:

-   OnDemand Server

-   Shared File System

    > Diagram detailing how the File Editor App interacts with the HPC
    > infrastructure.

`editor-diagram`{.interpreted-text role="numref"} details how the File
Editor App works on a local HPC system. The user\'s PUN running on the
OnDemand Server launches the Ruby on Rails File Editor app through
[Passenger](https://www.phusionpassenger.com/) as the user. The File
Editor app then interacts with the local and shared file systems for
reading and writing the file contents.
