// Slideshow functionality for hero banner
document.addEventListener('DOMContentLoaded', function() {
  // Hero banner slideshow
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