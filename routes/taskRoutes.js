const express = require('express');
const taskController = require('../controllers/taskController');
const { validateTask } = require('../middleware/validator');

const router = express.Router();

router.post('/tasks', validateTask, taskController.createTask);
router.get('/tasks/filter', taskController.getFilteredByStatus);
router.get('/tasks/sorted', taskController.getSortedTasks);
router.get('/tasks/search', taskController.searchTasks);
router.get('/tasks', taskController.getAllTasks);
router.patch('/tasks/:id/status', taskController.updateTaskStatus);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;