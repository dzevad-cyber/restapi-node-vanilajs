require('dotenv').config({ path: `${__dirname}/secrets.env` });

const http = require('http');
const productController = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    productController.getAllProducts(req, res);
  } else if (req.url.match(/\/api\/products\/(.*)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    req.params = { id };
    productController.getProduct(req, res);
  } else if (req.url === '/api/products' && req.method === 'POST') {
    productController.createProduct(req, res);
  } else if (req.url === '/api/products' && req.method === 'DELETE') {
    productController.deleteAllProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/(.*)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    req.params = { id };
    productController.deleteProduct(req, res);
  } else if (req.url.match(/\/api\/products\/(.*)/) && req.method === 'PATCH') {
    const id = req.url.split('/')[3];
    req.params = { id };

    productController.updateProduct(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `${req.url} not found.` }));
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server listening on port ${port}`));
