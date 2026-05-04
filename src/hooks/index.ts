// Custom hooks de TaskFlow

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { filterTasks, sortTasks } from '../utils';
import { tasksApi } from '../api/client';
import type { TaskStats } from '../types';

// ─── useFilteredTasks ─────────────────────────────────────────────────────────
/**
 * Devuelve las tareas filtradas y ordenadas según los filtros activos del contexto.
 * Usa useMemo para evitar recalcular cuando no cambian las dependencias.
 */
export function useFilteredTasks() {
  const { tasks, filters } = useTaskContext();

  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const sorted = useMemo(() => sortTasks(filtered), [filtered]);

  return sorted;
}

// ─── useTasksByStatus ─────────────────────────────────────────────────────────
/**
 * Agrupa las tareas filtradas por columna de estado.
 * Útil para el tablero Kanban.
 */
export function useTasksByStatus() {
  const tasks = useFilteredTasks();

  return useMemo(() => {
    return {
      backlog: tasks.filter((t) => t.status === 'backlog'),
      'in-progress': tasks.filter((t) => t.status === 'in-progress'),
      review: tasks.filter((t) => t.status === 'review'),
      done: tasks.filter((t) => t.status === 'done'),
    };
  }, [tasks]);
}

// ─── useStats ─────────────────────────────────────────────────────────────────
/**
 * Custom hook que obtiene las estadísticas de tareas desde la API.
 * Gestiona los tres estados: loading, data y error.
 */
export function useStats() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refresh: fetchStats };
}

// ─── useModal ─────────────────────────────────────────────────────────────────
/**
 * Custom hook genérico para gestionar el estado abierto/cerrado de un modal.
 * Acepta un tipo genérico T para el dato asociado al modal (ej: la tarea a editar).
 */
export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const open = useCallback((d?: T) => {
    setData(d);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  return { isOpen, data, open, close };
}

// ─── useDebounce ──────────────────────────────────────────────────────────────
/**
 * Custom hook que retrasa la actualización de un valor por N milisegundos.
 * Útil para filtros de búsqueda (evita llamadas excesivas mientras el usuario escribe).
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
