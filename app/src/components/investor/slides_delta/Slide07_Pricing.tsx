import React from 'react';

const Slide07_Pricing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-07">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '900px' }}>
                    <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>07. NEXT STEPS</span>
                    <h2 className="text-huge" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '2rem' }}>
                        FROM SIGNAL TO ACTION, <span className="text-red">IN MINUTES</span>
                    </h2>
                    <p className="text-muted" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
                        Don't rely on outdated background checks. Integrate ArrestDelta's real-time arrest monitoring directly into your platform to proactively manage risk and ensure the highest safety standards.
                    </p>
                </div>

                <div className="grid-2 mobile-stack" style={{ gap: '2rem', width: '100%', marginBottom: '3rem' }}>

                    {/* Box 1 */}
                    <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>INTEGRATION</div>
                        <h3 className="text-red text-large" style={{ fontSize: '2rem', lineHeight: 1.1 }}>Embedded Risk Infrastructure</h3>
                        <div className="text-mono text-muted" style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>API-first integration into Trust, Safety, and Legal workflows</div>
                    </div>

                    {/* Box 2 */}
                    <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>OUTCOME</div>
                        <h3 className="text-white text-large" style={{ fontSize: '2rem', lineHeight: 1.1 }}>Verified Action</h3>
                        <div className="text-mono text-muted" style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>Automatic suspension, escalation, or review triggered only on confirmed risk changes.</div>
                    </div>

                </div>

                {/* Closing Thesis Line */}
                <div style={{ textAlign: 'center', maxWidth: '800px' }}>
                    <p className="text-mono text-white" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                        Static checks create blind spots. Continuous verification closes them.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Slide07_Pricing;
