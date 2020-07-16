---
id: applications-active-jobs
title: applications-active-jobs
sidebar_label: Active Jobs
---
Active Jobs App {#active-jobs}
===============

[View on
GitHub](https://github.com/OSC/ondemand/tree/master/apps/activejobs)

![Example of the Active Jobs App displaying all jobs submitted to the
clusters.](/images/active-jobs-app.png){.align-center}

This Open OnDemand application provides a web-based view of the current
status of all the available jobs on the batch servers hosted by the HPC
center. This application is built with the [Ruby on
Rails](http://rubyonrails.org/) web application framework.

The Active Jobs App displays all the available jobs in a dynamically
searchable and sortable table. The user can search on job id, job name,
job owner, charged account, status of job, as well as the cluster the
job was submitted to. Progressive disclosure is used to show further
details on individual jobs by clicking in the \"right arrow\" to the
left of a table row.

Usage
-----

This app is deployed on the OnDemand Server under the following path on
the local file system:

    /var/www/ood/apps/sys/activejobs

and can be accessed with the following browser request:

How it Works
------------

Requirements needed for the Active Jobs App to work on your local HPC
network:

-   OnDemand Server

-   Resource Manager Server (e.g., Torque/PBS Batch Server)

    > Diagram detailing how the Active Jobs App interacts with the HPC
    > infrastructure.

`active-jobs-diagram`{.interpreted-text role="numref"} details how the
Active Jobs App works on a local HPC system. The user\'s PUN running on
the OnDemand Server launches the Ruby on Rails Active Jobs app through
[Passenger](https://www.phusionpassenger.com/) as the user. The Active
Jobs app then retrieves a list of available jobs from the resource
manager server through either a library call or forking a binary such as
`qstat` and parsing the output.
