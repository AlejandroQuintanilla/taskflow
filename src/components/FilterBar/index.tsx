import { useState, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { useDebounce } from '../../hooks';
import type { TaskStatus, TaskPriority } from '../../types';
import { COLUMN_CONFIG, PRIORITY_CONFIG } from '../../types';
import { cx } from '../../utils';

export function FilterBar() {
  const { filters, setFilters } = useTaskContext();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch, setFilters]);

  const statusOptions: Array<{ value: TaskStatus | 'all'; label: string }> = [
    { value: 'all', label: 'Todos' },
    { value: 'backlog', label: COLUMN_CONFIG.backlog.label },
    { value: 'in-progress', label: COLUMN_CONFIG['in-progress'].label },
    { value: 'review', label: COLUMN_CONFIG.review.label },
    { value: 'done', label: COLUMN_CONFIG.done.label },
  ];

  const priorityOptions: Array<{ value: TaskPriority | 'all'; label: string }> = [
    { value: 'all', label: 'Todas' },
    { value: 'high', label: PRIORITY_CONFIG.high.label },
    { value: 'medium', label: PRIORITY_CONFIG.medium.label },
    { value: 'low', label: PRIORITY_CONFIG.low.label },
  ];

  const hasActiveFilters =
    filters.status !== 'all' || filters.priority !== 'all' || filters.search !== '';

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Búsqueda */}
      <div className="relative flex-1 min-w-[200px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Buscar tareas..."
          className="w-full rounded-lg bg-slate-800 border border-slate-700 pl-9 pr-3 py-2 text-sm
            text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
        />
      </div>

      {/* Estado */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value as TaskStatus | 'all' })}
        className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-300
          focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Prioridad */}
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value as TaskPriority | 'all' })}
        className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-300
          focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
      >
        {priorityOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      {/* Reset */}
      {hasActiveFilters && (
        <button
          onClick={() => {
            setSearchInput('');
            setFilters({ status: 'all', priority: 'all', search: '' });
          }}
          className="text-xs text-slate-400 hover:text-white transition-colors underline"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
