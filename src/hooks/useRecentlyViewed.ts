import { useState, useEffect, useCallback } from "react";

interface RecentProduct {
  id: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
  viewedAt: number;
}

const STORAGE_KEY = "multti_recently_viewed";
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentProduct[];
        setRecentProducts(parsed);
      }
    } catch {
      setRecentProducts([]);
    }
  }, []);

  // Add product to recently viewed
  const addToRecentlyViewed = useCallback((product: Omit<RecentProduct, "viewedAt">) => {
    setRecentProducts(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id);
      
      // Add to beginning with timestamp
      const updated = [
        { ...product, viewedAt: Date.now() },
        ...filtered
      ].slice(0, MAX_ITEMS);
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage full or unavailable
      }
      
      return updated;
    });
  }, []);

  // Get products excluding a specific ID (useful to not show current product)
  const getRecentlyViewed = useCallback((excludeId?: number, limit = 4) => {
    return recentProducts
      .filter(p => p.id !== excludeId)
      .slice(0, limit);
  }, [recentProducts]);

  // Clear history
  const clearRecentlyViewed = useCallback(() => {
    setRecentProducts([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    recentProducts,
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed,
  };
};
