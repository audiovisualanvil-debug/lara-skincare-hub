import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Droplets, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const skinTypes = [
  { name: "Pele Oleosa", slug: "oleosa", description: "Brilho excessivo, poros dilatados" },
  { name: "Pele Seca", slug: "seca", description: "Sensação de repuxamento, descamação" },
  { name: "Pele Mista", slug: "mista", description: "Zona T oleosa, bochechas normais/secas" },
  { name: "Pele Normal", slug: "normal", description: "Equilibrada, sem preocupações específicas" },
  { name: "Pele Sensível", slug: "sensivel", description: "Reativa, facilmente irritada" },
];

const concerns = [
  { name: "Manchas e Melasma", slug: "manchas-melasma", icon: "🎯" },
  { name: "Acne e Oleosidade", slug: "acne-oleosidade", icon: "💧" },
  { name: "Rugas e Linhas", slug: "anti-idade", icon: "✨" },
  { name: "Desidratação", slug: "hidratacao-reparacao", icon: "💦" },
  { name: "Olheiras e Bolsas", slug: "area-olhos", icon: "👁️" },
  { name: "Falta de Luminosidade", slug: "vitamina-c", icon: "🌟" },
];

const routineSteps = [
  {
    step: "01",
    title: "Limpeza",
    time: "Manhã & Noite",
    icon: Droplets,
    description: "Remove impurezas e prepara a pele para absorver os tratamentos"
  },
  {
    step: "02",
    title: "Tratamento",
    time: "Manhã & Noite",
    icon: Sparkles,
    description: "Séruns e ativos específicos para suas necessidades"
  },
  {
    step: "03",
    title: "Hidratação",
    time: "Manhã & Noite",
    icon: Droplets,
    description: "Mantém a barreira cutânea saudável e protegida"
  },
  {
    step: "04",
    title: "Proteção Solar",
    time: "Manhã",
    icon: Sun,
    description: "Essencial para prevenir manchas e envelhecimento"
  },
];

const BuildRoutine = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block font-script text-2xl text-primary">
              Monte sua Rotina
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground tracking-wide">
              Descubra a rotina <span className="text-gradient-gold">perfeita</span> para sua pele
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Identifique seu tipo de pele e principais preocupações para encontrar 
              os produtos ideais para você
            </p>
          </div>
        </div>
      </section>

      {/* Skin Type Selection */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4 tracking-wide">
              Qual é o seu tipo de pele?
            </h2>
            <p className="font-body text-muted-foreground">
              Selecione o que mais se aproxima da sua realidade
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {skinTypes.map((type) => (
              <Link
                key={type.slug}
                to={`/loja?tipo-pele=${type.slug}`}
                className="group p-6 bg-background border border-border hover:border-primary/50 hover:shadow-luxury transition-all duration-300 text-center"
              >
                <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2 tracking-wide">
                  {type.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {type.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Concerns Selection */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4 tracking-wide">
              Qual sua principal preocupação?
            </h2>
            <p className="font-body text-muted-foreground">
              Escolha o que mais te incomoda para encontrar soluções direcionadas
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {concerns.map((concern) => (
              <Link
                key={concern.slug}
                to={`/loja?categoria=${concern.slug}`}
                className="group flex items-center gap-4 p-6 bg-card border border-border hover:border-primary/50 hover:shadow-luxury transition-all duration-300"
              >
                <span className="text-3xl">{concern.icon}</span>
                <span className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors tracking-wide">
                  {concern.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Routine Steps */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block font-script text-2xl text-primary mb-4">
              Passo a Passo
            </span>
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4 tracking-wide">
              Como montar sua rotina básica
            </h2>
            <p className="font-body text-muted-foreground">
              Uma rotina consistente é o segredo para resultados duradouros
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {routineSteps.map((step, index) => (
              <div 
                key={step.step}
                className={`text-center p-8 bg-background border border-border animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary stroke-[1.5]" />
                </div>
                <span className="inline-block font-display text-2xl font-bold text-gradient-gold mb-2">
                  {step.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1 tracking-wide">
                  {step.title}
                </h3>
                <span className="inline-block font-body text-xs text-primary uppercase tracking-widest mb-3">
                  {step.time}
                </span>
                <p className="font-body text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day/Night Routine Visual */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Morning */}
            <div className="p-8 bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center">
                  <Sun className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground tracking-wide">
                    Rotina Diurna
                  </h3>
                  <span className="font-body text-sm text-muted-foreground">Manhã</span>
                </div>
              </div>
              <ol className="space-y-3 font-body text-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">1</span>
                  Limpeza suave
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">2</span>
                  Sérum antioxidante (Vitamina C)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">3</span>
                  Hidratante
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">4</span>
                  Protetor solar (obrigatório!)
                </li>
              </ol>
            </div>

            {/* Night */}
            <div className="p-8 bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-primary flex items-center justify-center">
                  <Moon className="w-6 h-6 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground tracking-wide">
                    Rotina Noturna
                  </h3>
                  <span className="font-body text-sm text-muted-foreground">Noite</span>
                </div>
              </div>
              <ol className="space-y-3 font-body text-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">1</span>
                  Demaquilante (se necessário)
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">2</span>
                  Limpeza profunda
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">3</span>
                  Tratamento específico
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-primary flex items-center justify-center text-xs text-primary font-medium">4</span>
                  Hidratante noturno
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground tracking-wide">
              Precisa de ajuda para montar sua rotina?
            </h2>
            <p className="font-body text-muted-foreground">
              Agende uma consultoria personalizada e receba recomendações específicas para sua pele
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/consultoria">
                  Agendar Consultoria
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </Link>
              </Button>
              <Button variant="gold-outline" size="xl" asChild>
                <Link to="/loja">
                  Ver Produtos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BuildRoutine;
