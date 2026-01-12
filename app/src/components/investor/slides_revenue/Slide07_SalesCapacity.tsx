import React from 'react';

const Slide07_SalesCapacity: React.FC = () => {
    return (
        <section className="brand-section" id="revenue-slide-07">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '20%', right: '-8%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            07. SALES CAPACITY
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1 }}>
                            FOUNDER-LED<br />
                            CLOSES.<br />
                            <span className="text-red">AE SUPPORTS<br />LATE-YEAR.</span>
                        </h2>

                        <div style={{ marginTop: '2rem' }}>
                            <p className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>
                                Avoids premature scaling risk.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Two Panels */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Panel 1: Founder-led */}
                        <div className="glass-panel border-glow" style={{ padding: '1.75rem', borderLeft: '3px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                FOUNDER-LED (MONTHS 1-9)
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <li className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    <span className="text-red">→</span> 3-4 deals
                                </li>
                                <li className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    <span className="text-red">→</span> All strategic accounts
                                </li>
                                <li className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    <span className="text-red">→</span> Velocity driven by trust, not volume
                                </li>
                            </ul>
                        </div>

                        {/* Panel 2: Enterprise AE */}
                        <div className="glass-panel" style={{ padding: '1.75rem', borderLeft: '3px solid var(--color-grid)' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                ENTERPRISE AE (MONTHS 6-12)
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <li className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    <span className="text-muted">→</span> 2-3 qualified closes OR late-stage pipeline
                                </li>
                                <li className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    <span className="text-muted">→</span> Does not carry full quota Year 1
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide07_SalesCapacity;
