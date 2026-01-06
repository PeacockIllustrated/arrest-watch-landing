import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';
import type { UserRole } from './AuthProvider';

interface PortalProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
}

export const PortalProtectedRoute: React.FC<PortalProtectedRouteProps> = ({
    children,
    requiredRole
}) => {
    const { user, loading } = useAuth();
    const { hasRole } = useRole();
    const location = useLocation();

    // Show loading state
    if (loading) {
        return (
            <div
                className="portal-root"
                style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-base)',
                    color: 'var(--accent)',
                    fontFamily: "'Inter', sans-serif",
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid var(--border-default)',
                            borderTopColor: 'var(--accent)',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                            margin: '0 auto 16px',
                        }}
                    />
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Authenticating...
                    </p>
                </div>
                <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Check role if required
    if (requiredRole && !hasRole(requiredRole)) {
        // Redirect to dashboard with insufficient permissions
        return <Navigate to="/portal/dashboard" replace />;
    }

    return <>{children}</>;
};

export default PortalProtectedRoute;
