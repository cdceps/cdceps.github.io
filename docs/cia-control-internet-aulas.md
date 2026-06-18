---
id: cia-control-internet-aulas
title: Control Internet Aulas (CIA)
tags:
  - Automatización
  - Modo Examen
  - PowerShell 7
  - Seguridad
sidebar_position: 1
---

<span className="theme-doc-version-badge badge badge--secondary" style={{ verticalAlign: 'middle', marginBottom: '0.5rem', display: 'inline-block' }}>Versión: 1.1.2</span>

# Control Internet Aulas

**CIA** (Control Internet Aulas) es la herramienta que permite al docente **restringir el acceso a Internet** en los equipos de un aula durante prácticas y exámenes, pudiéndo **restaurarlo** al terminar, todo desde su propio puesto y en cuestión de segundos.

:::info[¿Por qué existe esta herramienta?]
Cada vez es más frecuente que, durante un examen en un aula, algún alumno intente recurrir a páginas externas (asistentes de IA como ChatGPT o cualquier otro, así como foros, buscadores, etc.) para resolver las pruebas. Es una forma de plagio difícil de vigilar a simple vista. CIA cierra esa puerta: deja operativo únicamente lo necesario para el examen y bloquea el resto de Internet de forma simultánea en todos los puestos.
:::

------------------------------------------------------------------------

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageGallery from '@site/src/components/ImageGallery';

## En qué consiste

CIA es un script que se ejecuta **exclusivamente en el equipo del profesor**. Desde ahí envía las órdenes de bloqueo y desbloqueo al resto de puestos del aula a través de la red, sin necesidad de tocar físicamente ningún ordenador del alumnado.

- **No requiere instalación en los equipos de los alumnos.** Estos solo reciben las órdenes; no contienen ningún archivo del sistema.
- **Es independiente por aula.** Existe una versión del script para cada aula de informática (**L2-D-ATC**, **L1-D-ATC** y **L1-A-ESC**). Cada una conoce únicamente sus propios puestos, de modo que un bloqueo **jamás afecta a otra aula**.
- **Actúa a demanda.** El docente decide cuándo activar el modo examen y cuándo retirarlo.

:::note[Lo que el alumno experimenta]
Cuando el modo examen está activo, el navegador del alumno (cualquiera: Edge, Chrome, Firefox…) deja de cargar páginas externas, pero **sigue teniendo acceso a Enseñanza Virtual y a los servicios de la Universidad**. Para el alumno es transparente: simplemente no puede salir a Internet abierto.
:::

------------------------------------------------------------------------

## Cómo se usa

<Tabs>
  <TabItem value="inicio" label="Arrancar la herramienta" default>

  El script se encuentra ya preparado en el equipo del profesor de cada aula.

  1. Localice el archivo del aula correspondiente (por ejemplo, `CIA-L2-D-ATC.ps1`).
  2. Haga clic derecho sobre él y elija **«Ejecutar con PowerShell»**.
  3. Se abrirá una ventana de consola con el **menú principal** de CIA.

  A partir de ahí, todo se maneja **escribiendo el número** de la opción deseada y pulsando **Enter**.

  </TabItem>
  <TabItem value="menu" label="El menú principal">

  Al arrancar verá un menú con las siguientes opciones:

  | Opción | Acción | Para qué sirve |
  |:------:|:-------|:---------------|
  | **0** | Ayuda (documentación online) | Abre esta misma documentación en el navegador |
  | **1** | Bloquear Internet (modo examen) | Activa el bloqueo en todos los puestos encendidos |
  | **2** | Revertir bloqueo | Restaura el acceso normal a Internet |
  | **3** | Ver estado actual de los equipos | Muestra qué puestos están bloqueados, libres o apagados |
  | **4** | Listado de puestos | Lista los equipos del aula |
  | **5** | Salir | Cierra la herramienta |

  :::tip
  El menú permanece siempre abierto: tras cada acción, basta con pulsar **Enter** para volver a él. Puede consultar el estado tantas veces como necesite sin cerrar el programa.
  :::

  </TabItem>
</Tabs>

------------------------------------------------------------------------

## Flujo de trabajo en un examen

El uso habitual durante una prueba sigue tres pasos muy sencillos:

1. **Antes de empezar** — Con todos los equipos encendidos y los alumnos con la sesión iniciada, seleccione la **Opción 1 (Bloquear Internet)**. La herramienta detectará automáticamente los puestos activos y aplicará el bloqueo.
2. **Durante el examen** — Use la **Opción 3 (Ver estado)** de vez en cuando para confirmar que todos los puestos siguen en estado 🔒 **BLOQUEADO**.
3. **Al terminar** — Seleccione la **Opción 2 (Revertir bloqueo)** para devolver el aula a la normalidad de cara a la siguiente clase.

:::warning[Bloquee con los equipos ya encendidos]
El bloqueo se aplica únicamente a los puestos que estén **encendidos y con sesión iniciada** en el momento de pulsar la Opción 1. Si un alumno llega tarde y enciende su equipo después, ese puesto arrancará con Internet libre. No es un problema: basta con **volver a pulsar la Opción 1** y la herramienta detectará el equipo nuevo y lo bloqueará sin alterar a los que ya lo estaban.
:::

------------------------------------------------------------------------

## Interpretar el estado del aula

La **Opción 3 (Ver estado)** muestra una tabla con todos los puestos del aula y su situación en tiempo real. Cada equipo puede aparecer en uno de estos tres estados:

| Estado | Significado |
|:-------|:------------|
| 🔓 **LIBRE** | El equipo está encendido y tiene acceso normal a Internet |
| 🔒 **BLOQUEADO** | El equipo está encendido y en modo examen (Internet restringido) |
| ❌ **OFFLINE** | El equipo está apagado o sin conexión de red |

:::info[Un equipo encendido aparece como OFFLINE]
Lo más habitual es que se acabe de arrancar y aún esté obteniendo dirección de red. Espere alrededor de **un minuto** y vuelva a consultar la Opción 3. Si pasados varios minutos sigue apareciendo como OFFLINE de forma persistente, puede tratarse de una incidencia real de red: en ese caso, abra un parte de incidencia.
:::

------------------------------------------------------------------------

## Capturas

<ImageGallery images={[
  { src: '/img/CIA-script-menu.png', title: 'Menú principal de CIA' },
  { src: '/img/CIA-script-listado-puestos.png', title: 'Listado de puestos de un aula' },
  { src: '/img/CIA-script-bloqueo.png', title: 'Bloqueo de Internet vía WinRM' },
  { src: '/img/CIA-script-desbloqueo.png', title: 'Equipos desbloqueados' },
  { src: '/img/CIA-script-escaneando.png', title: 'Escaneando el aula por consola' },
  { src: '/img/CIA-script-estado-aula.png', title: 'Estado de un aula' }
]} />

------------------------------------------------------------------------

## Seguridad y modo examen

Cuando se activa el bloqueo, CIA aplica dos capas de protección complementarias para que la restricción sea **robusta durante el tiempo que dura la prueba**:

- **Redirección del tráfico.** El equipo deja de poder salir a Internet abierto. Solo se mantiene operativa una **lista blanca** de servicios imprescindibles para el examen (véase más abajo).
- **Bloqueo de herramientas de configuración.** Se restringe el acceso a las utilidades del sistema que un alumno podría usar para intentar revertir la restricción (editor del registro, administrador de tareas, configuración de red, etc.). Durante el examen, esas herramientas quedan deshabilitadas para la cuenta del alumno.

### Lista blanca (whitelist)

Aunque el resto de Internet quede bloqueado, el alumno conserva el acceso a los recursos necesarios para realizar la prueba:

| Categoría | Acceso permitido |
|:----------|:-----------------|
| **Plataformas docentes** | Enseñanza Virtual (Blackboard) y portales de la US |
| **Identidad y acceso** | Inicio de sesión institucional (SSO) de la Universidad |
| **Autenticación** | Servicios técnicos necesarios para el login institucional |
| **Red local** | Recursos compartidos del propio laboratorio |

##
:::danger[El bloqueo NO persiste tras reiniciar]
Por diseño, **si un equipo se reinicia o el alumno cierra y reabre la sesión, el bloqueo desaparece** en ese puesto. Es una medida de seguridad consensuada entre el profesorado y el Centro de Cálculo: evita que un aula quede inutilizable para el siguiente turno si se olvida desbloquear.

La consecuencia es clara: **debe supervisar el aula durante el examen** y consultar periódicamente la **Opción 3 (Ver estado)** para confirmar que ningún puesto ha vuelto al estado 🔓 LIBRE por un reinicio o cierre de sesión.
:::

------------------------------------------------------------------------

## Situaciones frecuentes

<details>
<summary><strong>Necesito desbloquear un solo puesto sin afectar al resto de la clase</strong></summary>

No hace falta levantar el bloqueo general. Pida al alumno que **cierre la sesión o reinicie el equipo**: al volver a iniciar sesión, ese puesto recuperará automáticamente el acceso normal, sin alterar el bloqueo de los demás compañeros.

</details>

<details>
<summary><strong>He cerrado el script sin querer durante el examen</strong></summary>

No afecta a la seguridad del aula. Una vez enviada la orden de bloqueo, esta reside en los puestos de los alumnos. El script solo es necesario para **enviar** la orden inicial y para **revertirla** al final. Vuelva a abrirlo cuando quiera para seguir consultando el estado o para desbloquear al terminar.

</details>

<details>
<summary><strong>El número de puesto físico no coincide con el de la consola</strong></summary>

Puede ocurrir de forma excepcional si el Centro de Cálculo ha sustituido un equipo averiado o ha habido una reconfiguración del cableado. **No modifique el script.** Deje que la clase continúe con normalidad y avise al personal técnico del CATEPS indicando el número de puesto afectado para actualizar el mapa de equipos.

</details>

<details>
<summary><strong>¿Funciona con cualquier navegador?</strong></summary>

Sí. La restricción se aplica a nivel del sistema operativo, por lo que afecta por igual a Edge, Chrome, Firefox, Brave, Opera y cualquier aplicación que use la configuración de red estándar de Windows.

</details>

------------------------------------------------------------------------