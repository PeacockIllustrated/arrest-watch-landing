// =============================================================================
// PIPELINE MONITOR HOOK - Real-time pipeline health monitoring
// =============================================================================
// Subscribes to pipeline_runs and error_events for live updates.
// Provides aggregated health metrics and recent error feed.
// =============================================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';
import type {
  PipelineRun,
  MvPipelineHealth,
  RecentError,
} from '../lib/types/supabaseSchema';
import type {
  PipelineHealthModel,
  PipelineRunModel,
  ErrorEventModel,
  LoadingState,
} from '../lib/types/viewModels';
import {
  toPipelineHealthModel,
  toPipelineRunModel,
  toErrorEventModels,
} from '../lib/adapters/statsAdapter';

// =============================================================================
// CONFIGURATION
// =============================================================================

const POLLING_INTERVAL_MS = 30000; // 30 seconds
const FETCH_TIMEOUT_MS = 15000; // 15 seconds
const MAX_ERRORS_DISPLAYED = 50;
const MAX_RUNS_DISPLAYED = 20;

// =============================================================================
// TYPES
// =============================================================================

export interface PipelineMonitorState {
  health: PipelineHealthModel | null;
  recentErrors: ErrorEventModel[];
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'polling';
  loading: LoadingState;
}

export interface UsePipelineMonitorReturn extends PipelineMonitorState {
  start: () => void;
  stop: () => void;
  refresh: () => Promise<void>;
}

// =============================================================================
// DEMO DATA
// =============================================================================

const DEMO_HEALTH: PipelineHealthModel = {
  overallStatus: 'healthy',
  runningCount: 2,
  completedLast24h: 48,
  failedLast24h: 3,
  successRate: 94.1,
  avgDurationSeconds: 45,
  lastCompletedRun: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
  recentRuns: [
    {
      id: 'run-1',
      status: 'running',
      startedAt: new Date(Date.now() - 5 * 60 * 1000),
      finishedAt: null,
      durationMs: null,
      metadata: {},
      statusColor: 'text-blue-500',
      statusIcon: 'loader',
      formattedDuration: 'In progress',
      formattedStartedAt: '5 min ago',
    },
    {
      id: 'run-2',
      status: 'completed',
      startedAt: new Date(Date.now() - 20 * 60 * 1000),
      finishedAt: new Date(Date.now() - 15 * 60 * 1000),
      durationMs: 300000,
      metadata: {},
      statusColor: 'text-green-500',
      statusIcon: 'check-circle',
      formattedDuration: '5m 0s',
      formattedStartedAt: '20 min ago',
    },
  ],
  hourlyStats: [],
};

const DEMO_ERRORS: ErrorEventModel[] = [
  {
    errorId: 'err-1',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    timestampLabel: '10 min ago',
    category: 'network',
    code: 'ETIMEDOUT',
    severity: 'error',
    countyId: 1,
    countyName: 'Miami-Dade',
    sourceId: 1,
    sourceName: 'Arrests.org',
    message: 'Connection timed out after 30000ms',
    handlerName: 'arrestsOrg',
    isRetryable: true,
    retryCount: 2,
    severityColor: 'text-red-500 bg-red-50',
    categoryIcon: 'wifi-off',
    shortMessage: 'Connection timed out after 30000ms',
  },
  {
    errorId: 'err-2',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    timestampLabel: '25 min ago',
    category: 'extraction',
    code: 'SELECTOR_NOT_FOUND',
    severity: 'warning',
    countyId: 5,
    countyName: 'Hillsborough',
    sourceId: 2,
    sourceName: 'SmartCOP',
    message: 'Expected selector .inmate-row not found on page',
    handlerName: 'smartcop',
    isRetryable: false,
    retryCount: 0,
    severityColor: 'text-yellow-500 bg-yellow-50',
    categoryIcon: 'file-x',
    shortMessage: 'Expected selector .inmate-row not found on page',
  },
];

// =============================================================================
// INITIAL STATE
// =============================================================================

const INITIAL_LOADING: LoadingState = {
  isLoading: false,
  isRefreshing: false,
  error: null,
  lastUpdated: null,
};

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

export function usePipelineMonitor(): UsePipelineMonitorReturn {
  // Check if we're in demo mode
  const isDemo = import.meta.env.VITE_PORTAL_MODE === 'demo';

  // State
  const [health, setHealth] = useState<PipelineHealthModel | null>(null);
  const [recentErrors, setRecentErrors] = useState<ErrorEventModel[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<PipelineMonitorState['connectionStatus']>('disconnected');
  const [loading, setLoading] = useState<LoadingState>(INITIAL_LOADING);

  // Refs
  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);
  const pollingRef = useRef<number | null>(null);
  const seenErrorIds = useRef<Set<string>>(new Set());

  // =============================================================================
  // FETCH FUNCTIONS
  // =============================================================================

  /**
   * Fetch pipeline runs
   */
  const fetchPipelineRuns = useCallback(async (): Promise<PipelineRun[]> => {
    try {
      const { data, error } = await supabase
        .from('pipeline_runs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(MAX_RUNS_DISPLAYED);

      if (error) {
        console.error('[usePipelineMonitor] Failed to fetch runs:', error.message);
        return [];
      }

      return (data || []) as PipelineRun[];
    } catch (err) {
      console.error('[usePipelineMonitor] Runs fetch error:', err);
      return [];
    }
  }, []);

  /**
   * Fetch hourly pipeline stats
   */
  const fetchHourlyStats = useCallback(async (): Promise<MvPipelineHealth[]> => {
    try {
      const { data, error } = await supabase
        .from('mv_pipeline_health')
        .select('*')
        .order('hour', { ascending: false })
        .limit(24);

      if (error) {
        console.warn('[usePipelineMonitor] Failed to fetch hourly stats:', error.message);
        return [];
      }

      return (data || []) as MvPipelineHealth[];
    } catch (err) {
      console.warn('[usePipelineMonitor] Hourly stats fetch error:', err);
      return [];
    }
  }, []);

  /**
   * Fetch recent errors via RPC
   */
  const fetchRecentErrors = useCallback(async (): Promise<ErrorEventModel[]> => {
    try {
      const { data, error } = await supabase.rpc('get_recent_errors', {
        p_hours: 24,
        p_limit: MAX_ERRORS_DISPLAYED,
      });

      if (error) {
        console.error('[usePipelineMonitor] Failed to fetch errors:', error.message);
        return [];
      }

      if (data && data.length > 0) {
        const errors = toErrorEventModels(data as RecentError[]);
        // Update seen IDs
        errors.forEach((e) => seenErrorIds.current.add(e.errorId));
        return errors;
      }

      return [];
    } catch (err) {
      console.error('[usePipelineMonitor] Errors fetch error:', err);
      return [];
    }
  }, []);

  /**
   * Refresh all pipeline data
   */
  const refresh = useCallback(async (): Promise<void> => {
    // Demo mode
    if (isDemo) {
      setHealth(DEMO_HEALTH);
      setRecentErrors(DEMO_ERRORS);
      setLoading({
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastUpdated: new Date(),
      });
      return;
    }

    setLoading((prev) => ({
      ...prev,
      isLoading: prev.lastUpdated === null,
      isRefreshing: prev.lastUpdated !== null,
      error: null,
    }));

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Fetch timeout')), FETCH_TIMEOUT_MS);
      });

      // Fetch all data in parallel with timeout
      const [runs, hourlyStats, errors] = await Promise.race([
        Promise.all([fetchPipelineRuns(), fetchHourlyStats(), fetchRecentErrors()]),
        timeoutPromise.then(() => {
          throw new Error('Fetch timeout');
        }),
      ]);

      // Build health model
      const healthModel = toPipelineHealthModel(runs, hourlyStats);
      setHealth(healthModel);
      setRecentErrors(errors);

      setLoading({
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[usePipelineMonitor] Refresh error:', errorMessage);

      // Fallback to demo data on error so the dashboard still shows content
      console.log('[usePipelineMonitor] Falling back to demo data');
      setHealth(DEMO_HEALTH);
      setRecentErrors(DEMO_ERRORS);

      setLoading({
        isLoading: false,
        isRefreshing: false,
        error: `Using demo data (${errorMessage})`,
        lastUpdated: new Date(),
      });
    }
  }, [isDemo, fetchPipelineRuns, fetchHourlyStats, fetchRecentErrors]);

  // =============================================================================
  // REALTIME SUBSCRIPTION
  // =============================================================================

  const startRealtime = useCallback(() => {
    if (realtimeChannelRef.current || isDemo) {
      return;
    }

    console.log('[usePipelineMonitor] Starting Realtime subscription...');
    setConnectionStatus('connecting');

    const channel = supabase
      .channel('pipeline-monitor')
      // Subscribe to pipeline_runs changes
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pipeline_runs',
        },
        (payload) => {
          console.log('[usePipelineMonitor] Pipeline run update:', payload);

          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            const run = payload.new as PipelineRun;
            const runModel = toPipelineRunModel(run);

            setHealth((prev) => {
              if (!prev) return prev;

              // Update recentRuns list
              const updatedRuns = prev.recentRuns.filter((r) => r.id !== run.id);
              updatedRuns.unshift(runModel);

              // Recalculate status
              const runningCount = updatedRuns.filter((r) => r.status === 'running').length;

              return {
                ...prev,
                recentRuns: updatedRuns.slice(0, MAX_RUNS_DISPLAYED),
                runningCount,
              };
            });
          }
        }
      )
      // Subscribe to error_events inserts
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'error_events',
        },
        (payload) => {
          console.log('[usePipelineMonitor] New error event:', payload);

          const newError = payload.new as RecentError;

          // Skip duplicates
          if (seenErrorIds.current.has(newError.error_id)) {
            return;
          }
          seenErrorIds.current.add(newError.error_id);

          const errorModels = toErrorEventModels([newError]);

          setRecentErrors((prev) =>
            [...errorModels, ...prev].slice(0, MAX_ERRORS_DISPLAYED)
          );

          // Update health metrics
          setHealth((prev) => {
            if (!prev) return prev;

            const newFailedCount = prev.failedLast24h + 1;
            const newSuccessRate =
              prev.completedLast24h > 0
                ? (prev.completedLast24h / (prev.completedLast24h + newFailedCount)) * 100
                : 0;

            let overallStatus: 'healthy' | 'degraded' | 'critical' = prev.overallStatus;
            if (newFailedCount > 5 || newSuccessRate < 80) {
              overallStatus = 'critical';
            } else if (newFailedCount > 2 || newSuccessRate < 95) {
              overallStatus = 'degraded';
            }

            return {
              ...prev,
              failedLast24h: newFailedCount,
              successRate: newSuccessRate,
              overallStatus,
            };
          });
        }
      )
      .subscribe((status, err) => {
        console.log('[usePipelineMonitor] Realtime status:', status, err || '');
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setConnectionStatus('polling');
        }
      });

    realtimeChannelRef.current = channel;
  }, [isDemo]);

  const stopRealtime = useCallback(() => {
    if (realtimeChannelRef.current) {
      supabase.removeChannel(realtimeChannelRef.current);
      realtimeChannelRef.current = null;
    }
  }, []);

  // =============================================================================
  // POLLING FALLBACK
  // =============================================================================

  const startPolling = useCallback(() => {
    if (pollingRef.current || isDemo) {
      return;
    }

    console.log('[usePipelineMonitor] Starting polling fallback');

    pollingRef.current = window.setInterval(() => {
      refresh();
    }, POLLING_INTERVAL_MS);
  }, [isDemo, refresh]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // =============================================================================
  // START/STOP
  // =============================================================================

  const start = useCallback(() => {
    console.log('[usePipelineMonitor] Starting monitor');

    // Initial fetch
    refresh();

    // Start realtime
    startRealtime();

    // Start polling as fallback
    startPolling();

    if (isDemo) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('polling');
    }
  }, [refresh, startRealtime, startPolling, isDemo]);

  const stop = useCallback(() => {
    console.log('[usePipelineMonitor] Stopping monitor');
    stopRealtime();
    stopPolling();
    setConnectionStatus('disconnected');
  }, [stopRealtime, stopPolling]);

  // =============================================================================
  // LIFECYCLE
  // =============================================================================

  useEffect(() => {
    // Auto-start on mount
    start();

    // Cleanup on unmount
    return () => {
      stop();
    };
  }, [start, stop]);

  // =============================================================================
  // RETURN
  // =============================================================================

  return {
    health,
    recentErrors,
    connectionStatus,
    loading,
    start,
    stop,
    refresh,
  };
}

export default usePipelineMonitor;
