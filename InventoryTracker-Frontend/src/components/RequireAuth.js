import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();

  return (
    auth?.email || auth?.demoEmail
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}
