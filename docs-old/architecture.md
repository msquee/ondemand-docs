---
id: architecture
title: Architecture
sidebar_label: Architecture
---
import Mermaid from '@theme/mermaid';

Below are some diagrams of OnDemand’s architecture:
1. Overview is a high level visual generated from Powerpoint
2. System context and Container context diagrams below follow the C4 model for software diagrams, are more technically detailed and are built using draw.io
3. Request flow diagram is a sequence diagram built using mermaid.js

## Overview
1. Apache is the server front end, running as the Apache user, and accepting all requests from users and serves four primary functions
    1. Authenticates user
    2. Starts Per-User NGINX processes (PUNs)
    3. Reverse proxies each user to her PUN via Unix domain sockets
    4. Reverse proxies to interactive apps running on compute nodes (RStudio, Jupyter, VNC desktop) via TCP sockets

1. The Per-User NGINX serves web apps in Ruby and NodeJS and is how users submit jobs and start interactive apps

## System context
Users use OnDemand to interact with their HPC resources through a web browser.

All the gray components are specific to a given site and outside the OnDemand system.

## Container context
The Front-end proxy is the only component that is shared with all clients. The Front-end proxy will create Per User Nginx (PUN) processes (light blue boxes labeled “Per User Instance”).

:::tip Tip
In the C4 nomenclature, ‘containers’ are one level below the system context. This is not to be confused with Linux containers via cgroups and namespaces (i.e. Docker or Singularity or OCI containers).
:::

* Everything contained in the dotted line is a part of the OnDemand system (see blue box in System context diagram).
* Everything outside of it in gray is site specific components.
* The “Per User Instance” light blue boxes are replicated for every user accessing the system

## Request flow
This is the request flow through the OnDemand system. A user initiates a request through a browser and this illustrates how that request propogates through the system to a particular application (including the dashboard).
<Mermaid chart={`
sequenceDiagram
  autonumber
  User->>+Apache HTTP: Request
  activate Apache HTTP
  Apache HTTP->>+Authentication: Authenticate Request
  Authentication-->>-Apache HTTP: Authenticate Response
  Apache HTTP->>+Lua Scripts: Lua Hooks
  Lua Scripts->>Lua Scripts: Map user
  alt Socket doesn't exist
    Lua Scripts->>nginx: Start nginx as user
  end
  Lua Scripts->>-Lua Scripts: Modify request and proxy connection
  Apache HTTP->>nginx: Proxy request
  nginx->>Passenger / Application: Proxy request
  Passenger / Application-->>+nginx: Response
  nginx-->>Apache HTTP: Response
  Apache HTTP-->>User: Response
  deactivate Apache HTTP
`}/>
