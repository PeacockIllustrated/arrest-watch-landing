import React from 'react';
import { Link } from 'react-router-dom';
import MarkAsReadButton from '../deckhub/MarkAsReadButton';

const UberAsk: React.FC = () => {
    return (
        <section className="brand-section" id="ask">
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
                <span className="label">07. Next Steps</span>
                <h2 className="text-huge" style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.2rem, 8vw, 4rem)', lineHeight: '1.1' }}>Lead the Industry. Again.</h2>
                <p className="text-muted" style={{ fontSize: 'clamp(0.8rem, 4vw, 1.3rem)', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: '1.5' }}>
                    Partner with ArrestDelta to pilot the next generation of trust and safety infrastructure.
                </p>

                <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', gap: '1.5rem' }}>
                    <div className="panel" style={{ padding: '1.5rem' }}>
                        <div className="text-mono text-white" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>PROPOSAL</div>
                        <div className="text-large text-red" style={{ fontSize: 'clamp(1.2rem, 6vw, 2.5rem)', marginBottom: '0.25rem' }}>PILOT</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>CONFIDENTIAL TRIAL</div>
                    </div>
                    <div className="panel" style={{ padding: '1.5rem' }}>
                        <div className="text-mono text-white" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>GOAL</div>
                        <div className="text-large text-white" style={{ fontSize: 'clamp(1.2rem, 6vw, 2.5rem)', marginBottom: '0.25rem' }}>SAFETY</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>PROACTIVE RISK MANAGEMENT</div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        <Link
                            to="/"
                            className="btn btn-secondary"
                            style={{ fontSize: 'clamp(0.8rem, 4vw, 1rem)', padding: '1rem 2rem' }}
                        >
                            Return to Main Site
                        </Link>
                        <MarkAsReadButton deckId="uber-overview" />
                    </div>
                    <p className="text-muted text-mono" style={{ fontSize: '0.7rem' }}>
                        EXCLUSIVE PARTNERSHIP OPPORTUNITY
                    </p>
                </div>
            </div>
        </section>
    );
};

export default UberAsk;
