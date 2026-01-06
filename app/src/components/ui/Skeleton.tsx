import React from 'react';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    borderRadius = '4px',
    style,
}) => {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius,
                ...style,
            }}
        />
    );
};

// Pre-built skeleton patterns
interface SkeletonTextProps {
    lines?: number;
    style?: React.CSSProperties;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({ lines = 3, style }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    height="14px"
                    width={i === lines - 1 ? '70%' : '100%'}
                />
            ))}
        </div>
    );
};

interface SkeletonCardProps {
    style?: React.CSSProperties;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ style }) => {
    return (
        <div
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                padding: '16px',
                ...style,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Skeleton width="40px" height="40px" borderRadius="50%" />
                <div style={{ flex: 1 }}>
                    <Skeleton height="16px" width="50%" style={{ marginBottom: '8px' }} />
                    <Skeleton height="12px" width="30%" />
                </div>
            </div>
            <SkeletonText lines={2} />
        </div>
    );
};

interface SkeletonTableProps {
    rows?: number;
    cols?: number;
    style?: React.CSSProperties;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, cols = 4, style }) => {
    return (
        <div style={{ ...style }}>
            {/* Header */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gap: '16px',
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                }}
            >
                {Array.from({ length: cols }).map((_, i) => (
                    <Skeleton key={i} height="14px" width="80%" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gap: '16px',
                        padding: '16px',
                        borderBottom: '1px solid var(--border-subtle)',
                    }}
                >
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Skeleton key={colIndex} height="14px" width={colIndex === 0 ? '100%' : '60%'} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Skeleton;
