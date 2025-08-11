import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCollection.css';

const FeaturedCollection = () => {
  return (
    <section className="featured-collection" aria-label="Featured Collection">
      <div className="container">
        <div className="featured-content">
          <div className="featured-text">
            <h2 className="featured-title">
              SUMMER
              <span className="featured-highlight">ESSENTIALS</span>
            </h2>
            <p className="featured-description">
              Discover our curated collection of lightweight, breathable pieces perfect for the summer heat. 
              Premium fabrics and contemporary cuts.
            </p>
            <Link to="/summer-collection" className="shop-now-btn featured">
              <span>SHOP THE COLLECTION</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="featured-image">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Summer Essentials Collection" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection; 