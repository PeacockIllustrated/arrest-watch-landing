import React from 'react';

const MarketSection: React.FC = () => {
    return (
        <section className="brand-section" id="market">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">03. Why Now</span>
                        <h2 className="text-large">A Market Inefficiency.</h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            Public arrest data exists, but it is fragmented across thousands of jurisdictions and lacks any real-time aggregation layer. No company in the U.S. aggregates this data continuously at scale—until now.
                        </p>
                    </div>
                    <div className="grid-2" style={{ gap: '1.5rem' }}>
                        <div className="panel" style={{ gridColumn: 'span 2' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>THE TECHNICAL INFLECTION POINT</div>
                            <p className="text-muted">
                                The emergence of reliable web automation, scalable vector search, and mature facial recognition APIs makes this technically and commercially feasible for the first time.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-red" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1000s</div>
                            <div className="text-mono text-muted">FRAGMENTED JURISDICTIONS</div>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>ZERO</div>
                            <div className="text-mono text-muted">EXISTING AGGREGATION LAYERS</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarketSection;
