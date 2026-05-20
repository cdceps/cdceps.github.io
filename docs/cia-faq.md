---
title: FAQ
---

# FAQ CIA (Preguntas frecuentes)

En esta sección encontrarás respuesta a las dudas más habituales sobre el despliegue y uso de la herramienta de gestión de red CIA en los laboratorios.

---

### 🚀 Conceptos Generales

<details>
<summary>¿Qué es exactamente CIA?</summary>

Es una solución para gestionar y coordinar el acceso a la red de los equipos de los alumnos en las aulas de informática. Permite conmutar el estado de conectividad de los equipos del aula de forma simultánea, aplicando directivas de grupo y restricciones de sistema en segundos sin intervención física en los puestos. 

Consulta la [sección del script](cia-control-internet-aulas.md) para más detalles.
</details>

<details>
<summary>¿Es necesario reiniciar los equipos para aplicar el bloqueo?</summary>

**No.** Las modificaciones se realizan en el registro de sesión en tiempo real. La directiva es procesada por el stack de red de Windows de forma inmediata. Solo en casos excepcionales, si un navegador tiene una descarga activa en curso, podría requerirse el cierre y reapertura de dicha aplicación para que la restricción sea efectiva.
</details>

<details>
<summary>¿Funciona con todos los navegadores?</summary>

**Sí.** CIA actúa a nivel de *Internet Settings* del sistema operativo. Esto afecta de forma global a Edge, Chrome, Firefox, Brave, Opera y cualquier aplicación que utilice el protocolo estándar de red de Windows.
</details>

---

### 🔒 Seguridad y Modo Examen

<details>
<summary>¿Persiste el bloqueo si un usuario reinicia el equipo?</summary>

**No.** Esta medida responde a un **criterio consensuado entre el profesorado y el Centro de Cálculo**, diseñado como una red de seguridad: si un docente olvida ejecutar el desbloqueo manual al finalizar su práctica o examen, el aula no quedará inutilizada para el siguiente turno. Con solo reiniciar los equipos, o cerrar y volver a iniciar sesión, el laboratorio vuelve a estar operativo para la siguiente clase.

**Es responsabilidad del docente supervisar el aula en tiempo real**, utilizando la **Opción 3 (Ver estado)** periódicamente durante la prueba para confirmar que todos los puestos mantienen el estado 🔒 **BLOQUEADO** ante cualquier reinicio (accidental o intencionado) por parte de los alumnos.
</details>

<details>
<summary>¿Dónde se encuentra ubicado el script?</summary>

El script está ubicado en el **equipo del profesor**, únicamente. Los equipos de los alumnos solo reciben órdenes remotas, no disponen de recursos locales relacionados con el script CIA.
</details>

<details>
<summary>¿Puede un usuario saltarse el bloqueo usando el Editor del Registro o el Administrador de Tareas?</summary>

**No.** Al activar el Modo Examen, el script aplica restricciones de seguridad (ACLs) sobre herramientas críticas como `regedit.exe`, `taskmgr.exe`, `services.msc` y otras. Se deniegan los permisos de ejecución para el usuario, impidiendo cualquier intento de revertir la configuración del proxy manualmente.
</details>

<details>
<summary>¿Qué servicios siguen funcionando durante el Modo Examen?</summary>

Se ha implementado una lista blanca (Whitelist) de excepciones que garantiza el acceso a recursos de la Universidad:

* **Plataformas docentes:** Acceso completo a Blackboard y portales de la US.
* **Autenticación:** Google APIs y Gstatic (necesarios para el inicio de sesión institucional).
* **Identidad:** Sistema de Single Sign-On (SSO) de la Universidad.
* **Red local:** Acceso a recursos compartidos del laboratorio si fuera necesario.
</details>

---

### 🛠️ Resolución de problemas

<details>
<summary>¿Por qué algunos equipos aparecen como "OFFLINE"?</summary>

Esto ocurre principalmente cuando el equipo está apagado o se acaba de encender/reiniciar. En este último caso, el sistema puede tardar unos instantes en recibir IP mediante DHCP. Se recomienda esperar 60 segundos aproximadamente y volver a realizar la comprobación de estado.
</details>

<details>
<summary>¿Qué ocurre si se cierra el script del profesor accidentalmente?</summary>

La seguridad del aula no se ve afectada. Una vez enviado el comando de bloqueo, este reside en los puestos de los alumnos. El script solo es necesario para enviar la orden inicial de bloqueo o para realizar la reversión (desbloqueo) al finalizar la sesión.
</details>

---

:::tip[Ayuda]
Si tu consulta no aparece en esta lista, puedes contactar con nosotros en la sección de [Contacto](/docs/contacto).
:::
