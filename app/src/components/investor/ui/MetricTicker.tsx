import React, { useEffect, useState } from 'react';

interface MetricTickerProps {
    value: string | number;
    label: string;
    subtext?: string;
    trend?: 'up' | 'down' | 'neutral';
}

const MetricTicker: React.FC<MetricTickerProps> = ({ value, label, subtext, trend }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const numericValue = typeof value === 'number' ? value : parseInt(value.toString().replace(/[^0-9]/g, ''));
    const isNumber = !isNaN(numericValue);

    useEffect(() => {
        if (!isNumber) return;

        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out

            setDisplayValue(Math.floor(start + (numericValue - start) * ease));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [numericValue, isNumber]);

    return (
        <div className="metric-ticker" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="text-mono text-muted" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>{label}</span>
            <div className="text-huge text-white" style={{ fontSize: '3rem', lineHeight: '1.1' }}>
                {isNumber ? displayValue.toLocaleString() : value}
                {trend === 'up' && <span style={{ color: 'var(--color-alert-red)', fontSize: '1.5rem', verticalAlign: 'top' }}>↑</span>}
            </div>
            {subtext && <span className="text-mono text-muted" style={{ fontSize: '0.7rem' }}>{subtext}</span>}
        </div>
    );
};

export default MetricTicker;
