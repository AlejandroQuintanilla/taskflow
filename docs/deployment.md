# Despliegue

## Plataforma: Vercel

Tanto el frontend como el backend están desplegados en Vercel desde el mismo repositorio de GitHub.

---

## Frontend (React + Vite)

Vercel detecta automáticamente proyectos Vite. La configuración necesaria es mínima.

### Pasos realizados

1. Conectar el repositorio de GitHub a Vercel desde el dashboard.
2. Vercel detecta el framework Vite automáticamente.
3. Configurar la variable de entorno en Vercel:
   - `VITE_API_URL` = URL del backend desplegado (ej. `https://taskflow-api.vercel.app`)
4. Hacer deploy desde la rama `main`.

### `vercel.json` (en la raíz del proyecto)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

El `rewrites` es necesario para que React Router funcione correctamente en producción. Sin él, al acceder directamente a `/board` Vercel devolvería un 404.

---

## Backend (Express en `/server`)

### Adaptar Express para Vercel (Serverless)

Vercel ejecuta el backend como funciones serverless. Para esto se necesita crear el archivo `api/index.ts` que exporta la app de Express:

```ts
// api/index.ts
import app from '../server/src/index';
export default app;
```

Y en `vercel.json`, añadir la configuración de la función:

```json
{
  "functions": {
    "api/index.ts": {
      "includeFiles": "server/src/**"
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> **Nota importante:** el almacenamiento en memoria del servidor **se resetea** en cada invocación de la función serverless en Vercel. Para datos persistentes en producción sería necesaria una base de datos externa (PostgreSQL, MongoDB Atlas, etc.). Para el propósito de este ejercicio, el comportamiento es aceptable.

---

## Variables de entorno

| Variable | Entorno | Valor |
|---|---|---|
| `VITE_API_URL` | Frontend (Vercel) | URL del backend en producción |
| `PORT` | Backend (local) | `3001` (por defecto) |
| `ALLOWED_ORIGINS` | Backend | URL del frontend en producción |

En local, el frontend usa `http://localhost:3001` como fallback si `VITE_API_URL` no está definida.

---

## URLs del proyecto

- **Frontend:** [https://taskflow-xxx.vercel.app](https://taskflow-xxx.vercel.app) *(actualizar con la URL real)*
- **API (health check):** [https://taskflow-xxx.vercel.app/health](https://taskflow-xxx.vercel.app/health) *(actualizar)*
- **Repositorio:** [https://github.com/tu-usuario/taskflow](https://github.com/tu-usuario/taskflow) *(actualizar)*

---

## Comprobaciones post-despliegue

- [ ] El frontend carga correctamente en la URL de Vercel.
- [ ] La navegación entre páginas funciona sin recargar (React Router).
- [ ] Las tareas se cargan desde la API (pestaña Network en DevTools).
- [ ] Crear, editar y eliminar tareas funciona en producción.
- [ ] Las estadísticas se muestran correctamente.
- [ ] No hay errores de CORS (el `ALLOWED_ORIGINS` está bien configurado).
