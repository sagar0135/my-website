import React, { useState } from 'react';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';
import { getProductsByCategory } from '../../services/productData';
import './CategoryPage.css';

const Jackets = () => {
  const [filters, setFilters] = useState({
    category: 'jackets',
    size: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

  const products = getProductsByCategory('jackets');

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'jackets',
      size: 'all',
      priceRange: 'all',
      sort: 'newest'
    });
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="container">
          <h1>Jackets</h1>
          <p>Outerwear for every season and style</p>
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

export default Jackets; 