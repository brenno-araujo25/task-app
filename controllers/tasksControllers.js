import { 
    createTaskService, 
    getAllTasksService, 
    getTaskByIdService, 
    updateTaskService, 
    deleteTaskService 
} from "../services/tasksServices.js";

export const createTaskController = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await createTaskService(title, description, status, req.user.id);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllTasksController = async (req, res) => {
    try {
        const tasks = await getAllTasksService(req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTaskByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await getTaskByIdService(id, req.user.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskController = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await updateTaskService(id, title, description, status, req.user.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTaskController = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await deleteTaskService(id, req.user.id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};