# Testing y Pruebas

## Estrategia de testing

Las pruebas de TaskFlow son principalmente **manuales y funcionales**, cubriendo los flujos de usuario completos. El objetivo es verificar que cada funcionalidad del ejercicio funciona correctamente de extremo a extremo (frontend → API → backend).

---

## Pruebas manuales realizadas

### Backend (API REST)

Probado con curl y con el cliente HTTP del navegador (DevTools → Network):

| Endpoint | Método | Resultado esperado | ✓ |
|---|---|---|---|
| `/api/v1/tasks` | GET | Devuelve array de tareas con código 200 | ✓ |
| `/api/v1/tasks/stats` | GET | Devuelve estadísticas agregadas con código 200 | ✓ |
| `/api/v1/tasks` | POST (body válido) | Crea tarea y devuelve 201 | ✓ |
| `/api/v1/tasks` | POST (sin título) | Devuelve 400 con mensaje de error | ✓ |
| `/api/v1/tasks/:id` | PUT | Actualiza tarea y devuelve 200 | ✓ |
| `/api/v1/tasks/:id/status` | PATCH | Cambia el estado y devuelve 200 | ✓ |
| `/api/v1/tasks/:id` | DELETE | Elimina tarea y devuelve 200 | ✓ |
| `/api/v1/tasks/id-inexistente` | GET | Devuelve 404 | ✓ |
| `/ruta-inexistente` | GET | Devuelve 404 del fallback | ✓ |

### Frontend — Flujos de usuario

| Flujo | Pasos | Resultado esperado | ✓ |
|---|---|---|---|
| Crear tarea válida | Abrir modal → rellenar título → submit | Tarea aparece en columna Backlog | ✓ |
| Crear tarea sin título | Abrir modal → submit vacío | Error inline visible, no se llama a la API | ✓ |
| Editar tarea | Hover sobre tarjeta → clic editar → cambiar título → submit | Tarjeta se actualiza | ✓ |
| Cambiar estado | Clic en "Mover ▾" → seleccionar estado | Tarjeta se mueve a la columna correcta | ✓ |
| Eliminar tarea | Hover → clic eliminar → confirmar | Tarjeta desaparece del tablero | ✓ |
| Filtrar por texto | Escribir en buscador | Solo aparecen tareas que coinciden | ✓ |
| Filtrar por estado | Seleccionar estado en selector | Solo aparecen tareas de ese estado | ✓ |
| Limpiar filtros | Clic en "Limpiar filtros" | Vuelven a aparecer todas las tareas | ✓ |
| Ver estadísticas | Navegar a /stats | Panel muestra datos correctos | ✓ |
| Página 404 | Navegar a /ruta-inexistente | Se muestra la página de error | ✓ |

### Diseño responsive

Probado en las siguientes resoluciones con DevTools:

| Dispositivo | Resolución | Resultado |
|---|---|---|
| Mobile S | 320px | Columnas en una sola columna, filtros apilados | ✓ |
| Mobile M | 375px | Igual que Mobile S | ✓ |
| Tablet | 768px | Tablero en 2 columnas | ✓ |
| Desktop | 1280px | Tablero en 4 columnas | ✓ |
| Desktop XL | 1440px+ | Layout correcto sin desbordamientos | ✓ |

### Errores en consola

- No hay errores ni warnings de React en consola.
- No hay errores de TypeScript en compilación (comprobado con `tsc --noEmit`).
- No hay errores de CORS al conectar frontend con backend en desarrollo.

---

## Bugs encontrados y corregidos

| Bug | Causa | Solución |
|---|---|---|
| Ruta `/tasks/stats` devolvía 404 | El router interpretaba `stats` como un `:id` | Mover `router.get('/stats', ...)` antes de `router.get('/:id', ...)` |
| El buscador filtraba en cada tecla causando parpadeos | Sin debounce | Añadir hook `useDebounce` con 300ms |
| Los botones de prioridad enviaban el formulario | `type` no definido (default `submit`) | Añadir `type="button"` explícito |
| Modal no se cerraba con Escape | Faltaba event listener | Añadir `useEffect` con `keydown` en el Modal |
