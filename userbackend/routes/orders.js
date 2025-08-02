import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create a new order
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        
        // Calculate total amount and validate products
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ 
                    message: `Product with ID ${item.productId} not found` 
                });
            }

            if (!product.inStock || product.stockQuantity < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for ${product.name}` 
                });
            }

            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;

            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });
        }

        const order = new Order({
            userId: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await order.save();
        await order.populate('items.productId', 'name image');

        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Server error during order creation' });
    }
});

// Get user's orders
router.get('/my-orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('items.productId', 'name image')
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get order by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user._id
        }).populate('items.productId', 'name image');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ order });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({
            message: 'Order status updated',
            order
        });
    } catch (error) {
        console.error('Update order error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
