import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`app ok en http://localhost:${PORT}`);
  });
};

start();