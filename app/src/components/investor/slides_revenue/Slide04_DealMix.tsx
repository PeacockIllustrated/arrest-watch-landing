import React from 'react';

const Slide04_DealMix: React.FC = () => {
    const dealMix = [
        { tier: 'Design Partners', count: 2, acv: '$125k', total: '$250k' },
        { tier: 'Core Enterprise', count: 3, acv: '$175k', total: '$525k' },
        { tier: 'Strategic Platform', count: 1, acv: '$250k', total: '$250k' },
    ];

    return (
        <section className="brand-section" id="revenue-slide-04">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', bottom: '10%', left: '-5%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            04. DEAL MIX
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            REALISTIC MIX.<br />
                            <span className="text-red">NOT UNIFORM<br />PRICING.</span>
                        </h2>

                        <div style={{ marginTop: '2rem' }}>
                            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                                Conservative; upside exists but not required.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Deal Mix Table */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                DEAL MIX BREAKDOWN
                            </div>

                            {/* Table Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.75fr 1fr 1fr', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-grid)' }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>TIER</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'center' }}>COUNT</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'right' }}>ACV</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'right' }}>TOTAL</span>
                            </div>

                            {/* Table Rows */}
                            {dealMix.map((d, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 0.75fr 1fr 1fr',
                                        gap: '0.5rem',
                                        padding: '0.85rem 0',
                                        borderBottom: i < dealMix.length - 1 ? '1px solid rgba(51,51,51,0.5)' : 'none'
                                    }}
                                >
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem' }}>{d.tier}</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem', textAlign: 'center' }}>{d.count}</span>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem', textAlign: 'right' }}>{d.acv}</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem', textAlign: 'right' }}>{d.total}</span>
                                </div>
                            ))}

                            {/* Total Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.75fr 1fr 1fr', gap: '0.5rem', paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--color-alert-red)' }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.95rem', fontWeight: 700 }}>TOTAL</span>
                                <span className="text-mono text-red" style={{ fontSize: '0.95rem', textAlign: 'center', fontWeight: 700 }}>6</span>
                                <span></span>
                                <span className="text-mono text-red text-glow" style={{ fontSize: '1.1rem', textAlign: 'right', fontWeight: 700 }}>$1.025M</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide04_DealMix;
