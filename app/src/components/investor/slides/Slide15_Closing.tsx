import React, { useState } from 'react';
import OnboardingModal from '../_legacy/OnboardingModal';

const Slide15_Closing: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="brand-section" id="slide-15">
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 className="text-huge" style={{ marginBottom: '4rem' }}>
                    We don’t re-check the past. <br />
                    <span className="text-red">We monitor the present.</span>
                </h2>

                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <p className="text-mono text-muted" style={{ marginBottom: '2rem' }}>
                        ArrestWatch is not a background check company.
                    </p>

                    <p className="text-white" style={{ marginBottom: '3rem', fontWeight: '600' }}>
                        We are a real-time arrest intelligence platform that:
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <li className="text-mono text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span className="text-red">+</span> Prevents bad actors at onboarding
                        </li>
                        <li className="text-mono text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span className="text-red">+</span> Protects platforms continuously
                        </li>
                        <li className="text-mono text-muted" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span className="text-red">+</span> Scales to hundreds of millions in ARR
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn pulse-active"
                        style={{ padding: '1rem 3rem', cursor: 'pointer' }}
                    >
                        REQUEST ACCESS
                    </button>
                    <p className="text-muted text-mono" style={{ marginTop: '1.5rem' }}>
                        SECURE YOUR PLATFORM TODAY
                    </p>
                </div>
            </div>
            <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default Slide15_Closing;
