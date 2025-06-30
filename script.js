// Mobile navigation handling
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navItems = document.querySelectorAll('.nav-item.dropdown');
  
  if (window.innerWidth <= 768) {
    navItems.forEach(item => {
      item.addEventListener('click', function(e) {
        // Prevent immediate closing when clicking dropdown items
        if (e.target === this || e.target === this.querySelector('span')) {
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
  }
  
  // Handle navigation links
  const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove the preventDefault to allow normal navigation
      // e.preventDefault();
      
      // Get the href attribute
      const href = this.getAttribute('href');
      
      // Navigate to the page
      if (href) {
        window.location.href = href;
      }
    });
  });
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
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products
        const filterValue = this.dataset.filter;
        const products = document.querySelectorAll('.product-card[data-category="hoodies"]');
        
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
  // Check if we're on the jackets page
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
});
