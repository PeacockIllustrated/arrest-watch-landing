import React, { useEffect, useState, useRef } from 'react';

interface TerminalLog {
    id: string;
    timestamp: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
}

const LOG_TEMPLATES = [
    { msg: "ESTABLISHING SECURE HANDSHAKE...", type: "info" },
    { msg: "IDENTITY_VERIFIED: [REDACTED]", type: "success" },
    { msg: "SCANNING REGISTRIES: 42 NODES", type: "info" },
    { msg: "WARNING: PARTIAL MATCH DETECTED", type: "warning" },
    { msg: "LATENCY OPTIMIZED: 12ms", type: "info" },
    { msg: "ENCRYPTING PAYLOAD...", type: "info" },
    { msg: "CONNECTION ESTABLISHED", type: "success" },
    { msg: "MONITORING ACTIVE", type: "info" },
];

const LiveTerminal: React.FC<{ height?: string }> = ({ height = '200px' }) => {
    const [logs, setLogs] = useState<TerminalLog[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
            const newLog: TerminalLog = {
                id: Math.random().toString(36).substring(7),
                timestamp: new Date().toISOString().split('T')[1].split('.')[0],
                message: template.msg,
                type: template.type as any
            };

            setLogs(prev => {
                const updated = [...prev, newLog];
                if (updated.length > 20) return updated.slice(updated.length - 20);
                return updated;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="glass-panel" style={{ height, padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div className="text-mono text-muted" style={{ fontSize: '0.7rem', borderBottom: '1px solid var(--color-grid)', paddingBottom: '0.5rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>TERMINAL_OUTPUT</span>
                <span className="text-red">LIVE</span>
            </div>
            <div ref={containerRef} style={{ flex: 1, overflowY: 'hidden', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                {logs.map(log => (
                    <div key={log.id} style={{ marginBottom: '0.25rem', opacity: 0.8 }}>
                        <span style={{ color: '#666', marginRight: '0.5rem' }}>[{log.timestamp}]</span>
                        <span style={{
                            color: log.type === 'warning' ? '#E40028' :
                                log.type === 'success' ? '#4CAF50' :
                                    'var(--color-signal-white)'
                        }}>
                            {log.message}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveTerminal;
