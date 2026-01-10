import React from 'react';

const Slide04_Packaging: React.FC = () => {
    const scopeDimensions = [
        { label: 'GEOGRAPHY', value: 'National coverage, 3,000+ jurisdictions' },
        { label: 'EVENT VOLUME', value: 'Unlimited monitored individuals' },
        { label: 'EVENT TYPES', value: 'Arrests, bookings, charges, dispositions' },
    ];

    return (
        <section className="brand-section" id="gtm-slide-04">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '10%', right: '0%', width: '50%', height: '60%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            04. PACKAGING
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>
                            DECISION<br />
                            <span className="text-red text-glow">INFRASTRUCTURE,</span><br />
                            NOT A DATA FEED.
                        </h2>

                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '480px' }}>
                            We sell a continuously-updated risk intelligence layer that integrates into existing workflows - not raw data that requires interpretation.
                        </p>
                    </div>

                    {/* RIGHT: Scope Panel */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                                COMMERCIAL SCOPE DIMENSIONS
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {scopeDimensions.map((dim, i) => (
                                    <div
                                        key={i}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${0.4 + i * 0.15}s` }}
                                    >
                                        <div className="text-mono text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                                            {dim.label}
                                        </div>
                                        <div className="text-white" style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                                            {dim.value}
                                        </div>
                                        {i < scopeDimensions.length - 1 && (
                                            <div style={{ height: '1px', background: 'var(--color-grid)', marginTop: '2rem' }} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Visual indicator */}
                            <div style={{
                                marginTop: '2.5rem',
                                padding: '1.25rem',
                                background: 'rgba(228, 0, 40, 0.05)',
                                border: '1px solid rgba(228, 0, 40, 0.2)'
                            }}>
                                <div className="text-mono text-red" style={{ fontSize: '0.9rem' }}>
                                    ↳ PRICED BY VALUE DELIVERED, NOT API CALLS
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide04_Packaging;
