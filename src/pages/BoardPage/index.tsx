import { useState } from 'react';
import { BoardColumn } from '../../components/BoardColumn';
import { FilterBar } from '../../components/FilterBar';
import { Modal } from '../../components/Modal';
import { TaskForm } from '../../components/TaskForm';
import { Button } from '../../components/Button';
import { useTaskContext } from '../../context/TaskContext';
import { useTasksByStatus, useModal } from '../../hooks';
import { TASK_STATUSES } from '../../types';
import type { Task } from '../../types';

export function BoardPage() {
  const { loading, error, createTask, updateTask, refresh } = useTaskContext();
  const tasksByStatus = useTasksByStatus();
  const createModal = useModal();
  const editModal = useModal<Task>();
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreate = async (data: Parameters<typeof createTask>[0]) => {
    setFormError(null);
    try {
      await createTask(data);
      createModal.close();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al crear la tarea');
    }
  };

  const handleEdit = async (data: Parameters<typeof updateTask>[1]) => {
    if (!editModal.data) return;
    setFormError(null);
    try {
      await updateTask(editModal.data.id, data);
      editModal.close();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tablero</h1>
          <p className="text-sm text-slate-400 mt-0.5">Gestiona y organiza tus tareas</p>
        </div>
        <Button onClick={() => { setFormError(null); createModal.open(); }}>
          + Nueva tarea
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar />
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-900/20 border border-red-500/30 p-4 flex items-center justify-between">
          <p className="text-sm text-red-400">{error}</p>
          <Button size="sm" variant="secondary" onClick={refresh}>Reintentar</Button>
        </div>
      )}

      {/* Board */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TASK_STATUSES.map((status) => (
            <BoardColumn
              key={status}
              status={status}
              tasks={tasksByStatus[status]}
              onEditTask={(task) => { setFormError(null); editModal.open(task); }}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={createModal.isOpen} onClose={createModal.close} title="Nueva tarea">
        {formError && <p className="mb-4 text-sm text-red-400">{formError}</p>}
        <TaskForm onSubmit={handleCreate} onCancel={createModal.close} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.close} title="Editar tarea">
        {formError && <p className="mb-4 text-sm text-red-400">{formError}</p>}
        {editModal.data && (
          <TaskForm task={editModal.data} onSubmit={handleEdit} onCancel={editModal.close} />
        )}
      </Modal>
    </div>
  );
}
