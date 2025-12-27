import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades e promoções.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-pearl tracking-wide">
            Receba novidades e <span className="text-primary">ofertas exclusivas</span>
          </h2>
          <p className="font-body text-pearl/70 text-sm">
            Cadastre-se para receber dicas de skincare, lançamentos e promoções especiais
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 font-body text-sm bg-pearl/10 border-pearl/20 text-pearl placeholder:text-pearl/50"
              required
            />
            <Button type="submit" variant="gold" size="lg" className="shrink-0">
              <Send className="w-4 h-4 stroke-[1.5]" />
              Inscrever
            </Button>
          </form>
          
          <p className="font-body text-pearl/50 text-xs">
            Ao se inscrever, você concorda em receber nossas comunicações. Pode cancelar a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
