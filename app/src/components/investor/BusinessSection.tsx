import React from 'react';

const BusinessSection: React.FC = () => {
    return (
        <section className="brand-section" id="business">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">06. Business Model</span>
                        <h2 className="text-large">Foundation for Scale.</h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            While pricing is not final, the model is clear. Every metric aligns with low churn and high LTV.
                        </p>
                    </div>
                    <div className="grid-2" style={{ gap: '2rem' }}>
                        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '1.2rem' }}>RECURRING SaaS</div>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                <li className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ PER-SEAT PRICING</li>
                                <li className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ ENTERPRISE CONTRACTS</li>
                            </ul>
                        </div>
                        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="text-mono text-white" style={{ fontSize: '1.2rem' }}>USAGE-BASED</div>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                                <li className="text-mono text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>+ BIOMETRIC MATCHING FEES</li>
                                <li className="text-mono text-muted" style={{ fontSize: '0.9rem' }}>+ HIGH-VOLUME API TIERS</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessSection;
