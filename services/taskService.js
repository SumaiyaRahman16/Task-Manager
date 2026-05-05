const Task = require('../models/taskModel');


let tasks = [];
let currentId = 1;

function createTask({ title, description, status }) {
    if (!title) {
        return { error: 'Title is required' };
    }

    const newTask = new Task(
        currentId++,
        title,
        description || '',
        status || 'To Do'
    );

    tasks.push(newTask);
    return newTask;
}

function getAllTasks() {
    return tasks;
}

function getFilteredTasks(filterFn) {
    if (typeof filterFn !== 'function') {
        return tasks;
    }

    return tasks.filter(filterFn);
}

function getSortedTasks(compareFn) {
    return [...tasks].sort(compareFn);
}

function updateTask(id, { title, description, status }) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return null;
    }

    tasks[taskIndex].title = title || tasks[taskIndex].title;
    tasks[taskIndex].description = description || tasks[taskIndex].description;
    tasks[taskIndex].status = status || tasks[taskIndex].status;

    return tasks[taskIndex];
}

function updateTaskStatus(id, status) {
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return null;
    }

    tasks[taskIndex].status = status;
    return tasks[taskIndex];
}

function deleteTask(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);

    return tasks.length !== initialLength;
}

function getTasksByStatus(status) {
    if (!status) {
        return null;
    }

    return tasks.filter((task) => task.status === status);
}

function getTasksSortedBy(sortBy) {
    if (!sortBy || !['id', 'title', 'status'].includes(sortBy)) {
        return null;
    }

    return [...tasks].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
}

module.exports = {
    createTask,
    getAllTasks,
    getFilteredTasks,
    getSortedTasks,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getTasksByStatus,
    getTasksSortedBy,
};