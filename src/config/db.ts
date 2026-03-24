import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crud-challenge'
    );
    console.log('db ok');
  } catch (error) {
    console.log('db fail');
    console.error(error);
    process.exit(1);
  }
};