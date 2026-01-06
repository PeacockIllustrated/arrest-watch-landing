import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RadarNode from '../ui/RadarNode';
import ScanLine from '../ui/ScanLine';
import OnboardingModal from '../_legacy/OnboardingModal';

const Slide15_Closing: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="brand-section" id="slide-15">
            <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="grid-bg-overlay" />
            <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <div style={{ position: 'absolute', opacity: 0.4 }}>
                    <RadarNode size="800px" type="radar" />
                </div>

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '1000px' }}>
                    <div className="animate-fade-in-up">
                        <h2 className="text-huge" style={{ fontSize: '6rem', lineHeight: 1, marginBottom: '4rem' }}>
                            WE DON'T RE-CHECK THE PAST.<br />
                            <span className="text-red text-glow">WE MONITOR THE PRESENT.</span>
                        </h2>

                        <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '5rem' }}>
                            <div className="glass-panel" style={{ padding: '1rem 2rem' }}>
                                <span className="text-mono text-white">REAL-TIME</span>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem' }}>
                                <span className="text-mono text-white">NATIONWIDE</span>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem' }}>
                                <span className="text-mono text-white">SECURE</span>
                            </div>
                        </div>

                        <button
                            className="btn pulse-active"
                            style={{
                                fontSize: '1.5rem',
                                padding: '1.5rem 4rem',
                                background: 'var(--color-alert-red)',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                letterSpacing: '0.1em'
                            }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            REQUEST ACCESS
                        </button>

                        {/* Appendix Links */}
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link
                                to="/investor-delta/why"
                                className="btn btn-secondary"
                                style={{
                                    fontSize: '0.9rem',
                                    padding: '0.75rem 1.5rem'
                                }}
                            >
                                Why ArrestDelta?
                            </Link>
                            <Link
                                to="/investor-delta/appendix/valuation"
                                className="btn btn-secondary"
                                style={{
                                    fontSize: '0.9rem',
                                    padding: '0.75rem 1.5rem'
                                }}
                            >
                                Valuation Rationale
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Scan Line */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                <ScanLine />
            </div>

        </section>
    );
};

export default Slide15_Closing;
