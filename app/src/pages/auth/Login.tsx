import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { usePageTitle } from '../../hooks/usePageTitle';
import '../../styles/portal.css';

const Login: React.FC = () => {
    usePageTitle('Login');
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/portal/dashboard';

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message.toUpperCase());
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError('AN UNEXPECTED ERROR OCCURRED');
        } finally {
            setLoading(false);
        }
    };

    // Custom Red Arrow Cursor SVG
    const cursorUrl = `url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L10.5 20.5L13.5 13.5L20.5 10.5L3 3Z" fill="%23E40028" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>') 2 2, auto`;

    return (
        <div
            className="portal-login-root"
            style={{
                height: '100vh',
                width: '100vw',
                background: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Space Mono', monospace",
                color: '#e40028',
                cursor: cursorUrl
            }}
        >
            <style>{`
                /* Override global cursor: none !important from brand.css */
                .portal-login-root, .portal-login-root * {
                    cursor: ${cursorUrl} !important;
                }
                /* Ensure interactive elements keep the cursor */
                .portal-login-root button, 
                .portal-login-root input {
                    cursor: ${cursorUrl} !important;
                }
            `}</style>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                border: '1px solid #333',
                position: 'relative'
            }}>
                {/* Decorative Corner Markers */}
                <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '10px', height: '10px', borderTop: '2px solid #e40028', borderLeft: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '10px', height: '10px', borderTop: '2px solid #e40028', borderRight: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '10px', height: '10px', borderBottom: '2px solid #e40028', borderLeft: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '10px', height: '10px', borderBottom: '2px solid #e40028', borderRight: '2px solid #e40028' }} />

                <h2 style={{
                    fontSize: '1.2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    letterSpacing: '2px',
                    borderBottom: '1px solid #333',
                    paddingBottom: '1rem'
                }}>
                    PORTAL ACCESS // SECURE
                </h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', marginBottom: '0.5rem', opacity: 0.7 }}>EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid #333',
                                padding: '0.8rem',
                                color: 'white',
                                fontFamily: 'inherit',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.7rem', marginBottom: '0.5rem', opacity: 0.7 }}>PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid #333',
                                padding: '0.8rem',
                                color: 'white',
                                fontFamily: 'inherit',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            color: '#e40028',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            border: '1px solid #e40028',
                            padding: '0.5rem',
                            background: 'rgba(228, 0, 40, 0.1)'
                        }}>
                            ERROR: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            background: '#e40028',
                            color: 'white',
                            border: 'none',
                            padding: '1rem',
                            fontFamily: 'inherit',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            opacity: loading ? 0.7 : 1,
                            transition: 'all 0.2s'
                        }}
                    >
                        {loading ? 'AUTHENTICATING...' : 'INITIATE SESSION'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
