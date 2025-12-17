import React from 'react';

const ProblemSection: React.FC = () => {
    return (
        <section className="brand-section" id="problem">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div className="grid-2">
                    <div>
                        <span className="label">02. The Enterprise Risk</span>
                        <h2 className="text-large">Discovery takes months.<br /><span className="text-red">Liability is instant.</span></h2>
                        <p className="text-muted" style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
                            If a driver or courier commits a violent or sexual offence while active on the platform, discovery can take months. ArrestWatch closes that window to minutes.
                        </p>
                    </div>
                    <div className="flex-col" style={{ gap: '1.5rem' }}>
                        <div className="panel">
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">LITIGATION RISK</span>
                                <span className="text-mono text-red">ESCALATING</span>
                            </div>
                            <p className="text-muted">
                                Companies operating large distributed workforces face massive settlements when safety gaps are exposed.
                            </p>
                        </div>
                        <div className="panel">
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-mono text-white">BRAND REPUTATION</span>
                                <span className="text-mono text-red">CRITICAL</span>
                            </div>
                            <p className="text-muted">
                                Public safety exposure destroys trust. Proactive safety notifications enable immediate suspension and regulatory defensibility.
                            </p>
                        </div>
                        <div className="panel" style={{ background: 'rgba(228, 0, 40, 0.1)', borderColor: 'var(--color-alert-red)' }}>
                            <p className="text-white" style={{ fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center' }}>
                                "For a platform with millions of contractors, one avoided lawsuit more than pays for the product."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
