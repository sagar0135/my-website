import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, filters = {} }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply size filter
    if (filters.size && filters.size !== 'all') {
      filtered = filtered.filter(product => product.size === filters.size);
    }

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        switch (filters.priceRange) {
          case '0-25':
            return price <= 25;
          case '25-50':
            return price > 25 && price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100+':
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Apply sort
    if (filters.sort) {
      filtered.sort((a, b) => {
        switch (filters.sort) {
          case 'price-low':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price-high':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'newest':
            return new Date(b.dateAdded) - new Date(a.dateAdded);
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(filtered);
    setVisibleProducts(12); // Reset visible products when filters change
  }, [products, filters]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 12, filteredProducts.length));
      setLoading(false);
    }, 500);
  };

  const hasMoreProducts = visibleProducts < filteredProducts.length;

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMoreProducts && (
        <div className="load-more-container">
          <button 
            className="load-more-btn"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </button>
        </div>
      )}
      
      {filteredProducts.length === 0 && (
        <div className="no-products">
          <i className="fas fa-search"></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid; 