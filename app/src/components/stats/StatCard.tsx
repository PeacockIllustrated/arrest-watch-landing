import React from 'react';
import { Card, CardBody } from '../ui';

// =============================================================================
// STAT CARD - KPI display component matching ArrestDelta brand
// =============================================================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'danger';
  subtitle?: string;
  onClick?: () => void;
}

const variantColors: Record<string, string> = {
  default: 'var(--text-primary)',
  accent: 'var(--accent)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
};

const trendColors: Record<string, string> = {
  up: 'var(--success)',
  down: 'var(--danger)',
  stable: 'var(--text-muted)',
};

const trendArrows: Record<string, string> = {
  up: '▲',
  down: '▼',
  stable: '─',
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  trend = 'stable',
  variant = 'default',
  subtitle,
  onClick,
}) => {
  const valueColor = variantColors[variant];
  const changeColor = trendColors[trend];
  const arrow = trendArrows[trend];

  return (
    <Card
      padding="md"
      hover={!!onClick}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <CardBody>
        {/* Label */}
        <div
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-muted)',
            marginBottom: '8px',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
          }}
        >
          {label}
        </div>

        {/* Value */}
        <div
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: valueColor,
            fontFamily: 'var(--font-head)',
            letterSpacing: 'var(--letter-spacing-tight)',
            lineHeight: 1,
          }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>

        {/* Change indicator or subtitle */}
        {(change !== undefined || subtitle) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px',
              fontSize: '0.65rem',
              color: change !== undefined ? changeColor : 'var(--text-muted)',
            }}
          >
            {change !== undefined && (
              <>
                <span style={{ fontWeight: 600 }}>{arrow}</span>
                <span>{Math.abs(change).toFixed(1)}%</span>
              </>
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default StatCard;
