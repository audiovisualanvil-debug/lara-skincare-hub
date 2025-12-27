import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram, Search, ShoppingBag, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const shopCategories = [
  { name: "Manchas e Melasma", slug: "manchas-melasma" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade" },
  { name: "Anti-idade / Rejuvenescimento", slug: "anti-idade" },
  { name: "Hidratação e Reparação", slug: "hidratacao-reparacao" },
  { name: "Vitamina C", slug: "vitamina-c" },
  { name: "Área dos Olhos", slug: "area-olhos" },
  { name: "Corpo", slug: "corpo" },
  { name: "Capilar", slug: "capilar" },
  { name: "Fotoproteção", slug: "fotoprotecao" },
  { name: "Profissional", slug: "profissional" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Monte sua Rotina", href: "/monte-sua-rotina" },
    { name: "Consultoria", href: "/consultoria" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isShopActive = location.pathname.startsWith("/loja");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      {/* Top bar - Promo */}
      <div className="bg-charcoal text-pearl py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-xs tracking-wide">
            Frete grátis para compras acima de R$ 299 | Parcele em até 3x sem juros
          </p>
        </div>
      </div>

      {/* Main header */}
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <span className="font-display text-lg lg:text-xl font-semibold text-foreground tracking-wide">
              MULTTI MED
            </span>
            <span className="font-script text-primary text-xl lg:text-2xl ml-1">cosméticos</span>
          </Link>

          {/* Center - Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 h-10 w-full font-body text-sm border-border bg-background"
              />
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Mobile Search Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </a>

            {/* Cart */}
            <button className="p-2 text-foreground/70 hover:text-primary transition-colors relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden py-3 border-t border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground stroke-[1.5]" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="pl-10 pr-4 h-10 w-full font-body text-sm border-border"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center gap-8 h-12 border-t border-border">
          <Link
            to="/"
            className={`font-body text-xs font-medium uppercase tracking-widest transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground/70"
            }`}
          >
            Início
          </Link>

          {/* Shop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`font-body text-xs font-medium uppercase tracking-widest transition-colors hover:text-primary flex items-center gap-1 ${
                  isShopActive ? "text-primary" : "text-foreground/70"
                }`}
              >
                Loja
                <ChevronDown className="w-3 h-3 stroke-[1.5]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-56 bg-card border-border">
              <DropdownMenuItem asChild>
                <Link
                  to="/loja"
                  className="font-body text-sm font-medium text-foreground hover:text-primary cursor-pointer"
                >
                  Ver Todos os Produtos
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-border my-1" />
              {shopCategories.map((category) => (
                <DropdownMenuItem key={category.slug} asChild>
                  <Link
                    to={`/loja?categoria=${category.slug}`}
                    className="font-body text-sm text-foreground/70 hover:text-primary cursor-pointer"
                  >
                    {category.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navigation.slice(1).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`font-body text-xs font-medium uppercase tracking-widest transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-foreground/70"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-down">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block font-body text-sm font-medium uppercase tracking-widest py-2 ${
                isActive("/") ? "text-primary" : "text-foreground/70"
              }`}
            >
              Início
            </Link>

            {/* Mobile Shop Accordion */}
            <div>
              <button
                onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                className={`flex items-center justify-between w-full font-body text-sm font-medium uppercase tracking-widest py-2 ${
                  isShopActive ? "text-primary" : "text-foreground/70"
                }`}
              >
                Loja
                <ChevronDown className={`w-4 h-4 stroke-[1.5] transition-transform ${isMobileShopOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileShopOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                  <Link
                    to="/loja"
                    onClick={() => setIsMenuOpen(false)}
                    className="block font-body text-sm py-1.5 text-foreground hover:text-primary"
                  >
                    Ver Todos
                  </Link>
                  {shopCategories.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/loja?categoria=${category.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-body text-sm py-1.5 text-foreground/70 hover:text-primary"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-body text-sm font-medium uppercase tracking-widest py-2 ${
                  isActive(item.href) ? "text-primary" : "text-foreground/70"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-border">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-foreground/70 hover:text-primary py-2"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
                @multtimed
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
