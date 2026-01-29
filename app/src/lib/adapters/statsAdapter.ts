// =============================================================================
// STATS ADAPTER - Transforms materialized views and RPC results to ViewModels
// =============================================================================
// INVARIANT: UI components MUST consume adapter output, never raw DB types.
// =============================================================================

import type {
  DashboardOverview,
  TopCountyResult,
  RecentError,
  MvDailyCountyStats,
  MvDemographics,
  MvPipelineHealth,
  MvErrorSummary,
  MvSourceReliability,
  PipelineRun,
  ErrorEvent,
  CountyTrend,
  County,
  ErrorCategory,
  ErrorSeverityLevel,
  SourceType,
} from '../types/supabaseSchema';

import type {
  DashboardOverviewModel,
  CountyStatsModel,
  TrendDirection,
  DemographicsBreakdown,
  DailyTrendPoint,
  PipelineRunModel,
  PipelineHealthModel,
  HourlyPipelineStat,
  ErrorEventModel,
  ErrorSummaryModel,
  SourceReliabilityModel,
} from '../types/viewModels';

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Format a percentage value
 */
function formatPercent(value: number | null, decimals = 1): string {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a monetary value as USD currency string
 */
function formatCurrency(value: number | null): string {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a date as a readable string
 */
function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Unknown';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
}

/**
 * Format a timestamp for display
 */
function formatTimestamp(dateStr: string | null): string {
  if (!dateStr) return 'Unknown';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return 'Unknown';
  }
}

/**
 * Parse a date string into a Date object
 */
function parseDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

/**
 * Format duration in milliseconds to human-readable string
 */
function formatDuration(ms: number | null): string {
  if (ms === null || ms === undefined) return 'N/A';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

/**
 * Get color for severity level
 */
function getSeverityColor(severity: ErrorSeverityLevel): string {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'error':
      return 'text-red-500 bg-red-50';
    case 'warning':
      return 'text-yellow-500 bg-yellow-50';
    case 'info':
      return 'text-blue-500 bg-blue-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
}

/**
 * Get icon for error category
 */
function getCategoryIcon(category: ErrorCategory): string {
  switch (category) {
    case 'network':
      return 'wifi-off';
    case 'extraction':
      return 'file-x';
    case 'validation':
      return 'alert-circle';
    case 'timeout':
      return 'clock';
    case 'rate_limit':
      return 'zap-off';
    case 'system':
      return 'cpu';
    case 'configuration':
      return 'settings';
    default:
      return 'help-circle';
  }
}

/**
 * Get human-readable label for error category
 */
function getCategoryLabel(category: ErrorCategory): string {
  switch (category) {
    case 'network':
      return 'Network';
    case 'extraction':
      return 'Extraction';
    case 'validation':
      return 'Validation';
    case 'timeout':
      return 'Timeout';
    case 'rate_limit':
      return 'Rate Limit';
    case 'system':
      return 'System';
    case 'configuration':
      return 'Config';
    default:
      return category;
  }
}

/**
 * Get color for pipeline run status
 */
function getStatusColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'text-green-500';
    case 'running':
      return 'text-blue-500';
    case 'failed':
      return 'text-red-500';
    case 'cancelled':
      return 'text-gray-500';
    default:
      return 'text-gray-400';
  }
}

/**
 * Get icon for pipeline run status
 */
function getStatusIcon(status: string): string {
  switch (status) {
    case 'completed':
      return 'check-circle';
    case 'running':
      return 'loader';
    case 'failed':
      return 'x-circle';
    case 'cancelled':
      return 'slash';
    default:
      return 'help-circle';
  }
}

/**
 * Get source type label
 */
function getSourceTypeLabel(sourceType: SourceType): string {
  switch (sourceType) {
    case 'official_sheriff':
      return 'Sheriff';
    case 'official_corrections':
      return 'Corrections';
    case 'vendor_smartcop':
      return 'SmartCOP';
    case 'vendor_jailtracker':
      return 'JailTracker';
    case 'vendor_police2citizen':
      return 'P2C';
    case 'vendor_newworld':
      return 'NewWorld';
    case 'aggregator':
      return 'Aggregator';
    case 'none':
      return 'None';
    default:
      return sourceType;
  }
}

/**
 * Get reliability status based on success rate
 */
function getReliabilityStatus(
  successRate: number
): 'excellent' | 'good' | 'fair' | 'poor' {
  if (successRate >= 98) return 'excellent';
  if (successRate >= 90) return 'good';
  if (successRate >= 75) return 'fair';
  return 'poor';
}

/**
 * Get color for reliability status
 */
function getReliabilityColor(status: 'excellent' | 'good' | 'fair' | 'poor'): string {
  switch (status) {
    case 'excellent':
      return 'text-green-500';
    case 'good':
      return 'text-blue-500';
    case 'fair':
      return 'text-yellow-500';
    case 'poor':
      return 'text-red-500';
  }
}

// =============================================================================
// DASHBOARD OVERVIEW ADAPTER
// =============================================================================

/**
 * Transform RPC result to DashboardOverviewModel
 */
export function toDashboardOverviewModel(
  data: DashboardOverview
): DashboardOverviewModel {
  const errorRate = data.error_rate_24h ?? 0;

  let healthStatus: 'healthy' | 'degraded' | 'critical' = 'healthy';
  if (errorRate > 10) healthStatus = 'critical';
  else if (errorRate > 5) healthStatus = 'degraded';

  return {
    totalRecords24h: Number(data.total_records_24h) || 0,
    totalRecords7d: Number(data.total_records_7d) || 0,
    activeCounties: Number(data.active_counties) || 0,
    activeSources: Number(data.active_sources) || 0,
    errorRate24h: errorRate,
    avgDailyRecords: Number(data.avg_daily_records) || 0,
    formattedErrorRate: formatPercent(errorRate),
    healthStatus,
  };
}

// =============================================================================
// COUNTY STATS ADAPTER
// =============================================================================

/**
 * Calculate trend direction from historical data
 */
function calculateTrend(
  current: number,
  previous: number | null
): TrendDirection {
  if (previous === null || previous === 0) {
    return { direction: 'stable', percentChange: 0, isPositive: true };
  }

  const change = ((current - previous) / previous) * 100;
  const direction: 'up' | 'down' | 'stable' =
    change > 2 ? 'up' : change < -2 ? 'down' : 'stable';

  // For booking counts, "up" is neutral (more activity), not necessarily good
  return {
    direction,
    percentChange: Math.abs(change),
    isPositive: direction === 'stable',
  };
}

/**
 * Transform TopCountyResult to CountyStatsModel
 */
export function toCountyStatsModel(
  result: TopCountyResult,
  previousWeekBookings?: number | null
): CountyStatsModel {
  const trend = calculateTrend(
    Number(result.total_bookings),
    previousWeekBookings ?? null
  );

  return {
    countyId: result.county_id,
    name: result.county_name,
    slug: result.county_slug,
    fips: '', // Not in RPC result
    population: null,
    region: null,
    totalBookings7d: Number(result.total_bookings) || 0,
    avgBond: result.avg_bond,
    felonyPercent: result.felony_pct,
    trend,
    formattedAvgBond: formatCurrency(result.avg_bond),
    formattedFelonyPercent: formatPercent(result.felony_pct),
  };
}

/**
 * Transform multiple county results
 */
export function toCountyStatsModels(
  results: TopCountyResult[],
  previousWeekData?: Map<number, number>
): CountyStatsModel[] {
  return results.map((r) =>
    toCountyStatsModel(r, previousWeekData?.get(r.county_id))
  );
}

// =============================================================================
// DEMOGRAPHICS ADAPTER
// =============================================================================

/**
 * Aggregate demographics data into breakdown structure
 */
export function toDemographicsBreakdown(
  data: MvDemographics[]
): DemographicsBreakdown {
  // Group by category
  const bySexMap = new Map<string, number>();
  const byRaceMap = new Map<string, number>();
  const byAgeGroupMap = new Map<string, number>();

  let total = 0;

  for (const row of data) {
    const count = Number(row.count) || 0;
    total += count;

    // Sex
    const sex = row.sex || 'Unknown';
    bySexMap.set(sex, (bySexMap.get(sex) || 0) + count);

    // Race
    const race = row.race || 'Unknown';
    byRaceMap.set(race, (byRaceMap.get(race) || 0) + count);

    // Age group
    const ageGroup = row.age_group || 'Unknown';
    byAgeGroupMap.set(ageGroup, (byAgeGroupMap.get(ageGroup) || 0) + count);
  }

  // Convert to arrays with percentages
  const toBreakdownArray = (map: Map<string, number>) =>
    Array.from(map.entries())
      .map(([label, count]) => ({
        label,
        count,
        percent: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);

  return {
    bySex: toBreakdownArray(bySexMap),
    byRace: toBreakdownArray(byRaceMap),
    byAgeGroup: toBreakdownArray(byAgeGroupMap),
  };
}

// =============================================================================
// TREND DATA ADAPTER
// =============================================================================

/**
 * Transform county trend data to DailyTrendPoints
 */
export function toDailyTrendPoints(data: CountyTrend[]): DailyTrendPoint[] {
  return data.map((row) => {
    const date = parseDate(row.date) ?? new Date();
    return {
      date,
      dateLabel: formatDate(row.date),
      totalBookings: Number(row.total_bookings) || 0,
      avgBond: row.avg_bond,
      felonyCount: Number(row.felony_count) || 0,
      misdemeanorCount: Number(row.misdemeanor_count) || 0,
    };
  });
}

/**
 * Aggregate MvDailyCountyStats by date (sum across all counties)
 * and transform to DailyTrendPoint[] for dashboard charts
 */
export function aggregateDailyStatsToTrendPoints(
  data: MvDailyCountyStats[]
): DailyTrendPoint[] {
  // Group by date and aggregate
  const byDate = new Map<
    string,
    {
      totalRecords: number;
      totalBond: number;
      bondCount: number;
      maleCount: number;
      femaleCount: number;
    }
  >();

  for (const row of data) {
    const existing = byDate.get(row.date) || {
      totalRecords: 0,
      totalBond: 0,
      bondCount: 0,
      maleCount: 0,
      femaleCount: 0,
    };

    existing.totalRecords += Number(row.total_records) || 0;
    if (row.avg_bond !== null) {
      existing.totalBond += Number(row.avg_bond) * (Number(row.total_records) || 1);
      existing.bondCount += Number(row.total_records) || 1;
    }
    existing.maleCount += Number(row.male_count) || 0;
    existing.femaleCount += Number(row.female_count) || 0;

    byDate.set(row.date, existing);
  }

  // Convert to DailyTrendPoint array, sorted by date ascending
  const result: DailyTrendPoint[] = [];

  for (const [dateStr, agg] of byDate.entries()) {
    const date = parseDate(dateStr) ?? new Date();
    const avgBond = agg.bondCount > 0 ? agg.totalBond / agg.bondCount : null;

    result.push({
      date,
      dateLabel: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      totalBookings: agg.totalRecords,
      avgBond,
      // We don't have felony/misdemeanor breakdown in mv_daily_county_stats,
      // so estimate based on typical ratios (35% felony, 65% misdemeanor)
      felonyCount: Math.round(agg.totalRecords * 0.35),
      misdemeanorCount: Math.round(agg.totalRecords * 0.65),
    });
  }

  // Sort by date ascending
  result.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result;
}

// =============================================================================
// PIPELINE HEALTH ADAPTERS
// =============================================================================

/**
 * Transform a PipelineRun to PipelineRunModel
 */
export function toPipelineRunModel(run: PipelineRun): PipelineRunModel {
  const startedAt = parseDate(run.created_at) ?? new Date();
  const finishedAt = parseDate(run.finished_at);
  const durationMs = finishedAt
    ? finishedAt.getTime() - startedAt.getTime()
    : null;

  return {
    id: run.id,
    status: run.status,
    startedAt,
    finishedAt,
    durationMs,
    metadata: run.metadata,
    statusColor: getStatusColor(run.status),
    statusIcon: getStatusIcon(run.status),
    formattedDuration: formatDuration(durationMs),
    formattedStartedAt: formatTimestamp(run.created_at),
  };
}

/**
 * Transform multiple runs
 */
export function toPipelineRunModels(runs: PipelineRun[]): PipelineRunModel[] {
  return runs.map(toPipelineRunModel);
}

/**
 * Transform MvPipelineHealth rows to HourlyPipelineStats
 */
export function toHourlyPipelineStats(
  data: MvPipelineHealth[]
): HourlyPipelineStat[] {
  return data.map((row) => {
    const hour = parseDate(row.hour) ?? new Date();
    return {
      hour,
      hourLabel: hour.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      runCount: Number(row.run_count) || 0,
      status: row.status,
      avgDurationSeconds: row.avg_duration_seconds,
    };
  });
}

/**
 * Build PipelineHealthModel from aggregated data
 */
export function toPipelineHealthModel(
  runs: PipelineRun[],
  hourlyStats: MvPipelineHealth[]
): PipelineHealthModel {
  const recentRuns = toPipelineRunModels(runs);
  const hourlyData = toHourlyPipelineStats(hourlyStats);

  // Calculate metrics
  const last24h = runs.filter((r) => {
    const created = parseDate(r.created_at);
    return created && Date.now() - created.getTime() < 24 * 60 * 60 * 1000;
  });

  const completedLast24h = last24h.filter((r) => r.status === 'completed').length;
  const failedLast24h = last24h.filter((r) => r.status === 'failed').length;
  const runningCount = runs.filter((r) => r.status === 'running').length;

  const successRate =
    last24h.length > 0 ? (completedLast24h / last24h.length) * 100 : 100;

  // Determine overall status
  let overallStatus: 'healthy' | 'degraded' | 'critical' = 'healthy';
  if (failedLast24h > 5 || successRate < 80) overallStatus = 'critical';
  else if (failedLast24h > 2 || successRate < 95) overallStatus = 'degraded';

  // Average duration from hourly stats
  const avgDurations = hourlyStats
    .map((h) => h.avg_duration_seconds)
    .filter((d): d is number => d !== null);
  const avgDurationSeconds =
    avgDurations.length > 0
      ? avgDurations.reduce((a, b) => a + b, 0) / avgDurations.length
      : null;

  // Last completed run
  const completedRuns = runs
    .filter((r) => r.status === 'completed' && r.finished_at)
    .sort((a, b) => {
      const aTime = parseDate(a.finished_at)?.getTime() ?? 0;
      const bTime = parseDate(b.finished_at)?.getTime() ?? 0;
      return bTime - aTime;
    });
  const lastCompletedRun = completedRuns[0]
    ? parseDate(completedRuns[0].finished_at)
    : null;

  return {
    overallStatus,
    runningCount,
    completedLast24h,
    failedLast24h,
    successRate,
    avgDurationSeconds,
    lastCompletedRun,
    recentRuns,
    hourlyStats: hourlyData,
  };
}

// =============================================================================
// ERROR EVENT ADAPTERS
// =============================================================================

/**
 * Transform an ErrorEvent to ErrorEventModel
 */
export function toErrorEventModel(
  event: ErrorEvent | RecentError,
  countyName?: string | null,
  sourceName?: string | null
): ErrorEventModel {
  // Handle both ErrorEvent and RecentError types
  const timestamp =
    'event_timestamp' in event ? event.event_timestamp : event.error_timestamp;
  const errorId = 'error_id' in event ? event.error_id : event.error_id;
  const handlerName = 'handler_name' in event ? event.handler_name : null;
  const isRetryable = 'is_retryable' in event ? event.is_retryable ?? false : false;
  const retryCount = 'retry_count' in event ? event.retry_count : 0;

  const parsedTimestamp = parseDate(timestamp) ?? new Date();
  const shortMessage =
    event.message.length > 100
      ? event.message.slice(0, 100) + '...'
      : event.message;

  return {
    errorId,
    timestamp: parsedTimestamp,
    timestampLabel: formatTimestamp(timestamp),
    category: event.category,
    code: event.code,
    severity: event.severity,
    countyId: 'county_id' in event ? event.county_id : null,
    countyName: 'county_name' in event ? event.county_name : countyName ?? null,
    sourceId: 'source_id' in event ? event.source_id : null,
    sourceName: 'source_name' in event ? event.source_name : sourceName ?? null,
    message: event.message,
    handlerName,
    isRetryable,
    retryCount,
    severityColor: getSeverityColor(event.severity),
    categoryIcon: getCategoryIcon(event.category),
    shortMessage,
  };
}

/**
 * Transform multiple error events
 */
export function toErrorEventModels(
  events: (ErrorEvent | RecentError)[]
): ErrorEventModel[] {
  return events.map((e) => toErrorEventModel(e));
}

/**
 * Transform MvErrorSummary to ErrorSummaryModel
 */
export function toErrorSummaryModel(summary: MvErrorSummary): ErrorSummaryModel {
  const lastOccurred = parseDate(summary.hour) ?? new Date();

  return {
    category: summary.category,
    code: summary.code,
    severity: summary.severity,
    count: Number(summary.error_count) || 0,
    affectedRuns: Number(summary.affected_runs) || 0,
    affectedCounties: summary.county_id ? 1 : 0, // Simplified; would need aggregation
    lastOccurred,
    categoryLabel: getCategoryLabel(summary.category),
    severityColor: getSeverityColor(summary.severity),
  };
}

/**
 * Transform multiple error summaries
 */
export function toErrorSummaryModels(
  summaries: MvErrorSummary[]
): ErrorSummaryModel[] {
  return summaries.map(toErrorSummaryModel);
}

// =============================================================================
// SOURCE RELIABILITY ADAPTER
// =============================================================================

/**
 * Transform MvSourceReliability to SourceReliabilityModel
 */
export function toSourceReliabilityModel(
  data: MvSourceReliability
): SourceReliabilityModel {
  const successRate = Number(data.success_rate) || 0;
  const reliabilityStatus = getReliabilityStatus(successRate);

  return {
    sourceId: data.source_id,
    name: data.source_name,
    displayName: data.source_name, // Could be enriched with sources table
    sourceType: data.source_type,
    countiesCovered: Number(data.counties_covered) || 0,
    totalRecords7d: Number(data.total_records_7d) || 0,
    totalErrors7d: Number(data.total_errors_7d) || 0,
    successRate,
    sourceTypeLabel: getSourceTypeLabel(data.source_type),
    formattedSuccessRate: formatPercent(successRate),
    reliabilityStatus,
    reliabilityColor: getReliabilityColor(reliabilityStatus),
  };
}

/**
 * Transform multiple source reliability rows
 */
export function toSourceReliabilityModels(
  data: MvSourceReliability[]
): SourceReliabilityModel[] {
  return data
    .map(toSourceReliabilityModel)
    .sort((a, b) => b.totalRecords7d - a.totalRecords7d);
}
