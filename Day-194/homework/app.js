const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let items = [];

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

app.post('/items', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ message: 'ID and name are required' });
    }
    const newItem = { id, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.post('/items/bulk', (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: 'Request body must be an array' });
    }
    req.body.forEach(item => {
        if (item.id && item.name) {
            items.push(item);
        }
    });
    res.status(201).json(items);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
