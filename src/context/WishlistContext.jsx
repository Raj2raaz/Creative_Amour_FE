import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist(null);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setWishlist(data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const { data } = await api.post(`/wishlist/${productId}`);
      setWishlist(data.wishlist);
      return data.wishlist;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const { data } = await api.delete(`/wishlist/${productId}`);
      setWishlist(data.wishlist);
      return data.wishlist;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const isInWishlist = (productId) => {
    if (!wishlist) return false;
    return wishlist.products?.some(p => 
      (typeof p === 'string' ? p : p._id) === productId
    );
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchWishlist,
    wishlistCount: wishlist?.products?.length || 0
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
