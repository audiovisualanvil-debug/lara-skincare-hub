import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "/" },
    { name: "Loja", href: "/loja" },
    { name: "Monte sua Rotina", href: "/monte-sua-rotina" },
    { name: "Consultoria de Pele", href: "/consultoria" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const categories = [
    { name: "Manchas e Melasma", href: "/loja?categoria=manchas-melasma" },
    { name: "Acne e Oleosidade", href: "/loja?categoria=acne-oleosidade" },
    { name: "Anti-idade", href: "/loja?categoria=anti-idade" },
    { name: "Vitamina C", href: "/loja?categoria=vitamina-c" },
    { name: "Profissional", href: "/loja?categoria=profissional" },
  ];

  return (
    <footer className="bg-charcoal text-pearl">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold tracking-wide">
              Multti Med <span className="font-script text-primary text-3xl">cosméticos</span>
            </h3>
            <p className="font-body text-sm text-pearl/70 leading-relaxed">
              Dermocosméticos premium para profissionais de estética. 
              Cuidados personalizados com qualidade e sofisticação.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="w-5 h-5 text-primary stroke-[1.5]" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-primary stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold tracking-wide">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-pearl/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold tracking-wide">Categorias</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="font-body text-sm text-pearl/70 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold tracking-wide">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="font-body text-sm text-pearl/70">
                  Endereço a confirmar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 stroke-[1.5]" />
                <a
                  href="https://wa.me/5500000000000"
                  className="font-body text-sm text-pearl/70 hover:text-primary transition-colors"
                >
                  (00) 00000-0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0 stroke-[1.5]" />
                <a
                  href="mailto:contato@multtimed.com"
                  className="font-body text-sm text-pearl/70 hover:text-primary transition-colors"
                >
                  contato@multtimed.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pearl/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-pearl/50">
              © {currentYear} Multti Med Cosméticos. Todos os direitos reservados.
            </p>
            <p className="font-script text-xl text-primary">
              Dermocosméticos Premium
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
