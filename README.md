# TaskFlow

Aplicación fullstack de gestión de tareas con tablero Kanban. Desarrollada con React + TypeScript + Tailwind CSS en el frontend y Node.js + Express en el backend.

[![Deploy](https://img.shields.io/badge/deploy-vercel-black)](https://taskflow-xxx.vercel.app)

**🔗 Demo:** [https://taskflow-xxx.vercel.app]
**📋 Tablero Trello:** [https://trello.com/b/LCMcdZJ7/taskflow]

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| Despliegue | Vercel |

---

## Instalación y desarrollo local

### Requisitos
- Node.js 18 o superior
- npm 9 o superior

### Frontend

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/taskflow.git
cd taskflow

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`.

### Backend

```bash
cd server

# Instalar dependencias
npm install

# Iniciar en modo desarrollo (con nodemon)
npm run dev
```

La API estará disponible en `http://localhost:3001`.

---

## Variables de entorno

**Frontend (`.env`):**
```
VITE_API_URL=http://localhost:3001
```

**Backend:**
```
PORT=3001
ALLOWED_ORIGINS=http://localhost:5173
NODE_ENV=development
```

---

## Scripts disponibles

### Frontend
| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | Linter ESLint |

### Backend
| Script | Descripción |
|---|---|
| `npm run dev` | Servidor con nodemon (recarga automática) |
| `npm run build` | Compilar TypeScript |
| `npm run start` | Ejecutar build compilado |

---

## Estructura del proyecto

```
taskflow/
├── docs/                    # Documentación completa
│   ├── agile.md             # Metodologías Agile, Scrum y Kanban
│   ├── idea.md              # Descripción del proyecto
│   ├── project-management.md # Organización y gestión
│   ├── design.md            # Arquitectura y decisiones técnicas
│   ├── components.md        # Documentación de componentes
│   ├── hooks.md             # Documentación de hooks
│   ├── context.md           # Context API y estado global
│   ├── routing.md           # Rutas y navegación
│   ├── forms.md             # Formularios e interacción
│   ├── api.md               # Documentación de la API REST
│   ├── api-client.md        # Cliente de API tipado
│   ├── testing.md           # Pruebas y bugs encontrados
│   ├── deployment.md        # Proceso de despliegue
│   └── retrospective.md     # Reflexión final
├── src/                     # Frontend React
│   ├── api/                 # Cliente de API tipado
│   ├── components/          # Componentes reutilizables
│   ├── context/             # Context API
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas de la app
│   ├── types/               # Tipos TypeScript
│   ├── utils/               # Utilidades
│   └── App.tsx              # Componente raíz y rutas
├── server/                  # Backend Express
│   └── src/
│       ├── config/          # Configuración
│       ├── controllers/     # Controladores HTTP
│       ├── routes/          # Definición de rutas
│       └── services/        # Lógica de negocio
└── README.md
```

---

## Funcionalidades

- ✅ Tablero Kanban con 4 columnas (Backlog, En progreso, En revisión, Completado)
- ✅ Crear, editar y eliminar tareas
- ✅ Prioridades (alta, media, baja) con indicadores visuales
- ✅ Cambio de estado directo desde la tarjeta
- ✅ Filtros por texto, estado y prioridad
- ✅ Indicadores de tareas vencidas o próximas a vencer
- ✅ Panel de estadísticas con métricas
- ✅ API REST completa con arquitectura por capas
- ✅ Cliente de API tipado con TypeScript
- ✅ Lazy loading de páginas con React.lazy
- ✅ Diseño responsive (mobile-first)
- ✅ Página 404

---

## Documentación de la API

Ver [`docs/api.md`](docs/api.md) para la documentación completa de endpoints.

**Base URL (local):** `http://localhost:3001/api/v1`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/tasks` | Obtener todas las tareas |
| GET | `/tasks/stats` | Estadísticas de tareas |
| GET | `/tasks/:id` | Obtener una tarea |
| POST | `/tasks` | Crear tarea |
| PUT | `/tasks/:id` | Actualizar tarea |
| PATCH | `/tasks/:id/status` | Cambiar estado |
| DELETE | `/tasks/:id` | Eliminar tarea |
