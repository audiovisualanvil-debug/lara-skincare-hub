import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FavoriteItem {
  id: string;
  name: string;
  brand: string;
  price?: string;
  image?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (product: { id: string | number; name: string; brand: string; price?: string; image?: string }) => void;
  removeFavorite: (id: string | number) => void;
  toggleFavorite: (product: { id: string | number; name: string; brand: string; price?: string; image?: string }) => void;
  isFavorite: (id: string | number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "dermostore-favorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error saving favorites to localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (product: { id: string | number; name: string; brand: string; price?: string; image?: string }) => {
    const sid = String(product.id);
    setFavorites((prev) => {
      if (prev.some((item) => item.id === sid)) {
        return prev;
      }
      return [...prev, { ...product, id: sid }];
    });
  };

  const removeFavorite = (id: string | number) => {
    const sid = String(id);
    setFavorites((prev) => prev.filter((item) => item.id !== sid));
  };

  const toggleFavorite = (product: { id: string | number; name: string; brand: string; price?: string; image?: string }) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const isFavorite = (id: string | number) => {
    const sid = String(id);
    return favorites.some((item) => item.id === sid);
  };

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        totalFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
