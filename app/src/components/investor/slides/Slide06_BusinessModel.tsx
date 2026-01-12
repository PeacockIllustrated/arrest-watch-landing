import React from 'react';

const Slide06_BusinessModel: React.FC = () => {
    return (
        <section className="brand-section" id="slide-06">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <span className="label">06. BUSINESS MODEL</span>
                    <h2 className="text-huge">DUAL REVENUE <span className="text-red">ENGINE</span></h2>
                </div>

                {/* Asymmetric Stacks Layout */}
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

                    {/* LEFT STACK: Transactional */}
                    <div className="glass-panel animate-fade-in-up mobile-reset-transform" style={{ padding: '3rem', transform: 'rotate(-1deg)', borderColor: 'var(--color-grid)' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>ENGINE_01</span>
                            <span>VERIFICATION</span>
                        </div>
                        <h3 className="text-large text-white" style={{ fontSize: '2.5rem' }}>Transactional</h3>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">Basic Search</span>
                                <span className="text-white">$2-$5</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">Enhanced / Fuzzy</span>
                                <span className="text-white">$6-$10</span>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem' }} className="text-mono text-muted">
                                HIGH VOLUME ENTRY POINT
                            </div>
                        </div>
                    </div>

                    {/* RIGHT STACK: Subscription (Lifted) */}
                    <div className="glass-panel border-glow animate-fade-in-up mobile-reset-transform" style={{ padding: '3rem', transform: 'translateY(-40px) rotate(1deg)', background: 'rgba(26,26,26,0.8)', animationDelay: '0.2s' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>ENGINE_02</span>
                            <span>RECURRING</span>
                        </div>
                        <h3 className="text-large text-white" style={{ fontSize: '2.5rem' }}>Live Monitoring</h3>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-alert-red)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">Subscription</span>
                                <span className="text-red text-glow">PER PERSON / MO</span>
                            </div>
                            <div className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                                Predictable, high-margin SaaS revenue scaling with headcount.
                            </div>
                            <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(255,255,255,0.1)', textAlign: 'center' }}>
                                <span className="text-mono text-white" style={{ fontSize: '0.9rem' }}>NET REVENUE RETENTION: 120%+</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide06_BusinessModel;
