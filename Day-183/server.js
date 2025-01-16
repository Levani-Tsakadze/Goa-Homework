const http = require('http');

const products = [
  { id: 1, name: 'Laptop', price: 1500 },
  { id: 2, name: 'Phone', price: 700 },
  { id: 3, name: 'Headphones', price: 150 },
];

const server = http.createServer((req, res) => {
  if (req.url === '/products' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});




