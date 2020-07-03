module.exports = {
  title: 'Open OnDemand',
  tagline: 'Supercomputing. Seamlessly. Open, Interactive HPC Via the Web.',
  url: 'https://docs.openondemand.org',
  baseUrl: '/',
  favicon: 'img/ood-mark-rgb.png',
  organizationName: 'Ohio Supercomputer Center',
  projectName: 'ondemand',
  themeConfig: {
    defaultDarkMode: true,
    /*
    announcementBar: {
      id: 'support_us',
      content:
        'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
      backgroundColor: '#fafbfc', // Defaults to `#fff`.
      textColor: '#091E42', // Defaults to `#000`.
    },*/
    navbar: {
      title: 'Open OnDemand',
      logo: {
        alt: 'Open OnDemand Logo',
        src: 'img/ood-mark-rgb.png',
        srcDark: 'img/ood-mark-white.png',
        target: '_self',
      },
      links: [
        {
          to: 'docs/',
          
          label: 'Docs',
          position: 'left',
          items: [
            {
              label: '1.8',
              to: 'docs/'
            },
            {
              label: '1.7',
              to: 'docs/version/1.7'
            },
            {
              label: '1.6',
              to: 'docs/version/1.6'
            },
            {
              label: 'Master',
              to: 'docs/next'
            }
          ]
        },
        {
          href: 'https://discourse.osc.edu/c/open-ondemand',
          label: 'Discourse',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/OSC/ondemand',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discourse',
              href: 'https://discourse.osc.edu',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/open_ondemand',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OSC/ondemand',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ohio Supercomputer Center. Made in Flavortown, Ohio.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: false,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
