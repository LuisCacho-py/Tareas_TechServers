import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('intentando conectar db...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/alumnos_db');
    console.log('db ok');
  } catch (error) {
    console.log('db fail');
    console.error(error);
    process.exit(1);
  }
};