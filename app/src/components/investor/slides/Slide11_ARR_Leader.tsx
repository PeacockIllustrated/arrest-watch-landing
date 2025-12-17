import React from 'react';

const Slide11_ARR_Leader: React.FC = () => {
    return (
        <section className="brand-section" id="slide-11">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">11. ARR Model</span>
                        <h2 className="text-large">Category <span className="text-red">Leader.</span></h2>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white">TRANSACTIONAL SEARCHES</div>
                            <div className="text-mono text-muted">10M / year × $3 =</div>
                            <div className="text-large text-white">$30M ARR</div>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white">LIVE MONITORING</div>
                            <div className="text-mono text-muted">1M users × $8/month =</div>
                            <div className="text-large text-white">$96M ARR</div>
                        </div>
                        <div className="panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-surface-hover)' }}>
                            <div className="text-mono text-white">TOTAL ARR</div>
                            <div className="text-huge text-red" style={{ marginBottom: 0 }}>$126M</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide11_ARR_Leader;
