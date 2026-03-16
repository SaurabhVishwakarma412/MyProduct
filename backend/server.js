// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Simple Product Schema
// const ProductSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
//   image: String,
//   category: String,
//   stock: Number
// });

// const Product = mongoose.model('Product', ProductSchema);

// // Add some sample products
// app.get('/api/seed', async (req, res) => {
//   const sampleProducts = [
//     { name: 'Laptop', price: 999, description: 'High performance laptop', category: 'Electronics', stock: 10 },
//     { name: 'T-Shirt', price: 25, description: 'Cotton t-shirt', category: 'Clothing', stock: 50 },
//     { name: 'Book', price: 15, description: 'JavaScript Guide', category: 'Books', stock: 100 },
//   ];
  
//   await Product.deleteMany({});
//   await Product.insertMany(sampleProducts);
//   res.json({ message: 'Database seeded!' });
// });

// // API Routes
// app.get('/api/products', async (req, res) => {
//   const products = await Product.find();
//   res.json(products);
// });

// app.listen(5000, () => console.log('Server running on port 5000'));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authroutes');

const app = express();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Your frontend URLs
  credentials: true
}));

// Mount routers
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});