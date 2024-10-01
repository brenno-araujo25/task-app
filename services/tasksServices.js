import db from '../models/index.js';

export const createTaskService = async (title, description, status, userId) => {
    if (!title || !description) {
        return { error: 'Title and description fields are required' };
    }
    
    try {
        const task = await db.Task.create({
            title,
            description,
            status,
            userId
        })
        return {
            message: 'Task created successfully'
        };
    } catch (error) {
        return { error: error.message };
    }
};

export const getAllTasksService = async (userId) => {
    try {
        const tasks = await db.Task.findAll({ where: { userId } });
        return tasks;
    } catch (error) {
        return { error: error.message };
    }
};

export const getTaskByIdService = async (id, userId) => {
    try {
        const task = await db.Task.findOne({ where: { id, userId } });
        return task;
    } catch (error) {
        return { error: error.message };
    }
};

export const updateTaskService = async (id, title, description, status, userId) => {
    if ((title === '' && description === '' && status === '') || (!title && !description && !status)) {
        return { error: 'Title, description or status fields are required' };
    }

    try {
        const task = await db.Task.findOne({ where: { id, userId } });
        if (!task) {
            return { error: 'Task not found' };
        }

        await task.update({ title, description, status });
        return { message: 'Task updated successfully', task };
    } catch (error) {
        return { error: error.message };
    }
};

export const deleteTaskService = async (id, userId) => {
    try {
        const task = await db.Task.findOne({ where: { id, userId } });
        if (!task) {
            return { error: 'Task not found' };
        }

        await task.destroy();
        return { message: 'Task deleted successfully' };
    } catch (error) {
        return { error: error.message };
    }
};