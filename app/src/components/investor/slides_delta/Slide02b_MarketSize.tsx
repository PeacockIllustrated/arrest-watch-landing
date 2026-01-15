import React from 'react';

const Slide02b_MarketSize: React.FC = () => {
    return (
        <section className="brand-section" id="slide-02b">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 2rem' }}>

                {/* Header */}
                <div className="animate-fade-in-up" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="label text-mono text-muted" style={{ display: 'inline-block', marginBottom: '1rem' }}>03. MARKET SIZE</span>
                    <h2 className="text-huge" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', lineHeight: 1 }}>
                        A <span className="text-red text-glow">MULTI-BILLION DOLLAR</span><br />
                        DECISION LAYER.
                    </h2>
                </div>

                {/* Main Metrics Grid */}
                <div className="grid-3" style={{ gap: '2rem', alignItems: 'stretch' }}>

                    {/* TAM */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <div className="glass-panel" style={{ padding: '2rem', height: '100%', borderTop: '4px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>TOTAL ADDRESSABLE MARKET (US)</div>
                            <div className="text-huge text-white" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>~$23.0B</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                                160M US workforce users × $144/yr
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p className="text-white" style={{ fontSize: '0.95rem' }}>
                                    All US employers where real-time arrest alerts materially reduce legal, safety, or reputational risk.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SAM */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem', height: '100%', borderTop: '4px solid var(--color-alert-red)', display: 'flex', flexDirection: 'column', background: 'rgba(228, 0, 40, 0.03)' }}>
                            <div className="text-mono text-red" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>SERVICEABLE AVAILABLE MARKET</div>
                            <div className="text-huge text-red text-glow" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>~$10.5B</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                                ~73M High-Risk Users × $144/yr
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(228, 0, 40, 0.2)' }}>
                                <p className="text-white" style={{ fontSize: '0.95rem' }}>
                                    <strong>Realistic US Buyers:</strong> Healthcare, Gov, Ed, Mobility, and Safety-Critical Enterprise roles.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SOM */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel" style={{ padding: '2rem', height: '100%', borderTop: '4px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>SERVICEABLE OBTAINABLE MARKET</div>
                            <div className="text-huge text-white" style={{ fontSize: '3.5rem', lineHeight: 1, marginBottom: '0.5rem' }}>~$360M</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>
                                ~1,200 Customers × $300k ACV
                            </div>
                            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <p className="text-white" style={{ fontSize: '0.95rem' }}>
                                    <strong>Initial Focus (5-7 Years):</strong> Mobility platforms, large healthcare systems, and federal agencies.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Pricing Context */}
                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', marginTop: '3rem', textAlign: 'center' }}>
                    <div className="glass-panel" style={{ display: 'inline-flex', gap: '2rem', padding: '1rem 2rem', alignItems: 'center' }}>
                        <span className="text-mono text-muted">PRICING MODEL MODEL DRIVER:</span>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
                            <span className="text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>~$12</span>
                            <span className="text-mono text-muted">PER USER / PER MONTH</span>
                        </div>
                        <span className="text-mono text-muted" style={{ borderLeft: '1px solid #333', paddingLeft: '2rem' }}>
                            BILLED ANNUALLY
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Slide02b_MarketSize;
