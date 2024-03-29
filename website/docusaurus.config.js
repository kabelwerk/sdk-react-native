const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  url: 'https://docs.kabelwerk.io',
  baseUrl: '/react-native/',

  title: "Kabelwerk's SDK for React Native",
  titleDelimiter: '—',
  favicon: 'img/logo.svg',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ version, docPath }) =>
            `https://github.com/kabelwerk/sdk-react-native/blob/v${version}/docs/${docPath}`,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    // used for the og:image <meta> tag
    image: 'https://kabelwerk.io/images/logo_256.png',

    navbar: {
      title: "Kabelwerk's SDK for React Native",
      logo: {
        src: 'img/logo.svg',
        alt: 'Kabelwerk logo',
      },
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/kabelwerk/sdk-react-native/blob/master/CHANGELOG.md',
          label: 'Changelog',
          position: 'right',
        },
        {
          href: 'https://github.com/kabelwerk/sdk-react-native',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'This SDK',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/kabelwerk/sdk-react-native',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/kabelwerk-react-native',
            },
          ],
        },
        {
          title: 'Other SDKs',
          items: [
            {
              label: 'JavaScript',
              href: 'https://docs.kabelwerk.io/js/',
            },
            {
              label: 'Dart',
              href: 'https://github.com/kabelwerk/sdk-dart',
            },
          ],
        },
        {
          title: 'Kabelwerk',
          items: [
            {
              label: 'Website',
              href: 'https://kabelwerk.io',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Impressum',
              href: 'https://kabelwerk.io/impressum.html',
            },
            {
              label: 'Privacy',
              href: 'https://kabelwerk.io/privacy.html',
            },
          ],
        },
      ],
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
