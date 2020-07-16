---
id: installation-from-source-ood-infrastructure
title: Install OnDemand Infrastructure
sidebar_label: Install OnDemand Infrastructure
---
OnDemand's core infrastructure is stored in a Github repository located
at <https://github.com/osc/ondemand>, and it is installed to `/opt/ood`.

```bash
cd /opt/ood
git init
git remote add origin https://github.com/osc/ondemand
git pull origin master
```

:::caution Warning
We need to perform the `git init` and `pull` instead of a `clone`
because `/opt/ood` already exists because it is created by one of the
other RPMs that we have installed, and `git` will refuse to clone into
an existing directory with contents.
:::


This will install the following components
- [mod\_ood\_proxy](/infrastructure/mod-ood-proxy.html)
- [nginx\_stage](/infrastructure/nginx_stage.html)
- [ood\_auth\_map](/infrastructure/ood_auth_map.html)
- [ood\_portal\_generator](/infrastructure/ood_portal_generator.html)

These dependencies are self contained and do not require additional
build steps. When installing from source there will some other
directories (i.e. `packaging`) but they are not relevant at runtime.
