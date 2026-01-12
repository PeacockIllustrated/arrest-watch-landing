import React from 'react';
import { Link } from 'react-router-dom';
import MarkAsReadButton from '../../deckhub/MarkAsReadButton';

const Slide10_Resourcing: React.FC = () => {
    const allocation = [
        { item: 'Sales', amount: '$250k' },
        { item: 'Marketing', amount: '$150k' },
        { item: 'Legal', amount: '$75k' },
        { item: 'Cloud / Infra', amount: '$150k' },
        { item: 'Founder Runway', amount: '$200k' },
        { item: 'Flex Reserve', amount: '$175k' },
    ];

    const timeline = [
        { phase: '0-3', focus: 'Foundation: first 2 design partners, content pipeline, legal framework' },
        { phase: '4-6', focus: 'Momentum: 3-4 customers, hire enterprise AE, pilot conversions' },
        { phase: '7-9', focus: 'Scale: marketing assets live, 5+ active pilots, reference accounts' },
        { phase: '10-12', focus: 'Close: 6 customers, ARR locked, category positioning established' },
    ];

    const kpis = [
        'Pipeline coverage ≥3:1',
        'Pilot → close >50%',
        'False-positive reduction documented',
        'Reference accounts: 2+ public',
        'Sales cycle <6 months'
    ];

    return (
        <section className="brand-section" id="gtm-slide-10">
            <div className="grid-bg-overlay" />
            <div style={{
                position: 'absolute', top: '20%', right: '-5%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.08), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
                    <span className="label text-mono text-muted">10. RESOURCING & KPIS</span>
                    <h2 className="text-large" style={{ fontSize: '2.5rem', marginTop: '0.75rem' }}>
                        $1M ALLOCATION. <span className="text-red">12-MONTH EXECUTION.</span>
                    </h2>
                </div>

                <div className="grid-2 mobile-stack" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                    {/* Panel A: Headcount */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '1.75rem', animationDelay: '0.2s' }}>
                        <div className="text-mono text-red" style={{ fontSize: '0.75rem', marginBottom: '1.25rem' }}>HEADCOUNT & TIMING</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {[
                                { role: 'Enterprise Sales', timing: 'Month 3' },
                                { role: 'Fractional Marketing', timing: 'Month 3' },
                                { role: 'Fractional Legal', timing: 'As required' },
                                { role: 'Founders + Head of LE Partnerships', timing: 'Existing' },
                            ].map((h, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-white" style={{ fontSize: '0.9rem' }}>{h.role}</span>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>{h.timing}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Panel B: Allocation */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '1.75rem', animationDelay: '0.3s', border: '1px solid var(--color-alert-red)' }}>
                        <div className="text-mono text-red" style={{ fontSize: '0.75rem', marginBottom: '1.25rem' }}>$1M CAPITAL ALLOCATION</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem' }}>
                            {allocation.map((a, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>{a.item}</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.9rem' }}>{a.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', marginBottom: '2rem', animationDelay: '0.4s' }}>
                    <div className="text-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>12-MONTH TIMELINE</div>
                    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {timeline.map((t, i) => (
                            <div key={i} style={{ borderLeft: i === 3 ? '2px solid var(--color-alert-red)' : '1px solid var(--color-grid)', paddingLeft: '1rem' }}>
                                <div className="text-mono" style={{ fontSize: '1rem', color: i === 3 ? 'var(--color-alert-red)' : 'var(--color-signal-white)', marginBottom: '0.4rem' }}>M{t.phase}</div>
                                <div className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{t.focus}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* KPIs */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="text-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '0.75rem' }}>KEY PERFORMANCE INDICATORS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 2rem' }}>
                        {kpis.map((k, i) => (
                            <span key={i} className="text-mono text-white" style={{ fontSize: '0.85rem' }}>
                                <span className="text-red">✓</span> {k}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Closing Quote + Back to Decks */}
                <div className="animate-fade-in-up" style={{ marginTop: '2.5rem', animationDelay: '0.6s', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ borderLeft: '4px solid var(--color-alert-red)', paddingLeft: '1.5rem' }}>
                        <p className="text-mono text-white" style={{ fontSize: '1.1rem' }}>
                            "Focused. Credible. Relationship-driven. <span className="text-red">Disciplined.</span>"
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '1rem 2rem' }}>
                            Return to Main Site
                        </Link>
                        <MarkAsReadButton deckId="gtm-plan" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide10_Resourcing;
