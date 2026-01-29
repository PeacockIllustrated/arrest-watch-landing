import React from 'react';
import { Card, CardHeader, CardBody } from '../ui';
import type { SourceReliabilityModel } from '../../lib/types/viewModels';

// =============================================================================
// SOURCE STATUS TABLE - Data source reliability monitoring
// =============================================================================

interface SourceStatusTableProps {
  sources: SourceReliabilityModel[];
  title?: string;
  maxRows?: number;
}

/**
 * Get status dot color based on success rate
 */
const getStatusColor = (successRate: number): string => {
  if (successRate >= 95) return 'var(--success)';
  if (successRate >= 80) return 'var(--warning)';
  return 'var(--danger)';
};

/**
 * Get status label based on success rate
 */
const getStatusLabel = (successRate: number): string => {
  if (successRate >= 95) return 'Excellent';
  if (successRate >= 80) return 'Good';
  if (successRate >= 60) return 'Fair';
  return 'Poor';
};

export const SourceStatusTable: React.FC<SourceStatusTableProps> = ({
  sources,
  title = 'Source Health',
  maxRows,
}) => {
  // Sort by success rate ascending (worst first for visibility)
  const sortedSources = [...sources]
    .sort((a, b) => a.successRate - b.successRate);

  const displayedSources = maxRows ? sortedSources.slice(0, maxRows) : sortedSources;

  // Header cell style
  const headerCellStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    fontWeight: 600,
    borderBottom: '1px solid var(--border-subtle)',
  };

  // Data cell style
  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-subtle)',
  };

  if (sources.length === 0) {
    return (
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            No source data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody cardPadding="0">
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '500px',
            }}
          >
            <thead>
              <tr>
                <th style={headerCellStyle}>Source</th>
                <th style={{ ...headerCellStyle, textAlign: 'center' }}>Counties</th>
                <th style={{ ...headerCellStyle, textAlign: 'right' }}>Records (7d)</th>
                <th style={{ ...headerCellStyle, textAlign: 'right' }}>Success Rate</th>
                <th style={{ ...headerCellStyle, width: '120px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayedSources.map((source) => {
                const statusColor = getStatusColor(source.successRate);
                const statusLabel = getStatusLabel(source.successRate);

                return (
                  <tr key={source.sourceId}>
                    {/* Source name */}
                    <td style={cellStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {/* Status dot */}
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: statusColor,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontWeight: 500 }}>{source.displayName}</span>
                      </div>
                      <div
                        style={{
                          fontSize: '0.65rem',
                          color: 'var(--text-muted)',
                          marginTop: '2px',
                          marginLeft: '16px',
                        }}
                      >
                        {source.sourceTypeLabel || source.sourceType}
                      </div>
                    </td>

                    {/* Counties covered */}
                    <td style={{ ...cellStyle, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      {source.countiesCovered}
                    </td>

                    {/* Records count */}
                    <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      {source.totalRecords7d.toLocaleString()}
                    </td>

                    {/* Success rate */}
                    <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: statusColor, fontWeight: 500 }}>
                        {source.formattedSuccessRate || `${source.successRate.toFixed(1)}%`}
                      </span>
                    </td>

                    {/* Progress bar and status label */}
                    <td style={cellStyle}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {/* Progress bar */}
                        <div
                          style={{
                            height: '4px',
                            background: 'var(--accent-muted, rgba(228, 0, 40, 0.1))',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: `${source.successRate}%`,
                              background: statusColor,
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </div>
                        {/* Status label */}
                        <div
                          style={{
                            fontSize: '0.6rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: statusColor,
                          }}
                        >
                          {statusLabel}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Show more indicator */}
        {maxRows && sources.length > maxRows && (
          <div
            style={{
              padding: '12px 16px',
              textAlign: 'center',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            Showing {maxRows} of {sources.length} sources
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default SourceStatusTable;
