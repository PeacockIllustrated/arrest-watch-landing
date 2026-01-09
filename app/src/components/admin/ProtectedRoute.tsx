import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // 1. Check Session
                const { data: { session } } = await supabase.auth.getSession();

                if (!session?.user) {
                    setAuthorized(false);
                    setLoading(false);
                    return;
                }

                // 2. Check Role
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (error || profile?.role !== 'super_admin') {
                    console.warn('Unauthorized access attempt:', session.user.email);
                    setAuthorized(false);
                    setLoading(false);
                    return; // Don't redirect yet, let the component handle the authorized state
                } else {
                    setAuthorized(true);
                }
            } catch (err) {
                console.error('Auth check error:', err);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!session) {
                setAuthorized(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                background: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e40028',
                fontFamily: 'monospace'
            }}>
                VERIFYING CLEARANCE...
            </div>
        );
    }

    if (!authorized) {
        // Check if we are actually logged in but just unauthorized
        // We can't easily access session here without storing it, but we can try getting it synchronously or just default to redirect
        // Let's improve the UX: if we have a session but failed auth, show 403.

        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                background: '#0a0a0a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#e40028',
                fontFamily: 'monospace'
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>403 // ACCESS DENIED</h1>
                <p>INSUFFICIENT PRIVILEGES</p>
                <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #333', fontSize: '0.8rem', color: '#666' }}>
                    Try logging out and back in
                </div>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.href = '/admin/login';
                    }}
                    style={{
                        marginTop: '1rem',
                        padding: '0.8rem 1.5rem',
                        background: '#e40028',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    FORCE LOGOUT
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
