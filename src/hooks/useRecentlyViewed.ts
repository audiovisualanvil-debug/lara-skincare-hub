import { useState, useEffect, useCallback } from "react";

interface RecentProduct {
  id: string | number;
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

  const addToRecentlyViewed = useCallback((product: Omit<RecentProduct, "viewedAt">) => {
    setRecentProducts(prev => {
      const sid = String(product.id);
      const filtered = prev.filter(p => String(p.id) !== sid);
      
      const updated = [
        { ...product, viewedAt: Date.now() },
        ...filtered
      ].slice(0, MAX_ITEMS);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage full or unavailable
      }
      
      return updated;
    });
  }, []);

  const getRecentlyViewed = useCallback((excludeId?: string | number, limit = 4) => {
    const sid = excludeId != null ? String(excludeId) : undefined;
    return recentProducts
      .filter(p => String(p.id) !== sid)
      .slice(0, limit);
  }, [recentProducts]);

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
