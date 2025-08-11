import React, { useState } from 'react';
import ProductGrid from '../../components/products/ProductGrid';
import ProductFilters from '../../components/products/ProductFilters';
import { getAllProducts } from '../../services/productData';
import './CategoryPage.css';

const GymToStreet = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

  // Get all products for gym-to-street collection
  const allProducts = getAllProducts();
  const products = allProducts.filter(product => 
    product.category === 't-shirts' || 
    product.category === 'bottomwear' || 
    product.category === 'jackets'
  );

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      size: 'all',
      priceRange: 'all',
      sort: 'newest'
    });
  };

  return (
    <div className="category-page">
      <div className="page-header">
        <div className="container">
          <h1>Gym to Street</h1>
          <p>Versatile athletic wear that transitions seamlessly from workout to everyday</p>
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

export default GymToStreet; 