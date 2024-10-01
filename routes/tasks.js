import express from 'express';
import auth from '../middleware/auth.js';
import { 
    createTaskController,
    getAllTasksController, 
    getTaskByIdController, 
    updateTaskController, 
    deleteTaskController 
} from '../controllers/tasksControllers.js';
const router = express.Router();

// Create task route - POST /tasks
router.post('/', auth, createTaskController);

// Get all tasks from user route - GET /tasks
router.get('/', auth, getAllTasksController);

// Get task by id route - GET /tasks/:id
router.get('/:id', auth, getTaskByIdController);

// Update task by id route - PUT /tasks/:id
router.put('/:id', auth, updateTaskController);

// Delete task by id route - DELETE /tasks/:id
router.delete('/:id', auth, deleteTaskController);

export default router;