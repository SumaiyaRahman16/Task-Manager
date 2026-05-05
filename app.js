const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use(taskRoutes);
app.use(errorHandler);

module.exports = app;