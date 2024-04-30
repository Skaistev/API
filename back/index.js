import express from "express"

const app = express();
const port = 4898;

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  app.use(express.json());


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
  
  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);
    res.send('User deleted successfully');
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});