import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CompareItem {
  id: string;
  name: string;
  brand: string;
  price?: string;
  image?: string;
  category?: string;
  description?: string;
  isProfessional?: boolean;
}

interface CompareContextType {
  compareItems: CompareItem[];
  addToCompare: (product: { id: string | number; name: string; brand: string; price?: string; image?: string; category?: string; description?: string; isProfessional?: boolean }) => boolean;
  removeFromCompare: (id: string | number) => void;
  clearCompare: () => void;
  isInCompare: (id: string | number) => boolean;
  canAddMore: boolean;
  isCompareBarVisible: boolean;
  showCompareBar: () => void;
  hideCompareBar: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>([]);
  const [isCompareBarVisible, setIsCompareBarVisible] = useState(false);

  useEffect(() => {
    if (compareItems.length > 0) {
      setIsCompareBarVisible(true);
    }
  }, [compareItems]);

  const addToCompare = (product: { id: string | number; name: string; brand: string; price?: string; image?: string; category?: string; description?: string; isProfessional?: boolean }): boolean => {
    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      return false;
    }
    const sid = String(product.id);
    if (compareItems.some(item => item.id === sid)) {
      return false;
    }
    setCompareItems(prev => [...prev, { ...product, id: sid }]);
    return true;
  };

  const removeFromCompare = (id: string | number) => {
    const sid = String(id);
    setCompareItems(prev => prev.filter(item => item.id !== sid));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareBarVisible(false);
  };

  const isInCompare = (id: string | number) => {
    const sid = String(id);
    return compareItems.some(item => item.id === sid);
  };

  const canAddMore = compareItems.length < MAX_COMPARE_ITEMS;

  const showCompareBar = () => setIsCompareBarVisible(true);
  const hideCompareBar = () => setIsCompareBarVisible(false);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore,
        isCompareBarVisible,
        showCompareBar,
        hideCompareBar,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
