const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3
const DATA_FILE = 'products.json';

app.use(cors());
app.use(bodyParser.json());


const readProducts = () => {
    try {
        const data = fs.readFileSync(DATA_FILE);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};


const writeProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

// GET 
app.get('/products', (req, res) => {
    let products = readProducts();
    const { sort, minPrice, maxPrice, limit } = req.query;

    if (minPrice) {
        products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
        products = products.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (sort === 'ascending') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'descending') {
        products.sort((a, b) => b.price - a.price);
    }
    if (limit) {
        products = products.slice(0, parseInt(limit));
    }

    res.json(products);
});

// GET 
app.get('/products/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});

// POST
app.post('/products', (req, res) => {
    const products = readProducts();
    const { name, price } = req.body;
    if (!name || price == null) {
        return res.status(400).json({ message: 'Name and price are required' });
    }
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price: parseFloat(price)
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

// PUT
app.put('/products/:id', (req, res) => {
    let products = readProducts();
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (name) products[productIndex].name = name;
    if (price != null) products[productIndex].price = parseFloat(price);
    writeProducts(products);
    res.json(products[productIndex]);
});

// DELETE 
app.delete('/products/:id', (req, res) => {
    let products = readProducts();
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const deletedProduct = products.splice(productIndex, 1);
    writeProducts(products);
    res.json(deletedProduct);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
