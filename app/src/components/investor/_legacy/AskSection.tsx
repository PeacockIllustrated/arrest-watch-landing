import React, { useState } from 'react';
import OnboardingModal from './OnboardingModal';

const AskSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="brand-section" id="ask">
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
                <span className="label">07. Next Steps</span>
                <h2 className="text-huge" style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.2rem, 8vw, 4rem)', lineHeight: '1.1' }}>Increase Safety, Limit Liability</h2>
                <p className="text-muted" style={{ fontSize: 'clamp(0.8rem, 4vw, 1.3rem)', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: '1.5' }}>
                    Don't rely on outdated background checks. Integrate ArrestDelta's real-time arrest monitoring directly into your platform to proactively manage risk and ensure the highest safety standards.
                </p>

                <div className="grid-2" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', gap: '1.5rem' }}>
                    <div className="panel" style={{ padding: '1.5rem' }}>
                        <div className="text-mono text-white" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>INTEGRATION</div>
                        <div className="text-large text-red" style={{ fontSize: 'clamp(1.2rem, 6vw, 2.5rem)', marginBottom: '0.25rem' }}>REST API</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>SEAMLESS CONNECTION</div>
                    </div>
                    <div className="panel" style={{ padding: '1.5rem' }}>
                        <div className="text-mono text-white" style={{ marginBottom: '0.25rem', fontSize: '0.7rem' }}>OUTCOME</div>
                        <div className="text-large text-white" style={{ fontSize: 'clamp(1.2rem, 6vw, 2.5rem)', marginBottom: '0.25rem' }}>SAFETY</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>PROACTIVE RISK MANAGEMENT</div>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn pulse-active"
                        style={{ fontSize: 'clamp(0.8rem, 4vw, 1.2rem)', padding: '1rem 2rem', textDecoration: 'none', cursor: 'pointer', maxWidth: '100%', width: '100%' }}
                    >
                        REQUEST ACCESS
                    </button>
                    <p className="text-muted text-mono" style={{ marginTop: '1.5rem', fontSize: '0.7rem' }}>
                        SECURE YOUR PLATFORM TODAY
                    </p>
                </div>
            </div>
            <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default AskSection;
