import React from 'react';

const Slide02_Assumptions: React.FC = () => {
    const assumptions = [
        'Target customers (12 months): 6 enterprise accounts',
        'ACV: $300k ARR (Target Average)',
        'Annual contracts; paid upfront or net-30',
        'Sales motion: paid pilot → full contract',
        'Expansion minimal in Year 1 (upside only)'
    ];

    return (
        <section className="brand-section" id="revenue-slide-02">
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
                            02. CORE ASSUMPTIONS
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            ENTERPRISE<br />
                            <span className="text-red">DISCIPLINE.</span><br />
                            EXPLICIT<br />
                            ASSUMPTIONS.
                        </h2>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                MODEL INPUTS
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {assumptions.map((item, i) => (
                                    <li key={i} className="text-mono" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '1rem' }}>
                                        <span className="text-red" style={{ flexShrink: 0 }}>→</span>
                                        <span className="text-white">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '2rem 0' }} />

                            {/* Micro-callout */}
                            <div style={{ borderLeft: '3px solid var(--color-alert-red)', paddingLeft: '1rem' }}>
                                <p className="text-mono text-white" style={{ fontSize: '0.95rem' }}>
                                    This yields a credible <span className="text-red">$1.5M+ ARR</span> outcome.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide02_Assumptions;
