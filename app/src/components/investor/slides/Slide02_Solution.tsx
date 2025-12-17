import React from 'react';

const Slide02_Solution: React.FC = () => {
    return (
        <section className="brand-section" id="slide-02">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">02. The Solution</span>
                        <h2 className="text-large">Real-Time Arrest <span className="text-red">Intelligence.</span></h2>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem' }}>
                            ArrestWatch protects customers at two critical moments:
                        </p>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>BEFORE ACCESS IS GRANTED</div>
                            <p className="text-mono text-muted">
                                Fast, low-cost verification searches during onboarding.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>AFTER ACCESS IS GRANTED</div>
                            <p className="text-mono text-muted">
                                Continuous, real-time arrest monitoring nationwide.
                            </p>
                        </div>
                        <div className="panel" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'var(--color-grid)' }}>
                            <p className="text-white" style={{ fontStyle: 'italic', textAlign: 'center' }}>
                                “Background checks stop bad actors yesterday. ArrestWatch stops them today.”
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide02_Solution;
