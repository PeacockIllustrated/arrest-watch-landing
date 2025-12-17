import React from 'react';

const Slide05_MarketSize: React.FC = () => {
    return (
        <section className="brand-section" id="slide-05">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">05. Market Size</span>
                        <h2 className="text-large">Defined Opportunity.</h2>
                        <div style={{ marginTop: '2rem' }}>
                            <div className="text-mono text-muted">REALITY-CHECKED</div>
                            <ul className="text-muted" style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '0.5rem' }}>• ~160M workers in the US</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Not all require monitoring</li>
                                <li>• ~30–50M operate in trust-critical roles</li>
                            </ul>
                        </div>
                    </div>
                    <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>ECONOMICS</div>
                        <p className="text-mono text-muted" style={{ marginBottom: '2rem' }}>At $5–$8 per person per month:</p>
                        <h1 className="text-huge text-red" style={{ lineHeight: 1 }}>$2–5B</h1>
                        <div className="text-mono text-white" style={{ marginTop: '1rem' }}>ARR OPPORTUNITY (US-ONLY)</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide05_MarketSize;
