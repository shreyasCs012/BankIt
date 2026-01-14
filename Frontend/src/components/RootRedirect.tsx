import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />;
};
