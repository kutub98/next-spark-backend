import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// Connect to MongoDB only if DATABASE_URL is available
if (config.database_url) {
  mongoose
    .connect(config.database_url as string)
    .then(() => console.log('✅ Database connected'))
    .catch((err) => console.error('❌ DB connection failed:', err));
} else {
  console.log('No DATABASE_URL provided, skipping database connection');
}

const PORT = config.port || 5000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on http://localhost:${PORT}`);
  });
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, exit the process to prevent hanging (not recommended for Vercel)
  // process.exit(1);
});

// Export the app for Vercel
export default app;
