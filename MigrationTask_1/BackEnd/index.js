// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const cors = require('cors')

const app = express();
const port = 8080;

//Middleware

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mern-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const initialProducts = [
  { name: 'Product 1', price: 10, description: 'Description 1', image: 'image1.jpg' },
  { name: 'Product 2', price: 20, description: 'Description 2', image: 'image2.jpg' },
  { name: 'Product 3', price: 30, description: 'Description 3', image: 'image3.jpg' },
  { name: 'Product 4', price: 40, description: 'Description 4', image: 'image4.jpg' },
];

Product.insertMany(initialProducts)
  .then(() => console.log('Initial products added'))
  .catch(err => console.error(err));

// Define a GET route to fetch all products
app.get('/api/products', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(500).json({ error: 'Failed to fetch products' }));
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});