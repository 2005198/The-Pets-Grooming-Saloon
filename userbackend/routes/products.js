import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, petType } = req.query;
        let filter = {};
        
        if (category) {
            filter.category = category;
        }
        
        if (petType) {
            filter.petType = { $in: [petType, 'All'] };
        }

        const products = await Product.find(filter);
        res.json({ products });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get products by category (must come before /:id route)
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json({ products });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
