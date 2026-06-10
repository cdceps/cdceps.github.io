---
slug: /
title: Introducción al Portal de Soporte
---

# Soporte Digital para la Docencia

Bienvenido al portal oficial de documentación y recursos técnicos del **Centro de Cálculo** de la **Escuela Politécnica Superior (EPS)**. 

Este espacio ha sido diseñado como un entorno centralizado de soporte digital para el profesorado, con el objetivo de optimizar la gestión tecnológica de los laboratorios de prácticas, facilitar la consulta de configuraciones de aula y centralizar las herramientas y guías de administración de sistemas utilizadas en la Escuela.

## 📊 Arquitectura de contenidos <a id="arquitectura-contenidos"></a>

<br />
<img 
  src="/img/diagrama-portal-soporte-digital.svg" 
  alt="Diagrama de Soporte Digital" 
  style={{ width: '100%', display: 'block', margin: '0 auto' }} 
/>

---

## 🗺️ Estructura del Portal

Para facilitar la navegación y localización de recursos, el ecosistema de soporte se divide en los siguientes bloques:

* [**Aulas de Informática**](./docs/aulas): Información técnica detallada, mapa de puestos, direccionamiento IP estático y estado de la infraestructura de hardware de cada laboratorio de la Escuela.
* [**Scripts de Control y Automatización**](./docs/cia-control-internet-aulas): Catálogo de herramientas y scripts desarrollados por el Centro de Cálculo para la administración remota de laboratorios. Incluye la herramienta actual de gestión de conectividad (**CIA**), así como futuras utilidades de despliegue automatizado.
* [**Guías Técnicas**](./docs/guias): Manuales de referencia técnica para el despliegue de tecnologías en el aula. Actualmente enfocado en la optimización de **PowerShell 7** y **PS Gallery**.
* [**Contacto y Soporte**](./docs/contacto): Canales oficiales de contacto con el personal técnico de la EPS para la resolución de consultas y soporte personalizado.

---

:::info[⚡ Script CIA]

El recurso principal de este portal es el script [**Control Internet Aulas (CIA)**](/docs/cia-control-internet-aulas), una herramienta de administración remota basada en PowerShell que permite al docente tomar el control de la conectividad de red del aula en tiempo real (Modo Examen).

:::

> **ℹ️ Nota de Infraestructura:**  
> Todos los recursos y scripts referenciados en este portal se encuentran en constante revisión y actualización por el personal técnico para adaptarse a las directivas corporativas de Windows 11.