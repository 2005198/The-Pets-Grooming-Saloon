import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const sampleProducts = [
    // Toys
    {
        name: "Interactive Dog Ball",
        description: "A smart ball that lights up and makes sounds to keep your dog entertained for hours.",
        price: 25.99,
        category: "Toys",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
        inStock: true,
        stockQuantity: 50
    },
    {
        name: "Cat Feather Wand",
        description: "Interactive feather toy perfect for engaging your cat's hunting instincts.",
        price: 12.99,
        category: "Toys",
        petType: ["Cat"],
        image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400",
        inStock: true,
        stockQuantity: 75
    },
    {
        name: "Rope Chew Toy",
        description: "Durable rope toy perfect for aggressive chewers. Helps clean teeth naturally.",
        price: 8.99,
        category: "Toys",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
        inStock: true,
        stockQuantity: 100
    },
    
    // Food
    {
        name: "Premium Dog Food",
        description: "High-quality dry food with real chicken and vegetables. 15kg bag.",
        price: 45.99,
        category: "Food",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400",
        inStock: true,
        stockQuantity: 30
    },
    {
        name: "Gourmet Cat Food",
        description: "Premium wet food with salmon and tuna. Pack of 12 cans.",
        price: 24.99,
        category: "Food",
        petType: ["Cat"],
        image: "https://images.unsplash.com/photo-1571199570553-54047b4198db?w=400",
        inStock: true,
        stockQuantity: 40
    },
    
    // Accessories
    {
        name: "Leather Dog Collar",
        description: "Genuine leather collar with adjustable buckle and name tag ring.",
        price: 18.99,
        category: "Accessories",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=400",
        inStock: true,
        stockQuantity: 60
    },
    {
        name: "Cat Scratching Post",
        description: "Multi-level scratching post with sisal rope and cozy perches.",
        price: 89.99,
        category: "Accessories",
        petType: ["Cat"],
        image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400",
        inStock: true,
        stockQuantity: 15
    },
    {
        name: "Pet Carrier Bag",
        description: "Comfortable and secure carrier bag suitable for small to medium pets.",
        price: 35.99,
        category: "Accessories",
        petType: ["All"],
        image: "https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=400",
        inStock: true,
        stockQuantity: 25
    },
    
    // Health
    {
        name: "Flea & Tick Prevention",
        description: "Monthly flea and tick prevention treatment for dogs.",
        price: 32.99,
        category: "Health",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=400",
        inStock: true,
        stockQuantity: 45
    },
    {
        name: "Dental Chews",
        description: "Veterinarian-recommended dental chews for better oral health.",
        price: 16.99,
        category: "Health",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400",
        inStock: true,
        stockQuantity: 80
    },
    
    // Grooming Tools
    {
        name: "Professional Dog Brush",
        description: "High-quality slicker brush for removing loose fur and preventing matting.",
        price: 22.99,
        category: "Grooming Tools",
        petType: ["Dog", "Cat"],
        image: "https://images.unsplash.com/photo-1616190301228-99eca29d1e7e?w=400",
        inStock: true,
        stockQuantity: 35
    },
    {
        name: "Pet Nail Clippers",
        description: "Safe and easy-to-use nail clippers with safety guard.",
        price: 14.99,
        category: "Grooming Tools",
        petType: ["All"],
        image: "https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=400",
        inStock: true,
        stockQuantity: 55
    },
    
    // Clothing
    {
        name: "Winter Dog Coat",
        description: "Warm and waterproof coat to keep your dog comfortable in cold weather.",
        price: 42.99,
        category: "Clothing",
        petType: ["Dog"],
        image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
        inStock: true,
        stockQuantity: 20
    },
    {
        name: "Cute Cat Bow Tie",
        description: "Adorable bow tie collar accessory perfect for special occasions.",
        price: 9.99,
        category: "Clothing",
        petType: ["Cat"],
        image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
        inStock: true,
        stockQuantity: 65
    }
];

async function seedProducts() {
    try {
        await mongoose.connect(process.env.URI);
        console.log('Connected to database');
        
        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');
        
        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log('Sample products inserted successfully');
        
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
