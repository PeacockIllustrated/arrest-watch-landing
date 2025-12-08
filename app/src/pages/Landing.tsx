import React, { useEffect, useRef } from 'react';
import logoMain from '../assets/logo_main.png';
import iconWhite from '../assets/icon-white.png';
import mugshot from '../assets/mugshot.jpg';
import founder from '../assets/founder.png';
import '../styles/landing.css';

const Landing: React.FC = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Add landing-page class to body for scoped styles
        document.body.classList.add('landing-page');

        // Reveal Text Animation
        const revealElements = document.querySelectorAll('.reveal-text');

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observerRef.current?.observe(el));

        // Metric Counter Animation
        const metrics = [
            { id: 'metric-1', end: 80, suffix: '%' },
            { id: 'metric-2', end: 15, suffix: '' }
        ];

        const animateValue = (id: string, start: number, end: number, duration: number, suffix: string) => {
            const obj = document.getElementById(id);
            if (!obj) return;

            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        };

        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    metrics.forEach(m => animateValue(m.id, 0, m.end, 2000, m.suffix));
                    metricObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const metricSection = document.querySelector('.grid-3');
        if (metricSection) metricObserver.observe(metricSection);

        return () => {
            document.body.classList.remove('landing-page');
            if (observerRef.current) observerRef.current.disconnect();
            metricObserver.disconnect();
        };
    }, []);

    return (
        <div className="landing-container">
            {/* HERO */}
            <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <div className="hero-watermark">
                    <img src={iconWhite} alt="" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className="container">
                    <img src={logoMain} alt="ArrestWatch" className="hero-logo reveal-text" />
                    <span className="text-label reveal-text" style={{ transitionDelay: '0.1s' }}>ArrestWatch Intelligence Layer</span>
                    <h1 className="text-huge reveal-text" style={{ transitionDelay: '0.2s' }}>From arrest<br />to alert...<br /><span className="text-red">Instantly.</span></h1>
                    <p className="reveal-text" style={{ maxWidth: '600px', margin: '2rem auto 0', fontSize: '1.2rem', color: 'var(--color-text-muted)', transitionDelay: '0.3s' }}>
                        ArrestWatch is the only platform connecting nationwide arrest data, facial recognition, and HR systems
                        into one continuous safety layer.
                    </p>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="section" id="problem">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">The Threat</span>
                            <h2 className="text-large">Static background checks no longer protect modern workforces.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}>Real-time risk visibility is now essential.</p>
                        </div>
                        <div className="flex-col">
                            <div className="panel reveal-text">
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>LITIGATION RISK</h3>
                                <p className="text-muted">Companies face multimillion-dollar lawsuits when employees with recent
                                    arrests cause harm while still on the job. (UBER $0.5b)</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.1s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>BRAND REPUTATION</h3>
                                <p className="text-muted">Headlines about employee misconduct spread faster than facts, costing
                                    customer trust and market value.</p>
                            </div>
                            <div className="panel reveal-text" style={{ transitionDelay: '0.2s' }}>
                                <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>BLIND SPOTS</h3>
                                <p className="text-muted">Without Real-Time monitoring, legal & PR teams are reacting too late.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE SOLUTION (SIMULATION) */}
            <section className="section" id="solution">
                <div className="container">
                    <div className="grid-2">
                        <div className="face-container" id="face-demo">
                            <img src={mugshot} className="face-img" alt="Subject" />
                            <div className="face-overlay"></div>
                            <div className="scan-line"></div>
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                                <div id="scan-status">SCANNING...</div>
                                <div id="scan-id" className="text-muted">ID: 884-29-1X</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span className="text-label">The Solution</span>
                            <h2 className="text-large">From arrest to alert... instantly.</h2>
                            <ul style={{ listStyle: 'none', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li className="panel reveal-text">Instant alerts to Executive, HR, Legal, and PR teams.</li>
                                <li className="panel reveal-text">Facial recognition integration to close identity gaps.</li>
                                <li className="panel reveal-text">API-ready → plugs directly into HR/security systems.</li>
                                <li className="panel reveal-text">Manage cases from alert through to resolution.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE VALUE */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Impact Metrics</span>
                    <div className="grid-3" style={{ marginTop: '2rem' }}>
                        <div className="metric-card reveal-text">
                            <span className="metric-value text-red" id="metric-1">0%</span>
                            <span className="text-muted text-mono">LITIGATION EXPOSURE</span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Reduce exposure by up to 80% per incident.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.1s' }}>
                            <span className="metric-value" id="metric-2">0</span>
                            <span className="text-muted text-mono">MINUTES</span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Cut brand response time from days to minutes.</p>
                        </div>
                        <div className="metric-card reveal-text" style={{ transitionDelay: '0.2s' }}>
                            <span className="metric-value">100%</span>
                            <span className="text-muted text-mono">PREVENTION</span>
                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Intervene before harm occurs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARKET */}
            <section className="section">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">Market Opportunity</span>
                            <h2 className="text-large">The Next Evolution.</h2>
                            <p className="text-muted" style={{ marginTop: '1rem' }}>The foundational background check market is ripe for
                                transformation. Real-time monitoring carves out a massive new sub-segment.</p>
                        </div>
                        <div className="flex-col">
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">WORKFORCE</span>
                                <span className="text-mono text-white">160M U.S. WORKERS</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">GIG ECONOMY</span>
                                <span className="text-mono text-white">56M WORKERS</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">SPEND</span>
                                <span className="text-mono text-white">$5B+ ANNUALLY</span>
                            </div>
                            <div className="flex-row" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem' }}>
                                <span className="text-mono">GROWTH</span>
                                <span className="text-mono text-white">$39B BY 2032</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRACTION & BUSINESS */}
            <section className="section">
                <div className="container">
                    <div className="grid-2">
                        <div>
                            <span className="text-label">Early Traction</span>
                            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                                <li className="panel" style={{ marginBottom: '1rem' }}>In pilot-stage discussions with Uber.</li>
                                <li className="panel" style={{ marginBottom: '1rem' }}>Brand identity & product vision established.</li>
                                <li className="panel">Data acquisition underway.</li>
                            </ul>
                        </div>
                        <div>
                            <span className="text-label">Tech Stack</span>
                            <div className="grid-2" style={{ marginTop: '1rem', gap: '1rem' }}>
                                <div className="panel text-mono text-center">APIFY<br /><span className="text-muted" style={{ fontSize: '0.7rem' }}>DATA</span></div>
                                <div className="panel text-mono text-center">SUPABASE<br /><span className="text-muted" style={{ fontSize: '0.7rem' }}>BACKEND</span></div>
                                <div className="panel text-mono text-center">LOVEABLE<br /><span className="text-muted" style={{ fontSize: '0.7rem' }}>FRONTEND</span></div>
                                <div className="panel text-mono text-center">AMAZON<br /><span className="text-muted" style={{ fontSize: '0.7rem' }}>REKOGNITION</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BUSINESS MODEL */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Business Model</span>
                    <div className="grid-3" style={{ marginTop: '2rem' }}>
                        <div className="panel reveal-text">
                            <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>SUBSCRIPTION</h3>
                            <p className="text-muted">SaaS subscription per employee monitored.</p>
                        </div>
                        <div className="panel reveal-text" style={{ transitionDelay: '0.1s' }}>
                            <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>TIERED PRICING</h3>
                            <p className="text-muted">Enterprise, gig platforms, government.</p>
                        </div>
                        <div className="panel reveal-text" style={{ transitionDelay: '0.2s' }}>
                            <h3 className="text-mono" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>TRANSACTIONAL</h3>
                            <p className="text-muted">Model for facial matching (pre-screening).</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FUNDING */}
            <section className="section">
                <div className="container">
                    <span className="text-label">Funding Requirement</span>
                    <h2 className="text-large">Raising $1M Pre-Seed</h2>
                    <p className="text-muted text-mono" style={{ marginBottom: '2rem' }}>TARGETING $12M PRE-MONEY VALUATION</p>
                    <div style={{ height: '20px', width: '100%', background: 'var(--color-grid)', position: 'relative', marginBottom: '1rem' }}>
                        <div style={{ height: '100%', width: '40%', background: 'var(--color-signal-white)', position: 'absolute', left: 0 }}></div>
                        <div style={{ height: '100%', width: '35%', background: 'var(--color-text-muted)', position: 'absolute', left: '40%' }}></div>
                        <div style={{ height: '100%', width: '20%', background: 'var(--color-alert-red)', position: 'absolute', left: '75%' }}></div>
                        <div style={{ height: '100%', width: '5%', background: 'var(--color-gunmetal)', position: 'absolute', left: '95%' }}></div>
                    </div>
                    <div className="grid-2 text-mono" style={{ fontSize: '0.8rem' }}>
                        <div>
                            <div>40% TECH DEV</div>
                            <div className="text-muted">35% SALES & PARTNERSHIPS</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div className="text-red">20% OPS & GROWTH</div>
                            <div className="text-muted">5% LEGAL</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section className="section" id="contact" style={{ borderBottom: 'none' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="text-label">Secure Channel</span>
                    <h2 className="text-large" style={{ marginBottom: '2rem' }}>Build the new standard in workforce safety.</h2>
                    <div className="panel" style={{ display: 'inline-flex', textAlign: 'left', gap: '2rem', alignItems: 'center', maxWidth: '500px' }}>
                        <img src={founder} alt="Michael King" style={{ width: '120px', height: '120px', objectFit: 'cover', border: '1px solid var(--color-grid)', filter: 'grayscale(100%)' }} />
                        <div>
                            <div className="text-mono" style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>MICHAEL KING</div>
                            <div className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>FOUNDER & CEO</div>
                            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-grid)' }}>
                                <div className="text-mono">mking@arrestwatch.io</div>
                                <div className="text-mono">+44 7963 520703</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                        <a href="mailto:mking@arrestwatch.io" className="btn pulse-active" style={{ fontSize: '1.2rem', padding: '1.5rem 4rem', textDecoration: 'none' }}>INITIATE PARTNERSHIP</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
