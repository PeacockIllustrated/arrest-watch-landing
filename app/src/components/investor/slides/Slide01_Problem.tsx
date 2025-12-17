import React from 'react';

const Slide01_Problem: React.FC = () => {
    return (
        <section className="brand-section" id="slide-01">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">01. The Problem</span>
                        <h1 className="text-huge">
                            Real-Time Arrest <br />
                            <span className="text-red">Intelligence Platform</span>
                        </h1>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem', maxWidth: '600px' }}>
                            Background checks are static, expensive, and outdated the moment they are run.
                        </p>
                        <ul className="text-mono text-muted" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
                            <li>+ Bad actors re-enter platforms using new or false identities</li>
                            <li>+ Arrests occur after onboarding with no real-time visibility</li>
                            <li>+ Companies re-run checks reactively, increasing cost and liability</li>
                        </ul>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="panel" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                            <div className="text-large" style={{ marginBottom: '1rem' }}>
                                Result: <span className="text-white">Platforms discover risk too late.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide01_Problem;
