import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from "./data/users.js";
import products from "./data/products.js";
import User from './models/userModels.js';
import Product from './models/productModels.js';
import Order from './models/orderModels.js';
import connectDB from "./config/db.js";

dotenv.config()
connectDB();


const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(p => ({ ...p, user: adminUser}));

    await Product.insertMany(sampleProducts);
    console.log('data inserted!');
    process.exit();
  } catch (error) {
    console.error(`message: ${error.message}`);
    process.exit(1)
  }
};

const destroyedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('data destroyed');
    process.exit();
  } catch (error) {
    console.error(`message: ${error.message}`);
    process.exit(1)
  }
};

if(process.argv[2] === '-d'){
  destroyedData()
} else {
  importData()
};
