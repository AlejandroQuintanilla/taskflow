// Capa de servicio: lógica de negocio pura, sin conocimiento de HTTP

import { randomUUID } from 'crypto';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskStatus = 'backlog' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string | null;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string | null;
}

// ─── In-memory store ──────────────────────────────────────────────────────────

const tasks: Task[] = [
  {
    id: randomUUID(),
    title: 'Configurar el proyecto base',
    description: 'Inicializar Vite con React y TypeScript, instalar dependencias',
    status: 'done',
    priority: 'high',
    dueDate: null,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Implementar backend Express',
    description: 'Arquitectura por capas: routes, controllers, services',
    status: 'done',
    priority: 'high',
    dueDate: null,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Crear componentes reutilizables',
    description: 'TaskCard, BoardColumn, FilterBar, Modal, Button, Badge',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Integrar frontend con API',
    description: 'Cliente de API tipado y gestión de estados loading/error/data',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Escribir documentación completa',
    description: 'Todos los archivos en docs/ según el ejercicio',
    status: 'review',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Desplegar en Vercel',
    description: 'Frontend y backend en producción, configurar variables de entorno',
    status: 'backlog',
    priority: 'low',
    dueDate: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ─── Service functions ────────────────────────────────────────────────────────

export const taskService = {
  getAll(): Task[] {
    return tasks;
  },

  getById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  },

  create(dto: CreateTaskDTO): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: randomUUID(),
      title: dto.title.trim(),
      description: dto.description?.trim() ?? '',
      status: 'backlog',
      priority: dto.priority ?? 'medium',
      dueDate: dto.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    };
    tasks.unshift(task);
    return task;
  },

  update(id: string, dto: UpdateTaskDTO): Task | undefined {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    const updated: Task = {
      ...tasks[index],
      ...(dto.title !== undefined && { title: dto.title.trim() }),
      ...(dto.description !== undefined && { description: dto.description.trim() }),
      ...(dto.priority !== undefined && { priority: dto.priority }),
      ...(dto.dueDate !== undefined && { dueDate: dto.dueDate }),
      updatedAt: new Date().toISOString(),
    };
    tasks[index] = updated;
    return updated;
  },

  changeStatus(id: string, status: TaskStatus): Task | undefined {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;
    tasks[index] = { ...tasks[index], status, updatedAt: new Date().toISOString() };
    return tasks[index];
  },

  delete(id: string): boolean {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  getStats() {
    const total = tasks.length;
    const byStatus = {
      backlog: tasks.filter((t) => t.status === 'backlog').length,
      'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
      review: tasks.filter((t) => t.status === 'review').length,
      done: tasks.filter((t) => t.status === 'done').length,
    };
    const byPriority = {
      low: tasks.filter((t) => t.priority === 'low').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      high: tasks.filter((t) => t.priority === 'high').length,
    };
    return {
      total,
      byStatus,
      byPriority,
      completionRate: total > 0 ? byStatus.done / total : 0,
    };
  },
};
