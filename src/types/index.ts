// Tipos principales de la aplicación TaskFlow

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

export interface TaskStats {
  total: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  completionRate: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  message: string;
}

export interface FilterState {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  search: string;
}

export const COLUMN_CONFIG: Record<TaskStatus, { label: string; color: string }> = {
  backlog: { label: 'Backlog', color: 'bg-slate-500' },
  'in-progress': { label: 'En progreso', color: 'bg-blue-500' },
  review: { label: 'En revisión', color: 'bg-amber-500' },
  done: { label: 'Completado', color: 'bg-emerald-500' },
};

export const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; dot: string }> = {
  low: { label: 'Baja', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  medium: { label: 'Media', color: 'text-amber-400', dot: 'bg-amber-400' },
  high: { label: 'Alta', color: 'text-red-400', dot: 'bg-red-400' },
};

export const TASK_STATUSES: TaskStatus[] = ['backlog', 'in-progress', 'review', 'done'];
export const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];
