/**
 * MANVUE - Product Interactions
 * Enhanced product functionality with modern features
 * Market-ready product management similar to powerlook.in
 */

class ProductManager {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.recentlyViewed = this.loadRecentlyViewed();
    this.productCache = new Map();
    this.observers = [];
    
    this.init();
  }

  init() {
    this.initProductCards();
    this.initQuickView();
    this.initSizeSelector();
    this.initColorSelector();
    this.initQuantityControls();
    this.initAddToCart();
    this.initWishlist();
    this.initProductGallery();
    this.initProductReviews();
    this.initRelatedProducts();
    this.initProductComparison();
    this.initStockNotifications();
    this.initProductFilters();
    this.initSorting();
    this.initPagination();
  }

  // Cart Management
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem('manvue-cart')) || [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('manvue-cart', JSON.stringify(this.cart));
      this.updateCartUI();
      this.notifyObservers('cart-updated', this.cart);
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  addToCart(product, quantity = 1, size = null, color = null) {
    const existingItem = this.cart.find(item => 
      item.id === product.id && 
      item.size === size && 
      item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        color: color,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.saveCart();
    this.showNotification(`${product.name} added to cart`, 'success');
  }

  removeFromCart(productId, size = null, color = null) {
    this.cart = this.cart.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    );
    this.saveCart();
  }

  updateCartItemQuantity(productId, quantity, size = null, color = null) {
    const item = this.cart.find(item => 
      item.id === productId && 
      item.size === size && 
      item.color === color
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId, size, color);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Wishlist Management
  loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem('manvue-wishlist')) || [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem('manvue-wishlist', JSON.stringify(this.wishlist));
      this.updateWishlistUI();
      this.notifyObservers('wishlist-updated', this.wishlist);
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  }

  addToWishlist(product) {
    if (!this.wishlist.find(item => item.id === product.id)) {
      this.wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: new Date().toISOString()
      });
      this.saveWishlist();
      this.showNotification(`${product.name} added to wishlist`, 'success');
    }
  }

  removeFromWishlist(productId) {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.saveWishlist();
  }

  isInWishlist(productId) {
    return this.wishlist.some(item => item.id === productId);
  }

  // Recently Viewed Products
  loadRecentlyViewed() {
    try {
      return JSON.parse(localStorage.getItem('manvue-recently-viewed')) || [];
    } catch (error) {
      console.error('Error loading recently viewed:', error);
      return [];
    }
  }

  saveRecentlyViewed() {
    try {
      localStorage.setItem('manvue-recently-viewed', JSON.stringify(this.recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed:', error);
    }
  }

  addToRecentlyViewed(product) {
    // Remove if already exists
    this.recentlyViewed = this.recentlyViewed.filter(item => item.id !== product.id);
    
    // Add to beginning
    this.recentlyViewed.unshift({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      viewedAt: new Date().toISOString()
    });

    // Keep only last 10 items
    this.recentlyViewed = this.recentlyViewed.slice(0, 10);
    this.saveRecentlyViewed();
  }

  // Product Card Interactions
  initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      // Hover effects
      card.addEventListener('mouseenter', () => {
        this.handleProductCardHover(card, true);
      });

      card.addEventListener('mouseleave', () => {
        this.handleProductCardHover(card, false);
      });

      // Quick add to cart
      const quickAddBtn = card.querySelector('.quick-add-btn');
      if (quickAddBtn) {
        quickAddBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleQuickAdd(card);
        });
      }

      // Wishlist toggle
      const wishlistBtn = card.querySelector('.wishlist-btn');
      if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleWishlistToggle(card);
        });
      }

      // Quick view
      const quickViewBtn = card.querySelector('.quick-view-btn');
      if (quickViewBtn) {
        quickViewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleQuickView(card);
        });
      }

      // Product click
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.quick-add-btn, .wishlist-btn, .quick-view-btn')) {
          this.handleProductClick(card);
        }
      });
    });
  }

  handleProductCardHover(card, isHovering) {
    const image = card.querySelector('.product-image');
    const hoverImage = card.querySelector('.product-image-hover');
    const actions = card.querySelector('.product-actions');

    if (isHovering) {
      if (hoverImage) {
        image.style.opacity = '0';
        hoverImage.style.opacity = '1';
      }
      if (actions) {
        actions.classList.add('visible');
      }
    } else {
      if (hoverImage) {
        image.style.opacity = '1';
        hoverImage.style.opacity = '0';
      }
      if (actions) {
        actions.classList.remove('visible');
      }
    }
  }

  handleQuickAdd(card) {
    const product = this.getProductFromCard(card);
    if (product) {
      this.addToCart(product, 1);
    }
  }

  handleWishlistToggle(card) {
    const product = this.getProductFromCard(card);
    const wishlistBtn = card.querySelector('.wishlist-btn');
    
    if (product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id);
        wishlistBtn.classList.remove('active');
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
      } else {
        this.addToWishlist(product);
        wishlistBtn.classList.add('active');
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
      }
    }
  }

  handleQuickView(card) {
    const product = this.getProductFromCard(card);
    if (product) {
      this.openQuickViewModal(product);
    }
  }

  handleProductClick(card) {
    const product = this.getProductFromCard(card);
    if (product) {
      this.addToRecentlyViewed(product);
      // Navigate to product page
      window.location.href = `/product/${product.id}`;
    }
  }

  getProductFromCard(card) {
    const productId = card.dataset.productId;
    const productName = card.querySelector('.product-title')?.textContent;
    const productPrice = parseFloat(card.querySelector('.product-price')?.textContent.replace(/[^0-9.]/g, ''));
    const productImage = card.querySelector('.product-image')?.src;

    if (productId && productName && productPrice && productImage) {
      return {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      };
    }
    return null;
  }

  // Quick View Modal
  initQuickView() {
    // Quick view modal functionality is handled in the main script
  }

  openQuickViewModal(product) {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      // Populate modal with product data
      this.populateQuickViewModal(product);
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  populateQuickViewModal(product) {
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    // Update modal content with product data
    modal.querySelector('.product-title').textContent = product.name;
    modal.querySelector('.product-price').textContent = `£${product.price}`;
    modal.querySelector('.product-image').src = product.image;
    modal.querySelector('.product-image').alt = product.name;

    // Set up size and color selectors
    this.setupQuickViewSelectors(modal, product);
  }

  setupQuickViewSelectors(modal, product) {
    // Size selector
    const sizeSelector = modal.querySelector('.size-selector');
    if (sizeSelector) {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      sizeSelector.innerHTML = sizes.map(size => 
        `<button class="size-option" data-size="${size}">${size}</button>`
      ).join('');

      sizeSelector.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeSelector.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    }

    // Color selector
    const colorSelector = modal.querySelector('.color-selector');
    if (colorSelector) {
      const colors = ['Black', 'White', 'Navy', 'Grey'];
      colorSelector.innerHTML = colors.map(color => 
        `<button class="color-option" data-color="${color}" style="background-color: ${color.toLowerCase()}"></button>`
      ).join('');

      colorSelector.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => {
          colorSelector.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
        });
      });
    }
  }

  // Size Selector
  initSizeSelector() {
    const sizeSelectors = document.querySelectorAll('.size-selector');
    
    sizeSelectors.forEach(selector => {
      const sizeOptions = selector.querySelectorAll('.size-option');
      
      sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
          // Remove active class from all options
          sizeOptions.forEach(opt => opt.classList.remove('selected'));
          // Add active class to clicked option
          option.classList.add('selected');
          
          // Update product variant if needed
          this.updateProductVariant(selector.closest('.product-details'), 'size', option.dataset.size);
        });
      });
    });
  }

  // Color Selector
  initColorSelector() {
    const colorSelectors = document.querySelectorAll('.color-selector');
    
    colorSelectors.forEach(selector => {
      const colorOptions = selector.querySelectorAll('.color-option');
      
      colorOptions.forEach(option => {
        option.addEventListener('click', () => {
          // Remove active class from all options
          colorOptions.forEach(opt => opt.classList.remove('selected'));
          // Add active class to clicked option
          option.classList.add('selected');
          
          // Update product variant if needed
          this.updateProductVariant(selector.closest('.product-details'), 'color', option.dataset.color);
        });
      });
    });
  }

  // Quantity Controls
  initQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    quantityControls.forEach(control => {
      const minusBtn = control.querySelector('.quantity-minus');
      const plusBtn = control.querySelector('.quantity-plus');
      const quantityInput = control.querySelector('.quantity-input');
      
      if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
          let currentValue = parseInt(quantityInput.value) || 1;
          if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
            this.updateQuantity(control, currentValue - 1);
          }
        });

        plusBtn.addEventListener('click', () => {
          let currentValue = parseInt(quantityInput.value) || 1;
          quantityInput.value = currentValue + 1;
          this.updateQuantity(control, currentValue + 1);
        });

        quantityInput.addEventListener('change', () => {
          let value = parseInt(quantityInput.value) || 1;
          if (value < 1) value = 1;
          quantityInput.value = value;
          this.updateQuantity(control, value);
        });
      }
    });
  }

  updateQuantity(control, quantity) {
    // Update any dependent elements (price calculations, etc.)
    const productDetails = control.closest('.product-details');
    if (productDetails) {
      const priceElement = productDetails.querySelector('.product-price');
      const basePrice = parseFloat(priceElement.dataset.basePrice) || parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
      
      if (basePrice) {
        const totalPrice = basePrice * quantity;
        priceElement.textContent = `£${totalPrice.toFixed(2)}`;
      }
    }
  }

  // Add to Cart
  initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAddToCart(btn);
      });
    });
  }

  handleAddToCart(btn) {
    const productDetails = btn.closest('.product-details');
    const product = this.getProductFromDetails(productDetails);
    
    if (product) {
      const quantity = parseInt(productDetails.querySelector('.quantity-input')?.value) || 1;
      const size = productDetails.querySelector('.size-option.selected')?.dataset.size;
      const color = productDetails.querySelector('.color-option.selected')?.dataset.color;
      
      this.addToCart(product, quantity, size, color);
    }
  }

  getProductFromDetails(details) {
    const productId = details.dataset.productId;
    const productName = details.querySelector('.product-title')?.textContent;
    const productPrice = parseFloat(details.querySelector('.product-price')?.textContent.replace(/[^0-9.]/g, ''));
    const productImage = details.querySelector('.product-image')?.src;

    if (productId && productName && productPrice && productImage) {
      return {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage
      };
    }
    return null;
  }

  // Wishlist
  initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleWishlistToggle(btn);
      });
    });
  }

  handleWishlistToggle(btn) {
    const productDetails = btn.closest('.product-details');
    const product = this.getProductFromDetails(productDetails);
    
    if (product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id);
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
      } else {
        this.addToWishlist(product);
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
      }
    }
  }

  // Product Gallery
  initProductGallery() {
    const galleries = document.querySelectorAll('.product-gallery');
    
    galleries.forEach(gallery => {
      const mainImage = gallery.querySelector('.main-image');
      const thumbnails = gallery.querySelectorAll('.thumbnail');
      
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
          const newSrc = thumb.dataset.src || thumb.src;
          mainImage.src = newSrc;
          
          // Update active thumbnail
          thumbnails.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
      });
    });
  }

  // Product Reviews
  initProductReviews() {
    const reviewForms = document.querySelectorAll('.review-form');
    
    reviewForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReviewSubmit(form);
      });
    });

    // Star rating
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach(rating => {
      const stars = rating.querySelectorAll('.star');
      stars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.setRating(rating, index + 1);
        });
      });
    });
  }

  setRating(ratingElement, rating) {
    const stars = ratingElement.querySelectorAll('.star');
    const ratingInput = ratingElement.querySelector('input[type="hidden"]');
    
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
    
    if (ratingInput) {
      ratingInput.value = rating;
    }
  }

  handleReviewSubmit(form) {
    const formData = new FormData(form);
    const reviewData = {
      rating: formData.get('rating'),
      title: formData.get('title'),
      comment: formData.get('comment'),
      productId: form.dataset.productId
    };

    // Simulate API call
    this.showNotification('Submitting review...', 'info');
    
    setTimeout(() => {
      this.showNotification('Review submitted successfully!', 'success');
      form.reset();
    }, 1000);
  }

  // Related Products
  initRelatedProducts() {
    const relatedProducts = document.querySelectorAll('.related-products');
    
    relatedProducts.forEach(container => {
      // Load related products based on current product
      this.loadRelatedProducts(container);
    });
  }

  loadRelatedProducts(container) {
    const productId = container.dataset.productId;
    
    // Simulate API call for related products
    setTimeout(() => {
      const relatedProducts = this.getMockRelatedProducts(productId);
      this.renderRelatedProducts(container, relatedProducts);
    }, 500);
  }

  getMockRelatedProducts(productId) {
    // Mock related products - in real app, this would be an API call
    return [
      { id: 'rel1', name: 'Premium Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 'rel2', name: 'Slim Fit Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 'rel3', name: 'Classic White T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];
  }

  renderRelatedProducts(container, products) {
    container.innerHTML = products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-actions">
            <button class="quick-add-btn" title="Quick Add">
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
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">£${product.price}</p>
        </div>
      </div>
    `).join('');
  }

  // Product Comparison
  initProductComparison() {
    const compareBtns = document.querySelectorAll('.compare-btn');
    
    compareBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleProductComparison(btn);
      });
    });
  }

  handleProductComparison(btn) {
    const product = this.getProductFromCard(btn.closest('.product-card'));
    
    if (product) {
      // Add to comparison list
      this.addToComparison(product);
      btn.classList.add('active');
      btn.textContent = 'Added to Compare';
    }
  }

  addToComparison(product) {
    let comparison = JSON.parse(localStorage.getItem('manvue-comparison') || '[]');
    
    if (comparison.length < 4 && !comparison.find(item => item.id === product.id)) {
      comparison.push(product);
      localStorage.setItem('manvue-comparison', JSON.stringify(comparison));
      this.showNotification(`${product.name} added to comparison`, 'success');
    } else if (comparison.find(item => item.id === product.id)) {
      this.showNotification('Product already in comparison', 'info');
    } else {
      this.showNotification('Maximum 4 products can be compared', 'warning');
    }
  }

  // Stock Notifications
  initStockNotifications() {
    const notifyBtns = document.querySelectorAll('.notify-stock-btn');
    
    notifyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleStockNotification(btn);
      });
    });
  }

  handleStockNotification(btn) {
    const productId = btn.dataset.productId;
    const email = prompt('Enter your email to be notified when this product is back in stock:');
    
    if (email && this.validateEmail(email)) {
      // Simulate API call
      this.showNotification('You will be notified when this product is back in stock', 'success');
      btn.textContent = 'Notification Set';
      btn.disabled = true;
    } else if (email) {
      this.showNotification('Please enter a valid email address', 'error');
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Product Filters
  initProductFilters() {
    const filterForms = document.querySelectorAll('.filter-form');
    
    filterForms.forEach(form => {
      const filterInputs = form.querySelectorAll('input[type="checkbox"], input[type="radio"], select');
      
      filterInputs.forEach(input => {
        input.addEventListener('change', () => {
          this.handleFilterChange(form);
        });
      });
    });
  }

  handleFilterChange(form) {
    const formData = new FormData(form);
    const filters = {};
    
    for (let [key, value] of formData.entries()) {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          filters[key].push(value);
        } else {
          filters[key] = [filters[key], value];
        }
      } else {
        filters[key] = value;
      }
    }
    
    this.applyFilters(filters);
  }

  applyFilters(filters) {
    // Simulate API call with filters
    this.showNotification('Applying filters...', 'info');
    
    setTimeout(() => {
      // Update product grid with filtered results
      this.updateProductGrid(this.getMockFilteredProducts(filters));
      this.showNotification('Filters applied', 'success');
    }, 500);
  }

  getMockFilteredProducts(filters) {
    // Mock filtered products - in real app, this would be an API call
    return [
      { id: 'filt1', name: 'Premium Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 'filt2', name: 'Slim Fit Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];
  }

  updateProductGrid(products) {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
      productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-actions">
              <button class="quick-add-btn" title="Quick Add">
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
          <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">£${product.price}</p>
          </div>
        </div>
      `).join('');
    }
  }

  // Sorting
  initSorting() {
    const sortSelect = document.querySelector('.sort-select');
    
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.handleSorting(e.target.value);
      });
    }
  }

  handleSorting(sortBy) {
    this.showNotification('Sorting products...', 'info');
    
    setTimeout(() => {
      // Update product grid with sorted results
      this.updateProductGrid(this.getMockSortedProducts(sortBy));
      this.showNotification('Products sorted', 'success');
    }, 300);
  }

  getMockSortedProducts(sortBy) {
    // Mock sorted products - in real app, this would be an API call
    const products = [
      { id: 'sort1', name: 'Premium Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 'sort2', name: 'Slim Fit Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: 'sort3', name: 'Classic White T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];

    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }

  // Pagination
  initPagination() {
    const pagination = document.querySelector('.pagination');
    
    if (pagination) {
      const pageLinks = pagination.querySelectorAll('.page-link');
      
      pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.handlePagination(link.dataset.page);
        });
      });
    }
  }

  handlePagination(page) {
    this.showNotification('Loading page...', 'info');
    
    setTimeout(() => {
      // Update product grid with paginated results
      this.updateProductGrid(this.getMockPaginatedProducts(page));
      this.updatePaginationUI(page);
      this.showNotification('Page loaded', 'success');
    }, 300);
  }

  getMockPaginatedProducts(page) {
    // Mock paginated products - in real app, this would be an API call
    return [
      { id: `page${page}1`, name: 'Premium Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' },
      { id: `page${page}2`, name: 'Slim Fit Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }
    ];
  }

  updatePaginationUI(currentPage) {
    const pagination = document.querySelector('.pagination');
    if (pagination) {
      const pageLinks = pagination.querySelectorAll('.page-link');
      pageLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page == currentPage) {
          link.classList.add('active');
        }
      });
    }
  }

  // UI Updates
  updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    
    if (cartCount) {
      cartCount.textContent = this.getCartCount();
    }
    
    if (cartTotal) {
      cartTotal.textContent = `£${this.getCartTotal().toFixed(2)}`;
    }
  }

  updateWishlistUI() {
    const wishlistCount = document.querySelector('.wishlist-count');
    
    if (wishlistCount) {
      wishlistCount.textContent = this.wishlist.length;
    }
  }

  // Observer Pattern
  addObserver(callback) {
    this.observers.push(callback);
  }

  removeObserver(callback) {
    this.observers = this.observers.filter(observer => observer !== callback);
  }

  notifyObservers(event, data) {
    this.observers.forEach(observer => {
      observer(event, data);
    });
  }

  // Utility Methods
  showNotification(message, type = 'info') {
    if (window.manvueApp && window.manvueApp.showNotification) {
      window.manvueApp.showNotification(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }

  updateProductVariant(container, type, value) {
    // Update product variant (size, color, etc.)
    const variantData = container.dataset.variants;
    if (variantData) {
      try {
        const variants = JSON.parse(variantData);
        const variant = variants.find(v => v[type] === value);
        
        if (variant) {
          const priceElement = container.querySelector('.product-price');
          if (priceElement) {
            priceElement.textContent = `£${variant.price}`;
            priceElement.dataset.basePrice = variant.price;
          }
        }
      } catch (error) {
        console.error('Error updating product variant:', error);
      }
    }
  }
}

// Initialize Product Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.productManager = new ProductManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProductManager;
}