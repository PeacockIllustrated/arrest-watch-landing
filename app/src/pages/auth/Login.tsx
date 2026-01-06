import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button, Input, Card, CardBody } from '../../components/ui';
import logoMain from '../../assets/logo_main.png';
import '../../styles/portal.css';

const Login: React.FC = () => {
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
                setError(error.message);
            } else {
                navigate(from, { replace: true });
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleMagicLink = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setError(error.message);
            } else {
                setError(null);
                alert('Check your email for the login link!');
            }
        } catch (err) {
            setError('Failed to send magic link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="portal-root"
            data-theme="intel-dark"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                background: 'var(--bg-base)',
            }}
        >
            <div style={{ width: '100%', maxWidth: '400px' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <img
                        src={logoMain}
                        alt="ArrestDelta"
                        style={{
                            height: '48px',
                            width: 'auto',
                            margin: '0 auto 16px',
                            display: 'block',
                        }}
                    />
                    <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        ArrestDelta Portal
                    </h1>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Sign in to access the intelligence portal
                    </p>
                </div>

                <Card>
                    <CardBody>
                        <form onSubmit={handleLogin}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <Input
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    fullWidth
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    fullWidth
                                />

                                {error && (
                                    <div
                                        style={{
                                            padding: '12px',
                                            background: 'var(--danger-muted)',
                                            border: '1px solid var(--danger)',
                                            borderRadius: '6px',
                                            color: 'var(--danger)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {error}
                                    </div>
                                )}

                                <Button variant="primary" fullWidth loading={loading} type="submit">
                                    Sign In
                                </Button>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        color: 'var(--text-muted)',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
                                    or
                                    <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }} />
                                </div>

                                <Button
                                    variant="secondary"
                                    fullWidth
                                    type="button"
                                    onClick={handleMagicLink}
                                    disabled={loading}
                                >
                                    Send Magic Link
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <p
                    style={{
                        marginTop: '24px',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                    }}
                >
                    Need access?{' '}
                    <a href="mailto:contact@arrestdelta.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                        Contact your administrator
                    </a>
                </p>

                <div
                    style={{
                        marginTop: '48px',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                    }}
                >
                    <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginRight: '16px' }}>
                        Privacy Policy
                    </a>
                    <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
                        Terms of Service
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
