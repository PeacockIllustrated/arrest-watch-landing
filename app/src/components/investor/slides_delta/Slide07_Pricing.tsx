import React from 'react';

const Slide07_Pricing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-07">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '900px' }}>
                    <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>07. NEXT STEPS</span>
                    <h2 className="text-huge" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '2rem' }}>
                        INCREASE SAFETY, <span className="text-white">LIMIT LIABILITY</span>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
                        Don't rely on outdated background checks. Integrate ArrestDelta's real-time arrest monitoring directly into your platform to proactively manage risk and ensure the highest safety standards.
                    </p>
                </div>

                <div className="grid-2 mobile-stack" style={{ gap: '2rem', width: '100%', maxWidth: '1000px', marginBottom: '4rem' }}>

                    {/* Box 1 */}
                    <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--border-color)' }}>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>INTEGRATION</div>
                        <h3 className="text-red text-large" style={{ fontSize: '3rem', lineHeight: 1 }}>REST API</h3>
                        <div className="text-mono text-muted" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>SEAMLESS CONNECTION</div>
                    </div>

                    {/* Box 2 */}
                    <div className="glass-panel" style={{ padding: '3rem', border: '1px solid var(--border-color)' }}>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>OUTCOME</div>
                        <h3 className="text-white text-large" style={{ fontSize: '3rem', lineHeight: 1 }}>SAFETY</h3>
                        <div className="text-mono text-muted" style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>PROACTIVE RISK MANAGEMENT</div>
                    </div>

                </div>

                {/* Footer / CTA */}
                <div style={{ width: '100%', maxWidth: '1000px', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center' }}>
                    <button className="btn-primary" style={{ background: '#fff', color: '#000', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginBottom: '1rem' }}>
                        REQUEST ACCESS
                    </button>
                    <div className="text-mono text-muted" style={{ fontSize: '0.8rem' }}>SECURE YOUR PLATFORM TODAY</div>
                </div>

            </div>
        </section>
    );
};

export default Slide07_Pricing;
