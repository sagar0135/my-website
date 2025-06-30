// Mobile navigation handling
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navItems = document.querySelectorAll('.nav-item.dropdown');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  // Add menu toggle functionality
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Handle dropdown behavior based on screen size
  function setupNavigation() {
    if (window.innerWidth <= 768) {
      navItems.forEach(item => {
        // Remove any existing event listeners first
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('click', function(e) {
          // Prevent immediate closing when clicking dropdown items
          if (e.target === this || e.target.closest('.dropdown-toggle')) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // Close other open dropdowns
            navItems.forEach(otherItem => {
              if (otherItem !== this && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
              }
            });
          }
        });
      });
    } else {
      // Desktop behavior - hover instead of click
      navItems.forEach(item => {
        // Remove any existing event listeners first
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        newItem.addEventListener('mouseenter', function() {
          this.classList.add('active');
        });
        
        newItem.addEventListener('mouseleave', function() {
          this.classList.remove('active');
        });
      });
    }
  }
  
  // Initial setup
  setupNavigation();
  
  // Update on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupNavigation, 250);
  });
  
  // Handle navigation links
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Get the href attribute
      const href = this.getAttribute('href');
      
      // Navigate to the page
      if (href && href !== '#') {
        window.location.href = href;
      }
    });
  });
  
  // Hero banner slideshow
  const slideshowItems = document.querySelectorAll('.slideshow-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  
  if (slideshowItems.length > 0) {
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      slideshowItems.forEach(item => {
        item.classList.remove('active');
      });
      
      // Update indicators
      indicators.forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      // Show the selected slide
      slideshowItems[index].classList.add('active');
      indicators[index].classList.add('active');
      
      // Update current slide index
      currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slideshowItems.length) {
        next = 0;
      }
      showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
      let prev = currentSlide - 1;
      if (prev < 0) {
        prev = slideshowItems.length - 1;
      }
      showSlide(prev);
    }
    
    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Add event listeners to controls
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    
    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }
});

// Hoodie-specific functionality
function initHoodieFeatures() {
  // Quick filter for hoodies
  const quickHoodieFilter = document.createElement('div');
  quickHoodieFilter.className = 'quick-filter';
  quickHoodieFilter.innerHTML = `
    <div class="container">
      <div class="quick-filter-buttons">
        <button class="quick-filter-btn active" data-filter="all">All Hoodies</button>
        <button class="quick-filter-btn" data-filter="pullover">Pullover</button>
        <button class="quick-filter-btn" data-filter="zip-up">Zip-Up</button>
        <button class="quick-filter-btn" data-filter="oversized">Oversized</button>
        <button class="quick-filter-btn" data-filter="graphic">Graphic</button>
      </div>
    </div>
  `;
  
  // Insert after the featured hoodies section
  const featuredHoodiesSection = document.querySelector('.featured-hoodies');
  if (featuredHoodiesSection) {
    featuredHoodiesSection.after(quickHoodieFilter);
    
    // Add event listeners to quick filter buttons
    const filterButtons = document.querySelectorAll('.quick-filter-btn');
    const products = document.querySelectorAll('.product-card[data-category="hoodies"]');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        const filterValue = this.dataset.filter;
        
        if (filterValue === 'all') {
          products.forEach(product => {
            product.style.display = 'block';
          });
        } else {
          products.forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(filterValue.toLowerCase())) {
              product.style.display = 'block';
            } else {
              product.style.display = 'none';
            }
          });
        }
      });
    });
  }
}

// Initialize hoodie features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the hoodies page
  if (document.querySelector('.featured-hoodies')) {
    initHoodieFeatures();
  }
});

// Footer interactions
document.addEventListener('DOMContentLoaded', function() {
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Here you would typically send this to your backend
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Footer link hover effects with smooth transition
  const footerLinks = document.querySelectorAll('.help-category li a');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.paddingLeft = '5px';
      this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.paddingLeft = '0';
    });
  });
  
  // Social media icon hover effects
  const socialIcons = document.querySelectorAll('.social-icons a');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.color = '#ff3e6c';
      this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.color = '';
    });
  });
  
  // Cart sidebar functionality
  const cartToggle = document.querySelector('.cart-toggle');
  const cartSidebar = document.getElementById('cart-sidebar');
  const closeCart = document.querySelector('.close-cart');
  
  if (cartToggle && cartSidebar) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      cartSidebar.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when cart is open
    });
    
    if (closeCart) {
      closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
      });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
      if (cartSidebar.classList.contains('active') && 
          !cartSidebar.contains(e.target) && 
          e.target !== cartToggle) {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
