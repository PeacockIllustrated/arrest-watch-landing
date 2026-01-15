import React from 'react';
import RadarNode from '../ui/RadarNode';
import MetricTicker from '../ui/MetricTicker';

const Slide05_MarketSize: React.FC = () => {
    return (
        <section className="brand-section" id="slide-05">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', width: '100%' }}>

                    {/* LEFT: Text Content */}
                    <div className="animate-fade-in-up" style={{ zIndex: 5 }}>
                        <span className="label">05. MARKET SIZE</span>
                        <h2 className="text-huge" style={{ fontSize: '4.5rem', marginBottom: '3rem' }}>
                            DEFINED <br /><span className="text-red">OPPORTUNITY.</span>
                        </h2>

                        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '500px', borderLeft: '4px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                MARKET LOGIC
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0 }} className="text-mono text-muted">
                                <li style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className="text-muted">TOTAL WORKFORCE</span>
                                    <span className="text-white">160M</span>
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className="text-red">TRUST-CRITICAL SEGMENT</span>
                                    <span className="text-red">~73M</span>
                                </li>
                                <li style={{ marginBottom: '1.5rem', fontSize: '0.8rem', paddingLeft: '1rem', borderLeft: '1px solid #333' }}>
                                    Healthcare, Education, Gig, Transport
                                </li>
                                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span className="text-white">AVG. REVENUE</span>
                                    <span className="text-white">$144 / YR</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Radial Focus Visualization */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Background Radar */}
                        <div style={{ position: 'absolute', opacity: 0.6 }}>
                            <RadarNode size="700px" type="radar" />
                        </div>

                        {/* Central Metric */}
                        <div className="glass-panel border-glow animate-fade-in-up mobile-reset-transform mobile-padding-sm" style={{
                            width: '350px', height: '350px', borderRadius: '50%',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            zIndex: 2, background: 'rgba(0,0,0,0.8)', animationDelay: '0.2s'
                        }}>
                            <MetricTicker value="~$10.5B" label="SERVICEABLE MARKET (SAM)" />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <span className="text-mono text-green" style={{ fontSize: '1rem', background: 'rgba(76, 175, 80, 0.1)', padding: '0.2rem 0.5rem', border: '1px solid #4CAF50' }}>
                                    ▲ 12% CAGR
                                </span>
                            </div>
                            <div className="text-mono text-muted text-center" style={{ fontSize: '0.9rem', marginTop: '1.5rem', maxWidth: '250px', lineHeight: 1.4 }}>
                                ANNUAL REVENUE POTENTIAL<br />
                                <span style={{ opacity: 0.7 }}>(73M Users @ $144/yr)</span>
                            </div>
                        </div>

                        {/* Orbiting Satellite Data Points */}
                        <div style={{ position: 'absolute', top: '10%', right: '15%', animation: 'fade-in-up 1s ease-out forwards 0.4s', opacity: 0 }}>
                            <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.8rem' }}>GIG ECONOMY</span>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '25%', left: '5%', animation: 'fade-in-up 1s ease-out forwards 0.6s', opacity: 0 }}>
                            <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
                                <span className="text-mono text-white" style={{ fontSize: '0.8rem' }}>HEALTHCARE</span>
                            </div>
                        </div>
                        <div style={{ position: 'absolute', bottom: '15%', right: '5%', animation: 'fade-in-up 1s ease-out forwards 0.8s', opacity: 0 }}>
                            <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
                                <span className="text-mono text-white" style={{ fontSize: '0.8rem' }}>EDUCATION</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide05_MarketSize;
