import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    style?: React.CSSProperties;
}

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    default: {
        background: 'var(--bg-elevated)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-default)',
    },
    success: {
        background: 'var(--success-muted)',
        color: 'var(--success)',
        border: '1px solid transparent',
    },
    warning: {
        background: 'var(--warning-muted)',
        color: 'var(--warning)',
        border: '1px solid transparent',
    },
    danger: {
        background: 'var(--danger-muted)',
        color: 'var(--danger)',
        border: '1px solid transparent',
    },
    info: {
        background: 'var(--info-muted)',
        color: 'var(--info)',
        border: '1px solid transparent',
    },
    accent: {
        background: 'var(--accent-muted)',
        color: 'var(--accent)',
        border: '1px solid transparent',
    },
};

const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
    sm: { padding: '2px 6px', fontSize: '0.625rem' },
    md: { padding: '4px 10px', fontSize: '0.75rem' },
};

const dotColors: Record<BadgeVariant, string> = {
    default: 'var(--text-muted)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    info: 'var(--info)',
    accent: 'var(--accent)',
};

export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'md',
    dot = false,
    style,
}) => {
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '9999px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
                ...variantStyles[variant],
                ...sizeStyles[size],
                ...style,
            }}
        >
            {dot && (
                <span
                    style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: dotColors[variant],
                    }}
                />
            )}
            {children}
        </span>
    );
};

export default Badge;
