# Formularios e Interacción

## Enfoque: formularios controlados

TaskFlow usa **formularios controlados** en React: el estado de cada campo del formulario vive en el componente mediante `useState`, y cada `<input>` tiene su `value` enlazado al estado y su `onChange` actualizándolo.

Este enfoque permite validar en tiempo real, mostrar mensajes de error antes de enviar, y controlar exactamente qué se envía al backend.

---

## TaskForm

**Ruta:** `src/components/TaskForm/index.tsx`

Es el único formulario de la aplicación, usado tanto para crear como para editar tareas.

### Estado de los campos

```ts
const [title, setTitle] = useState(task?.title ?? '');
const [description, setDescription] = useState(task?.description ?? '');
const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium');
const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10) ?? '');
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState<Record<string, string>>({});
```

Si se pasa una `task` como prop, los campos se inicializan con sus valores actuales (modo edición).

### Validación

La validación se ejecuta al enviar el formulario, antes de llamar al backend:

```ts
const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!title.trim()) newErrors.title = 'El título es obligatorio';
  if (title.trim().length > 100) newErrors.title = 'El título no puede superar los 100 caracteres';
  return newErrors;
};
```

Si hay errores, se muestran bajo el campo correspondiente y **no** se llama a `onSubmit`.

### Manejo del envío

```ts
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setIsLoading(true);
  try {
    await onSubmit({ title: title.trim(), description: description.trim(), priority, dueDate: dueDate || null });
  } finally {
    setIsLoading(false);
  }
};
```

El botón de envío muestra un spinner y queda deshabilitado mientras `isLoading` es `true`, evitando envíos duplicados.

### Mensajes de error y confirmación

- Los errores de validación se muestran inline bajo el campo en texto rojo.
- Los errores de la API se muestran en el `Modal` que contiene el formulario (manejados en `BoardPage`).
- Al crear o editar con éxito, el modal se cierra automáticamente (confirmación implícita por desaparición del formulario).

### Selector visual de prioridad

En lugar de un `<select>` estándar, la prioridad se selecciona con tres botones visuales:

```tsx
{TASK_PRIORITIES.map((p) => (
  <button
    key={p}
    type="button"
    onClick={() => setPriority(p)}
    className={priority === p ? 'border-violet-500 bg-violet-600/20' : 'border-slate-600'}
  >
    <span className={PRIORITY_CONFIG[p].color}>●</span>
    {PRIORITY_CONFIG[p].label}
  </button>
))}
```

El botón seleccionado se resalta visualmente. El atributo `type="button"` es crucial para evitar que React interprete el clic como un envío del formulario.
