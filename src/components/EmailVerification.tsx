import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const EmailVerification = ({ email, onVerified, onBack }: EmailVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      toast.error("Por favor ingresa el código de verificación");
      return;
    }

    setIsVerifying(true);
    try {
      console.log("Intentando verificar OTP:", { email, token: verificationCode });
      
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: 'email'
      });

      if (error) {
        console.error("Error de verificación:", error);
        
        if (error.message.includes("expired")) {
          toast.error("El código ha expirado. Solicita uno nuevo.");
        } else if (error.message.includes("invalid")) {
          toast.error("Código inválido. Verifica que sea correcto.");
        } else {
          toast.error(`Error: ${error.message}`);
        }
      } else if (data?.user) {
        console.log("Verificación exitosa:", data.user);
        toast.success("Email verificado correctamente");
        onVerified();
      } else {
        toast.error("Error inesperado en la verificación");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      toast.error("Error al verificar el código");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false
        }
      });

      if (error) {
        console.error("Error al reenviar:", error);
        toast.error("Error al reenviar el código");
      } else {
        toast.success("Código reenviado a tu email");
      }
    } catch (error) {
      console.error("Error al reenviar el código:", error);
      toast.error("Error al reenviar el código");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="glass-card p-8 shadow-lg animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Mail className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Verifica tu Email
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Hemos enviado un código de verificación a
        </p>
        <p className="text-sm font-medium text-foreground">{email}</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="code">Código de verificación</Label>
          <Input
            id="code"
            type="text"
            placeholder="123456"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full rounded-full" 
          size="lg" 
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Verificando...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Verificar Email
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {isResending ? "Reenviando..." : "¿No recibiste el código? Reenviar"}
        </button>
        
        <div>
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Volver al registro
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;