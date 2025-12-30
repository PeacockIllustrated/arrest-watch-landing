import React, { useEffect, useState } from 'react';

const HeatTiles: React.FC = () => {
    const [activeTile, setActiveTile] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTile(Math.floor(Math.random() * 12));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', width: '100%', maxWidth: '300px' }}>
            {[...Array(12)].map((_, i) => (
                <div key={i} style={{
                    aspectRatio: '1',
                    background: i === activeTile ? 'var(--color-alert-red)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'background 0.3s ease',
                    boxShadow: i === activeTile ? '0 0 15px var(--color-alert-red)' : 'none'
                }}></div>
            ))}
        </div>
    );
};

export default HeatTiles;
