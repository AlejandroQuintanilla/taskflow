import type { VercelRequest, VercelResponse } from '@vercel/node';

const tasks: any[] = [
  { id: '1', title: 'Configurar el proyecto', description: '', status: 'done', priority: 'high', dueDate: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'Crear componentes', description: '', status: 'in-progress', priority: 'medium', dueDate: null, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = req.url ?? '';

  if (url === '/health') return res.json({ status: 'ok', timestamp: new Date().toISOString() });

  if (url === '/api/v1/tasks' && req.method === 'GET') return res.json({ data: tasks });

  if (url === '/api/v1/tasks/stats' && req.method === 'GET') {
    const total = tasks.length;
    return res.json({ data: { total, byStatus: { backlog: tasks.filter(t => t.status === 'backlog').length, 'in-progress': tasks.filter(t => t.status === 'in-progress').length, review: tasks.filter(t => t.status === 'review').length, done: tasks.filter(t => t.status === 'done').length }, byPriority: { low: tasks.filter(t => t.priority === 'low').length, medium: tasks.filter(t => t.priority === 'medium').length, high: tasks.filter(t => t.priority === 'high').length }, completionRate: total > 0 ? tasks.filter(t => t.status === 'done').length / total : 0 } });
  }

  if (url === '/api/v1/tasks' && req.method === 'POST') {
    const task = { id: Date.now().toString(), ...req.body, status: 'backlog', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    tasks.unshift(task);
    return res.status(201).json({ data: task });
  }

  const matchId = url.match(/^\/api\/v1\/tasks\/([^/]+)$/);
  const matchStatus = url.match(/^\/api\/v1\/tasks\/([^/]+)\/status$/);

  if (matchStatus) {
    const i = tasks.findIndex(t => t.id === matchStatus[1]);
    if (i === -1) return res.status(404).json({ error: 'not_found' });
    tasks[i] = { ...tasks[i], status: req.body.status, updatedAt: new Date().toISOString() };
    return res.json({ data: tasks[i] });
  }

  if (matchId && req.method === 'PUT') {
    const i = tasks.findIndex(t => t.id === matchId[1]);
    if (i === -1) return res.status(404).json({ error: 'not_found' });
    tasks[i] = { ...tasks[i], ...req.body, updatedAt: new Date().toISOString() };
    return res.json({ data: tasks[i] });
  }

  if (matchId && req.method === 'DELETE') {
    const i = tasks.findIndex(t => t.id === matchId[1]);
    if (i === -1) return res.status(404).json({ error: 'not_found' });
    tasks.splice(i, 1);
    return res.json({ data: null });
  }

  return res.status(404).json({ error: 'not_found' });
}