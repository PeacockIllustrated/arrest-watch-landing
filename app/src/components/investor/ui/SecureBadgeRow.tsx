import React from 'react';

const BADGES = [
    { label: "SOC2 ALIGNED", color: "#4CAF50" },
    { label: "GDPR READY", color: "#2196F3" },
    { label: "FCRA STANDARDS", color: "#FFC107" },
    { label: "ISO 27001 READY", color: "#9C27B0" }
];

const SecureBadgeRow: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            {BADGES.map((b, i) => (
                <div key={i} className="text-mono" style={{
                    fontSize: '0.6rem',
                    padding: '0.25rem 0.5rem',
                    border: `1px solid ${b.color}`,
                    color: b.color,
                    opacity: 0.8,
                    background: `rgba(0,0,0,0.3)`
                }}>
                    {b.label}
                </div>
            ))}
        </div>
    );
};

export default SecureBadgeRow;
