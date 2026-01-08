import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface SiteProtectedRouteProps {
    children: React.ReactNode;
}

const SiteProtectedRoute: React.FC<SiteProtectedRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let mounted = true;

        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (mounted) {
                    setAuthenticated(!!session);
                    setLoading(false);
                }
            } catch (err) {
                console.error('Error checking session:', err);
                if (mounted) {
                    setAuthenticated(false);
                    setLoading(false);
                }
            }
        };

        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setAuthenticated(!!session);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Custom Red Arrow Cursor SVG
    const cursorUrl = `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L10.5 20.5L13.5 13.5L20.5 10.5L3 3Z" fill="%23E40028" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>') 2 2, auto`;

    if (loading) {
        return (
            <div
                className="site-protected-loading"
                style={{
                    height: '100vh',
                    width: '100vw',
                    background: '#0a0a0a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#e40028',
                    fontFamily: "'Space Mono', monospace",
                    cursor: cursorUrl
                }}
            >
                <style>{`
                    .site-protected-loading, .site-protected-loading * {
                        cursor: ${cursorUrl} !important;
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 0.5; }
                        50% { opacity: 1; }
                    }
                `}</style>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #333',
                        borderTopColor: '#e40028',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                        margin: '0 auto 16px',
                    }} />
                    <p style={{
                        color: '#666',
                        fontSize: '0.875rem',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }}>
                        AUTHENTICATING...
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

    if (!authenticated) {
        // Redirect to gate, preserving the intended destination
        return <Navigate to="/gate" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default SiteProtectedRoute;
