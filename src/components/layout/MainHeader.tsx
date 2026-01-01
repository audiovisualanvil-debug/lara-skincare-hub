import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Menu, X, ChevronDown, Heart, LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/hooks/useAuth";
import SearchAutocomplete from "@/components/shop/SearchAutocomplete";
import { toast } from "sonner";

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
    label: "Tulipia", 
    href: "/tulipia",
    hasMegaMenu: false,
    isHighlight: true 
  },
  { 
    label: "Quiz de Pele", 
    href: "/quiz-pele",
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
  const [showSearch, setShowSearch] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();
  const { totalFavorites } = useFavorites();
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Erro ao sair da conta");
    } else {
      toast.success("Você saiu da conta");
      navigate("/");
    }
  };

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
    <header className="fixed top-0 left-0 right-0 z-50" ref={megaMenuRef}>
      {/* Top Bar - Editorial Style */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container-editorial">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo - Editorial Typography */}
            <Link 
              to="/" 
              className="flex-shrink-0 group" 
              onClick={() => setActiveMegaMenu(null)}
            >
              <h1 className="font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight transition-colors group-hover:text-primary">
                Multti Med
              </h1>
              <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body mt-0.5">
                Dermocosméticos
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 text-sm font-body font-medium 
                    transition-all duration-300 relative
                    ${(item as any).isHighlight 
                      ? 'text-primary font-semibold' 
                      : activeMegaMenu === item.label 
                        ? 'text-primary' 
                        : 'text-foreground hover:text-primary'
                    }
                  `}
                >
                  <span className="editorial-underline">{item.label}</span>
                  {item.hasMegaMenu && (
                    <ChevronDown 
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${activeMegaMenu === item.label ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-accent/50"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Menu */}
              {!loading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 hover:bg-accent/50">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 bg-background/95 backdrop-blur-md border-border/50">
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Minha conta</p>
                        <p className="text-sm font-medium truncate mt-1">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 hover:bg-accent/50" asChild>
                    <Link to="/auth">
                      <User className="h-5 w-5" />
                    </Link>
                  </Button>
                )
              )}

              {/* Favorites Icon */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex h-10 w-10 hover:bg-accent/50" asChild>
                <Link to="/favoritos">
                  <Heart className="h-5 w-5" />
                  {totalFavorites > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center">
                      {totalFavorites > 9 ? "9+" : totalFavorites}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Cart Icon */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 hover:bg-accent/50" 
                onClick={openCart}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-[10px] font-semibold text-primary-foreground flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 hover:bg-accent/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Expandable */}
          {showSearch && (
            <div className="pb-4 animate-fade-up">
              <SearchAutocomplete 
                className="max-w-2xl mx-auto"
                inputClassName="h-12 bg-secondary/50 border border-border/50 focus-visible:ring-1 focus-visible:ring-primary font-body"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mega Menu - Editorial Style */}
      {activeMegaMenu && (
        <div className="hidden lg:block absolute left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border/50 shadow-dramatic animate-slide-down z-50">
          <div className="container-editorial py-10">
            {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu && (
              <div className="flex gap-16">
                {/* Subcategories Column */}
                <div className="w-64 flex-shrink-0">
                  <h3 className="font-display text-2xl font-medium text-foreground mb-6">
                    {activeMegaMenu}
                  </h3>
                  <div className="w-12 h-0.5 bg-primary mb-6" />
                  <ul className="space-y-1">
                    {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu?.subcategories.map((sub) => (
                      <li key={sub.label}>
                        <Link
                          to={sub.href}
                          onClick={() => setActiveMegaMenu(null)}
                          className={`
                            block py-2.5 font-body text-sm transition-all duration-300
                            ${sub.highlight 
                              ? 'font-semibold text-primary hover:translate-x-2' 
                              : 'text-muted-foreground hover:text-foreground hover:translate-x-2'
                            }
                          `}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Banner Cards - Editorial Layout */}
                <div className="flex-1 grid grid-cols-3 gap-6">
                  {menuItems.find(item => item.label === activeMegaMenu)?.megaMenu?.banners.map((banner, index) => (
                    <Link
                      key={index}
                      to={banner.href}
                      onClick={() => setActiveMegaMenu(null)}
                      className="group block img-editorial"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-secondary">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                          {banner.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-body mt-1">
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
        <nav className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border/50 animate-slide-down">
          <div className="container-editorial py-6 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-body text-base font-medium text-foreground py-3 border-b border-border/30 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Auth & Favorites */}
            <div className="pt-4 flex gap-4">
              {!loading && !user && (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-primary"
                >
                  <User className="h-4 w-4" />
                  Entrar
                </Link>
              )}
              <Link
                to="/favoritos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Heart className="h-4 w-4" />
                Favoritos ({totalFavorites})
              </Link>
            </div>
          </div>
        </nav>
      )}

      {/* Overlay when mega menu is open */}
      {activeMegaMenu && (
        <div 
          className="fixed inset-0 bg-espresso/10 backdrop-blur-sm z-[-1]"
          onClick={() => setActiveMegaMenu(null)}
        />
      )}
    </header>
  );
};

export default MainHeader;