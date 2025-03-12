const express = require("express");
const router = express.Router();

const products = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Phone", price: 500 }
];

router.get("/products", (req, res) => {
    res.json(products);
});

router.get("/product/:id", (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

module.exports = router;
