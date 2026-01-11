import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchAutocomplete from "@/components/shop/SearchAutocomplete";

const MobileBottomNav = () => {
  const location = useLocation();
  const { totalItems, openCart } = useCart();
  const { totalFavorites } = useFavorites();
  const { currentTheme, isOnBrandPage } = useBrandTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Início", href: "/", isLink: true },
    { icon: Search, label: "Buscar", href: "#", isLink: false, action: "search" },
    { icon: Heart, label: "Favoritos", href: "/favoritos", isLink: true, badge: totalFavorites },
    { icon: ShoppingBag, label: "Carrinho", href: "#", isLink: false, action: "cart", badge: totalItems },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleAction = (action?: string) => {
    if (action === "cart") {
      openCart();
    } else if (action === "search") {
      setSearchOpen(true);
    }
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isLink && isActive(item.href);

            if (item.isLink) {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div className="relative">
                    <Icon 
                      className={`h-5 w-5 brand-icon ${active ? "stroke-[2.5]" : ""}`}
                      style={{ color: active && isOnBrandPage ? currentTheme.cart.iconColor : undefined }}
                      strokeWidth={currentTheme.icon.strokeWidth}
                    />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span 
                        className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center brand-badge"
                        style={{ 
                          backgroundColor: isOnBrandPage ? currentTheme.cart.badgeBg : 'hsl(var(--primary))',
                          color: isOnBrandPage ? currentTheme.cart.badgeText : 'hsl(var(--primary-foreground))',
                        }}
                      >
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium ${active ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => handleAction(item.action)}
                className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground active:text-primary transition-colors"
              >
                <div className="relative">
                  <Icon 
                    className="h-5 w-5 brand-icon" 
                    style={{ color: isOnBrandPage ? currentTheme.cart.iconColor : undefined }}
                    strokeWidth={currentTheme.icon.strokeWidth}
                  />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center brand-badge"
                      style={{ 
                        backgroundColor: isOnBrandPage ? currentTheme.cart.badgeBg : 'hsl(var(--primary))',
                        color: isOnBrandPage ? currentTheme.cart.badgeText : 'hsl(var(--primary-foreground))',
                      }}
                    >
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Search Sheet */}
      <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl px-0">
          <div className="p-4 border-b border-border">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
            <h2 className="font-heading text-lg font-semibold text-center mb-4">Buscar produtos</h2>
            <SearchAutocomplete 
              inputClassName="h-12 text-base"
              onSearch={() => setSearchOpen(false)}
            />
          </div>
          <div className="p-4 overflow-y-auto">
            <p className="text-xs text-muted-foreground text-center">
              Clique no campo acima para buscar
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Spacer to prevent content from being hidden behind the nav */}
      <div className="h-16 md:hidden" />
    </>
  );
};

export default MobileBottomNav;
