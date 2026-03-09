import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") === "recovery") {
      setIsRecovery(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      setSuccess(true);
      toast({ title: "Senha atualizada!", description: "Sua senha foi alterada com sucesso" });
      setTimeout(() => navigate("/auth"), 2000);
    }
  };

  if (!isRecovery && !success) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MainHeader />
        <main className="flex-1 pt-32 md:pt-40 pb-24 flex items-center justify-center">
          <div className="container max-w-md text-center">
            <p className="text-muted-foreground">Link inválido ou expirado. Solicite um novo link de recuperação.</p>
            <Button className="mt-4" onClick={() => navigate("/auth")}>Voltar ao login</Button>
          </div>
        </main>
        <MainFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainHeader />
      <main className="flex-1 pt-32 md:pt-40 pb-24 flex items-center justify-center">
        <div className="container max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-8 border border-border"
          >
            {success ? (
              <div className="text-center space-y-4">
                <CheckCircle className="h-12 w-12 text-primary mx-auto" />
                <h1 className="font-heading text-2xl font-bold text-foreground">Senha atualizada!</h1>
                <p className="text-muted-foreground">Redirecionando para o login...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="font-heading text-2xl font-bold text-foreground">Nova senha</h1>
                  <p className="text-muted-foreground mt-2">Digite sua nova senha abaixo</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Nova senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-12" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Atualizar senha"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </main>
      <MainFooter />
    </div>
  );
};

export default ResetPassword;
