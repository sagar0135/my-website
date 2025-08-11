import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { searchProducts } from '../services/productData';

const SearchContext = createContext();

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        query: action.payload,
        isSearching: true
      };
      
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        results: action.payload,
        isSearching: false
      };
      
    case 'SET_SEARCH_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.payload
      };
      
    case 'CLEAR_SEARCH':
      return {
        ...state,
        query: '',
        results: [],
        suggestions: [],
        isSearching: false
      };
      
    case 'SET_SEARCH_HISTORY':
      return {
        ...state,
        history: action.payload
      };
      
    case 'ADD_TO_SEARCH_HISTORY':
      const newHistory = [action.payload, ...state.history.filter(item => item !== action.payload)].slice(0, 10);
      return {
        ...state,
        history: newHistory
      };
      
    case 'TOGGLE_SEARCH_MODAL':
      return {
        ...state,
        isSearchModalOpen: !state.isSearchModalOpen
      };
      
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, {
    query: '',
    results: [],
    suggestions: [],
    history: [],
    isSearching: false,
    isSearchModalOpen: false
  });

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('manvue-search-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        dispatch({ type: 'SET_SEARCH_HISTORY', payload: parsedHistory });
      } catch (error) {
        console.error('Error loading search history from localStorage:', error);
        localStorage.removeItem('manvue-search-history');
      }
    }
  }, []);

  // Save search history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('manvue-search-history', JSON.stringify(state.history));
  }, [state.history]);

  const setSearchQuery = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSearchResults = (results) => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  };

  const setSearchSuggestions = (suggestions) => {
    dispatch({ type: 'SET_SEARCH_SUGGESTIONS', payload: suggestions });
  };

  const clearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  const addToSearchHistory = (query) => {
    if (query.trim()) {
      dispatch({ type: 'ADD_TO_SEARCH_HISTORY', payload: query.trim() });
    }
  };

  const toggleSearchModal = () => {
    dispatch({ type: 'TOGGLE_SEARCH_MODAL' });
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setSearchQuery(query);
    addToSearchHistory(query);

    // Use the actual search function from productData service
    const searchResults = searchProducts(query);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      setSearchResults(searchResults);
    }, 300);
  };

  const value = {
    query: state.query,
    results: state.results,
    suggestions: state.suggestions,
    history: state.history,
    isSearching: state.isSearching,
    isSearchModalOpen: state.isSearchModalOpen,
    setSearchQuery,
    setSearchResults,
    setSearchSuggestions,
    clearSearch,
    addToSearchHistory,
    toggleSearchModal,
    performSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}; 