# Idea del Proyecto: TaskFlow

## Descripción general

**TaskFlow** es una aplicación web de gestión de tareas diseñada para ser simple, rápida y visualmente clara. Permite a los usuarios organizar su trabajo diario mediante un sistema de tablero Kanban, con la posibilidad de crear proyectos, añadir tareas, asignarles prioridades y hacer un seguimiento de su progreso.

---

## Problema que intenta resolver

Las herramientas de gestión de tareas existentes tienden a ser demasiado complejas para uso individual o para equipos pequeños. Aplicaciones como Jira o Asana tienen una curva de aprendizaje alta y están pensadas para organizaciones grandes. Las alternativas más simples (listas de tareas básicas) no ofrecen suficiente estructura para gestionar proyectos con múltiples fases.

TaskFlow busca el punto intermedio: una herramienta visual, intuitiva y rápida, que no requiere configuración inicial compleja y que funciona bien tanto para uso personal como para proyectos pequeños.

---

## Usuario objetivo

- Desarrolladores y estudiantes de programación que necesitan organizar su aprendizaje o proyectos personales.
- Freelancers que gestionan varios proyectos a la vez.
- Personas que buscan una alternativa ligera a herramientas como Trello o Notion para uso personal.

---

## Funcionalidades principales

1. **Gestión de tareas:** Crear, editar y eliminar tareas con título, descripción, prioridad y fecha de vencimiento.
2. **Estados del tablero:** Las tareas se organizan en columnas: *Backlog*, *En progreso*, *En revisión* y *Completado*.
3. **Prioridades:** Cada tarea puede tener una prioridad: baja, media o alta (con indicadores de color).
4. **Filtros:** Filtrar tareas por estado, prioridad o texto de búsqueda.
5. **Estadísticas:** Panel con resumen de tareas totales, completadas y pendientes.
6. **API REST:** Backend con Express que gestiona las tareas y las persiste en memoria del servidor.
7. **Persistencia híbrida:** Las tareas viven en el backend; el frontend consume la API como única fuente de verdad.

---

## Funcionalidades opcionales

- Drag & drop para mover tareas entre columnas.
- Fecha de vencimiento con indicador visual cuando la tarea está próxima a vencer o vencida.
- Modo oscuro.
- Animaciones de transición al mover o crear tareas.
- Etiquetas personalizadas por tarea.

---

## Posibles mejoras futuras

- Autenticación de usuarios (registro e inicio de sesión).
- Base de datos real (PostgreSQL o MongoDB) en lugar de almacenamiento en memoria.
- Soporte para múltiples tableros/proyectos por usuario.
- Notificaciones por email cuando una tarea está próxima a vencer.
- Integración con calendarios (Google Calendar).
- Aplicación móvil con React Native.
- Documentación de la API con Swagger/OpenAPI.

---

## Repositorio y despliegue

- **Repositorio GitHub:** [https://github.com/tu-usuario/taskflow](https://github.com/tu-usuario/taskflow) *(actualizar con la URL real)*
- **Frontend desplegado:** [https://taskflow.vercel.app](https://taskflow.vercel.app) *(actualizar con la URL real)*
- **Tablero Trello:** [https://trello.com/b/...](https://trello.com/b/) *(actualizar con la URL real)*
