import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(145,70%,40%)] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-primary-foreground" />
      <span className="absolute right-full mr-3 bg-foreground text-primary-foreground text-sm font-body px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-card">
        Fale conosco!
      </span>
    </a>
  );
};

export default WhatsAppFloat;
