import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skincare.jpg";
import consultationImage from "@/assets/consultation.jpg";
import productsImage from "@/assets/products-display.jpg";

const categories = [
  { 
    name: "Anti-idade & Rejuvenescimento", 
    slug: "anti-idade",
    description: "Tratamentos para rugas, linhas de expressão e flacidez"
  },
  { 
    name: "Clareamento & Manchas", 
    slug: "clareamento",
    description: "Produtos para uniformizar o tom da pele"
  },
  { 
    name: "Acne & Oleosidade", 
    slug: "acne",
    description: "Controle de oleosidade e tratamento de acne"
  },
  { 
    name: "Hidratação & Reparação", 
    slug: "hidratacao",
    description: "Restauração da barreira cutânea"
  },
  { 
    name: "Área dos Olhos", 
    slug: "olhos",
    description: "Cuidados específicos para a região periorbital"
  },
  { 
    name: "Vitamina C", 
    slug: "vitamina-c",
    description: "Antioxidantes e luminosidade"
  },
  { 
    name: "Corpo", 
    slug: "corpo",
    description: "Celulite, firmador, glúteos e medidas"
  },
  { 
    name: "Capilar", 
    slug: "capilar",
    description: "Antiqueda, crescimento e reparação"
  },
  { 
    name: "Fotoproteção", 
    slug: "fotoproteção",
    description: "Proteção solar para todos os tipos de pele"
  },
  { 
    name: "Profissional", 
    slug: "profissional",
    description: "Peelings, máscaras e microagulhamento"
  },
];

const brands = [
  { name: "Tulípia", logo: "T" },
  { name: "Extratos da Terra", logo: "E" },
  { name: "Mezzo", logo: "M" },
];

const features = [
  {
    icon: Sparkles,
    title: "Dermocosméticos Premium",
    description: "Trabalhamos apenas com marcas de alta qualidade e eficácia comprovada"
  },
  {
    icon: Users,
    title: "Consultoria Personalizada",
    description: "Análise individual da sua pele para recomendar o tratamento ideal"
  },
  {
    icon: ShieldCheck,
    title: "Uso Profissional & Home Care",
    description: "Produtos para uso em cabine e para continuidade do tratamento em casa"
  },
];

const Index = () => {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-6 animate-slide-up">
            <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest">
              Lara Estética & Dermocosméticos
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight">
              Cuidados{" "}
              <span className="text-gradient-rose">personalizados</span>{" "}
              para a sua pele
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Descubra tratamentos profissionais e produtos dermocosméticos de alta 
              performance para alcançar resultados reais e duradouros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="rose" size="xl" asChild>
                <Link to="/loja">
                  Explorar Produtos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="elegant" size="xl" asChild>
                <Link to="/consultoria">
                  Agendar Consultoria
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest mb-4">
              Nossas Categorias
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Soluções para cada necessidade
            </h2>
            <p className="font-body text-muted-foreground">
              Encontre o tratamento ideal para o seu tipo de pele e objetivo estético
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/loja?categoria=${category.slug}`}
                className={`group p-6 bg-card rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-slide-up stagger-${(index % 5) + 1}`}
                style={{ opacity: 0 }}
              >
                <h3 className="font-display text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-2">
                  {category.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`text-center p-8 animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-rose flex items-center justify-center shadow-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest">
                Nossa Loja
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Dermocosméticos de <span className="text-gradient-gold">alta performance</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Trabalhamos com as melhores marcas do mercado para oferecer tratamentos 
                eficazes e seguros. Produtos para uso profissional e home care, sempre 
                com orientação especializada.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {brands.map((brand) => (
                  <div 
                    key={brand.name}
                    className="px-6 py-3 bg-card rounded-full border border-border/50 font-body text-sm font-medium text-foreground"
                  >
                    {brand.name}
                  </div>
                ))}
              </div>
              <Button variant="rose" size="lg" asChild className="mt-6">
                <Link to="/loja">
                  Ver Todos os Produtos
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={productsImage} 
                alt="Dermocosméticos de alta qualidade"
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-rose rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-gold rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src={consultationImage} 
                alt="Consultoria de skincare personalizada"
                className="rounded-2xl shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-gold rounded-2xl -z-10" />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <span className="inline-block font-body text-sm font-medium text-primary uppercase tracking-widest">
                Consultoria Especializada
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Skincare personalizado para <span className="text-gradient-rose">você</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Cada pele é única e merece cuidados específicos. Na consultoria de skincare, 
                analisamos seu tipo de pele, necessidades e objetivos para criar uma rotina 
                personalizada com os produtos mais adequados.
              </p>
              <ul className="space-y-3 font-body text-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Análise detalhada do seu tipo de pele
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Identificação de necessidades específicas
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Montagem de rotina personalizada
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Acompanhamento e ajustes
                </li>
              </ul>
              <Button variant="gold" size="lg" asChild className="mt-6">
                <Link to="/consultoria">
                  Agendar Consultoria
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

export default Index;
