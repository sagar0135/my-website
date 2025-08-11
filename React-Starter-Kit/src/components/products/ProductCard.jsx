import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from '../modals/QuickViewModal';
import './products.css';

const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="product-card" data-category={product.category}>
      {product.badge && (
        <div className={`product-badge ${product.badge.type}`}>
          {product.badge.text}
        </div>
      )}
      
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className={`product-image ${isImageLoaded ? 'loaded' : ''}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
        
        {!isImageLoaded && (
          <div className="image-skeleton"></div>
        )}
        
        <div className="product-actions">
          <button 
            className="action-btn quick-view"
            onClick={handleQuickView}
            aria-label="Quick view"
            title="Quick view"
          >
            <i className="fas fa-eye"></i>
          </button>
          
          <button 
            className={`action-btn wishlist ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className="fas fa-heart"></i>
          </button>
          
          <button 
            className="action-btn quick-add"
            onClick={handleQuickAdd}
            aria-label="Quick add to cart"
            title="Quick add to cart"
          >
            <i className="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">£{product.originalPrice.toFixed(2)}</span>
          )}
          <span className="current-price">£{product.price.toFixed(2)}</span>
        </div>
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i}
                className={`fas fa-star ${i < product.rating ? 'filled' : ''}`}
              />
            ))}
          </div>
          <span className="rating-count">({product.reviewCount})</span>
        </div>
      </div>
      
      {isQuickViewOpen && (
        <QuickViewModal 
          product={product}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductCard; 