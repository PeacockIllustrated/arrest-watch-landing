import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RadarNode from '../components/investor/ui/RadarNode';
import { ChartIcon, LinkIcon, LockIcon } from '../components/portal/Icons';
import { DeckHubAuthProvider, useDeckHubAuth } from '../components/deckhub/DeckHubAuthContext';
import OnboardingModal from '../components/investor/_legacy/OnboardingModal';
import { DECKS, type Deck } from '../lib/decks';
import { usePageTitle } from '../hooks/usePageTitle';
import '../styles/brand.css';

// ============ TYPING EFFECT COMPONENT ============
const TypingText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 50 }) => {
    const [displayed, setDisplayed] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayed(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowCursor(false), 2000);
            }
        }, delay);
        return () => clearInterval(interval);
    }, [text, delay]);

    return (
        <span className="text-mono">
            {displayed}
            <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.3s' }}>_</span>
        </span>
    );
};

// ============ DATA STREAM PARTICLE ============
const DataStreamParticle: React.FC<{ index: number }> = ({ index }) => {
    const chars = ['0', '1', 'A', 'F', '>', '<', '/', '\\', '|', '█'];
    const [char, setChar] = useState(chars[Math.floor(Math.random() * chars.length)]);

    useEffect(() => {
        const interval = setInterval(() => {
            setChar(chars[Math.floor(Math.random() * chars.length)]);
        }, 200 + Math.random() * 500);
        return () => clearInterval(interval);
    }, []);

    const style: React.CSSProperties = {
        position: 'absolute',
        left: `${5 + (index * 7) % 90}%`,
        bottom: '-20px',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-alert-red)',
        opacity: 0.06,
        animation: `floatUp ${12 + Math.random() * 8}s linear infinite`,
        animationDelay: `${index * 0.5}s`,
    };

    return <span style={style}>{char}</span>;
};

// ============ LOCKED OVERLAY COMPONENT ============
const LockedOverlay: React.FC<{ onRequestAccess: () => void }> = ({ onRequestAccess }) => (
    <div
        onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRequestAccess();
        }}
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,0,5,0.9) 100%)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
        }}
    >
        {/* Diagonal scan lines */}
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(228, 0, 40, 0.03) 2px, rgba(228, 0, 40, 0.03) 4px)',
            pointerEvents: 'none'
        }} />

        <LockIcon size={32} color="#e40028" />
        <div style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            color: '#e40028',
            letterSpacing: '0.15em',
            textShadow: '0 0 10px rgba(228, 0, 40, 0.5)'
        }}>
            CLASSIFIED
        </div>
        <div style={{
            marginTop: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#666',
            letterSpacing: '0.1em'
        }}>
            ACCESS RESTRICTED
        </div>
        <button
            style={{
                marginTop: '1.5rem',
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                border: '1px solid #e40028',
                color: '#e40028',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            REQUEST ACCESS
        </button>
    </div>
);

// ============ DECK CARD COMPONENT ============
const DeckCard: React.FC<{
    deck: Deck;
    index: number;
    isLocked: boolean;
    onRequestAccess: () => void;
}> = ({ deck, index, isLocked, onRequestAccess }) => {
    const [isHovered, setIsHovered] = useState(false);

    const CardContent = (
        <div
            className="deck-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                background: 'var(--glass-surface)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--glass-border)',
                padding: '2rem',
                transition: 'all 0.3s var(--ease-snap)',
                transform: isHovered && !isLocked ? 'scale(1.02) translateY(-4px)' : 'scale(1)',
                boxShadow: isHovered && !isLocked
                    ? '0 0 30px rgba(228, 0, 40, 0.3), inset 0 0 20px rgba(228, 0, 40, 0.05)'
                    : 'none',
                borderColor: isHovered && !isLocked ? 'var(--color-alert-red)' : 'var(--glass-border)',
                animationDelay: `${index * 0.1}s`,
                overflow: 'hidden',
            }}
        >
            {/* Corner Brackets */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid var(--color-alert-red)', borderLeft: '2px solid var(--color-alert-red)' }} />
            <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid var(--color-alert-red)', borderRight: '2px solid var(--color-alert-red)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid var(--color-alert-red)', borderLeft: '2px solid var(--color-alert-red)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid var(--color-alert-red)', borderRight: '2px solid var(--color-alert-red)' }} />

            {/* Status Indicator */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: isLocked ? '#666' : 'var(--color-alert-red)',
                    animation: isLocked ? 'none' : 'pulse 2s ease-in-out infinite',
                    boxShadow: isLocked ? 'none' : '0 0 10px var(--color-alert-red)',
                }} />
                <span className="text-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: isLocked ? '#666' : 'var(--color-alert-red)' }}>
                    {isLocked ? 'LOCKED' : deck.status}
                </span>
            </div>

            {/* Category Badge */}
            <div style={{ marginBottom: '1rem' }}>
                <span className="text-mono text-muted" style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.5rem',
                    border: '1px solid var(--color-grid)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                }}>
                    {deck.category === 'investor'
                        ? <><ChartIcon size={12} color="currentColor" /> INVESTOR</>
                        : <><LinkIcon size={12} color="currentColor" /> TRACTION</>
                    }
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.4rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: 'var(--color-signal-white)',
                letterSpacing: '-0.02em',
            }}>
                {deck.title}
            </h3>

            {/* Description */}
            <p className="text-muted" style={{
                fontSize: '0.9rem',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
            }}>
                {deck.description}
            </p>

            {/* CTA Arrow */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isLocked ? '#666' : 'var(--color-alert-red)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 500,
            }}>
                <span>{isLocked ? 'RESTRICTED' : 'VIEW DECK'}</span>
                {!isLocked && (
                    <span style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s var(--ease-snap)',
                        transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
                    }}>
                        →
                    </span>
                )}
            </div>

            {/* Scan Line Sweep on Hover (unlocked only) */}
            {isHovered && !isLocked && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, var(--color-alert-red), transparent)',
                    animation: 'scanSweep 1s ease-out',
                }} />
            )}

            {/* Locked Overlay */}
            {isLocked && <LockedOverlay onRequestAccess={onRequestAccess} />}
        </div>
    );

    // If locked, render as div; if unlocked, render as Link
    if (isLocked) {
        return CardContent;
    }

    return (
        <Link to={deck.route} style={{ textDecoration: 'none', color: 'inherit' }}>
            {CardContent}
        </Link>
    );
};

// ============ DECK HUB CONTENT ============
const DeckHubContent: React.FC = () => {
    usePageTitle('Decks');
    const { isAuthenticated, user, accessibleDecks, loading, logout } = useDeckHubAuth();
    const [showOnboardingModal, setShowOnboardingModal] = useState(false);

    const investorDecks = DECKS.filter(d => d.category === 'investor');
    const partnerDecks = DECKS.filter(d => d.category === 'partner');
    const unlockedCount = accessibleDecks.length;

    const isDeckLocked = (deckId: string): boolean => {
        if (!isAuthenticated) return true;
        return !accessibleDecks.includes(deckId);
    };

    const handleRequestAccess = () => {
        // User is already authenticated (came through SiteGatePage)
        // Show onboarding modal to request access to specific decks
        setShowOnboardingModal(true);
    };

    // Override body styles for scrolling
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
        };
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-void)'
            }}>
                <div className="text-mono text-muted">INITIALIZING ACCESS MATRIX...</div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--color-void)',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `
                    linear-gradient(30deg, var(--color-grid) 12%, transparent 12.5%, transparent 87%, var(--color-grid) 87.5%, var(--color-grid)),
                    linear-gradient(150deg, var(--color-grid) 12%, transparent 12.5%, transparent 87%, var(--color-grid) 87.5%, var(--color-grid)),
                    linear-gradient(30deg, var(--color-grid) 12%, transparent 12.5%, transparent 87%, var(--color-grid) 87.5%, var(--color-grid)),
                    linear-gradient(150deg, var(--color-grid) 12%, transparent 12.5%, transparent 87%, var(--color-grid) 87.5%, var(--color-grid)),
                    linear-gradient(60deg, rgba(51,51,51,0.5) 25%, transparent 25.5%, transparent 75%, rgba(51,51,51,0.5) 75%, rgba(51,51,51,0.5)),
                    linear-gradient(60deg, rgba(51,51,51,0.5) 25%, transparent 25.5%, transparent 75%, rgba(51,51,51,0.5) 75%, rgba(51,51,51,0.5))
                `,
                backgroundSize: '80px 140px',
                backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
                opacity: 0.03,
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0.3,
            }} />

            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                {[...Array(6)].map((_, i) => (
                    <DataStreamParticle key={i} index={i} />
                ))}
            </div>

            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.07, pointerEvents: 'none', zIndex: 0 }}>
                <RadarNode size="1200px" type="radar" />
            </div>

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '4rem 2rem' }}>
                {/* Auth Status Bar */}
                <div className="deck-hub-navbar" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '0.75rem 1rem',
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid var(--color-grid)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                    zIndex: 100,
                    flexWrap: 'wrap'
                }}>
                    <Link to="/" className="text-mono" style={{ color: '#888', textDecoration: 'none', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        ← ARRESTDELTA
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {isAuthenticated ? (
                            <>
                                <span className="deck-hub-email text-mono" style={{ fontSize: '0.65rem', color: '#4CAF50', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    ● {user?.email}
                                </span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                                    {unlockedCount}/{DECKS.length}
                                </span>
                                <button
                                    onClick={logout}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #333',
                                        color: '#666',
                                        padding: '0.4rem 0.75rem',
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: '0.6rem',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    LOGOUT
                                </button>
                            </>
                        ) : (
                            <span className="text-mono text-muted" style={{ fontSize: '0.65rem' }}>
                                LOADING...
                            </span>
                        )}
                    </div>
                </div>

                {/* Hero Section */}
                <header style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '900px', marginInline: 'auto', paddingTop: '4rem' }}>
                    <div className="animate-fade-in-up" style={{ marginBottom: '1.5rem' }}>
                        <span className="text-mono text-muted" style={{
                            fontSize: '0.75rem',
                            letterSpacing: '0.2em',
                            padding: '0.5rem 1rem',
                            border: '1px solid var(--color-grid)',
                            display: 'inline-block',
                        }}>
                            ARRESTDELTA // SECURE MATERIALS
                        </span>
                    </div>

                    <h1
                        className="text-huge animate-fade-in-up"
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            marginBottom: '1.5rem',
                            lineHeight: 0.95,
                        }}
                    >
                        DECK <span className="text-red">LIBRARY</span>
                    </h1>

                    <div className="text-muted animate-fade-in-up" style={{ fontSize: '1.1rem', animationDelay: '0.2s' }}>
                        <TypingText text="Investor and Traction presentation materials. Access granted per user." delay={50} />
                    </div>

                    {/* Stats Row */}
                    <div className="animate-fade-in-up" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '3rem',
                        marginTop: '3rem',
                        animationDelay: '0.3s',
                    }}>
                        {[
                            { label: 'TOTAL DECKS', value: DECKS.length },
                            { label: 'UNLOCKED', value: isAuthenticated ? unlockedCount : '-' },
                            { label: 'STATUS', value: isAuthenticated ? 'ACTIVE' : 'GUEST' },
                        ].map((stat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div className="text-mono text-red" style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </header>

                {/* Investor Section */}
                <section style={{ maxWidth: '1400px', marginInline: 'auto', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '30px', height: '2px', background: 'var(--color-alert-red)' }} />
                        <h2 className="text-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--color-signal-white)' }}>
                            INVESTOR MATERIALS
                        </h2>
                        <div style={{ flex: 1, height: '1px', background: 'var(--color-grid)' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {investorDecks.map((deck, i) => (
                            <DeckCard
                                key={deck.id}
                                deck={deck}
                                index={i}
                                isLocked={isDeckLocked(deck.id)}
                                onRequestAccess={handleRequestAccess}
                            />
                        ))}
                    </div>
                </section>

                {/* Partner Section */}
                <section style={{ maxWidth: '1400px', marginInline: 'auto', marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ width: '30px', height: '2px', background: 'var(--color-alert-red)' }} />
                        <h2 className="text-mono" style={{ fontSize: '0.9rem', letterSpacing: '0.15em', color: 'var(--color-signal-white)' }}>
                            EARLY TRACTION
                        </h2>
                        <div style={{ flex: 1, height: '1px', background: 'var(--color-grid)' }} />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {partnerDecks.map((deck, i) => (
                            <DeckCard
                                key={deck.id}
                                deck={deck}
                                index={i + investorDecks.length}
                                isLocked={isDeckLocked(deck.id)}
                                onRequestAccess={handleRequestAccess}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ textAlign: 'center', marginTop: '4rem', paddingBottom: '2rem' }}>
                    <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                        ← BACK TO MAIN SITE
                    </Link>
                </footer>
            </div>

            {/* Modals */}
            <OnboardingModal isOpen={showOnboardingModal} onClose={() => setShowOnboardingModal(false)} />

            {/* Keyframes */}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 0.15; }
                    90% { opacity: 0.15; }
                    100% { transform: translateY(-100vh); opacity: 0; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.9); }
                }
                @keyframes scanSweep {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                body::-webkit-scrollbar {
                    width: 6px;
                    height: 0;
                }
                body {
                    scrollbar-width: thin;
                    overflow-x: hidden !important;
                }
            `}</style>
        </div>
    );
};

// ============ MAIN COMPONENT WITH PROVIDER ============
const DeckDashboard: React.FC = () => {
    return (
        <DeckHubAuthProvider>
            <DeckHubContent />
        </DeckHubAuthProvider>
    );
};

export default DeckDashboard;
