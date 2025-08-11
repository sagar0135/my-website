import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { ThemeProvider } from './context/ThemeContext';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const ProductList = React.lazy(() => import('./pages/ProductList'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const TShirts = React.lazy(() => import('./pages/CategoryPages/TShirts'));
const Shirts = React.lazy(() => import('./pages/CategoryPages/Shirts'));
const Jackets = React.lazy(() => import('./pages/CategoryPages/Jackets'));
const Footwear = React.lazy(() => import('./pages/CategoryPages/Footwear'));
const Bottomwear = React.lazy(() => import('./pages/CategoryPages/Bottomwear'));
const Accessories = React.lazy(() => import('./pages/CategoryPages/Accessories'));
const GymToStreet = React.lazy(() => import('./pages/CategoryPages/GymToStreet'));

import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <Router>
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/t-shirts" element={<TShirts />} />
                    <Route path="/shirts" element={<Shirts />} />
                    <Route path="/jackets" element={<Jackets />} />
                    <Route path="/footwear" element={<Footwear />} />
                    <Route path="/bottomwear" element={<Bottomwear />} />
                    <Route path="/accessories" element={<Accessories />} />
                    <Route path="/gym-to-street" element={<GymToStreet />} />
                  </Routes>
                </Suspense>
              </Layout>
            </Router>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App; 