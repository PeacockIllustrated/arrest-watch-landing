
import React from 'react';

const GuidelinesSection: React.FC = () => {
    return (
        <section className="brand-section" id="guidelines">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span className="label">04. Usage</span>
                        <h2 className="text-large">Directives</h2>
                        <p className="text-muted" style={{ maxWidth: '500px' }}>
                            Strict adherence to these protocols ensures the integrity of the ArrestWatch signal.
                        </p>
                    </div>
                    <a href="#" className="btn magnetic">DOWNLOAD FULL PDF</a>
                </div>

                <div className="directives-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    {/* DO: High Contrast */}
                    <div className="panel directive-card correct">
                        <div className="directive-preview">
                            <div className="example-contrast"></div>
                        </div>
                        <div className="directive-label"><span className="text-red">✓</span> HIGH CONTRAST</div>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Use absolute black (#000) and signal white (#FFF).</p>
                    </div>

                    {/* DON'T: Gradients */}
                    <div className="panel directive-card incorrect">
                        <div className="directive-preview">
                            <div className="example-gradient"></div>
                        </div>
                        <div className="directive-label"><span className="text-muted">✕</span> NO GRADIENTS</div>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Avoid soft transitions. Hard edges only.</p>
                    </div>

                    {/* DO: Monospace */}
                    <div className="panel directive-card correct">
                        <div className="directive-preview">
                            <span className="example-mono text-red">DATA_01</span>
                        </div>
                        <div className="directive-label"><span className="text-red">✓</span> MONOSPACE DATA</div>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Use Roboto Mono for all data points.</p>
                    </div>

                    {/* DON'T: Serif */}
                    <div className="panel directive-card incorrect">
                        <div className="directive-preview">
                            <span className="example-serif text-muted">Elegant</span>
                        </div>
                        <div className="directive-label"><span className="text-muted">✕</span> NO SERIFS</div>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Do not use serif or handwritten fonts.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuidelinesSection;
