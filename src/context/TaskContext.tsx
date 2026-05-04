import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/client';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus, FilterState } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  createTask: (dto: CreateTaskDTO) => Promise<Task>;
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  changeStatus: (id: string, status: TaskStatus) => Promise<Task>;
  refresh: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TaskContext = createContext<TaskContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    search: '',
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setFilters = useCallback((partial: Partial<FilterState>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const createTask = useCallback(async (dto: CreateTaskDTO): Promise<Task> => {
    const task = await tasksApi.create(dto);
    setTasks((prev) => [task, ...prev]);
    return task;
  }, []);

  const updateTask = useCallback(async (id: string, dto: UpdateTaskDTO): Promise<Task> => {
    const updated = await tasksApi.update(id, dto);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTask = useCallback(async (id: string): Promise<void> => {
    await tasksApi.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const changeStatus = useCallback(async (id: string, status: TaskStatus): Promise<Task> => {
    const updated = await tasksApi.changeStatus(id, status);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        filters,
        setFilters,
        createTask,
        updateTask,
        deleteTask,
        changeStatus,
        refresh,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTaskContext(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskContext debe usarse dentro de <TaskProvider>');
  return ctx;
}
