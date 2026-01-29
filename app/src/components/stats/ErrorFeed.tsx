import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardBody } from '../ui';
import type { ErrorEventModel } from '../../lib/types/viewModels';

// =============================================================================
// ERROR FEED - Real-time error event stream
// =============================================================================

interface ErrorFeedProps {
  errors: ErrorEventModel[];
  title?: string;
  maxItems?: number;
  autoScroll?: boolean;
  onErrorClick?: (error: ErrorEventModel) => void;
}

/**
 * Get border color based on severity
 */
const getSeverityBorderColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'var(--danger)';
    case 'error':
      return 'var(--warning)';
    case 'warning':
      return '#f59e0b'; // amber
    case 'info':
      return 'var(--info, #3b82f6)';
    default:
      return 'var(--text-muted)';
  }
};

/**
 * Get severity badge styles
 */
const getSeverityBadgeStyle = (severity: string): React.CSSProperties => {
  const baseStyle: React.CSSProperties = {
    padding: '2px 6px',
    fontSize: '0.6rem',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '0.05em',
  };

  switch (severity) {
    case 'critical':
      return { ...baseStyle, background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' };
    case 'error':
      return { ...baseStyle, background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' };
    case 'warning':
      return { ...baseStyle, background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
    case 'info':
      return { ...baseStyle, background: 'rgba(59, 130, 246, 0.15)', color: 'var(--info, #3b82f6)' };
    default:
      return { ...baseStyle, background: 'var(--accent-muted)', color: 'var(--text-muted)' };
  }
};

/**
 * Single error item component
 */
interface ErrorItemProps {
  error: ErrorEventModel;
  onClick?: () => void;
}

const ErrorItem: React.FC<ErrorItemProps> = ({ error, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const borderColor = getSeverityBorderColor(error.severity);
  const severityStyle = getSeverityBadgeStyle(error.severity);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
  };

  return (
    <div
      onClick={handleClick}
      style={{
        borderLeft: `3px solid ${borderColor}`,
        padding: '12px 16px',
        background: 'var(--card-bg)',
        cursor: 'pointer',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--card-bg)';
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px',
        }}
      >
        {/* Severity badge */}
        <span style={severityStyle}>{error.severity}</span>

        {/* Category badge */}
        <span
          style={{
            padding: '2px 6px',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: '0.05em',
            background: 'var(--surface)',
            color: 'var(--text-muted)',
          }}
        >
          {error.category}
        </span>

        {/* Timestamp */}
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {error.timestampLabel}
        </span>
      </div>

      {/* Error message */}
      <div
        style={{
          fontSize: '0.8rem',
          color: 'var(--text-primary)',
          lineHeight: 1.4,
          overflow: 'hidden',
          textOverflow: isExpanded ? 'unset' : 'ellipsis',
          whiteSpace: isExpanded ? 'pre-wrap' : 'nowrap',
          wordBreak: isExpanded ? 'break-word' : 'normal',
        }}
      >
        {isExpanded ? error.message : error.shortMessage || error.message}
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div
          style={{
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            fontSize: '0.7rem',
          }}
        >
          {error.code && (
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Code: </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{error.code}</span>
            </div>
          )}
          {error.countyName && (
            <div>
              <span style={{ color: 'var(--text-muted)' }}>County: </span>
              <span>{error.countyName}</span>
            </div>
          )}
          {error.sourceName && (
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Source: </span>
              <span>{error.sourceName}</span>
            </div>
          )}
          {error.handlerName && (
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Handler: </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{error.handlerName}</span>
            </div>
          )}
          {error.retryCount > 0 && (
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Retries: </span>
              <span>{error.retryCount}</span>
              {error.isRetryable && (
                <span style={{ color: 'var(--success)', marginLeft: '4px' }}>
                  (retryable)
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Expand indicator */}
      {!isExpanded && error.message.length > 80 && (
        <div
          style={{
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
            marginTop: '4px',
          }}
        >
          Click to expand
        </div>
      )}
    </div>
  );
};

export const ErrorFeed: React.FC<ErrorFeedProps> = ({
  errors,
  title = 'Recent Errors',
  maxItems = 20,
  autoScroll = true,
  onErrorClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevErrorsLengthRef = useRef(errors.length);

  // Auto-scroll to top when new errors arrive
  useEffect(() => {
    if (autoScroll && errors.length > prevErrorsLengthRef.current && containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    prevErrorsLengthRef.current = errors.length;
  }, [errors.length, autoScroll]);

  const displayedErrors = errors.slice(0, maxItems);

  // Count errors by severity for header summary
  const severityCounts = errors.reduce(
    (acc, err) => {
      acc[err.severity] = (acc[err.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (errors.length === 0) {
    return (
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div
            style={{
              padding: '32px 24px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '8px', opacity: 0.5 }}>✓</div>
            No errors reported
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <span>{title}</span>
          {/* Severity summary badges */}
          <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
            {severityCounts.critical > 0 && (
              <span style={getSeverityBadgeStyle('critical')}>
                {severityCounts.critical} critical
              </span>
            )}
            {severityCounts.error > 0 && (
              <span style={getSeverityBadgeStyle('error')}>
                {severityCounts.error} error
              </span>
            )}
            {severityCounts.warning > 0 && (
              <span style={getSeverityBadgeStyle('warning')}>
                {severityCounts.warning} warning
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardBody cardPadding="0">
        <div
          ref={containerRef}
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {displayedErrors.map((error) => (
            <ErrorItem
              key={error.errorId}
              error={error}
              onClick={() => onErrorClick?.(error)}
            />
          ))}
        </div>

        {/* Show more indicator */}
        {errors.length > maxItems && (
          <div
            style={{
              padding: '12px 16px',
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            Showing {maxItems} of {errors.length} errors
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ErrorFeed;
