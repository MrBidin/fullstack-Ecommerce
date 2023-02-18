import asyncHandler from 'express-async-handler';
import Product from '../models/productModels.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products)
});

const getProductById = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id)
  if(product) {
    res.json(product);
  } else {
    throw new Error('Product not found') 
  }
});

export { getProducts, getProductById }