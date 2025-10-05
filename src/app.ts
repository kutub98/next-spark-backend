/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import express, { Application } from 'express';

import mongoose from 'mongoose';
import config from './app/config';

const app: Application = express();

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  if (!config.database_url) return;

  try {
    await mongoose.connect(config.database_url);
    isConnected = true;
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
    throw err;
  }
}

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = config.port || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`),
  );
}

export default app;
