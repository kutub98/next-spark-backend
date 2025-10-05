import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

if (config.database_url) {
  mongoose
    .connect(config.database_url as string)
    .then(() => console.log('✅ Database connected'))
    .catch((err) => console.error('❌ DB connection failed:', err));
}

// Only run the server locally, not in Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = config.port || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
