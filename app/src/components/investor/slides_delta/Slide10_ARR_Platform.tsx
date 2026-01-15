import React from 'react';

const Slide10_ARR_Platform: React.FC = () => {
    return (
        <section className="brand-section" id="slide-10">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <span className="label">10. PLATFORM SCALE</span>
                    <h2 className="text-huge">ADOPTION <span className="text-red">VELOCITY.</span></h2>
                </div>

                {/* Case File / Dossier Layout */}
                <div className="glass-panel mobile-border-none mobile-bg-none mobile-padding-sm" style={{ padding: '3rem', borderLeft: '4px solid var(--color-alert-red)', background: 'linear-gradient(90deg, rgba(228,0,40,0.05), transparent)' }}>

                    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center' }}>

                        {/* LEFT: Folder Content */}
                        <div>
                            <div className="text-mono text-muted" style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                                <span>CASE_ID: SCALE_V2</span>
                                <span>STATUS: PROJECTED</span>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div className="text-mono text-white">TRANSACTIONAL VOLUME</div>
                                <div className="text-huge text-white" style={{ fontSize: '2.5rem' }}>3M SEARCHES / YR</div>
                                <div className="text-mono text-red" style={{ fontSize: '1.2rem' }}>→ $9M ARR</div>
                            </div>

                            <div>
                                <div className="text-mono text-white">MONITORING VOLUME</div>
                                <div className="text-huge text-white" style={{ fontSize: '2.5rem' }}>250K IDENTITIES</div>
                                <div className="text-mono text-red" style={{ fontSize: '1.2rem' }}>→ $21M ARR</div>
                            </div>

                            <div style={{ marginTop: '3rem', padding: '1.5rem', border: '1px dashed var(--color-grid)', background: 'rgba(0,0,0,0.3)' }}>
                                <div className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>COMBINED REVENUE OUTPUT</div>
                                <div className="text-huge text-glow" style={{ color: 'var(--color-signal-white)', fontSize: '3.5rem' }}>$30M ARR</div>
                            </div>
                        </div>

                        {/* RIGHT: Network Graph Visual */}
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>

                            {/* Central Core */}
                            <div className="pulse-active" style={{
                                width: '180px', height: '180px', borderRadius: '50%',
                                background: 'black',
                                border: '2px solid var(--color-alert-red)',
                                boxShadow: '0 0 40px rgba(228, 0, 40, 0.4)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                zIndex: 10, position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', inset: 8, border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                                <span className="text-huge text-white" style={{ fontSize: '3.5rem', lineHeight: 1, textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>30M</span>
                                <span className="text-mono text-red" style={{ fontSize: '0.75rem', marginTop: '0.5rem', letterSpacing: '0.15em' }}>REVENUE ENGINE</span>
                            </div>

                            {/* Orbit Ring 1: SEARCH VOLUME (Fast) */}
                            <div style={{
                                position: 'absolute', width: '280px', height: '280px',
                                border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '50%',
                                animation: 'spin-slow 12s linear infinite'
                            }}>
                                <div style={{
                                    position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <div style={{ width: 12, height: 12, background: 'white', borderRadius: '50%', boxShadow: '0 0 10px white' }} />
                                    {/* Counter-Rotate Label */}
                                    <span className="text-mono text-white" style={{
                                        fontSize: '0.7rem', background: 'black', padding: '2px 6px',
                                        whiteSpace: 'nowrap', border: '1px solid #333',
                                        animation: 'spin-slow 12s linear infinite reverse'
                                    }}>
                                        SEARCH STREAM
                                    </span>
                                </div>
                            </div>

                            {/* Orbit Ring 2: MONITORING (Slow & Stable) */}
                            <div style={{
                                position: 'absolute', width: '450px', height: '450px',
                                border: '1px solid rgba(228, 0, 40, 0.2)', borderRadius: '50%',
                                animation: 'spin-slow 25s linear infinite reverse'
                            }}>
                                <div style={{
                                    position: 'absolute', bottom: 40, right: 40,
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}>
                                    <div style={{ width: 20, height: 20, background: 'var(--color-alert-red)', borderRadius: '50%', boxShadow: '0 0 20px red' }} />
                                    {/* Counter-Rotate Label */}
                                    <span className="text-mono text-red" style={{
                                        fontSize: '0.7rem', background: 'black', padding: '2px 6px',
                                        whiteSpace: 'nowrap', border: '1px solid var(--color-alert-red)',
                                        animation: 'spin-slow 25s linear infinite'
                                    }}>
                                        MONITORING BASE
                                    </span>
                                </div>
                            </div>

                            {/* Background Tech Rings */}
                            <svg style={{ position: 'absolute', width: '120%', height: '120%', pointerEvents: 'none', opacity: 0.1 }}>
                                <circle cx="50%" cy="50%" r="200" fill="none" stroke="white" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="100" fill="none" stroke="red" strokeWidth="1" strokeDasharray="10,10" />
                            </svg>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide10_ARR_Platform;
