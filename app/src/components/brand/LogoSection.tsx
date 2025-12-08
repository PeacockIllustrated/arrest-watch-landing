
import React from 'react';
import logoLight from '../../assets/logo-light.png';
import logoDark from '../../assets/logo-dark.png';

const LogoSection: React.FC = () => {
    return (
        <section className="brand-section" id="logos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div>
                    <span className="label">01. Logomark</span>
                    <h2 className="text-large">The Signal</h2>
                    <p className="text-muted" style={{ marginBottom: '2rem' }}>
                        Our primary mark represents the capture and transmission of critical data.
                        It should always be used with sufficient clear space.
                    </p>
                    <a href="#" className="btn magnetic">Download Assets</a>
                </div>
                <div className="logo-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="logo-card" style={{ background: 'transparent', border: '1px solid var(--color-grid)' }}>
                        <img
                            src={logoLight}
                            alt="Primary Logo Light"
                            className="logo-img"
                            style={{ width: '100%', maxWidth: '400px' }}
                        />
                        <span className="text-mono" style={{ color: 'var(--color-signal-white)' }}>PRIMARY LIGHT</span>
                    </div>
                    <div className="logo-card" style={{ background: 'transparent', border: '1px solid var(--color-grid)' }}>
                        <img
                            src={logoDark}
                            alt="Primary Logo Dark"
                            className="logo-img"
                            style={{ width: '100%', maxWidth: '400px' }}
                        />
                        <span className="text-mono text-muted">PRIMARY DARK</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogoSection;
