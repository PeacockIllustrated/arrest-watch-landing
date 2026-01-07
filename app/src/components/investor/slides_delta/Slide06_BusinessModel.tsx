import React from 'react';

const Slide06_BusinessModel: React.FC = () => {
    return (
        <section className="brand-section" id="slide-06">
            <div className="grid-bg-overlay" />
            <section className="brand-section" id="slide-06">
                <div className="grid-bg-overlay" />
                <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                    <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '4rem' }}>

                        {/* LEFT: Heading */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', maxWidth: '600px' }}>
                            <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>06. BUSINESS MODEL</span>
                            <h2 className="text-huge" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1 }}>
                                FOUNDATION FOR SCALE.
                            </h2>
                            <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem', lineHeight: 1.6 }}>
                                While pricing is not final, the model is clear. Every metric aligns with low churn and high LTV.
                            </p>
                        </div>

                        {/* RIGHT: Model Boxes */}
                        <div className="animate-fade-in-up mobile-stack" style={{ animationDelay: '0.3s', display: 'flex', gap: '2rem' }}>

                            {/* Box 1 */}
                            <div className="glass-panel" style={{ padding: '2rem', width: '300px', border: '1px solid var(--border-color)' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>RECURRING SaaS</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ PER-SEAT PRICING</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ ENTERPRISE CONTRACTS</div>
                            </div>

                            {/* Box 2 */}
                            <div className="glass-panel" style={{ padding: '2rem', width: '300px', border: '1px solid var(--border-color)' }}>
                                <div className="text-mono text-white" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>USAGE-BASED</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ BIOMETRIC MATCHING FEES</div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ HIGH-VOLUME API TIERS</div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </section>
    );
};

export default Slide06_BusinessModel;
