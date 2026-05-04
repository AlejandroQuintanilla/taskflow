# Metodologías de Desarrollo Ágil

## ¿Qué es Agile?

Agile es una filosofía de desarrollo de software que surgió como respuesta a los métodos tradicionales (como el modelo en cascada), que resultaban demasiado rígidos para adaptarse a los cambios frecuentes que se producen en proyectos reales.

Su objetivo principal es entregar software funcional de forma incremental y continua, en ciclos cortos, en lugar de esperar meses o años para tener un producto terminado. Agile pone en el centro a las personas y la colaboración, priorizando la comunicación constante con el cliente y la capacidad de adaptarse rápidamente cuando cambian los requisitos.

Los cuatro valores fundamentales del Manifiesto Ágil son:
- **Individuos e interacciones** por encima de procesos y herramientas
- **Software funcionando** por encima de documentación exhaustiva
- **Colaboración con el cliente** por encima de negociación contractual
- **Respuesta ante el cambio** por encima de seguir un plan

---

## ¿Qué es Scrum?

Scrum es un marco de trabajo ágil que organiza el desarrollo en ciclos de tiempo fijo llamados **sprints**. Es uno de los métodos más utilizados en equipos de desarrollo por su estructura clara y sus roles bien definidos.

### Roles principales

- **Product Owner (PO):** Es la persona responsable de definir qué hay que construir y en qué orden. Gestiona el Product Backlog y representa los intereses del cliente o del negocio.
- **Scrum Master:** Facilita el proceso Scrum, ayuda al equipo a eliminar impedimentos y asegura que se respeten los principios ágiles. No es un jefe, sino un apoyo al equipo.
- **Development Team:** El grupo de personas que construye el producto. Es autoorganizado y multidisciplinar.

### Conceptos principales

- **Sprint:** Período de tiempo fijo (normalmente 1 a 4 semanas) en el que el equipo se compromete a completar un conjunto de tareas. Al final de cada sprint debe existir un incremento de producto potencialmente entregable.
- **Product Backlog:** Lista priorizada de todas las funcionalidades, mejoras y correcciones que se quieren incluir en el producto. El PO la gestiona y prioriza continuamente.
- **Sprint Backlog:** Subconjunto del Product Backlog que el equipo se compromete a completar durante el sprint actual.
- **Sprint Planning:** Reunión al inicio del sprint donde el equipo decide qué items del backlog va a trabajar y cómo los va a desarrollar.
- **Daily Scrum (Daily Standup):** Reunión diaria de 15 minutos donde cada miembro responde tres preguntas: ¿qué hice ayer?, ¿qué haré hoy? y ¿hay algún impedimento?
- **Sprint Review:** Al final del sprint, el equipo presenta lo que ha construido al Product Owner y stakeholders para recibir feedback.
- **Sprint Retrospective:** Reunión interna del equipo para reflexionar sobre el proceso: qué fue bien, qué mejorar y cómo hacerlo.

---

## ¿Qué es Kanban?

Kanban es un método de gestión visual del trabajo que se basa en representar el flujo de tareas en un tablero dividido en columnas. Cada columna representa un estado del proceso (por ejemplo: *Backlog*, *En progreso*, *En revisión*, *Hecho*), y las tareas se van moviendo de izquierda a derecha conforme avanzan.

Su principio central es visualizar todo el trabajo en curso y **limitar el trabajo simultáneo** (WIP, Work In Progress) para evitar sobrecargas y mejorar el flujo.

A diferencia de Scrum, Kanban no tiene sprints ni roles definidos. Las tareas simplemente entran al tablero según la prioridad y se trabajan de forma continua.

Kanban es especialmente útil para identificar cuellos de botella: si una columna acumula muchas tarjetas, es una señal clara de que algo en ese paso del proceso necesita atención.

---

## Diferencias entre Scrum y Kanban

| Aspecto | Scrum | Kanban |
|---|---|---|
| Ciclos de trabajo | Sprints de duración fija | Flujo continuo, sin ciclos |
| Roles | Product Owner, Scrum Master, Dev Team | No define roles específicos |
| Planificación | Al inicio de cada sprint | Continua, según prioridad |
| Cambios en mitad del trabajo | No se permiten durante el sprint | Se pueden introducir en cualquier momento |
| Métricas | Velocity (puntos por sprint) | Lead time, cycle time, WIP |
| Reuniones obligatorias | Daily, Planning, Review, Retro | Ninguna definida formalmente |
| Límite de trabajo en curso | Implícito (lo que cabe en el sprint) | Explícito mediante límites WIP |

---

## ¿Cuándo usar cada metodología?

### Scrum es más adecuado cuando:
- El proyecto tiene un alcance definido pero los requisitos pueden evolucionar.
- El equipo necesita estructura y ceremonias claras para organizarse.
- Se trabaja con un cliente que quiere ver avances periódicos y dar feedback frecuente.
- El equipo es relativamente nuevo en metodologías ágiles y necesita un marco que les guíe.
- Se desarrollan productos digitales con lanzamientos planificados.

### Kanban es más adecuado cuando:
- El trabajo es impredecible o llega de forma continua (soporte, mantenimiento, bugs).
- Las tareas tienen tamaños y prioridades muy variables.
- El equipo es experimentado y puede gestionarse con menos estructura.
- No hay releases planificadas y el trabajo simplemente fluye.
- Se quiere mejorar un proceso existente sin cambiarlo radicalmente de golpe.

En la práctica, muchos equipos usan **Scrumban**, una combinación de ambos enfoques: mantienen la estructura de los sprints de Scrum pero adoptan el tablero visual y los límites WIP de Kanban.
