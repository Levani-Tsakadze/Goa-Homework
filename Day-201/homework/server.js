const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});


app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = { id: idCounter++, title, completed: completed || false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    const { title, completed } = req.body;
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    
    res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
    
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});