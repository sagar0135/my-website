/**
 * ProductFilter class to handle product filtering functionality
 */
class ProductFilter {
  constructor() {
    // Filter elements
    this.filterToggleBtn = document.getElementById('filter-toggle-btn');
    this.filterOptions = document.querySelector('.filter-options');
    this.sortBySelect = document.getElementById('sort-by');
    this.categorySelect = document.getElementById('filter-category');
    this.sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    this.colorCheckboxes = document.querySelectorAll('input[name="color"]');
    this.minPriceInput = document.getElementById('min-price');
    this.maxPriceInput = document.getElementById('max-price');
    this.applyFiltersBtn = document.getElementById('apply-filters');
    this.resetFiltersBtn = document.getElementById('reset-filters');
    this.activeFiltersContainer = document.getElementById('active-filters');
    
    // Product elements
    this.productCards = document.querySelectorAll('.product-card');
    
    // Initialize
    this.init();
  }
  
  init() {
    // Add data attributes to products if they don't already have them
    this.setupProductAttributes();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize active filters
    this.activeFilters = {
      category: 'all',
      sizes: [],
      colors: [],
      minPrice: null,
      maxPrice: null,
      sortBy: 'newest'
    };
  }
  
  setupProductAttributes() {
    this.productCards.forEach((card, index) => {
      // Set default categories if not already set
      if (!card.dataset.category) {
        const categories = ['tshirts', 'shirts', 'jackets', 'hoodies', 'pants', 'shorts', 'accessories'];
        card.dataset.category = categories[index % categories.length];
      }
      
      // Set default price if not already set
      if (!card.dataset.price) {
        const priceEl = card.querySelector('.current-price');
        if (priceEl) {
          const price = parseFloat(priceEl.textContent.replace(/[^0-9.]/g, ''));
          card.dataset.price = price;
        }
      }
      
      // Set default sizes if not already set
      if (!card.dataset.sizes) {
        const sizes = ['s', 'm', 'l', 'xl'];
        card.dataset.sizes = sizes.slice(0, Math.floor(Math.random() * sizes.length) + 1).join(',');
      }
      
      // Set default colors if not already set
      if (!card.dataset.colors) {
        const colors = ['black', 'white', 'blue', 'red', 'green', 'grey'];
        card.dataset.colors = colors.slice(0, Math.floor(Math.random() * 3) + 1).join(',');
      }
      
      // Set default rating if not already set
      if (!card.dataset.rating) {
        card.dataset.rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
      }
    });
  }
  
  setupEventListeners() {
    // Toggle filter options on mobile
    if (this.filterToggleBtn) {
      this.filterToggleBtn.addEventListener('click', () => {
        this.filterOptions.classList.toggle('active');
      });
    }
    
    // Apply filters button
    if (this.applyFiltersBtn) {
      this.applyFiltersBtn.addEventListener('click', () => {
        this.applyFilters();
      });
    }
    
    // Reset filters button
    if (this.resetFiltersBtn) {
      this.resetFiltersBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }
    
    // Sort by change
    if (this.sortBySelect) {
      this.sortBySelect.addEventListener('change', () => {
        this.activeFilters.sortBy = this.sortBySelect.value;
        this.applyFilters();
      });
    }
  }
  
  applyFilters() {
    // Update active filters
    this.updateActiveFilters();
    
    // Apply filters to products
    this.filterProducts();
    
    // Display active filters
    this.displayActiveFilters();
  }
  
  updateActiveFilters() {
    // Update category filter
    if (this.categorySelect) {
      this.activeFilters.category = this.categorySelect.value;
    }
    
    // Update size filters
    this.activeFilters.sizes = [];
    this.sizeCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        this.activeFilters.sizes.push(checkbox.value);
      }
    });
    
    // Update color filters
    this.activeFilters.colors = [];
    this.colorCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        this.activeFilters.colors.push(checkbox.value);
      }
    });
    
    // Update price range
    this.activeFilters.minPrice = this.minPriceInput.value ? parseFloat(this.minPriceInput.value) : null;
    this.activeFilters.maxPrice = this.maxPriceInput.value ? parseFloat(this.maxPriceInput.value) : null;
    
    // Update sort by
    this.activeFilters.sortBy = this.sortBySelect.value;
  }
  
  filterProducts() {
    // First filter products
    this.productCards.forEach(card => {
      let visible = true;
      
      // Filter by category
      if (this.activeFilters.category !== 'all' && card.dataset.category !== this.activeFilters.category) {
        visible = false;
      }
      
      // Filter by size
      if (this.activeFilters.sizes.length > 0) {
        const productSizes = card.dataset.sizes.split(',');
        if (!this.activeFilters.sizes.some(size => productSizes.includes(size))) {
          visible = false;
        }
      }
      
      // Filter by color
      if (this.activeFilters.colors.length > 0) {
        const productColors = card.dataset.colors.split(',');
        if (!this.activeFilters.colors.some(color => productColors.includes(color))) {
          visible = false;
        }
      }
      
      // Filter by price
      const price = parseFloat(card.dataset.price);
      if (this.activeFilters.minPrice !== null && price < this.activeFilters.minPrice) {
        visible = false;
      }
      if (this.activeFilters.maxPrice !== null && price > this.activeFilters.maxPrice) {
        visible = false;
      }
      
      // Set visibility
      card.style.display = visible ? 'block' : 'none';
    });
    
    // Then sort visible products
    this.sortProducts();
  }
  
  sortProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    const visibleProducts = Array.from(this.productCards).filter(card => card.style.display !== 'none');
    
    // Sort products based on selected option
    switch (this.activeFilters.sortBy) {
      case 'price-low':
        visibleProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        break;
      case 'price-high':
        visibleProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        break;
      case 'rating':
        visibleProducts.sort((a, b) => parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating));
        break;
      case 'bestselling':
        // For demo purposes, we'll use a random sort for bestselling
        visibleProducts.sort(() => Math.random() - 0.5);
        break;
      case 'newest':
      default:
        // For demo purposes, we'll keep the original order for newest
        break;
    }
    
    // Reorder products in the DOM
    visibleProducts.forEach(product => {
      productGrid.appendChild(product);
    });
  }
  
  displayActiveFilters() {
    if (!this.activeFiltersContainer) return;
    
    // Clear current active filters
    this.activeFiltersContainer.innerHTML = '';
    
    // Add category filter if not 'all'
    if (this.activeFilters.category !== 'all') {
      this.addActiveFilterTag('Category', this.activeFilters.category);
    }
    
    // Add size filters
    this.activeFilters.sizes.forEach(size => {
      this.addActiveFilterTag('Size', size.toUpperCase());
    });
    
    // Add color filters
    this.activeFilters.colors.forEach(color => {
      this.addActiveFilterTag('Color', color.charAt(0).toUpperCase() + color.slice(1));
    });
    
    // Add price range filter
    if (this.activeFilters.minPrice !== null || this.activeFilters.maxPrice !== null) {
      let priceText = 'Price: ';
      if (this.activeFilters.minPrice !== null) {
        priceText += `£${this.activeFilters.minPrice}`;
      }
      if (this.activeFilters.minPrice !== null && this.activeFilters.maxPrice !== null) {
        priceText += ' - ';
      }
      if (this.activeFilters.maxPrice !== null) {
        priceText += `£${this.activeFilters.maxPrice}`;
      }
      this.addActiveFilterTag('', priceText);
    }
  }
  
  addActiveFilterTag(type, value) {
    const filterTag = document.createElement('div');
    filterTag.className = 'active-filter';
    
    let displayText = type ? `${type}: ${value}` : value;
    
    filterTag.innerHTML = `
      ${displayText}
      <span class="remove-filter" data-type="${type.toLowerCase()}" data-value="${value.toLowerCase()}">
        <i class="fas fa-times"></i>
      </span>
    `;
    
    // Add click event to remove filter
    const removeBtn = filterTag.querySelector('.remove-filter');
    removeBtn.addEventListener('click', () => {
      this.removeFilter(type.toLowerCase(), value.toLowerCase());
    });
    
    this.activeFiltersContainer.appendChild(filterTag);
  }
  
  removeFilter(type, value) {
    switch (type) {
      case 'category':
        if (this.categorySelect) {
          this.categorySelect.value = 'all';
        }
        break;
      case 'size':
        this.sizeCheckboxes.forEach(checkbox => {
          if (checkbox.value === value) {
            checkbox.checked = false;
          }
        });
        break;
      case 'color':
        this.colorCheckboxes.forEach(checkbox => {
          if (checkbox.value === value) {
            checkbox.checked = false;
          }
        });
        break;
      case '': // Price filter
        this.minPriceInput.value = '';
        this.maxPriceInput.value = '';
        break;
    }
    
    // Re-apply filters
    this.applyFilters();
  }
  
  resetFilters() {
    // Reset category
    if (this.categorySelect) {
      this.categorySelect.value = 'all';
    }
    
    // Reset sizes
    this.sizeCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset colors
    this.colorCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price range
    if (this.minPriceInput) this.minPriceInput.value = '';
    if (this.maxPriceInput) this.maxPriceInput.value = '';
    
    // Reset sort by
    if (this.sortBySelect) {
      this.sortBySelect.value = 'newest';
    }
    
    // Apply reset filters
    this.applyFilters();
  }
}

// Initialize the filter when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with filters
  if (document.querySelector('.collection-filters')) {
    const productFilter = new ProductFilter();
  }
});


