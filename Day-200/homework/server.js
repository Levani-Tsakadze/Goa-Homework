const express = require('express');
const app = express();


app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
