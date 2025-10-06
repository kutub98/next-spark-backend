import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

// Connect to MongoDB only if DATABASE_URL is available
if (config.database_url) {
  mongoose
    .connect(config.database_url as string)
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
    });
} else {
  console.log('No DATABASE_URL provided, skipping database connection');
}

// Start server
const PORT = config.port || 5000;
if (!process.env.VERCEL) {
  // 👈 only run locally
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}



// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Export the app for Vercel
export default app;