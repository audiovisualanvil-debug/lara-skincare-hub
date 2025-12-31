import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="container-editorial section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="font-display text-2xl font-semibold text-background tracking-tight">
                Multti Med
              </h3>
            </Link>
            <p className="mt-4 font-body text-sm text-background/60 leading-relaxed max-w-xs">
              Dermocosméticos de alta performance para profissionais e pacientes que buscam resultados reais e duradouros.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-background/20 text-background/60 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-background/20 text-background/60 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-background/40 mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Produtos", href: "/shop" },
                { label: "Monte sua Rotina", href: "/monte-sua-rotina" },
                { label: "Sobre Nós", href: "/sobre" },
                { label: "Consultoria", href: "/consultoria" },
                { label: "Contato", href: "/contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="font-body text-sm text-background/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-background/40 mb-6">
              Categorias
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Clareamento", href: "/shop?categoria=clareamento" },
                { label: "Anti-idade", href: "/shop?categoria=anti-idade" },
                { label: "Acne", href: "/shop?categoria=acne-oleosidade" },
                { label: "Hidratação", href: "/shop?categoria=hidratacao" },
                { label: "Proteção Solar", href: "/shop?categoria=fotoprotecao" },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="font-body text-sm text-background/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-background/40 mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-background/60">(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-background/60">contato@multtimed.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-background/60">São Paulo, SP</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-background/40 mb-4">
                Pagamento Seguro
              </p>
              <div className="flex gap-2">
                {["PIX", "Visa", "Master", "Elo"].map((method) => (
                  <div 
                    key={method}
                    className="h-8 px-3 flex items-center justify-center border border-background/20 text-xs font-body text-background/50"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-background/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h4 className="font-display text-lg text-background">
                Receba novidades e ofertas exclusivas
              </h4>
              <p className="font-body text-sm text-background/50 mt-1">
                Assine nossa newsletter e ganhe 10% de desconto na primeira compra.
              </p>
            </div>
            <form className="flex gap-2 max-w-md w-full lg:w-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-12 px-4 bg-background/5 border border-background/20 text-background placeholder:text-background/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="h-12 px-6 bg-primary text-primary-foreground font-body text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-editorial py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-body text-xs text-background/40">
              © {currentYear} Multti Med. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/privacidade" className="font-body text-xs text-background/40 hover:text-background/60 transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="font-body text-xs text-background/40 hover:text-background/60 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
