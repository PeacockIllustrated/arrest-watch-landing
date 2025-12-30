import React from 'react';
import LiveTerminal from '../ui/LiveTerminal';

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
                            01. THE BLIND SPOT
                        </span>
                        <h1 className="text-huge" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 0.85 }}>
                            REAL-TIME<br />
                            <span className="text-red text-glow">ARREST</span><br />
                            <span className="text-stroke" style={{ WebkitTextStroke: '1px var(--color-signal-white)', color: 'var(--color-void)' }}>INTELLIGENCE</span>
                        </h1>
                        <p className="text-mono text-muted" style={{ marginTop: '3rem', maxWidth: '500px', fontSize: '1.2rem', lineHeight: 1.6 }}>
                            Background checks are static snapshots. <br />
                            <span className="text-white">The moment they finish, the blind spot begins.</span>
                        </p>
                    </div>

                    {/* RIGHT: Live Visual Dock */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2px' }}>
                            <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.6)', borderBottom: '1px solid var(--glass-border)' }}>
                                <div className="text-mono" style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                                    CURRENT STATUS: <span className="text-red">UNMONITORED</span>
                                </div>
                                <div className="text-large text-white" style={{ fontSize: '1.5rem' }}>Static Check Complete</div>
                            </div>
                            <LiveTerminal height="300px" />
                            <div style={{ padding: '1rem', background: 'rgba(228, 0, 40, 0.1)', borderTop: '1px solid var(--color-alert-red)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '10px', height: '10px', background: 'var(--color-alert-red)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-alert-red)' }}></div>
                                <span className="text-mono text-white" style={{ fontSize: '0.9rem' }}>ALERT: 3 RISK EVENTS DETECTED POST-HIRE</span>
                            </div>
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
