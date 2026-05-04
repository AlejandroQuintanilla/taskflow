import { useStats } from '../../hooks';
import { Button } from '../../components/Button';
import { COLUMN_CONFIG, PRIORITY_CONFIG } from '../../types';
import type { TaskStatus, TaskPriority } from '../../types';

export function StatsPage() {
  const { stats, loading, error, refresh } = useStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={refresh}>Reintentar</Button>
      </div>
    );
  }

  if (!stats) return null;

  const completionRate = Math.round(stats.completionRate * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Estadísticas</h1>
        <p className="text-sm text-slate-400 mt-0.5">Resumen del estado de tus tareas</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-5 col-span-2 sm:col-span-1">
          <p className="text-sm text-slate-400">Total de tareas</p>
          <p className="text-4xl font-bold text-white mt-1">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
          <p className="text-sm text-slate-400">Completadas</p>
          <p className="text-4xl font-bold text-emerald-400 mt-1">{stats.byStatus.done}</p>
        </div>
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
          <p className="text-sm text-slate-400">En progreso</p>
          <p className="text-4xl font-bold text-blue-400 mt-1">{stats.byStatus['in-progress']}</p>
        </div>
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
          <p className="text-sm text-slate-400">Tasa de completado</p>
          <p className="text-4xl font-bold text-violet-400 mt-1">{completionRate}%</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl bg-slate-800 border border-slate-700 p-6 mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-sm font-medium text-slate-300">Progreso general</span>
          <span className="text-sm text-slate-400">{stats.byStatus.done} / {stats.total}</span>
        </div>
        <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all duration-700"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* By status */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Por estado</h2>
          <div className="flex flex-col gap-3">
            {(Object.keys(stats.byStatus) as TaskStatus[]).map((status) => {
              const count = stats.byStatus[status];
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              const config = COLUMN_CONFIG[status];
              return (
                <div key={status}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">{config.label}</span>
                    <span className="text-xs text-slate-300 font-medium">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className={`h-full rounded-full ${config.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-slate-800 border border-slate-700 p-6">
          <h2 className="text-sm font-semibold text-slate-300 mb-4">Por prioridad</h2>
          <div className="flex flex-col gap-3">
            {(Object.keys(stats.byPriority) as TaskPriority[]).map((priority) => {
              const count = stats.byPriority[priority];
              const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
              const config = PRIORITY_CONFIG[priority];
              return (
                <div key={priority}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">{config.label}</span>
                    <span className="text-xs text-slate-300 font-medium">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className={`h-full rounded-full ${config.dot} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
