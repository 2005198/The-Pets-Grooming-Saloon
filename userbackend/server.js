import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import appointmentRoutes from './routes/appointments.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//accessing values from env variable 
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

//creating express_app 
const api = express();

// Middleware
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Static files for product images
api.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
api.use('/api/auth', authRoutes);
api.use('/api/appointments', appointmentRoutes);
api.use('/api/products', productRoutes);
api.use('/api/orders', orderRoutes);

// Health check endpoint
api.get('/api/health', (req, res) => {
    res.json({ message: 'Pet Grooming Saloon API is running!' });
});

//connection string for mongodb 
mongoose.connect(URI)
.then(() => {
    console.log("CONNECTED TO DATABASE");
})
.catch((err) => { console.error("Database connection error:", err) });

// Serve frontend static files
api.use(express.static(path.join(__dirname, "../frontend/dist")));

// Simple fallback for SPA routes (commented out if causing issues)
// api.use((req, res, next) => {
//     // If it's not an API route and the file doesn't exist, serve index.html
//     if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//     } else {
//         next();
//     }
// });

//PORT 
api.listen(PORT, () => {
    console.log(`Pet Grooming Saloon Server is running on port ${PORT}!`);
});