
import React from 'react';

const ComponentsSection: React.FC = () => {
    return (
        <section className="brand-section" id="components" style={{ justifyContent: 'flex-start', paddingTop: '8rem', overflowY: 'auto' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span className="label">05. Components</span>
                        <h2 className="text-large">Interface Elements</h2>
                        <p className="text-muted" style={{ maxWidth: '500px' }}>
                            Modular UI components designed for high-density data display and rapid interaction.
                        </p>
                    </div>
                </div>

                <div className="directives-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {/* Buttons */}
                    <div className="panel">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>BUTTONS</span>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <a href="#" className="btn magnetic">PRIMARY</a>
                            <a href="#" className="btn btn-secondary magnetic">SECONDARY</a>
                            <a href="#" className="btn btn-cta magnetic">ACTION</a>
                        </div>
                    </div>

                    {/* Forms */}
                    <div className="panel">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>FORMS</span>
                        <div className="input-group">
                            <input type="text" className="input-field" placeholder="ENTER SEARCH QUERY..." />
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem' }}>
                            <label className="toggle-switch">
                                <input type="checkbox" className="toggle-input" />
                                <span className="toggle-label"></span>
                                <span className="text-mono text-muted">ACTIVE</span>
                            </label>

                            <label className="checkbox-container">
                                <input type="checkbox" className="checkbox-input" style={{ display: 'none' }} defaultChecked />
                                <span className="checkbox-custom"></span>
                                <span className="text-mono text-muted">VERIFIED</span>
                            </label>
                        </div>
                    </div>

                    {/* Badges & Tags */}
                    <div className="panel">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>BADGES</span>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className="badge primary">NEW</span>
                            <span className="badge outline">ARCHIVED</span>
                            <span className="badge outline" style={{ borderColor: 'var(--color-alert-red)', color: 'var(--color-alert-red)' }}>CRITICAL</span>
                        </div>
                        <div style={{ marginTop: '1.5rem' }}>
                            <div className="pagination">
                                <div className="page-item active">1</div>
                                <div className="page-item">2</div>
                                <div className="page-item">3</div>
                            </div>
                        </div>
                    </div>

                    {/* Alerts */}
                    <div className="panel" style={{ gridColumn: 'span 2' }}>
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>NOTIFICATIONS</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="alert warning">
                                <span style={{ color: '#ffcc00' }}>⚠</span>
                                <span>SYSTEM LATENCY DETECTED IN REGION US-EAST-1</span>
                            </div>
                            <div className="alert error">
                                <span className="text-red">✕</span>
                                <span>CONNECTION LOST. ATTEMPTING RECONNECT...</span>
                            </div>
                        </div>
                    </div>

                    {/* Data Display */}
                    <div className="panel" style={{ gridColumn: 'span 1', gridRow: 'span 2' }}>
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>DATA</span>
                        <div className="tabs">
                            <div className="tab-item active">LIVE</div>
                            <div className="tab-item">ARCHIVE</div>
                            <div className="tab-item">LOGS</div>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>STATUS</th>
                                    <th>LATENCY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#8821</td>
                                    <td className="text-red">ALERT</td>
                                    <td>12ms</td>
                                </tr>
                                <tr>
                                    <td>#9932</td>
                                    <td className="text-muted">IDLE</td>
                                    <td>45ms</td>
                                </tr>
                                <tr>
                                    <td>#1029</td>
                                    <td className="text-muted">IDLE</td>
                                    <td>22ms</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Loaders & Progress */}
                    <div className="panel">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>LOADING STATES</span>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                            <div className="spinner"></div>
                            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                            <span className="text-mono text-muted flicker">PROCESSING...</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '60%' }}></div>
                        </div>
                        <div className="progress-bar" style={{ marginTop: '1rem' }}>
                            <div className="progress-fill" style={{ width: '30%', background: 'var(--color-text-muted)' }}></div>
                        </div>
                    </div>

                    {/* Navigation & Status */}
                    <div className="panel">
                        <span className="text-mono text-muted" style={{ display: 'block', marginBottom: '1rem' }}>NAVIGATION & STATUS</span>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div className="text-mono text-muted" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>BREADCRUMBS</div>
                            <div className="text-mono">
                                <span className="text-muted">SYSTEM</span> <span className="text-red">//</span> <span className="text-white">OVERVIEW</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-alert-red)', borderRadius: '50%', boxShadow: '0 0 5px var(--color-alert-red)' }}></div>
                                <span className="text-mono text-red">LIVE</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <div style={{ width: '8px', height: '8px', background: 'var(--color-text-muted)', borderRadius: '50%' }}></div>
                                <span className="text-mono text-muted">OFFLINE</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--color-grid)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>MK</div>
                            <div className="text-mono" style={{ fontSize: '0.9rem' }}>MICHAEL KING</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComponentsSection;
