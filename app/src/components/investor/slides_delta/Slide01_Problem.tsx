import React from 'react';

const Slide01_Problem: React.FC = () => {
    return (
        <section className="brand-section" id="slide-01">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'flex-end' }}>

                    {/* LEFT: Cinematic Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-red border-glow" style={{
                            display: 'inline-block', padding: '4px 12px', border: '1px solid var(--color-alert-red)', marginBottom: '2rem'
                        }}>
                            01. THE OPPORTUNITY
                        </span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.85 }}>
                            REAL-TIME<br />
                            CRIMINAL<br />
                            <span className="text-red text-glow">RISK</span><br />
                            <span className="text-red text-glow">INTELLIGENCE.</span>
                        </h1>
                        <p className="text-mono text-muted" style={{ marginTop: '3rem', maxWidth: '500px', fontSize: '1.2rem', lineHeight: 1.6 }}>
                            ArrestDelta is building the first real-time criminal risk detection layer for workforce platforms at national scale.
                        </p>
                    </div>

                    {/* RIGHT: Live Visual Dock */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                            <div style={{ borderLeft: '4px solid var(--color-alert-red)', paddingLeft: '2rem', marginBottom: '2rem' }}>
                                <h2 className="text-white" style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1rem' }}>
                                    Risk travels in minutes.
                                </h2>
                                <div className="text-mono text-muted">EXISTING SYSTEMS REACT IN MONTHS.</div>
                            </div>

                            <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                                Today, companies like Uber and Lyft rely on static background checks every 3–12 months. They miss the most dangerous window: the moment a worker is arrested and continues operating for days before discovery.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            {/* Ambient Background Noise/Glow */}
            <div style={{
                position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.1), transparent 70%)',
                pointerEvents: 'none', zIndex: -1
            }} />
        </section>
    );
};

export default Slide01_Problem;
