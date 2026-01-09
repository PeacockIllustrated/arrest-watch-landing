import React from 'react';

/**
 * VerificationConsoleVisual - Abstract verification panel for THE SOLUTION section
 * Replaces mugshot image with brand-consistent, systems-oriented visual
 */
const VerificationConsoleVisual: React.FC = () => {
    return (
        <div
            className="panel"
            style={{
                background: 'rgba(10, 10, 10, 0.9)',
                border: '1px solid var(--color-grid)',
                padding: '1.5rem',
                height: '100%',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div
                className="text-mono text-muted"
                style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    borderBottom: '1px solid var(--color-grid)',
                    paddingBottom: '0.75rem'
                }}
            >
                VERIFICATION CONSOLE
            </div>

            {/* Module A: Identity Resolution */}
            <div
                style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    flex: 1
                }}
            >
                <div className="text-mono text-white" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    IDENTITY RESOLUTION
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>
                    ambiguity reduced
                </div>
                {/* Node cluster SVG: multiple nodes collapsing to one */}
                <svg
                    width="100%"
                    height="50"
                    viewBox="0 0 200 50"
                    fill="none"
                    aria-label="Identity resolution: multiple ambiguous nodes resolved to single confirmed identity"
                    style={{ opacity: 0.8 }}
                >
                    {/* Left nodes (ambiguous) */}
                    <circle cx="20" cy="15" r="6" stroke="#666" strokeWidth="1" fill="none" />
                    <circle cx="35" cy="30" r="6" stroke="#666" strokeWidth="1" fill="none" />
                    <circle cx="20" cy="40" r="6" stroke="#666" strokeWidth="1" fill="none" />
                    <circle cx="50" cy="20" r="6" stroke="#666" strokeWidth="1" fill="none" />

                    {/* Connection lines converging */}
                    <line x1="26" y1="15" x2="100" y2="25" stroke="#444" strokeWidth="1" />
                    <line x1="41" y1="30" x2="100" y2="25" stroke="#444" strokeWidth="1" />
                    <line x1="26" y1="40" x2="100" y2="25" stroke="#444" strokeWidth="1" />
                    <line x1="56" y1="20" x2="100" y2="25" stroke="#444" strokeWidth="1" />

                    {/* Center merge point */}
                    <circle cx="110" cy="25" r="8" stroke="#e40028" strokeWidth="1.5" fill="rgba(228,0,40,0.1)" />

                    {/* Arrow to resolved node */}
                    <line x1="120" y1="25" x2="160" y2="25" stroke="#e40028" strokeWidth="1" />
                    <polygon points="165,25 158,21 158,29" fill="#e40028" />

                    {/* Resolved node (filled) */}
                    <circle cx="180" cy="25" r="8" fill="#e40028" />
                    <text x="180" y="28" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">1</text>
                </svg>
            </div>

            {/* Module B: State Verification */}
            <div
                style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    flex: 1
                }}
            >
                <div className="text-mono text-white" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    STATE VERIFICATION
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>
                    transitions confirmed
                </div>
                {/* State machine SVG */}
                <svg
                    width="100%"
                    height="40"
                    viewBox="0 0 280 40"
                    fill="none"
                    aria-label="State verification flow: intake to resolve to verify to stable"
                    style={{ opacity: 0.8 }}
                >
                    {/* State boxes */}
                    <rect x="5" y="12" width="50" height="18" rx="2" stroke="#666" strokeWidth="1" fill="none" />
                    <text x="30" y="24" textAnchor="middle" fill="#888" fontSize="7" fontFamily="monospace">INTAKE</text>

                    <line x1="58" y1="21" x2="72" y2="21" stroke="#666" strokeWidth="1" />
                    <polygon points="75,21 70,18 70,24" fill="#666" />

                    <rect x="78" y="12" width="55" height="18" rx="2" stroke="#888" strokeWidth="1" fill="none" />
                    <text x="105" y="24" textAnchor="middle" fill="#aaa" fontSize="7" fontFamily="monospace">RESOLVE</text>

                    <line x1="136" y1="21" x2="150" y2="21" stroke="#888" strokeWidth="1" />
                    <polygon points="153,21 148,18 148,24" fill="#888" />

                    <rect x="156" y="12" width="50" height="18" rx="2" stroke="#e40028" strokeWidth="1" fill="rgba(228,0,40,0.1)" />
                    <text x="181" y="24" textAnchor="middle" fill="#e40028" fontSize="7" fontFamily="monospace">VERIFY</text>

                    <line x1="209" y1="21" x2="223" y2="21" stroke="#e40028" strokeWidth="1" />
                    <polygon points="226,21 221,18 221,24" fill="#e40028" />

                    <rect x="229" y="10" width="50" height="22" rx="2" stroke="#e40028" strokeWidth="1.5" fill="#e40028" />
                    <text x="254" y="25" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" fontWeight="bold">STABLE</text>
                </svg>
            </div>

            {/* Module C: Confidence Gating */}
            <div
                style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.3)',
                    flex: 1
                }}
            >
                <div className="text-mono text-white" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    CONFIDENCE GATING
                </div>
                <div className="text-muted" style={{ fontSize: '0.7rem', marginBottom: '0.75rem' }}>
                    thresholds enforced
                </div>
                {/* Confidence meter SVG */}
                <svg
                    width="100%"
                    height="45"
                    viewBox="0 0 240 45"
                    fill="none"
                    aria-label="Confidence meter showing 80% threshold confirmed"
                    style={{ opacity: 0.9 }}
                >
                    {/* Meter track */}
                    <rect x="10" y="15" width="180" height="8" rx="1" fill="rgba(255,255,255,0.1)" stroke="#333" strokeWidth="1" />

                    {/* Filled portion (80%) */}
                    <rect x="10" y="15" width="144" height="8" rx="1" fill="url(#confidenceGradient)" />

                    {/* Tick marks */}
                    <line x1="55" y1="12" x2="55" y2="26" stroke="#444" strokeWidth="1" />
                    <line x1="100" y1="12" x2="100" y2="26" stroke="#444" strokeWidth="1" />
                    <line x1="145" y1="12" x2="145" y2="26" stroke="#666" strokeWidth="1" />

                    {/* Threshold line */}
                    <line x1="145" y1="8" x2="145" y2="30" stroke="#e40028" strokeWidth="2" />

                    {/* Marker at ~80% with pulse animation */}
                    <circle cx="154" cy="19" r="5" fill="#e40028">
                        <animate
                            attributeName="opacity"
                            values="1;0.6;1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* Labels */}
                    <text x="10" y="38" fill="#666" fontSize="7" fontFamily="monospace">0%</text>
                    <text x="90" y="38" fill="#666" fontSize="7" fontFamily="monospace">50%</text>
                    <text x="142" y="38" fill="#e40028" fontSize="7" fontFamily="monospace">80%</text>

                    {/* Confirmed label */}
                    <text x="200" y="22" fill="#e40028" fontSize="8" fontFamily="monospace" fontWeight="bold">CONFIRMED</text>

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#333" />
                            <stop offset="70%" stopColor="#666" />
                            <stop offset="100%" stopColor="#e40028" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Output line */}
            <div
                className="text-mono"
                style={{
                    fontSize: '0.7rem',
                    color: 'rgba(228, 0, 40, 0.8)',
                    borderTop: '1px solid var(--color-grid)',
                    paddingTop: '0.75rem',
                    textAlign: 'center',
                    letterSpacing: '0.1em'
                }}
            >
                ACTION: ISSUED ONLY WHEN CONFIRMED
            </div>

            {/* Subtle scanline animation */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(228,0,40,0.3), transparent)',
                    animation: 'scanlineMove 3s linear infinite'
                }}
            />
            <style>{`
                @keyframes scanlineMove {
                    0% { top: 0; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .panel [style*="animation"] {
                        animation: none !important;
                    }
                    .panel svg animate {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default VerificationConsoleVisual;
