import { Link } from "react-router-dom";
import { Instagram, MessageCircle, MapPin, Phone, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", href: "/" },
    { name: "Loja", href: "/loja" },
    { name: "Consultoria", href: "/consultoria" },
    { name: "Sobre", href: "/sobre" },
  ];

  return (
    <footer className="bg-charcoal text-pearl">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold tracking-wide">
              Multti Med <span className="font-script text-primary text-2xl">cosméticos</span>
            </h3>
            <p className="font-body text-sm text-pearl/70 leading-relaxed">
              Dermocosméticos premium para profissionais de estética e consumidores. 
              Qualidade e sofisticação em cada produto.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/multtimedcosmeticos/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="w-4 h-4 text-primary stroke-[1.5]" />
              </a>
              <a
                href="https://www.facebook.com/multtimedpoa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Facebook className="w-4 h-4 text-primary stroke-[1.5]" />
              </a>
              <a
                href="https://wa.me/5551951572050"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-primary/30 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-primary stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-semibold tracking-wide">Menu</h4>
            <ul className="space-y-2">
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

          {/* Column 3 - Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-base font-semibold tracking-wide">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[1.5]" />
                <span className="font-body text-sm text-pearl/70">
                  Endereço a confirmar
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0 stroke-[1.5]" />
                <a
                  href="https://wa.me/5551951572050"
                  className="font-body text-sm text-pearl/70 hover:text-primary transition-colors"
                >
                  (51) 9515-7205
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pearl/10">
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <p className="font-body text-xs text-pearl/50 text-center">
            © {currentYear} Multti Med Cosméticos — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
