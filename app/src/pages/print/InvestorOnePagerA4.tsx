import React, { useEffect } from 'react';
import '../../styles/brand.css';

// Reusing assets if available, otherwise using colored placeholders for now to ensure no broken images
// We'll try to import the assets referenced in the original OnePager if they are needed, 
// but for the "Team" section we might need them.
import founder from '../../assets/founder.png';
import cofounder from '../../assets/co-founder.png';
import mark from '../../assets/mark.png';
import { STATE_PATHS } from '../../components/visuals/USAMapViz';
// import logoMain from '../../assets/logo_main.png'; // Using text for sharper print or SVG if available

const InvestorOnePagerA4: React.FC = () => {

    useEffect(() => {
        // Set page title
        document.title = "ArrestDelta - Investor One-Pager";

        // Ensure body background matches for print bleed simulation on screen
        document.body.style.backgroundColor = '#000000';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="a4-page-container">
            <style>{`
                @media print {
                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #000000 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .a4-page-container {
                        width: 210mm;
                        height: 297mm;
                        transform: none !important;
                        margin: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        overflow: hidden;
                    }
                    /* Hide everything else */
                    #root > *:not(.a4-page-container) {
                        display: none;
                    }
                }

                @media screen {
                    body {
                        background-color: #111;
                        display: flex;
                        justify-content: center;
                        padding: 2rem;
                    }
                    .a4-page-container {
                        /* A4 Dimensions */
                        width: 210mm;
                        height: 297mm;
                        background-color: #000000;
                        box-shadow: 0 0 20px rgba(0,0,0,0.5);
                        /* Scale down for smaller screens */
                        transform-origin: top center;
                    }
                    @media (max-width: 220mm) {
                        .a4-page-container {
                            transform: scale(0.8);
                            margin-bottom: -20%;
                        }
                    }
                    @media (max-width: 600px) {
                        .a4-page-container {
                            transform: scale(0.45);
                            margin-bottom: -50%;
                        }
                    }
                }

                /* Common Styles */
                .a4-page-container {
                    position: relative;
                    color: white;
                    font-family: 'Inter', sans-serif;
                    box-sizing: border-box;
                    padding: 12mm; /* Safe margin */
                    display: grid;
                    grid-template-columns: repeat(12, 1fr);
                    grid-template-rows: auto 1fr auto auto auto;
                    gap: 12px;
                    align-content: start;
                }

                /* Typography */
                h1, h2, h3, h4 {
                    font-family: 'Inter Tight', sans-serif;
                    text-transform: uppercase;
                    margin: 0;
                    letter-spacing: -0.02em;
                }
                h1 { font-size: 24pt; font-weight: 700; color: white; line-height: 1; }
                
                /* Subheaders */
                h2 { 
                    font-size: 8pt; 
                    font-weight: 600; 
                    color: #E40028; 
                    margin-bottom: 6px; 
                    letter-spacing: 0.05em;
                }

                h3 {
                    font-size: 9pt;
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                p, li {
                    font-size: 7.5pt;
                    line-height: 1.35;
                    color: #cccccc;
                    margin: 0;
                }
                
                .text-white { color: white; }
                .text-red { color: #E40028; }
                .text-muted { color: #888; }
                
                /* Utilities */
                .col-span-12 { grid-column: span 12; }
                .col-span-6 { grid-column: span 6; }
                .col-span-4 { grid-column: span 4; }
                .col-span-3 { grid-column: span 3; }
                .col-span-2 { grid-column: span 2; }
                .col-span-8 { grid-column: span 8; }
                
                .glass-panel {
                    background: rgba(26, 26, 26, 0.6);
                    border: 1px solid #333;
                    padding: 10px;
                    border-radius: 2px;
                }
                
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                li {
                    position: relative;
                    padding-left: 10px;
                    margin-bottom: 4px;
                }
                
                li::before {
                    content: '›';
                    position: absolute;
                    left: 0;
                    color: #E40028;
                    font-weight: bold;
                }

                .compact-list li { margin-bottom: 2px; }

                /* Specific Sections */
                .header-section {
                    border-bottom: 1px solid #333;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .main-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .stat-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }

                .team-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 8px;
                }

                .bio-card {
                    display: flex;
                    gap: 8px;
                }
                
                .bio-img {
                    width: 32px;
                    height: 32px;
                    background: #333;
                    border: 1px solid #444;
                    object-fit: cover;
                    filter: grayscale(100%);
                }

                .footer-strip {
                    background: rgba(228, 0, 40, 0.1);
                    border: 1px solid rgba(228, 0, 40, 0.3);
                    padding: 10px 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto; /* Push to bottom if space permits */
                }

            `}</style>

            {/* 1) Top Band: Header & Summary */}
            <div className="col-span-12 header-section">
                <div style={{ flex: 1 }}>
                    <h1 className="text-white">ARREST<span className="text-red">DELTA</span> <span style={{ opacity: 0.5, fontWeight: 300 }}>| INVESTOR ONE-PAGER</span></h1>
                    <p style={{ marginTop: '8px', fontSize: '10pt', color: '#fff', maxWidth: '85%' }}>
                        ArrestDelta is enterprise infrastructure for verified arrest intelligence, replacing false positives and litigation risk with confidence-first decisioning.
                    </p>
                </div>
                {/* Micro Subline / Date / Confidential */}
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '6pt', letterSpacing: '0.1em', color: '#666', textTransform: 'uppercase' }}>Confidential - {new Date().getFullYear()}</div>
                    <div style={{ fontSize: '6pt', letterSpacing: '0.1em', color: '#E40028', textTransform: 'uppercase', marginTop: '2px' }}>Decision-Grade Intelligence</div>
                </div>
            </div>

            {/* 2) Main Content Split */}
            <div className="col-span-12" style={{ display: 'grid', gridTemplateColumns: '58% 40%', gap: '12px', height: 'auto' }}>

                {/* LEFT COLUMN: Problem & Solution */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* PROBLEM */}
                    <div className="glass-panel">
                        <h2>PROBLEM</h2>
                        <ul className="compact-list" style={{ marginBottom: '8px' }}>
                            <li className="text-white">Arrest data is fragmented, jurisdiction-specific, and constantly changing.</li>
                            <li>Enterprises face false positives, broken workflows, and real litigation exposure.</li>
                        </ul>
                        <p className="text-muted" style={{ borderLeft: '2px solid #333', paddingLeft: '8px', marginTop: '8px' }}>
                            Legacy providers optimize for coverage and speed, not correctness. Result: errors propagate downstream becoming expensive, irreversible failures.
                        </p>
                    </div>

                    {/* SOLUTION */}
                    <div className="glass-panel" style={{ flex: 1, borderTop: '2px solid #E40028', display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <h2>SOLUTION</h2>
                            <p style={{ fontSize: '9pt', color: 'white', marginBottom: '8px', fontWeight: 600 }}>
                                State-aware, continuously verified arrest change detection.
                            </p>
                            <ul className="compact-list">
                                <li>We model how each county system actually updates.</li>
                                <li>Resolve identity ambiguity & verify state transitions.</li>
                                <li>Only surface confidence-scored changes capable of safe action.</li>
                            </ul>
                        </div>

                        {/* VISUAL: Verification Pipeline */}
                        <div style={{ flex: 1, minHeight: '60px', margin: '12px 0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                                {/* Node 1 */}
                                <div style={{ textAlign: 'center', zIndex: 2 }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#333', border: '1px solid #555', margin: '0 auto 4px', display: 'grid', placeItems: 'center' }}>
                                        <div style={{ width: '4px', height: '4px', background: '#888', borderRadius: '50%' }}></div>
                                    </div>
                                    <div style={{ fontSize: '5pt', color: '#888', textTransform: 'uppercase' }}>Sources</div>
                                </div>

                                {/* Line 1 */}
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #333, #E40028)', position: 'relative', top: '-8px' }}>
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#000', padding: '0 4px', fontSize: '5pt', color: '#E40028', fontWeight: 700 }}>VERIFY</div>
                                </div>

                                {/* Node 2 */}
                                <div style={{ textAlign: 'center', zIndex: 2 }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(228,0,40,0.1)', border: '1px solid #E40028', margin: '0 auto 4px', display: 'grid', placeItems: 'center', boxShadow: '0 0 10px rgba(228,0,40,0.2)' }}>
                                        <div style={{ width: '16px', height: '16px', background: '#E40028', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                                    </div>
                                    <div style={{ fontSize: '6pt', color: 'white', fontWeight: 700, textTransform: 'uppercase' }}>ArrestDelta</div>
                                </div>

                                {/* Line 2 */}
                                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #E40028, #333)', position: 'relative', top: '-8px' }}></div>

                                {/* Node 3 */}
                                <div style={{ textAlign: 'center', zIndex: 2 }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '2px', background: '#333', border: '1px solid #555', margin: '0 auto 4px', display: 'grid', placeItems: 'center' }}>
                                        <div style={{ width: '12px', height: '2px', background: '#fff' }}></div>
                                        <div style={{ width: '12px', height: '2px', background: '#fff', marginTop: '2px' }}></div>
                                    </div>
                                    <div style={{ fontSize: '5pt', color: '#888', textTransform: 'uppercase' }}>Client</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '2px', marginTop: 'auto' }}>
                            <p className="text-red" style={{ fontWeight: 700, fontSize: '8pt', textTransform: 'uppercase' }}>Not a background check.</p>
                            <p className="text-white" style={{ fontSize: '8pt' }}>It is decision-grade arrest intelligence infrastructure.</p>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Why Now & Who Buys */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* WHY NOW */}
                    <div className="glass-panel">
                        <h2>WHY NOW</h2>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <li>Enterprises making real-time, trust-sensitive decisions at scale.</li>
                            <li>Litigation & regulatory scrutiny on automated decisions is increasing.</li>
                            <li>Existing providers cannot adapt to jurisdictional complexity.</li>
                        </ul>
                        <div style={{ marginTop: '8px', padding: '6px', border: '1px solid #E40028', textAlign: 'center' }}>
                            <p style={{ color: 'white', fontWeight: 600 }}>Accuracy is no longer optional, it is existential.</p>
                        </div>
                    </div>

                    {/* WHO BUYS */}
                    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <h2>WHO BUYS</h2>
                            <ul className="compact-list" style={{ marginBottom: '10px' }}>
                                <li>Gig and logistics platforms</li>
                                <li>Marketplaces</li>
                                <li>Regulated enterprises with operational exposure</li>
                            </ul>
                        </div>

                        {/* VISUAL: US Map */}
                        <div style={{ flex: 1, position: 'relative', minHeight: '80px', margin: '4px 0', opacity: 0.8 }}>
                            <svg viewBox="0 0 1000 589" style={{ width: '100%', height: '100%', maxHeight: '120px' }} preserveAspectRatio="xMidYMid meet">
                                {STATE_PATHS.map((state) => (
                                    <path
                                        key={state.id}
                                        d={state.d}
                                        fill="#1A1A1A"
                                        stroke="#333"
                                        strokeWidth="1"
                                    />
                                ))}
                                {/* Highlight Circles */}
                                <circle cx="913" cy="181" r="10" fill="rgba(228,0,40,0.4)" stroke="#E40028" strokeWidth="2" /> {/* NY */}
                                <circle cx="206" cy="363" r="10" fill="rgba(228,0,40,0.4)" stroke="#E40028" strokeWidth="2" /> {/* CA */}
                                <circle cx="573" cy="536" r="10" fill="rgba(228,0,40,0.4)" stroke="#E40028" strokeWidth="2" /> {/* TX */}
                                <circle cx="854" cy="535" r="10" fill="rgba(228,0,40,0.4)" stroke="#E40028" strokeWidth="2" /> {/* FL */}
                                <circle cx="661" cy="198" r="10" fill="rgba(228,0,40,0.4)" stroke="#E40028" strokeWidth="2" /> {/* IL */}
                            </svg>
                        </div>

                        <div style={{ borderTop: '1px solid #333', paddingTop: '8px', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-muted" style={{ fontSize: '7pt', textTransform: 'uppercase' }}>Geography</span>
                                <span className="text-white" style={{ fontSize: '8pt', fontWeight: 700 }}>US-FIRST <span className="text-muted" style={{ fontWeight: 400 }}>(County-level)</span></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3) Mid Band: Market / Model / Traction */}
            <div className="col-span-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>

                {/* MARKET */}
                <div className="glass-panel">
                    <h2>MARKET</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted" style={{ fontSize: '7pt' }}>TAM</span>
                                <span className="text-white" style={{ fontWeight: 700 }}>Multi-$B</span>
                            </div>
                            <p style={{ fontSize: '6.5pt' }}>Enterprise trust & compliance infra</p>
                        </div>
                        <div style={{ borderTop: '1px solid #333', paddingTop: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted" style={{ fontSize: '7pt' }}>SAM</span>
                                <span className="text-white" style={{ fontWeight: 700 }}>~$175m</span>
                            </div>
                            <p style={{ fontSize: '6.5pt' }}>Initial wedge (platforms w/ direct impact)</p>
                        </div>
                        <div style={{ borderTop: '1px solid #333', paddingTop: '4px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="text-muted" style={{ fontSize: '7pt' }}>SOM</span>
                                <span className="text-white" style={{ fontWeight: 700 }}>~1,500</span>
                            </div>
                            <p style={{ fontSize: '6.5pt' }}>Target buyers over time</p>
                        </div>
                    </div>
                </div>

                {/* BUSINESS MODEL */}
                <div className="glass-panel">
                    <h2>BUSINESS MODEL</h2>
                    <ul className="compact-list" style={{ marginBottom: '8px' }}>
                        <li>Enterprise contracts</li>
                        <li>Pilot -{'>'} production pricing</li>
                        <li>ACV expands w/ coverage & volume</li>
                    </ul>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '7pt', color: '#888' }}>TARGET ACV AT SCALE</div>
                        <div style={{ fontSize: '14pt', fontWeight: 800, color: 'white' }}>~$175k+</div>
                    </div>
                </div>

                {/* TRACTION */}
                <div className="glass-panel" style={{ borderLeft: '2px solid #E40028' }}>
                    <h2>TRACTION</h2>
                    <ul className="compact-list" style={{ marginBottom: '10px' }}>
                        <li className="text-white">Product live</li>
                        <li className="text-white">Active enterprise conversations</li>
                        <li className="text-white">Early pilots / design partners</li>
                        <li className="text-white">Strong inbound (compliance)</li>
                    </ul>
                    <p style={{ fontSize: '6.5pt', fontStyle: 'italic', borderTop: '1px solid #333', paddingTop: '4px' }}>
                        Pre-revenue by design. Round converts pilots to contracts once verification proven.
                    </p>
                </div>
            </div>

            {/* 4) Bottom Band: Why We Win & Team */}
            <div className="col-span-12" style={{ display: 'grid', gridTemplateColumns: '40% 58%', gap: '12px' }}>

                {/* WHY WE WIN */}
                <div className="glass-panel">
                    <h2>WHY WE WIN</h2>
                    <ul className="compact-list" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
                        <li className="text-white">Built for change detection (not static)</li>
                        <li className="text-white">Jurisdiction-aware verification logic</li>
                        <li className="text-white">Identity resolution before alerts</li>
                        <li className="text-white">Compounding accuracy over time</li>
                        <li className="text-white">Litigation-aware by default</li>
                    </ul>
                    <div style={{ marginTop: '8px', padding: '6px', background: 'rgba(228,0,40,0.05)', border: '1px dashed #444' }}>
                        <p style={{ fontSize: '7pt', color: '#ccc', textAlign: 'center' }}>
                            Incumbents cannot retrofit this without breaking their core model.
                        </p>
                    </div>
                </div>

                {/* TEAM */}
                <div className="glass-panel">
                    <h2>TEAM</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {/* Michael */}
                        <div className="bio-card">
                            <img src={founder} alt="MK" className="bio-img" />
                            <div>
                                <div style={{ fontSize: '8pt', fontWeight: 700, color: 'white' }}>Michael King <span className="text-red" style={{ fontWeight: 400, opacity: 0.8 }}>// CEO</span></div>
                                <p style={{ fontSize: '7pt' }}>Enterprise GTM & sales execution. Focus on selling complex, trust-sensitive infra into regulated orgs.</p>
                            </div>
                        </div>
                        {/* Tom */}
                        <div className="bio-card">
                            <img src={cofounder} alt="TP" className="bio-img" />
                            <div>
                                <div style={{ fontSize: '8pt', fontWeight: 700, color: 'white' }}>Tom Peacock <span className="text-red" style={{ fontWeight: 400, opacity: 0.8 }}>// CTO</span></div>
                                <p style={{ fontSize: '7pt' }}>Systems-first engineer building correctness-led data infra for real-world variability.</p>
                            </div>
                        </div>
                        {/* Mark */}
                        <div className="bio-card">
                            <img src={mark} alt="MC" className="bio-img" />
                            <div>
                                <div style={{ fontSize: '8pt', fontWeight: 700, color: 'white' }}>Mark Collins <span className="text-red" style={{ fontWeight: 400, opacity: 0.8 }}>// Law Enforcement</span></div>
                                <p style={{ fontSize: '7pt' }}>Former senior police leader. Direct access to LE leadership & agency data partnerships.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5) Footer: Raise */}
            <div className="col-span-12 footer-strip">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div>
                        <span className="text-red" style={{ fontSize: '9pt', fontWeight: 800, letterSpacing: '0.05em' }}>PRE-SEED RAISE</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '14pt', fontWeight: 700, color: 'white', marginRight: '8px' }}>$1m</span>
                        <span style={{ fontSize: '8pt', color: '#888' }}>at $15m Pre-Money</span>
                    </div>
                </div>
                <div style={{ flex: 1, paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ opacity: 0.9 }}>
                        <span className="text-red" style={{ fontWeight: 700 }}>USE OF FUNDS:</span> Expand coverage, harden verification, support pilots. Intentionally sized to fund correctness without forcing premature commercialisation.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default InvestorOnePagerA4;
