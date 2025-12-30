import React from 'react';

const UberSolution: React.FC = () => {
    return (
        <section className="brand-section" id="solution">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">03. The Solution</span>
                        <h2 className="text-large">Real-Time Intelligence.</h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            ArrestDelta integrates directly with your driver operations, matching booking data against your active fleet every hour, 24/7/365.
                        </p>
                    </div>
                    <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>CONTINUOUS MONITORING</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                We don't just check once. We watch constantly. New booking records are ingested and cross-referenced instantly.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>PRE-CONVICTION ALERTS</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Receive alerts at the moment of booking/arrest, weeks or months before a court disposition is filed.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>BIOMETRIC VERIFICATION</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Facial matching confirms identity even if alias names or different spellings are used in police records.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>API FIRST</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Webhooks push "Critical Risk" events directly to your Trust & Safety team for immediate review.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UberSolution;
