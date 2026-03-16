import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Menu, X, ChevronDown, Heart, LogOut, Search, Building2, ShieldCheck, UserCircle } from "lucide-react";
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
import { useAdminRole } from "@/hooks/useAdminRole";
import { useProfessionalStatus } from "@/hooks/useProfessionalStatus";
import { useBrandTheme } from "@/contexts/BrandThemeContext";
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
    label: "Promoções", 
    href: "/promocoes",
    hasMegaMenu: false,
    isHighlight: true,
  },
  { 
    label: "Lançamentos", 
    href: "/loja?filtro=lancamentos",
    hasMegaMenu: false 
  },
  { 
    label: "Nossas Marcas", 
    href: "/loja",
    hasMegaMenu: true,
    megaMenu: {
      subcategories: [
        { label: "Tulípia", href: "/tulipia", description: "Nanotecnologia Premium" },
        { label: "Mezzo", href: "/mezzo", description: "Alta Performance" },
        { label: "Extratos da Terra", href: "/extratos-da-terra", description: "Natureza & Ciência" },
        { label: "Smart GR", href: "/smart-gr", description: "Equipamentos Profissionais" },
        { label: "Ver todas as marcas", href: "/loja", highlight: true },
      ],
      banners: [
        {
          title: "Tulípia",
          subtitle: "Tecnologia nano encapsulada",
          image: niacineSerum,
          href: "/tulipia",
        },
        {
          title: "Mezzo",
          subtitle: "Exossomas e peptídeos",
          image: dermacosImmortalite,
          href: "/mezzo",
        },
        {
          title: "Extratos da Terra",
          subtitle: "Ingredientes naturais",
          image: hidrasolDermacos,
          href: "/extratos-da-terra",
        },
      ],
    },
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
    label: "Monte sua Rotina", 
    href: "/monte-sua-rotina",
    hasMegaMenu: false 
  },
  { 
    label: "FAQ", 
    href: "/faq",
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
  const { isAdmin } = useAdminRole();
  const { isProfessional, request: professionalRequest } = useProfessionalStatus();
  const { currentTheme, isOnBrandPage } = useBrandTheme();

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
      {/* Customer Type Selector - Prominent Bar */}
      <div className="bg-muted border-b border-border/30">
        <div className="container-editorial">
          <div className="flex items-center justify-center py-2">
            <div className="inline-flex rounded-full bg-background border border-border/50 p-1 shadow-sm">
              {isProfessional ? (
                // Already a professional - show active state
                <span className="px-4 py-1.5 text-xs md:text-sm font-body font-medium rounded-full bg-primary text-primary-foreground shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Profissional de estética
                </span>
              ) : (
                // Not a professional - link to login/register
                <button
                  onClick={() => {
                    if (!user) {
                      navigate("/auth");
                    } else if (!professionalRequest) {
                      navigate("/solicitar-cadastro-profissional");
                    } else {
                      toast.info("Sua solicitação está em análise");
                    }
                  }}
                  className="px-4 py-1.5 text-xs md:text-sm font-body font-medium rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  Profissional de estética
                </button>
              )}
              <span className={`px-4 py-1.5 text-xs md:text-sm font-body font-medium rounded-full transition-all duration-300 ${!isProfessional ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}>
                Skincare em casa
              </span>
            </div>
          </div>
        </div>
      </div>

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
                      <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 hover:bg-accent/50 relative">
                        <User className="h-5 w-5" />
                        {isProfessional && (
                          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border-border/50">
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Minha conta</p>
                        <p className="text-sm font-medium truncate mt-1">{user.email}</p>
                        {isProfessional && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                            <ShieldCheck className="w-3 h-3" />
                            Profissional
                          </span>
                        )}
                      </div>
                      <DropdownMenuSeparator className="bg-border/50" />
                      
                      {/* Professional Status */}
                      {!professionalRequest ? (
                        <DropdownMenuItem asChild>
                          <Link to="/solicitar-cadastro-profissional" className="cursor-pointer">
                            <Building2 className="h-4 w-4 mr-2" />
                            Cadastro Profissional
                          </Link>
                        </DropdownMenuItem>
                      ) : professionalRequest.status === "pending" ? (
                        <DropdownMenuItem asChild>
                          <Link to="/solicitar-cadastro-profissional" className="cursor-pointer text-yellow-600">
                            <Building2 className="h-4 w-4 mr-2" />
                            Solicitação em Análise
                          </Link>
                        </DropdownMenuItem>
                      ) : null}
                      
                      {/* Admin Panel */}
                      {isAdmin && (
                        <>
                          <DropdownMenuSeparator className="bg-border/50" />
                          <DropdownMenuItem asChild>
                            <Link to="/admin/dashboard" className="cursor-pointer text-primary">
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Dashboard Admin
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/admin/solicitacoes-profissionais" className="cursor-pointer text-primary/80">
                              <Building2 className="h-4 w-4 mr-2" />
                              Solicitações
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator className="bg-border/50" />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="primary" size="sm" className="hidden md:flex" asChild>
                    <Link to="/auth">
                      <UserCircle className="h-4 w-4 mr-2" />
                      Entrar
                    </Link>
                  </Button>
                )
              )}

              {/* Favorites Icon - Adaptive to brand theme */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex h-10 w-10 hover:bg-accent/50" asChild>
                <Link to="/favoritos">
                  <Heart 
                    className="h-5 w-5 brand-icon" 
                    style={{ color: isOnBrandPage ? currentTheme.cart.iconColor : undefined }}
                    strokeWidth={currentTheme.icon.strokeWidth}
                  />
                  {totalFavorites > 0 && (
                    <span 
                      className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full text-[10px] font-semibold flex items-center justify-center brand-badge"
                      style={{ 
                        backgroundColor: isOnBrandPage ? currentTheme.cart.badgeBg : 'hsl(var(--primary))',
                        color: isOnBrandPage ? currentTheme.cart.badgeText : 'hsl(var(--primary-foreground))',
                      }}
                    >
                      {totalFavorites > 9 ? "9+" : totalFavorites}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Cart Icon - Adaptive to brand theme */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 hover:bg-accent/50" 
                onClick={openCart}
              >
                <ShoppingBag 
                  className="h-5 w-5 brand-icon" 
                  style={{ color: isOnBrandPage ? currentTheme.cart.iconColor : undefined }}
                  strokeWidth={currentTheme.icon.strokeWidth}
                />
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full text-[10px] font-semibold flex items-center justify-center brand-badge"
                    style={{ 
                      backgroundColor: isOnBrandPage ? currentTheme.cart.badgeBg : 'hsl(var(--primary))',
                      color: isOnBrandPage ? currentTheme.cart.badgeText : 'hsl(var(--primary-foreground))',
                    }}
                  >
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
            {/* Admin Panel - Destaque no topo para admins */}
            {isAdmin && (
              <div className="mb-4 space-y-2">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 font-body text-base font-semibold text-primary py-3 px-4 bg-primary/10 rounded-lg border border-primary/20 transition-colors hover:bg-primary/20"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Dashboard Admin
                </Link>
                <Link
                  to="/admin/solicitacoes-profissionais"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 font-body text-sm text-primary/80 py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <Building2 className="h-4 w-4" />
                  Solicitações Profissionais
                </Link>
              </div>
            )}
            
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
            
            {/* Mobile Auth Section */}
            <div className="pt-6 space-y-3">
              {!loading && !user ? (
                <Button variant="primary" className="w-full" asChild>
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserCircle className="h-4 w-4 mr-2" />
                    Entrar ou Criar Conta
                  </Link>
                </Button>
              ) : user && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 px-4 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-body">Minha conta</p>
                      <p className="text-sm font-medium truncate mt-0.5">{user.email}</p>
                      {isProfessional && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 mt-1">
                          <ShieldCheck className="w-3 h-3" />
                          Profissional
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Professional Status */}
                  {!professionalRequest ? (
                    <Link
                      to="/solicitar-cadastro-profissional"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <Building2 className="h-4 w-4" />
                      Cadastro Profissional
                    </Link>
                  ) : professionalRequest.status === "pending" ? (
                    <div className="flex items-center gap-2 py-3 text-sm font-medium text-yellow-600">
                      <Building2 className="h-4 w-4" />
                      Solicitação em Análise
                    </div>
                  ) : null}
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair da Conta
                  </Button>
                </div>
              )}
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