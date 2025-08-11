import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isMobileMenuOpen }) => {
  return (
    <nav className={`nav-bar ${isMobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
      <div className="nav-container">
        <ul className="main-nav">
          <li className="nav-item">
            <Link to="/t-shirts" className="nav-link">T-SHIRTS</Link>
          </li>
          <li className="nav-item">
            <Link to="/shirts" className="nav-link">SHIRTS</Link>
          </li>
          <li className="nav-item">
            <Link to="/bottomwear" className="nav-link">BOTTOMWEAR</Link>
          </li>
          <li className="nav-item">
            <Link to="/jackets" className="nav-link">JACKETS</Link>
          </li>
          <li className="nav-item">
            <Link to="/footwear" className="nav-link">FOOTWEAR</Link>
          </li>
          <li className="nav-item">
            <Link to="/accessories" className="nav-link">ACCESSORIES</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 