import React, { useState } from 'react';
import { useDeckHubAuth } from './DeckHubAuthContext';

interface DeckHubLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegisterInterest: () => void;
}

const DeckHubLoginModal: React.FC<DeckHubLoginModalProps> = ({ isOpen, onClose, onRegisterInterest }) => {
    const { login } = useDeckHubAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;

        setStatus('loading');
        const result = await login(email, password);

        if (result.success) {
            setStatus('success');
            setMessage('ACCESS GRANTED');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setEmail('');
                setPassword('');
            }, 1500);
        } else {
            setStatus('error');
            setMessage(result.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
            onClick={onClose}
        >
            <div
                style={{
                    width: '450px',
                    maxWidth: '90%',
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    position: 'relative'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Corner Brackets */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #e40028', borderLeft: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #e40028', borderRight: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #e40028', borderLeft: '2px solid #e40028' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #e40028', borderRight: '2px solid #e40028' }} />

                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: '#e40028',
                        letterSpacing: '0.1em'
                    }}>
                        SECURE ACCESS // DECK LIBRARY
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#666',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {status === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '1rem' }}>✓</div>
                            <div style={{ fontFamily: 'var(--font-mono)', color: '#4CAF50' }}>{message}</div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    marginBottom: '0.5rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    EMAIL
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Enter registered email"
                                    disabled={status === 'loading'}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid #333',
                                        color: 'white',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '1rem',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Password Field */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.7rem',
                                    color: '#666',
                                    marginBottom: '0.5rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    PASSWORD
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        disabled={status === 'loading'}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            paddingRight: '4rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid #333',
                                            color: 'white',
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '1rem',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'none',
                                            border: 'none',
                                            color: '#666',
                                            cursor: 'pointer',
                                            fontSize: '0.7rem',
                                            fontFamily: 'var(--font-mono)',
                                            letterSpacing: '0.05em'
                                        }}
                                    >
                                        {showPassword ? 'HIDE' : 'SHOW'}
                                    </button>
                                </div>
                            </div>

                            {status === 'error' && (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(228, 0, 40, 0.1)',
                                    border: '1px solid #e40028',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.85rem',
                                    color: '#e40028'
                                }}>
                                    {message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading' || !email.trim() || !password.trim()}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: '#e40028',
                                    border: 'none',
                                    color: 'white',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: status === 'loading' ? 'wait' : 'pointer',
                                    opacity: status === 'loading' || !email.trim() || !password.trim() ? 0.7 : 1
                                }}
                            >
                                {status === 'loading' ? 'VERIFYING...' : 'ACCESS DECKS'}
                            </button>
                        </form>
                    )}

                    {/* Register CTA */}
                    {status !== 'success' && (
                        <div style={{
                            marginTop: '2rem',
                            paddingTop: '1.5rem',
                            borderTop: '1px solid #333',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>
                                Don't have access yet?
                            </div>
                            <button
                                onClick={onRegisterInterest}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #333',
                                    color: '#888',
                                    padding: '0.75rem 1.5rem',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.8rem',
                                    cursor: 'pointer'
                                }}
                            >
                                REGISTER INTEREST
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeckHubLoginModal;
