import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlideshow.css';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      backgroundImage: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'SUMMER COLLECTION 2025',
      subtitle: 'ELEVATE YOUR STYLE',
      description: 'Beat the heat with our exclusive summer styles for men. Premium quality meets contemporary design.',
      primaryAction: { text: 'Shop Now', link: '/summer-collection' },
      secondaryAction: { text: 'Explore Basics', link: '/t-shirts' }
    },
    {
      id: 2,
      backgroundImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'NEW ARRIVALS',
      subtitle: 'FRESH STYLES',
      description: 'Discover the latest trends in men\'s fashion. From casual to formal, we have you covered.',
      primaryAction: { text: 'Shop Now', link: '/fresh-drops' },
      secondaryAction: { text: 'View All', link: '/products' }
    },
    {
      id: 3,
      backgroundImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'PREMIUM QUALITY',
      subtitle: 'EXCEPTIONAL CRAFTSMANSHIP',
      description: 'Experience the difference with our premium materials and expert craftsmanship.',
      primaryAction: { text: 'Learn More', link: '/about' },
      secondaryAction: { text: 'Shop Collection', link: '/products' }
    },
    {
      id: 4,
      backgroundImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'LIMITED EDITION',
      subtitle: 'EXCLUSIVE DESIGNS',
      description: 'Get your hands on our limited edition pieces before they\'re gone forever.',
      primaryAction: { text: 'Shop Limited', link: '/limited-edition' },
      secondaryAction: { text: 'View All', link: '/products' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="hero-banner" aria-label="Hero Banner">
      <div className="slideshow" id="hero-slideshow">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slideshow-item ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url('${slide.backgroundImage}')` }}
          >
            <div className="slide-overlay"></div>
          </div>
        ))}
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-subtitle">{slides[currentSlide].title}</span>
            <span className="hero-main-title">{slides[currentSlide].subtitle}</span>
          </h1>
          <p className="hero-description">{slides[currentSlide].description}</p>
          <div className="hero-actions">
            <Link to={slides[currentSlide].primaryAction.link} className="shop-now-btn primary">
              <span>{slides[currentSlide].primaryAction.text}</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
            <Link to={slides[currentSlide].secondaryAction.link} className="shop-now-btn secondary">
              <span>{slides[currentSlide].secondaryAction.text}</span>
              <i className="fas fa-tshirt"></i>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="slideshow-controls">
        <button 
          className="prev-slide" 
          aria-label="Previous slide" 
          onClick={goToPrevious}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="slide-indicators" id="slide-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></span>
          ))}
        </div>
        <button 
          className="next-slide" 
          aria-label="Next slide" 
          onClick={goToNext}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default HeroSlideshow; 