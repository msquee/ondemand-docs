---
id: installation-from-source-core-apps
title: Install OnDemand Core Applications
sidebar_label: Install OnDemand Core Applications
---
:::info Note
The OnDemand team is in the process of moving core applications to a
monolithic repository which will significantly simplify installation.
:::

OnDemand's core applications are stored in their own Github
repositories and should each be cloned to `/var/www/ood/apps/sys/$APP`:

- [ood-activejobs](): `/var/www/ood/apps/sys/activejobs`
- [ood-dashboard](): `/var/www/ood/apps/sys/dashboard`
- [ood-fileeditor](): `/var/www/ood/apps/sys/file-editor`
- [ood-fileexplorer](): `/var/www/ood/apps/sys/files`
- [ood-myjobs]() : `/var/www/ood/apps/sys/myjobs`
- [ood-shell](): `/var/www/ood/apps/sys/shell`

Each application has its own dependencies which need to be installed
(from either NPM or Ruby Gems) by running the following:

```bash
cd /var/www/ood/apps/sys/$APP
# We have both Node and Rails applications, let's cover both in a single command
sudo NODE_ENV=production RAILS_ENV=production scl enable ondemand -- bin/setup
```

:::info Note
`scl enable ondemand` is equivalent to simultaneously enabling:
rh-nodejs10 rh-ruby25.
:::

:::info Note
For operating systems without [Software Collections]() the
`scl enable ... --` portion will be unnecessary so long as the correct
versions of NodeJS and Ruby are available at build time.
:::