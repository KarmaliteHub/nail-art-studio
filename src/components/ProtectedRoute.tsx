import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserVerification } from "@/hooks/useUserVerification";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isReady } = useAuth();
  const { isVerified, isLoading } = useUserVerification(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !user) {
      navigate("/admin/login");
    } else if (isReady && user && !isLoading && !isVerified) {
      navigate("/admin/login");
    }
  }, [isReady, user, isVerified, isLoading, navigate]);

  if (!isReady || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
      </div>
    );
  }

  if (!user || !isVerified) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;