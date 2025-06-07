import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});