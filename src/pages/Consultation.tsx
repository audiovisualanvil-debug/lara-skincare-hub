import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Sparkles, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-cream overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest">
                Consultoria de Skincare
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                Sua pele merece cuidados{" "}
                <span className="text-gradient-rose">personalizados</span>
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Cada pele é única. Na consultoria de skincare, analisamos suas características 
                individuais para criar uma rotina que realmente funciona para você.
              </p>
              <Button variant="rose" size="xl" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Agendar Consultoria
                </a>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={consultationImage} 
                alt="Consultoria de skincare"
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-rose rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-gold rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
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
                className={`text-center p-8 bg-card rounded-xl border border-border/50 hover:shadow-card transition-all duration-300 animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-rose flex items-center justify-center shadow-glow">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
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
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest">
                O que está incluso
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Uma experiência <span className="text-gradient-gold">completa</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                A consultoria de skincare é um serviço completo que vai muito além de 
                simplesmente indicar produtos. É uma análise profunda que considera todos 
                os aspectos da saúde da sua pele.
              </p>
            </div>

            <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-card">
              <ul className="space-y-4">
                {includes.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-body text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
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
                <span className="inline-block font-display text-5xl font-bold text-gradient-rose mb-4">
                  {item.step}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
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
      <section className="py-24 bg-gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Pronta para transformar sua pele?
            </h2>
            <p className="font-body text-lg text-muted-foreground">
              Agende sua consultoria e descubra a rotina perfeita para você
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="rose" size="xl" asChild>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Agendar pelo WhatsApp
                </a>
              </Button>
              <Button variant="elegant" size="xl" asChild>
                <Link to="/loja">
                  Ver Produtos
                  <ArrowRight className="w-5 h-5" />
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
