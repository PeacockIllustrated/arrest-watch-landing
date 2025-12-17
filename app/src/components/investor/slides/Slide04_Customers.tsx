import React from 'react';

const Slide04_Customers: React.FC = () => {
    return (
        <section className="brand-section" id="slide-04">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">04. Target Customers</span>
                        <h2 className="text-large">Where Risk is <span className="text-red">Critical.</span></h2>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem' }}>
                            Common thread: organizations where a single incident creates outsized harm.
                        </p>
                    </div>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.25rem' }}>PHASE 1 — HIGH-RISK, HIGH-VOLUME PLATFORMS</div>
                            <p className="text-mono text-muted">Gig economy (Uber, Lyft, DoorDash), Marketplaces & contractor networks</p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.25rem' }}>PHASE 2 — TRUST-CRITICAL ENTERPRISES</div>
                            <p className="text-mono text-muted">Healthcare & care providers, Education & childcare, Hospitality & field services, Financial & regulated industries</p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.25rem' }}>PHASE 3 — INSTITUTIONS & GOVERNMENT</div>
                            <p className="text-mono text-muted">Universities, Municipal agencies, Law enforcement, NGOs & nonprofits</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide04_Customers;
