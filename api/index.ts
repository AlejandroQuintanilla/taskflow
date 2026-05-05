import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const tasks: any[] = [
  { id: '1', title: 'Tarea de ejemplo', description: '', status: 'backlog', priority: 'medium', dueDate: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/api/v1/tasks', (_req, res) => res.json({ data: tasks }));
app.post('/api/v1/tasks', (req, res) => {
  const task = { id: Date.now().toString(), ...req.body, status: 'backlog', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  tasks.unshift(task);
  res.status(201).json({ data: task });
});
app.put('/api/v1/tasks/:id', (req, res) => {
  const i = tasks.findIndex(t => t.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'not_found' });
  tasks[i] = { ...tasks[i], ...req.body, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[i] });
});
app.patch('/api/v1/tasks/:id/status', (req, res) => {
  const i = tasks.findIndex(t => t.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'not_found' });
  tasks[i] = { ...tasks[i], status: req.body.status, updatedAt: new Date().toISOString() };
  res.json({ data: tasks[i] });
});
app.delete('/api/v1/tasks/:id', (req, res) => {
  const i = tasks.findIndex(t => t.id === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'not_found' });
  tasks.splice(i, 1);
  res.json({ data: null });
});
app.get('/api/v1/tasks/stats', (_req, res) => {
  const total = tasks.length;
  res.json({ data: { total, byStatus: { backlog: tasks.filter(t => t.status === 'backlog').length, 'in-progress': tasks.filter(t => t.status === 'in-progress').length, review: tasks.filter(t => t.status === 'review').length, done: tasks.filter(t => t.status === 'done').length }, byPriority: { low: tasks.filter(t => t.priority === 'low').length, medium: tasks.filter(t => t.priority === 'medium').length, high: tasks.filter(t => t.priority === 'high').length }, completionRate: total > 0 ? tasks.filter(t => t.status === 'done').length / total : 0 } });
});

export default app;