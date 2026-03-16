import SEOHead from "@/components/seo/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const values = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Trabalhamos exclusivamente com marcas reconhecidas e produtos de alta performance"
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    description: "Cada cliente recebe orientação específica para suas necessidades"
  },
  {
    icon: Heart,
    title: "Compromisso com Resultados",
    description: "Nosso foco é na sua satisfação e nos resultados reais do tratamento"
  },
  {
    icon: Sparkles,
    title: "Atualização Constante",
    description: "Sempre em busca das melhores novidades e inovações do mercado"
  },
];

const brands = [
  { name: "Extratos da Terra", description: "Cosméticos naturais com eficácia comprovada" },
  { name: "Mezzo", description: "Linha profissional de tratamentos avançados" },
];

const About = () => {
  return (
    <main className="pt-20 bg-card">
      <BreadcrumbNav />
      {/* Hero */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block font-script text-2xl text-primary">
              Sobre Nós
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground tracking-wide">
              Multti Med <span className="text-gradient-gold">Cosméticos</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Sua parceira em cuidados com a pele, oferecendo dermocosméticos de alta 
              qualidade para profissionais e consumidores que buscam resultados reais.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-script text-2xl text-primary">
                Nossa História
              </span>
              <h2 className="font-display text-3xl font-semibold text-foreground tracking-wide">
                Paixão por cuidados com a pele
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  A Multti Med nasceu da paixão por dermocosméticos de qualidade e do desejo 
                  de tornar tratamentos profissionais acessíveis a todos.
                </p>
                <p>
                  Com experiência no mercado de estética, entendemos as necessidades tanto de 
                  profissionais que buscam produtos eficazes para seus tratamentos, quanto de 
                  consumidores que desejam manter os resultados em casa.
                </p>
                <p>
                  Nossa missão é ser a ponte entre as melhores marcas de dermocosméticos e 
                  pessoas que valorizam cuidados de qualidade com a pele.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="border border-primary p-2">
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                  <span className="font-body text-muted-foreground">Imagem institucional</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-primary/30 -z-10" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4 tracking-wide">
              Nossos Valores
            </h2>
            <p className="font-body text-muted-foreground">
              O que nos guia em cada atendimento e recomendação
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`text-center p-8 bg-card border border-border animate-slide-up stagger-${index + 1}`}
                style={{ opacity: 0 }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary stroke-[1.5]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 tracking-wide">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block font-script text-2xl text-primary mb-4">
              Nossas Marcas
            </span>
            <h2 className="font-display text-3xl font-semibold text-foreground mb-4 tracking-wide">
              Marcas que confiamos
            </h2>
            <p className="font-body text-muted-foreground">
              Selecionamos criteriosamente cada marca para garantir qualidade e eficácia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {brands.map((brand) => (
              <div 
                key={brand.name}
                className="p-8 bg-background border border-border hover:border-primary/50 hover:shadow-luxury transition-all duration-300 text-center"
              >
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3 tracking-wide">
                  {brand.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Professionals */}
      <section className="py-24 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block font-script text-2xl text-primary">
                Para Profissionais
              </span>
              <h2 className="font-display text-3xl font-semibold text-foreground tracking-wide">
                Produtos profissionais de <span className="text-gradient-gold">alta performance</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Atendemos esteticistas, biomédicos, dermatologistas e outros profissionais 
                da área de estética com uma linha completa de produtos para protocolos 
                de tratamento.
              </p>
              <ul className="space-y-3 font-body text-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  Peelings químicos e enzimáticos
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  Máscaras profissionais
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  Produtos para microagulhamento
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-primary" />
                  Preparos e pós-procedimento
                </li>
              </ul>
              <Button variant="elegant" size="lg" asChild>
                <Link to="/loja?categoria=profissional">
                  Ver Linha Profissional
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="border border-primary p-2">
                <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                  <span className="font-body text-muted-foreground">Imagem profissional</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/30 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground tracking-wide">
              Pronta para começar?
            </h2>
            <p className="font-body text-muted-foreground">
              Explore nossos produtos ou agende uma consultoria personalizada
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/loja">
                  Explorar Produtos
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </Link>
              </Button>
              <Button variant="gold-outline" size="xl" asChild>
                <Link to="/consultoria">
                  Agendar Consultoria
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
