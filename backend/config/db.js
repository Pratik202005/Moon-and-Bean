import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moon_and_bean_db';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✓ Connected successfully to MongoDB (moon_and_bean_db)`);
  } catch (error) {
    console.warn(`✕ MongoDB Connection Notice: ${error.message}`);
    console.warn(`  To enable live database sync, set MONGODB_URI in backend/.env`);
  }
};

export default connectDB;
