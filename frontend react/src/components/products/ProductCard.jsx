import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
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

  return (
    <div className="product-card" data-category={product.category} data-size={product.size} data-price={product.price}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
        />
        
        <div className="product-actions">
          <button 
            className="action-btn wishlist-btn"
            onClick={handleWishlistToggle}
            aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={`fas fa-heart ${isInWishlist(product.id) ? 'active' : ''}`}></i>
          </button>
          
          <button 
            className="action-btn quick-view-btn"
            aria-label="Quick view"
          >
            <i className="fas fa-eye"></i>
          </button>
        </div>

        {product.badge && (
          <div className={`product-badge ${product.badge.toLowerCase()}`}>
            {product.badge}
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        
        <div className="product-price">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">£{product.originalPrice}</span>
          )}
          <span className="current-price">£{product.price}</span>
        </div>

        <div className="product-colors">
          {product.colors && product.colors.map((color, index) => (
            <span 
              key={index} 
              className="color-option" 
              style={{ backgroundColor: color }}
              title={color}
            ></span>
          ))}
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <i className="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 