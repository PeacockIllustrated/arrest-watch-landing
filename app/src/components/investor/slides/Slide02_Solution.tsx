import React from 'react';
import ScanLine from '../ui/ScanLine';

const Slide02_Solution: React.FC = () => {
    return (
        <section className="brand-section" id="slide-02">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2" style={{ gap: '6rem' }}>

                    {/* LEFT: Negative Space Headline */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span className="label">02. THE SOLUTION</span>
                        <h2 className="text-huge" style={{ fontSize: '4rem' }}>
                            CLOSING THE <br />
                            <span className="text-red">TIME GAP.</span>
                        </h2>

                        <div style={{ marginTop: '4rem', paddingLeft: '2rem', borderLeft: '2px solid var(--color-grid)' }}>
                            <p className="text-mono text-muted" style={{ fontStyle: 'italic', fontSize: '1.2rem', lineHeight: '1.6' }}>
                                “Background checks stop bad actors yesterday.<br />
                                <span className="text-white text-glow">ArrestDelta stops them today.</span>”
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Scanning Interface */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
                            <ScanLine />

                            {/* Top Half: Pre-Hire */}
                            <div style={{ flex: 1, padding: '2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div className="text-mono text-muted" style={{ marginBottom: '1rem', fontSize: '0.8rem' }}>MOMENT 01: ONBOARDING</div>
                                <h3 className="text-large text-white">Instant Verification</h3>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <span className="text-mono" style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px' }}>API: 240ms</span>
                                    <span className="text-mono" style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 8px' }}>MATCH: EXACT</span>
                                </div>
                            </div>

                            {/* Bottom Half: Post-Hire */}
                            <div style={{ flex: 1, padding: '2rem', background: 'rgba(228, 0, 40, 0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div className="text-mono text-red" style={{ marginBottom: '1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div className="spinner" style={{ width: '12px', height: '12px', borderWidth: '1px' }}></div>
                                    MOMENT 02: POST-ACCESS
                                </div>
                                <h3 className="text-large text-white">Continuous Monitoring</h3>
                                <p className="text-muted" style={{ marginTop: '1rem' }}>
                                    Nationwide arrest stream. Alerts delivered in minutes.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide02_Solution;
