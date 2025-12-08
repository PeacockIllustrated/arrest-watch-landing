
import React from 'react';

const DashboardSection: React.FC = () => {
    return (
        <section className="brand-section" id="dashboard">
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
                <span className="label">06. Dashboard Foundation</span>
                <h2 className="text-large" style={{ marginBottom: '2rem' }}>Command Interface</h2>

                <div className="dashboard-mockup">
                    {/* Sidebar */}
                    <div className="dash-sidebar">
                        <div className="text-mono text-white" style={{ fontWeight: 700 }}>ARRESTWATCH</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div className="dash-nav-item active">
                                <div className="dash-icon" style={{ background: 'var(--color-alert-red)' }}></div>
                                OVERVIEW
                            </div>
                            <div className="dash-nav-item">
                                <div className="dash-icon" style={{ background: 'var(--color-text-muted)' }}></div>
                                ALERTS
                            </div>
                            <div className="dash-nav-item">
                                <div className="dash-icon" style={{ background: 'var(--color-text-muted)' }}></div>
                                PERSONNEL
                            </div>
                            <div className="dash-nav-item">
                                <div className="dash-icon" style={{ background: 'var(--color-text-muted)' }}></div>
                                SETTINGS
                            </div>
                        </nav>
                        <div style={{ marginTop: 'auto' }}>
                            <div className="dash-nav-item">
                                <div className="dash-icon" style={{ background: 'var(--color-text-muted)' }}></div>
                                LOGOUT
                            </div>
                        </div>
                    </div>

                    {/* Header */}
                    <div className="dash-header">
                        <div className="text-mono text-muted">SYSTEM // OVERVIEW</div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div className="text-mono text-red flicker">LIVE</div>
                            <div style={{ width: '32px', height: '32px', background: 'var(--color-grid)', borderRadius: '50%' }}>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="dash-content">
                        {/* Widget 1: Map (Wide) */}
                        <div className="dash-widget wide">
                            <div className="flex-row" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span className="text-mono text-muted">GEOSPATIAL ACTIVITY</span>
                                <span className="text-mono text-white">US-EAST</span>
                            </div>
                            <div
                                style={{
                                    flexGrow: 1,
                                    background: "url('../../assets/map-placeholder.png')", // Note: This might need adjustment based on asset location
                                    backgroundSize: 'cover',
                                    position: 'relative',
                                    border: '1px solid var(--color-grid)',
                                    opacity: 0.5
                                }}
                            >
                                {/* Simulated Map Points */}
                                <div
                                    style={{
                                        position: 'absolute', top: '30%', left: '40%', width: '8px', height: '8px',
                                        background: 'var(--color-alert-red)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-alert-red)'
                                    }}
                                >
                                </div>
                                <div
                                    style={{
                                        position: 'absolute', top: '60%', left: '70%', width: '8px', height: '8px',
                                        background: 'var(--color-alert-red)', borderRadius: '50%', boxShadow: '0 0 10px var(--color-alert-red)'
                                    }}
                                >
                                </div>
                            </div>
                        </div>

                        {/* Widget 2: Stats */}
                        <div className="dash-widget">
                            <span className="text-mono text-muted">ACTIVE ALERTS</span>
                            <span className="text-huge text-red" style={{ fontSize: '4rem', margin: '1rem 0' }}>12</span>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '80%' }}></div>
                            </div>
                        </div>

                        {/* Widget 3: Feed (Tall) */}
                        <div className="dash-widget tall">
                            <span className="text-mono text-muted" style={{ marginBottom: '1rem' }}>LATEST INTEL</span>
                            <div className="flex-col" style={{ gap: '1rem', overflow: 'hidden' }}>
                                <div className="panel"
                                    style={{ padding: '1rem', borderLeft: '2px solid var(--color-alert-red)' }}>
                                    <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>MATCH CONFIRMED</div>
                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>ID #99281 - 2m ago</div>
                                </div>
                                <div className="panel" style={{ padding: '1rem' }}>
                                    <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>SCAN COMPLETE</div>
                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>ID #99280 - 5m ago</div>
                                </div>
                                <div className="panel" style={{ padding: '1rem' }}>
                                    <div className="text-mono text-white" style={{ fontSize: '0.8rem' }}>SYSTEM CHECK</div>
                                    <div className="text-muted" style={{ fontSize: '0.8rem' }}>ALL SYSTEMS GO</div>
                                </div>
                            </div>
                        </div>

                        {/* Widget 4: System Health */}
                        <div className="dash-widget">
                            <span className="text-mono text-muted">SYSTEM HEALTH</span>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <div className="spinner" style={{ width: '80px', height: '80px', borderWidth: '4px' }}></div>
                            </div>
                            <div className="text-center text-mono text-white" style={{ marginTop: '1rem' }}>99.9% UPTIME</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;
