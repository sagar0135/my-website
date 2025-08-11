import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import './header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="container">
          <p>Free shipping on orders over £49 | New arrivals every week</p>
          <button className="close-banner" aria-label="Close banner">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>MANVUE</h1>
          </Link>
          
          {/* Navigation */}
          <Navigation 
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={handleMobileMenuToggle}
          />
          
          {/* Search Bar */}
          <SearchBar />
          
          {/* Header Actions */}
          <div className="header-actions">
            <button className="action-btn" aria-label="Wishlist">
              <i className="fas fa-heart"></i>
            </button>
            
            <button 
              className="action-btn cart-btn" 
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>
            
            <button className="action-btn" aria-label="Account">
              <i className="fas fa-user"></i>
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 