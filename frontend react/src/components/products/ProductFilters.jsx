import React, { useState } from 'react';
import './ProductFilters.css';

const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className="product-filters">
      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-toggle">
        <button 
          className="filter-toggle-btn"
          onClick={toggleMobileFilters}
        >
          <i className="fas fa-filter"></i>
          Filters
          <span className="filter-count">
            {Object.values(filters).filter(v => v && v !== 'all').length}
          </span>
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`filters-panel ${isMobileFiltersOpen ? 'open' : ''}`}>
        <div className="filters-header">
          <h3>Filters</h3>
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            Clear All
          </button>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select 
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="t-shirts">T-Shirts</option>
            <option value="shirts">Shirts</option>
            <option value="jackets">Jackets</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="footwear">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="filter-group">
          <label className="filter-label">Size</label>
          <select 
            value={filters.size || 'all'}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Sizes</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
            <option value="xxl">XXL</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <select 
            value={filters.priceRange || 'all'}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="0-25">Under £25</option>
            <option value="25-50">£25 - £50</option>
            <option value="50-100">£50 - £100</option>
            <option value="100+">Over £100</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label className="filter-label">Sort By</label>
          <select 
            value={filters.sort || 'newest'}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {Object.values(filters).some(v => v && v !== 'all') && (
          <div className="active-filters">
            <h4>Active Filters:</h4>
            <div className="active-filter-tags">
              {filters.category && filters.category !== 'all' && (
                <span className="filter-tag">
                  Category: {filters.category}
                  <button 
                    onClick={() => handleFilterChange('category', 'all')}
                    className="remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.size && filters.size !== 'all' && (
                <span className="filter-tag">
                  Size: {filters.size.toUpperCase()}
                  <button 
                    onClick={() => handleFilterChange('size', 'all')}
                    className="remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.priceRange && filters.priceRange !== 'all' && (
                <span className="filter-tag">
                  Price: {filters.priceRange}
                  <button 
                    onClick={() => handleFilterChange('priceRange', 'all')}
                    className="remove-filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {isMobileFiltersOpen && (
        <div 
          className="mobile-overlay"
          onClick={toggleMobileFilters}
        ></div>
      )}
    </div>
  );
};

export default ProductFilters; 