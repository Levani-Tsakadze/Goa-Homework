const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {
    res.json(tasks);
});

router.post('/', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

module.exports = router;
