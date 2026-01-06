import React from 'react';

const UberRealWorldCases: React.FC = () => {
    return (
        <section className="brand-section" id="real-world-cases">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '4rem' }}>
                    <span className="label">05. Historical Context</span>
                    <h2 className="text-large">Case Studies.</h2>
                    <p className="text-muted" style={{ marginTop: '1rem', maxWidth: '800px' }}>
                        Retrospective analysis of how continuous monitoring addresses known regulatory and safety challenges.
                    </p>
                </div>

                <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    {/* Case 1 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>2014-2016 REVIEW</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>California Background Check Review</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                A statewide evaluation highlighted a challenge facing all large mobility platforms: static, one-time background checks can miss information that updates over time. This created a visibility gap between onboarding and day-to-day operations.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>HOW ARRESTDELTA HELPS</div>
                            <ul className="text-white" style={{ fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                                <li>Continuous criminal-event monitoring.</li>
                                <li>Multi-source, cross-jurisdiction data fusion.</li>
                                <li className="text-green">Real-time eligibility decisions, not “once-per-year” snapshots.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>FEDERAL CASE</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Doe v. Uber Technologies</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                Public filings in this case highlighted how incomplete or fragmented data sources can limit what platforms see during onboarding.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>HOW ARRESTDELTA HELPS</div>
                            <ul className="text-white" style={{ fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                                <li>Enhanced identity matching across aliases and jurisdictions.</li>
                                <li>Clear risk categorisation for sensitive offence types.</li>
                                <li className="text-green">Traceable audit history showing precisely what was known, when.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Case 3 */}
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>2024 REPORT</div>
                        <div style={{ flex: 1 }}>
                            <h4 className="text-white" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Domestic-Violence History Case</h4>
                            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                A publicly reported case underscored the need for timely awareness when a driver’s risk profile changes after onboarding.
                            </p>
                        </div>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>HOW ARRESTDELTA HELPS</div>
                            <ul className="text-white" style={{ fontSize: '0.9rem', marginTop: '0.5rem', paddingLeft: '1.2rem', listStyleType: 'disc' }}>
                                <li>Live alerts when new arrests, charges, or court filings appear.</li>
                                <li>Automated policy triggers (e.g., temporary suspension).</li>
                                <li className="text-green">Dramatically reduced risk window and faster intervention.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default UberRealWorldCases;
