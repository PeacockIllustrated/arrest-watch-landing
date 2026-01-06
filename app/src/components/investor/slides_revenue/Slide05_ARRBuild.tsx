import React from 'react';

const Slide05_ARRBuild: React.FC = () => {
    const arrData = [
        { period: 'Months 1–2', addition: '$0', cumulative: '$0' },
        { period: 'Month 3', addition: '+$125k', cumulative: '$125k' },
        { period: 'Month 4', addition: '+$175k', cumulative: '$300k' },
        { period: 'Month 6', addition: '+$175k', cumulative: '$475k' },
        { period: 'Month 7', addition: '+$175k', cumulative: '$650k' },
        { period: 'Month 9', addition: '+$175k', cumulative: '$825k' },
        { period: 'Month 11', addition: '+$200k', cumulative: '$1.025M' },
    ];

    return (
        <section className="brand-section" id="revenue-slide-05">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '15%', right: '-8%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            05. MONTHLY ARR BUILD
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', lineHeight: 1 }}>
                            ANNUAL BILLED<br />
                            UPFRONT.<br />
                            <span className="text-red">CASH-VIEW PACING.</span>
                        </h2>

                        {/* Avoidance bullets */}
                        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="text-red">✗</span> No end-loaded fantasy closes
                            </div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="text-red">✗</span> No unrealistic procurement timelines
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: ARR Table */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                CASH-VIEW ARR BUILD
                            </div>

                            {/* Table Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-grid)' }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>PERIOD</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'right' }}>ADDITION</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'right' }}>CUMULATIVE</span>
                            </div>

                            {/* Table Rows */}
                            {arrData.map((row, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1.5fr 1fr 1fr',
                                        gap: '0.5rem',
                                        padding: '0.65rem 0',
                                        borderBottom: i < arrData.length - 1 ? '1px solid rgba(51,51,51,0.5)' : 'none',
                                        background: i === arrData.length - 1 ? 'rgba(228, 0, 40, 0.05)' : 'transparent'
                                    }}
                                >
                                    <span className="text-mono text-white" style={{ fontSize: '0.9rem' }}>{row.period}</span>
                                    <span className="text-mono" style={{
                                        fontSize: '0.9rem',
                                        textAlign: 'right',
                                        color: row.addition === '$0' ? 'var(--color-text-muted)' : 'var(--color-signal-white)'
                                    }}>{row.addition}</span>
                                    <span className="text-mono" style={{
                                        fontSize: '0.9rem',
                                        textAlign: 'right',
                                        color: i === arrData.length - 1 ? 'var(--color-alert-red)' : 'var(--color-signal-white)',
                                        fontWeight: i === arrData.length - 1 ? 700 : 400
                                    }}>{row.cumulative}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide05_ARRBuild;
