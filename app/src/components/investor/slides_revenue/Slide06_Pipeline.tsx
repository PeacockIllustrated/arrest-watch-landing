import React from 'react';

const Slide06_Pipeline: React.FC = () => {
    const metrics = [
        { label: 'Qualified opps', value: '18-24' },
        { label: 'Average opp size', value: '~$175k' },
        { label: 'Discovery → Pilot', value: '~40%' },
        { label: 'Pilot → Close', value: '~50%' },
    ];

    const outputMath = [
        '~25 pilots scoped',
        '~18 qualified opps',
        '6 closed deals'
    ];

    return (
        <section className="brand-section" id="revenue-slide-06">
            <div className="grid-bg-overlay" />

            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '10%', left: '-5%', width: '50%', height: '50%',
                background: 'radial-gradient(circle at center, rgba(228, 0, 40, 0.08), transparent 60%)',
                pointerEvents: 'none', zIndex: -1
            }} />

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ alignItems: 'center' }}>

                    {/* LEFT: Hero */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                            06. PIPELINE COVERAGE
                        </span>
                        <h2 className="text-huge" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
                            PIPELINE<br />
                            <span className="text-red">PROTECTS</span><br />
                            OUTCOMES.
                        </h2>

                        {/* Big Pipeline Metric */}
                        <div style={{ marginTop: '2.5rem' }}>
                            <div className="text-mono text-red text-glow" style={{ fontSize: '3rem', fontWeight: 700 }}>
                                ~$3.1M
                            </div>
                            <div className="text-mono text-muted" style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>
                                PIPELINE (3:1 DISCIPLINE)
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Pipeline Details */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="glass-panel border-glow" style={{ padding: '2rem' }}>
                            <div className="text-mono text-red" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                                PIPELINE METRICS
                            </div>

                            {/* Metrics Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                {metrics.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <span className="text-mono text-muted" style={{ fontSize: '0.75rem' }}>{m.label}</span>
                                        <span className="text-mono text-white" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{m.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div style={{ height: '1px', background: 'var(--color-grid)', margin: '1.5rem 0' }} />

                            {/* Output Math */}
                            <div className="text-mono text-muted" style={{ fontSize: '0.75rem', marginBottom: '1rem' }}>
                                OUTPUT MATH
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {outputMath.map((item, i) => (
                                    <div key={i} className="text-mono" style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="text-red">→</span>
                                        <span className={i === outputMath.length - 1 ? 'text-red' : 'text-white'} style={{ fontWeight: i === outputMath.length - 1 ? 700 : 400 }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Slide06_Pipeline;
