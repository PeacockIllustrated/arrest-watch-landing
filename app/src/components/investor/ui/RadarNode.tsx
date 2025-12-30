import React from 'react';

interface RadarNodeProps {
    size?: string;
    type?: 'radar' | 'node';
    delay?: string;
}

const RadarNode: React.FC<RadarNodeProps> = ({ size = '300px', type = 'radar', delay = '0s' }) => {
    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Base Circle */}
            <div style={{
                position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                border: '1px solid var(--color-grid)', opacity: 0.5
            }}></div>

            {/* Inner Circle */}
            <div style={{
                position: 'absolute', width: '60%', height: '60%', borderRadius: '50%',
                border: '1px dashed var(--color-grid)', opacity: 0.3
            }}></div>

            {/* Sweep */}
            {type === 'radar' && (
                <div style={{
                    position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(228, 0, 40, 0.1) 60deg, transparent 60deg)',
                    animation: 'spin 4s linear infinite',
                    animationDelay: delay
                }}></div>
            )}

            {/* Pulsing Core */}
            {type === 'node' && (
                <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--color-alert-red)',
                    animation: 'pulse-node 2s ease-out infinite',
                    animationDelay: delay
                }}></div>
            )}
        </div>
    );
};

export default RadarNode;
