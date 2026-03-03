import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5551951572050"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-card border border-primary flex items-center justify-center shadow-luxury hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary group-hover:text-primary-foreground stroke-[1.5] transition-colors" />
      <span className="absolute right-full mr-3 bg-charcoal text-pearl text-sm font-body px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-card">
        Fale conosco!
      </span>
    </a>
  );
};

export default WhatsAppFloat;
