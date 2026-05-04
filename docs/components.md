# Documentación de Componentes

Todos los componentes están escritos en React con TypeScript y estilados con Tailwind CSS.

---

## Badge

**Ruta:** `src/components/Badge/index.tsx`

Componentes de etiqueta visual para mostrar la prioridad y el estado de una tarea.

### `PriorityBadge`

Muestra la prioridad de una tarea con un punto de color y texto.

```tsx
<PriorityBadge priority="high" />   // ● Alta
<PriorityBadge priority="medium" /> // ● Media
<PriorityBadge priority="low" />    // ● Baja
```

| Prop | Tipo | Descripción |
|---|---|---|
| `priority` | `TaskPriority` | Prioridad de la tarea: `'low'`, `'medium'` o `'high'` |

### `StatusBadge`

Muestra el estado de una tarea con una pastilla de color.

```tsx
<StatusBadge status="in-progress" />
```

| Prop | Tipo | Descripción |
|---|---|---|
| `status` | `TaskStatus` | Estado de la tarea |

---

## Button

**Ruta:** `src/components/Button/index.tsx`

Botón reutilizable con variantes de estilo, tamaños y estado de carga.

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Crear tarea
</Button>

<Button variant="danger" isLoading={isDeleting}>
  Eliminar
</Button>
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Estilo visual del botón |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del botón |
| `isLoading` | `boolean` | `false` | Muestra spinner y deshabilita el botón |

Acepta todas las props nativas de `<button>`.

---

## Modal

**Ruta:** `src/components/Modal/index.tsx`

Modal genérico con backdrop, cierre con tecla Escape y bloqueo de scroll.

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Nueva tarea" size="md">
  <TaskForm ... />
</Modal>
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `isOpen` | `boolean` | — | Controla si el modal está visible |
| `onClose` | `() => void` | — | Función llamada al cerrar |
| `title` | `string` | — | Título del modal |
| `children` | `ReactNode` | — | Contenido del modal |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Anchura máxima del panel |

**Comportamiento:**
- Cierra al pulsar `Escape`.
- Cierra al hacer clic en el backdrop.
- Bloquea el scroll del `body` mientras está abierto.

---

## TaskForm

**Ruta:** `src/components/TaskForm/index.tsx`

Formulario controlado para crear o editar una tarea. Modo creación si no se pasa `task`, modo edición si se pasa.

```tsx
// Crear
<TaskForm onSubmit={handleCreate} onCancel={handleClose} />

// Editar
<TaskForm task={existingTask} onSubmit={handleEdit} onCancel={handleClose} />
```

| Prop | Tipo | Descripción |
|---|---|---|
| `task` | `Task` (opcional) | Si se pasa, precarga los campos con los datos de la tarea |
| `onSubmit` | `(data: CreateTaskDTO \| UpdateTaskDTO) => Promise<void>` | Callback al enviar |
| `onCancel` | `() => void` | Callback al cancelar |

**Campos:**
- `title` (obligatorio, máx. 100 caracteres)
- `description` (opcional)
- `priority` (selector visual entre baja/media/alta)
- `dueDate` (selector de fecha, mínimo hoy)

**Validación:** muestra mensajes de error inline sin enviar el formulario.

---

## TaskCard

**Ruta:** `src/components/TaskCard/index.tsx`

Tarjeta visual que representa una tarea en el tablero. Muestra el título, descripción, prioridad, fecha y acciones.

```tsx
<TaskCard task={task} onEdit={handleEdit} />
```

| Prop | Tipo | Descripción |
|---|---|---|
| `task` | `Task` | Tarea a mostrar |
| `onEdit` | `(task: Task) => void` | Callback para abrir el formulario de edición |

**Características:**
- Indicador lateral de prioridad por color.
- Botones de edición y eliminación visibles al hacer hover.
- Menú desplegable para cambiar el estado directamente.
- Indicador visual si la tarea está vencida (borde rojo) o próxima a vencer (fecha en ámbar).

---

## BoardColumn

**Ruta:** `src/components/BoardColumn/index.tsx`

Columna del tablero Kanban que agrupa las tareas de un estado.

```tsx
<BoardColumn
  status="in-progress"
  tasks={inProgressTasks}
  onEditTask={handleEdit}
/>
```

| Prop | Tipo | Descripción |
|---|---|---|
| `status` | `TaskStatus` | Estado de la columna |
| `tasks` | `Task[]` | Lista de tareas a mostrar |
| `onEditTask` | `(task: Task) => void` | Callback para editar una tarea |

Muestra el número de tareas en la cabecera y un mensaje de "Sin tareas" si la columna está vacía.

---

## FilterBar

**Ruta:** `src/components/FilterBar/index.tsx`

Barra de filtros para el tablero. Conectada directamente al `TaskContext`.

```tsx
<FilterBar />
```

No recibe props. Lee y escribe en el contexto global mediante `useTaskContext`.

**Filtros disponibles:**
- Búsqueda por texto (título o descripción), con debounce de 300ms.
- Filtro por estado.
- Filtro por prioridad.
- Botón para limpiar todos los filtros (visible solo si hay alguno activo).

---

## Navbar

**Ruta:** `src/components/Navbar/index.tsx`

Barra de navegación fija en la parte superior. Usa `NavLink` de React Router para resaltar la ruta activa.

```tsx
<Navbar />
```

No recibe props. Incluye el logo y los enlaces a `/board` y `/stats`.
