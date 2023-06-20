import { FC, PropsWithChildren } from 'react';
import { useAuth } from '../hooks/useAuthState';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  children,
}) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
