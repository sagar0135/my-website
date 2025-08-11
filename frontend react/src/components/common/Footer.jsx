import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ABOUT US</h3>
            <p>MANVUE is a premium men's fashion brand dedicated to providing high-quality, stylish clothing for the modern man.</p>
          </div>
          <div className="footer-section">
            <h3>QUICK LINKS</h3>
            <ul>
              <li><Link to="/t-shirts">T-Shirts</Link></li>
              <li><Link to="/shirts">Shirts</Link></li>
              <li><Link to="/jackets">Jackets</Link></li>
              <li><Link to="/footwear">Footwear</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>CONTACT</h3>
            <p>Email: info@manvue.com</p>
            <p>Phone: +44 123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MANVUE. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 