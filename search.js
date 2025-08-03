/**
 * MANVUE - Advanced Search Functionality
 * Enhanced search with modern features and performance optimizations
 * Market-ready search experience similar to powerlook.in
 */

class SearchManager {
  constructor() {
    this.searchIndex = new Map();
    this.searchHistory = this.loadSearchHistory();
    this.suggestions = [];
    this.currentQuery = '';
    this.searchTimeout = null;
    this.isSearching = false;
    this.searchResults = [];
    this.filters = {};
    this.sortBy = 'relevance';
    
    this.init();
  }

  init() {
    this.buildSearchIndex();
    this.initSearchInput();
    this.initSearchFilters();
    this.initSearchSorting();
    this.initSearchHistory();
    this.initVoiceSearch();
    this.initImageSearch();
    this.initAdvancedSearch();
    this.initSearchAnalytics();
  }

  // Build search index for fast lookups
  buildSearchIndex() {
    // Mock product data - in real app, this would come from an API
    const products = [
      {
        id: 'prod1',
        name: 'Premium Linen Shirt',
        category: 'shirts',
        brand: 'MANVUE',
        price: 49.99,
        tags: ['premium', 'linen', 'shirt', 'casual', 'formal'],
        description: 'High-quality linen shirt perfect for any occasion',
        colors: ['white', 'blue', 'black'],
        sizes: ['S', 'M', 'L', 'XL'],
        image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'prod2',
        name: 'Slim Fit Jeans',
        category: 'jeans',
        brand: 'MANVUE',
        price: 59.99,
        tags: ['slim', 'fit', 'jeans', 'denim', 'casual'],
        description: 'Comfortable slim fit jeans with stretch denim',
        colors: ['blue', 'black', 'grey'],
        sizes: ['30', '32', '34', '36'],
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'prod3',
        name: 'Classic White T-Shirt',
        category: 't-shirts',
        brand: 'MANVUE',
        price: 24.99,
        tags: ['classic', 'white', 't-shirt', 'basic', 'cotton'],
        description: 'Essential white t-shirt made from premium cotton',
        colors: ['white', 'black', 'grey'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'prod4',
        name: 'Leather Jacket',
        category: 'jackets',
        brand: 'MANVUE',
        price: 199.99,
        tags: ['leather', 'jacket', 'premium', 'stylish', 'winter'],
        description: 'Premium leather jacket for a sophisticated look',
        colors: ['black', 'brown'],
        sizes: ['S', 'M', 'L', 'XL'],
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      },
      {
        id: 'prod5',
        name: 'Casual Sneakers',
        category: 'footwear',
        brand: 'MANVUE',
        price: 79.99,
        tags: ['sneakers', 'casual', 'comfortable', 'stylish'],
        description: 'Comfortable casual sneakers for everyday wear',
        colors: ['white', 'black', 'grey'],
        sizes: ['7', '8', '9', '10', '11'],
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
      }
    ];

    // Build search index
    products.forEach(product => {
      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.description,
        ...product.tags,
        ...product.colors
      ].join(' ').toLowerCase();

      // Create search tokens
      const tokens = this.tokenize(searchableText);
      
      tokens.forEach(token => {
        if (!this.searchIndex.has(token)) {
          this.searchIndex.set(token, []);
        }
        this.searchIndex.get(token).push(product.id);
      });

      // Store product data
      this.searchIndex.set(product.id, product);
    });
  }

  // Tokenize search text
  tokenize(text) {
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter(token => token.length > 2)
      .map(token => token.replace(/[^a-z0-9]/g, ''));
  }

  // Search input functionality
  initSearchInput() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (searchInput) {
      // Debounced search
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        this.currentQuery = query;
        
        clearTimeout(this.searchTimeout);
        
        if (query.length >= 2) {
          this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
          }, 300);
        } else {
          this.hideSearchResults();
          this.hideSuggestions();
        }
      });

      // Handle keyboard navigation
      searchInput.addEventListener('keydown', (e) => {
        this.handleSearchKeyboard(e);
      });

      // Handle focus/blur
      searchInput.addEventListener('focus', () => {
        if (this.currentQuery.length >= 2) {
          this.showSuggestions();
        }
      });

      searchInput.addEventListener('blur', () => {
        setTimeout(() => {
          this.hideSuggestions();
        }, 200);
      });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.hideSearchResults();
        this.hideSuggestions();
      }
    });
  }

  // Perform search
  performSearch(query) {
    if (this.isSearching) return;
    
    this.isSearching = true;
    this.showSearchLoading();

    // Simulate API delay
    setTimeout(() => {
      const results = this.searchProducts(query);
      this.displaySearchResults(results, query);
      this.addToSearchHistory(query);
      this.isSearching = false;
      this.hideSearchLoading();
    }, 200);
  }

  // Search products using index
  searchProducts(query) {
    const tokens = this.tokenize(query);
    const productScores = new Map();

    tokens.forEach(token => {
      const matchingProducts = this.searchIndex.get(token) || [];
      
      matchingProducts.forEach(productId => {
        if (typeof productId === 'string') {
          const currentScore = productScores.get(productId) || 0;
          productScores.set(productId, currentScore + 1);
        }
      });
    });

    // Convert scores to results
    const results = [];
    productScores.forEach((score, productId) => {
      const product = this.searchIndex.get(productId);
      if (product && typeof product === 'object') {
        results.push({
          ...product,
          relevanceScore: score
        });
      }
    });

    // Sort by relevance score
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return results;
  }

  // Display search results
  displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    this.searchResults = results;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-result-item no-results">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h3>No results found</h3>
          <p>We couldn't find any products matching "${query}"</p>
          <div class="search-suggestions">
            <p>Try:</p>
            <ul>
              <li>Checking your spelling</li>
              <li>Using more general keywords</li>
              <li>Using fewer keywords</li>
            </ul>
          </div>
        </div>
      `;
    } else {
      const resultsHTML = results.map(product => `
        <div class="search-result-item" data-product-id="${product.id}">
          <div class="search-result-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="search-result-info">
            <h3 class="search-result-title">${product.name}</h3>
            <p class="search-result-brand">${product.brand}</p>
            <p class="search-result-description">${product.description}</p>
            <div class="search-result-meta">
              <span class="search-result-price">£${product.price}</span>
              <span class="search-result-category">${product.category}</span>
            </div>
            <div class="search-result-actions">
              <button class="quick-add-btn" title="Quick Add to Cart">
                <i class="fas fa-shopping-cart"></i>
              </button>
              <button class="wishlist-btn" title="Add to Wishlist">
                <i class="far fa-heart"></i>
              </button>
              <button class="quick-view-btn" title="Quick View">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');

      searchResults.innerHTML = `
        <div class="search-results-header">
          <h3>${results.length} results for "${query}"</h3>
          <div class="search-results-actions">
            <button class="view-all-btn">View All Results</button>
          </div>
        </div>
        <div class="search-results-grid">
          ${resultsHTML}
        </div>
      `;

      // Add event listeners to result items
      this.addSearchResultListeners();
    }

    searchResults.classList.add('active');
  }

  // Add event listeners to search results
  addSearchResultListeners() {
    const resultItems = document.querySelectorAll('.search-result-item');
    
    resultItems.forEach(item => {
      const productId = item.dataset.productId;
      const product = this.searchResults.find(p => p.id === productId);
      
      if (product) {
        // Quick add to cart
        const quickAddBtn = item.querySelector('.quick-add-btn');
        if (quickAddBtn) {
          quickAddBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleQuickAdd(product);
          });
        }

        // Wishlist toggle
        const wishlistBtn = item.querySelector('.wishlist-btn');
        if (wishlistBtn) {
          wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleWishlistToggle(product, wishlistBtn);
          });
        }

        // Quick view
        const quickViewBtn = item.querySelector('.quick-view-btn');
        if (quickViewBtn) {
          quickViewBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleQuickView(product);
          });
        }

        // Item click
        item.addEventListener('click', () => {
          this.handleProductClick(product);
        });
      }
    });
  }

  // Handle quick add
  handleQuickAdd(product) {
    if (window.productManager) {
      window.productManager.addToCart(product, 1);
    }
  }

  // Handle wishlist toggle
  handleWishlistToggle(product, btn) {
    if (window.productManager) {
      if (window.productManager.isInWishlist(product.id)) {
        window.productManager.removeFromWishlist(product.id);
        btn.innerHTML = '<i class="far fa-heart"></i>';
        btn.classList.remove('active');
      } else {
        window.productManager.addToWishlist(product);
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        btn.classList.add('active');
      }
    }
  }

  // Handle quick view
  handleQuickView(product) {
    if (window.manvueApp) {
      window.manvueApp.openModal('quick-view-modal');
      // Populate modal with product data
      this.populateQuickViewModal(product);
    }
  }

  // Handle product click
  handleProductClick(product) {
    // Add to recently viewed
    if (window.productManager) {
      window.productManager.addToRecentlyViewed(product);
    }
    
    // Navigate to product page
    window.location.href = `/product/${product.id}`;
  }

  // Populate quick view modal
  populateQuickViewModal(product) {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    modal.querySelector('.product-title').textContent = product.name;
    modal.querySelector('.product-price').textContent = `£${product.price}`;
    modal.querySelector('.product-image').src = product.image;
    modal.querySelector('.product-description').textContent = product.description;
  }

  // Search filters
  initSearchFilters() {
    const filterContainer = document.querySelector('.search-filters');
    if (!filterContainer) return;

    // Category filter
    const categoryFilter = filterContainer.querySelector('.category-filter');
    if (categoryFilter) {
      categoryFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.applyFilters();
      });
    }

    // Price filter
    const priceFilter = filterContainer.querySelector('.price-filter');
    if (priceFilter) {
      priceFilter.addEventListener('change', (e) => {
        this.filters.priceRange = e.target.value;
        this.applyFilters();
      });
    }

    // Brand filter
    const brandFilter = filterContainer.querySelector('.brand-filter');
    if (brandFilter) {
      brandFilter.addEventListener('change', (e) => {
        this.filters.brand = e.target.value;
        this.applyFilters();
      });
    }

    // Color filter
    const colorFilters = filterContainer.querySelectorAll('.color-filter input');
    colorFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateColorFilter();
        this.applyFilters();
      });
    });
  }

  // Update color filter
  updateColorFilter() {
    const colorFilters = document.querySelectorAll('.color-filter input:checked');
    this.filters.colors = Array.from(colorFilters).map(filter => filter.value);
  }

  // Apply filters to search results
  applyFilters() {
    if (this.searchResults.length === 0) return;

    let filteredResults = [...this.searchResults];

    // Apply category filter
    if (this.filters.category && this.filters.category !== 'all') {
      filteredResults = filteredResults.filter(product => 
        product.category === this.filters.category
      );
    }

    // Apply price range filter
    if (this.filters.priceRange) {
      const [min, max] = this.filters.priceRange.split('-').map(Number);
      filteredResults = filteredResults.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Apply brand filter
    if (this.filters.brand && this.filters.brand !== 'all') {
      filteredResults = filteredResults.filter(product => 
        product.brand === this.filters.brand
      );
    }

    // Apply color filter
    if (this.filters.colors && this.filters.colors.length > 0) {
      filteredResults = filteredResults.filter(product => 
        product.colors.some(color => this.filters.colors.includes(color))
      );
    }

    this.displayFilteredResults(filteredResults);
  }

  // Display filtered results
  displayFilteredResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-result-item no-results">
          <h3>No results match your filters</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      `;
    } else {
      // Re-render results with filtered data
      this.displaySearchResults(results, this.currentQuery);
    }
  }

  // Search sorting
  initSearchSorting() {
    const sortSelect = document.querySelector('.search-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.sortSearchResults();
      });
    }
  }

  // Sort search results
  sortSearchResults() {
    if (this.searchResults.length === 0) return;

    let sortedResults = [...this.searchResults];

    switch (this.sortBy) {
      case 'price-low':
        sortedResults.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedResults.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        sortedResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
    }

    this.displaySearchResults(sortedResults, this.currentQuery);
  }

  // Search history
  initSearchHistory() {
    const searchHistory = document.querySelector('.search-history');
    if (searchHistory) {
      this.displaySearchHistory();
    }
  }

  // Load search history
  loadSearchHistory() {
    try {
      return JSON.parse(localStorage.getItem('manvue-search-history')) || [];
    } catch (error) {
      console.error('Error loading search history:', error);
      return [];
    }
  }

  // Save search history
  saveSearchHistory() {
    try {
      localStorage.setItem('manvue-search-history', JSON.stringify(this.searchHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }

  // Add to search history
  addToSearchHistory(query) {
    if (query.length < 2) return;

    // Remove existing entry
    this.searchHistory = this.searchHistory.filter(item => item.query !== query);
    
    // Add to beginning
    this.searchHistory.unshift({
      query: query,
      timestamp: new Date().toISOString()
    });

    // Keep only last 10 searches
    this.searchHistory = this.searchHistory.slice(0, 10);
    this.saveSearchHistory();
  }

  // Display search history
  displaySearchHistory() {
    const searchHistory = document.querySelector('.search-history');
    if (!searchHistory || this.searchHistory.length === 0) return;

    const historyHTML = this.searchHistory.map(item => `
      <div class="history-item" data-query="${item.query}">
        <i class="fas fa-history"></i>
        <span>${item.query}</span>
        <button class="remove-history" title="Remove from history">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    searchHistory.innerHTML = `
      <div class="history-header">
        <h4>Recent Searches</h4>
        <button class="clear-history">Clear All</button>
      </div>
      <div class="history-list">
        ${historyHTML}
      </div>
    `;

    // Add event listeners
    this.addHistoryListeners();
  }

  // Add history listeners
  addHistoryListeners() {
    const historyItems = document.querySelectorAll('.history-item');
    const clearHistoryBtn = document.querySelector('.clear-history');

    historyItems.forEach(item => {
      const query = item.dataset.query;
      
      // History item click
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.remove-history')) {
          this.performSearch(query);
          document.getElementById('search-input').value = query;
        }
      });

      // Remove history item
      const removeBtn = item.querySelector('.remove-history');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeFromHistory(query);
        });
      }
    });

    // Clear all history
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', () => {
        this.clearSearchHistory();
      });
    }
  }

  // Remove from history
  removeFromHistory(query) {
    this.searchHistory = this.searchHistory.filter(item => item.query !== query);
    this.saveSearchHistory();
    this.displaySearchHistory();
  }

  // Clear search history
  clearSearchHistory() {
    this.searchHistory = [];
    this.saveSearchHistory();
    this.displaySearchHistory();
  }

  // Voice search
  initVoiceSearch() {
    const voiceSearchBtn = document.querySelector('.voice-search-btn');
    if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
      voiceSearchBtn.addEventListener('click', () => {
        this.startVoiceSearch();
      });
    }
  }

  // Start voice search
  startVoiceSearch() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      this.showNotification('Listening... Speak now', 'info');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = transcript;
        this.performSearch(transcript);
      }
    };

    recognition.onerror = (event) => {
      this.showNotification('Voice search error. Please try again.', 'error');
    };

    recognition.onend = () => {
      this.showNotification('Voice search ended', 'info');
    };

    recognition.start();
  }

  // Image search
  initImageSearch() {
    const imageSearchBtn = document.querySelector('.image-search-btn');
    if (imageSearchBtn) {
      imageSearchBtn.addEventListener('click', () => {
        this.startImageSearch();
      });
    }
  }

  // Start image search
  startImageSearch() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.processImageSearch(file);
      }
    };
    
    input.click();
  }

  // Process image search
  processImageSearch(file) {
    // Simulate image analysis
    this.showNotification('Analyzing image...', 'info');
    
    setTimeout(() => {
      // Mock image search results
      const mockResults = [
        { id: 'img1', name: 'Similar Shirt Found', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
        { id: 'img2', name: 'Matching Style', price: 39.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
      ];
      
      this.displaySearchResults(mockResults, 'image search');
      this.showNotification('Found similar products!', 'success');
    }, 2000);
  }

  // Advanced search
  initAdvancedSearch() {
    const advancedSearchBtn = document.querySelector('.advanced-search-btn');
    if (advancedSearchBtn) {
      advancedSearchBtn.addEventListener('click', () => {
        this.toggleAdvancedSearch();
      });
    }
  }

  // Toggle advanced search
  toggleAdvancedSearch() {
    const advancedSearch = document.querySelector('.advanced-search');
    if (advancedSearch) {
      advancedSearch.classList.toggle('active');
    }
  }

  // Search analytics
  initSearchAnalytics() {
    // Track search performance
    this.searchMetrics = {
      totalSearches: 0,
      successfulSearches: 0,
      averageResults: 0,
      popularQueries: new Map()
    };
  }

  // Track search metrics
  trackSearch(query, results) {
    this.searchMetrics.totalSearches++;
    
    if (results.length > 0) {
      this.searchMetrics.successfulSearches++;
    }
    
    this.searchMetrics.averageResults = 
      (this.searchMetrics.averageResults * (this.searchMetrics.totalSearches - 1) + results.length) / 
      this.searchMetrics.totalSearches;
    
    // Track popular queries
    const currentCount = this.searchMetrics.popularQueries.get(query) || 0;
    this.searchMetrics.popularQueries.set(query, currentCount + 1);
  }

  // Keyboard navigation
  handleSearchKeyboard(e) {
    const suggestions = document.querySelectorAll('.search-suggestion');
    const currentIndex = Array.from(suggestions).findIndex(s => s.classList.contains('selected'));
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.navigateSuggestions(currentIndex + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.navigateSuggestions(currentIndex - 1);
        break;
      case 'Enter':
        e.preventDefault();
        this.selectSuggestion();
        break;
      case 'Escape':
        this.hideSearchResults();
        this.hideSuggestions();
        break;
    }
  }

  // Navigate suggestions
  navigateSuggestions(index) {
    const suggestions = document.querySelectorAll('.search-suggestion');
    suggestions.forEach(s => s.classList.remove('selected'));
    
    if (index >= 0 && index < suggestions.length) {
      suggestions[index].classList.add('selected');
    }
  }

  // Select suggestion
  selectSuggestion() {
    const selectedSuggestion = document.querySelector('.search-suggestion.selected');
    if (selectedSuggestion) {
      const query = selectedSuggestion.dataset.query;
      document.getElementById('search-input').value = query;
      this.performSearch(query);
      this.hideSuggestions();
    }
  }

  // Show/hide search results
  hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.classList.remove('active');
    }
  }

  // Show/hide suggestions
  showSuggestions() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
      searchSuggestions.classList.add('active');
    }
  }

  hideSuggestions() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
      searchSuggestions.classList.remove('active');
    }
  }

  // Show/hide loading
  showSearchLoading() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.innerHTML = `
        <div class="search-loading">
          <div class="loading-spinner"></div>
          <p>Searching...</p>
        </div>
      `;
      searchResults.classList.add('active');
    }
  }

  hideSearchLoading() {
    const loadingElement = document.querySelector('.search-loading');
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  // Notification system
  showNotification(message, type = 'info') {
    if (window.manvueApp && window.manvueApp.showNotification) {
      window.manvueApp.showNotification(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }
}

// Initialize Search Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.searchManager = new SearchManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchManager;
}