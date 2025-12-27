import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Multti Med</h3>
            <p className="text-sm text-background/70 leading-relaxed">
              Dermocosméticos de alta performance para profissionais e pacientes que buscam resultados reais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/shop" className="hover:text-background transition-colors">Produtos</Link></li>
              <li><Link to="/monte-sua-rotina" className="hover:text-background transition-colors">Monte sua Rotina</Link></li>
              <li><Link to="/sobre" className="hover:text-background transition-colors">Sobre Nós</Link></li>
              <li><Link to="/consultoria" className="hover:text-background transition-colors">Consultoria</Link></li>
              <li><Link to="/contato" className="hover:text-background transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide mb-4">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contato@multtimed.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-6">
              <p className="text-xs text-background/50 uppercase tracking-wide mb-2">Pagamento Seguro</p>
              <div className="flex gap-2">
                <div className="h-8 w-12 bg-background/10 rounded flex items-center justify-center text-xs">
                  PIX
                </div>
                <div className="h-8 w-12 bg-background/10 rounded flex items-center justify-center text-xs">
                  Visa
                </div>
                <div className="h-8 w-12 bg-background/10 rounded flex items-center justify-center text-xs">
                  MC
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-background/10 text-center text-xs text-background/50">
          <p>© {new Date().getFullYear()} Multti Med. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;