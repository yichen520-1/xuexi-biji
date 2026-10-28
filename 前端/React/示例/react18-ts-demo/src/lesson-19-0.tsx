export {};
import { Navigate, Outlet, useLocation } from 'react-router-dom';
export function RequireLogin({ authenticated }: { authenticated: boolean }) {
  const location = useLocation();
  return authenticated ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}
