import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface AdminSidebarProps {
    onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'OVERVIEW', path: '/admin/dashboard' },
        { label: 'LEADS', path: '/admin/leads' },
        { label: 'PERSONNEL', path: '/admin/personnel' },
        { label: 'TASKS', path: '/admin/tasks' },
        { label: 'SETTINGS', path: '/admin/settings' },
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        if (onClose) onClose();
    };

    return (
        <div style={{
            width: '250px',
            height: '100%', // Ensure full height
            borderRight: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            background: '#050505',
            zIndex: 10,
            position: 'relative' // For close button positioning
        }}>
            <div style={{
                padding: '2rem',
                borderBottom: '1px solid #333',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                letterSpacing: '1px',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                ARRESTDELTA
                {/* Mobile Close Button */}
                <button
                    onClick={onClose}
                    className="mobile-close-btn"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        display: 'none', // Hidden on desktop
                        fontSize: '1.5rem',
                        lineHeight: 1
                    }}
                >
                    ×
                </button>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .mobile-close-btn {
                        display: block !important;
                    }
                }
            `}</style>

            <div style={{ flex: 1, padding: '2rem 0' }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <div
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            style={{
                                padding: '1rem 2rem',
                                cursor: 'pointer',
                                borderLeft: isActive ? '4px solid #e40028' : '4px solid transparent',
                                background: isActive ? 'linear-gradient(90deg, rgba(228, 0, 40, 0.1), transparent)' : 'transparent',
                                color: isActive ? 'white' : '#888',
                                transition: 'all 0.2s',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            {isActive && <div style={{ width: '6px', height: '6px', background: '#e40028' }} />}
                            {item.label}
                        </div>
                    );
                })}
            </div>

            <div style={{ padding: '2rem', borderTop: '1px solid #333' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#e40028'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                    <div style={{ width: '10px', height: '10px', background: '#333' }} />
                    LOGOUT
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
