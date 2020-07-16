---
id: app-development-tutorials-interactive-apps-add-jupyter-deploy
title: app-development-tutorials-interactive-apps/add-jupyter-deploy
sidebar_label: Deploy
---
Deploy Jupyter App {#app-development-tutorials-interactive-apps-add-jupyter-deploy}
==================

After you\'ve confirmed you are happy with all of your app changes you
can deploy it as a System App.

::: {.warning}
::: {.title}
Warning
:::

The following steps **MUST** be done from the OnDemand host and not
another machine.
:::

1.  Go to your OnDemand sandbox directory:

    ``` {.sh}
    cd ~/ondemand/dev
    ```

2.  Copy the app to the system deployment location as **root**:

    ``` {.sh}
    sudo cp -r jupyter /var/www/ood/apps/sys/.
    ```

3.  In your browser navigate to the OnDemand URL and confirm you see the
    new app in the *Interactive Apps* dropdown on the
    `dashboard`{.interpreted-text role="ref"}:

        https://ondemand.my_center.edu/
