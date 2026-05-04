// Capa de controladores: gestiona HTTP, delega lógica al servicio

import { Request, Response } from 'express';
import { taskService } from '../services/taskService';
import type { CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../services/taskService';

const VALID_STATUSES: TaskStatus[] = ['backlog', 'in-progress', 'review', 'done'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

// GET /api/v1/tasks
export function getAllTasks(_req: Request, res: Response) {
  const tasks = taskService.getAll();
  res.json({ data: tasks });
}

// GET /api/v1/tasks/stats
export function getStats(_req: Request, res: Response) {
  const stats = taskService.getStats();
  res.json({ data: stats });
}

// GET /api/v1/tasks/:id
export function getTaskById(req: Request, res: Response) {
  const task = taskService.getById(req.params.id);
  if (!task) return res.status(404).json({ error: 'not_found', message: 'Tarea no encontrada' });
  res.json({ data: task });
}

// POST /api/v1/tasks
export function createTask(req: Request, res: Response) {
  const { title, description, priority, dueDate } = req.body as CreateTaskDTO;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'validation', message: 'El título es obligatorio' });
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'validation', message: 'Prioridad inválida' });
  }

  const task = taskService.create({ title, description, priority, dueDate });
  res.status(201).json({ data: task, message: 'Tarea creada correctamente' });
}

// PUT /api/v1/tasks/:id
export function updateTask(req: Request, res: Response) {
  const { title, description, priority, dueDate } = req.body as UpdateTaskDTO;

  if (title !== undefined && (!title || !title.trim())) {
    return res.status(400).json({ error: 'validation', message: 'El título no puede estar vacío' });
  }
  if (priority && !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'validation', message: 'Prioridad inválida' });
  }

  const task = taskService.update(req.params.id, { title, description, priority, dueDate });
  if (!task) return res.status(404).json({ error: 'not_found', message: 'Tarea no encontrada' });
  res.json({ data: task, message: 'Tarea actualizada correctamente' });
}

// PATCH /api/v1/tasks/:id/status
export function changeTaskStatus(req: Request, res: Response) {
  const { status } = req.body as { status: TaskStatus };

  if (!status || !VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'validation', message: 'Estado inválido' });
  }

  const task = taskService.changeStatus(req.params.id, status);
  if (!task) return res.status(404).json({ error: 'not_found', message: 'Tarea no encontrada' });
  res.json({ data: task, message: 'Estado actualizado correctamente' });
}

// DELETE /api/v1/tasks/:id
export function deleteTask(req: Request, res: Response) {
  const deleted = taskService.delete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'not_found', message: 'Tarea no encontrada' });
  res.status(200).json({ data: null, message: 'Tarea eliminada correctamente' });
}
