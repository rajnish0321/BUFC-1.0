
import { Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: "student" | "staff";
};

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) => {
  const { user, loading, isStudent, isStaff } = useUser();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "student" && !isStudent) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "staff" && !isStaff) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
