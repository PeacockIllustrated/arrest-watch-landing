import React from 'react';

const Slide01_Outcome: React.FC = () => {
    return (
        <section className="brand-section" id="revenue-slide-01">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '20%', right: '-10%', width: '60%', height: '60%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.08), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-red border-glow" style={{
                            display: 'inline-block', padding: '4px 12px', border: '1px solid var(--color-alert-red)', marginBottom: '2rem'
                        }}>
                            01. REVENUE MODEL
                        </span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>
                            <span className="text-red text-glow">$1M+ ARR</span><br />
                            IN 12 MONTHS.<br />
                            <span style={{ fontSize: '0.6em', opacity: 0.8 }}>WITHOUT EXPANSION DEPENDENCE.</span>
                        </h1>

                        {/* Big Metrics */}
                        <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
                            <div>
                                <div className="text-mono text-red text-glow" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                                    6
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                    ENTERPRISE ACCOUNTS
                                </div>
                            </div>
                            <div style={{ width: '1px', background: 'var(--color-grid)' }} />
                            <div>
                                <div className="text-mono text-red text-glow" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                                    $1.025M
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                    ARR
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                THE OUTCOME
                            </div>
                            <p className="text-white" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                                This model reflects disciplined enterprise execution: narrow focus, paid pilots, credible deal sizes, and pipeline rigor—without relying on expansion or optimistic conversion assumptions.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide01_Outcome;
