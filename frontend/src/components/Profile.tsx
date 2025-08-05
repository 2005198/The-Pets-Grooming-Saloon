import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Profile.css';

interface Order {
  _id: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: string;
  createdAt: string;
  shippingAddress: string;
  paymentMethod: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/my-orders');
      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#FF9800';
      case 'Processing': return '#2196F3';
      case 'Shipped': return '#9C27B0';
      case 'Delivered': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      default: return '#666';
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error">Please log in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <div className="user-avatar">
            <span>{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="user-details">
            <h1>Welcome, {user.username}!</h1>
            <p>Manage your account and view your orders</p>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-info">
            <div className="info-card">
              <h2>Personal Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Username:</span>
                  <span className="value">{user.username}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone:</span>
                  <span className="value">{user.phone || 'Not provided'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Address:</span>
                  <span className="value">{user.address || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h2>Pet Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Pet Name:</span>
                  <span className="value">{user.petName}</span>
                </div>
                <div className="info-item">
                  <span className="label">Pet Type:</span>
                  <span className="value">{user.petType}</span>
                </div>
                <div className="info-item">
                  <span className="label">Pet Breed:</span>
                  <span className="value">{user.petBreed || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Order History</h2>
            {loading ? (
              <div className="loading">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="no-orders">
                <div className="no-orders-icon">📦</div>
                <h3>No orders yet</h3>
                <p>When you place orders, they will appear here.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        Order #{order._id.slice(-8)}
                      </div>
                      <div 
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </div>
                    </div>

                    <div className="order-info">
                      <div className="order-date">
                        <strong>Date:</strong> {formatDate(order.createdAt)}
                      </div>
                      <div className="order-total">
                        <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
                      </div>
                      <div className="payment-method">
                        <strong>Payment:</strong> {order.paymentMethod}
                      </div>
                    </div>

                    <div className="order-items">
                      <h4>Items:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="shipping-address">
                      <strong>Shipping Address:</strong>
                      <p>{order.shippingAddress}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
