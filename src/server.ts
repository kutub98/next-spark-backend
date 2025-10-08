import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

if (config.database_url) {
  mongoose
    .connect(config.database_url as string)
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((err) => {
      console.error('Failed to connect to database:', err);
      // Optionally, allow the app to continue running without DB
    });
} else {
  console.log('No DATABASE_URL provided, skipping database connection');
}

export default app;

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Optionally, exit the process or handle gracefully
});
