# Context API — Estado Global

## ¿Por qué Context API?

En TaskFlow, varias páginas y componentes necesitan acceder a la lista de tareas y a las acciones para modificarlas (crear, editar, eliminar, filtrar). Sin un estado global, tendríamos que pasar estas props manualmente por cada nivel del árbol de componentes (*prop drilling*), lo que ensucia el código y dificulta el mantenimiento.

Context API resuelve este problema de forma nativa en React, sin necesidad de instalar librerías externas como Redux o Zustand. Es la solución adecuada cuando:

- El estado compartido es relativamente simple (una lista y filtros).
- No hay lógica de sincronización compleja entre múltiples fuentes de datos.
- El equipo prefiere minimizar dependencias externas.

---

## Implementación

**Ruta:** `src/context/TaskContext.tsx`

### 1. Definición del tipo del contexto

```ts
interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  createTask: (dto: CreateTaskDTO) => Promise<Task>;
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  changeStatus: (id: string, status: TaskStatus) => Promise<Task>;
  refresh: () => Promise<void>;
}
```

### 2. Creación del contexto

```ts
const TaskContext = createContext<TaskContextValue | null>(null);
```

Se inicializa como `null` para poder detectar si un componente intenta consumirlo fuera del Provider (el hook `useTaskContext` lanza un error descriptivo en ese caso).

### 3. Provider

El `TaskProvider` encapsula toda la lógica de estado:

```tsx
export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<FilterState>({ ... });

  // Carga inicial desde la API
  useEffect(() => { refresh(); }, [refresh]);

  // Acciones que llaman a la API y actualizan el estado local
  const createTask = useCallback(async (dto) => { ... }, []);
  // ...

  return (
    <TaskContext.Provider value={{ tasks, loading, error, filters, ... }}>
      {children}
    </TaskContext.Provider>
  );
}
```

### 4. Hook personalizado para consumir el contexto

```ts
export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext debe usarse dentro de <TaskProvider>');
  return ctx;
}
```

Lanzar un error explícito en lugar de retornar `null | undefined` hace que los errores de uso incorrecto sean mucho más fáciles de detectar durante el desarrollo.

---

## Dónde se usa el Provider

El `TaskProvider` envuelve toda la aplicación en `App.tsx`, justo dentro del `BrowserRouter`:

```tsx
<BrowserRouter>
  <TaskProvider>
    <Navbar />
    <Routes>...</Routes>
  </TaskProvider>
</BrowserRouter>
```

---

## Componentes que consumen el contexto

| Componente / Hook | Qué consume |
|---|---|
| `useFilteredTasks` | `tasks`, `filters` |
| `useTasksByStatus` | (via `useFilteredTasks`) |
| `FilterBar` | `filters`, `setFilters` |
| `BoardPage` | `loading`, `error`, `createTask`, `updateTask`, `refresh` |
| `TaskCard` | `deleteTask`, `changeStatus` |
| `HomePage` | `tasks`, `loading` |

---

## Optimizaciones aplicadas

- Todas las funciones del contexto (`createTask`, `updateTask`, etc.) están envueltas en `useCallback` para que su referencia sea estable entre renders. Esto evita que los componentes que las reciben como props se re-rendericen innecesariamente.
- Las operaciones de filtrado y agrupado se hacen en hooks separados con `useMemo`, no dentro del Provider, para mantener el contexto simple.
