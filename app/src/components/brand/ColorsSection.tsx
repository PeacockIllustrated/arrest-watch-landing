
import React from 'react';

const ColorsSection: React.FC = () => {
    return (
        <section className="brand-section" id="colors">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <span className="label">02. Palette</span>
                <h2 className="text-large" style={{ marginBottom: '3rem' }}>Chromatic Aberration</h2>

                <div className="swatch-grid">
                    <div className="swatch" style={{ background: '#000000' }}>
                        <div className="swatch-info">
                            <div className="text-white">VOID</div>
                            <div className="text-muted">#000000</div>
                        </div>
                    </div>
                    <div className="swatch" style={{ background: '#E40028' }}>
                        <div className="swatch-info">
                            <div className="text-white">ALERT RED</div>
                            <div className="text-muted">#E40028</div>
                        </div>
                    </div>
                    <div className="swatch" style={{ background: '#FFFFFF' }}>
                        <div className="swatch-info">
                            <div style={{ color: '#000' }}>SIGNAL WHITE</div>
                            <div className="text-muted">#FFFFFF</div>
                        </div>
                    </div>
                    <div className="swatch" style={{ background: '#1A1A1A' }}>
                        <div className="swatch-info">
                            <div className="text-white">GUNMETAL</div>
                            <div className="text-muted">#1A1A1A</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ColorsSection;
