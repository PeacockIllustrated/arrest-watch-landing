import React from 'react';

const Slide09_SanityCheck: React.FC = () => {
    const metrics = [
        { label: 'ARR (12 months)', value: '$1.0M-$1.1M' },
        { label: 'Sales & Marketing Spend', value: '$400k' },
        { label: 'ARR / S&M Ratio', value: '2.5x' },
        { label: 'Gross Margin', value: 'High (Data & Infra)' },
    ];

    return (
        <section className="brand-section" id="revenue-slide-09">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            09. SANITY CHECK
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1 }}>
                            CAPITAL-<br />
                            EFFICIENT<br />
                            <span className="text-red">ENTERPRISE<br />INFRASTRUCTURE.</span>
                        </h2>
                    </div>

                    {/* RIGHT: Metrics Table */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                REVENUE VS. SPEND
                            </div>

                            {/* Metrics List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {metrics.map((m, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingBottom: i < metrics.length - 1 ? '1.25rem' : 0,
                                            borderBottom: i < metrics.length - 1 ? '1px solid rgba(51,51,51,0.5)' : 'none'
                                        }}
                                    >
                                        <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>{m.label}</span>
                                        <span className="text-mono text-white" style={{
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: i === 2 ? 'var(--color-alert-red)' : 'var(--color-signal-white)'
                                        }}>{m.value}</span>
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

export default Slide09_SanityCheck;
