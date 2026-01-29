import React, { useState } from 'react';
import { PageHeader, Card, CardBody } from '../../components/ui';
import {
  StatCard,
  CountyGrid,
  TrendChart,
  SourceStatusTable,
} from '../../components/stats';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useDashboardStats } from '../../hooks/useDashboardStats';

// =============================================================================
// ANALYTICS DASHBOARD - Aggregated statistics and trends
// =============================================================================

const Analytics: React.FC = () => {
  usePageTitle('Analytics');

  const { overview, topCounties, sourceReliability, dailyTrend, loading, refresh, isStale } =
    useDashboardStats();
  const [refreshing, setRefreshing] = useState(false);

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  // Format last updated time
  const lastUpdatedLabel = loading.lastUpdated
    ? `Updated ${loading.lastUpdated.toLocaleTimeString()}`
    : 'Not loaded';

  return (
    <div>
      <PageHeader
        title="Analytics Dashboard"
        description="Aggregated booking statistics, trends, and source health"
      />

      {/* Refresh Control Bar */}
      <Card style={{ marginBottom: '16px' }}>
        <CardBody>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleRefresh}
                disabled={refreshing || loading.isLoading}
                style={{
                  padding: '8px 16px',
                  background: 'var(--accent)',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: refreshing || loading.isLoading ? 'not-allowed' : 'pointer',
                  opacity: refreshing || loading.isLoading ? 0.6 : 1,
                }}
              >
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>

              {/* Status indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: loading.error
                      ? 'var(--danger)'
                      : isStale
                        ? 'var(--warning)'
                        : 'var(--success)',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {loading.error ? 'Error' : isStale ? 'Stale' : 'Live'}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {lastUpdatedLabel}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Error banner */}
      {loading.error && (
        <Card style={{ marginBottom: '16px', borderLeft: '3px solid var(--danger)' }}>
          <CardBody>
            <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>
              Failed to load data: {loading.error}
            </div>
          </CardBody>
        </Card>
      )}

      {/* KPI Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px',
        }}
        className="kpi-grid"
      >
        <StatCard
          label="Records (24h)"
          value={overview?.totalRecords24h ?? '—'}
          variant="accent"
        />
        <StatCard
          label="Records (7d)"
          value={overview?.totalRecords7d ?? '—'}
          subtitle="total bookings"
        />
        <StatCard
          label="Active Counties"
          value={overview?.activeCounties ?? '—'}
          variant="success"
        />
        <StatCard
          label="Error Rate (24h)"
          value={overview?.formattedErrorRate ?? '—'}
          trend={
            overview?.healthStatus === 'healthy'
              ? 'stable'
              : overview?.healthStatus === 'degraded'
                ? 'down'
                : 'down'
          }
          variant={
            overview?.healthStatus === 'healthy'
              ? 'success'
              : overview?.healthStatus === 'degraded'
                ? 'warning'
                : 'danger'
          }
        />
      </div>

      {/* Trend Chart + Source Status Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '24px',
        }}
        className="trend-grid"
      >
        <TrendChart
          data={dailyTrend}
          title="Daily Bookings Trend (30 Days)"
          valueKey="totalBookings"
          height={280}
        />
        <SourceStatusTable
          sources={sourceReliability}
          title="Source Health"
          maxRows={5}
        />
      </div>

      {/* Full-width County Grid */}
      <CountyGrid
        counties={topCounties}
        title="Top Counties by Bookings (7 Days)"
        maxRows={15}
      />

      <style>{`
        @media (max-width: 1200px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .trend-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
