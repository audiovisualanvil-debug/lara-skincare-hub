import { Link } from "react-router-dom";
import { Heart, ArrowRight, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
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

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof favorites[0]) => {
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

  return (
    <>
      <MainHeader />
      <main className="pt-[140px] lg:pt-[160px] min-h-screen bg-background">
        {/* Header */}
        <section className="bg-cream border-b border-detail/30">
          <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
              Meus Favoritos
            </h1>
            <p className="font-body text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? "produto salvo" : "produtos salvos"}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((item) => (
                  <div key={item.id} className="bg-card rounded-lg border border-border overflow-hidden group">
                    <Link to={`/produto/${item.id}`} className="block relative aspect-square overflow-hidden bg-secondary">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Heart className="w-12 h-12 text-detail" />
                        </div>
                      )}
                    </Link>

                    <div className="p-4">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                        {item.brand}
                      </p>
                      <Link to={`/produto/${item.id}`}>
                        <h3 className="font-heading text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem] hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mt-3">
                        <span className="font-heading text-base font-semibold text-foreground">
                          {item.price || "Consultar"}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button 
                          variant="gold"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Adicionar
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-detail text-muted-foreground hover:text-destructive hover:border-destructive"
                          onClick={() => {
                            removeFavorite(item.id);
                            toast.success("Produto removido dos favoritos");
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-cream/50 border border-detail/30 rounded-lg">
                <div className="max-w-sm mx-auto">
                  <Heart className="w-16 h-16 text-detail mx-auto mb-4" />
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    Sua lista está vazia
                  </h2>
                  <p className="font-body text-muted-foreground mb-6">
                    Adicione produtos aos favoritos para acompanhar e comprar depois
                  </p>
                  <Button variant="gold" asChild>
                    <Link to="/loja">
                      Explorar Produtos
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
};

export default Favorites;
