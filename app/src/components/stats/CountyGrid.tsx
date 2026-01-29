import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../ui';
import type { CountyStatsModel } from '../../lib/types/viewModels';

// =============================================================================
// COUNTY GRID - Sortable county comparison table
// =============================================================================

interface CountyGridProps {
  counties: CountyStatsModel[];
  title?: string;
  maxRows?: number;
  onCountyClick?: (county: CountyStatsModel) => void;
}

type SortField = 'name' | 'totalBookings7d' | 'avgBond' | 'felonyPercent';
type SortOrder = 'asc' | 'desc';

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

export const CountyGrid: React.FC<CountyGridProps> = ({
  counties,
  title = 'County Comparison',
  maxRows,
  onCountyClick,
}) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>('totalBookings7d');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Sort counties
  const sortedCounties = useMemo(() => {
    const sorted = [...counties].sort((a, b) => {
      let aVal: number | string = a[sortField] ?? 0;
      let bVal: number | string = b[sortField] ?? 0;

      if (sortField === 'name') {
        aVal = a.name;
        bVal = b.name;
        return sortOrder === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      }

      return sortOrder === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return maxRows ? sorted.slice(0, maxRows) : sorted;
  }, [counties, sortField, sortOrder, maxRows]);

  // Handle header click for sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Handle row click
  const handleRowClick = (county: CountyStatsModel) => {
    if (onCountyClick) {
      onCountyClick(county);
    } else {
      navigate(`/portal/counties/${county.slug}`);
    }
  };

  // Sort indicator
  const SortIndicator: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) return null;
    return (
      <span style={{ marginLeft: '4px', opacity: 0.7 }}>
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  // Header cell style
  const headerCellStyle: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    fontWeight: 600,
    cursor: 'pointer',
    userSelect: 'none',
    borderBottom: '1px solid var(--border-subtle)',
    transition: 'color 0.15s ease',
  };

  // Data cell style
  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '0.8rem',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-subtle)',
  };

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody cardPadding="0">
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '600px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={headerCellStyle}
                  onClick={() => handleSort('name')}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  County
                  <SortIndicator field="name" />
                </th>
                <th
                  style={{ ...headerCellStyle, textAlign: 'right' }}
                  onClick={() => handleSort('totalBookings7d')}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  7D Bookings
                  <SortIndicator field="totalBookings7d" />
                </th>
                <th
                  style={{ ...headerCellStyle, textAlign: 'right' }}
                  onClick={() => handleSort('avgBond')}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  Avg Bond
                  <SortIndicator field="avgBond" />
                </th>
                <th
                  style={{ ...headerCellStyle, textAlign: 'right' }}
                  onClick={() => handleSort('felonyPercent')}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  Felony %
                  <SortIndicator field="felonyPercent" />
                </th>
                <th style={{ ...headerCellStyle, textAlign: 'right', cursor: 'default' }}>
                  Trend
                </th>
                <th style={{ ...headerCellStyle, width: '40px', cursor: 'default' }} />
              </tr>
            </thead>
            <tbody>
              {sortedCounties.map((county) => (
                <tr
                  key={county.countyId}
                  onClick={() => handleRowClick(county)}
                  style={{
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <td style={cellStyle}>
                    <span style={{ fontWeight: 500 }}>{county.name}</span>
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {county.totalBookings7d.toLocaleString()}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {county.formattedAvgBond}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                    {county.formattedFelonyPercent}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: trendColors[county.trend.direction],
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    >
                      <span>{trendArrows[county.trend.direction]}</span>
                      <span>{county.trend.percentChange.toFixed(1)}%</span>
                    </span>
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'center', color: 'var(--text-muted)' }}>
                    →
                  </td>
                </tr>
              ))}
              {sortedCounties.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      ...cellStyle,
                      textAlign: 'center',
                      color: 'var(--text-muted)',
                      padding: '32px',
                    }}
                  >
                    No county data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default CountyGrid;
