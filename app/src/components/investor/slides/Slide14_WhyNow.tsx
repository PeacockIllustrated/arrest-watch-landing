import React from 'react';

const Slide14_WhyNow: React.FC = () => {
    return (
        <section className="brand-section" id="slide-14">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">14. Why Now?</span>
                        <h2 className="text-large">Timing is <span className="text-red">Everything.</span></h2>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-large text-white" style={{ marginBottom: '0.5rem' }}>GIG ECONOMY</div>
                            <p className="text-mono text-muted">Gig economy & marketplaces exploding.</p>
                        </div>
                        <div className="panel">
                            <div className="text-large text-white" style={{ marginBottom: '0.5rem' }}>LIABILITY</div>
                            <p className="text-mono text-muted">Rising liability & regulation.</p>
                        </div>
                        <div className="panel">
                            <div className="text-large text-white" style={{ marginBottom: '0.5rem' }}>FAILURE</div>
                            <p className="text-mono text-muted">Legacy checks failing in real time.</p>
                        </div>
                        <div className="panel" style={{ background: 'rgba(255, 255, 255, 0.05)', borderColor: 'var(--color-grid)' }}>
                            <p className="text-white" style={{ fontStyle: 'italic', textAlign: 'center' }}>
                                "ArrestWatch becomes core infrastructure for trust."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide14_WhyNow;
