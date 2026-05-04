import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  getStats,
  createTask,
  updateTask,
  changeTaskStatus,
  deleteTask,
} from '../controllers/taskController';

const router = Router();

// El orden importa: /stats debe ir ANTES de /:id para no confundirlo como un ID
router.get('/stats', getStats);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/status', changeTaskStatus);
router.delete('/:id', deleteTask);

export default router;
