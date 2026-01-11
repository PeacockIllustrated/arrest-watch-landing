import React from 'react';

const Slide01_Problem: React.FC = () => {
    return (
        <section className="brand-section" id="slide-01">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem' }}>
                <div className="grid-2" style={{ alignItems: 'flex-start' }}>

                    {/* LEFT: Cinematic Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-red border-glow" style={{
                            display: 'inline-block', padding: '4px 12px', border: '1px solid var(--color-alert-red)', marginBottom: '2rem'
                        }}>
                            01. THE OPPORTUNITY
                        </span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.95 }}>
                            CRIMINAL RISK DOESN'T ARRIVE ON A SCHEDULE.<br />
                            <span className="text-red text-glow">DECISIONS STILL DO.</span>
                        </h1>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem', maxWidth: '550px', fontSize: '1.1rem', lineHeight: 1.6 }}>
                            ArrestDelta is building the first state-aware criminal risk intelligence layer for trust-critical workforce platforms.
                        </p>
                        <p className="text-mono text-muted" style={{ marginTop: '1.5rem', maxWidth: '500px', fontSize: '0.9rem', lineHeight: 1.5, fontStyle: 'italic' }}>
                            Speed without verification creates risk.<br />
                            ArrestDelta is built for certainty first.
                        </p>

                    </div>

                    {/* RIGHT: Live Visual Dock */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                            <div style={{ borderLeft: '4px solid var(--color-alert-red)', paddingLeft: '2rem', marginBottom: '2rem' }}>
                                <h2 className="text-white" style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1rem' }}>
                                    RISK EMERGES IN REAL TIME.<br />
                                    <span className="text-red">DECISIONS LAG BY DESIGN.</span>
                                </h2>
                            </div>

                            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                                Most enterprises rely on static or refresh-based screening systems. These systems are blind to when an arrest actually occurs, and whether it represents a meaningful state change.
                            </p>

                            <div className="text-mono text-white" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>The result is a dangerous gap:</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="text-red">›</span> Arrest events occur
                                </li>
                                <li className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="text-red">›</span> Identity is ambiguous
                                </li>
                                <li className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="text-red">›</span> State transitions go unverified
                                </li>
                                <li className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="text-red">›</span> Action is delayed until the next formal check
                                </li>
                            </ul>

                            {/* Gap explanation - bottom of right panel */}
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-grid)' }}>
                                <p className="text-mono text-red" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                    That gap is where exposure lives.
                                </p>
                                <p className="text-muted" style={{ fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                                    ArrestDelta closes this gap by continuously detecting arrest-related state changes, resolving identity, and verifying transitions before alerts are surfaced — enabling action when it matters, not months later.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Ambient Background Noise/Glow */}
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.1), transparent 70%)',
                pointerEvents: 'none', zIndex: -1
            }} />
        </section>
    );
};

export default Slide01_Problem;
