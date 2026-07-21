import connectDB from '../db.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';

await connectDB();
await Product.syncIndexes();
console.log('Indexes synced');
await mongoose.disconnect();