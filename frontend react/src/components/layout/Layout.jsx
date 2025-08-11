import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import PromoBanner from '../common/PromoBanner';
import BackToTop from '../common/BackToTop';
import './layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <PromoBanner />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout; 