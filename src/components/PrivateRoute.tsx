import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Loader } from "./Loader/Loader";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
