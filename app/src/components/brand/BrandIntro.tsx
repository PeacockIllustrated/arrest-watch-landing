
import React from 'react';
import logoMain from '../../assets/logo_main.png';

const BrandIntro: React.FC = () => {
    return (
        <section className="brand-section" id="intro">
            <div className="grid-2">
                <div>
                    <img
                        src={logoMain}
                        alt="ArrestDelta Logo"
                        style={{ maxWidth: '200px', marginBottom: '2rem' }}
                    />
                    <span className="label">Brand Identity</span>
                    <h1 className="text-huge">THE<br />VISUAL<br /><span className="text-red">SYSTEM</span></h1>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p className="text-large text-muted">Precision. Speed. Authority.</p>
                    <p className="text-muted" style={{ marginTop: '2rem', maxWidth: '500px', lineHeight: 1.6 }}>
                        The ArrestDelta brand is built on the principles of immediate clarity and unshakeable
                        reliability.
                        Our visual language reflects the critical nature of our intelligence layer—high contrast,
                        data-driven, and devoid of noise.
                    </p>
                    <div style={{ marginTop: '3rem' }}>
                        <span className="text-mono text-muted">EST. 2025</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandIntro;
