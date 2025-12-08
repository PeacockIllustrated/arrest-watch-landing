
import React from 'react';

const TypographySection: React.FC = () => {
    return (
        <section className="brand-section" id="typography">
            <div className="grid-2">
                <div>
                    <span className="label">03. Typography</span>
                    <h2 className="text-large">Typeface Hierarchy</h2>
                    <p className="text-muted">
                        We use a combination of Inter Tight for headlines and Roboto Mono for data.
                        This pairing creates a tension between editorial authority and technical precision.
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div>
                        <span className="text-mono text-red" style={{ display: 'block', marginBottom: '0.5rem' }}>HEADLINE // INTER TIGHT</span>
                        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 800, fontSize: '3rem', lineHeight: 1 }}>
                            ABCDEFGHIJK<br />LMNOPQRSTUVWXYZ
                        </div>
                    </div>
                    <div>
                        <span className="text-mono text-red" style={{ display: 'block', marginBottom: '0.5rem' }}>DATA // ROBOTO MONO</span>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: '1.5rem' }}>
                            0123456789<br />
                            {'{ "status": "active" }'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TypographySection;
