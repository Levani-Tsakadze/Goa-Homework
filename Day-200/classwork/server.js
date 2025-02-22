const express = require('express');
const app = express();


// Middleware, რომელიც საშუალებას გვაძლევს JSON მონაცემების დამუშავება
app.use(express.json());

// Admins როუტერი - გამოიყენება ადმინისტრატორების სამართავად
const adminsRouter = express.Router();

// ადმინისტრატორების სია (დროებით მონაცემთა ბაზად)
let admins = [{ id: 1, name: 'Admin1' }, { id: 2, name: 'Admin2' }];

// ყველა ადმინისტრატორის დაბრუნება
adminsRouter.get('/', (req, res) => {
    res.json(admins);
});

// კონკრეტული ადმინისტრატორის დაბრუნება ID-ის მიხედვით
adminsRouter.get('/:id', (req, res) => {
    const admin = admins.find(a => a.id == req.params.id);
    if (admin) {
        res.json(admin);
    } else {
        res.status(404).json({ message: 'Admin not found' });
    }
});

// ახალი ადმინისტრატორის დამატება
adminsRouter.post('/', (req, res) => {
    const newAdmin = { id: admins.length + 1, name: req.body.name };
    admins.push(newAdmin);
    res.status(201).json(newAdmin);
});

app.use('/admins', adminsRouter);

// Products როუტერი - გამოიყენება პროდუქტების სამართავად
const productsRouter = express.Router();

// პროდუქტების სია
let products = [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }];

// ყველა პროდუქტის დაბრუნება
productsRouter.get('/', (req, res) => {
    res.json(products);
});

// კონკრეტული პროდუქტის დაბრუნება ID-ის მიხედვით
productsRouter.get('/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// ახალი პროდუქტის დამატება
productsRouter.post('/', (req, res) => {
    const newProduct = { id: products.length + 1, name: req.body.name };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.use('/products', productsRouter);

// სერვერის გაშვება
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});