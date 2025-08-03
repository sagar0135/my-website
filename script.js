/**
 * MANVUE - Premium Men's Fashion
 * Enhanced JavaScript with Modern Features
 * Market-ready functionality similar to powerlook.in
 */

// Performance monitoring
const performance = {
  start: (name) => {
    performance.mark(`${name}-start`);
  },
  end: (name) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }
};

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for scroll events
  throttle: (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Smooth scroll to element
  scrollToElement: (element, offset = 0) => {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Format currency
  formatCurrency: (amount, currency = 'GBP') => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },

  // Generate unique ID
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  }
};

// Main application class
class MANVUEApp {
  constructor() {
    this.currentSlide = 0;
    this.slideInterval = null;
    this.isScrolled = false;
    this.isMobile = window.innerWidth <= 768;
    this.isTablet = window.innerWidth <= 992;
    
    this.init();
  }

  init() {
    performance.start('app-init');
    
    // Initialize all components
    this.initLoadingScreen();
    this.initHeader();
    this.initNavigation();
    this.initHeroSlideshow();
    this.initPromoBanner();
    this.initBackToTop();
    this.initNewsletter();
    this.initModals();
    this.initLazyLoading();
    this.initIntersectionObserver();
    this.initPerformanceMonitoring();
    this.initSearch();
    
    // Add event listeners
    this.addEventListeners();
    
    performance.end('app-init');
  }

  // Loading screen management
  initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // Simulate loading time for better UX
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1500);
    }
  }

  // Header functionality
  initHeader() {
    const header = document.getElementById('main-header');
    const promoBanner = document.getElementById('promo-banner');
    
    if (header) {
      // Sticky header with scroll effect
      const handleScroll = utils.throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const promoHeight = promoBanner ? promoBanner.offsetHeight : 0;
        
        if (scrollTop > promoHeight) {
          header.classList.add('scrolled');
          this.isScrolled = true;
        } else {
          header.classList.remove('scrolled');
          this.isScrolled = false;
        }
      }, 10);

      window.addEventListener('scroll', handleScroll);
    }
  }

  // Navigation functionality
  initNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item.dropdown');
    
    // Mobile menu toggle
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
      });
    }

    // Dropdown functionality
    navItems.forEach(item => {
      const navLink = item.querySelector('.nav-link');
      const dropdownMenu = item.querySelector('.dropdown-menu');
      
      if (navLink && dropdownMenu) {
        // Desktop hover behavior
        if (!this.isMobile) {
          item.addEventListener('mouseenter', () => {
            this.closeAllDropdowns();
            item.classList.add('active');
            navLink.setAttribute('aria-expanded', 'true');
          });

          item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
            navLink.setAttribute('aria-expanded', 'false');
          });
        } else {
          // Mobile click behavior
          navLink.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = item.classList.contains('active');
            
            this.closeAllDropdowns();
            
            if (!isActive) {
              item.classList.add('active');
              navLink.setAttribute('aria-expanded', 'true');
            }
          });
        }
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        this.closeAllDropdowns();
      }
    });
  }

  closeAllDropdowns() {
    const navItems = document.querySelectorAll('.nav-item.dropdown');
    navItems.forEach(item => {
      item.classList.remove('active');
      const navLink = item.querySelector('.nav-link');
      if (navLink) {
        navLink.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hero slideshow functionality
  initHeroSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slideshow-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (slides.length === 0) return;

    // Auto-advance slides
    this.startSlideshow(slides, indicators);

    // Manual navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.prevSlide(slides, indicators);
        this.restartSlideshow(slides, indicators);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.nextSlide(slides, indicators);
        this.restartSlideshow(slides, indicators);
      });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index, slides, indicators);
        this.restartSlideshow(slides, indicators);
      });
    });

    // Pause on hover
    slideshow.addEventListener('mouseenter', () => {
      this.pauseSlideshow();
    });

    slideshow.addEventListener('mouseleave', () => {
      this.startSlideshow(slides, indicators);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide(slides, indicators);
        this.restartSlideshow(slides, indicators);
      } else if (e.key === 'ArrowRight') {
        this.nextSlide(slides, indicators);
        this.restartSlideshow(slides, indicators);
      }
    });
  }

  startSlideshow(slides, indicators) {
    this.slideInterval = setInterval(() => {
      this.nextSlide(slides, indicators);
    }, 5000);
  }

  pauseSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  restartSlideshow(slides, indicators) {
    this.pauseSlideshow();
    this.startSlideshow(slides, indicators);
  }

  nextSlide(slides, indicators) {
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    this.updateSlides(slides, indicators);
  }

  prevSlide(slides, indicators) {
    this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
    this.updateSlides(slides, indicators);
  }

  goToSlide(index, slides, indicators) {
    this.currentSlide = index;
    this.updateSlides(slides, indicators);
  }

  updateSlides(slides, indicators) {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  // Promo banner functionality
  initPromoBanner() {
    const promoBanner = document.getElementById('promo-banner');
    const closePromoBtn = document.getElementById('close-promo');
    const countdownTimer = document.getElementById('timer');

    if (closePromoBtn && promoBanner) {
      closePromoBtn.addEventListener('click', () => {
        promoBanner.style.display = 'none';
        localStorage.setItem('promo-closed', 'true');
      });

      // Check if user previously closed the banner
      if (localStorage.getItem('promo-closed') === 'true') {
        promoBanner.style.display = 'none';
      }
    }

    // Countdown timer
    if (countdownTimer) {
      this.startCountdown(countdownTimer);
    }
  }

  startCountdown(timerElement) {
    let timeLeft = 23 * 60 * 60 + 59 * 60 + 59; // 23:59:59

    const updateTimer = () => {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      timerElement.textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      if (timeLeft <= 0) {
        timeLeft = 23 * 60 * 60 + 59 * 60 + 59; // Reset to 23:59:59
      } else {
        timeLeft--;
      }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // Back to top functionality
  initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
      const handleScroll = utils.throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, 10);

      window.addEventListener('scroll', handleScroll);

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Newsletter functionality
  initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmit(form);
      });
    });
  }

  handleNewsletterSubmit(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!this.validateEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Simulate API call
    this.showNotification('Subscribing to newsletter...', 'info');
    
    setTimeout(() => {
      this.showNotification('Successfully subscribed to newsletter!', 'success');
      form.reset();
    }, 1000);
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Modal functionality
  initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
      const closeBtn = modal.querySelector('.close-modal');
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.closeModal(modal);
        });
      }

      // Close on outside click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
          this.closeModal(modal);
        }
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Lazy loading for images
  initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  // Intersection Observer for animations
  initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.featured-image, .shortcut-item, .product-card');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }

  // Performance monitoring
  initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.name}: ${entry.value}`);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  }

  // Search functionality
  initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput) {
      // Debounced search
      const handleSearch = utils.debounce((query) => {
        this.performSearch(query);
      }, 300);

      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          handleSearch(query);
        } else {
          this.hideSearchResults();
        }
      });

      // Search button click
      if (searchButton) {
        searchButton.addEventListener('click', () => {
          const query = searchInput.value.trim();
          if (query) {
            this.performSearch(query);
          }
        });
      }

      // Handle focus/blur
      searchInput.addEventListener('focus', () => {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
          this.showSearchResults();
        }
      });

      // Close search results when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-bar')) {
          this.hideSearchResults();
        }
      });
    }
  }

  performSearch(query) {
    if (query.length < 2) {
      this.hideSearchResults();
      return;
    }

    // Simulate search API call
    setTimeout(() => {
      const results = this.getSearchResults(query);
      this.displaySearchResults(results, query);
    }, 200);
  }

  getSearchResults(query) {
    // Mock search results - in real app, this would be an API call
    const products = [
      { id: 'prod1', name: 'Premium Linen Shirt', price: 49.99, image: 'https://images.unsplash.com/photo-1598961942613-ba897716405b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Shirts' },
      { id: 'prod2', name: 'Slim Fit Jeans', price: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Jeans' },
      { id: 'prod3', name: 'Classic White T-Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'T-Shirts' },
      { id: 'prod4', name: 'Leather Jacket', price: 199.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Jackets' },
      { id: 'prod5', name: 'Casual Sneakers', price: 79.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', category: 'Footwear' }
    ];

    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

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
            <p class="search-result-category">${product.category}</p>
            <div class="search-result-meta">
              <span class="search-result-price">£${product.price}</span>
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

  addSearchResultListeners() {
    const resultItems = document.querySelectorAll('.search-result-item');
    
    resultItems.forEach(item => {
      const productId = item.dataset.productId;
      
      // Quick add to cart
      const quickAddBtn = item.querySelector('.quick-add-btn');
      if (quickAddBtn) {
        quickAddBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleQuickAdd(productId);
        });
      }

      // Wishlist toggle
      const wishlistBtn = item.querySelector('.wishlist-btn');
      if (wishlistBtn) {
        wishlistBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleWishlistToggle(productId, wishlistBtn);
        });
      }

      // Quick view
      const quickViewBtn = item.querySelector('.quick-view-btn');
      if (quickViewBtn) {
        quickViewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleQuickView(productId);
        });
      }

      // Item click
      item.addEventListener('click', () => {
        this.handleProductClick(productId);
      });
    });
  }

  handleQuickAdd(productId) {
    this.showNotification('Product added to cart!', 'success');
  }

  handleWishlistToggle(productId, btn) {
    const isActive = btn.classList.contains('active');
    if (isActive) {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
      this.showNotification('Removed from wishlist', 'info');
    } else {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
      this.showNotification('Added to wishlist!', 'success');
    }
  }

  handleQuickView(productId) {
    this.showNotification('Quick view feature coming soon!', 'info');
  }

  handleProductClick(productId) {
    this.showNotification('Navigating to product page...', 'info');
    // In real app, navigate to product page
    // window.location.href = `/product/${productId}`;
  }

  hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.classList.remove('active');
    }
  }

  showSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.classList.add('active');
    }
  }

  // Notification system
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${this.getNotificationIcon(type)}"></i>
      <span>${message}</span>
    `;

    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  }

  // Event listeners
  addEventListeners() {
    // Window resize handler
    const handleResize = utils.debounce(() => {
      this.isMobile = window.innerWidth <= 768;
      this.isTablet = window.innerWidth <= 992;
      
      // Reinitialize mobile-specific features
      if (this.isMobile) {
        this.initNavigation();
      }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Preload critical resources
    this.preloadCriticalResources();

    // Handle form submissions
    document.addEventListener('submit', (e) => {
      if (e.target.classList.contains('newsletter-form')) {
        e.preventDefault();
        this.handleNewsletterSubmit(e.target);
      }
    });
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalImages = [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check for required browser features
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported - some animations may not work');
  }

  if (!('PerformanceObserver' in window)) {
    console.warn('PerformanceObserver not supported - performance monitoring disabled');
  }

  // Initialize the app
  window.manvueApp = new MANVUEApp();
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MANVUEApp, utils };
}
