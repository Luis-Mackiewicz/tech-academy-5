import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./services/auth.service";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? <>{children}</> : <Navigate to="/not-found" replace />;
};

export default PrivateRoute;
