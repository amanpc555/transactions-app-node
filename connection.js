import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

connectDB();


export { connectDB, mongoose };
