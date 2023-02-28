import express from 'express';
import morgan from 'morgan';
import path from 'path';
import products from './data/products.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
 
dotenv.config();

const app = express();

connectDB();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
};

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running!")
});

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})

app.use(notFound);

app.use(errorHandler);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || 'development'
app.listen(5000, console.log(`server is running in port: ${port} and ${mode} mode`));