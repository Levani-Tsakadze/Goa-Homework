const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const DATA_FILE = path.join(__dirname, 'tasks.json');


app.use(express.json());
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


const readTasks = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (error) {
        return [];
    }
};

const writeTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};


app.get('/tasks', (req, res) => {
    let tasks = readTasks();
    if (req.query.completed) {
        const isCompleted = req.query.completed === 'true';
        tasks = tasks.filter(task => task.completed === isCompleted);
    }
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    let tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
    tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.status(204).send();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
