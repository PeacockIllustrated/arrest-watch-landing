import React from 'react';

const Slide02_ICP: React.FC = () => {
    const primaryICP = [
        { label: 'GIG + MARKETPLACES', desc: 'Uber, Lyft, DoorDash, Instacart, etc.' },
        { label: 'TRUST & SAFETY CONSUMER PLATFORMS', desc: 'Dating, hospitality, home services' },
        { label: 'LARGE SCREENING PROVIDERS', desc: 'Sterling, Checkr, HireRight integrations' },
        { label: 'HIGHLY REGULATED VERTICALS', desc: 'Financial services, insurance, healthcare' },
    ];

    return (
        <section className="brand-section" id="gtm-slide-02">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', bottom: '-20%', left: '-10%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            02. ICP FOCUS
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 0.95 }}>
                            WE DO NOT<br />
                            SELL <span className="text-red text-glow">HORIZONTALLY.</span>
                        </h2>

                        {/* Risk Statement */}
                        <div style={{
                            borderLeft: '4px solid var(--color-alert-red)',
                            paddingLeft: '1.5rem',
                            marginTop: '2.5rem'
                        }}>
                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '500px' }}>
                                Arrest-related decisions carry <span className="text-white">operational, legal, and reputational risk</span>.
                                We start with buyers who understand that.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: ICP Grid */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel" style={{ padding: '2.5rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                                PRIMARY ICP - YEAR 1
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {primaryICP.map((icp, i) => (
                                    <div
                                        key={i}
                                        className="animate-fade-in-up"
                                        style={{
                                            animationDelay: `${0.4 + i * 0.1}s`,
                                            padding: '1.25rem',
                                            background: 'rgba(255, 255, 255, 0.02)',
                                            border: '1px solid var(--color-grid)',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <div className="text-mono text-white" style={{ fontSize: '0.95rem', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
                                            {icp.label}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                            {icp.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide02_ICP;
