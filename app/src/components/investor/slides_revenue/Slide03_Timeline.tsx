import React from 'react';

const Slide03_Timeline: React.FC = () => {
    const quarters = [
        { quarter: 'Q1', months: 'Months 1–3', newCustomers: 1, cumulative: 1 },
        { quarter: 'Q2', months: 'Months 4–6', newCustomers: 2, cumulative: 3 },
        { quarter: 'Q3', months: 'Months 7–8', newCustomers: 2, cumulative: 5 },
        { quarter: 'Q4', months: 'Months 9–12', newCustomers: 1, cumulative: 6 },
    ];

    return (
        <section className="brand-section" id="revenue-slide-03">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.06), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            03. ACQUISITION TIMELINE
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            STAGGERED<br />
                            CLOSES.<br />
                            <span className="text-red">NO HOCKEY STICK.</span>
                        </h2>

                        <div style={{ marginTop: '2rem' }}>
                            <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
                                Matches enterprise cycles. Pilot reality. Reference dependency.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Quarter Table */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                CUSTOMER ACQUISITION BY QUARTER
                            </div>

                            {/* Table Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-grid)' }}>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>QUARTER</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>PERIOD</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'center' }}>NEW</span>
                                <span className="text-mono text-muted" style={{ fontSize: '0.75rem', textAlign: 'center' }}>CUMULATIVE</span>
                            </div>

                            {/* Table Rows */}
                            {quarters.map((q, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1.5fr 1fr 1fr',
                                        gap: '0.5rem',
                                        padding: '0.75rem 0',
                                        borderBottom: i < quarters.length - 1 ? '1px solid rgba(51,51,51,0.5)' : 'none'
                                    }}
                                >
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{q.quarter}</span>
                                    <span className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>{q.months}</span>
                                    <span className="text-mono text-white" style={{ fontSize: '0.95rem', textAlign: 'center' }}>{q.newCustomers}</span>
                                    <span className="text-mono text-red" style={{ fontSize: '0.95rem', textAlign: 'center', fontWeight: 600 }}>{q.cumulative}</span>
                                </div>
                            ))}

                            {/* Total Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr', gap: '0.5rem', paddingTop: '1rem', marginTop: '0.5rem', borderTop: '1px solid var(--color-alert-red)' }}>
                                <span className="text-mono text-red" style={{ fontSize: '0.9rem', fontWeight: 700 }}>TOTAL</span>
                                <span></span>
                                <span className="text-mono text-red" style={{ fontSize: '0.9rem', textAlign: 'center', fontWeight: 700 }}>6</span>
                                <span className="text-mono text-red" style={{ fontSize: '0.9rem', textAlign: 'center', fontWeight: 700 }}>6</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide03_Timeline;
