import React from 'react';
// Importa el objeto original de componentes de MDX
import MDXComponents from '@theme-original/MDXComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Añadimos los iconos que queramos a la librería global
library.add(fab, fas);

export default {
  // Reutiliza los componentes por defecto (h1, p, a, etc.)
  ...MDXComponents,
  // Añade el componente FontAwesomeIcon para que esté disponible en todo el Markdown
  FontAwesomeIcon,
};