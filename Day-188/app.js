const express = require('express');
const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/products', (req, res) => {
  const response = {  
    product: req.body.product,  
    price: req.body.price
  };  
  console.log(response);  
  res.send(`Product: ${response.product}, Price: ${response.price}`);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
