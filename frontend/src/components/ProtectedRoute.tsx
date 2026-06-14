import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/jwtCheck";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await checkAuth();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
