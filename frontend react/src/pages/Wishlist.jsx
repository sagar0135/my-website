import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <i className="fas fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Start adding items you love to your wishlist!</p>
            <Link to="/" className="btn">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{items.length} item{items.length !== 1 ? 's' : ''} in your wishlist</p>
        </div>

        <div className="wishlist-grid">
          {items.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                <button 
                  className="remove-wishlist"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-size">Size: {item.size?.toUpperCase()}</p>
                <div className="item-price">
                  <span className="price">£{item.price}</span>
                </div>
                
                <div className="item-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>
                  <Link to={`/product/${item.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist; 