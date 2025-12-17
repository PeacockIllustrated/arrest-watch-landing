import React from 'react';

const Slide13_Raise: React.FC = () => {
    return (
        <section className="brand-section" id="slide-13">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">13. Pre-Seed Raise</span>
                        <h2 className="text-large">The <span className="text-red">Ask.</span></h2>
                    </div>
                    <div className="grid-2" style={{ gap: '1.5rem' }}>
                        <div className="panel" style={{ border: '2px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>CURRENT ROUND</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li className="text-mono text-white">+ Raise: $1.0M</li>
                                <li className="text-mono text-muted">+ Pre-money: $15.0M</li>
                                <li className="text-mono text-muted">+ Post-money: $16.0M</li>
                                <li className="text-mono text-muted">+ Equity sold: ~6.25%</li>
                            </ul>
                        </div>
                        <div className="flex-col" style={{ gap: '1.5rem' }}>
                            <div className="panel">
                                <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>RATIONALE</div>
                                <p className="text-mono text-muted">
                                    Live system (not conceptual), Proven arrest ingestion & matching, Dual revenue engines, Category-defining architecture
                                </p>
                            </div>
                            <div className="panel">
                                <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>USE OF FUNDS</div>
                                <p className="text-mono text-muted">
                                    National data expansion, Latency & platform hardening, Compliance & security readiness, Founder runway & key hires
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide13_Raise;
