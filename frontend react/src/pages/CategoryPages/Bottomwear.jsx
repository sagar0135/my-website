import React, { useState } from 'react';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';
import { getProductsByCategory } from '../../services/productData';
import './CategoryPage.css';

const Bottomwear = () => {
  const [filters, setFilters] = useState({
    category: 'bottomwear',
    size: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

  const products = getProductsByCategory('bottomwear');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'bottomwear',
      size: 'all',
      priceRange: 'all',
      sort: 'newest'
    });
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="container">
          <h1>Bottomwear</h1>
          <p>Comfort and style in every pair</p>
          <div className="page-stats">
            <span>{products.length} Products</span>
            <span>Free Shipping</span>
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="category-content">
          <aside className="filters-sidebar">
            <ProductFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>
          
          <main className="products-main">
            <ProductGrid products={products} filters={filters} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Bottomwear; 