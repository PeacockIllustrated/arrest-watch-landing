import React from 'react';

const UberIntro: React.FC = () => {
    return (
        <section className="brand-section" id="intro">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">01. The Partnership</span>
                        <h1 className="text-huge">
                            The Next Evolution in <br />
                            <span className="text-red">Rider Safety.</span>
                        </h1>
                        <p className="text-muted" style={{ fontSize: '1.5rem', marginTop: '2rem', maxWidth: '600px' }}>
                            ArrestWatch offers Uber the first true real-time criminal risk detection layer, closing the gap between annual background checks and daily operations.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>
                        <div className="panel" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                            <div className="text-huge" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                                Risk travels in <span className="text-white">minutes.</span>
                            </div>
                            <div className="text-muted text-mono" style={{ fontSize: '1.2rem' }}>
                                CURRENT CHECKS REACT IN MONTHS.
                            </div>
                        </div>
                        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                            Uber has set the standard for safety in the gig economy. ArrestWatch provides the technology to maintain that leadership by detecting off-platform risks the moment they happen.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UberIntro;
