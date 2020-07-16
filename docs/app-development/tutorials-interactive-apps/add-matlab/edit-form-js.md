---
id: app-development-tutorials-interactive-apps-add-matlab-edit-form-js
title: app-development-tutorials-interactive-apps/add-matlab-edit-form-js
sidebar_label: Edit Form-js
---
Edit Form.js {#app-development-tutorials-interactive-apps-add-matlab-edit-form-js}
============

OnDemand supports dynamic interactive forms using a file named
`~/ondemand/dev/bc_my_center_matlab/form.js`. This file is free-form;
anything that can be done with client-side JavaScript may be done in
this file. OSC has used this file to:

-   Limit the user\'s CPU/memory selection options to the type of
    hardware that they are requesting ([OSC MATLAB
    JavaScript](https://github.com/OSC/bc_osc_matlab/blob/master/form.js))
-   Show or hide a license field based on whether the user is permitted
    to use the OSC academic license or if they are required to use a
    different license provider ([OSC ANSYS
    JavaScript](https://github.com/OSC/bc_osc_ansys_workbench/blob/master/form.js))
-   Implement a file picker using the File Explorer\'s API,
    [Webpack](https://webpack.js.org/), and [VueJS](https://vuejs.org/)
    ([bc\_js\_filepicker](https://github.com/OSC/bc_js_filepicker))

::: {.warning}
::: {.title}
Warning
:::

Be aware that client side validation provided by JavaScript is not
perfect and any critical values should be validated / sanitized server
side in `script.sh.erb` or `submit.yml.erb`.
:::

::: {.note}
::: {.title}
Note
:::

This file is not required and may be empty or not exist.
:::
