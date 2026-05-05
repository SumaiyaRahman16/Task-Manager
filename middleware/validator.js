function validateTask(req, res, next) {
    if (!req.body.title && req.method === 'POST') {
        return res.status(400).json({ error: 'Title is required' });
    }

    next();
}

module.exports = {
    validateTask,
};