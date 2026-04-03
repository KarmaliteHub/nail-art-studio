import { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserVerification } from "@/hooks/useUserVerification";

const AuthRedirect = () => {
  const { user, isReady } = useAuth();
  const { isVerified, isLoading } = useUserVerification(user);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isReady || isLoading) return;

    // Si el usuario está autenticado y verificado, y está en login, redirigir al admin
    if (user && isVerified && location.pathname === "/admin/login") {
      console.log("Usuario autenticado y verificado, redirigiendo al admin...");
      // Si no viene de verificación, redirigir inmediatamente
      if (searchParams.get('verified') !== 'true') {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, isVerified, isReady, isLoading, location.pathname, navigate, searchParams]);

  return null;
};

export default AuthRedirect;