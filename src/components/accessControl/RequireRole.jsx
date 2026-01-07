import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

function RequireRole(allowedRoles, children) {
const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/cloth" replace />;
  }
  return children;
}

export default RequireRole
