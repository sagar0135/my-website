import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && agreed) {
      alert('Thank you for subscribing!');
      setEmail('');
      setAgreed(false);
    }
  };

  return (
    <section className="newsletter-section" aria-label="Newsletter Signup">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>STAY IN THE LOOP</h2>
            <p>Subscribe for exclusive offers, new arrivals, and style inspiration</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <span>SUBSCRIBE</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <div className="form-footer">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span className="checkmark"></span>
                I agree to receive marketing communications from MANVUE
              </label>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 