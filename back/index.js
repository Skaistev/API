import express from "express"

const app = express();
const port = 4898;

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to our shop!');
});

app.get('/products', (req, res) => {
  res.send('List of products');
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Product details for ID ${productId}`);
});

app.post('/products', (req, res) => {
  res.send('Add new product');
});

app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Update product with ID ${productId}`);
});

app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send(`Delete product with ID ${productId}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});