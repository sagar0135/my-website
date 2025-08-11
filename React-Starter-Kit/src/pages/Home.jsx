import React, { useEffect } from 'react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CategoryShortcuts from '../components/home/CategoryShortcuts';
import PromoBanner from '../components/home/PromoBanner';
import SEO from '../components/common/SEO';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="MANVUE | Premium Men's Fashion - Latest Trends & Styles"
        description="MANVUE - Premium men's fashion and apparel. Discover the latest trends in men's clothing, shoes, and accessories. Free shipping on orders over £49."
        keywords="men's fashion, men's clothing, t-shirts, shirts, jeans, jackets, footwear, accessories, UK fashion, online shopping"
        image="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
        url="https://manvue.com/"
      />
      
      <main className="home-page">
        {/* Hero Slideshow */}
        <HeroSlideshow />
        
        {/* Featured Collection */}
        <FeaturedCollection />
        
        {/* Category Shortcuts */}
        <CategoryShortcuts />
        
        {/* Promo Banner */}
        <PromoBanner />
      </main>
    </>
  );
};

export default Home; 