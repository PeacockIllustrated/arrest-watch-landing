import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import '../../styles/portal.css';

const Callback: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // The URL hash contains the auth tokens when using magic links or OAuth
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    setError(error.message);
                    return;
                }

                if (data.session) {
                    // Successfully authenticated
                    navigate('/portal/dashboard', { replace: true });
                } else {
                    // No session, might need to exchange tokens
                    const hashParams = new URLSearchParams(window.location.hash.substring(1));
                    const accessToken = hashParams.get('access_token');
                    const refreshToken = hashParams.get('refresh_token');

                    if (accessToken && refreshToken) {
                        const { error: setSessionError } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                        if (setSessionError) {
                            setError(setSessionError.message);
                        } else {
                            navigate('/portal/dashboard', { replace: true });
                        }
                    } else {
                        setError('No authentication tokens found');
                    }
                }
            } catch (err) {
                setError('Authentication callback failed');
            }
        };

        handleCallback();
    }, [navigate]);

    if (error) {
        return (
            <div
                className="portal-root"
                data-theme="intel-dark"
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-base)',
                    padding: '24px',
                }}
            >
                <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            margin: '0 auto 24px',
                            borderRadius: '50%',
                            background: 'var(--danger-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                        }}
                    >
                        ❌
                    </div>
                    <h1 style={{ margin: '0 0 8px', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        Authentication Failed
                    </h1>
                    <p style={{ margin: '0 0 24px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {error}
                    </p>
                    <a
                        href="/auth/login"
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            background: 'var(--accent)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '6px',
                            fontWeight: 500,
                        }}
                    >
                        Back to Login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div
            className="portal-root"
            data-theme="intel-dark"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-base)',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        width: '48px',
                        height: '48px',
                        margin: '0 auto 16px',
                        border: '3px solid var(--border-default)',
                        borderTopColor: 'var(--accent)',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }}
                />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Completing authentication...
                </p>
                <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        </div>
    );
};

export default Callback;
