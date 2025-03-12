1

// const express = require('express');
// const app = express();


// const myMiddleware = (req, res, next) => {
//     console.log('Hello');
//     next(); 
// };


// app.use(myMiddleware);


// app.get('/', (req, res) => {
//     res.send('main');
// });


// app.get('/about', (req, res) => {
//     res.send('about');
// });


// app.listen(3000, () => {
//     console.log('server running on port 3000');
// });


2

const express = require('express');
const app = express();


app.use(["/users", "/products"], (req, res, next) => {
    console.log('Middleware გააქტიურდება "/users" და "/products" ბილიკზე');
    next();
});


app.get('/users', (req, res) => {
    res.send('users');
});

app.get('/products', (req, res) => {
    res.send('products');
});


app.get('/about', (req, res) => {
    res.send('about us');
});



app.listen(3000, () => {
    console.log('server running on port 3000 ');
});
