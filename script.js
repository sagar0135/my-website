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
      e.preventDefault();
      
      // Get the category name
      const category = this.textContent.split(' ')[0] + ' ' + this.textContent.split(' ')[1];
      
      // Redirect to a category page (you would create these pages)
      // window.location.href = category.toLowerCase().replace(/\s+/g, '-') + '.html';
      
      // For demonstration, we'll just alert
      alert('Navigating to: ' + category + ' page');
    });
  });
});
