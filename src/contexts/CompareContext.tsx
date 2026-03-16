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
  addToCompare: (product: CompareItem) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
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

  // Show compare bar when items are added
  useEffect(() => {
    if (compareItems.length > 0) {
      setIsCompareBarVisible(true);
    }
  }, [compareItems]);

  const addToCompare = (product: CompareItem): boolean => {
    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      return false;
    }
    if (compareItems.some(item => item.id === product.id)) {
      return false;
    }
    setCompareItems(prev => [...prev, product]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setIsCompareBarVisible(false);
  };

  const isInCompare = (id: string) => {
    return compareItems.some(item => item.id === id);
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
