import express from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = 4898;

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Express API',
    },
    servers: [
      {
        url: 'http://localhost:4898',
      },
    ],
  },
  apis: ['./index.js'], // Path to the API docs


};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

// GHGHKJKL;L;

  let shops = [
    { id: 1, name: 'Saulytė', address: "Saulučių g.15" },
    { id: 2, name: 'Mėnulis', address: "Mėnulio g.15"},
    { id: 3, name: 'Žvaigždutė', address: "Žvaigždžių g.15" }
  ];

  app.use(express.json());


// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to our planet!');
});

app.get('/shops', (req, res) => {
  try {
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/shops/:id', (req, res) => {

  try {
    const shopId = parseInt(req.params.id);
    
    // Find the product in the products array by ID
    const shop = shops.find(shop => shop.id === shopId);
    
    if (!shops) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(shop);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/shops', (req, res) => {
  try {
    const { name, address } = req.body;

    // Create a new product object
    const newShop = { id: shops.length + 1, name, address };
    
    // Add the product to the products array
    shops.push(newShop);

    res.status(201).json(newShop);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/shops/:id', (req, res) => {
  try {
    const shopId = parseInt(req.params.id);
    const { name, address} = req.body;

    // Find the index of the product in the products array by ID
    const index = shops.findIndex(shops => shops.id === shopId);

    if (index === -1) {
    
      res.status(404).json("nothing to update"); 
    } else {
      // Product exists, update it
      shops[index] = { ...shops[index], name, address };
      res.json(shops[index]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/shops/:id', (req, res) => {
  try {
    const shopId = parseInt(req.params.id);
    
    // Find the index of the product in the products array by ID
    const index = shops.findIndex(shops => shops.id === shopId);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Remove the product from the products array
    shops.splice(index, 1);

    res.status(204).json({ message: 'Shop  deleted successfully' });

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