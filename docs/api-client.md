# Capa de Red — Cliente de API Tipado

## Ubicación

`src/api/client.ts`

---

## Diseño

El cliente de API centraliza **todas las llamadas HTTP** al backend en un único módulo. Esto evita que las URLs, cabeceras y lógica de parseo estén dispersas por los componentes o el contexto.

### Función base `request<T>`

```ts
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_PREFIX}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}
```

- Es genérica: `T` determina el tipo del dato devuelto.
- Si la respuesta no es `ok` (HTTP 4xx o 5xx), lanza un `Error` con el mensaje del backend.
- Desenvuelve automáticamente el campo `data` de la respuesta.

### URL base por variable de entorno

```ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
```

En producción se define la variable `VITE_API_URL` en Vercel. En desarrollo, apunta a `localhost:3001`.

---

## API exportada

```ts
export const tasksApi = {
  getAll(): Promise<Task[]>
  getById(id: string): Promise<Task>
  create(dto: CreateTaskDTO): Promise<Task>
  update(id: string, dto: UpdateTaskDTO): Promise<Task>
  changeStatus(id: string, status: TaskStatus): Promise<Task>
  delete(id: string): Promise<void>
  getStats(): Promise<TaskStats>
}
```

Cada función tiene tipos de entrada y salida explícitos, alineados con los tipos del backend.

---

## Contrato de tipos

Los tipos están definidos en `src/types/index.ts` y son compartidos por el cliente de API, el contexto y todos los componentes.

```ts
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}
```

---

## Gestión de los tres estados de red

En toda la aplicación, las operaciones de red se gestionan con tres estados: **loading**, **data** y **error**.

### En el `TaskContext` (para la lista de tareas)

```ts
const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const refresh = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await tasksApi.getAll();
    setTasks(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error al cargar tareas');
  } finally {
    setLoading(false);  // siempre se ejecuta
  }
};
```

### En `useStats` (para estadísticas)

Mismo patrón: `loading` → `data | error`.

### En la UI

```tsx
{loading && <Spinner />}
{error && <ErrorMessage message={error} onRetry={refresh} />}
{!loading && !error && <BoardColumns tasks={tasks} />}
```

---

## Fuente única de verdad

Las tareas **no se guardan en `localStorage`**. El backend es la única fuente de verdad. El frontend mantiene una copia en memoria (el estado del `TaskContext`) que se sincroniza con la API:

- Al montar el Provider → `GET /tasks`
- Al crear → `POST /tasks` + actualización optimista del estado local
- Al editar → `PUT /tasks/:id` + actualización del estado local
- Al cambiar estado → `PATCH /tasks/:id/status` + actualización del estado local
- Al eliminar → `DELETE /tasks/:id` + eliminación del estado local
