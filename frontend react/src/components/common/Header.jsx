import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { wishlistCount, toggleWishlist } = useWishlist();

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
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" aria-label="MANVUE Homepage">
            <span className="logo-text">MANVUE</span>
          </Link>
        </div>
        
        <SearchBar />
        
        <div className="header-icons">
          <div className="header-icon-group">
            <button className="icon-btn" id="account-icon" title="Account" aria-label="Account">
              <i className="fas fa-user"></i>
              <span className="icon-label">Account</span>
            </button>
            
            <button 
              className="icon-btn" 
              id="wishlist-icon" 
              title="Wishlist" 
              aria-label="Wishlist"
              onClick={toggleWishlist}
            >
              <i className="fas fa-heart"></i>
              {wishlistCount > 0 && (
                <span className="wishlist-count" id="wishlist-count">{wishlistCount}</span>
              )}
              <span className="icon-label">Wishlist</span>
            </button>
            
            <button 
              className="icon-btn cart-icon" 
              id="cart-icon" 
              title="Cart" 
              aria-label="Shopping Cart"
              onClick={toggleCart}
            >
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && (
                <span className="cart-count" id="cart-count">{cartCount}</span>
              )}
              <span className="icon-label">Cart</span>
            </button>
          </div>
          
          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-toggle" 
            id="mobile-menu-toggle" 
            aria-label="Toggle mobile menu"
            onClick={handleMobileMenuToggle}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
      
      <Navigation isMobileMenuOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header; 