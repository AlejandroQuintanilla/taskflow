import { TaskCard } from '../TaskCard';
import type { Task, TaskStatus } from '../../types';
import { COLUMN_CONFIG } from '../../types';
import { cx } from '../../utils';

interface BoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

export function BoardColumn({ status, tasks, onEditTask }: BoardColumnProps) {
  const config = COLUMN_CONFIG[status];

  return (
    <div className="flex flex-col min-h-[400px] rounded-xl bg-slate-800/50 border border-slate-700/50">
      {/* Column header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-700/50">
        <span className={cx('h-2 w-2 rounded-full', config.color)} />
        <h2 className="text-sm font-semibold text-slate-200">{config.label}</h2>
        <span className="ml-auto rounded-full bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-300">
          {tasks.length}
        </span>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        {tasks.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-xs text-slate-600">Sin tareas</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))
        )}
      </div>
    </div>
  );
}
