import React from 'react';

const UberCaseStudies: React.FC = () => {
    return (
        <section className="brand-section" id="case-studies">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <span className="label">04. Use Cases</span>
                    <h2 className="text-large">Critical Interventions.</h2>
                    <p className="text-muted" style={{ marginTop: '1rem', maxWidth: '800px' }}>
                        How real-time data changes the outcome of safety incidents.
                    </p>
                </div>

                <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Case 1 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>SCENARIO A: THE "WEEKENDER"</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>The Friday Night Incident</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                A driver is arrested for assault on a Friday night. Under standard periodic checks, they might continue driving through the high-volume weekend shifts.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>WITH ARRESTWATCH</div>
                            <p className="text-white" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                                Booking detected Saturday 3:00 AM.<br />
                                <span className="text-green">Account paused before Saturday shift begins.</span>
                            </p>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>SCENARIO B: JURISDICTION GAP</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>The Neighboring County</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                A driver vetted in San Francisco is arrested in a neighboring county. Localized checks often miss records from outside the primary jurisdiction.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>WITH ARRESTWATCH</div>
                            <p className="text-white" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                                Scrapers monitor all surrounding county booking logs.<br />
                                <span className="text-green">Cross-jurisdictional match found instantly.</span>
                            </p>
                        </div>
                    </div>

                    {/* Case 3 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>SCENARIO C: THE LOOPHOLE</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>released Pending Charges</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                A driver is charged with a DUI but released on bail pending trial. Conviction may take months, leaving a gap in enforcement.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>WITH ARRESTWATCH</div>
                            <p className="text-white" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                                Arrest event flagged immediately.<br />
                                <span className="text-green">Safety team reviews pending charges proactively.</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UberCaseStudies;
