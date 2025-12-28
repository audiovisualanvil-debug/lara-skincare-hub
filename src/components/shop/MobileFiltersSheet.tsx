import { useState } from "react";
import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterOption {
  name: string;
  slug: string;
}

interface PriceRange {
  name: string;
  min: number;
  max: number;
}

interface MobileFiltersSheetProps {
  // Filter options
  skinObjectives: FilterOption[];
  productTypes: FilterOption[];
  brands: FilterOption[];
  usageTypes: FilterOption[];
  priceRanges: PriceRange[];
  
  // Selected values
  selectedObjectives: string[];
  selectedProductTypes: string[];
  selectedBrands: string[];
  selectedUsageTypes: string[];
  selectedPriceRanges: number[];
  
  // Handlers
  setSelectedObjectives: (val: string[]) => void;
  setSelectedProductTypes: (val: string[]) => void;
  setSelectedBrands: (val: string[]) => void;
  setSelectedUsageTypes: (val: string[]) => void;
  setSelectedPriceRanges: (val: number[]) => void;
  
  // Results count
  resultsCount: number;
  
  // Clear filters
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const MobileFiltersSheet = ({
  skinObjectives,
  productTypes,
  brands,
  usageTypes,
  priceRanges,
  selectedObjectives,
  selectedProductTypes,
  selectedBrands,
  selectedUsageTypes,
  selectedPriceRanges,
  setSelectedObjectives,
  setSelectedProductTypes,
  setSelectedBrands,
  setSelectedUsageTypes,
  setSelectedPriceRanges,
  resultsCount,
  onClearFilters,
  hasActiveFilters,
}: MobileFiltersSheetProps) => {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    objectives: true,
    productTypes: false,
    brands: false,
    usageTypes: false,
    price: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (value: string, state: string[], setState: (val: string[]) => void) => {
    setState(state.includes(value) ? state.filter(v => v !== value) : [...state, value]);
  };

  const activeFiltersCount = 
    selectedObjectives.length + 
    selectedProductTypes.length + 
    selectedBrands.length + 
    selectedUsageTypes.length + 
    selectedPriceRanges.length;

  // Filter section component
  const FilterSection = ({ 
    title, 
    sectionKey,
    children 
  }: { 
    title: string; 
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border">
      <button 
        onClick={() => toggleSection(sectionKey)} 
        className="flex items-center justify-between w-full py-4 px-1"
      >
        <h3 className="font-heading text-sm font-semibold text-foreground">
          {title}
        </h3>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
            expandedSections[sectionKey] ? "rotate-180" : ""
          }`} 
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        expandedSections[sectionKey] ? "max-h-[500px] pb-4" : "max-h-0"
      }`}>
        <div className="space-y-1 px-1">{children}</div>
      </div>
    </div>
  );

  // Checkbox item component
  const CheckboxItem = ({ 
    label, 
    checked, 
    onChange,
  }: { 
    label: string; 
    checked: boolean; 
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer group py-2.5 px-3 rounded-lg hover:bg-secondary transition-colors">
      <Checkbox 
        checked={checked} 
        onCheckedChange={onChange}
        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary h-5 w-5"
      />
      <span className="font-body text-sm text-foreground group-hover:text-foreground transition-colors flex-1">
        {label}
      </span>
      {checked && (
        <span className="w-2 h-2 rounded-full bg-primary" />
      )}
    </label>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-border gap-2 h-10"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-[10px] font-bold">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="bottom" 
        className="h-[85vh] rounded-t-2xl px-0 flex flex-col"
      >
        {/* Header */}
        <div className="px-4 pb-4 border-b border-border">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <SheetTitle className="font-heading text-lg">
              Filtrar produtos
            </SheetTitle>
            {hasActiveFilters && (
              <button 
                onClick={onClearFilters}
                className="font-body text-sm text-primary hover:underline"
              >
                Limpar tudo
              </button>
            )}
          </div>
          
          {/* Active filters preview */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedObjectives.map(slug => {
                const item = skinObjectives.find(o => o.slug === slug);
                return item ? (
                  <Badge 
                    key={slug} 
                    variant="secondary" 
                    className="gap-1 pr-1"
                  >
                    {item.name}
                    <button 
                      onClick={() => toggleFilter(slug, selectedObjectives, setSelectedObjectives)}
                      className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
              {selectedBrands.map(slug => {
                const item = brands.find(b => b.slug === slug);
                return item ? (
                  <Badge 
                    key={slug} 
                    variant="secondary" 
                    className="gap-1 pr-1"
                  >
                    {item.name}
                    <button 
                      onClick={() => toggleFilter(slug, selectedBrands, setSelectedBrands)}
                      className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
              {selectedProductTypes.map(slug => {
                const item = productTypes.find(t => t.slug === slug);
                return item ? (
                  <Badge 
                    key={slug} 
                    variant="secondary" 
                    className="gap-1 pr-1"
                  >
                    {item.name}
                    <button 
                      onClick={() => toggleFilter(slug, selectedProductTypes, setSelectedProductTypes)}
                      className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          )}
        </div>

        {/* Scrollable filter sections */}
        <ScrollArea className="flex-1 px-4">
          <div className="py-2">
            {/* Objetivo */}
            <FilterSection title="Objetivo" sectionKey="objectives">
              {skinObjectives.map((item) => (
                <CheckboxItem
                  key={item.slug}
                  label={item.name}
                  checked={selectedObjectives.includes(item.slug)}
                  onChange={() => toggleFilter(item.slug, selectedObjectives, setSelectedObjectives)}
                />
              ))}
            </FilterSection>

            {/* Tipo de Produto */}
            <FilterSection title="Tipo de Produto" sectionKey="productTypes">
              {productTypes.map((item) => (
                <CheckboxItem
                  key={item.slug}
                  label={item.name}
                  checked={selectedProductTypes.includes(item.slug)}
                  onChange={() => toggleFilter(item.slug, selectedProductTypes, setSelectedProductTypes)}
                />
              ))}
            </FilterSection>

            {/* Marca */}
            <FilterSection title="Marca" sectionKey="brands">
              {brands.map((item) => (
                <CheckboxItem
                  key={item.slug}
                  label={item.name}
                  checked={selectedBrands.includes(item.slug)}
                  onChange={() => toggleFilter(item.slug, selectedBrands, setSelectedBrands)}
                />
              ))}
            </FilterSection>

            {/* Tipo de Uso */}
            <FilterSection title="Tipo de Uso" sectionKey="usageTypes">
              {usageTypes.map((item) => (
                <CheckboxItem
                  key={item.slug}
                  label={item.name}
                  checked={selectedUsageTypes.includes(item.slug)}
                  onChange={() => toggleFilter(item.slug, selectedUsageTypes, setSelectedUsageTypes)}
                />
              ))}
            </FilterSection>

            {/* Faixa de Preço */}
            <FilterSection title="Faixa de Preço" sectionKey="price">
              {priceRanges.map((range, index) => (
                <CheckboxItem
                  key={index}
                  label={range.name}
                  checked={selectedPriceRanges.includes(index)}
                  onChange={() => {
                    setSelectedPriceRanges(
                      selectedPriceRanges.includes(index) 
                        ? selectedPriceRanges.filter(i => i !== index) 
                        : [...selectedPriceRanges, index]
                    );
                  }}
                />
              ))}
            </FilterSection>
          </div>
        </ScrollArea>

        {/* Footer with CTA */}
        <div className="p-4 border-t border-border bg-background safe-area-bottom">
          <Button 
            variant="gold" 
            className="w-full h-12 text-base font-heading font-semibold" 
            onClick={() => setOpen(false)}
          >
            Ver {resultsCount} resultado{resultsCount !== 1 ? "s" : ""}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFiltersSheet;
