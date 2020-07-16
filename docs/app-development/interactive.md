---
id: app-development-interactive
title: app-development-interactive
sidebar_label: Interactive
---
Interactive Apps {#app-development-interactive}
================

`interactive`{.interpreted-text role="ref"} can be developed and
deployed using the same tools that are currently provided for all Open
OnDemand applications but requires further
`app-development-interactive-setup`{.interpreted-text role="ref"}.

An Interactive App is a `dashboard`{.interpreted-text role="ref"} plugin
that follows a custom file/directory structure and API that can be
described by the four stages:
`app-development-interactive-form`{.interpreted-text role="ref"},
`app-development-interactive-template`{.interpreted-text role="ref"},
`app-development-interactive-submit`{.interpreted-text role="ref"}, and
`app-development-interactive-view`{.interpreted-text role="ref"}.

A typical file/directory structure for an Interactive App can look like:

    my_app/
    ├── form.yml
    ├── manifest.yml
    ├── submit.yml.erb
    ├── template
    │   ├── before.sh.erb
    │   └── script.sh.erb
    └── view.html.erb

Each of these files/directories are described below in their respective
stage.

::: {.toctree maxdepth="3" caption="Stages of an Interactive App"}
interactive/form interactive/template interactive/submit
interactive/view
:::
