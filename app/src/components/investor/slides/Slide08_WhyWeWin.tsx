import React from 'react';

const Slide08_WhyWeWin: React.FC = () => {
    return (
        <section className="brand-section" id="slide-08">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">08. Why We Win</span>
                        <h2 className="text-large">Structural <span className="text-red">Advantage.</span></h2>
                    </div>
                    <div className="grid-2" style={{ gap: '1.5rem' }}>
                        <div className="panel" style={{ opacity: 0.6 }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>LEGACY PROVIDERS</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li className="text-mono text-muted">+ One-time reports</li>
                                <li className="text-mono text-muted">+ Batch ingestion</li>
                                <li className="text-mono text-muted">+ Expensive re-checks</li>
                                <li className="text-mono text-muted">+ No real-time alerts</li>
                            </ul>
                        </div>
                        <div className="panel" style={{ border: '1px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>ARRESTWATCH</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li className="text-mono text-white">+ Event-driven architecture</li>
                                <li className="text-mono text-white">+ Continuous intelligence</li>
                                <li className="text-mono text-white">+ Cheaper than re-running checks</li>
                                <li className="text-mono text-white">+ Monitoring-native pricing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide08_WhyWeWin;
