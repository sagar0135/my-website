import React, { useState } from 'react';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';
import { getProductsByCategory } from '../../services/productData';
import './CategoryPage.css';

const Footwear = () => {
  const [filters, setFilters] = useState({
    category: 'footwear',
    size: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

  const products = getProductsByCategory('footwear');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'footwear',
      size: 'all',
      priceRange: 'all',
      sort: 'newest'
    });
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="container">
          <h1>Footwear</h1>
          <p>Step in style with our premium footwear collection</p>
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

export default Footwear; 