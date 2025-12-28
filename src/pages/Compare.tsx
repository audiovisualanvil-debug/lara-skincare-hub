import { Link } from "react-router-dom";
import { ArrowLeft, Check, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { useCart } from "@/contexts/CartContext";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { toast } from "sonner";

// Helper to extract numeric price from string
const extractPrice = (priceStr?: string): number | null => {
  if (!priceStr || priceStr === "Consultar") return null;
  const match = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  return parseFloat(match) || null;
};

// Comparison attributes
const comparisonAttributes = [
  { key: "brand", label: "Marca" },
  { key: "category", label: "Categoria" },
  { key: "price", label: "Preço" },
  { key: "isProfessional", label: "Uso Profissional" },
  { key: "description", label: "Descrição" },
];

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof compareItems[0]) => {
    const price = extractPrice(item.price);
    if (price === null) {
      toast.error("Este produto não está disponível para compra online.");
      return;
    }
    addItem({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: price,
      image: item.image,
    });
    toast.success(`${item.name} adicionado ao carrinho!`);
  };

  const renderValue = (item: typeof compareItems[0], key: string) => {
    switch (key) {
      case "brand":
        return item.brand;
      case "category":
        return item.category || "-";
      case "price":
        return item.price || "Consultar";
      case "isProfessional":
        return item.isProfessional ? (
          <Check className="w-5 h-5 text-primary mx-auto" />
        ) : (
          <X className="w-5 h-5 text-muted-foreground mx-auto" />
        );
      case "description":
        return item.description || "-";
      default:
        return "-";
    }
  };

  return (
    <>
      <MainHeader />
      <main className="pt-[140px] lg:pt-[160px] min-h-screen bg-background">
        {/* Header */}
        <section className="bg-cream border-b border-detail/30">
          <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <Link to="/loja" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4" />
              Voltar para a loja
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Comparar Produtos
            </h1>
            <p className="font-body text-muted-foreground">
              Compare até 3 produtos lado a lado
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {compareItems.length < 2 ? (
              <div className="text-center py-20 bg-cream/50 border border-detail/30 rounded-lg">
                <div className="max-w-sm mx-auto">
                  <Scale className="w-16 h-16 text-detail mx-auto mb-4" />
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    Adicione produtos para comparar
                  </h2>
                  <p className="font-body text-muted-foreground mb-6">
                    Selecione pelo menos 2 produtos na loja para compará-los
                  </p>
                  <Button variant="gold" asChild>
                    <Link to="/loja">Ir para a Loja</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Action bar */}
                <div className="flex justify-end mb-6">
                  <Button variant="outline" size="sm" onClick={clearCompare}>
                    Limpar comparação
                  </Button>
                </div>

                {/* Comparison table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    {/* Product headers */}
                    <thead>
                      <tr>
                        <th className="w-48 p-4 text-left font-display text-sm font-medium text-muted-foreground bg-cream border border-detail/30">
                          Produto
                        </th>
                        {compareItems.map((item) => (
                          <th key={item.id} className="p-4 text-center bg-cream border border-detail/30 min-w-[200px]">
                            <div className="relative">
                              <button
                                onClick={() => removeFromCompare(item.id)}
                                className="absolute -top-2 -right-2 p-1 bg-background border border-detail rounded-full hover:bg-cream"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-24 h-24 object-contain mx-auto mb-3"
                                />
                              )}
                              <Link 
                                to={`/produto/${item.id}`}
                                className="font-display text-sm font-medium text-foreground hover:text-primary line-clamp-2"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </th>
                        ))}
                        {/* Empty columns for missing products */}
                        {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                          <th key={`empty-${i}`} className="p-4 bg-cream/50 border border-detail/30 min-w-[200px]">
                            <div className="h-32 flex items-center justify-center">
                              <span className="font-body text-sm text-muted-foreground">-</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Comparison rows */}
                    <tbody>
                      {comparisonAttributes.map((attr) => (
                        <tr key={attr.key}>
                          <td className="p-4 font-display text-sm font-medium text-foreground bg-cream/50 border border-detail/30">
                            {attr.label}
                          </td>
                          {compareItems.map((item) => (
                            <td key={item.id} className="p-4 text-center font-body text-sm text-foreground border border-detail/30">
                              {renderValue(item, attr.key)}
                            </td>
                          ))}
                          {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                            <td key={`empty-${i}`} className="p-4 text-center border border-detail/30">
                              <span className="text-muted-foreground">-</span>
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Add to cart row */}
                      <tr>
                        <td className="p-4 font-display text-sm font-medium text-foreground bg-cream/50 border border-detail/30">
                          Ação
                        </td>
                        {compareItems.map((item) => (
                          <td key={item.id} className="p-4 text-center border border-detail/30">
                            <Button
                              variant="gold"
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                            >
                              Adicionar ao Carrinho
                            </Button>
                          </td>
                        ))}
                        {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
                          <td key={`empty-${i}`} className="p-4 text-center border border-detail/30">
                            <span className="text-muted-foreground">-</span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
};

export default Compare;
