---
title: Preguntas Frecuentes
sidebar_label: FAQs
tags:
  - Aulas
  - Modo Examen
  - Soporte Técnico
sidebar_position: 4
---

# Preguntas frecuentes

En esta sección encontrará respuesta a las dudas más habituales sobre el despliegue y uso del script CIA en los laboratorios.

---

### 🚀 Conceptos Generales

<details>
<summary>¿Qué es exactamente CIA?</summary>

Es una solución para gestionar y coordinar el acceso a la red de los equipos de los alumnos en las aulas de informática durante prácticas o exámenes. Permite conmutar el estado de conectividad de los equipos del aula de forma simultánea, aplicando directivas de grupo y restricciones de sistema en segundos sin intervención física en los puestos. 

Consulte la [sección del script](/docs/cia-control-internet-aulas.md) para más detalles.
</details>

<details>
<summary>¿Es necesario reiniciar los equipos para aplicar el bloqueo?</summary>

**No.** Las modificaciones se realizan en el registro de sesión en tiempo real. La directiva es procesada por el stack de red de Windows de forma inmediata. Solo en casos excepcionales, si un navegador tiene una descarga activa en curso, podría requerirse el cierre y reapertura de dicha aplicación para que la restricción sea efectiva.
</details>

<details>
<summary>¿Funciona con todos los navegadores?</summary>

**Sí.** CIA actúa a nivel de *Internet Settings* del sistema operativo. Esto afecta de forma global a Edge, Chrome, Firefox, Brave, Opera y cualquier aplicación que utilice el protocolo estándar de red de Windows.
</details>

<details>
<summary>¿Tiene Windows 11 alguna configuración especial en las aulas?</summary>

Los equipos tienen instalado Windows 11 Pro y operan bajo un entorno protegido mediante la implementación de directivas de grupo locales (GPO). Se han configurado objetos de directiva específicos en el editor de Directivas de Grupo (gpedit.msc) y Directivas de Seguridad Local (secpol.msc) para restringir el escalado de privilegios en ciertas operaciones y asegurar la integridad del sistema operativo.
</details>

<details>
<summary>¿Puede afectar el bloqueo a otras aulas?</summary>

CIA afecta exclusivamente a los puestos de su aula. Cada aula dispone de su propio script dedicado e independiente que apunta a un mapa de puestos cerrado con un rango de direcciones IP específicas. Pulsar el botón de bloqueo jamás interferirá en las clases ni en los exámenes de otros laboratorios.
</details>



---

### 🔒 Seguridad y Modo Examen

<details>
<summary>¿Persiste el bloqueo si un usuario reinicia el equipo?</summary>

**No.** Esta medida responde a un **criterio consensuado entre el profesorado y el Centro de Cálculo**, diseñado como una red de seguridad: si un docente olvida ejecutar el desbloqueo manual al finalizar su práctica o examen, el aula no quedará inutilizada para el siguiente turno. Con solo reiniciar los equipos, o cerrar y volver a iniciar sesión, el laboratorio vuelve a estar operativo para la siguiente clase.

**El docente debe supervisar el aula en tiempo real**, utilizando la **Opción 3 (Ver estado)** periódicamente durante la prueba para confirmar que todos los puestos mantienen el estado 🔒 **BLOQUEADO**.
</details>

<details>
<summary>¿Dónde se encuentra ubicado el script?</summary>

El script está ubicado en el **equipo del profesor**, únicamente. Los equipos de los alumnos solo reciben órdenes remotas, no disponen de recursos locales relacionados con el script.
</details>

<details>
<summary>¿Puede un usuario saltarse el bloqueo usando, por ejemplo, el Editor del Registro o el Administrador de Tareas?</summary>

**No.** Al activar el Modo Examen, el script aplica restricciones de seguridad (ACLs), entre otras restricciones avanzadas, sobre herramientas críticas como `regedit.exe`, `taskmgr.exe`, `services.msc`, etc. Se deniegan los permisos de ejecución para el usuario, impidiendo cualquier intento de revertir la configuración del proxy manualmente.
</details>

<details>
<summary>¿Qué servicios siguen funcionando durante el Modo Examen?</summary>

Se ha implementado una lista blanca (Whitelist) de excepciones que garantiza el acceso a recursos de la Universidad:

* **Plataformas docentes:** Acceso completo a Blackboard y portales de la US.
* **Autenticación:** Google APIs y Gstatic (necesarios para el inicio de sesión institucional).
* **Identidad:** Sistema de Single Sign-On (SSO) de la Universidad.
* **Red local:** Acceso a recursos compartidos del laboratorio si fuera necesario.
</details>

<details>
<summary>¿Qué ocurre si se intenta usar un adaptador Wi-Fi USB externo o se desconecta el cable de red para evadir el control?</summary>

* **Adaptadores Wi-Fi o conexiones alternativas:** El sistema es inmune a cambios de hardware. Al aplicarse las restricciones directamente en el registro de Windows (HKCU), cualquier adaptador de red secundario que se conecte heredará automáticamente el proxy local muerto, manteniendo el bloqueo de Internet intacto.
* **Desconexión física del cable:** Si un alumno desconecta el cable de red antes de iniciar la prueba o durante la misma, el script no podrá comunicarse con la máquina y el panel del profesor lo mostrará inmediatamente en estado ❌ OFFLINE. El docente detectará la anomalía visualmente en su consola al instante y podrá acudir al puesto a verificar la conexión.
</details>

---

### 🛠️ Resolución de problemas

<details>
<summary>¿Por qué algunos equipos aparecen como "OFFLINE" estando encendidos?</summary>

El estado ❌ OFFLINE de un equipo se produce cuando está apagado o no tiene conectividad. Si el equipo está encendido, lo más común es que se haya acabado de arrancar o reiniciar y el sistema aún esté esperando a que el servidor DHCP le asigne una dirección IP.

Espere unos 60 segundos aproximadamente y vuelva a realizar la comprobación de estado. Si tras varios minutos el equipo sigue apareciendo de forma persistente como ❌ OFFLINE, es probable que exista una incidencia real con la conectividad de red del aula, en cuyo caso deberá abrir un parte de incidencia.
</details>

<details>
<summary>¿Qué ocurre si se cierra el script del profesor accidentalmente?</summary>

La seguridad del aula no se ve afectada. Una vez enviado el comando de bloqueo, este reside en los puestos de los alumnos. El script solo es necesario para enviar la orden inicial de bloqueo o para realizar la reversión (desbloqueo) al finalizar la sesión.
</details>

<details>
<summary>¿Qué ocurre si un alumno enciende un equipo después de haber lanzado el bloqueo general?</summary>

Si un equipo estaba apagado al pulsar la opción "1. Bloquear Internet", no habrá recibido la directiva de restricción. Al encenderse, el puesto arrancará con acceso libre a la red. 

**¿Cómo solucionarlo?**

Una vez que el ordenador del alumno haya arrancado por completo y esté en la pantalla de inicio de Windows, el profesor simplemente debe volver a seleccionar la opción **"1. Bloquear Internet"** en su menú. El script es inteligente: escaneará el aula de nuevo, detectará el nuevo puesto activo y le inyectará el bloqueo de forma aislada sin interrumpir ni alterar el estado de los compañeros que ya estaban bloqueados.
</details>

<details>
<summary>¿Cómo se puede solucionar una anomalía o aplicar un desbloqueo inmediato en un único puesto sin alterar al resto de la clase?</summary>

Si un puesto concreto experimenta un problema aislado o el alumno requiere recuperar el acceso libre a Internet por necesidades específicas de su prueba, no es necesario levantar el bloqueo general en toda el aula desde la consola del profesor.

**¿Cómo actuar?**

El docente simplemente debe indicar al alumno que **cierre la sesión de usuario o reinicie el equipo**. Al realizar esta acción, se ejecutará de forma automática la tarea programada de reversión que hemos implementado en el sistema del aula. Esta tarea purgará las restricciones del registro del puesto y restaurará la conectividad normal de esa máquina de manera inmediata al iniciar sesión de nuevo, sin interferir en el bloqueo de los demás compañeros.
</details>

<details>
<summary>¿Qué hacer si al verificar el estado se detecta que un puesto físico del aula no coincide con el número que muestra la consola?</summary>

Este escenario puede ocurrir de forma excepcional si el Centro de Cálculo ha tenido que sustituir de urgencia un equipo averiado por uno de reserva, o si ha habido una reconfiguración física en el cableado del switch del laboratorio. En estas situaciones, el mapa estático de red del script puede apuntar a una IP o nombre de host desactualizado para ese puesto concreto.

**¿Cómo actuar?**
1. Compruebe en la consola de control el listado mediante la **Opción 4 (Listado de puestos)** para identificar la IP teórica asignada.
2. Si el puesto físico no responde o muestra el estado de otra máquina, **no intente modificar el script**. 
3. Permita que el resto de la clase continúe con el examen y notifique de inmediato al personal técnico del CATEPS indicando el número de puesto afectado para que actualicemos el mapa de puestos en el repositorio central.
</details>

---

:::tip[Ayuda]
Si su consulta no aparece en esta lista, puede contactar con nosotros en la sección de [Contacto](/docs/contacto).
:::
