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
