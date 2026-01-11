import React from 'react';

const Slide08_WhyWeWin: React.FC = () => {
    return (
        <section className="brand-section" id="slide-08">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span className="label">08. COMPETITIVE ADVANTAGE</span>
                    <h2 className="text-large" style={{ fontSize: '3rem' }}>STRUCTURAL <span className="text-red">DOMINANCE.</span></h2>
                </div>

                {/* HEAD-TO-HEAD COMPARISON */}
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', height: '500px', alignItems: 'center' }}>

                    {/* LEGACY SIDE */}
                    <div className="glass-panel" style={{
                        height: '100%', padding: '3rem', display: 'flex', flexDirection: 'column',
                        opacity: 0.6, filter: 'grayscale(1)', border: '1px solid #333'
                    }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '2rem', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
                            LEGACY STANDARD
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                "Static, one-time snapshots",
                                "Batch ingestion (24-48hr delay)",
                                "Expensive manual re-checks",
                                "Zero post-hire visibility",
                                "Pay-per-search Model"
                            ].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', color: '#666' }}>
                                    <span style={{ opacity: 0.5 }}>✕</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ARRESTDELTA SIDE */}
                    <div className="glass-panel border-glow" style={{
                        height: '110%', padding: '3rem', display: 'flex', flexDirection: 'column',
                        border: '1px solid var(--color-alert-red)',
                        background: 'linear-gradient(135deg, rgba(228,0,40,0.05), transparent)',
                        zIndex: 2, boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                    }}>
                        <div className="text-mono text-red" style={{ marginBottom: '2rem', fontSize: '0.9rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>ARRESTDELTA INTELLIGENCE</span>
                            <span className="pulse-active" style={{ width: '8px', height: '8px', background: 'var(--color-alert-red)', borderRadius: '50%' }}></span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {[
                                "Event-driven architecture (Real-time)",
                                "Continuous intelligence stream",
                                "90% cheaper than re-running checks",
                                "100% Post-access visibility",
                                "SaaS Subscription Model"
                            ].map((item, i) => (
                                <li key={i} className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.4rem', color: 'white', animationDelay: `${i * 0.1}s` }}>
                                    <span className="text-red">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--color-alert-red)' }}>
                            <div className="text-mono text-white" style={{ fontSize: '2rem', lineHeight: 1 }}>100x</div>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem' }}>FASTER RESPONSE TIME</div>
                            <p className="text-muted text-mono" style={{ marginTop: '2rem', maxWidth: '500px' }}>
                                Decision latency, not raw data access, defines the moat. Verified action beats fast noise.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section >
    );
};

export default Slide08_WhyWeWin;
