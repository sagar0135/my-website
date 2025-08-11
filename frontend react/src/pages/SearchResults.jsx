import React, { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import './SearchResults.css';

const SearchResults = () => {
  const { query, results } = useSearch();
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    priceRange: 'all',
    sort: 'newest'
  });

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
    <div className="search-results-page">
      <div className="page-header">
        <div className="container">
          <h1>Search Results</h1>
          <p>Showing results for "{query}"</p>
          <div className="page-stats">
            <span>{results.length} Products Found</span>
            <span>Free Shipping</span>
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>

      <div className="container">
        {results.length > 0 ? (
          <div className="category-content">
            <aside className="filters-sidebar">
              <ProductFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </aside>
            
            <main className="products-main">
              <ProductGrid products={results} filters={filters} />
            </main>
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <i className="fas fa-search"></i>
              <h2>No products found</h2>
              <p>We couldn't find any products matching "{query}"</p>
              <div className="suggestions">
                <h3>Suggestions:</h3>
                <ul>
                  <li>Check your spelling</li>
                  <li>Try more general keywords</li>
                  <li>Try fewer keywords</li>
                  <li>Browse our categories instead</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults; 