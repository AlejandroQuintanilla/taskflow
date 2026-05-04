import express from 'express';
import cors from 'cors';
import { config } from './config';
import taskRoutes from './routes/tasks';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json());

// Logging básico en desarrollo
if (config.nodeEnv === 'development') {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'not_found', message: 'Ruta no encontrada' });
});

// Error handler global
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'internal_error', message: 'Error interno del servidor' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(config.port, () => {
  console.log(`🚀 Server running at http://localhost:${config.port}`);
  console.log(`   Env: ${config.nodeEnv}`);
});

export default app;
