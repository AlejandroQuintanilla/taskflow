import { useState, FormEvent } from 'react';
import { Button } from '../Button';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskPriority } from '../../types';
import { TASK_PRIORITIES, PRIORITY_CONFIG } from '../../types';
import { cx } from '../../utils';

interface TaskFormProps {
  task?: Task; // Si se pasa, es modo edición
  onSubmit: (data: CreateTaskDTO | UpdateTaskDTO) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium');
  const [dueDate, setDueDate] = useState(task?.dueDate?.slice(0, 10) ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'El título es obligatorio';
    if (title.trim().length > 100) newErrors.title = 'El título no puede superar los 100 caracteres';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Título */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors({}); }}
          placeholder="¿Qué hay que hacer?"
          className={cx(
            'rounded-lg bg-slate-900 border px-3 py-2 text-white placeholder-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all',
            errors.title ? 'border-red-500' : 'border-slate-600'
          )}
        />
        {errors.title && <p className="text-xs text-red-400">{errors.title}</p>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Añade más detalles (opcional)"
          rows={3}
          className="rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-all"
        />
      </div>

      {/* Prioridad */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">Prioridad</label>
        <div className="flex gap-2">
          {TASK_PRIORITIES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={cx(
                'flex-1 rounded-lg border py-2 text-sm font-medium transition-all',
                priority === p
                  ? 'border-violet-500 bg-violet-600/20 text-violet-300'
                  : 'border-slate-600 bg-slate-900 text-slate-400 hover:border-slate-500'
              )}
            >
              <span className={cx('mr-1.5', PRIORITY_CONFIG[p].color)}>●</span>
              {PRIORITY_CONFIG[p].label}
            </button>
          ))}
        </div>
      </div>

      {/* Fecha de vencimiento */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-300">Fecha de vencimiento</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={new Date().toISOString().slice(0, 10)}
          className="rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-white
            focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all
            [color-scheme:dark]"
        />
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {task ? 'Guardar cambios' : 'Crear tarea'}
        </Button>
      </div>
    </form>
  );
}
