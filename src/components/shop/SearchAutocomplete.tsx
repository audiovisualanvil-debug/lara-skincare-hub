import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { allMezzoWithImages } from "@/data/mezzoProductsWithImages";
import { allExtratosWithImages } from "@/data/extratosProductsWithImages";

const allProducts = [...allMezzoWithImages, ...allExtratosWithImages];

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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
    setIsOpen(value.length >= 2);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (productId: number) => {
    navigate(`/produto/${productId}`);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

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
          onFocus={() => query.length >= 2 && setIsOpen(true)}
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

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-detail rounded-lg shadow-lg z-50 overflow-hidden">
          <ul className="py-2">
            {suggestions.map((product, index) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(product.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    index === selectedIndex 
                      ? "bg-cream" 
                      : "hover:bg-cream/50"
                  }`}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded bg-cream p-1"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-cream rounded flex items-center justify-center">
                      <Search className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {product.brand}
                    </p>
                  </div>
                  {product.price && (
                    <span className="font-display text-sm font-semibold text-primary shrink-0">
                      {product.price}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Search all results */}
          <div className="border-t border-detail">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full px-4 py-3 text-left font-body text-sm text-primary hover:bg-cream/50 transition-colors"
            >
              Ver todos os resultados para "{query}"
            </button>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-detail rounded-lg shadow-lg z-50 p-4">
          <p className="font-body text-sm text-muted-foreground text-center">
            Nenhum produto encontrado para "{query}"
          </p>
          <button
            type="button"
            onClick={handleSearch}
            className="w-full mt-2 font-body text-sm text-primary hover:underline"
          >
            Buscar na loja
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;
