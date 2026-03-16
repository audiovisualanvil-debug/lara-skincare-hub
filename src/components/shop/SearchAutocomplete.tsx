import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, Clock, TrendingUp, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface SearchProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  image_url: string | null;
  category: string | null;
  slug: string;
}

const popularSearches = ["vitamina c", "hidratante", "protetor solar", "anti-idade", "clareador", "acne"];
const SEARCH_HISTORY_KEY = "multti_search_history";
const MAX_HISTORY_ITEMS = 5;

const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`;

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
  placeholder = "Buscar produtos...",
}: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);
  const [popularProducts, setPopularProducts] = useState<SearchProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Load search history
  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      try { setSearchHistory(JSON.parse(history)); } catch { setSearchHistory([]); }
    }
  }, []);

  // Load popular products once
  useEffect(() => {
    const fetchPopular = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, brand, price, image_url, category, slug")
        .eq("is_active", true)
        .limit(4);
      if (data) setPopularProducts(data);
    };
    fetchPopular();
  }, []);

  // Debounced search
  const searchProducts = useCallback(async (term: string) => {
    if (term.length < 2) { setSuggestions([]); return; }
    setSearching(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, brand, price, image_url, category, slug")
      .eq("is_active", true)
      .or(`name.ilike.%${term}%,brand.ilike.%${term}%,category.ilike.%${term}%`)
      .limit(6);
    setSuggestions(data || []);
    setSearching(false);
  }, []);

  const saveToHistory = (searchTerm: string) => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return;
    const newHistory = [trimmed, ...searchHistory.filter((h) => h !== trimmed)].slice(0, MAX_HISTORY_ITEMS);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) handleSearch();
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
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

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchProducts(value), 300);
  };

  const handleSuggestionClick = (productId: string) => {
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
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showEmptyState = isOpen && query.length < 2;
  const showSuggestions = isOpen && query.length >= 2 && suggestions.length > 0;
  const showNoResults = isOpen && query.length >= 2 && suggestions.length === 0 && !searching;

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
          <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Empty State */}
      {showEmptyState && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 overflow-hidden animate-scale-in">
          {searchHistory.length > 0 && (
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <Clock className="h-3 w-3" /> Recentes
                </span>
                <button type="button" onClick={clearHistory} className="text-xs text-muted-foreground hover:text-primary transition-colors">Limpar</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {searchHistory.map((term, index) => (
                  <button key={index} type="button" onClick={() => handleHistoryClick(term)} className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-b border-border">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              <TrendingUp className="h-3 w-3" /> Buscas populares
            </span>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((term, index) => (
                <button key={index} type="button" onClick={() => handleQuickSearch(term)} className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </div>

          {popularProducts.length > 0 && (
            <div className="p-3">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Produtos em destaque
              </span>
              <div className="grid grid-cols-2 gap-2">
                {popularProducts.map((product) => (
                  <button key={product.id} type="button" onClick={() => handleSuggestionClick(product.id)} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left">
                    {product.image_url && (
                      <img src={product.image_url} alt={product.name} className="w-10 h-10 object-contain rounded bg-background p-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-[10px] text-primary font-semibold">{formatPrice(product.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 overflow-hidden animate-scale-in">
          <ul className="py-2">
            {suggestions.map((product, index) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(product.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${index === selectedIndex ? "bg-secondary" : "hover:bg-secondary/50"}`}
                >
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-12 h-12 object-contain rounded-lg bg-secondary p-1" />
                  ) : (
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Search className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand} · {product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary shrink-0">{formatPrice(product.price)}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-border">
            <button type="button" onClick={handleSearch} className="w-full px-4 py-3 text-left text-sm text-primary hover:bg-secondary/50 transition-colors flex items-center gap-2">
              <Search className="h-4 w-4" />
              Ver todos os resultados para "<span className="font-medium">{query}</span>"
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {isOpen && query.length >= 2 && searching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 p-6 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      )}

      {/* No results */}
      {showNoResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-elevated z-50 p-4 animate-scale-in">
          <p className="text-sm text-muted-foreground text-center">
            Nenhum produto encontrado para "<span className="font-medium text-foreground">{query}</span>"
          </p>
          <button type="button" onClick={handleSearch} className="w-full mt-3 py-2 text-sm text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            Buscar "{query}" na loja
          </button>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Tente buscar por:</p>
            <div className="flex flex-wrap gap-1.5">
              {popularSearches.slice(0, 4).map((term, index) => (
                <button key={index} type="button" onClick={() => handleQuickSearch(term)} className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
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
