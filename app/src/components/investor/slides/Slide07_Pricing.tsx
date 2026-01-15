import React from 'react';


const Slide07_Pricing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-07">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span className="label">07. PRICING STRATEGY</span>
                        <h2 className="text-huge" style={{ fontSize: '4rem', marginBottom: 0 }}>SIMPLE & <span className="text-red">SCALABLE.</span></h2>
                    </div>
                </div>

                {/* Data Wall Grid */}
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                    {/* Col 1: Model Structure */}
                    <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className="text-mono text-muted" style={{ marginBottom: '1.5rem' }}>CONTRACT STRUCTURE</div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <div className="text-white text-large" style={{ fontSize: '1.4rem' }}>Enterprise Contracts</div>
                                <div className="text-muted text-mono" style={{ fontSize: '0.9rem' }}>BILLED ANNUALLY</div>
                            </div>
                            <div>
                                <div className="text-white text-large" style={{ fontSize: '1.4rem' }}>Volume Based</div>
                                <div className="text-muted text-mono" style={{ fontSize: '0.9rem' }}>ROLE & RISK DEPENDENT</div>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: PUPM Pricing */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{ padding: '3rem', animationDelay: '0.1s', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        <div>
                            <div className="text-mono text-red" style={{ marginBottom: '1rem' }}>PER USER / PER MONTH (PUPM)</div>
                            <div style={{ fontSize: '5rem', fontWeight: 'bold', lineHeight: 1, letterSpacing: '-0.02em', background: 'linear-gradient(to bottom, #fff, #999)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                $8 - $15
                            </div>
                            <div className="text-mono text-muted" style={{ marginTop: '1rem' }}>
                                TYPICAL PRICING RANGE
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', borderLeft: '1px solid var(--glass-border)', paddingLeft: '3rem' }}>
                            <div className="text-mono text-muted" style={{ marginBottom: '0.5rem' }}>BLENDED AVERAGE</div>
                            <div className="text-red text-glow" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>$12</div>
                            <div className="text-mono text-white" style={{ fontSize: '0.9rem' }}>PUPM</div>

                            <div className="text-muted text-mono" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px dashed var(--glass-border)' }}>
                                ANNUAL REV / USER
                                <div className="text-white" style={{ fontSize: '1.2rem' }}>$144</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide07_Pricing;
