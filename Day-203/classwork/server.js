const express = require("express");
const app = express();



const authenticate = (req, res, next) => {
    console.log("Authenticating");
    next();
};


const getData = (req, res, next) => {
    req.products = [
        { id: 1, name: "Laptop", price: 900 },
        { id: 2, name: "Phone", price: 300 },
        { id: 3, name: "Tablet", price: 400 }
    ];
    res.json(req.products);
};


app.get("/products", authenticate, getData);

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
