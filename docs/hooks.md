# Documentación de Hooks

Todos los hooks están en `src/hooks/index.ts`.

---

## `useFilteredTasks`

Devuelve las tareas filtradas y ordenadas según los filtros activos del `TaskContext`. Usa `useMemo` para no recalcular cuando las dependencias no cambian.

```tsx
function BoardPage() {
  const tasks = useFilteredTasks();
  // tasks ya viene filtrado y ordenado
}
```

**Internamente usa:**
- `useMemo` para el filtrado (dependencias: `tasks`, `filters`)
- `useMemo` para el ordenado (dependencia: resultado del filtrado)

**Orden de las tareas:** primero por prioridad (alta → media → baja), luego por fecha de creación descendente.

---

## `useTasksByStatus`

Agrupa las tareas filtradas por columna de estado. Útil para el tablero Kanban. Usa `useMemo` para evitar reagrupar sin cambios.

```tsx
function BoardPage() {
  const { backlog, 'in-progress': inProgress, review, done } = useTasksByStatus();
}
```

**Retorna:**
```ts
{
  backlog: Task[];
  'in-progress': Task[];
  review: Task[];
  done: Task[];
}
```

---

## `useStats`

Custom hook que obtiene las estadísticas desde la API. Gestiona los tres estados de red: carga, éxito y error.

```tsx
function StatsPage() {
  const { stats, loading, error, refresh } = useStats();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage onRetry={refresh} />;
  return <StatsPanel stats={stats} />;
}
```

**Retorna:**
| Campo | Tipo | Descripción |
|---|---|---|
| `stats` | `TaskStats \| null` | Datos de estadísticas o `null` mientras carga |
| `loading` | `boolean` | `true` mientras se espera la respuesta |
| `error` | `string \| null` | Mensaje de error o `null` si no hay error |
| `refresh` | `() => void` | Función para volver a cargar los datos |

**Hooks usados internamente:** `useState`, `useEffect`, `useCallback`.

---

## `useModal<T>`

Hook genérico para gestionar el estado abierto/cerrado de un modal. Acepta un tipo genérico `T` para el dato asociado (por ejemplo, la tarea que se va a editar).

```tsx
// Modal de creación (sin dato)
const createModal = useModal();
createModal.open();

// Modal de edición (con dato tipado)
const editModal = useModal<Task>();
editModal.open(task);
// editModal.data → Task | undefined
```

**Retorna:**
| Campo | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | Estado del modal |
| `data` | `T \| undefined` | Dato asociado al modal |
| `open` | `(data?: T) => void` | Abre el modal con el dato opcional |
| `close` | `() => void` | Cierra el modal y limpia el dato |

**Hooks usados internamente:** `useState`, `useCallback`.

---

## `useDebounce<T>`

Retrasa la actualización de un valor por N milisegundos. Evita que el filtro de búsqueda dispare re-renders o llamadas a la API en cada pulsación de tecla.

```tsx
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);

// debouncedSearch solo se actualiza 300ms después de que el usuario deje de escribir
useEffect(() => {
  setFilters({ search: debouncedSearch });
}, [debouncedSearch]);
```

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `value` | `T` | — | Valor a debounce |
| `delay` | `number` | `300` | Tiempo de espera en milisegundos |

**Hooks usados internamente:** `useState`, `useEffect`.

---

## Resumen de hooks de React utilizados

| Hook | Dónde se usa | Para qué |
|---|---|---|
| `useState` | TaskContext, TaskForm, TaskCard, useModal, useStats, useDebounce | Estado local y de carga |
| `useEffect` | TaskContext, useStats, useDebounce, Modal | Efectos secundarios y sincronización |
| `useMemo` | useFilteredTasks, useTasksByStatus | Optimizar cálculos costosos de filtrado/agrupado |
| `useCallback` | TaskContext (acciones), FilterBar, TaskCard | Estabilizar referencias de funciones y evitar renders |
| `useContext` | useTaskContext | Consumir el contexto global |
| `useReducer` | — | No necesario; useState es suficiente para este estado |
