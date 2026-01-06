import React from 'react';
import { Link } from 'react-router-dom';

const Slide12_Positioning: React.FC = () => {
    return (
        <section className="brand-section" id="revenue-slide-12">
            <div className="grid-bg-overlay" />

            {/* Multi-layer ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '30%', width: '40%', height: '40%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.1), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />
            <div style={{
                position: 'absolute', bottom: '10%', right: '10%', width: '30%', height: '30%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.05), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', marginBottom: '1rem' }}>
                    <span className="label text-mono text-muted">
                        12. POSITIONING
                    </span>
                </div>

                {/* Quote Block with red left border */}
                <div className="animate-fade-in-up" style={{
                    animationDelay: '0.3s',
                    maxWidth: '900px',
                    padding: '2.5rem 3rem',
                    borderLeft: '4px solid var(--color-alert-red)',
                    background: 'rgba(228, 0, 40, 0.03)',
                    textAlign: 'left'
                }}>
                    <p className="text-white" style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        lineHeight: 1.7,
                        fontWeight: 400
                    }}>
                        "This revenue model reflects <span className="text-red" style={{ fontWeight: 600 }}>disciplined enterprise execution</span>: narrow focus, paid pilots, credible deal sizes, and pipeline rigor—without relying on expansion or optimistic conversion assumptions."
                    </p>
                </div>

                {/* Divider accent line */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', marginTop: '3rem', marginBottom: '2rem' }}>
                    <div style={{ width: '60px', height: '2px', background: 'var(--color-alert-red)', margin: '0 auto' }} />
                </div>

                {/* Back to Decks Button */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Link
                        to="/decks"
                        className="btn btn-secondary"
                        style={{ fontSize: '0.85rem' }}
                    >
                        ← BACK TO DECKS
                    </Link>
                </div>
            </div>

            {/* Subtle scan line at bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--color-alert-red), transparent)',
                animation: 'pulse 3s ease-in-out infinite',
                opacity: 0.5
            }} />

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </section>
    );
};

export default Slide12_Positioning;
