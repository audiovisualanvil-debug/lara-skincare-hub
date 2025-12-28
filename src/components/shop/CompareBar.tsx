import { Link } from "react-router-dom";
import { X, ArrowRight, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";

const CompareBar = () => {
  const { compareItems, removeFromCompare, clearCompare, isCompareBarVisible, hideCompareBar } = useCompare();

  if (!isCompareBarVisible || compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-detail shadow-lg z-40 animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Products */}
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 shrink-0">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-display text-sm font-medium text-foreground">
                Comparar ({compareItems.length}/3)
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {compareItems.map((item) => (
                <div key={item.id} className="relative flex items-center gap-2 px-3 py-2 bg-cream border border-detail/50 rounded-lg shrink-0">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded" />
                  )}
                  <div className="max-w-[120px]">
                    <p className="font-body text-xs font-medium text-foreground truncate">{item.name}</p>
                    <p className="font-body text-[10px] text-muted-foreground">{item.brand}</p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(item.id)}
                    className="p-1 hover:bg-detail/50 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                <div key={`empty-${i}`} className="w-[180px] h-[54px] border-2 border-dashed border-detail/50 rounded-lg flex items-center justify-center shrink-0">
                  <span className="font-body text-xs text-muted-foreground">Adicionar produto</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompare}
              className="text-muted-foreground"
            >
              Limpar
            </Button>
            <Button
              variant="gold"
              size="sm"
              disabled={compareItems.length < 2}
              asChild
            >
              <Link to="/comparar">
                Comparar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={hideCompareBar}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
