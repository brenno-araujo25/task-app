import express from 'express';
import db from '../models/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create task route - POST /tasks
router.post('/', auth, async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = db.Task.create({
            title,
            description,
            status,
            userId: req.user.id
        })
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks from user route - GET /tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await db.Task.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get task by id route - GET /tasks/:id
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db.Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task by id route - PUT /tasks/:id
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if ((title === '' && description === '' && status === '') || (!title && !description && !status)) {
        return res.status(400).json({ error: 'Title, description or status fields are required' });
    }

    try {
        const task = await db.Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete task by id route - DELETE /tasks/:id
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await db.Task.findOne({ where: { id, userId: req.user.id } });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;