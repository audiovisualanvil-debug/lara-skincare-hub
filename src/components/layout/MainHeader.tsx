import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartDrawer from "@/components/shop/CartDrawer";

// Menu items with mega menu content
const menuItems = [
  { 
    label: "Ofertas", 
    href: "/shop?filtro=ofertas",
    hasMegaMenu: false 
  },
  { 
    label: "Lançamentos", 
    href: "/shop?filtro=lancamentos",
    hasMegaMenu: false 
  },
  { 
    label: "Categorias", 
    href: "/shop",
    hasMegaMenu: true,
    megaMenu: {
      subcategories: [
        { label: "Facial", href: "/shop?categoria=facial" },
        { label: "Corporal", href: "/shop?categoria=corpo" },
        { label: "Labial", href: "/shop?categoria=labial" },
        { label: "Área Íntima", href: "/shop?categoria=intima" },
        { label: "Área dos Olhos", href: "/shop?categoria=olhos" },
        { label: "Proteção Solar", href: "/shop?categoria=fotoprotecao" },
        { label: "Capilar", href: "/shop?categoria=capilar" },
        { label: "Ver todos os produtos", href: "/shop", highlight: true },
      ],
      banners: [
        {
          title: "Queridinhos de Hidratação",
          subtitle: "Para cuidar da pele no inverno",
          image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=300&fit=crop",
          href: "/shop?categoria=hidratacao",
        },
        {
          title: "Proteção Solar",
          subtitle: "Segurança durante todo o ano",
          image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop",
          href: "/shop?categoria=fotoprotecao",
        },
        {
          title: "Efeito Lifting Instantâneo",
          subtitle: "Com sérum facial anti-idade",
          image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
          href: "/shop?categoria=anti-idade",
        },
      ],
    },
  },
  { 
    label: "Tratamento", 
    href: "/shop?tipo=tratamento",
    hasMegaMenu: true,
    megaMenu: {
      subcategories: [
        { label: "Clareamento", href: "/shop?categoria=clareamento" },
        { label: "Anti-idade", href: "/shop?categoria=anti-idade" },
        { label: "Acne & Oleosidade", href: "/shop?categoria=acne" },
        { label: "Hidratação", href: "/shop?categoria=hidratacao" },
        { label: "Firmador", href: "/shop?categoria=corpo" },
        { label: "Antiqueda Capilar", href: "/shop?categoria=capilar" },
        { label: "Ver todos", href: "/shop", highlight: true },
      ],
      banners: [
        {
          title: "Clareamento de Manchas",
          subtitle: "Resultados visíveis em semanas",
          image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop",
          href: "/shop?categoria=clareamento",
        },
        {
          title: "Controle de Acne",
          subtitle: "Pele limpa e equilibrada",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
          href: "/shop?categoria=acne",
        },
        {
          title: "Rejuvenescimento",
          subtitle: "Firmeza e redução de rugas",
          image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=300&fit=crop",
          href: "/shop?categoria=anti-idade",
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?busca=${encodeURIComponent(searchQuery)}`);
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
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>
            </form>

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

              {/* User Icon */}
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>

              {/* Cart Icon with Drawer */}
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md p-0">
                  <CartDrawer onClose={() => setIsCartOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-10 bg-secondary border-0"
              />
            </div>
          </form>
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