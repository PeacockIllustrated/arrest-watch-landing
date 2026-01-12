import React from 'react';
import MetricTicker from '../ui/MetricTicker';

const Slide07_Pricing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-07">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span className="label">07. PRICING STRATEGY</span>
                        <h2 className="text-huge" style={{ fontSize: '4rem', marginBottom: 0 }}>SIMPLE & <span className="text-red">SCALABLE.</span></h2>
                    </div>
                </div>

                {/* Data Wall Grid */}
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>

                    {/* Col 1: Transactional */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', gridColumn: 'span 1' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '2rem' }}>VERIFICATION</div>
                        <MetricTicker value="$3-4" label="AVG / SEARCH" />
                        <div className="text-mono text-muted" style={{ marginTop: '2rem', fontSize: '0.8rem', borderTop: '1px solid var(--color-grid)', paddingTop: '1rem' }}>
                            BLENDED AVERAGE ACROSS TIERS
                        </div>
                    </div>

                    {/* Col 2: Monitoring (Main Focus) */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '2rem', gridColumn: 'span 2', animationDelay: '0.1s' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '2rem' }}>CONTINUOUS MONITORING TIERS</div>

                        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                            <div className="mobile-border-none" style={{ borderRight: '1px solid var(--glass-border)' }}>
                                <div className="text-white text-large" style={{ fontSize: '1.5rem' }}>Starter</div>
                                <div className="text-mono text-muted">$3-$5 / mo</div>
                            </div>
                            <div className="mobile-border-none" style={{ borderRight: '1px solid var(--glass-border)' }}>
                                <div className="text-white text-large" style={{ fontSize: '1.5rem' }}>Professional</div>
                                <div className="text-mono text-muted">$7-$10 / mo</div>
                            </div>
                            <div>
                                <div className="text-white text-large" style={{ fontSize: '1.5rem' }}>Enterprise</div>
                                <div className="text-mono text-muted">$12-$20 / mo</div>
                            </div>
                        </div>

                        <div className="text-mono text-white" style={{ marginTop: '3rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            ENTERPRISE MINIMUMS: $1K - $5K / MONTH
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide07_Pricing;
