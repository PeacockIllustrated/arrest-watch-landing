import { useAuth } from './useAuth';
import type { UserRole } from '../components/portal/AuthProvider';

export const useRole = () => {
    const { profile } = useAuth();

    const role: UserRole | null = profile?.role ?? null;

    const hasRole = (requiredRole: UserRole): boolean => {
        if (!role) return false;

        // Role hierarchy: super_admin > owner > admin > analyst > viewer
        const roleHierarchy: Record<UserRole, number> = {
            super_admin: 5,
            owner: 4,
            admin: 3,
            analyst: 2,
            viewer: 1,
        };

        return roleHierarchy[role] >= roleHierarchy[requiredRole];
    };

    const isOwner = (): boolean => role === 'owner';
    const isAdmin = (): boolean => hasRole('admin');
    const isAnalyst = (): boolean => hasRole('analyst');
    const isViewer = (): boolean => hasRole('viewer');

    // Check if user can access admin area (owner or admin only)
    const canAccessAdmin = (): boolean => isAdmin();

    return {
        role,
        hasRole,
        isOwner,
        isAdmin,
        isAnalyst,
        isViewer,
        canAccessAdmin,
    };
};

export default useRole;
