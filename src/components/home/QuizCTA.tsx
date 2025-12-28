import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "7 perguntas rápidas",
  "Resultado instantâneo",
  "Produtos recomendados",
];

const QuizCTA = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-secondary to-primary/10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-3xl shadow-elevated p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            {/* Icon/Visual */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                Quiz Interativo
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Descubra seu tipo de pele
              </h2>
              <p className="mt-3 text-muted-foreground">
                Responda nosso quiz e receba recomendações personalizadas de produtos ideais para você.
              </p>
              
              {/* Benefits */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-5">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <Button asChild size="lg" className="gap-2 group">
                  <Link to="/quiz-pele">
                    Fazer o Quiz Agora
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizCTA;
