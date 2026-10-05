import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// ProtectedRoute: wraps any route element that requires login.
// If the user isn't authenticated, it redirects to /login and remembers
// the page that was originally requested (via location state), so Login
// can send the user back there after a successful login.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
