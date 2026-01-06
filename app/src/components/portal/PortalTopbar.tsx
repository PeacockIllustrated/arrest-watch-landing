import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeSwitcher } from './ThemeSwitcher';
import { BuildingIcon, CheckIcon } from './Icons';

interface PortalTopbarProps {
    onMenuClick: () => void;
}

export const PortalTopbar: React.FC<PortalTopbarProps> = ({ onMenuClick }) => {
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [orgMenuOpen, setOrgMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const orgMenuRef = useRef<HTMLDivElement>(null);

    // Close menus on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
            if (orgMenuRef.current && !orgMenuRef.current.contains(e.target as Node)) {
                setOrgMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth/login');
    };

    const userInitials = profile?.name
        ? profile.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.slice(0, 2).toUpperCase() || 'U';

    return (
        <header
            style={{
                height: '60px',
                background: 'var(--topbar-bg)',
                borderBottom: '1px solid var(--topbar-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                gap: '16px',
            }}
        >
            {/* Left: Mobile menu + Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {/* Mobile menu button */}
                <button
                    onClick={onMenuClick}
                    className="mobile-menu-btn"
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '8px',
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>

                {/* Global Search */}
                <div
                    style={{
                        position: 'relative',
                        maxWidth: '400px',
                        width: '100%',
                    }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                        }}
                    >
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search entities, alerts, cases..."
                        style={{
                            width: '100%',
                            padding: '10px 14px 10px 44px',
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            borderRadius: '0px',
                            color: 'var(--text-primary)',
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: '0.8rem',
                            outline: 'none',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent)';
                            e.target.style.boxShadow = '0 0 10px rgba(228, 0, 40, 0.15)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--input-border)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <kbd
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            padding: '3px 8px',
                            background: 'transparent',
                            border: '1px solid var(--border-default)',
                            borderRadius: '0px',
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: '0.65rem',
                            color: 'var(--text-muted)',
                        }}
                    >
                        ⌘K
                    </kbd>
                </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Theme Switcher */}
                <ThemeSwitcher />

                {/* Organisation Switcher (Stub) */}
                <div ref={orgMenuRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setOrgMenuOpen(!orgMenuOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 14px',
                            background: 'transparent',
                            border: '1px solid var(--border-default)',
                            borderRadius: '0px',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)';
                            e.currentTarget.style.background = 'rgba(228, 0, 40, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-default)';
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <BuildingIcon size={14} />
                        <span className="org-name" style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            ORG
                        </span>
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            style={{
                                transform: orgMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.15s ease',
                            }}
                        >
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>
                    {orgMenuOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                minWidth: '200px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-default)',
                                borderRadius: '0px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                                zIndex: 100,
                                padding: '8px',
                            }}
                        >
                            <div style={{
                                padding: '8px 12px',
                                fontSize: '0.7rem',
                                fontFamily: "'Roboto Mono', monospace",
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                Organisations
                            </div>
                            <button
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    width: '100%',
                                    padding: '12px',
                                    background: 'var(--accent-muted)',
                                    border: 'none',
                                    borderLeft: '2px solid var(--accent)',
                                    borderRadius: '0px',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                }}
                            >
                                <BuildingIcon size={14} />
                                My Organisation
                                <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>
                                    <CheckIcon size={14} />
                                </span>
                            </button>
                            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '8px 0' }} />
                            <div style={{
                                padding: '8px 12px',
                                fontSize: '0.7rem',
                                fontFamily: "'Roboto Mono', monospace",
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase'
                            }}>
                                [ORG SWITCHING]
                            </div>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div ref={userMenuRef} style={{ position: 'relative' }}>
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '4px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            }}
                        >
                            {userInitials}
                        </div>
                    </button>
                    {userMenuOpen && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '4px',
                                minWidth: '220px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-default)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                                zIndex: 100,
                                overflow: 'hidden',
                            }}
                        >
                            {/* User info */}
                            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                                    {profile?.name || 'User'}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    {user?.email}
                                </div>
                                <div style={{ marginTop: '8px' }}>
                                    <span
                                        style={{
                                            display: 'inline-block',
                                            padding: '2px 8px',
                                            background: 'var(--accent-muted)',
                                            color: 'var(--accent)',
                                            borderRadius: '9999px',
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {profile?.role || 'viewer'}
                                    </span>
                                </div>
                            </div>
                            {/* Menu items */}
                            <div style={{ padding: '8px' }}>
                                <button
                                    onClick={() => {
                                        navigate('/portal/settings');
                                        setUserMenuOpen(false);
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '10px 12px',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        textAlign: 'left',
                                        transition: 'all 0.1s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--sidebar-item-hover)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                    </svg>
                                    Settings
                                </button>
                                <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />
                                <button
                                    onClick={handleSignOut}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '10px 12px',
                                        background: 'transparent',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: 'var(--danger)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        textAlign: 'left',
                                        transition: 'all 0.1s ease',
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--danger-muted)')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .org-name {
            display: none !important;
          }
        }
      `}</style>
        </header>
    );
};

export default PortalTopbar;
