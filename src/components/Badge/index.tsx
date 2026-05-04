import { PRIORITY_CONFIG, COLUMN_CONFIG } from '../../types';
import type { TaskPriority, TaskStatus } from '../../types';
import { cx } from '../../utils';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span className={cx('inline-flex items-center gap-1 text-xs font-medium', config.color)}>
      <span className={cx('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = COLUMN_CONFIG[status];
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white',
        config.color
      )}
    >
      {config.label}
    </span>
  );
}
