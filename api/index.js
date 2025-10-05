import { app, connectDB } from '../dist/server';

// Lazy DB connect for serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Export only once for Vercel serverless
export default app;
