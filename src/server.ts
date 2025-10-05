import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

// Connect to MongoDB once (lazy)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  if (config.database_url) {
    try {
      await mongoose.connect(config.database_url);
      isConnected = true;
      console.log('✅ Database connected');
    } catch (err) {
      console.error('❌ DB connection failed:', err);
    }
  }
}

// Only run local server
if (process.env.NODE_ENV !== 'production') {
  const PORT = config.port || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`),
  );
}

export { app, connectDB }; // export both for serverless
