import React from 'react';
import HeatTiles from '../ui/HeatTiles';

const Slide03_Product: React.FC = () => {
    return (
        <section className="brand-section" id="slide-03">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                <div style={{ marginBottom: '3rem' }}>
                    <span className="label">03. THE PLATFORM</span>
                    <h2 className="text-large" style={{ fontSize: '3rem' }}>COMPREHENSIVE <span className="text-red">COVERAGE</span></h2>
                </div>

                {/* Control Room Layout: 3 Columns */}
                <div className="grid-3 mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 0.8fr', gap: '2rem' }}>

                    {/* PANEL 1: Transactional */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.1s' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                            ENGINE_A: SEARCH
                        </div>
                        <h3 className="text-white text-large" style={{ fontSize: '1.8rem' }}>Transactional Verification</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li className="text-mono text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Identity Fuzzy Match</span>
                                <span className="text-white">ACTIVE</span>
                            </li>
                            <li className="text-mono text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Nationwide Sources</span>
                                <span className="text-white">CONNECTED</span>
                            </li>
                            <li className="text-mono text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Response Time</span>
                                <span className="text-green" style={{ color: '#4CAF50' }}>&lt;500ms</span>
                            </li>
                        </ul>

                        {/* Visual: Sample JSON Output */}
                        <div style={{ marginTop: '2rem', padding: '1rem', background: '#000', border: '1px solid var(--color-grid)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            <div className="text-muted" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>STRUCTURED VERIFICATION OUTPUT</div>
                            <div style={{ color: '#4CAF50', lineHeight: 1.4 }}>
                                {'{'}<br />
                                &nbsp;&nbsp;"status": "VERIFIED",<br />
                                &nbsp;&nbsp;"identity_match": 0.98,<br />
                                &nbsp;&nbsp;"sources_checked": 47,<br />
                                &nbsp;&nbsp;"response_ms": 312<br />
                                {'}'}
                            </div>
                        </div>
                    </div>

                    {/* PANEL 2: Monitoring */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.2s' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-alert-red)', paddingBottom: '0.5rem' }}>
                            ENGINE_B: MONITOR - Identity-Certain Event Monitoring
                        </div>
                        <h3 className="text-white text-large" style={{ fontSize: '1.8rem' }}>Identity-Certain Event Monitoring</h3>

                        <div style={{ margin: '2rem 0' }}>
                            <HeatTiles />
                        </div>

                        <div className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Push-based alert system detecting bookings, warrants, and releases in real-time.
                        </div>
                        <div className="text-mono text-white" style={{ marginTop: '1rem', fontSize: '0.85rem', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-grid)' }}>
                            Identity resolution and verification gates applied before any alert is surfaced.
                        </div>
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(228, 0, 40, 0.1)', border: '1px dashed var(--color-alert-red)' }}>
                            <span className="text-mono text-red" style={{ fontSize: '0.8rem' }}>ALERT ROUTING: WEBHOOK / EMAIL / SLACK</span>
                        </div>
                    </div>

                    {/* PANEL 3: Stats Side Rail */}
                    <div className="flex-col" style={{ gap: '1rem' }}>
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.3s', flex: 1 }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>COVERAGE GOAL</div>
                            <div className="text-huge" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>100% US</div>
                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>County-by-County, State-by-State</div>
                        </div>
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.4s', flex: 1 }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>TARGET SLA</div>
                            <div className="text-huge" style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>99.9%</div>
                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>Enterprise Uptime</div>
                        </div>
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.5s', flex: 1 }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>COMPLIANCE</div>
                            <div className="text-huge text-white" style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>BUILT FOR FCRA</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide03_Product;
