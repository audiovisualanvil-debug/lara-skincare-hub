import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, BadgePercent, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfessional } from "@/contexts/ProfessionalContext";

const ProfessionalBanner = () => {
  const { isProfessional, hasExistingRequest } = useProfessional();

  // Don't show banner if already approved or has pending request
  if (isProfessional || hasExistingRequest) return null;

  return (
    <section className="bg-gradient-to-r from-espresso via-espresso/95 to-espresso relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-editorial py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <span className="font-body text-xs font-medium tracking-[0.2em] uppercase text-gold">
                Profissionais da Saúde
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-ivory mb-4">
              Desconto exclusivo para profissionais
            </h2>
            <p className="font-body text-ivory/70 text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
              Dermatologistas, esteticistas e profissionais da saúde têm condições especiais em todo o catálogo.
            </p>
          </div>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:gap-3">
            <div className="flex items-center gap-3 text-ivory/80">
              <div className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center">
                <BadgePercent className="w-5 h-5 text-gold" />
              </div>
              <span className="font-body text-sm">Até 20% de desconto</span>
            </div>
            <div className="flex items-center gap-3 text-ivory/80">
              <div className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gold" />
              </div>
              <span className="font-body text-sm">Acesso a produtos exclusivos</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Button 
              variant="gold" 
              size="xl" 
              asChild 
              className="group shadow-lg"
            >
              <Link to="/solicitar-profissional">
                Solicitar Cadastro
                <ArrowRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBanner;
