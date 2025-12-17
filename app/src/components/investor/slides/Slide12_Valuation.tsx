import React from 'react';

const Slide12_Valuation: React.FC = () => {
    return (
        <section className="brand-section" id="slide-12">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">12. Valuation</span>
                        <h2 className="text-large">Valuation <span className="text-red">Framework.</span></h2>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem' }}>
                            Comparable Multiples:<br />
                            Risk / compliance SaaS: 8×–15× ARR<br />
                            Monitoring-native platforms command premiums
                        </p>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="text-mono text-white">EARLY TRACTION</div>
                                <div className="text-mono text-muted">$5.6M ARR</div>
                            </div>
                            <div className="text-large text-white">$45M–$85M</div>
                        </div>
                        <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="text-mono text-white">PLATFORM ADOPTION</div>
                                <div className="text-mono text-muted">$30M ARR</div>
                            </div>
                            <div className="text-large text-white">$240M–$450M</div>
                        </div>
                        <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div className="text-mono text-white">CATEGORY LEADER</div>
                                <div className="text-mono text-muted">$126M ARR</div>
                            </div>
                            <div className="text-huge text-red" style={{ marginBottom: 0 }}>$1B+</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide12_Valuation;
