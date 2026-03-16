import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    setVisible(false);
    window.location.reload(); // Reload to activate analytics
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("cookie_consent", "essential");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-2xl shadow-xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Utilizamos cookies 🍪
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Este site usa cookies para melhorar sua experiência, analisar tráfego e personalizar conteúdo. 
                    Ao aceitar, você concorda com nossa{" "}
                    <a href="/politica-de-privacidade" className="text-primary underline hover:text-primary/80">
                      Política de Privacidade
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEssentialOnly}
                  className="flex-1 md:flex-none text-xs"
                >
                  Apenas essenciais
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="flex-1 md:flex-none text-xs"
                >
                  <Shield className="w-3.5 h-3.5 mr-1" />
                  Aceitar todos
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
