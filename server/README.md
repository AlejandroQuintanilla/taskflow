# TaskFlow — Backend API

API REST construida con Node.js y Express. Arquitectura por capas: routes → controllers → services.

## Estructura

```
server/
├── src/
│   ├── config/
│   │   └── index.ts        # Configuración (puerto, CORS, entorno)
│   ├── controllers/
│   │   └── taskController.ts   # Gestión HTTP: parsear req, devolver res
│   ├── routes/
│   │   └── tasks.ts        # Definición de rutas y verbos HTTP
│   ├── services/
│   │   └── taskService.ts  # Lógica de negocio + almacenamiento en memoria
│   └── index.ts            # Punto de entrada del servidor
├── package.json
└── tsconfig.json
```

## Instalación y arranque

```bash
cd server
npm install
npm run dev   # Desarrollo con nodemon
npm run build # Compilar TypeScript
npm start     # Producción
```

## Endpoints

| Método | Ruta | Descripción | Código OK |
|---|---|---|---|
| GET | `/api/v1/tasks` | Listar todas las tareas | 200 |
| GET | `/api/v1/tasks/stats` | Estadísticas | 200 |
| GET | `/api/v1/tasks/:id` | Obtener una tarea | 200 |
| POST | `/api/v1/tasks` | Crear tarea | 201 |
| PUT | `/api/v1/tasks/:id` | Actualizar tarea | 200 |
| PATCH | `/api/v1/tasks/:id/status` | Cambiar estado | 200 |
| DELETE | `/api/v1/tasks/:id` | Eliminar tarea | 200 |
| GET | `/health` | Health check | 200 |

Ver `docs/api.md` en la raíz del proyecto para ejemplos completos de request/response.

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `PORT` | `3001` | Puerto del servidor |
| `NODE_ENV` | `development` | Entorno |
| `ALLOWED_ORIGINS` | `http://localhost:5173` | Orígenes CORS permitidos (separados por coma) |
