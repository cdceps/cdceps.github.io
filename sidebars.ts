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
        title: 'Guía de Aulas CATEPS',
        description: 'Configuración técnica, software y planos de las aulas de Informática del CATEPS.',
        slug: '/aulas-cateps', 
      },
      collapsed: true,
      items: [
        'aulas-cateps/L1-D-ATC',   
        'aulas-cateps/L2-D-ATC',  
        'aulas-cateps/L1-A-ESC',   
      ],
    },
    {
      type: 'doc',
      id: 'aulas-eps',            
      label: 'Aulas EPS',
    },
    {
      type: 'category',
      label: 'Scripts',
      items: [
        {
          type: 'category',
          label: 'CIA / Control Internet Aulas',
          link: { type: 'doc', id: 'cia-control-internet-aulas' },
          items: [
            'cia-changelog',
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
          value: '<hr class="sidebar-hr" />',
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