# Pet Grooming Salon - Full-Stack Application

A comprehensive pet grooming salon management system built with React (TypeScript) frontend and Node.js backend. This application provides complete functionality for pet owners to book grooming appointments, shop for pet products, and manage their orders.

## Features

### Authentication System
- User registration with pet information
- Secure login/logout with JWT tokens
- Protected routes and user sessions
- User profile management

### Appointment Booking
- Interactive appointment scheduling
- Time slot management
- Service selection (Basic Grooming, Full Grooming, Nail Trimming, etc.)
- View and manage previous appointments
- Real-time availability checking

### Pet Product Shop
- Browse products by category (Food, Toys, Accessories, Health)
- Filter by pet type (Dogs, Cats, Birds, Fish)
- Product search functionality
- Product images and detailed descriptions
- Add to cart functionality

### Shopping Cart and Checkout
- Add/remove items from cart
- Quantity management
- Order summary and total calculation
- Secure checkout process
- Payment method selection
- Order history tracking

### User Dashboard
- Personal profile management
- Pet information updates
- View appointment history
- Track order status
- Account settings

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for development and building
- React Router DOM for navigation
- Axios for API communication
- CSS3 with modern styling
- Responsive Design for all devices

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- RESTful API architecture

### Database
- MongoDB collections:
  - Users (with pet information)
  - Products (with categories and images)
  - Appointments (with time slots)
  - Orders (with items and status)

## Project Structure

```
The-Pet-Grooming-Saloon/
├── frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Appointments.tsx
│   │   │   └── Profile.tsx
│   │   ├── context/           # React context
│   │   │   └── AuthContext.tsx
│   │   ├── utils/             # Utilities
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.ts
├── userbackend/                # Node.js backend
│   ├── models/                # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Appointment.js
│   │   └── Order.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── appointments.js
│   │   └── orders.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── uploads/               # File uploads
│   ├── server.js             # Main server file
│   ├── seedProducts.js       # Database seeding
│   ├── package.json
│   └── .env
├── package.json              # Main package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd The-Pet-Grooming-Saloon
```

2. Install main dependencies
```bash
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

4. Install backend dependencies
```bash
cd userbackend
npm install
cd ..
```

5. Configure environment variables

Create a `.env` file in the `userbackend` directory:
```env
URI=mongodb://localhost:27017/pet-grooming-salon
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
PORT=5000
```

6. Seed the database with sample products
```bash
cd userbackend
node seedProducts.js
cd ..
```

### Running the Application

#### Development Mode

1. Start the backend server
```bash
cd userbackend
npm start
```
The backend server will run on `http://localhost:5000`

2. Start the frontend development server (in a new terminal)
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

#### Production Mode

1. Build the frontend
```bash
cd frontend
npm run build
cd ..
```

2. Start the production server
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments/book` - Book new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get single order

## Configuration

### Vite Proxy Configuration
The frontend is configured to proxy API requests to the backend:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### Database Seeding
Sample products are automatically seeded when you run:
```bash
cd userbackend
node seedProducts.js
```

This includes:
- Dog/Cat food products
- Pet toys and accessories
- Health and grooming products
- Product images and categories

## Styling and UI

- Modern CSS3 with flexbox and grid layouts
- Responsive design for mobile, tablet, and desktop
- Custom color scheme with purple/blue gradient theme
- Interactive elements with hover effects and transitions
- Form validation and error handling
- Loading states and user feedback

## Security Features

- JWT token authentication with expiration
- Password hashing using bcryptjs
- Protected routes on both frontend and backend
- Input validation and sanitization
- CORS configuration for cross-origin requests
- Environment variables for sensitive data

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables in your hosting platform
URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
PORT=5000
```

## Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd userbackend
npm test
```

## Usage Examples

### User Registration
```javascript
const registerData = {
  username: "petlover123",
  email: "user@example.com",
  password: "securepassword",
  phone: "123-456-7890",
  petName: "Buddy",
  petType: "Dog",
  petBreed: "Golden Retriever",
  address: "123 Pet Street, City, State"
};
```

### Booking Appointment
```javascript
const appointmentData = {
  service: "Full Grooming",
  date: "2025-08-15",
  time: "10:00 AM",
  petName: "Buddy",
  specialRequests: "Please be gentle, first time grooming"
};
```

### Adding to Cart
```javascript
const cartItem = {
  productId: "product_id_here",
  quantity: 2,
  price: 29.99
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

- GitHub Copilot - AI Programming Assistant
- Development Team - Full-stack implementation

## Acknowledgments

- React and Node.js communities
- MongoDB for database solutions
- Vite for modern build tooling
- Open source libraries and contributors
- LLMs for debugging errors 
