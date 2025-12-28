import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Clock, TrendingUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";

const allProducts = [...allMezzoWithImages, ...allExtratosWithImages];

// Produtos populares (mais vendidos)
const popularProducts = allProducts.slice(0, 4);

// Buscas populares
const popularSearches = [
  "vitamina c",
  "hidratante",
  "protetor solar",
  "anti-idade",
  "clareador",
  "acne"
];

const SEARCH_HISTORY_KEY = "multti_search_history";
const MAX_HISTORY_ITEMS = 5;

interface SearchAutocompleteProps {
  className?: string;
  inputClassName?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchAutocomplete = ({ 
  className = "", 
  inputClassName = "",
  onSearch,
  placeholder = "Buscar produtos..."
}: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      try {
        setSearchHistory(JSON.parse(history));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  // Save search to history
  const saveToHistory = (searchTerm: string) => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return;
    
    const newHistory = [trimmed, ...searchHistory.filter(h => h !== trimmed)].slice(0, MAX_HISTORY_ITEMS);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  // Filter suggestions based on query
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    
    const searchTerm = query.toLowerCase().trim();
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category?.toLowerCase().includes(searchTerm)
    ).slice(0, 6);
    
    return results;
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        handleSearch();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          navigate(`/produto/${suggestions[selectedIndex].id}`);
          setIsOpen(false);
          setQuery("");
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      saveToHistory(query.trim());
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/loja?busca=${encodeURIComponent(query.trim())}`);
      }
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (productId: number) => {
    navigate(`/produto/${productId}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleQuickSearch = (term: string) => {
    saveToHistory(term);
    navigate(`/loja?busca=${encodeURIComponent(term)}`);
    setIsOpen(false);
    setQuery("");
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    navigate(`/loja?busca=${encodeURIComponent(term)}`);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showEmptyState = isOpen && query.length < 2;
  const showSuggestions = isOpen && query.length >= 2 && suggestions.length > 0;
  const showNoResults = isOpen && query.length >= 2 && suggestions.length === 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className={`w-full pl-10 pr-10 ${inputClassName}`}
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Empty State - Show history and popular */}
      {showEmptyState && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 overflow-hidden animate-scale-in">
          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <Clock className="h-3 w-3" />
                  Recentes
                </span>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Limpar
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchHistory.map((term, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleHistoryClick(term)}
                    className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="p-3 border-b border-border">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              <TrendingUp className="h-3 w-3" />
              Buscas populares
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((term, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickSearch(term)}
                  className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Products */}
          <div className="p-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              <Sparkles className="h-3 w-3" />
              Produtos em destaque
            </span>
            <div className="grid grid-cols-2 gap-2">
              {popularProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSuggestionClick(product.id)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded bg-background p-0.5"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-[10px] text-primary font-semibold">
                      {product.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 overflow-hidden animate-scale-in">
          <ul className="py-2">
            {suggestions.map((product, index) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(product.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    index === selectedIndex 
                      ? "bg-secondary" 
                      : "hover:bg-secondary/50"
                  }`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded-lg bg-secondary p-1"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Search className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {product.brand} · {product.category}
                    </p>
                  </div>
                  {product.price && (
                    <span className="font-heading text-sm font-semibold text-primary shrink-0">
                      {product.price}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Search all results */}
          <div className="border-t border-border">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full px-4 py-3 text-left font-body text-sm text-primary hover:bg-secondary/50 transition-colors flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Ver todos os resultados para "<span className="font-medium">{query}</span>"
            </button>
          </div>
        </div>
      )}

      {/* No results message */}
      {showNoResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 p-4 animate-scale-in">
          <p className="font-body text-sm text-muted-foreground text-center">
            Nenhum produto encontrado para "<span className="font-medium text-foreground">{query}</span>"
          </p>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full mt-3 py-2 font-body text-sm text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Buscar "{query}" na loja
          </button>
          
          {/* Suggest popular searches */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Tente buscar por:</p>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.slice(0, 4).map((term, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleQuickSearch(term)}
                  className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
