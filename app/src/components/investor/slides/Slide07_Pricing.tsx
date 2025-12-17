import React from 'react';

const Slide07_Pricing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-07">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">07. Pricing</span>
                        <h2 className="text-large">Simple & <span className="text-red">Scalable.</span></h2>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>VERIFICATION SEARCHES</div>
                            <div className="text-large text-white">$3–$4</div>
                            <div className="text-mono text-muted">BLENDED AVERAGE PER SEARCH</div>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>LIVE MONITORING</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <div className="text-white">Starter</div>
                                    <div className="text-mono text-muted">$3–$5 / person / mo</div>
                                </div>
                                <div>
                                    <div className="text-white">Professional</div>
                                    <div className="text-mono text-muted">$7–$10 / person / mo</div>
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <div className="text-white">Enterprise / Gov</div>
                                    <div className="text-mono text-muted">$12–$20 / person / mo</div>
                                </div>
                            </div>
                            <div className="text-mono text-white" style={{ marginTop: '1rem', borderTop: '1px solid var(--color-grid)', paddingTop: '1rem' }}>
                                ENTERPRISE MINIMUMS: $1k–$5k / MONTH
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide07_Pricing;
