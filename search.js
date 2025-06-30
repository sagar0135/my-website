/**
 * 
 * MANVUE Search Functionality
 * Handles product search across the entire site
 */

// Product database - this would typically come from a backend API
// For now, we'll create a sample database of products
const productDatabase = [
  {
    id: 1,
    name: "Premium Linen Shirt",
    price: 49.99,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "shirts.html"
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    category: "Bottomwear",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "bottomwear.html"
  },
  {
    id: 3,
    name: "Oversized Streetwear Hoodie",
    price: 69.99,
    category: "Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "StreetStyle.html"
  },
  {
    id: 4,
    name: "Urban Bomber Jacket",
    price: 89.99,
    category: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "jackets.html"
  },
  {
    id: 5,
    name: "Classic White T-Shirt",
    price: 24.99,
    category: "T-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "t-shirts.html"
  },
  {
    id: 6,
    name: "Formal Oxford Shirt",
    price: 54.99,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "shirts.html"
  },
  {
    id: 7,
    name: "Cargo Pants",
    price: 64.99,
    category: "Bottomwear",
    image: "https://images.unsplash.com/photo-1552331704-0c6e30a62f9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "bottomwear.html"
  },
  {
    id: 8,
    name: "Men's Linen Beach Shirt",
    price: 44.99,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1565462905097-5e701c31dcdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "WeekendWarrior.html"
  }
];

// Initialize search functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
});

function initializeSearch() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');
  
  // Search when button is clicked
  searchButton.addEventListener('click', function() {
    performSearch(searchInput.value);
  });
  
  // Search when Enter key is pressed
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      performSearch(searchInput.value);
    } else if (searchInput.value.length >= 2) {
      // Show live results as user types (if at least 2 characters)
      performSearch(searchInput.value, true);
    } else if (searchInput.value.length === 0) {
      // Hide results if search is cleared
      searchResults.classList.remove('active');
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !searchButton.contains(event.target) && !searchResults.contains(event.target)) {
      searchResults.classList.remove('active');
    }
  });
  
  // Focus search input when clicking on search bar container
  const searchBar = document.querySelector('.search-bar');
  searchBar.addEventListener('click', function(event) {
    if (event.target === searchBar) {
      searchInput.focus();
    }
  });
}

function performSearch(query, isLiveSearch = false) {
  const searchResults = document.getElementById('search-results');
  
  // Don't search if query is too short
  if (query.trim().length < 2) {
    searchResults.classList.remove('active');
    return;
  }
  
  // Filter products based on search query
  const filteredProducts = productDatabase.filter(product => {
    const searchTerms = query.toLowerCase().trim().split(' ');
    const productName = product.name.toLowerCase();
    const productCategory = product.category.toLowerCase();
    
    // Check if any search term is in the product name or category
    return searchTerms.some(term => 
      productName.includes(term) || productCategory.includes(term)
    );
  });
  
  // Display search results
  displaySearchResults(filteredProducts, query, isLiveSearch);
}

function displaySearchResults(products, query, isLiveSearch) {
  const searchResults = document.getElementById('search-results');
  
  // Clear previous results
  searchResults.innerHTML = '';
  
  // Show results container
  searchResults.classList.add('active');
  
  // Limit number of results for live search
  const displayProducts = isLiveSearch ? products.slice(0, 5) : products;
  
  if (displayProducts.length === 0) {
    // No results found
    searchResults.innerHTML = `
      <div class="no-results">
        No products found matching "${query}"
      </div>
    `;
    return;
  }
  
  // Create result items
  displayProducts.forEach(product => {
    const resultItem = document.createElement('a');
    resultItem.href = product.url;
    resultItem.className = 'search-result-item';
    resultItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="search-result-image">
      <div class="search-result-info">
        <div class="search-result-title">${product.name}</div>
        <div class="search-result-price">£${product.price.toFixed(2)}</div>
        <div class="search-result-category">${product.category}</div>
      </div>
    `;
    searchResults.appendChild(resultItem);
  });
  
  // Add "View all results" link if there are more results or if it's live search
  if (isLiveSearch && products.length > 5) {
    const viewAllLink = document.createElement('a');
    viewAllLink.href = `search-results.html?q=${encodeURIComponent(query)}`;
    viewAllLink.className = 'search-all-results';
    viewAllLink.textContent = `View all ${products.length} results`;
    searchResults.appendChild(viewAllLink);
  }
  
  // If not live search and there are results, redirect to search results page
  if (!isLiveSearch && products.length > 0) {
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
  }
}

// Function to load more products (for future expansion)
function loadMoreProducts() {
  // This would typically fetch more products from an API
  // For now, we'll just use our existing database
  return Promise.resolve(productDatabase);
}

// Export functions for use in other scripts
window.MANVUE = window.MANVUE || {};
window.MANVUE.search = {
  performSearch,
  loadMoreProducts
};