import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state; // Item already exists
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
      
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: []
      };
      
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload
      };
      
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        isOpen: !state.isOpen
      };
      
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isOpen: false
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('manvue-wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        localStorage.removeItem('manvue-wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('manvue-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product) => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: product
    });
  };

  const removeFromWishlist = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_WISHLIST',
      payload: productId
    });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const toggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST' });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const wishlistCount = state.items.length;

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    toggleWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}; 