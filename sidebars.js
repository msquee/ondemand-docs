const glob = require('glob')

module.exports = {
  someSidebar: {
    'Getting Started': ['welcome', 'infrastructure'],
    'General': [
      'architecture'
    ],
    Install: [
      'installation',
      'requirements',
      {
        type: 'category',
        label: 'Installation',
        items: [
          'installation/installation-install-software',
          {
            type: 'category',
            label: 'Install From Source',
            items: [
              'installation/installation-from-source',
              'installation/from-source/installation-from-source-system-dependencies',
              'installation/from-source/installation-from-source-ood-infrastructure',
              'installation/from-source/installation-from-source-core-apps',
              'installation/from-source/installation-from-source-finalizing'
            ],
          },
          'installation/installation-modify-system-security',
          'installation/installation-start-apache'
        ]
      },
    ],
    'Extend': ['test'],
    'Deploy': ['test'],
    'Develop Interactive Apps': ['test'],
    'Develop Passenger Apps': ['test'],
  },
};
