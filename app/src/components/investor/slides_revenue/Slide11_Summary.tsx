import React from 'react';

const Slide11_Summary: React.FC = () => {
    const bullets = [
        'Execution-driven, not speculative',
        'Revenue pacing matches enterprise reality',
        'Pipeline discipline protects outcomes',
        'No reliance on expansion or pricing inflation',
        '$1M+ ARR reachable with 6 customers'
    ];

    return (
        <section className="brand-section" id="revenue-slide-11">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '20%', right: '-10%', width: '60%', height: '60%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.08), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            11. BOARD-LEVEL SUMMARY
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            THE MODEL<br />
                            HOLDS UNDER<br />
                            <span className="text-red">SCRUTINY.</span>
                        </h2>
                    </div>

                    {/* RIGHT: Summary Bullets */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2.5rem' }}>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {bullets.map((item, i) => (
                                    <li key={i} className="text-mono" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', fontSize: '1.05rem' }}>
                                        <span className="text-red" style={{ fontWeight: 700 }}>✓</span>
                                        <span className="text-white">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide11_Summary;
