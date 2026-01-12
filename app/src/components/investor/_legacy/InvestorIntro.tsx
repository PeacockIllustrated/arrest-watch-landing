import React from 'react';

const InvestorIntro: React.FC = () => {
    return (
        <section className="brand-section" id="intro">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">01. The Opportunity</span>
                        <h1 className="text-huge">
                            Real-Time Criminal <br />
                            <span className="text-red">Risk Intelligence.</span>
                        </h1>
                        <p className="text-muted" style={{ fontSize: '1.5rem', marginTop: '2rem', maxWidth: '600px' }}>
                            ArrestDelta is building the first real-time criminal risk detection layer for workforce platforms at national scale.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
                        <div className="panel" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                            <div className="text-huge" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                Risk travels in <span className="text-white">minutes.</span>
                            </div>
                            <div className="text-muted text-mono" style={{ fontSize: '1.2rem' }}>
                                EXISTING SYSTEMS REACT IN MONTHS.
                            </div>
                        </div>
                        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                            Today, companies like Uber and Lyft rely on static background checks every 3-12 months. They miss the most dangerous window: the moment a worker is arrested and continues operating for days before discovery.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvestorIntro;
