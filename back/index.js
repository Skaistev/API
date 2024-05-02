import express from "express"

const app = express();
const port = 4898;

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];

  app.use(express.json());


// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to our shop!');
});

app.get('/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:id', (req, res) => {

  try {
    const productId = parseInt(req.params.id);
    
    // Find the product in the products array by ID
    const product = products.find(product => product.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/products', (req, res) => {
  try {
    const { name, price } = req.body;

    // Create a new product object
    const newProduct = { id: products.length + 1, name, price };
    
    // Add the product to the products array
    products.push(newProduct);

    res.json("Product added  to list");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    // Find the index of the product in the products array by ID
    const index = products.findIndex(product => product.id === productId);

    if (index === -1) {
    
    
      res.status(200).json("nothing to update"); 
    } else {
      // Product exists, update it
      products[index] = { ...products[index], name, price };
      res.json(products[index]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    
    // Find the index of the product in the products array by ID
    const index = products.findIndex(product => product.id === productId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Remove the product from the products array
    products.splice(index, 1);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users', (req, res) => {
    res.json(users);
  });
  
  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
  
  app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).send('User added successfully');
  });
  
  app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updateUser = req.body;
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...updateUser };
      res.send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});