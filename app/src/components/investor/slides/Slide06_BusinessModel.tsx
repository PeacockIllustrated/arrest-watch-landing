import React from 'react';

const Slide06_BusinessModel: React.FC = () => {
    return (
        <section className="brand-section" id="slide-06">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">06. Business Model</span>
                        <h2 className="text-large">Dual Revenue <span className="text-red">Engine.</span></h2>
                    </div>
                    <div className="grid-2" style={{ gap: '2rem' }}>
                        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="text-mono text-white">ENGINE 1: TRANSACTIONAL VERIFICATION SEARCHES</div>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                <li className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>+ $2–$5 BASIC SEARCHES</li>
                                <li className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>+ $6–$10 ENHANCED / FUZZY SEARCHES</li>
                                <li className="text-mono text-muted">+ VOLUME-BASED ENTERPRISE PRICING</li>
                            </ul>
                        </div>
                        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="text-mono text-white">ENGINE 2: LIVE MONITORING (SUBSCRIPTION)</div>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                <li className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>+ PER-PERSON, PER-MONTH PRICING</li>
                                <li className="text-mono text-muted">+ PREDICTABLE, HIGH-MARGIN SaaS REVENUE</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide06_BusinessModel;
