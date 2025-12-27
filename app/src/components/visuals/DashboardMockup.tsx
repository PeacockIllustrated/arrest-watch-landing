import React, { useEffect, useState, useRef } from 'react';
import '../../styles/DashboardMockup.css';
import USAMapViz, { STATE_PATHS } from './USAMapViz';

interface DashboardMockupProps {
    isScanning: boolean;
}

const MOCK_EVENTS = [
    "ARREST DETECTED - TX - PROCESSED",
    "BOOKING ALERT - FL - PENDING",
    "WARRANT MATCH - NY - CONFIRMED",
    "DATA PACKET - CA - RECEIVED",
    "SIGNAL TRACE - IL - ACTIVE",
    "FACIAL RECOG - NV - MATCH FOUND",
    "LICENSE PLATE - AZ - LOGGED",
    "BOOKING UPDATE - WA - SYNCED"
];

const DashboardMockup: React.FC<DashboardMockupProps> = ({ isScanning }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'feed' | 'coverage'>('feed');
    const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial logs
    useEffect(() => {
        setLogs([
            "SYSTEM INITIALIZED...",
            "CONNECTING TO SECURE RELAY...",
            "ESTABLISHING HANDSHAKE...",
            "READY FOR SCAN."
        ]);
    }, []);

    // Scroll to bottom on log update
    useEffect(() => {
        if (activeTab === 'feed' && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs, activeTab]);

    // Live Feed Simulation
    useEffect(() => {
        if (!isScanning) return;

        const interval = setInterval(() => {
            if (activeTab === 'feed' && Math.random() > 0.3) {
                const randomEvent = MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)];
                const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                const logEntry = `[${timestamp}] ${randomEvent} `;

                setLogs(prev => {
                    const newLogs = [...prev, logEntry];
                    if (newLogs.length > 20) newLogs.shift(); // Keep last 20
                    return newLogs;
                });
            }
        }, 800);

        return () => clearInterval(interval);
    }, [isScanning, activeTab]);

    const filteredStates = STATE_PATHS.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-mockup">
            {/* LEFT SIDEBAR */}
            <div className="dashboard-sidebar">
                {/* TABS HEADER */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--color-grid)' }}>
                    <button
                        onClick={() => setActiveTab('feed')}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: activeTab === 'feed' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                            color: activeTab === 'feed' ? 'var(--color-alert-red)' : '#666',
                            border: 'none',
                            borderBottom: activeTab === 'feed' ? '2px solid var(--color-alert-red)' : 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.05em'
                        }}
                    >
                        LIVE FEED
                    </button>
                    <button
                        onClick={() => setActiveTab('coverage')}
                        style={{
                            flex: 1,
                            padding: '0.8rem',
                            background: activeTab === 'coverage' ? 'rgba(228, 0, 40, 0.1)' : 'transparent',
                            color: activeTab === 'coverage' ? 'var(--color-alert-red)' : '#666',
                            border: 'none',
                            borderBottom: activeTab === 'coverage' ? '2px solid var(--color-alert-red)' : 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            letterSpacing: '0.05em'
                        }}
                    >
                        COVERAGE
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div style={{ flex: 1, overflowY: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>

                    {/* FEED VIEW */}
                    {activeTab === 'feed' && (
                        <>
                            <div style={{
                                padding: '0.5rem 1rem',
                                borderBottom: '1px solid var(--color-grid)',
                                color: 'var(--color-text-muted)',
                                fontSize: '0.7rem',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span>SYSTEM_LOGS</span>
                                <span style={{ color: isScanning ? 'var(--color-alert-red)' : '#666' }}>
                                    {isScanning ? 'LIVE' : 'OFFLINE'}
                                </span>
                            </div>
                            <div ref={scrollRef} style={{
                                flex: 1,
                                padding: '1rem',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                fontSize: '0.7rem',
                                color: '#aaa',
                                scrollbarWidth: 'thin'
                            }}>
                                {logs.map((log, i) => (
                                    <div key={i} style={{
                                        color: log.includes('MATCH') || log.includes('ARREST') ? 'var(--color-alert-red)' : 'inherit',
                                        opacity: 0.8 + (i / logs.length) * 0.2
                                    }}>
                                        {'>'} {log}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* COVERAGE VIEW */}
                    {activeTab === 'coverage' && (
                        <>
                            <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--color-grid)' }}>
                                <input
                                    type="text"
                                    placeholder="SEARCH NETWORK..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: 'none',
                                        padding: '0.5rem',
                                        color: 'var(--color-signal-white)',
                                        fontSize: '0.8rem',
                                        fontFamily: 'monospace',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflowY: 'auto', padding: '0' }}>
                                    {filteredStates.map((state) => (
                                        <div
                                            key={state.id}
                                            onClick={() => setSelectedStateId(state.id === selectedStateId ? null : state.id)}
                                            style={{
                                                padding: '0.6rem 1rem',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                color: selectedStateId === state.id ? 'var(--color-signal-white)' : '#888',
                                                background: selectedStateId === state.id ? 'var(--color-alert-red)' : 'transparent',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                            className="state-item"
                                        >
                                            <span>[{state.id}] {state.name}</span>
                                            <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>
                                                {selectedStateId === state.id ? 'MONITORING' : 'ONLINE'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* BOTTOM STATS */}
                <div style={{
                    padding: '1rem',
                    borderTop: '1px solid var(--color-grid)',
                    fontSize: '0.7rem',
                    color: '#666',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    background: '#0a0a0a'
                }}>
                    <div>LAT: 14ms</div>
                    <div>UP: 99.9%</div>
                    <div>BW: 4.2GB/s</div>
                    <div>ENC: AES-256</div>
                </div>
            </div>

            {/* MAIN AREA - MAP */}
            <div className="dashboard-main">
                <USAMapViz
                    isScanning={isScanning}
                    selectedStateId={selectedStateId}
                    onStateSelect={setSelectedStateId}
                />

                {/* OVERLAY CORNERS for HUD effect */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid var(--color-grid)', borderLeft: '2px solid var(--color-grid)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid var(--color-grid)', borderRight: '2px solid var(--color-grid)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid var(--color-grid)', borderLeft: '2px solid var(--color-grid)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid var(--color-grid)', borderRight: '2px solid var(--color-grid)', pointerEvents: 'none' }}></div>

                {/* RESET ZOOM BUTTON */}
                {selectedStateId && (
                    <button
                        onClick={() => setSelectedStateId(null)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'rgba(0,0,0,0.7)',
                            border: '1px solid var(--color-grid)',
                            color: 'var(--color-signal-white)',
                            padding: '0.5rem 1rem',
                            fontSize: '0.7rem',
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        RESET VIEW
                    </button>
                )}
            </div>

        </div>
    );
};

export default DashboardMockup;
