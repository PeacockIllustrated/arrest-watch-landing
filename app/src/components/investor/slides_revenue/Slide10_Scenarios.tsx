import React from 'react';

const Slide10_Scenarios: React.FC = () => {
    return (
        <section className="brand-section" id="revenue-slide-10">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '-5%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            10. SCENARIOS
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            EXECUTION-<br />
                            DRIVEN.<br />
                            <span className="text-red">NOT<br />SPECULATIVE.</span>
                        </h2>
                    </div>

                    {/* RIGHT: Two Scenario Panels */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Downside Scenario */}
                        <div className="glass-panel" style={{ padding: '1.75rem', borderLeft: '3px solid var(--color-grid)' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                DOWNSIDE
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>Customers</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem' }}>4</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>Avg ACV</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem' }}>$150k</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(51,51,51,0.5)' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>ARR</span>
                                    <span className="text-mono text-white" style={{ fontSize: '1rem', fontWeight: 600 }}>~$600k</span>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '1rem', fontStyle: 'italic' }}>
                                Still validates product; supports Series A narrative
                            </p>
                        </div>

                        {/* Upside Scenario */}
                        <div className="glass-panel border-glow" style={{ padding: '1.75rem', borderLeft: '3px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                UPSIDE
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>Customers</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem' }}>6</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>Avg ACV</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem' }}>$225k</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(51,51,51,0.5)' }}>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>ARR</span>
                                    <span className="text-mono text-red text-glow" style={{ fontSize: '1.1rem', fontWeight: 700 }}>~$1.35M</span>
                                </div>
                            </div>
                            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '1rem', fontStyle: 'italic' }}>
                                Achievable with 1-2 larger platform deals
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide10_Scenarios;
