import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Get the active Supabase session
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        // Get admin flag from local storage
        const isAdmin = localStorage.getItem("isAdminAuthenticated") === "true";

        if (session && isAdmin) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();

    // Listen for Supabase auth changes (important for reactivity)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      verifyAuth();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground animate-pulse">
          Checking authorization...
        </p>
      </div>
    );
  }

  return isAllowed ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
