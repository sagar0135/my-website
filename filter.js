/**
 * Product Filter System
 * This script handles filtering and sorting of product listings
 */

class ProductFilter {
  constructor() {
    this.productCards = document.querySelectorAll('.product-card');
    this.productGrid = document.querySelector('.product-grid');
    this.activeFiltersContainer = document.getElementById('active-filters');
    
    // Initialize filter elements
    this.filterToggleBtn = document.getElementById('filter-toggle-btn');
    this.filterOptions = document.querySelector('.filter-options');
    this.applyBtn = document.getElementById('apply-filters');
    this.resetBtn = document.getElementById('reset-filters');
    
    // Initialize filter values
    this.sortBySelect = document.getElementById('sort-by');
    this.categorySelect = document.getElementById('filter-category');
    this.minPriceInput = document.getElementById('min-price');
    this.maxPriceInput = document.getElementById('max-price');
    
    this.init();
  }
  
  init() {
    // Add data attributes to products if they don't exist
    this.setupProductData();
    
    // Setup event listeners
    this.setupEventListeners();
  }
  
  setupProductData() {
    this.productCards.forEach((card, index) => {
      // For demo purposes, assign random attributes if they don't exist
      if (!card.dataset.category) {
        const categories = ['tshirts', 'shirts', 'jackets', 'hoodies', 'pants', 'shorts', 'accessories'];
        card.dataset.category = categories[index % categories.length];
      }
      
      if (!card.dataset.price) {
        // Extract price from the card
        const priceEl = card.querySelector('.current-price');
        if (priceEl) {
          const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
          card.dataset.price = price;
        } else {
          card.dataset.price = Math.floor(Math.random() * 200) + 50;
        }
      }
      
      if (!card.dataset.size) {
        const sizes = ['s', 'm', 'l', 'xl', 'xxl'];
        const availableSizes = [];
        for (let i = 0; i < 3; i++) {
          availableSizes.push(sizes[Math.floor(Math.random() * sizes.length)]);
        }
        card.dataset.size = [...new Set(availableSizes)].join(',');
      }
      
      if (!card.dataset.color) {
        const colors = ['black', 'white', 'blue', 'red', 'green', 'yellow', 'brown', 'grey', 'navy', 'beige'];
        card.dataset.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      if (!card.dataset.rating) {
        const ratingEl = card.querySelector('.product-rating span');
        if (ratingEl) {
          const ratingText = ratingEl.textContent.replace(/[()]/g, '');
          card.dataset.rating = parseInt(ratingText);
        } else {
          card.dataset.rating = Math.floor(Math.random() * 100) + 10;
        }
      }
    });
  }
  
  setupEventListeners() {
    // Toggle filter options on mobile
    if (this.filterToggleBtn) {
      this.filterToggleBtn.addEventListener('click', () => {
        this.filterOptions.classList.toggle('show');
      });
    }
    
    // Apply filters button
    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', () => {
        this.applyFilters();
      });
    }
    
    // Reset filters button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
  }
  
  applyFilters() {
    // Add loading state
    this.productGrid.classList.add('filter-loading');
    
    // Get filter values
    const sortBy = this.sortBySelect.value;
    const category = this.categorySelect.value;
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => el.value);
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(el => el.value);
    const minPrice = this.minPriceInput.value ? parseFloat(this.minPriceInput.value) : 0;
    const maxPrice = this.maxPriceInput.value ? parseFloat(this.maxPriceInput.value) : 1000;
    
    // Show all products initially
    this.productCards.forEach(product => {
      product.style.display = 'block';
    });
    
    // Filter by category
    if (category !== 'all') {
      this.productCards.forEach(product => {
        if (product.dataset.category !== category) {
          product.style.display = 'none';
        }
      });
    }
    
    // Filter by size
    if (selectedSizes.length > 0) {
      this.productCards.forEach(product => {
        if (product.style.display !== 'none') {
          const productSizes = product.dataset.size.split(',');
          const hasMatchingSize = selectedSizes.some(size => productSizes.includes(size));
          if (!hasMatchingSize) {
            product.style.display = 'none';
          }
        }
      });
    }
    
    // Filter by color
    if (selectedColors.length > 0) {
      this.productCards.forEach(product => {
        if (product.style.display !== 'none') {
          const productColor = product.dataset.color;
          if (!selectedColors.includes(productColor)) {
            product.style.display = 'none';
          }
        }
      });
    }
    
    // Filter by price range
    this.productCards.forEach(product => {
      if (product.style.display !== 'none') {
        const productPrice = parseFloat(product.dataset.price);
        if (productPrice < minPrice || productPrice > maxPrice) {
          product.style.display = 'none';
        }
      }
    });
    
    // Sort products
    const visibleProducts = Array.from(this.productCards).filter(product => product.style.display !== 'none');
    
    visibleProducts.sort((a, b) => {
      if (sortBy === 'price-low') {
        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      } else if (sortBy === 'price-high') {
        return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
      } else if (sortBy === 'rating') {
        return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
      } else if (sortBy === 'bestselling') {
        return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
      }
      // Default to newest (no change in order)
      return 0;
    });
    
    // Reorder products in the DOM
    visibleProducts.forEach(product => {
      this.productGrid.appendChild(product);
    });
    
    // Show message if no products match filters
    if (visibleProducts.length === 0) {
      let noResultsMsg = document.querySelector('.no-results-message');
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
          <h3>No products match your filters</h3>
          <p>Try adjusting your filter criteria or <button id="clear-all-filters" class="btn-link">clear all filters</button></p>
        `;
        this.productGrid.appendChild(noResultsMsg);
        
        document.getElementById('clear-all-filters').addEventListener('click', () => {
          this.resetFilters();
        });
      }
    } else {
      const noResultsMsg = document.querySelector('.no-results-message');
      if (noResultsMsg) {
        noResultsMsg.remove();
      }
    }
    
    // Update active filters display
    this.updateActiveFilters(category, selectedSizes, selectedColors, minPrice, maxPrice);
    
    // Remove loading state after a short delay
    setTimeout(() => {
      this.productGrid.classList.remove('filter-loading');
    }, 500);
  }
  
  resetFilters() {
    // Reset all form elements
    this.sortBySelect.value = 'newest';
    this.categorySelect.value = 'all';
    this.minPriceInput.value = '';
    this.maxPriceInput.value = '';
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Show all products
    this.productCards.forEach(product => {
      product.style.display = 'block';
    });
    
    // Clear active filters
    this.activeFiltersContainer.innerHTML = '';
  }
  
  updateActiveFilters(category, selectedSizes, selectedColors, minPrice, maxPrice) 
    // Clear existing filters
    this.activeFiltersContainer.innerHTML = '';
    
    // Add category filter
    if (category !== 'all') 
      const filterEl = document.createElement('div');
      filterEl.className = 'active-filter';
      filterEl.innerHTML = `
        <span>${category}</span>
        <span class="remove-filter" data-filter="category" data-value="${category}">x</span>
        

