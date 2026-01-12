import React from 'react';

const Slide05_Pricing: React.FC = () => {
    const tiers = [
        { tier: 'DESIGN PARTNER', acv: '$100k-$150k', desc: 'Co-development, early access, case study rights' },
        { tier: 'CORE ENTERPRISE', acv: '$150k-$250k', desc: 'Full platform access, standard SLA, dedicated support' },
        { tier: 'STRATEGIC PLATFORM', acv: '$300k+', desc: 'Custom integration, white-glove onboarding, executive alignment' },
    ];

    return (
        <section className="brand-section" id="gtm-slide-05">
            <div className="grid-bg-overlay" />

            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="animate-fade-in-up">
                    <span className="label text-mono text-muted">05. PRICING STRATEGY</span>
                    <h2 className="text-large" style={{ fontSize: '3rem', marginTop: '1rem' }}>
                        VALUE-BASED <span className="text-red">TIERS.</span>
                    </h2>
                </div>

                {/* Pricing Table */}
                <div className="glass-panel animate-fade-in-up" style={{
                    padding: '0',
                    overflow: 'hidden',
                    animationDelay: '0.2s',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    {tiers.map((t, i) => (
                        <div
                            key={i}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 200px 1fr',
                                gap: '2rem',
                                padding: '2rem 2.5rem',
                                borderBottom: i < tiers.length - 1 ? '1px solid var(--color-grid)' : 'none',
                                alignItems: 'center',
                                background: i === 1 ? 'rgba(228, 0, 40, 0.03)' : 'transparent'
                            }}
                            className="animate-fade-in-up"
                        >
                            <div>
                                <div className="text-mono text-white" style={{ fontSize: '1rem', letterSpacing: '0.02em' }}>
                                    {t.tier}
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div className="text-mono text-red text-glow" style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                }}>
                                    {t.acv}
                                </div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>ACV</div>
                            </div>
                            <div>
                                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                                    {t.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Big Metric Callout */}
                <div className="animate-fade-in-up" style={{
                    textAlign: 'center',
                    marginTop: '4rem',
                    animationDelay: '0.5s'
                }}>
                    <div style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '2rem 4rem',
                        border: '1px solid var(--color-alert-red)',
                        background: 'rgba(228, 0, 40, 0.05)',
                        boxShadow: '0 0 40px rgba(228, 0, 40, 0.1)'
                    }}>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                            TARGET AVERAGE CONTRACT VALUE - YEAR 1
                        </div>
                        <div className="text-mono text-red text-glow" style={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>
                            $175k
                        </div>
                        <div className="text-mono text-white" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                            ARR
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Slide05_Pricing;
