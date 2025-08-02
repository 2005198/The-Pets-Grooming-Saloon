import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

const api = express();

// Middleware
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Health check endpoint
api.get('/api/health', (req, res) => {
    res.json({ message: 'Pet Grooming Saloon API is running!' });
});

// Test route
api.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});

// MongoDB connection
mongoose.connect(URI)
.then(() => {
    console.log("CONNECTED TO DATABASE");
})
.catch((err) => { 
    console.error("Database connection error:", err);
});

// Start server
api.listen(PORT, () => {
    console.log(`Pet Grooming Saloon Server is running on port ${PORT}!`);
});

console.log('Server file loaded successfully');
