// Product Interactions - Quick View, Wishlist, Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product interactions
  initProductInteractions();
});

function initProductInteractions() {
  // Setup Quick View functionality
  setupQuickView();
  
  // Setup Wishlist functionality
  setupWishlist();
  
  // Setup Cart functionality
  setupCart();
}

// Quick View Modal
function setupQuickView() {
  // Create modal container if it doesn't exist
  if (!document.getElementById('quick-view-modal')) {
    const modalHTML = `
      <div id="quick-view-modal" class="modal">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="quick-view-container">
            <div class="product-images">
              <div class="main-image">
                <img src="" alt="Product Image" id="qv-main-image">
              </div>
              <div class="thumbnail-images">
                <!-- Thumbnails will be added dynamically -->
              </div>
            </div>
            <div class="product-details">
              <h2 id="qv-product-title"></h2>
              <div class="product-price" id="qv-product-price"></div>
              <div class="product-rating" id="qv-product-rating"></div>
              <div class="product-description">
                <p id="qv-product-description"></p>
              </div>
              <div class="product-options">
                <div class="size-selection">
                  <h4>Select Size</h4>
                  <div class="size-options" id="qv-size-options">
                    <button class="size-option">S</button>
                    <button class="size-option">M</button>
                    <button class="size-option">L</button>
                    <button class="size-option">XL</button>
                    <button class="size-option">XXL</button>
                  </div>
                </div>
                <div class="color-selection">
                  <h4>Select Color</h4>
                  <div class="color-options" id="qv-color-options">
                    <!-- Color options will be added dynamically -->
                  </div>
                </div>
                <div class="quantity-selection">
                  <h4>Quantity</h4>
                  <div class="quantity-selector">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="1" min="1" max="10" id="qv-quantity">
                    <button class="quantity-btn plus">+</button>
                  </div>
                </div>
              </div>
              <div class="product-actions">
                <button class="btn-primary add-to-cart-btn" id="qv-add-to-cart">Add to Cart</button>
                <button class="btn-wishlist" id="qv-add-to-wishlist"><i class="far fa-heart"></i></button>
              </div>
              <div class="product-meta">
                <p><strong>SKU:</strong> <span id="qv-sku"></span></p>
                <p><strong>Category:</strong> <span id="qv-category"></span></p>
                <p><strong>Tags:</strong> <span id="qv-tags"></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close modal when clicking the X or outside the modal
    const modal = document.getElementById('quick-view-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Handle quantity buttons
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('qv-quantity');
    
    minusBtn.addEventListener('click', function() {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      if (quantityInput.value < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      }
    });
    
    // Size selection
    const sizeOptions = modal.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }
  
  // Add click event to all quick view buttons
  const quickViewButtons = document.querySelectorAll('.quick-view');
  quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get product data from the parent product card
      const productCard = this.closest('.product-card');
      const productImage = productCard.querySelector('.product-image img').src;
      const productTitle = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.product-price').innerHTML;
      const productRating = productCard.querySelector('.product-rating') ? 
                           productCard.querySelector('.product-rating').innerHTML : '';
      
      // Generate a random SKU and other metadata
      const sku = 'SKU-' + Math.floor(Math.random() * 10000);
      const category = productCard.dataset.category || 'Clothing';
      const tags = 'Fashion, Men, ' + category;
      
      // Generate a random description
      const descriptions = [
        "Made from premium materials for exceptional comfort and style. This versatile piece is perfect for any occasion.",
        "Elevate your wardrobe with this essential piece. Features a modern fit and durable construction for long-lasting wear.",
        "Designed with attention to detail and crafted from high-quality fabrics. A must-have addition to your collection.",
        "Combines classic style with modern details. Perfect for everyday wear or special occasions.",
        "Premium quality and exceptional comfort. This versatile piece will quickly become a staple in your wardrobe."
      ];
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      // Populate the modal with product data
      document.getElementById('qv-main-image').src = productImage;
      document.getElementById('qv-product-title').textContent = productTitle;
      document.getElementById('qv-product-price').innerHTML = productPrice;
      document.getElementById('qv-product-rating').innerHTML = productRating;
      document.getElementById('qv-product-description').textContent = randomDescription;
      document.getElementById('qv-sku').textContent = sku;
      document.getElementById('qv-category').textContent = category;
      document.getElementById('qv-tags').textContent = tags;
      
      // Generate random color options
      const colors = ['#000000', '#0a3d62', '#227093', '#d35400', '#8c7ae6', '#718093', '#c23616'];
      const colorOptionsContainer = document.getElementById('qv-color-options');
      colorOptionsContainer.innerHTML = '';
      
      // Add 3-5 random colors
      const numColors = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < numColors; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        colors.splice(colorIndex, 1); // Remove used color
        
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.innerHTML = `<span class="color-swatch" style="background-color: ${color}"></span>`;
        colorOption.addEventListener('click', function() {
          document.querySelectorAll('#qv-color-options .color-option').forEach(opt => {
            opt.classList.remove('selected');
          });
          this.classList.add('selected');
        });
        
        colorOptionsContainer.appendChild(colorOption);
      }
      
      // Reset quantity
      document.getElementById('qv-quantity').value = 1;
      
      // Reset size selection
      document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
      
      // Show the modal
      document.getElementById('quick-view-modal').style.display = 'block';
      
      // Setup Add to Cart button in modal
      document.getElementById('qv-add-to-cart').addEventListener('click', function() {
        const selectedSize = document.querySelector('.size-option.selected');
        const selectedColor = document.querySelector('#qv-color-options .color-option.selected');
        
        if (!selectedSize) {
          alert('Please select a size');
          return;
        }
        
        if (!selectedColor) {
          alert('Please select a color');
          return;
        }
        
        const quantity = document.getElementById('qv-quantity').value;
        addToCart(productTitle, productImage, selectedSize.textContent, 
                 selectedColor.querySelector('.color-swatch').style.backgroundColor, 
                 quantity, productPrice);
        
        document.getElementById('quick-view-modal').style.display = 'none';
      });
      
      // Setup Add to Wishlist button in modal
      document.getElementById('qv-add-to-wishlist').addEventListener('click', function() {
        addToWishlist(productTitle, productImage, productPrice);
        this.innerHTML = '<i class="fas fa-heart"></i>';
      });
    });
  });
}

// Wishlist functionality
function setupWishlist() {
  // Add click event to all wishlist buttons
  const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get product data
      const productCard = this.closest('.product-card');
      const productTitle = productCard.querySelector('h3').textContent;
      const productImage = productCard.querySelector('.product-image img').src;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Add to wishlist
      addToWishlist(productTitle, productImage, productPrice);
      
      // Change heart icon to filled
      this.innerHTML = '<i class="fas fa-heart"></i>';
    });
  });
}

function addToWishlist(title, image, price) {
  // Get existing wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  // Check if product already exists in wishlist
  const existingProduct = wishlist.find(item => item.title === title);
  
  if (!existingProduct) {
    // Add new product to wishlist
    wishlist.push({
      title: title,
      image: image,
      price: price
    });
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount(wishlist.length);
    
    // Show success message
    showNotification('Product added to wishlist!');
  } else {
    showNotification('Product already in wishlist!');
  }
}

function updateWishlistCount(count) {
  const wishlistCount = document.querySelector('.wishlist-count');
  if (wishlistCount) {
    wishlistCount.textContent = count;
  }
}

// Cart functionality
function setupCart() {
  // Add click event to all cart buttons
  const cartButtons = document.querySelectorAll('.add-to-cart');
  cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get product data
      const productCard = this.closest('.product-card');
      const productTitle = productCard.querySelector('h3').textContent;
      const productImage = productCard.querySelector('.product-image img').src;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Show size and color selection modal
      showProductOptionsModal(productTitle, productImage, productPrice);
    });
  });
}

function showProductOptionsModal(title, image, price) {
  // Create modal if it doesn't exist
  if (!document.getElementById('product-options-modal')) {
    const modalHTML = `
      <div id="product-options-modal" class="modal">
        <div class="modal-content options-modal">
          <span class="close-modal">&times;</span>
          <div class="options-container">
            <div class="product-preview">
              <img src="" alt="Product" id="option-product-image">
              <h3 id="option-product-title"></h3>
              <div class="product-price" id="option-product-price"></div>
            </div>
            <div class="product-options">
              <div class="size-selection">
                <h4>Select Size</h4>
                <div class="size-options" id="option-size-options">
                  <button class="size-option">S</button>
                  <button class="size-option">M</button>
                  <button class="size-option">L</button>
                  <button class="size-option">XL</button>
                  <button class="size-option">XXL</button>
                </div>
              </div>
              <div class="color-selection">
                <h4>Select Color</h4>
                <div class="color-options" id="option-color-options">
                  <!-- Color options will be added dynamically -->
                </div>
              </div>
              <div class="quantity-selection">
                <h4>Quantity</h4>
                <div class="quantity-selector">
                  <button class="quantity-btn minus">-</button>
                  <input type="number" value="1" min="1" max="10" id="option-quantity">
                  <button class="quantity-btn plus">+</button>
                </div>
              </div>
              <button class="btn-primary add-to-cart-btn" id="confirm-add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Close modal when clicking the X or outside the modal
    const modal = document.getElementById('product-options-modal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Handle quantity buttons
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('option-quantity');
    
    minusBtn.addEventListener('click', function() {
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });
    
    plusBtn.addEventListener('click', function() {
      if (quantityInput.value < 10) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      }
    });
    
    // Size selection
    const sizeOptions = modal.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', function() {
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
  }
  
  // Populate modal with product data
  document.getElementById('option-product-image').src = image;
  document.getElementById('option-product-title').textContent = title;
  document.getElementById('option-product-price').textContent = price;
  
  // Generate random color options
  const colors = ['#000000', '#0a3d62', '#227093', '#d35400', '#8c7ae6', '#718093', '#c23616'];
  const colorOptionsContainer = document.getElementById('option-color-options');
  colorOptionsContainer.innerHTML = '';
  
  // Add 3-5 random colors
  const numColors = Math.floor(Math.random() * 3) + 3;
  for (let i = 0; i < numColors; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    colors.splice(colorIndex, 1); // Remove used color
    
    const colorOption = document.createElement('div');
    colorOption.className = 'color-option';
    colorOption.innerHTML = `<span class="color-swatch" style="background-color: ${color}"></span>`;
    colorOption.addEventListener('click', function() {
      document.querySelectorAll('#option-color-options .color-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
    });
    
    colorOptionsContainer.appendChild(colorOption);
  }
  
  // Reset quantity
  document.getElementById('option-quantity').value = 1;
  
  // Reset size selection
  document.querySelectorAll('#option-size-options .size-option').forEach(opt => opt.classList.remove('selected'));
  
  // Show the modal
  document.getElementById('product-options-modal').style.display = 'block';
  
  // Setup Add to Cart button
  document.getElementById('confirm-add-to-cart').onclick = function() {
    const selectedSize = document.querySelector('#option-size-options .size-option.selected');
    const selectedColor = document.querySelector('#option-color-options .color-option.selected');
    
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      alert('Please select a color');
      return;
    }
    
    const quantity = document.getElementById('option-quantity').value;
    addToCart(title, image, selectedSize.textContent, 
             selectedColor.querySelector('.color-swatch').style.backgroundColor, 
             quantity, price);
    
    document.getElementById('product-options-modal').style.display = 'none';
  };
}

function addToCart(title, image, size, color, quantity, price) {
  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart with same size and color
  const existingProductIndex = cart.findIndex(item => 
    item.title === title && item.size === size && item.color === color
  );
  
  if (existingProductIndex !== -1) {
    // Update quantity if product already exists
    cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(quantity);
  } else {
    // Add new product to cart
    cart.push({
      title: title,
      image: image,
      size: size,
      color: color,
      quantity: parseInt(quantity),
      price: price
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update cart count
  updateCartCount();
  
  // Show success message
  showNotification('Product added to cart!');
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + parseInt(item.quantity), 0);
  
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Notification system
function showNotification(message) {
  // Create notification element if it doesn't exist
  if (!document.getElementById('notification')) {
    const notificationHTML = `
      <div id="notification" class="notification">
        <span id="notification-message"></span>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', notificationHTML);
  }
  
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  
  // Set message
  notificationMessage.textContent = message;
  
  // Show notification
  notification.classList.add('show');
  
  // Hide notification after 3 seconds
  setTimeout(function() {
    notification.classList.remove('show');
  }, 3000);
}

// Initialize on page load
window.addEventListener('load', function() {
  // Initialize wishlist count
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  updateWishlistCount(wishlist.length);
  
  // Initialize cart count
  updateCartCount();
});