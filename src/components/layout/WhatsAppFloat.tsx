import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {/* Tooltip / message bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative bg-foreground text-background rounded-2xl rounded-br-sm px-4 py-3 shadow-lg max-w-[220px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-muted rounded-full flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-3 h-3 text-foreground" />
            </button>
            <p className="text-xs font-medium leading-snug">
              Olá! 👋 Precisa de ajuda? Fale com a <span className="text-primary font-semibold">Lara</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/5551951572050?text=Ol%C3%A1%21%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="Contato via WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 md:w-8 md:h-8 fill-white relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.822 32 32 24.822 32 16S24.822 0 16.004 0Zm9.35 22.606c-.392 1.106-1.942 2.024-3.2 2.292-.86.182-1.982.326-5.76-1.238-4.836-2.002-7.944-6.9-8.184-7.22-.232-.32-1.942-2.586-1.942-4.932 0-2.346 1.23-3.498 1.666-3.976.392-.432 1.036-.642 1.652-.642.2 0 .378.02.54.036.436.018.654.044 .942.728.36.854 1.234 2.936 1.342 3.15.11.214.216.502.072.788-.136.292-.254.47-.468.724-.214.254-.448.45-.662.726-.198.236-.42.49-.178.928.242.436 1.076 1.778 2.312 2.878 1.59 1.416 2.93 1.854 3.346 2.06.416.206.662.172.906-.104.25-.282 1.066-1.236 1.35-1.662.278-.426.562-.354.946-.214.39.142 2.462 1.162 2.884 1.374.42.214.702.32.806.498.108.178.108 1.028-.284 2.134h-.002Z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
