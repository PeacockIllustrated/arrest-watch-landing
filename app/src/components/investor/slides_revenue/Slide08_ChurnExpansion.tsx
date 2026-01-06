import React from 'react';

const Slide08_ChurnExpansion: React.FC = () => {
    const bullets = [
        { label: 'Logo churn', value: '0% (Year 1 assumption)' },
        { label: 'Expansion', value: 'Not modelled (upside only)' },
    ];

    const reasoning = [
        'Mission-critical use case',
        'Deep workflow integration',
        'Paid pilots de-risk fit'
    ];

    return (
        <section className="brand-section" id="revenue-slide-08">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', bottom: '15%', left: '-5%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            08. CHURN & EXPANSION
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1 }}>
                            WE DO NOT NEED<br />
                            <span className="text-red">EXPANSION</span><br />
                            TO HIT THE<br />
                            TARGET.
                        </h2>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                CONSERVATIVE ASSUMPTIONS
                            </div>

                            {/* Key Metrics */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                                {bullets.map((b, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>{b.label}</span>
                                        <span className="text-mono text-white" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{b.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '1.5rem 0' }} />

                            {/* Reasoning */}
                            <div className="text-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
                                REASONING
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {reasoning.map((item, i) => (
                                    <div key={i} className="text-mono text-white" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="text-red">→</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide08_ChurnExpansion;
