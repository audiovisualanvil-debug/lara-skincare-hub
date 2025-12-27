import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Loja", href: "/loja" },
    { name: "Consultoria de Skincare", href: "/consultoria" },
    { name: "Contato", href: "/contato" },
  ];

  const categories = [
    { name: "Anti-idade", href: "/loja?categoria=anti-idade" },
    { name: "Clareamento", href: "/loja?categoria=clareamento" },
    { name: "Acne & Oleosidade", href: "/loja?categoria=acne" },
    { name: "Vitamina C", href: "/loja?categoria=vitamina-c" },
    { name: "Corpo", href: "/loja?categoria=corpo" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-semibold">
              Lara <span className="text-primary">Estética</span>
            </h3>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Profissional de estética especializada em dermocosméticos de alta performance. 
              Cuidados personalizados para a sua pele.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Categorias</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="font-body text-sm text-primary-foreground/70">
                  Endereço a confirmar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="https://wa.me/5500000000000"
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  (00) 00000-0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a
                  href="mailto:contato@larastetica.com"
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  contato@laraestetica.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-primary-foreground/50">
              © {currentYear} Lara Estética. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/politica-privacidade"
                className="font-body text-sm text-primary-foreground/50 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/termos"
                className="font-body text-sm text-primary-foreground/50 hover:text-primary transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
