import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Premium Pet Grooming Services</h1>
            <p>Your pet deserves the best care. Professional grooming services with love and attention to detail.</p>
            <div className="hero-buttons">
              {user ? (
                <Link to="/appointments" className="cta-button primary">
                  Book Appointment
                </Link>
              ) : (
                <Link to="/register" className="cta-button primary">
                  Get Started
                </Link>
              )}
              <Link to="/shop" className="cta-button secondary">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop" alt="Happy pets" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">✂️</div>
              <h3>Hair Grooming</h3>
              <p>Professional hair cutting and styling for all breeds</p>
              <span className="price">$50</span>
            </div>
            <div className="service-card">
              <div className="service-icon">💅</div>
              <h3>Nail Trimming</h3>
              <p>Safe and gentle nail clipping service</p>
              <span className="price">$15</span>
            </div>
            <div className="service-card">
              <div className="service-icon">🛁</div>
              <h3>Bath & Dry</h3>
              <p>Relaxing bath with premium shampoos</p>
              <span className="price">$30</span>
            </div>
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3>Full Grooming</h3>
              <p>Complete grooming package with all services</p>
              <span className="price">$80</span>
            </div>
            <div className="service-card">
              <div className="service-icon">🦷</div>
              <h3>Dental Care</h3>
              <p>Professional teeth cleaning and oral care</p>
              <span className="price">$40</span>
            </div>
            <div className="service-card">
              <div className="service-icon">🧼</div>
              <h3>Flea Treatment</h3>
              <p>Effective flea and tick prevention treatment</p>
              <span className="price">$35</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🏆</div>
              <h3>Expert Groomers</h3>
              <p>Certified professionals with years of experience</p>
            </div>
            <div className="feature">
              <div className="feature-icon">❤️</div>
              <h3>Pet-Friendly Environment</h3>
              <p>Calm and comfortable atmosphere for your pets</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Simple online appointment scheduling system</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛍️</div>
              <h3>Quality Products</h3>
              <p>Premium pet care products available in our shop</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Pamper Your Pet?</h2>
            <p>Join thousands of happy pet owners who trust us with their furry friends.</p>
            {user ? (
              <Link to="/appointments" className="cta-button large">
                Book Your Appointment Now
              </Link>
            ) : (
              <Link to="/register" className="cta-button large">
                Create Your Account
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
