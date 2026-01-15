import React from 'react';

const RadarBackground: React.FC = () => {
    return (
        <>
            <div style={{
                position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(228, 0, 40, 0.1) 60deg, transparent 60deg)',
                animation: 'radar-spin 4s linear infinite',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>
            <div style={{
                position: 'absolute', width: '800px', height: '800px', borderRadius: '50%',
                border: '1px dashed var(--color-grid)',
                top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>
            <style>{`
                @keyframes radar-spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </>
    );
};

export default RadarBackground;
