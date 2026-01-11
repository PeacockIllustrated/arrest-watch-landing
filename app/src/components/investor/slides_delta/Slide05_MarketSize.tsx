import React from 'react';

const Slide05_MarketSize: React.FC = () => {
    return (
        <section className="brand-section" id="slide-05">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>

                    {/* LEFT: Text Content */}
                    <div className="animate-fade-in-up" style={{ zIndex: 5 }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>05. DEFENSIBILITY</span>
                        <h2 className="text-huge" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                            SYSTEM ARCHITECTURE.
                        </h2>

                        {/* Key Quote */}
                        <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '4px solid var(--color-alert-red)', background: 'rgba(228, 0, 40, 0.05)' }}>
                            <p className="text-white" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                Decision latency, not raw data access, defines the moat. Verified action beats fast noise.
                            </p>
                        </div>

                        {/* Architecture Pillars */}
                        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="text-mono text-white">1. API-FIRST, EVENT-DRIVEN ARCHITECTURE</div>
                            <div className="text-mono text-white">2. JURISDICTION-NORMALISING ETL WITH STATE AWARENESS</div>
                            <div className="text-mono text-white">3. HIGH-THROUGHPUT PIPELINES WITH VERIFICATION GATES</div>
                        </div>
                    </div>

                    {/* RIGHT: Code Block */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel" style={{ padding: '2rem', background: '#000', border: '1px solid #333', fontFamily: 'monospace' }}>
                            <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>EVENT /v1/alerts/risk_detected</div>
                            <div style={{ color: '#0f0', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                {'{'}<br />
                                &nbsp;&nbsp;"risk_score": "CRITICAL",<br />
                                &nbsp;&nbsp;"latency_ns": 450,<br />
                                &nbsp;&nbsp;"match_confidence": 0.99,<br />
                                &nbsp;&nbsp;"source": {'{'}<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;"type": "ARREST_RECORD",<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;"jurisdiction": "US CA LA",<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;"timestamp": "2024-12-06T14:22:01Z"<br />
                                &nbsp;&nbsp;{'}'}<br />
                                {'}'}
                            </div>
                        </div>

                        {/* Supporting Copy */}
                        <div className="glass-panel" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Biometric-assisted identity resolution reduces false positives and compounds defensibility over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide05_MarketSize;
