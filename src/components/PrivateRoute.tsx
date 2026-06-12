import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

export default function PrivateRoute({
  children,
  isLoggedIn,
}: PrivateRouteProps) {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
}
