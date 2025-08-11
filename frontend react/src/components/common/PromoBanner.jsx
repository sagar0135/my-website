import React, { useState, useEffect } from 'react';
import './PromoBanner.css';

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('manvue-promo-banner-closed');
    if (bannerClosed) {
      setIsVisible(false);
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('manvue-promo-banner-closed', 'true');
  };

  if (!isVisible) return null;

  const formatTime = (time) => time.toString().padStart(2, '0');

  return (
    <div className="promo-banner" id="promo-banner">
      <div className="promo-content">
        <span className="promo-text">
          <i className="fas fa-shipping-fast"></i>
          FREE SHIPPING ON ORDERS £49+ 
          <span className="promo-highlight">⚡ NEW DROPS EVERY WEEK</span>
        </span>
        <span className="promo-countdown" id="countdown">
          <i className="fas fa-clock"></i>
          FLASH SALE ENDS IN: <span id="timer">
            {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </span>
      </div>
      <button 
        className="promo-close" 
        id="close-promo" 
        onClick={handleClose}
        aria-label="Close promo banner"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default PromoBanner; 