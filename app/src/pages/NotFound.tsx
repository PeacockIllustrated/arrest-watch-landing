import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

/**
 * Branded 404 Not Found page
 * Provides clear navigation back to main site and data room
 */
const NotFound: React.FC = () => {
    usePageTitle('Page Not Found');

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Roboto Mono', monospace",
            color: '#fff',
            padding: '2rem',
            textAlign: 'center'
        }}>
            {/* Grid Background */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(51,51,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(51,51,51,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Error Code */}
                <div style={{
                    fontSize: 'clamp(6rem, 20vw, 12rem)',
                    fontWeight: 800,
                    color: '#e40028',
                    lineHeight: 0.9,
                    textShadow: '0 0 60px rgba(228, 0, 40, 0.4)',
                    marginBottom: '1rem'
                }}>
                    404
                </div>

                {/* Message */}
                <h1 style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    fontWeight: 600
                }}>
                    SIGNAL NOT FOUND
                </h1>

                <p style={{
                    color: '#888',
                    maxWidth: '400px',
                    marginBottom: '3rem',
                    lineHeight: 1.6
                }}>
                    The requested route does not exist in our system.
                </p>

                {/* Navigation Options */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <Link
                        to="/"
                        style={{
                            padding: '1rem 2rem',
                            background: '#e40028',
                            color: '#fff',
                            textDecoration: 'none',
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s'
                        }}
                    >
                        MAIN SITE
                    </Link>

                    <Link
                        to="/decks"
                        style={{
                            padding: '1rem 2rem',
                            background: 'transparent',
                            border: '1px solid #333',
                            color: '#fff',
                            textDecoration: 'none',
                            fontFamily: "'Roboto Mono', monospace",
                            fontSize: '0.9rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            transition: 'all 0.2s'
                        }}
                    >
                        DATA ROOM
                    </Link>
                </div>

                {/* Decorative Element */}
                <div style={{
                    marginTop: '4rem',
                    fontSize: '0.7rem',
                    color: '#444',
                    letterSpacing: '0.2em'
                }}>
                    ERROR_CODE: ROUTE_NOT_FOUND
                </div>
            </div>
        </div>
    );
};

export default NotFound;
