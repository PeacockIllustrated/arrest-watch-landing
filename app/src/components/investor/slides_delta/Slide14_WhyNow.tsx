import React from 'react';
import LiveTerminal from '../ui/LiveTerminal';

const Slide14_WhyNow: React.FC = () => {
    return (
        <section className="brand-section" id="slide-14">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2" style={{ gap: '4rem' }}>

                    {/* LEFT: Context */}
                    <div className="animate-fade-in-up">
                        <span className="label">14. MARKET TIMING</span>
                        <h2 className="text-huge" style={{ fontSize: '5rem', marginBottom: '4rem' }}>
                            WHY <span className="text-red">NOW?</span>
                        </h2>

                        <div className="flex-col" style={{ gap: '2rem' }}>
                            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-signal-white)' }}>
                                <div className="text-large text-white" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. THE GIG EXPLOSION</div>
                                <p className="text-muted">Marketplaces require continuous trust, not one-time checks.</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)' }}>
                                <div className="text-large text-white" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. LIABILITY SHOCK</div>
                                <p className="text-muted">Negligent hiring lawsuits are at an all-time high ($50M+ verdicts).</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Urgent Terminal */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="glass-panel border-glow" style={{ padding: '1rem' }}>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(228, 0, 40, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ width: '10px', height: '10px', background: 'var(--color-alert-red)', borderRadius: '50%', display: 'inline-block', animation: 'blink-red 1s infinite' }}></span>
                                SYSTEM_CRITICAL: LEGACY FAILURE DETECTED
                            </div>
                            <LiveTerminal height="300px" />
                        </div>

                        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                            <p className="text-large text-white" style={{ fontStyle: 'italic', opacity: 0.8 }}>
                                "ArrestDelta is becoming core infrastructure for trust."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide14_WhyNow;
