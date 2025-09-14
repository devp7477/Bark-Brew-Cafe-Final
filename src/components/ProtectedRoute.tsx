import { Navigate, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useAdmin } from "@/hooks/useAdmin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const location = useLocation();

  if (!isLoaded || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole === "admin") {
    if (!isAdmin) {
      // Redirect non-admin users to their dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }

  // For user routes, redirect admin users to admin dashboard
  if (requiredRole === "user" || !requiredRole) {
    if (isAdmin) {
      return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;