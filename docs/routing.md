# Rutas y Navegación

## Configuración

TaskFlow usa **React Router v6** para gestionar la navegación entre páginas.

Las rutas están definidas en `src/App.tsx` con el componente `<Routes>` y `<Route>`.

---

## Estructura de rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `HomePage` | Pantalla de bienvenida con resumen del proyecto |
| `/board` | `BoardPage` | Tablero Kanban principal |
| `/stats` | `StatsPage` | Panel de estadísticas |
| `*` | `NotFoundPage` | Página 404 para rutas no encontradas |

---

## Implementación

```tsx
<BrowserRouter>
  <TaskProvider>
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main>
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  </TaskProvider>
</BrowserRouter>
```

---

## Lazy loading (bonus)

Todas las páginas se cargan de forma diferida con `React.lazy` y `Suspense`. Esto divide el bundle en chunks separados: el código de cada página solo se descarga cuando el usuario navega a ella.

```ts
const BoardPage = lazy(() =>
  import('./pages/BoardPage').then((m) => ({ default: m.BoardPage }))
);
```

El `Suspense` muestra un spinner mientras la página carga:

```tsx
<Suspense fallback={<PageSpinner />}>
  <Routes>...</Routes>
</Suspense>
```

**Ventaja:** la carga inicial de la aplicación es más rápida porque el usuario no descarga el código de páginas que aún no ha visitado.

---

## Navegación activa

El componente `Navbar` usa `NavLink` en lugar de `Link` para aplicar estilos diferentes al enlace de la ruta actual:

```tsx
<NavLink
  to="/board"
  className={({ isActive }) =>
    isActive ? 'bg-violet-600/20 text-violet-300' : 'text-slate-400 hover:text-white'
  }
>
  Tablero
</NavLink>
```

---

## Página 404

La ruta `path="*"` captura cualquier URL no definida y renderiza `NotFoundPage`, que muestra un mensaje claro y un botón para volver al inicio.
