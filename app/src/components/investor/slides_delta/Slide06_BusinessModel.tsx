import React from 'react';

const Slide06_BusinessModel: React.FC = () => {
    return (
        <section className="brand-section" id="slide-06">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '100%' }}>

                    {/* TOP: Heading */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', marginBottom: '3rem' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>06. BUSINESS MODEL</span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', lineHeight: 1 }}>
                            FOUNDATION FOR SCALE.
                        </h2>
                        <p className="text-mono text-muted" style={{ marginTop: '1.5rem', fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '600px' }}>
                            Pricing scales with monitored exposure, not usage frequency, aligning revenue with enterprise risk.
                        </p>
                        <p className="text-muted" style={{ marginTop: '1rem', fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '600px' }}>
                            While pricing is not final, the model is clear. Every metric aligns with low churn and high LTV.
                        </p>
                    </div>

                    {/* Model Boxes - Left aligned with header */}
                    <div className="animate-fade-in-up mobile-stack" style={{ animationDelay: '0.3s', display: 'flex', gap: '2rem', marginBottom: '3rem' }}>

                        {/* Box 1 */}
                        <div className="glass-panel" style={{ padding: '2rem', width: '350px', border: '1px solid var(--border-color)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>RECURRING SaaS</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ PER-IDENTITY PRICING</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ MULTI-YEAR ENTERPRISE CONTRACTS</div>
                        </div>

                        {/* Box 2 */}
                        <div className="glass-panel" style={{ padding: '2rem', width: '350px', border: '1px solid var(--border-color)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>USAGE-BASED</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ IDENTITY RESOLUTION AND VERIFICATION EVENTS</div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ HIGH-VOLUME, STATE-CHANGE API TIERS</div>
                        </div>

                    </div>

                    {/* BOTTOM: Compounding Insight - Left aligned */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <p className="text-mono text-muted" style={{ fontSize: '0.85rem', maxWidth: '700px' }}>
                            As customers scale, monitored populations grow, verification depth increases, and switching costs compound.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide06_BusinessModel;
