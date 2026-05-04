# Retrospectiva Final

## Qué aprendí durante el proyecto

### Conexión frontend–backend–API

Este proyecto me permitió ver por primera vez de forma práctica cómo encajan las tres capas de una aplicación fullstack real:

- El **backend** (Express) expone datos y lógica mediante endpoints REST bien definidos.
- El **cliente de API** (TypeScript) es el puente entre ambos mundos: traduce las llamadas HTTP en funciones tipadas que el frontend puede usar de forma segura.
- El **frontend** (React) consume esos datos y los presenta, gestionando los estados de carga, éxito y error.

Lo más valioso fue entender que el **contrato de tipos** es lo que une las tres capas. Definir los mismos tipos (`Task`, `CreateTaskDTO`, etc.) en el frontend y replicar la misma estructura en el backend hace que los errores de integración sean mucho más fáciles de detectar.

### Arquitectura por capas en Express

Separar `routes → controllers → services` me pareció excesivo al principio para un proyecto pequeño, pero al implementarlo entendí su valor: el servicio no sabe nada de HTTP (no conoce `req` ni `res`), lo que significa que podría testearlo de forma unitaria sin levantar el servidor. El controlador solo se encarga de parsear la request y formatear la response. Esta separación hace el código mucho más legible.

### TypeScript en la práctica

Usar TypeScript de verdad (no solo en los ejemplos) me enseñó a pensar en los tipos antes de escribir la lógica. Definir el tipo `Task` antes de implementar el formulario o el servicio me obligó a pensar en qué datos necesito realmente. Los errores que TypeScript detecta en tiempo de compilación son exactamente los que más tarde se convierten en bugs difíciles de encontrar.

### Context API y hooks personalizados

Entender cuándo extraer lógica a un custom hook y cuándo dejarla en el componente es una habilidad que se desarrolla con la práctica. En este proyecto aprendí que los hooks personalizados no son solo para reutilizar código: también sirven para aislar complejidad y hacer los componentes más legibles.

---

## Principales problemas encontrados

### 1. El bug del orden de rutas en Express

El endpoint `GET /tasks/stats` devolvía 404 porque Express lo interpretaba como `GET /tasks/:id` con `id = "stats"`. La solución fue simple una vez identificada: mover la ruta `/stats` antes de `/:id`. Este bug me enseñó que el orden de definición de rutas en Express importa.

### 2. CORS en desarrollo

Al tener frontend en `:5173` y backend en `:3001`, las peticiones fallaban por CORS hasta configurar correctamente el middleware `cors()` en Express con los orígenes permitidos. Entender por qué existe CORS y cómo configurarlo fue un aprendizaje importante.

### 3. React Router en producción

Las rutas de React Router funcionan en desarrollo porque el servidor de Vite redirige todo a `index.html`. En Vercel, sin el `rewrite` adecuado en `vercel.json`, acceder directamente a `/board` devolvía un 404. Fue el primer bug de despliegue que tuve que depurar.

### 4. `type="button"` en formularios

Los botones del selector de prioridad enviaban el formulario porque el atributo `type` por defecto en un `<button>` dentro de un `<form>` es `submit`. Añadir `type="button"` explícito es una de esas cosas pequeñas que solo aprendes rompiéndola.

---

## Cómo utilicé la IA durante el desarrollo

Usé Claude (Anthropic) como herramienta de apoyo en varias fases del proyecto:

- **Generación de estructura inicial:** me ayudó a definir la arquitectura del proyecto, los tipos TypeScript y la estructura de carpetas antes de escribir una sola línea de código.
- **Escritura de boilerplate:** partes repetitivas como los controladores de Express o los componentes base los generé con ayuda de la IA y luego los adapté a mis necesidades.
- **Debugging:** cuando encontraba un error que no entendía, describía el problema y la IA me orientaba sobre dónde buscar. Nunca simplemente copiaba la solución: entendía el por qué.
- **Documentación:** la IA me ayudó a estructurar y redactar los documentos de `docs/`, pero el contenido refleja mis decisiones reales de implementación.
- **Aprendizaje activo:** en lugar de usar la IA para que hiciera el trabajo por mí, la usé para aprender cómo y por qué se hacen las cosas de una determinada manera.

El aprendizaje real viene de entender el código, no de ejecutarlo.

---

## Reflexión final

TaskFlow es el proyecto más completo que he desarrollado hasta ahora. Por primera vez he tenido que tomar decisiones de arquitectura reales: qué va en el frontend, qué en el backend, cómo se comunican, cómo gestionar los errores.

Lo que más me llevo es la importancia de **pensar antes de escribir**: definir los tipos, diseñar la API, estructurar los componentes antes de empezar a codificar. El tiempo invertido en planificación se recupera con creces al evitar refactorizaciones costosas.

El siguiente paso natural sería añadir una base de datos real y autenticación de usuarios. Con la arquitectura por capas que tiene el backend, cambiar el almacenamiento en memoria por una base de datos solo requeriría modificar la capa de servicios, sin tocar los controladores ni las rutas.
