import React from 'react';

const TechSection: React.FC = () => {
    return (
        <section className="brand-section" id="tech">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">05. Defensibility</span>
                        <h2 className="text-large">System Architecture.</h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            ArrestWatch’s advantage is not simply scraping—it is the system architecture. Latency is the product. The faster we identify a risk, the more valuable the platform becomes.
                        </p>
                        <ul style={{ listStyle: 'none', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li className="text-mono text-white">1. API-FIRST DESIGN</li>
                            <li className="text-mono text-white">2. PROPRIETARY ETL PIPELINE</li>
                            <li className="text-mono text-white">3. HIGH DATA THROUGHPUT</li>
                        </ul>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-muted)', overflow: 'hidden' }}>
                            <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-white">EVENT</span> /v1/alerts/risk_detected
                            </div>
                            <pre style={{ margin: 0 }}>
                                {`{
  "risk_score": "CRITICAL",
  "latency_ms": 450,
  "match_confidence": 0.99,
  "source": {
    "type": "ARREST_RECORD",
    "jurisdiction": "US_CA_LA",
    "timestamp": "2024-12-06T14:22:01Z"
  }
}`}
                            </pre>
                        </div>
                        <div className="panel">
                            <p className="text-muted">
                                Biometric matching creates defensibility. It eliminates false identities during onboarding and gives enterprises a risk engine they cannot build internally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechSection;
