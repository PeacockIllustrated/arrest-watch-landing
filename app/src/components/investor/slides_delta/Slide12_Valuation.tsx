import React from 'react';
import MetricTicker from '../ui/MetricTicker';

const Slide12_Valuation: React.FC = () => {
    return (
        <section className="brand-section" id="slide-12">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <div style={{ marginBottom: '3rem' }}>
                    <span className="label">12. VALUATION</span>
                    <h2 className="text-large">THE <span className="text-red">UPSIDE.</span></h2>
                </div>

                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
                    {/* Box 1: Comp 1 */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>MARKET COMP</div>
                        <div className="text-large text-white" style={{ fontSize: '1.8rem' }}>Checkr</div>
                        <div className="text-mono text-white" style={{ marginTop: '0.5rem' }}>$5.0B VALUATION</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '2rem' }}>
                            STATUS: LEGACY UNICORN
                        </div>
                    </div>

                    {/* Box 2: Comp 2 */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', animationDelay: '0.1s' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '1rem' }}>MARKET COMP</div>
                        <div className="text-large text-white" style={{ fontSize: '1.8rem' }}>Clear</div>
                        <div className="text-mono text-white" style={{ marginTop: '0.5rem' }}>$4.5B MARKET CAP</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginTop: '2rem' }}>
                            STATUS: IDENTITY PUBLIC CO
                        </div>
                    </div>

                    {/* Box 3: ArrestDelta Target */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '2rem', background: 'rgba(228, 0, 40, 0.05)', animationDelay: '0.2s' }}>
                        <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>ARRESTDELTA TARGET</div>
                        <MetricTicker value="$300M+" label="SERIES B TARGET" />
                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-alert-red)' }}>
                            <span className="text-white">$15M pre</span><span className="text-white">PATH TO $1B+</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '4rem', textAlign: 'center', opacity: 0.7 }}>
                    <p className="text-mono text-muted">
                        "We are building the Checkr of real-time monitoring."
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Slide12_Valuation;
