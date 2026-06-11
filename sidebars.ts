import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Crear una barra lateral nos permite:
 * - crear un grupo ordenado de documentos
 * - mostrar una barra lateral para cada documento de ese grupo
 * - proporcionar navegación siguiente/anterior
 *
 * Las barras laterales se pueden generar desde el sistema de archivos o definir explícitamente aquí.
 */

const sidebars: SidebarsConfig = {
  sidebar: [
    {
      type: 'doc',
      id: 'readme',
      label: 'Introducción',
    },
    {
      type: 'category',
      label: 'Aulas CATEPS',
      link: {
        type: 'generated-index',
        title: 'Guía de Aulas',
        description: 'Configuración técnica, software y planos de las aulas de Informática del CATEPS.',
        slug: '/aulas',
      },
      collapsed: true,
      items: [
        'aulas/L1-D-ATC',
        'aulas/L2-D-ATC',
        'aulas/L1-A-ESC',
      ],
    },
    {
      type: 'category',
      label: 'Scripts', // 1. Contenedor puro, solo se despliega y no enlaza a nada
      items: [
        {
          type: 'category',
          label: 'CIA / Control Internet Aulas', // 2. Subcategoría con el texto largo
          link: { type: 'doc', id: 'cia-control-internet-aulas' },     // 3. Enlaza directamente a /docs/cia
          items: [
            'cia-changelog',                     // 4. Sus 3 subsecciones dependientes
            'cia-checksum',
            {
              type: 'doc',
              id: 'cia-faq',
              label: 'FAQs',
              className: 'sidebar-faq-item',
            },
          ],
        },
        {
          type: 'html',
          value: '<hr class="sidebar-hr" />',    // 5. La línea divisoria justo debajo de todo el bloque de CIA
        },
      ],
    },
    {
      type: 'category',
      label: 'Guías',
      link: { type: 'doc', id: 'guias' },
      items: [
        'powershell-7',
        'powershell-gallery',
      ],
    },
    'contacto',
  ],
};

export default sidebars;