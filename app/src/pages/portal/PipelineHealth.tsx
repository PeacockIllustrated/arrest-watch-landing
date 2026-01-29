import React from 'react';
import { PageHeader, Card, CardHeader, CardBody, Badge } from '../../components/ui';
import { StatCard, ErrorFeed } from '../../components/stats';
import { usePageTitle } from '../../hooks/usePageTitle';
import { usePipelineMonitor } from '../../hooks/usePipelineMonitor';
import type { PipelineRunModel } from '../../lib/types/viewModels';

// =============================================================================
// PIPELINE HEALTH PAGE - Real-time pipeline monitoring
// =============================================================================

/**
 * Get status badge variant
 */
const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
  switch (status) {
    case 'running':
      return 'default';
    case 'completed':
      return 'success';
    case 'failed':
      return 'danger';
    case 'cancelled':
      return 'warning';
    default:
      return 'default';
  }
};

/**
 * Get health status color
 */
const getHealthColor = (status: string): string => {
  switch (status) {
    case 'healthy':
      return 'var(--success)';
    case 'degraded':
      return 'var(--warning)';
    case 'critical':
      return 'var(--danger)';
    default:
      return 'var(--text-muted)';
  }
};

/**
 * Format time duration
 */
const formatDuration = (ms: number | null): string => {
  if (ms === null) return '—';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};

/**
 * Format relative time
 */
const formatRelativeTime = (date: Date | null): string => {
  if (!date) return 'Never';
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

/**
 * Run item component
 */
const RunItem: React.FC<{ run: PipelineRunModel }> = ({ run }) => {
  const statusVariant = getStatusVariant(run.status);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Status indicator */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background:
            statusVariant === 'success'
              ? 'var(--success)'
              : statusVariant === 'danger'
                ? 'var(--danger)'
                : statusVariant === 'warning'
                  ? 'var(--warning)'
                  : 'var(--accent)',
          animation: run.status === 'running' ? 'pulse 1.5s infinite' : 'none',
        }}
      />

      {/* Run ID */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '0.8rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {run.id.slice(0, 12)}...
        </div>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Started {formatRelativeTime(run.startedAt)}
        </div>
      </div>

      {/* Status badge */}
      <Badge variant={statusVariant} size="sm">
        {run.status}
      </Badge>

      {/* Duration */}
      <div
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          width: '60px',
          textAlign: 'right',
        }}
      >
        {run.status === 'running' ? 'In progress' : formatDuration(run.durationMs)}
      </div>
    </div>
  );
};

const PipelineHealth: React.FC = () => {
  usePageTitle('Pipeline Health');

  const { health, recentErrors, connectionStatus, loading, start, stop, refresh } =
    usePipelineMonitor();

  // Connection status styles
  const connectionColor =
    connectionStatus === 'connected'
      ? 'var(--success)'
      : connectionStatus === 'connecting' || connectionStatus === 'polling'
        ? 'var(--warning)'
        : 'var(--danger)';

  const connectionLabel =
    connectionStatus === 'connected'
      ? 'Real-time'
      : connectionStatus === 'connecting'
        ? 'Connecting'
        : connectionStatus === 'polling'
          ? 'Polling'
          : 'Disconnected';

  // Last updated label
  const lastUpdatedLabel = loading.lastUpdated
    ? `Updated ${loading.lastUpdated.toLocaleTimeString()}`
    : 'Not loaded';

  return (
    <div>
      <PageHeader
        title="Pipeline Health"
        description="Real-time scraper pipeline monitoring and error tracking"
      />

      {/* Control Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={connectionStatus === 'disconnected' ? start : stop}
                  style={{
                    padding: '8px 16px',
                    background: connectionStatus === 'disconnected' ? 'var(--accent)' : 'var(--danger)',
                    border: 'none',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                  }}
                >
                  {connectionStatus === 'disconnected' ? 'Start' : 'Stop'}
                </button>
                <button
                  onClick={() => refresh()}
                  disabled={loading.isLoading || loading.isRefreshing}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    cursor: loading.isLoading || loading.isRefreshing ? 'not-allowed' : 'pointer',
                    opacity: loading.isLoading || loading.isRefreshing ? 0.6 : 1,
                  }}
                >
                  Refresh
                </button>
              </div>

              {/* Connection indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: connectionColor,
                    animation:
                      connectionStatus === 'connected' || connectionStatus === 'polling'
                        ? 'pulse 1.5s infinite'
                        : 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: connectionColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {connectionLabel}
                </span>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lastUpdatedLabel}</div>
          </div>
        </CardBody>
      </Card>

      {/* Health Status Banner */}
      {health && (
        <Card
          style={{
            marginBottom: '24px',
            borderLeft: `4px solid ${getHealthColor(health.overallStatus)}`,
          }}
        >
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: getHealthColor(health.overallStatus),
                }}
              >
                {health.overallStatus}
              </div>
              <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {health.overallStatus === 'healthy' && 'All systems operating normally'}
                {health.overallStatus === 'degraded' && 'Some errors detected, monitoring closely'}
                {health.overallStatus === 'critical' && 'Multiple failures, immediate attention required'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Last run: {formatRelativeTime(health.lastCompletedRun)}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* KPI Cards */}
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
          label="Running"
          value={health?.runningCount ?? 0}
          variant={health?.runningCount && health.runningCount > 0 ? 'accent' : 'default'}
        />
        <StatCard
          label="Completed (24h)"
          value={health?.completedLast24h ?? 0}
          variant="success"
        />
        <StatCard
          label="Failed (24h)"
          value={health?.failedLast24h ?? 0}
          variant={health?.failedLast24h && health.failedLast24h > 0 ? 'danger' : 'default'}
        />
        <StatCard
          label="Success Rate"
          value={health?.successRate !== undefined ? `${health.successRate.toFixed(1)}%` : '—'}
          variant={
            health?.successRate !== undefined
              ? health.successRate >= 95
                ? 'success'
                : health.successRate >= 80
                  ? 'warning'
                  : 'danger'
              : 'default'
          }
        />
      </div>

      {/* Runs + Errors Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}
        className="main-grid"
      >
        {/* Recent Runs */}
        <Card>
          <CardHeader
            actions={
              health?.runningCount !== undefined && health.runningCount > 0 ? (
                <Badge variant="accent" dot>
                  {health.runningCount} Running
                </Badge>
              ) : undefined
            }
          >
            Recent Runs
          </CardHeader>
          <CardBody cardPadding="0">
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {health?.recentRuns && health.recentRuns.length > 0 ? (
                health.recentRuns.map((run) => <RunItem key={run.id} run={run} />)
              ) : (
                <div
                  style={{
                    padding: '32px 24px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                  }}
                >
                  No recent runs
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Error Feed */}
        <ErrorFeed errors={recentErrors} title="Recent Errors (24h)" maxItems={15} autoScroll />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 1200px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .main-grid {
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

export default PipelineHealth;
