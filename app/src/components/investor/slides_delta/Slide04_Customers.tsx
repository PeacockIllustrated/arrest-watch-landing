import React from 'react';
import SecureBadgeRow from '../ui/SecureBadgeRow';
import RadarNode from '../ui/RadarNode';

const Slide04_Customers: React.FC = () => {
    return (
        <section className="brand-section" id="slide-04">
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div className="grid-2" style={{ gap: '4rem', alignItems: 'center' }}>

                    {/* LEFT: Text */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="label text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>04. WHAT WE HAVE BUILT</span>
                        <h2 className="text-huge" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                            PROVEN CORE CONCEPTS.
                        </h2>
                        <p className="text-muted" style={{ marginTop: '2rem', maxWidth: '500px', fontSize: '1.2rem', lineHeight: 1.6 }}>
                            The technical foundation is already functional enough to demonstrate to enterprise buyers. We have moved beyond theory to execution.
                        </p>
                    </div>

                    {/* RIGHT: Grid of 4 Boxes */}
                    <div className="grid-2 mobile-stack" style={{ gap: '1rem', animationDelay: '0.3s' }}>

                        {/* Box 1 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>DATA INGESTION</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Working scrapers across multiple jurisdictions. Pipeline for transforming inconsistent HTML into structured records.
                            </p>
                        </div>

                        {/* Box 2 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>BIOMETRIC MATCHING</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Working integration with AWS Rekognition. Generates embeddings to link arrest records to real workforce identities.
                            </p>
                        </div>

                        {/* Box 3 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                            <div className="text-mono text-white" style={{ marginBottom: '0.5rem' }}>RISK ENGINE (MVP)</div>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Scoring model using offense severity, recency, and frequency to classify individuals as High, Severe, or Critical risk.
                            </p>
                        </div>

                        {/* Box 4 */}
                        <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-color)' }}>
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

export default Slide04_Customers;
