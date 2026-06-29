import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: 'Ayuda Docente',
  tagline: 'Centro de Soporte: Guías de configuración y gestión avanzada de sistemas de la EPS.',
  favicon: 'img/favicon-cdceps.ico',
  baseUrl: '/', 
  baseUrlIssueBanner: true,
  url: 'https://cdceps.github.io', 
  organizationName: 'cdceps',
  projectName: 'cdceps.github.io', 

  onBrokenLinks: 'ignore', 
  trailingSlash: false,

  future: {
    v4: true,
    faster: false
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
  
  clientModules: ['./src/css/clear-tooltips.ts'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'docs', 
          sidebarPath: './sidebars.ts',
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
      {
    from: '/docs/aulas',
    to: '/docs/aulas-cateps',
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
	'./src/plugins/tailwind-config.js',
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
        title: 'Ayuda Docente',
        logo: {
          alt: 'logo EPS',
          src: 'img/logo-eps.png',
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
            title: '',
          },      
          {
            href: 'https://eps.us.es/',      
            position: 'right',
            label: 'EPS',
            title: '',
          },
		  {
			href: 'https://github.com/cdceps/',
			position: 'right',
			label: 'GitHub EPS',
			className: 'navbar-github-mobile-only',
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
            title: '',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [], 
        copyright: `Copyright © ${new Date().getFullYear()} Escuela Politécnica Superior. Creado con <a href="https://docusaurus.io/" class="footer-link-docusaurus">Docusaurus</a><img src="/img/docusaurus-icon.svg" alt="Icono Docusaurus" class="footer-dino" />`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;