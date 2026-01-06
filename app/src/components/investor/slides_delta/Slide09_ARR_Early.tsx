import React from 'react';
import MetricTicker from '../ui/MetricTicker';

const Slide09_ARR_Early: React.FC = () => {
    return (
        <section className="brand-section" id="slide-09">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                <div className="mobile-mb-2" style={{ marginBottom: '4rem' }}>
                    <span className="label">09. TRACTION</span>
                    <h2 className="text-large" style={{ fontSize: '3rem' }}>EARLY REVENUE <span className="text-red">MODEL.</span></h2>
                </div>

                {/* Timeline Sweep / Signal Trace Layout */}
                <div className="mobile-layout-block" style={{ position: 'relative', height: 'auto', display: 'flex', alignItems: 'center' }}>

                    {/* Signal Trace Line (SVG) */}
                    <svg className="mobile-hidden" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 1000 400" preserveAspectRatio="none">
                        <path d="M0,350 Q250,350 500,200 T1000,50" fill="none" stroke="var(--color-grid)" strokeWidth="2" strokeDasharray="10,10" />
                        <path d="M0,350 Q250,350 500,200 T1000,50" fill="none" stroke="var(--color-alert-red)" strokeWidth="3"
                            strokeDasharray="1000" strokeDashoffset="1000" style={{ animation: 'scan-sweep 3s ease-out forwards', animationDirection: 'reverse' }} />
                    </svg>

                    {/* Nodes along the path */}
                    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', width: '100%', gap: '2rem', zIndex: 2 }}>

                        {/* Point 1 */}
                        <div className="glass-panel animate-fade-in-up mobile-reset-margin" style={{ padding: '2rem', marginTop: '200px' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>TRANSACTIONAL</div>
                            <div className="text-white" style={{ fontSize: '1.2rem' }}>500k Searches</div>
                            <div className="text-mono text-red" style={{ marginTop: '0.5rem' }}>$2.0M ARR</div>
                            <div className="text-mono text-muted" style={{ marginTop: '2rem', fontSize: '1rem' }}>
                                Currently scoping a paid pilot with a top-tier global mobility platform.
                            </div>
                        </div>

                        {/* Point 2 */}
                        <div className="glass-panel animate-fade-in-up mobile-reset-margin" style={{ padding: '2rem', marginTop: '50px', animationDelay: '0.2s', border: '1px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>MONITORING</div>
                            <div className="text-white" style={{ fontSize: '1.2rem' }}>50k Users</div>
                            <div className="text-mono text-red" style={{ marginTop: '0.5rem' }}>$3.6M ARR</div>
                        </div>

                        {/* Point 3 (Total) */}
                        <div className="glass-panel animate-fade-in-up mobile-reset-margin" style={{ padding: '2rem', marginTop: '-100px', animationDelay: '0.4s', background: 'rgba(228, 0, 40, 0.1)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>TOTAL TRACTION</div>
                            <MetricTicker value="$5.6M" label="IMMEDIATE ARR" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide09_ARR_Early;
