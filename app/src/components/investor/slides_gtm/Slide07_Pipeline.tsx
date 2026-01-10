import React from 'react';

const Slide07_Pipeline: React.FC = () => {
    const funnelStages = [
        { stage: 'SERIOUS CONVERSATIONS', count: '45–50', color: 'var(--color-text-muted)' },
        { stage: 'PILOT DISCUSSIONS', count: '~25', color: 'var(--color-signal-white)' },
        { stage: 'QUALIFIED OPPS', count: '18', color: 'var(--color-alert-red)' },
        { stage: 'CLOSED CUSTOMERS', count: '6', color: 'var(--color-alert-red)' },
    ];

    return (
        <section className="brand-section" id="gtm-slide-07">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Big Metric + Funnel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            07. PIPELINE COVERAGE
                        </span>

                        {/* Big Metric */}
                        <div style={{ marginBottom: '3rem' }}>
                            <div className="text-mono text-red text-glow" style={{ fontSize: 'clamp(5rem, 12vw, 8rem)', fontWeight: 700, lineHeight: 0.9 }}>
                                3:1
                            </div>
                            <div className="text-mono text-muted" style={{ fontSize: '1.1rem', letterSpacing: '0.05em', marginTop: '0.5rem' }}>
                                PIPELINE COVERAGE
                            </div>
                        </div>

                        {/* Funnel Visual */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {funnelStages.map((stage, i) => (
                                <div
                                    key={i}
                                    className="animate-fade-in-up"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        padding: '1rem 0',
                                        borderBottom: i < funnelStages.length - 1 ? '1px solid var(--color-grid)' : 'none',
                                        animationDelay: `${0.3 + i * 0.1}s`
                                    }}
                                >
                                    <div className="text-mono" style={{
                                        fontSize: '1.8rem',
                                        fontWeight: 700,
                                        minWidth: '80px',
                                        color: stage.color,
                                        textShadow: stage.color === 'var(--color-alert-red)' ? '0 0 10px rgba(228, 0, 40, 0.4)' : 'none'
                                    }}>
                                        {stage.count}
                                    </div>
                                    <div className="text-mono text-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                        {stage.stage}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Conversion Rates */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                                DEAL MATH - CONVERSION RATES
                            </div>

                            {/* Conversion Metrics */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.85rem' }}>DISCOVERY → PILOT</span>
                                        <span className="text-mono text-white" style={{ fontSize: '1.5rem', fontWeight: 600 }}>~40%</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'var(--color-grid)', position: 'relative' }}>
                                        <div style={{ height: '100%', width: '40%', background: 'var(--color-signal-white)' }} />
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.85rem' }}>PILOT → CLOSE</span>
                                        <span className="text-mono text-red text-glow" style={{ fontSize: '1.5rem', fontWeight: 600 }}>~50%</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'var(--color-grid)', position: 'relative' }}>
                                        <div style={{ height: '100%', width: '50%', background: 'var(--color-alert-red)', boxShadow: '0 0 10px var(--color-alert-red)' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '2.5rem 0' }} />

                            {/* Summary */}
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                <span className="text-white">To close 6 customers:</span><br />
                                • Need 18 qualified opps<br />
                                • Need ~25 pilot discussions<br />
                                • Need ~45–50 serious conversations
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide07_Pipeline;
