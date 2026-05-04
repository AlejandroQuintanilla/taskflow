// Cliente de API tipado para TaskFlow
// Centraliza todas las llamadas HTTP al backend

import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStats, TaskStatus, ApiResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const API_PREFIX = `${BASE_URL}/api/v1`;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_PREFIX}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }

  const json: ApiResponse<T> = await response.json();
  return json.data;
}

// ─── Tasks ───────────────────────────────────────────────────────────────────

export const tasksApi = {
  getAll(): Promise<Task[]> {
    return request<Task[]>('/tasks');
  },

  getById(id: string): Promise<Task> {
    return request<Task>(`/tasks/${id}`);
  },

  create(dto: CreateTaskDTO): Promise<Task> {
    return request<Task>('/tasks', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  update(id: string, dto: UpdateTaskDTO): Promise<Task> {
    return request<Task>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  },

  changeStatus(id: string, status: TaskStatus): Promise<Task> {
    return request<Task>(`/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete(id: string): Promise<void> {
    return request<void>(`/tasks/${id}`, { method: 'DELETE' });
  },

  getStats(): Promise<TaskStats> {
    return request<TaskStats>('/tasks/stats');
  },
};
