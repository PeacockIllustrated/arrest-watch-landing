import React, { useEffect, useRef, useState } from 'react';

const EffectsSection: React.FC = () => {
    const typeTargetRef = useRef<HTMLSpanElement>(null);
    const typeText = "ANALYZING BIOMETRIC DATA...";
    const typeIndexRef = useRef(0);
    const [decryptText, setDecryptText] = useState("ENCRYPTED_DATA_PACKET_V2");

    useEffect(() => {
        const typeWriter = () => {
            if (typeTargetRef.current && typeIndexRef.current < typeText.length) {
                // Use textContent instead of innerHTML to prevent XSS
                typeTargetRef.current.textContent = (typeTargetRef.current.textContent || '') + typeText.charAt(typeIndexRef.current);
                typeIndexRef.current++;
                setTimeout(typeWriter, 50 + Math.random() * 50);
            } else if (typeTargetRef.current) {
                setTimeout(() => {
                    if (typeTargetRef.current) {
                        typeTargetRef.current.textContent = '';
                        typeIndexRef.current = 0;
                        typeWriter();
                    }
                }, 2000);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (typeIndexRef.current === 0) typeWriter();
                }
            });
        }, { threshold: 0.5 });

        const section = document.getElementById('effects');
        if (section) observer.observe(section);

        // Decrypt Animation
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const target = "ACCESS_GRANTED_LEVEL_5_CLEARANCE";
        let iterations = 0;

        const interval = setInterval(() => {
            setDecryptText(() =>
                target.split("").map((_, index) => {
                    if (index < iterations) {
                        return target[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );

            if (iterations >= target.length) {
                iterations = 0; // Loop it
            } else {
                iterations += 1 / 3;
            }
        }, 30);

        return () => {
            if (section) observer.unobserve(section);
            clearInterval(interval);
        };
    }, []);

    return (
        <section className="brand-section" id="effects" style={{ justifyContent: 'flex-start', paddingTop: '8rem', overflowY: 'auto' }}>
            <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <span className="label">07. Visual FX</span>
                    <h2 className="text-large">Digital Artifacts</h2>
                    <p className="text-muted" style={{ maxWidth: '600px' }}>
                        Functional visual elements designed to represent data capture, analysis, and transmission in a high-security environment.
                    </p>
                </div>

                <div className="bento-grid">
                    {/* 1. Glitch Text (Span 2) */}
                    <div className="panel span-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <span className="text-mono text-muted" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>SIGNAL_LOSS</span>
                        <h3 className="glitch-text text-huge" data-text="SYSTEM FAILURE" style={{ fontSize: '4rem', margin: 0 }}>SYSTEM FAILURE</h3>
                    </div>

                    {/* 2. Targeting HUD (Square) */}
                    <div className="panel artifact-hud">
                        <span className="text-mono text-muted" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>TARGETING</span>
                        <div className="hud-ring outer"></div>
                        <div className="hud-ring inner"></div>
                        <div className="hud-crosshair"></div>
                        <div className="text-mono text-red" style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.7rem' }}>LOCKED</div>
                    </div>

                    {/* 3. Signal Noise (Square) */}
                    <div className="panel artifact-noise">
                        <span className="text-mono text-white" style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>NOISE_PATTERN</span>
                        <div className="noise-overlay"></div>
                        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 2 }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>FREQ: 44.1kHz</div>
                        </div>
                    </div>

                    {/* 4. Scanline Effect (Span 2, Row 2 - Tall & Wide) */}
                    <div className="panel span-2 span-row-2 scan-line-effect" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                        <span className="text-mono text-muted" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>BIOMETRIC_SCAN</span>
                        <div className="spinner" style={{ position: 'absolute', right: '1rem', top: '1rem' }}></div>

                        <img src="/assets/mugshot.jpg" style={{ width: '200px', height: '200px', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)', border: '1px solid var(--color-alert-red)', opacity: 0.5 }} alt="Scan Target" />

                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            <span className="text-mono" id="typewriter" ref={typeTargetRef}></span>
                        </div>

                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1rem' }}>
                            <div className="progress-bar">
                                <div className="progress-fill"></div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Data Stream (Tall) */}
                    <div className="panel span-row-2 artifact-stream">
                        <span className="text-mono text-muted" style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#000', padding: '0.2rem', zIndex: 2 }}>DATA_LOG</span>
                        <div className="stream-content">
                            0F 2A 4C 91 00 FF A2<br />
                            SYSTEM_INIT_SEQ_01<br />
                            CONNECTING...<br />
                            &gt; ACCESS GRANTED<br />
                            &gt; UPLOADING PACKET<br />
                            00 11 00 11 01 01 00<br />
                            ERR_CONNECTION_RESET<br />
                            RETRYING...<br />
                            &gt; BYPASSING FIREWALL<br />
                            &gt; KERNEL PANIC<br />
                            FF FF FF FF 00 00 00<br />
                            0F 2A 4C 91 00 FF A2<br />
                            SYSTEM_INIT_SEQ_01<br />
                            CONNECTING...<br />
                            &gt; ACCESS GRANTED<br />
                            &gt; UPLOADING PACKET<br />
                            00 11 00 11 01 01 00<br />
                            ERR_CONNECTION_RESET<br />
                            RETRYING...<br />
                            &gt; BYPASSING FIREWALL<br />
                            &gt; KERNEL PANIC<br />
                            FF FF FF FF 00 00 00<br />
                            0F 2A 4C 91 00 FF A2<br />
                            SYSTEM_INIT_SEQ_01<br />
                            CONNECTING...<br />
                            &gt; ACCESS GRANTED<br />
                            &gt; UPLOADING PACKET<br />
                            00 11 00 11 01 01 00<br />
                            ERR_CONNECTION_RESET<br />
                            RETRYING...<br />
                            &gt; BYPASSING FIREWALL<br />
                            &gt; KERNEL PANIC<br />
                            FF FF FF FF 00 00 00<br />
                        </div>
                    </div>

                    {/* 6. System Warning (Square) */}
                    <div className="panel artifact-warning">
                        <div className="warning-icon text-red">⚠</div>
                        <div className="text-mono text-red" style={{ fontWeight: 700 }}>BREACH DETECTED</div>
                        <div className="text-mono text-muted" style={{ fontSize: '0.7rem', marginTop: '0.5rem' }}>SECTOR 7G</div>
                    </div>

                    {/* 7. Radar (Square - Fills Row 3 Gap) */}
                    <div className="panel artifact-radar">
                        <span className="text-mono text-muted" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>GEOSPATIAL</span>
                        <div className="radar-sweep"></div>
                        <div className="radar-blip"></div>
                        <div className="text-mono text-red" style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.7rem' }}>TRACKING</div>
                    </div>

                    {/* 8. Redaction (Span 2) */}
                    <div className="panel span-2" style={{ display: 'flex', alignItems: 'center', padding: '3rem' }}>
                        <div>
                            <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>REDACTION_PROTOCOL</span>
                            <p className="text-large" style={{ lineHeight: 1.4, fontSize: '1.5rem' }}>
                                SUBJECT IS <span className="redacted">HIGHLY DANGEROUS</span> AND SHOULD BE APPROACHED WITH <span className="redacted">EXTREME CAUTION</span>.
                            </p>
                        </div>
                    </div>

                    {/* 9. Audio Waveform (Span 2) */}
                    <div className="panel span-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="text-mono text-muted">AUDIO_INTERCEPT</span>
                            <span className="text-mono text-red">REC ●</span>
                        </div>
                        <div className="artifact-waveform">
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="wave-bar" style={{ animationDelay: `${Math.random()}s` }}></div>
                            ))}
                        </div>
                    </div>

                    {/* 10. Decryption Terminal (Span 4) */}
                    <div className="panel span-4 artifact-decrypt">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>SECURE_DECRYPTION_MODULE</span>
                        <div className="decrypt-line">
                            <span className="text-muted">PACKET_ID:</span>
                            <span className="text-white">#9928-AX-22</span>
                            <span className="text-muted" style={{ marginLeft: 'auto' }}>SIZE: 2.4MB</span>
                        </div>
                        <div className="decrypt-line">
                            <span className="text-muted">SOURCE:</span>
                            <span className="text-white">UNKNOWN_PROXY</span>
                        </div>
                        <div className="decrypt-line" style={{ marginTop: '1rem', border: 'none' }}>
                            <span className="text-muted">&gt; DECRYPTING:</span>
                            <span className="text-red" style={{ marginLeft: '1rem' }}>{decryptText}</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EffectsSection;
