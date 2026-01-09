import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, Youtube, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  const brands = [
    { label: "Mezzo Dermocosméticos", href: "/mezzo", color: "text-pink-400" },
    { label: "Tulípia", href: "/tulipia", color: "text-rose-400" },
    { label: "Extratos da Terra", href: "/extratos-da-terra", color: "text-green-400" },
    { label: "Smart GR", href: "/smart-gr", color: "text-blue-400" },
  ];

  const categories = [
    { label: "Clareamento", href: "/loja?categoria=clareamento" },
    { label: "Anti-idade", href: "/loja?categoria=anti-idade" },
    { label: "Acne & Oleosidade", href: "/loja?categoria=antiacne" },
    { label: "Hidratação", href: "/loja?categoria=hidratacao" },
    { label: "Proteção Solar", href: "/loja?categoria=fotoprotecao" },
    { label: "Vitamina C", href: "/loja?categoria=vitamina-c" },
    { label: "Séruns", href: "/loja?categoria=serum" },
    { label: "Máscaras", href: "/loja?categoria=mascara" },
  ];

  const treatments = [
    { label: "Exossomas", href: "/mezzo?categoria=exossomas" },
    { label: "Corporal", href: "/mezzo?categoria=corpo" },
    { label: "Capilar", href: "/mezzo?categoria=capilar" },
    { label: "Labial", href: "/tulipia?categoria=labial" },
    { label: "Área dos Olhos", href: "/tulipia?categoria=area-olhos" },
  ];

  const navigation = [
    { label: "Loja", href: "/loja" },
    { label: "Monte sua Rotina", href: "/monte-sua-rotina" },
    { label: "Quiz de Pele", href: "/quiz-pele" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Consultoria", href: "/consultoria" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="font-display text-2xl font-semibold text-background tracking-tight">
                Multti Med
              </h3>
            </Link>
            <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
              Dermocosméticos de alta performance para profissionais e pacientes que buscam resultados reais e duradouros.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-background/20 text-background/60 hover:border-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-lg"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-5">
              Nossas Marcas
            </h4>
            <ul className="space-y-3">
              {brands.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={`text-sm text-background/60 hover:${link.color} transition-colors duration-300 inline-flex items-center gap-1 group`}
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-5">
              Categorias
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-5">
              Tratamentos
            </h4>
            <ul className="space-y-3">
              {treatments.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-5 mt-8">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navigation.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/60">(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/60 break-all">contato@multtimed.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/60">São Paulo, SP</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-background/40 mb-4">
                Pagamento
              </p>
              <div className="flex flex-wrap gap-2">
                {["PIX", "Visa", "Master", "Elo"].map((method) => (
                  <div 
                    key={method}
                    className="h-7 px-2 flex items-center justify-center border border-background/20 text-xs text-background/50 rounded"
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
              <h4 className="text-lg text-background font-medium">
                Receba novidades e ofertas exclusivas
              </h4>
              <p className="text-sm text-background/50 mt-1">
                Assine nossa newsletter e ganhe 10% de desconto na primeira compra.
              </p>
            </div>
            <form className="flex gap-2 max-w-md w-full lg:w-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-12 px-4 bg-background/5 border border-background/20 text-background placeholder:text-background/40 text-sm focus:outline-none focus:border-primary transition-colors rounded-lg"
              />
              <button
                type="submit"
                className="h-12 px-6 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors rounded-lg"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-background/40">
              © {currentYear} Multti Med. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/privacidade" className="text-xs text-background/40 hover:text-background/60 transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-xs text-background/40 hover:text-background/60 transition-colors">
                Termos de Uso
              </Link>
              <Link to="/trocas" className="text-xs text-background/40 hover:text-background/60 transition-colors">
                Trocas e Devoluções
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
