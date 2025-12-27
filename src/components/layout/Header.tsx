import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Instagram, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Monte sua Rotina", href: "/monte-sua-rotina" },
    { name: "Consultoria de Pele", href: "/consultoria" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => location.pathname === href;
  const isShopActive = location.pathname.startsWith("/loja");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-display text-xl lg:text-2xl font-semibold text-foreground tracking-wide">
              Multti Med <span className="font-script text-primary text-2xl lg:text-3xl">cosméticos</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-body text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground/70"
              }`}
            >
              Início
            </Link>

            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`font-body text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary flex items-center gap-1 ${
                    isShopActive ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  Loja
                  <ChevronDown className="w-4 h-4 stroke-[1.5]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 bg-card border-border">
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
                className={`font-body text-sm font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary ${
                  isActive(item.href) ? "text-primary" : "text-foreground/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5 stroke-[1.5]" />
            </a>
            <Button variant="elegant" size="sm" asChild>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-body text-base font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-foreground/70"
                }`}
              >
                Início
              </Link>

              {/* Mobile Shop Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                  className={`font-body text-base font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary flex items-center gap-2 w-full ${
                    isShopActive ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  Loja
                  <ChevronDown className={`w-4 h-4 stroke-[1.5] transition-transform ${isMobileShopOpen ? "rotate-180" : ""}`} />
                </button>
                {isMobileShopOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/loja"
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-body text-sm font-medium text-foreground hover:text-primary"
                    >
                      Ver Todos
                    </Link>
                    {shopCategories.map((category) => (
                      <Link
                        key={category.slug}
                        to={`/loja?categoria=${category.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-body text-sm text-foreground/70 hover:text-primary"
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
                  className={`font-body text-base font-medium uppercase tracking-widest transition-colors duration-300 hover:text-primary ${
                    isActive(item.href) ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5 stroke-[1.5]" />
                </a>
                <Button variant="elegant" size="sm" asChild>
                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 stroke-[1.5]" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
