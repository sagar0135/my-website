import React, { useEffect } from 'react';
import HeroSlideshow from '../components/home/HeroSlideshow';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CategoryShortcuts from '../components/home/CategoryShortcuts';
import TrendingProducts from '../components/home/TrendingProducts';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home-page">
      {/* Hero Slideshow */}
      <HeroSlideshow />
      
      {/* Featured Collection */}
      <FeaturedCollection />
      
      {/* Category Shortcuts */}
      <CategoryShortcuts />
      
      {/* Trending Products */}
      <TrendingProducts />
      
      {/* Newsletter */}
      <Newsletter />
    </main>
  );
};

export default Home; 