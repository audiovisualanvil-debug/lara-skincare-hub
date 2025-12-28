import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Menu, X, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import SearchAutocomplete from "@/components/shop/SearchAutocomplete";

// Import product images
import niacineSerum from "@/assets/products/niacine-serum.jpg";
import dermacosImmortalite from "@/assets/products/dermacos-immortalite.jpg";
import blackSecretHydrogen from "@/assets/products/black-secret-hydrogen.jpg";
import hidrasolDermacos from "@/assets/products/hidrasol-dermacos.jpg";

// Menu items with mega menu content
const menuItems = [
  { 
    label: "Ofertas", 
    href: "/loja?filtro=ofertas",
    hasMegaMenu: false 
  },
  { 
    label: "Lançamentos", 
    href: "/loja?filtro=lancamentos",
    hasMegaMenu: false 
  },
  { 
    label: "Categorias", 
    href: "/loja",
    hasMegaMenu: true,
    megaMenu: {
      subcategories: [
        { label: "Facial", href: "/loja?categoria=facial" },
        { label: "Corporal", href: "/loja?categoria=corpo" },
        { label: "Labial", href: "/loja?categoria=labial" },
        { label: "Área Íntima", href: "/loja?categoria=intima" },
        { label: "Área dos Olhos", href: "/loja?categoria=olhos" },
        { label: "Proteção Solar", href: "/loja?categoria=fotoprotecao" },
        { label: "Capilar", href: "/loja?categoria=capilar" },
        { label: "Ver todos os produtos", href: "/loja", highlight: true },
      ],
      banners: [
        {
          title: "Niacine+ Sérum",
          subtitle: "Controle de poros e uniformização",
          image: niacineSerum,
          href: "/loja?categoria=hidratacao",
        },
        {
          title: "Hidrasol Proteção",
          subtitle: "FPS 30 e 60 para todos os dias",
          image: hidrasolDermacos,
          href: "/loja?categoria=fotoprotecao",
        },
        {
          title: "Dermacos & Immortalité",
          subtitle: "Boosters rejuvenescedores",
          image: dermacosImmortalite,
          href: "/loja?categoria=anti-idade",
        },
      ],
    },
  },
  { 
    label: "Tratamento", 
    href: "/loja?tipo=tratamento",
    hasMegaMenu: true,
    megaMenu: {
      subcategories: [
        { label: "Clareamento", href: "/loja?categoria=clareamento" },
        { label: "Anti-idade", href: "/loja?categoria=anti-idade" },
        { label: "Acne & Oleosidade", href: "/loja?categoria=acne-oleosidade" },
        { label: "Hidratação", href: "/loja?categoria=hidratacao-reparacao" },
        { label: "Firmador", href: "/loja?categoria=corpo" },
        { label: "Antiqueda Capilar", href: "/loja?categoria=capilar" },
        { label: "Ver todos", href: "/loja", highlight: true },
      ],
      banners: [
        {
          title: "Black Secret",
          subtitle: "Clareador concentrado potente",
          image: blackSecretHydrogen,
          href: "/loja?categoria=clareamento",
        },
        {
          title: "Hidrasol FPS",
          subtitle: "Proteção solar diária",
          image: hidrasolDermacos,
          href: "/loja?categoria=fotoprotecao",
        },
        {
          title: "Dermacos Booster",
          subtitle: "Rejuvenescimento intensivo",
          image: dermacosImmortalite,
          href: "/loja?categoria=anti-idade",
        },
      ],
    },
  },
  { 
    label: "Passos da Rotina", 
    href: "/monte-sua-rotina",
    hasMegaMenu: false 
  },
  { 
    label: "Tipos de Pele", 
    href: "/shop?filtro=tipo-pele",
    hasMegaMenu: false 
  },
  { 
    label: "Monte sua Rotina", 
    href: "/monte-sua-rotina",
    hasMegaMenu: false 
  },
];

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { totalFavorites } = useFavorites();

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.hasMegaMenu) {
      setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label);
    } else {
      setActiveMegaMenu(null);
      navigate(item.href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background" ref={megaMenuRef}>
      {/* Top Bar */}
      <div className="border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" onClick={() => setActiveMegaMenu(null)}>
              <h1 className="font-heading text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Multti Med
              </h1>
            </Link>

            {/* Search Bar - Desktop */}
            <SearchAutocomplete 
              className="hidden md:block flex-1 max-w-md mx-8"
              inputClassName="h-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
            />

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              {/* Favorites Icon */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex" asChild>
                <Link to="/favoritos">
                  <Heart className="h-5 w-5" />
                  {totalFavorites > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      {totalFavorites > 9 ? "9+" : totalFavorites}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Cart Icon */}
              <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <SearchAutocomplete 
              inputClassName="h-10 bg-secondary border-0"
            />
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:block border-b border-border bg-background">
        <div className="container">
          <ul className="flex items-center justify-center gap-1 h-12">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`
                    flex items-center gap-1 px-4 py-2 font-heading text-sm font-medium 
                    transition-colors rounded-md
                    ${activeMegaMenu === item.label 
                      ? 'text-primary bg-secondary' 
                      : 'text-foreground hover:text-primary hover:bg-secondary/50'
                    }
                  `}
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${activeMegaMenu === item.label ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mega Menu */}
      {activeMegaMenu && (
        <div className="hidden md:block absolute left-0 right-0 bg-background border-b border-border shadow-elevated animate-slide-down z-50">
          <div className="container py-8">
            {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu && (
              <div className="flex gap-10">
                {/* Subcategories Column */}
                <div className="w-56 flex-shrink-0">
                  <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    {activeMegaMenu}
                  </h3>
                  <ul className="space-y-1">
                    {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu?.subcategories.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          to={sub.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className={`
                            block py-2 px-3 rounded-md font-heading text-sm transition-colors
                            ${sub.highlight 
                              ? 'font-semibold text-primary hover:bg-primary/10' 
                              : 'text-foreground hover:bg-secondary hover:text-primary'
                            }
                          `}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Banner Cards */}
                <div className="flex-1 grid grid-cols-3 gap-4">
                  {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu?.banners.map((banner, index) => (
                    <Link
                      key={index}
                      to={banner.href}
                      onClick={() => setActiveMegaMenu(null)}
                      className="group block rounded-lg overflow-hidden bg-secondary hover-lift"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-heading text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {banner.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {banner.subtitle}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-b border-border bg-background animate-slide-down">
          <ul className="container py-4 space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-heading text-sm font-medium text-foreground py-3 px-2 rounded-md transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Overlay when mega menu is open */}
      {activeMegaMenu && (
        <div 
          className="fixed inset-0 bg-charcoal/20 z-[-1]"
          onClick={() => setActiveMegaMenu(null)}
        />
      )}
    </header>
  );
};

export default MainHeader;