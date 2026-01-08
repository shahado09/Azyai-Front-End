import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function RequireRole({ allowedRoles = [], children }) {
  const { user, isLoading } = useContext(UserContext);


  const roles = Array.isArray(allowedRoles)? allowedRoles: typeof allowedRoles === "string"? 
  allowedRoles.split(",").map((r) => r.trim()).filter(Boolean) : [];

  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.role) return <Navigate to="/cloth" replace />;

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/cloth" replace />;
  }

  return children;
}

export default RequireRole;
