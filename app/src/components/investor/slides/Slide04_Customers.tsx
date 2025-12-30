import React from 'react';
import SecureBadgeRow from '../ui/SecureBadgeRow';
import RadarNode from '../ui/RadarNode';

const Slide04_Customers: React.FC = () => {
    return (
        <section className="brand-section" id="slide-04">
            <div className="grid-bg-overlay" />

            {/* Background Node Graph (Abstract) */}
            <div style={{ position: 'absolute', top: '50%', right: '10%', opacity: 0.2, transform: 'translateY(-50%)' }}>
                <RadarNode size="600px" type='node' delay='0s' />
            </div>

            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
                <div className="grid-2 mobile-stack">

                    <div>
                        <span className="label">04. TARGET MARKETS</span>
                        <h2 className="text-huge" style={{ fontSize: '3.5rem' }}>
                            TRUST-CRITICAL <br />
                            INFRASTRUCTURE
                        </h2>
                        <p className="text-mono text-muted" style={{ marginTop: '2rem', maxWidth: '500px' }}>
                            We serve organizations where a single safety incident creates outsized reputational and liability risk.
                        </p>

                        <div style={{ marginTop: '4rem' }}>
                            <SecureBadgeRow />
                        </div>
                    </div>

                    <div className="flex-col" style={{ gap: '2rem', justifyContent: 'center' }}>

                        {/* CARD 1 */}
                        <div className="glass-panel animate-fade-in-up" style={{ padding: '2rem', borderLeft: '4px solid var(--color-signal-white)', animationDelay: '0.1s' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>PHASE 1: GIG & MARKETPLACES</div>
                            <ul className="text-muted" style={{ fontSize: '0.9rem', marginLeft: '1rem' }}>
                                <li>Rideshare (Uber, Lyft)</li>
                                <li>Delivery Networks</li>
                                <li>In-Home Services</li>
                            </ul>
                        </div>

                        {/* CARD 2 */}
                        <div className="glass-panel animate-fade-in-up mobile-reset-transform" style={{ padding: '2rem', borderLeft: '4px solid var(--color-alert-red)', animationDelay: '0.2s', transform: 'translateX(-20px)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>PHASE 2: ENTERPRISE & CARE</div>
                            <ul className="text-muted" style={{ fontSize: '0.9rem', marginLeft: '1rem' }}>
                                <li>Healthcare Systems</li>
                                <li>Education & Childcare</li>
                                <li>Field Services</li>
                            </ul>
                        </div>

                        {/* CARD 3 */}
                        <div className="glass-panel animate-fade-in-up mobile-reset-transform" style={{ padding: '2rem', borderLeft: '4px solid var(--color-grid)', animationDelay: '0.3s' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>PHASE 3: PUBLIC SECTOR</div>
                            <ul className="text-muted" style={{ fontSize: '0.9rem', marginLeft: '1rem' }}>
                                <li>Municipal Agencies</li>
                                <li>Law Enforcement Support</li>
                                <li>Non-Profit Orgs</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide04_Customers;
