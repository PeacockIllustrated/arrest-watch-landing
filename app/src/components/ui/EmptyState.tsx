import React from 'react';
import Button from './Button';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    style?: React.CSSProperties;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    description,
    action,
    style,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 24px',
                textAlign: 'center',
                ...style,
            }}
        >
            {icon && (
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        borderRadius: '12px',
                        background: 'var(--bg-elevated)',
                        color: 'var(--text-muted)',
                    }}
                >
                    {icon}
                </div>
            )}
            <h3
                style={{
                    margin: '0 0 8px 0',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                }}
            >
                {title}
            </h3>
            {description && (
                <p
                    style={{
                        margin: '0 0 24px 0',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '360px',
                    }}
                >
                    {description}
                </p>
            )}
            {action && (
                <Button variant="primary" onClick={action.onClick}>
                    {action.label}
                </Button>
            )}
        </div>
    );
};

export default EmptyState;
