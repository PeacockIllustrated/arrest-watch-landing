import React from 'react';

const Slide01_Objective: React.FC = () => {
    return (
        <section className="brand-section" id="gtm-slide-01">
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
                            01. THE OBJECTIVE
                        </span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}>
                            <span className="text-red text-glow">6</span> ENTERPRISE<br />
                            CUSTOMERS<br />
                            IN <span className="text-red text-glow">12</span> MONTHS.
                        </h1>

                        {/* Big Metrics */}
                        <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
                            <div>
                                <div className="text-mono text-red text-glow" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                                    $900k–$1.2m
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                    YEAR 1 ARR
                                </div>
                            </div>
                            <div style={{ width: '1px', background: 'var(--color-grid)' }} />
                            <div>
                                <div className="text-mono text-red text-glow" style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                                    18–24
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                    QUALIFIED OPPS (3:1)
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>

                            {/* 12-Month Targets */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                    12-MONTH TARGETS
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        '6 enterprise customers',
                                        '$900k–$1.2m ARR',
                                        '18–24 qualified opportunities',
                                        '3:1 pipeline coverage'
                                    ].map((item, i) => (
                                        <li key={i} className="text-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                                            <span className="text-red">→</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '1.5rem 0' }} />

                            {/* 24-Month Targets */}
                            <div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                    24-MONTH TRAJECTORY
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        '15–20 enterprise customers',
                                        '$3.5m–$5m ARR run-rate',
                                        'Category leader positioning'
                                    ].map((item, i) => (
                                        <li key={i} className="text-mono text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                                            <span style={{ opacity: 0.5 }}>→</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide01_Objective;
