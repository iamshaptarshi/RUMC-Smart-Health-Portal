import { Navigate } from "react-router";
import { useAuth } from "../../Authentication/AuthProvider";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;