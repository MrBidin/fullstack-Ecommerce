import { addOrderItems } from "../controllers/orderController.js";
import express from "express";
import Order from '../models/orderModels.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);

export default router;

