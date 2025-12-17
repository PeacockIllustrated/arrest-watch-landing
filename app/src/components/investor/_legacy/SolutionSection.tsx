import React from 'react';

const SolutionSection: React.FC = () => {
    return (
        <section className="brand-section" id="solution">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">04. What We Have Built</span>
                        <h2 className="text-large">Proven Core Concepts.</h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            The technical foundation is already functional enough to demonstrate to enterprise buyers. We have moved beyond theory to execution.
                        </p>
                    </div>
                    <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>DATA INGESTION</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Working scrapers across multiple jurisdictions. Pipeline for transforming inconsistent HTML into structured records.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>BIOMETRIC MATCHING</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Working integration with AWS Rekognition. Generates embeddings to link arrest records to real workforce identities.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>RISK ENGINE (MVP)</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Scoring model using offense severity, recency, and frequency to classify individuals as High, Severe, or Critical risk.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>LIVE DASHBOARD</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Live MVP with monitored drivers, recent arrests, high-risk alerts, and facial matching demonstrations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
