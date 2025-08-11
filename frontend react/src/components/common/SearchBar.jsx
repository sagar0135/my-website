import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { performSearch } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
      navigate('/search');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-input-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for items, brands, styles..."
          aria-label="Search products"
        />
        <button type="submit" aria-label="Search">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 