import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  try {
    const auth = localStorage.getItem("uims_auth");
    if (auth) {
      const parsed = JSON.parse(auth);
      if (parsed.loggedIn) return <>{children}</>;
    }
  } catch {}
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
