import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}

const hasPermissions = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  if (userPermissions.includes('*')) return true;
  return requiredPermissions.every(permission => userPermissions.includes(permission));
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  requiredPermissions,
  fallback = <div className="p-8 text-center">Acesso negado</div>
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <>{fallback}</>;
  }

  if (requiredPermissions && !hasPermissions(user?.permissions || [], requiredPermissions)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};