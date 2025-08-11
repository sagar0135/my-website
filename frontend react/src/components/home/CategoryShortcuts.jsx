import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryShortcuts.css';

const CategoryShortcuts = () => {
  const categories = [
    {
      name: 'T-SHIRTS',
      link: '/t-shirts',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      overlay: 'Essential Basics',
      count: '150+ Styles'
    },
    {
      name: 'SHIRTS',
      link: '/shirts',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      overlay: 'Formal & Casual',
      count: '200+ Styles'
    },
    {
      name: 'JEANS & CARGO',
      link: '/bottomwear',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      overlay: 'Comfort & Style',
      count: '100+ Styles'
    },
    {
      name: 'JACKETS',
      link: '/jackets',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      overlay: 'Outerwear',
      count: '80+ Styles'
    },
    {
      name: 'FOOTWEAR',
      link: '/footwear',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      overlay: 'Step in Style',
      count: '120+ Styles'
    }
  ];

  return (
    <section className="category-shortcuts" aria-label="Category Shortcuts">
      <div className="container">
        <div className="shortcut-grid">
          {categories.map((category, index) => (
            <Link key={index} to={category.link} className="shortcut-item" aria-label={`Browse ${category.name}`}>
              <div className="shortcut-image">
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="shortcut-overlay">
                  <span className="overlay-text">{category.overlay}</span>
                </div>
              </div>
              <div className="shortcut-label">
                <span className="label-text">{category.name}</span>
                <span className="label-count">{category.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShortcuts; 