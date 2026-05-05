const taskService = require('../services/taskService');

function createTask(req, res) {
    const result = taskService.createTask(req.body);

    if (result && result.error) {
        return res.status(400).json({ error: result.error });
    }

    return res.status(201).json(result);
}

function getAllTasks(req, res) {
    return res.json(taskService.getAllTasks());
}

function searchTasks(req, res) {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ error: 'search query parameter is required' });
    }

    const q = search.toLowerCase();
    const filtered = taskService.getFilteredTasks((task) => {
        const titleMatch = task.title && task.title.toLowerCase().includes(q);
        const descMatch = task.description && task.description.toLowerCase().includes(q);
        return titleMatch || descMatch;
    });

    return res.json(filtered);
}

function updateTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const updatedTask = taskService.updateTask(id, req.body);

    if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(updatedTask);
}

function deleteTask(req, res) {
    const id = parseInt(req.params.id, 10);
    const isDeleted = taskService.deleteTask(id);

    if (!isDeleted) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(204).send();
}

function getFilteredByStatus(req, res) {
    const { status } = req.query;

    if (!status) {
        return res.status(400).json({ error: 'Status query parameter is required' });
    }

    const filtered = taskService.getTasksByStatus(status);

    return res.json(filtered);
}

function getSortedTasks(req, res) {
    const { sortBy } = req.query;

    if (!sortBy) {
        return res.status(400).json({ error: 'sortBy query parameter is required' });
    }

    const sorted = taskService.getTasksSortedBy(sortBy);

    if (!sorted) {
        return res.status(400).json({ error: 'sortBy must be one of: id, title, status' });
    }

    return res.json(sorted);
}

function updateTaskStatus(req, res) {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!status || typeof status !== 'string') {
        return res.status(400).json({ error: 'Status is required' });
    }

    const updated = taskService.updateTaskStatus(id, status);

    if (!updated) {
        return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(updated);
}

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    getFilteredByStatus,
    getSortedTasks,
    updateTaskStatus,
    searchTasks,
};