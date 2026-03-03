import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Sparkles, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import consultationImage from "@/assets/consultation.jpg";

const benefits = [
  {
    icon: Target,
    title: "Análise Personalizada",
    description: "Avaliação completa do seu tipo de pele, preocupações e objetivos estéticos"
  },
  {
    icon: Sparkles,
    title: "Rotina Sob Medida",
    description: "Protocolo de skincare desenvolvido especificamente para suas necessidades"
  },
  {
    icon: Heart,
    title: "Acompanhamento",
    description: "Suporte contínuo e ajustes na rotina conforme a evolução da sua pele"
  },
];

const includes = [
  "Análise detalhada do tipo de pele",
  "Identificação de necessidades específicas",
  "Avaliação de sensibilidades e alergias",
  "Montagem de rotina diurna e noturna",
  "Recomendação de produtos adequados",
  "Orientações de uso e aplicação",
  "Material digital com sua rotina completa",
  "Acompanhamento por 30 dias",
];

const Consultation = () => {
  return (
    <main className="pt-20 bg-card">
      <BreadcrumbNav />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-pearl overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-script text-2xl text-primary">
                Consultoria de Skincare
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight tracking-wide">
                Sua pele merece cuidados{" "}
                <span className="text-gradient-gold">personalizados</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Cada pele é única. Na consultoria de skincare, analisamos suas características 
                individuais para criar uma rotina que realmente funciona para você.
              </p>
              <Button variant="gold" size="xl" asChild>
                <a href="https://wa.me/5551951572050" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 stroke-[1.5]" />
                  Agendar Consultoria
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="border border-primary p-2">
                <img 
                  src={consultationImage} 
                  alt="Consultoria de skincare"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-primary/30 -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-wide">
              Por que fazer uma consultoria?
            </h2>
            <p className="font-body text-muted-foreground">
              Investir em uma análise profissional é o primeiro passo para resultados reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`text-center p-8 bg-background border border-border hover:border-primary/50 hover:shadow-luxury transition-all duration-300 animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 tracking-wide">
                  {benefit.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-script text-2xl text-primary">
                O que está incluso
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-wide">
                Uma experiência <span className="text-gradient-gold">completa</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                A consultoria de skincare é um serviço completo que vai muito além de 
                simplesmente indicar produtos. É uma análise profunda que considera todos 
                os aspectos da saúde da sua pele.
              </p>
            </div>

            <div className="bg-card border border-border p-8 shadow-luxury">
              <ul className="space-y-4">
                {includes.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5 stroke-[1.5]" />
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-wide">
              Como funciona
            </h2>
            <p className="font-body text-muted-foreground">
              Um processo simples e descomplicado para transformar sua rotina de cuidados
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Agendamento", description: "Entre em contato pelo WhatsApp para agendar sua consultoria" },
              { step: "02", title: "Questionário", description: "Responda algumas perguntas sobre sua pele e rotina atual" },
              { step: "03", title: "Análise", description: "Avaliação detalhada presencial ou por videochamada" },
              { step: "04", title: "Rotina", description: "Receba seu protocolo personalizado com produtos recomendados" },
            ].map((item, index) => (
              <div 
                key={item.step}
                className={`text-center animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <span className="inline-block font-display text-5xl font-bold text-gradient-gold mb-4">
                  {item.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-wide">
              Pronta para transformar sua pele?
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Agende sua consultoria e descubra a rotina perfeita para você
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="gold" size="xl" asChild>
                <a href="https://wa.me/5551951572050" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 stroke-[1.5]" />
                  Agendar pelo WhatsApp
                </a>
              </Button>
              <Button variant="gold-outline" size="xl" asChild>
                <Link to="/loja">
                  Ver Produtos
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Consultation;
