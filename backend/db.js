import mongoose from 'mongoose';

export default async function connectDB() {
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017/chocoworld';
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}


