import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    onClick?: () => void;
}

interface CardHeaderProps {
    children: React.ReactNode;
    actions?: React.ReactNode;
    style?: React.CSSProperties;
}

interface CardBodyProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

interface CardFooterProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

const paddingMap = {
    none: '0',
    sm: '12px',
    md: '16px',
    lg: '24px',
};

export const Card: React.FC<CardProps> = ({
    children,
    className,
    style,
    padding = 'md',
    hover = false,
    onClick,
}) => {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--border-radius, 0px)',
                overflow: 'hidden',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (hover) {
                    e.currentTarget.style.background = 'var(--card-hover)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = 'var(--glow-subtle, 0 0 15px rgba(228, 0, 40, 0.1))';
                }
            }}
            onMouseLeave={(e) => {
                if (hover) {
                    e.currentTarget.style.background = 'var(--card-bg)';
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                    e.currentTarget.style.boxShadow = 'none';
                }
            }}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Pass padding to children that support it
                    return React.cloneElement(child as React.ReactElement<{ cardPadding?: string }>, {
                        cardPadding: paddingMap[padding],
                    });
                }
                return child;
            })}
        </div>
    );
};


export const CardHeader: React.FC<CardHeaderProps & { cardPadding?: string }> = ({
    children,
    actions,
    style,
    cardPadding = '16px',
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: cardPadding,
                borderBottom: '1px solid var(--border-subtle)',
                ...style,
            }}
        >
            <div style={{
                fontFamily: 'var(--font-head, inherit)',
                fontWeight: 'var(--font-weight-bold, 600)' as unknown as number,
                color: 'var(--text-primary)',
                textTransform: 'var(--text-transform-heading, uppercase)' as React.CSSProperties['textTransform'],
                letterSpacing: 'var(--letter-spacing-tight, -0.02em)',
            }}>{children}</div>
            {actions && <div style={{ display: 'flex', gap: '8px' }}>{actions}</div>}
        </div>
    );
};

export const CardBody: React.FC<CardBodyProps & { cardPadding?: string }> = ({
    children,
    style,
    cardPadding = '16px',
}) => {
    return (
        <div
            style={{
                padding: cardPadding,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export const CardFooter: React.FC<CardFooterProps & { cardPadding?: string }> = ({
    children,
    style,
    cardPadding = '16px',
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '8px',
                padding: cardPadding,
                borderTop: '1px solid var(--border-subtle)',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default Card;
