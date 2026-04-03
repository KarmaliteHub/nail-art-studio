import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import AuthRedirect from "@/components/AuthRedirect";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp } = useAuth();

  // Verificar si el usuario viene de verificación exitosa
  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      toast.success("¡Email verificado correctamente! Ahora puedes iniciar sesión.");
    }
  }, [searchParams]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isRegister) {
      if (password !== confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        toast.error("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }
      const { error } = await signUp(email, password);
      setIsLoading(false);
      if (error) {
        if (error.message.includes("email_address_not_authorized")) {
          toast.error("Este email no está autorizado para crear una cuenta");
        } else {
          toast.error(error.message || "Error al registrar");
        }
      } else {
        toast.success("Cuenta creada. Revisa tu email para verificar tu cuenta.");
        // Cambiar automáticamente a modo login después del registro
        setIsRegister(false);
        resetForm();
      }
    } else {
      const { data, error } = await signIn(email, password);
      setIsLoading(false);
      if (error) {
        if (error.message.includes("email_not_confirmed")) {
          toast.error("Por favor verifica tu email antes de iniciar sesión. Revisa tu bandeja de entrada.");
        } else {
          toast.error("Credenciales incorrectas");
        }
      } else if (data?.user) {
        toast.success("Sesión iniciada correctamente");
        // Redirigir inmediatamente al panel admin
        navigate("/admin");
      }
    }
  };

  const toggleMode = () => {
    resetForm();
    setIsRegister(!isRegister);
  };

  return (
    <>
      <AuthRedirect />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-primary/10 p-4">
        <div className="w-full max-w-md">
          <div className="relative overflow-hidden">
            <div
              key={isRegister ? "register" : "login"}
              className="glass-card p-8 shadow-lg animate-fade-up"
            >
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {isRegister ? "Crear Cuenta" : "Panel Administrativo"}
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  {isRegister
                    ? "Regístrate para acceder al panel"
                    : "Ingresa tus credenciales para acceder"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@bellanails.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {isRegister && (
                  <div className="space-y-2 animate-fade-up">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                <Button type="submit" className="w-full rounded-full" size="lg" disabled={isLoading}>
                  {isLoading
                    ? isRegister ? "Registrando..." : "Ingresando..."
                    : isRegister ? "Crear Cuenta" : "Ingresar"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {isRegister ? (
                    <>¿Ya tienes cuenta? <span className="text-primary font-medium">Inicia sesión</span></>
                  ) : (
                    <>¿No tienes cuenta? <span className="text-primary font-medium">Regístrate</span> <ArrowRight className="h-3 w-3 text-primary" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
