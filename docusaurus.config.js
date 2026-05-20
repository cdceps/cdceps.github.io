import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ayuda Docente - EPS',
  tagline: 'Centro de Soporte: Guías de configuración y gestión avanzada de sistemas de la EPS.',
  favicon: 'img/favicon-cateps.ico',
  baseUrl: '/', 
  baseUrlIssueBanner: true,
  url: 'https://cdceps.github.io', 
  organizationName: 'cdceps',
  projectName: 'cdceps.github.io', 

  onBrokenLinks: 'ignore', 
  trailingSlash: false,

future: {
    v4: true,
    faster: true
  },
  
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs', 
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/redirect-cia',
            to: '/docs/cia-control-internet-aulas', 
          },
        ],
      },
    ],
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        language: ["es"],
        docsRouteBasePath: "docs", 
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
    function suppressWarningsPlugin() {
      return {
        name: 'suppress-warnings',
        configureWebpack() {
          return {
            ignoreWarnings: [
              { module: /vscode-languageserver-types/ },
              /Critical dependency/
            ],
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark', 
        disableSwitch: true,
        respectPrefersColorScheme: false, 
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      image: 'img/card.png',
      navbar: {
        title: 'Ayuda Docente - EPS',
        logo: {
          alt: 'logo CATEPS',
          src: 'img/logo-cateps.png',
        },
        items: [
          {
            to: '/docs', 
            position: 'left',
            label: 'Docs',
            exact: true,
            className: 'navbar-docs-highlight',
          },
          {
			to: '/docs/cia-control-internet-aulas', 
			position: 'left',
			label: 'CIA / Control Internet Aulas',
			className: 'navbar-btn-cia',
			activeBaseRegex: 'docs/cia-(control-internet-aulas|changelog|checksum|faq)', 
		  },
          {
            href: 'https://www.us.es/',      
            position: 'right',
            label: 'US',
            title: 'Universidad de Sevilla',
          },      
          {
            href: 'https://eps.us.es/',      
            position: 'right',
            label: 'EPS',
            title: 'Escuela Politécnica Superior',
          },
          {
            to: '/docs/contacto', 
            position: 'right',
            label: 'Contacto',
          },
          {
            href: 'https://github.com/cdceps/',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            title: 'GitHub EPS',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [], 
        copyright: `Copyright © ${new Date().getFullYear()} Escuela Politécnica Superior. Creado con <a href="https://docusaurus.io/" class="footer-link-docusaurus">Docusaurus</a><img src="/img/docusaurus-icon.svg" alt="Icono" style="width:25px; vertical-align:baseline; position:relative; bottom:-3px; margin-left:5px;" />`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;