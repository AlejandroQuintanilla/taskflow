# Arquitectura y Diseño de la Aplicación

## Visión general

TaskFlow es una aplicación fullstack con separación clara entre frontend y backend, comunicándose mediante una API REST.

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  React + TypeScript + Tailwind CSS                          │
│                                                             │
│  Pages          Components        State                     │
│  ├─ HomePage    ├─ TaskCard       ├─ TaskContext (global)   │
│  ├─ BoardPage   ├─ TaskForm       └─ useState (local)       │
│  ├─ StatsPage   ├─ BoardColumn                              │
│  └─ NotFound    ├─ FilterBar                                │
│                 └─ StatsPanel                               │
│                                                             │
│  src/api/client.ts  ←── Typed API Client ───────────────┐  │
└─────────────────────────────────────────────────────────┼──┘
                                                          │
                           HTTP (fetch)                   │
                                                          ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                              │
│  Node.js + Express                                          │
│                                                             │
│  Routes → Controllers → Services                            │
│                                                             │
│  GET    /api/v1/tasks          → getAllTasks                │
│  POST   /api/v1/tasks          → createTask                 │
│  PUT    /api/v1/tasks/:id      → updateTask                 │
│  PATCH  /api/v1/tasks/:id/status → changeStatus            │
│  DELETE /api/v1/tasks/:id      → deleteTask                 │
│  GET    /api/v1/tasks/stats    → getStats                   │
│                                                             │
│  Datos: almacenados en memoria (array en el servidor)       │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura de componentes

### Componentes de página (pages/)
- **HomePage:** Pantalla de bienvenida con resumen y acceso rápido al tablero.
- **BoardPage:** Tablero Kanban principal con todas las columnas y tareas.
- **StatsPage:** Panel de estadísticas con métricas del proyecto.
- **NotFoundPage:** Página 404 para rutas no encontradas.

### Componentes reutilizables (components/)
- **TaskCard:** Tarjeta visual para mostrar una tarea con sus datos y acciones.
- **TaskForm:** Formulario controlado para crear o editar una tarea.
- **BoardColumn:** Columna del tablero que agrupa tareas por estado.
- **FilterBar:** Barra de filtros por estado, prioridad y búsqueda de texto.
- **StatsPanel:** Tarjetas con métricas (total, completadas, en progreso...).
- **Modal:** Componente modal genérico reutilizable.
- **Badge:** Componente de etiqueta para prioridades y estados.
- **Button:** Botón reutilizable con variantes (primary, secondary, danger).
- **Navbar:** Barra de navegación principal.

---

## Gestión del estado

### Estado global (Context API)
El `TaskContext` centraliza:
- La lista de tareas (`tasks: Task[]`)
- El estado de carga (`loading: boolean`)
- El estado de error (`error: string | null`)
- Los filtros activos (`filters: FilterState`)
- Las acciones: `createTask`, `updateTask`, `deleteTask`, `changeStatus`, `setFilters`

### Estado local (useState)
- Estado de formularios (campos del formulario de creación/edición)
- Estado de apertura/cierre de modales
- Estado de hover e interacciones visuales puntuales

---

## Modelo de datos

### Tipo `Task`
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;      // ISO date string
  createdAt: string;           // ISO date string
  updatedAt: string;           // ISO date string
}
```

### Tipo `CreateTaskDTO`
```typescript
interface CreateTaskDTO {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
}
```

### Tipo `UpdateTaskDTO`
```typescript
interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string | null;
}
```

### Tipo `TaskStats`
```typescript
interface TaskStats {
  total: number;
  byStatus: Record<Task['status'], number>;
  byPriority: Record<Task['priority'], number>;
  completionRate: number;
}
```

---

## Decisiones de arquitectura

### ¿Por qué Context API y no Redux?
El estado de la aplicación es relativamente simple: una lista de tareas y filtros. Redux añadiría complejidad innecesaria. Context API con `useReducer` o `useState` es suficiente y más sencillo de mantener.

### ¿Por qué almacenamiento en memoria en el servidor?
El ejercicio no requiere una base de datos real. Almacenar las tareas en un array en memoria del servidor simplifica el setup enormemente y permite demostrar todos los conceptos de arquitectura por capas sin depender de un servicio externo.

### ¿Por qué separar `routes`, `controllers` y `services`?
- **Routes:** Solo definen los endpoints y llaman al controlador correspondiente.
- **Controllers:** Gestionan la request HTTP (parsean el body, devuelven la response, manejan errores HTTP).
- **Services:** Contienen la lógica de negocio pura, sin conocer nada de HTTP.

Esta separación facilita el testing unitario de los servicios y permite cambiar la capa de persistencia (de memoria a base de datos) sin tocar los controladores.

### ¿Por qué un cliente de API tipado?
Centralizar todas las llamadas HTTP en `src/api/client.ts` evita repetición, facilita cambiar la URL base (variable de entorno), y garantiza que los tipos de respuesta están alineados con el backend.
