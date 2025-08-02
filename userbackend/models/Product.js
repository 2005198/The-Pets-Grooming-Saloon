import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Toys', 'Food', 'Accessories', 'Health', 'Grooming Tools', 'Clothing']
    },
    petType: {
        type: [String],
        enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'All'],
        default: ['All']
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    stockQuantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);
