import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./services/auth.service";

interface PrivateRouteProps {
  children: ReactNode; // Permite qualquer nó React como filho
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/authentication" replace />
  );
};

export default PrivateRoute;
