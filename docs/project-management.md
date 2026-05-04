# Gestión del Proyecto

## Metodología utilizada

Para este proyecto he adoptado un enfoque **Kanban** ligero, combinado con algunas prácticas de Scrum. Dado que soy un solo desarrollador y el alcance del proyecto es acotado, Kanban encaja mejor que Scrum porque:

- No necesito sprints formales para proyectos cortos.
- El trabajo llega de forma continua (tareas de documentación, backend, frontend).
- Un tablero visual me permite ver el estado de todo de un vistazo.

---

## Tablero Trello

He creado un tablero en Trello con las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Backlog** | Todas las funcionalidades e ideas pendientes de planificar |
| **Todo** | Tareas listas para empezar en el corto plazo |
| **In Progress** | Tareas en las que estoy trabajando actualmente |
| **Review** | Tareas terminadas que necesitan revisión o prueba |
| **Done** | Tareas completadas |

**Enlace al tablero:** [https://trello.com/b/...](https://trello.com/b/) *(actualizar con la URL real)*

---

## Organización del trabajo

### Cómo divido las tareas

Cada funcionalidad del proyecto se traduce en una **tarjeta de Trello**. Dentro de cada tarjeta incluyo:

- Una descripción breve de la funcionalidad.
- Un checklist con las subtareas técnicas necesarias para implementarla.
- Una etiqueta de prioridad (roja = alta, amarilla = media, verde = baja).

Por ejemplo, la funcionalidad "Crear tarea" se divide en:
- [ ] Diseñar el formulario en React
- [ ] Definir el tipo `Task` en TypeScript
- [ ] Crear el endpoint `POST /api/v1/tasks` en Express
- [ ] Conectar el formulario con la API desde el cliente
- [ ] Validar campos vacíos
- [ ] Mostrar confirmación al usuario

### Flujo de trabajo típico

1. Empiezo el día revisando la columna **In Progress** para retomar el trabajo donde lo dejé.
2. Si termino una tarea, la muevo a **Review** y la pruebo manualmente.
3. Si pasa las pruebas, la muevo a **Done**.
4. Elijo la siguiente tarea de **Todo** y la paso a **In Progress**.

---

## Estructura del repositorio

```
taskflow/
├── docs/                  # Documentación del proyecto
├── src/                   # Frontend React + TypeScript
│   ├── api/               # Cliente de API tipado
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Contexto global (React Context)
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas de la aplicación
│   ├── types/             # Tipos e interfaces TypeScript
│   └── utils/             # Funciones utilitarias
├── server/                # Backend Express
│   └── src/
│       ├── config/        # Configuración del servidor
│       ├── controllers/   # Controladores HTTP
│       ├── routes/        # Definición de rutas
│       └── services/      # Lógica de negocio
├── public/                # Assets estáticos
├── package.json           # Dependencias del frontend
└── README.md              # Documentación principal
```

---

## Estimación de tiempos

| Fase | Estimación |
|---|---|
| Documentación inicial (Agile, idea, diseño) | 2 horas |
| Setup del proyecto (Vite, Tailwind, Router) | 1 hora |
| Backend Express (API REST completa) | 3 horas |
| Frontend: componentes y páginas principales | 4 horas |
| Integración frontend–API | 2 horas |
| Testing manual y corrección de bugs | 1 hora |
| Despliegue en Vercel | 1 hora |
| Documentación final | 2 horas |
| **Total estimado** | **~16 horas** |
