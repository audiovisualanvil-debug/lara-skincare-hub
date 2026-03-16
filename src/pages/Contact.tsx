import SEOHead from "@/components/seo/SEOHead";
import { MessageCircle, Instagram, MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const Contact = () => {
  return (
    <main className="pt-20 bg-card">
      <SEOHead
        title="Contato | Multti Med Porto Alegre"
        description="Entre em contato com a Multti Med Dermocosméticos. Atendimento via WhatsApp, e-mail e formulário. Tire suas dúvidas ou agende uma consultoria."
        canonical="/contato"
      />
      <BreadcrumbNav />
      {/* Header */}
      <section className="py-16 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4 tracking-wide">
              Entre em <span className="text-gradient-gold">Contato</span>
            </h1>
            <p className="font-body text-muted-foreground">
              Tire suas dúvidas, agende uma consultoria ou faça seu pedido
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 tracking-wide">
                  Fale Conosco
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Estou à disposição para esclarecer suas dúvidas sobre produtos, 
                  tratamentos e agendar sua consultoria de skincare. O canal mais 
                  rápido para contato é o WhatsApp.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/5551951572050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 bg-background border border-border hover:border-primary/50 hover:shadow-luxury transition-all duration-300 group"
                >
                  <div className="w-12 h-12 border border-primary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MessageCircle className="w-6 h-6 text-primary stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground tracking-wide">WhatsApp</h3>
                    <p className="font-body text-sm text-muted-foreground">(51) 9515-7205</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-6 bg-background border border-border">
                  <div className="w-12 h-12 border border-primary flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-primary stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground tracking-wide">Instagram</h3>
                    <p className="font-body text-sm text-muted-foreground">Em breve</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-background border border-border">
                  <div className="w-12 h-12 border border-primary flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground tracking-wide">Endereço</h3>
                    <p className="font-body text-sm text-muted-foreground">Endereço a confirmar</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-background border border-border">
                  <div className="w-12 h-12 border border-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium text-foreground tracking-wide">Horário</h3>
                    <p className="font-body text-sm text-muted-foreground">Seg - Sex: 9h às 18h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-background border border-border p-8 shadow-luxury">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6 tracking-wide">
                Envie uma Mensagem
              </h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <Input placeholder="Seu nome" className="font-body border-border" />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                      Telefone
                    </label>
                    <Input placeholder="(00) 00000-0000" className="font-body border-border" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <Input type="email" placeholder="seu@email.com" className="font-body border-border" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">
                    Assunto
                  </label>
                  <Input placeholder="Sobre o que deseja falar?" className="font-body border-border" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <Textarea 
                    placeholder="Escreva sua mensagem aqui..."
                    className="font-body min-h-[150px] border-border"
                  />
                </div>
                <Button variant="elegant" size="lg" className="w-full">
                  <Send className="w-4 h-4 stroke-[1.5]" />
                  Enviar Mensagem
                </Button>
              </form>
              <p className="font-body text-xs text-muted-foreground text-center mt-4">
                Ou se preferir, entre em contato diretamente pelo WhatsApp para uma resposta mais rápida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="py-16 bg-gradient-pearl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-2xl font-semibold text-foreground tracking-wide">
              Precisa de ajuda para escolher seus produtos?
            </h2>
            <p className="font-body text-muted-foreground">
              Agende uma consultoria de skincare e receba recomendações personalizadas
            </p>
            <Button variant="elegant" size="lg" asChild>
              <a href="https://wa.me/5551951572050" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 stroke-[1.5]" />
                Falar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
