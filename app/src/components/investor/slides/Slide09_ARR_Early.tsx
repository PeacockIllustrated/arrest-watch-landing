import React from 'react';

const Slide09_ARR_Early: React.FC = () => {
    return (
        <section className="brand-section" id="slide-09">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">09. ARR Model</span>
                        <h2 className="text-large">Early <span className="text-red">Traction.</span></h2>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white">TRANSACTIONAL SEARCHES</div>
                            <div className="text-mono text-muted">500k / year × $4 =</div>
                            <div className="text-large text-white">$2.0M ARR</div>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white">LIVE MONITORING</div>
                            <div className="text-mono text-muted">50k users × $6/month =</div>
                            <div className="text-large text-white">$3.6M ARR</div>
                        </div>
                        <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-hover)' }}>
                            <div className="text-mono text-white">TOTAL ARR</div>
                            <div className="text-huge text-red" style={{ marginBottom: 0 }}>$5.6M</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide09_ARR_Early;
