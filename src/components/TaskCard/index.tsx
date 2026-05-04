import { useState, useCallback } from 'react';
import { PriorityBadge } from '../Badge';
import { Button } from '../Button';
import { useTaskContext } from '../../context/TaskContext';
import type { Task, TaskStatus } from '../../types';
import { TASK_STATUSES, COLUMN_CONFIG } from '../../types';
import { formatDate, isOverdue, isDueSoon, cx } from '../../utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, changeStatus } = useTaskContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const overdue = isOverdue(task);
  const soon = isDueSoon(task);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTask, task.id]);

  const handleStatusChange = useCallback(async (status: TaskStatus) => {
    setIsChangingStatus(true);
    setShowStatusMenu(false);
    try {
      await changeStatus(task.id, status);
    } finally {
      setIsChangingStatus(false);
    }
  }, [changeStatus, task.id]);

  return (
    <div className={cx(
      'group relative rounded-xl bg-slate-800 border transition-all duration-200',
      'hover:border-slate-600 hover:shadow-lg hover:shadow-black/20',
      overdue ? 'border-red-500/40' : 'border-slate-700'
    )}>
      {/* Indicador de prioridad */}
      <div className={cx(
        'absolute left-0 top-3 bottom-3 w-0.5 rounded-full',
        task.priority === 'high' ? 'bg-red-400' :
        task.priority === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
      )} />

      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 text-sm font-semibold text-white leading-snug line-clamp-2">
            {task.title}
          </h3>
          {/* Actions (visibles en hover) */}
          <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              title="Editar"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-md p-1 text-slate-400 hover:bg-red-900/40 hover:text-red-400 transition-colors"
              title="Eliminar"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Descripción */}
        {task.description && (
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2">{task.description}</p>
        )}

        {/* Footer */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <PriorityBadge priority={task.priority} />

          <div className="flex items-center gap-2">
            {/* Fecha */}
            {task.dueDate && (
              <span className={cx(
                'text-xs',
                overdue ? 'text-red-400 font-medium' :
                soon ? 'text-amber-400' : 'text-slate-500'
              )}>
                {overdue ? '⚠ ' : ''}{formatDate(task.dueDate)}
              </span>
            )}

            {/* Cambio de estado rápido */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu((v) => !v)}
                disabled={isChangingStatus}
                className="rounded-md px-2 py-0.5 text-xs text-slate-400 border border-slate-600
                  hover:border-slate-500 hover:text-slate-300 transition-colors"
              >
                Mover ▾
              </button>
              {showStatusMenu && (
                <div className="absolute bottom-full right-0 mb-1 z-10 w-36 rounded-lg bg-slate-900
                  border border-slate-700 shadow-xl overflow-hidden">
                  {TASK_STATUSES.filter((s) => s !== task.status).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className="w-full px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      {COLUMN_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
