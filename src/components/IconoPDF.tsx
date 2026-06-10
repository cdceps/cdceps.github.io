import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function IconoPDF(): JSX.Element {
  return (
    <FontAwesomeIcon 
      icon={"file-pdf" as IconProp} 
      size="xl" 
      style={{ 
        color: '#e74c3c', 
        marginLeft: '2px', 
        marginRight: '2px', 
        verticalAlign: 'middle' 
      }} 
    />
  );
}