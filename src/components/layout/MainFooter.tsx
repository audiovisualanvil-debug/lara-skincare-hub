import { Link } from "react-router-dom";
import { 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  Youtube, 
  Linkedin,
  Clock,
  CreditCard,
  Truck,
  Shield,
  Heart,
  Sparkles,
  Music
} from "lucide-react";
import { motion } from "framer-motion";

const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  const brands = [
    { label: "Mezzo Dermocosméticos", href: "/mezzo" },
    { label: "Tulípia", href: "/tulipia" },
    { label: "Extratos da Terra", href: "/extratos-da-terra" },
    { label: "Smart GR", href: "/smart-gr" },
  ];

  const categories = [
    { label: "Clareamento", href: "/loja?categoria=clareamento" },
    { label: "Anti-idade", href: "/loja?categoria=anti-idade" },
    { label: "Acne & Oleosidade", href: "/loja?categoria=antiacne" },
    { label: "Hidratação", href: "/loja?categoria=hidratacao" },
    { label: "Proteção Solar", href: "/loja?categoria=fotoprotecao" },
    { label: "Vitamina C", href: "/loja?categoria=vitamina-c" },
  ];

  const navigation = [
    { label: "Loja", href: "/loja" },
    { label: "Promoções", href: "/promocoes", highlight: true },
    { label: "Monte sua Rotina", href: "/monte-sua-rotina" },
    
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Consultoria", href: "/consultoria" },
    { label: "Contato", href: "/contato" },
  ];

  const benefits = [
    { icon: Truck, label: "Frete Grátis", description: "Acima de R$ 299" },
    { icon: CreditCard, label: "12x sem juros", description: "No cartão" },
    { icon: Shield, label: "Site Seguro", description: "Compra protegida" },
    { icon: Clock, label: "Suporte", description: "Seg-Sex 9h às 18h" },
  ];

  const socialLinks: { icon: any; href: string; label: string; color: string }[] = [
    { icon: Instagram, href: "https://www.instagram.com/multtimedcosmeticos/", label: "Instagram", color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600" },
    { icon: Facebook, href: "https://www.facebook.com/multtimedpoa", label: "Facebook", color: "hover:bg-[#1877F2]" },
    { icon: Music, href: "https://www.tiktok.com/@multtimed.poa", label: "TikTok", color: "hover:bg-[#010101]" },
  ];


  return (
    <footer className="bg-espresso text-ivory relative overflow-hidden">
      {/* Benefits Bar */}
      <div className="bg-primary/10 border-b border-ivory/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, label, description }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-ivory">{label}</p>
                  <p className="text-xs text-ivory/60">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-gold/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-block group">
              <h3 className="font-display text-3xl font-medium text-ivory tracking-tight group-hover:text-primary transition-colors">
                Multti Med
              </h3>
              <span className="text-xs uppercase tracking-[0.2em] text-ivory/50 font-body">
                Dermocosméticos
              </span>
            </Link>
            <p className="mt-6 text-sm text-ivory/70 leading-relaxed max-w-sm">
              Dermocosméticos de alta performance para profissionais e pacientes que buscam resultados reais e duradouros. 
              Tecnologia avançada e ingredientes de qualidade em cada produto.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a 
                  key={label}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-11 h-11 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:border-transparent hover:text-white transition-all duration-300 rounded-xl ${color}`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* App badges placeholder */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wider text-ivory/40 mb-3">Em breve</p>
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-ivory/5 border border-ivory/10 rounded-lg flex items-center gap-2">
                  <span className="text-xs text-ivory/50">App Store</span>
                </div>
                <div className="px-4 py-2 bg-ivory/5 border border-ivory/10 rounded-lg flex items-center gap-2">
                  <span className="text-xs text-ivory/50">Google Play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/40 mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={`text-sm transition-colors duration-300 inline-flex items-center gap-1 group ${
                      link.highlight 
                        ? 'text-primary font-medium' 
                        : 'text-ivory/70 hover:text-primary'
                    }`}
                  >
                    {link.highlight && <Sparkles className="w-3 h-3" />}
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands & Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/40 mb-6">
              Nossas Marcas
            </h4>
            <ul className="space-y-3">
              {brands.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-ivory/70 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/40 mb-6 mt-8">
              Categorias
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-ivory/70 hover:text-primary transition-colors duration-300 inline-flex items-center gap-1 group"
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
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/40 mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                    <Phone className="w-4 h-4 text-green-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-ivory/90 group-hover:text-primary transition-colors">(11) 99999-9999</p>
                    <p className="text-xs text-ivory/50">WhatsApp</p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@multtimed.com.br"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-ivory/90 group-hover:text-primary transition-colors break-all">contato@multtimed.com.br</p>
                    <p className="text-xs text-ivory/50">E-mail</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-ivory/90">São Paulo, SP</p>
                  <p className="text-xs text-ivory/50">Brasil</p>
                </div>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/40 mb-4">
                Formas de Pagamento
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "PIX", color: "bg-teal-500/20 text-teal-400" },
                  { label: "Visa", color: "bg-blue-500/20 text-blue-400" },
                  { label: "Master", color: "bg-orange-500/20 text-orange-400" },
                  { label: "Elo", color: "bg-yellow-500/20 text-yellow-400" },
                  
                ].map((method) => (
                  <div 
                    key={method.label}
                    className={`h-7 px-3 flex items-center justify-center text-[10px] font-medium rounded-md ${method.color}`}
                  >
                    {method.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-ivory/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <h4 className="text-lg text-ivory font-medium">
                  Receba novidades e ofertas exclusivas
                </h4>
              </div>
              <p className="text-sm text-ivory/60">
                Assine nossa newsletter e ganhe <span className="text-primary font-medium">10% de desconto</span> na primeira compra.
              </p>
            </div>
            <form className="flex gap-2 max-w-md w-full lg:w-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 h-12 px-5 bg-ivory/5 border border-ivory/20 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-primary focus:bg-ivory/10 transition-all rounded-xl"
              />
              <button
                type="submit"
                className="h-12 px-8 bg-primary text-white text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors rounded-xl shadow-lg shadow-primary/20"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10 bg-noir/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <p className="text-xs text-ivory/50">
                © {currentYear} Multti Med. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/politica-de-privacidade" className="text-xs text-ivory/50 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos-de-uso" className="text-xs text-ivory/50 hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/politica-de-trocas" className="text-xs text-ivory/50 hover:text-primary transition-colors">
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
