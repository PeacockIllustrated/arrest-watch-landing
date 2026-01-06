import React from 'react';

const Slide06_SalesMotion: React.FC = () => {
    return (
        <section className="brand-section" id="gtm-slide-06">
            <div className="grid-bg-overlay" />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                {/* Header */}
                <div style={{ marginBottom: '4rem' }} className="animate-fade-in-up">
                    <span className="label text-mono text-muted">06. SALES MOTION</span>
                    <h2 className="text-large" style={{ fontSize: '3rem', marginTop: '1rem' }}>
                        FOUNDER-LED → <span className="text-red">ENTERPRISE AE.</span>
                    </h2>
                </div>

                {/* Two-Phase Visual */}
                <div className="grid-2 mobile-stack" style={{ gap: '2rem', alignItems: 'stretch' }}>

                    {/* Phase 1 */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{
                        padding: '2.5rem',
                        animationDelay: '0.2s',
                        border: '1px solid var(--color-alert-red)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Active indicator */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '3px',
                            background: 'var(--color-alert-red)',
                            boxShadow: '0 0 20px var(--color-alert-red)'
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div>
                                <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                    PHASE 1 — CURRENT
                                </div>
                                <h3 className="text-white" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                                    FOUNDER-LED SALES
                                </h3>
                            </div>
                            <div className="text-mono text-muted" style={{
                                padding: '0.5rem 1rem',
                                border: '1px solid var(--color-grid)',
                                fontSize: '0.8rem'
                            }}>
                                MONTHS 0–9
                            </div>
                        </div>

                        <div className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Founders own every deal. Build credibility through direct engagement.
                        </div>

                        <div className="text-mono text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                            OPTIMIZES FOR
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Market credibility',
                                'Product-market alignment',
                                'Pilot → production conversion',
                                'Trust and execution discipline'
                            ].map((item, i) => (
                                <li key={i} className="text-white" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                                    <span className="text-red">✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Phase 2 */}
                    <div className="glass-panel animate-fade-in-up" style={{
                        padding: '2.5rem',
                        animationDelay: '0.4s',
                        border: '1px solid var(--color-grid)',
                        opacity: 0.85
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div>
                                <div className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                    PHASE 2 — EXPANSION
                                </div>
                                <h3 className="text-white" style={{ fontSize: '1.8rem', fontWeight: 600 }}>
                                    ENTERPRISE AE
                                </h3>
                            </div>
                            <div className="text-mono text-muted" style={{
                                padding: '0.5rem 1rem',
                                border: '1px dashed var(--color-grid)',
                                fontSize: '0.8rem'
                            }}>
                                MONTHS 6–12
                            </div>
                        </div>

                        <div className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Hire enterprise AE to expand pipeline while founders stay on strategic accounts.
                        </div>

                        <div className="text-mono text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                            AE ROLE PURPOSE
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                'Pipeline expansion',
                                'Closing secondary opportunities',
                                'Founders stay on strategic accounts'
                            ].map((item, i) => (
                                <li key={i} className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                                    <span style={{ opacity: 0.5 }}>→</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Transition Arrow */}
                <div className="animate-fade-in-up mobile-hidden" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '2rem',
                    animationDelay: '0.6s'
                }}>
                    <div className="text-mono text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span>PHASE 1</span>
                        <span style={{ color: 'var(--color-alert-red)' }}>━━━━━━━━━━▶</span>
                        <span>PHASE 2</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Slide06_SalesMotion;
