import React from 'react';

const Slide03_Product: React.FC = () => {
    return (
        <section className="brand-section" id="slide-03">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">03. Product Overview</span>
                        <h2 className="text-large">Comprehensive <span className="text-red">Platform.</span></h2>
                    </div>
                    <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="panel" style={{ gridColumn: 'span 2' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>SECTION 1: TRANSACTIONAL ARREST SEARCH (VERIFICATION)</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li className="text-mono text-muted">+ Continuously updated arrest data</li>
                                <li className="text-mono text-muted">+ Identity-aware & fuzzy matching (false / incomplete identities)</li>
                                <li className="text-mono text-muted">+ API-first, sub-second response times</li>
                            </ul>
                        </div>
                        <div className="panel" style={{ gridColumn: 'span 2' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '1rem' }}>SECTION 2: LIVE ARREST MONITORING</div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <li className="text-mono text-muted">+ Real-time arrest alerts</li>
                                <li className="text-mono text-muted">+ Nationwide coverage</li>
                                <li className="text-mono text-muted">+ Notifications delivered in minutes</li>
                                <li className="text-mono text-muted">+ Webhooks, dashboards, and audit logs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide03_Product;
