import { Link } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { Button } from '../../components/Button';

export function HomePage() {
  const { tasks, loading } = useTaskContext();

  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const total = tasks.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Hero */}
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-500/30">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Bienvenido a <span className="text-violet-400">TaskFlow</span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
          Organiza tus proyectos con un tablero Kanban simple, rápido y visual.
          Sin complicaciones, solo foco.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/board">
            <Button size="lg">Ir al tablero →</Button>
          </Link>
          <Link to="/stats">
            <Button size="lg" variant="secondary">Ver estadísticas</Button>
          </Link>
        </div>
      </div>

      {/* Stats summary */}
      {!loading && total > 0 && (
        <div className="mt-16 grid grid-cols-3 gap-4">
          {[
            { label: 'Total de tareas', value: total, color: 'text-white' },
            { label: 'En progreso', value: inProgress, color: 'text-blue-400' },
            { label: 'Completadas', value: done, color: 'text-emerald-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-xl bg-slate-800 border border-slate-700 p-6 text-center">
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="mt-1 text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      <div className="mt-16 grid sm:grid-cols-3 gap-6">
        {[
          {
            icon: '📋',
            title: 'Tablero Kanban',
            desc: 'Visualiza el flujo de trabajo con columnas: Backlog, En progreso, Revisión y Completado.',
          },
          {
            icon: '🎯',
            title: 'Prioridades',
            desc: 'Marca tus tareas como alta, media o baja prioridad para saber siempre qué atacar primero.',
          },
          {
            icon: '📊',
            title: 'Estadísticas',
            desc: 'Panel con métricas de progreso: tareas completadas, tasa de finalización y más.',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-6">
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
