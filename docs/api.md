# API REST — TaskFlow

Base URL: `http://localhost:3001/api/v1`

Todas las respuestas siguen el formato:
```json
{ "data": <payload>, "message": "descripción opcional" }
```
Los errores devuelven:
```json
{ "error": "tipo_error", "message": "descripción legible" }
```

---

## Endpoints

### `GET /tasks`
Devuelve todas las tareas.

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Crear componentes",
      "description": "TaskCard, Modal...",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2025-06-01T00:00:00.000Z",
      "createdAt": "2025-05-20T10:00:00.000Z",
      "updatedAt": "2025-05-21T08:30:00.000Z"
    }
  ]
}
```

---

### `GET /tasks/stats`
Devuelve estadísticas agregadas de las tareas.

**Response 200:**
```json
{
  "data": {
    "total": 6,
    "byStatus": { "backlog": 1, "in-progress": 2, "review": 1, "done": 2 },
    "byPriority": { "low": 1, "medium": 2, "high": 3 },
    "completionRate": 0.333
  }
}
```

---

### `GET /tasks/:id`
Devuelve una tarea por su ID.

**Response 200:** objeto `Task`
**Response 404:** `{ "error": "not_found", "message": "Tarea no encontrada" }`

---

### `POST /tasks`
Crea una nueva tarea.

**Request body:**
```json
{
  "title": "Nueva tarea",
  "description": "Opcional",
  "priority": "medium",
  "dueDate": "2025-06-15"
}
```

**Validaciones:**
- `title` es obligatorio y no puede estar vacío.
- `priority` debe ser `low`, `medium` o `high` (por defecto `medium`).

**Response 201:** objeto `Task` creado
**Response 400:** error de validación

---

### `PUT /tasks/:id`
Actualiza los campos de una tarea existente.

**Request body** (todos opcionales):
```json
{
  "title": "Título actualizado",
  "description": "Nueva descripción",
  "priority": "high",
  "dueDate": null
}
```

**Response 200:** objeto `Task` actualizado
**Response 404:** tarea no encontrada

---

### `PATCH /tasks/:id/status`
Cambia únicamente el estado de una tarea.

**Request body:**
```json
{ "status": "done" }
```

**Valores válidos para `status`:** `backlog`, `in-progress`, `review`, `done`

**Response 200:** objeto `Task` actualizado
**Response 400:** estado inválido
**Response 404:** tarea no encontrada

---

### `DELETE /tasks/:id`
Elimina una tarea por su ID.

**Response 200:** `{ "data": null, "message": "Tarea eliminada correctamente" }`
**Response 404:** tarea no encontrada

---

## Códigos HTTP utilizados

| Código | Significado |
|---|---|
| 200 | OK — operación exitosa |
| 201 | Created — recurso creado |
| 400 | Bad Request — datos inválidos |
| 404 | Not Found — recurso no encontrado |
| 500 | Internal Server Error — error del servidor |
