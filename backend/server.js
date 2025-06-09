import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/lib/db.js';
import authRoutes from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL, // نطاق العميل
    credentials: true, // السماح بإرسال الكوكيز
}));
app.use(cookieParser()); // لتمكين تحليل الكوكيز
app.use(express.json()); // لتمكين تحليل JSON في الطلبات

app.use('/api/auth', authRoutes);

// Global error handler - MUST be after all routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message: message,
    // Optionally, include stack in development
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});