import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRole } from '../../hooks/useRole';
import { useTheme } from './ThemeProvider';

// Import wordmark images
import wordmarkWhite from '../../assets/wordmark-white.png';
import wordmarkBlack from '../../assets/wordmark-black.png';

interface PortalSidebarProps {
    onClose?: () => void;
}

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

// SVG Icons as components for cleaner code
const Icons = {
    Dashboard: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
        </svg>
    ),
    Employees: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Incidents: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    ),
    Alerts: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    ),
    Cases: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
        </svg>
    ),
    DatabaseSearch: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><circle cx="19" cy="17" r="3" /><path d="m22 20-1.5-1.5" />
        </svg>
    ),
    MugshotSearch: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="12" cy="10" r="3" /><path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
        </svg>
    ),
    RiskAssessment: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" />
        </svg>
    ),
    Audit: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h6" /><path d="M9 9h1" />
        </svg>
    ),
    Reports: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
        </svg>
    ),
    Integrations: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
    ),
    Billing: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
        </svg>
    ),
    Settings: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    ),
    Admin: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
};

// Navigation groups aligned with MVP structure - Phase 0 Uber Demo
const navGroups: NavGroup[] = [
    {
        title: '', // Flattened for Phase 0
        items: [
            { label: 'Dashboard', path: '/portal/dashboard', icon: <Icons.Dashboard /> },
            { label: 'Roster', path: '/portal/employees', icon: <Icons.Employees /> },
            { label: 'Alerts', path: '/portal/alerts', icon: <Icons.Alerts /> },
            { label: 'Source evidence', path: '/portal/database-search', icon: <Icons.DatabaseSearch /> },
            { label: 'Audit trail', path: '/portal/audit', icon: <Icons.Audit /> },
            { label: 'Source health', path: '/portal/integrations', icon: <Icons.Integrations /> },
        ],
    },
];

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useAuth();
    const { canAccessAdmin } = useRole();
    const { theme } = useTheme();

    // Determine which wordmark to use based on theme
    const isLightTheme = theme === 'intel-light';
    const wordmarkSrc = isLightTheme ? wordmarkBlack : wordmarkWhite;

    const handleNavigation = (path: string) => {
        navigate(path);
        if (onClose) onClose();
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/auth/login');
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <div
            style={{
                width: '260px',
                height: '100%',
                background: 'var(--sidebar-bg)',
                borderRight: '1px solid var(--sidebar-border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Logo Header */}
            <div
                style={{
                    padding: '20px',
                    borderBottom: '1px solid var(--sidebar-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <img
                    src={wordmarkSrc}
                    alt="ArrestDelta"
                    style={{
                        height: '28px',
                        width: 'auto',
                    }}
                />
                {/* Mobile close button */}
                <button
                    onClick={onClose}
                    className="sidebar-close-btn"
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '4px',
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
                {navGroups.map((group, groupIndex) => (
                    <div key={groupIndex} style={{ marginBottom: '8px' }}>
                        {/* Phase 0: Hidden headers
                        <div
                            style={{
                                padding: '8px 20px 4px',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: 'var(--text-muted)',
                            }}
                        >
                            {group.title}
                        </div>
                        */}
                        {group.items.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <button
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '10px 20px',
                                        background: active ? 'var(--sidebar-item-active)' : 'transparent',
                                        border: 'none',
                                        borderLeft: active ? '3px solid var(--accent)' : '3px solid transparent',
                                        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: active ? 500 : 400,
                                        textAlign: 'left',
                                        transition: 'all 0.1s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.background = 'var(--sidebar-item-hover)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.background = 'transparent';
                                        }
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                ))}

                {/* Admin section - RBAC controlled */}
                {canAccessAdmin() && (
                    <div style={{ marginBottom: '8px' }}>
                        <div
                            style={{
                                padding: '8px 20px 4px',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                color: 'var(--text-muted)',
                            }}
                        >
                            Admin
                        </div>
                        <button
                            onClick={() => handleNavigation('/portal/admin')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                                padding: '10px 20px',
                                background: isActive('/portal/admin') ? 'var(--sidebar-item-active)' : 'transparent',
                                border: 'none',
                                borderLeft: isActive('/portal/admin') ? '3px solid var(--accent)' : '3px solid transparent',
                                color: isActive('/portal/admin') ? 'var(--text-primary)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.875rem',
                                fontWeight: isActive('/portal/admin') ? 500 : 400,
                                textAlign: 'left',
                                transition: 'all 0.1s ease',
                            }}
                        >
                            <Icons.Admin />
                            Admin Console
                        </button>
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div
                style={{
                    padding: '16px 20px',
                    borderTop: '1px solid var(--sidebar-border)',
                }}
            >
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--danger)';
                        e.currentTarget.style.color = 'var(--danger)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                </button>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .sidebar-close-btn {
            display: block !important;
          }
        }
      `}</style>
        </div>
    );
};

export default PortalSidebar;
