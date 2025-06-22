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
  
  // Slideshow functionality for hero banner
  const slideshowItems = document.querySelectorAll('.slideshow-item');
  let currentSlide = 0;
  
  function nextSlide() {
    slideshowItems[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideshowItems.length;
    slideshowItems[currentSlide].classList.add('active');
  }
  
  // Change slide every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Countdown timer functionality
  function updateCountdown() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59);
    
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown').textContent = 
      `FLASH SALE ENDS IN: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown();
});
