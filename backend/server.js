import express from 'express';
import products from './data/products.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

app.use('/api/v1/products', productRoutes);

app.get('/', (req, res) => {
  res.send("API is running!")
});

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || 'development'
app.listen(5000, console.log(`server is running in port: ${port} and ${mode} mode`));