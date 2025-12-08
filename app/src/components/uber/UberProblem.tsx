import React from 'react';

const UberProblem: React.FC = () => {
    return (
        <section className="brand-section" id="problem">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">02. The Visibility Gap</span>
                        <h2 className="text-large">The "Clean" Driver <br /><span className="text-red">Paradox.</span></h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            A driver with a perfect background check today can be arrested tonight. Without real-time monitoring, they remain active on the platform until the next periodic review or a user report.
                        </p>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">THE LAG TIME</span>
                                <span className="text-mono text-red">CRITICAL</span>
                            </div>
                            <p className="text-muted">
                                Between an arrest event and court disposition (guilty/not-guilty) can be 6-18 months. Periodic checks often miss the arrest entirely until conviction.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">CROSS-JURISDICTION</span>
                                <span className="text-mono text-red">SILOED</span>
                            </div>
                            <p className="text-muted">
                                A driver vetted in San Francisco who gets arrested in a neighboring county often falls through the cracks of standard county-level checks.
                            </p>
                        </div>
                        <div className="panel" style={{ background: 'rgba(228, 0, 40, 0.1)', borderColor: 'var(--color-alert-red)' }}>
                            <p className="text-white" style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                                "Real-time monitoring is not just compliance; it is the ultimate duty of care."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UberProblem;
