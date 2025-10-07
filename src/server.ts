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

if (config.database_url) {
  mongoose
    .connect(config.database_url)
    .then(() => console.log('✅ Database connected'))
    .catch((err) => console.error('❌ DB connection failed:', err));
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
});

// Export the app for Vercel
export default app;
