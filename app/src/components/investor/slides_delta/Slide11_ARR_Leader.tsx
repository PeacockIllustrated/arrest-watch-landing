import React from 'react';


const Slide11_ARR_Leader: React.FC = () => {
    return (
        <section className="brand-section" id="slide-11">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>

                    {/* LEFT: Text */}
                    <div className="animate-fade-in-up">
                        <span className="label text-red">11. CATEGORY LEADER</span>
                        <h2 className="text-huge" style={{ fontSize: '5rem', lineHeight: 1 }}>
                            MARKET <br /><span className="text-white text-glow">DOMINANCE.</span>
                        </h2>

                        <div style={{ marginTop: '4rem', paddingLeft: '2rem', borderLeft: '4px solid var(--color-signal-white)' }}>
                            <div className="text-large text-white" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AT SCALE:</div>
                            <ul style={{ listStyle: 'none', padding: 0 }} className="text-mono text-muted">
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                                    <span>10M SEARCHES</span>
                                    <span className="text-white">$30M</span>
                                </li>
                                <li style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                                    <span>1M MONITORED</span>
                                    <span className="text-white">$96M</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT: Stacked Revenue Architecture */}
                    <div className="glass-panel border-glow animate-fade-in-up" style={{
                        padding: '3rem', animationDelay: '0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.5), rgba(228,0,40,0.1))'
                    }}>
                        <div className="text-mono text-red" style={{ marginBottom: '2rem', letterSpacing: '0.2em' }}>TOTAL SYSTEM REVENUE</div>
                        <div className="text-huge text-white text-glow" style={{ fontSize: '6rem', lineHeight: 1, marginBottom: '3rem' }}>
                            $126M
                        </div>

                        {/* VISUAL STACK */}
                        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

                            {/* Block 1: Search ($30M) */}
                            <div style={{
                                flex: 1, border: '1px dashed rgba(255,255,255,0.3)', padding: '1rem',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'rgba(255,255,255,0.05)'
                            }}>
                                <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>SEARCH LAYER (10M)</div>
                                <div className="text-mono text-white" style={{ fontSize: '1rem', opacity: 0.8 }}>$30M</div>
                            </div>
                            {/* Visual Bar for Search */}
                            <div style={{ height: '40px', width: '100%', background: 'repeating-linear-gradient(45deg, #333, #333 10px, #444 10px, #444 20px)' }} />


                            {/* Connector */}
                            <div style={{ textAlign: 'center', color: 'var(--color-alert-red)', fontSize: '1.5rem', lineHeight: 0.5 }}>+</div>

                            {/* Block 2: Monitoring ($96M) - DOMINANT */}
                            <div style={{
                                flex: 2, border: '1px solid var(--color-alert-red)', padding: '1.5rem',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                background: 'rgba(228, 0, 40, 0.15)', boxShadow: '0 0 20px rgba(228,0,40,0.1)'
                            }}>
                                <div className="text-mono text-red" style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>MONITORING LAYER (1M)</div>
                                <div className="text-mono text-red" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$96M</div>
                            </div>
                            {/* Visual Bar for Monitoring */}
                            <div className="pulse-active" style={{ height: '100px', width: '100%', background: 'var(--color-alert-red)' }} />

                        </div>

                        <div className="text-mono text-muted" style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
                            COMPOUNDING REVENUE MODEL
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide11_ARR_Leader;
