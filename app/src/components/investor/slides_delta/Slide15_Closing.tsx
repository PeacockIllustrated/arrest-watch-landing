import React from 'react';
import { Link } from 'react-router-dom';
import RadarNode from '../ui/RadarNode';
import ScanLine from '../ui/ScanLine';
import MarkAsReadButton from '../../deckhub/MarkAsReadButton';

const Slide15_Closing: React.FC = () => {
    return (
        <section className="brand-section" id="slide-15">
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

                        <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
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

                        {/* Navigation Buttons */}
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <Link to="/" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                                Return to Main Site
                            </Link>
                            <MarkAsReadButton deckId="investor-deck" />
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
