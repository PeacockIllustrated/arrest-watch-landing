/**
 * Supabase Database Schema Types
 * Auto-generated from migration files 002_dashboard_schema.sql and 003_materialized_views.sql
 *
 * These types mirror the database schema exactly.
 * For UI-facing models, use viewModels.ts with adapters.
 */

// ============================================================================
// ENUMS
// ============================================================================

export type ChargeSeverity = 'Felony' | 'Misdemeanor' | 'Infraction' | 'Unknown';

export type SourceType =
  | 'official_sheriff'
  | 'official_corrections'
  | 'vendor_smartcop'
  | 'vendor_jailtracker'
  | 'vendor_police2citizen'
  | 'vendor_newworld'
  | 'aggregator'
  | 'none';

export type ScraperPattern =
  | 'javascript_spa'
  | 'jailtracker'
  | 'smartcop'
  | 'search_form'
  | 'roster_list'
  | 'vine_link'
  | 'arcgis_rest'
  | 'cms_embedded'
  | 'pdf_document'
  | 'no_digital_source';

export type ErrorCategory =
  | 'network'
  | 'extraction'
  | 'validation'
  | 'timeout'
  | 'rate_limit'
  | 'system'
  | 'configuration';

export type ErrorSeverityLevel = 'critical' | 'error' | 'warning' | 'info';

export type PipelineRunStatus = 'running' | 'completed' | 'failed' | 'cancelled';

export type EscalationStatus = 'pending' | 'acknowledged' | 'resolved' | 'dismissed';

// ============================================================================
// REFERENCE TABLES
// ============================================================================

export interface County {
  county_id: number;
  name: string;
  slug: string;
  state: string;
  fips: string;
  population: number | null;
  region: string | null;
  created_at: string;
}

export interface Source {
  source_id: number;
  name: string;
  display_name: string | null;
  base_url: string | null;
  source_type: SourceType;
  pattern: ScraperPattern | null;
  is_active: boolean;
  reliability: number;
  created_at: string;
}

export interface CountySource {
  county_id: number;
  source_id: number;
  is_primary: boolean;
  is_fallback: boolean;
  priority: number;
  url: string | null;
  handler_name: string | null;
  available_fields: string[] | null;
  has_booking_time: boolean;
  has_mugshots: boolean;
  status: string;
  last_verified: string | null;
  notes: string | null;
}

export interface ErrorCode {
  code: string;
  category: ErrorCategory;
  severity: ErrorSeverityLevel;
  is_retryable: boolean;
  description: string | null;
  suggested_action: string | null;
}

// ============================================================================
// CORE RECORD TABLES
// ============================================================================

export interface CandidateRecord {
  id: string;
  record_id: string;
  booking_id: string | null;
  source_id: number | null;
  county_id: number | null;
  person_name: string;
  person_name_normalized: string;
  booking_datetime_text: string | null;
  booking_date_normalized: string | null; // DATE as ISO string
  booking_time: string | null; // TIME as string
  charges_preview: string[] | null;
  charges_count: number;
  detail_url: string | null;
  image_url: string | null;
  scraped_at: string;
  expires_at: string;
  run_id: string | null;
  is_duplicate: boolean;
  duplicate_of: string | null;
  created_at: string;
}

export interface EnrichedRecord {
  id: string;
  candidate_id: string | null;
  record_id: string;
  booking_id: string | null;
  source_id: number | null;
  county_id: number | null;
  person_name: string;
  person_name_normalized: string;
  booking_datetime_text: string | null;
  booking_date_normalized: string | null;
  booking_time: string | null;
  detail_url: string | null;
  image_url: string | null;
  // Physical description
  sex: string | null;
  race: string | null;
  age: number | null;
  dob: string | null;
  height_inches: number | null;
  weight_lbs: number | null;
  hair_color: string | null;
  eye_color: string | null;
  // Financial
  bond_total: number | null;
  case_number: string | null;
  // Biometric
  biometric_verified: boolean;
  biometric_score: number | null;
  biometric_provider: string | null;
  biometric_checked_at: string | null;
  // Metadata
  enriched_at: string;
  enrichment_source: string | null;
  enrichment_success: boolean;
  enrichment_error: string | null;
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

export interface Charge {
  charge_id: string;
  enriched_id: string;
  description: string;
  statute_code: string | null;
  severity: ChargeSeverity | null;
  bond_amount: number | null;
  sequence: number;
  created_at: string;
}

// ============================================================================
// OPERATIONAL TABLES
// ============================================================================

export interface ErrorEvent {
  error_id: string;
  event_timestamp: string;
  run_id: string | null;
  category: ErrorCategory;
  code: string;
  severity: ErrorSeverityLevel;
  source_id: number | null;
  county_id: number | null;
  handler_name: string | null;
  message: string;
  stack_trace: string | null;
  request_url: string | null;
  request_method: string | null;
  response_status: number | null;
  response_preview: string | null;
  selector: string | null;
  expected_count: number | null;
  actual_count: number | null;
  is_retryable: boolean | null;
  retry_count: number;
  max_retries: number | null;
  retry_delay_ms: number | null;
  fallback_attempted: boolean;
  fallback_source: string | null;
  records_affected: number | null;
  page_number: number | null;
  total_pages: number | null;
}

export interface PipelineRun {
  id: string;
  status: PipelineRunStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  finished_at: string | null;
}

export interface Escalation {
  id: string;
  escalation_key: string;
  run_id: string | null;
  status: EscalationStatus;
  severity_score: number | null;
  confidence_score: number | null;
  summary: string | null;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditLogEntry {
  event_id: string;
  run_id: string | null;
  escalation_key: string | null;
  event_type: string;
  details: Record<string, unknown>;
  created_at: string;
}

export interface EvidenceSnapshot {
  id: string;
  run_id: string | null;
  sha256: string;
  artifact_type: string;
  storage_path: string;
  created_at: string;
}

// ============================================================================
// MATERIALIZED VIEW TYPES
// ============================================================================

export interface MvDailyCountyStats {
  date: string;
  county_id: number;
  total_records: number;
  unique_individuals: number;
  male_count: number;
  female_count: number;
  avg_age: number | null;
  total_bond: number | null;
  avg_bond: number | null;
  verified_count: number;
}

export interface MvHourlyIngestion {
  hour: string;
  source_id: number;
  county_id: number;
  records_scraped: number;
  new_records: number;
  duplicates: number;
}

export interface MvChargeAnalysis {
  county_id: number;
  statute_code: string | null;
  severity: ChargeSeverity | null;
  occurrence_count: number;
  avg_bond: number | null;
  week: string;
}

export interface MvDemographics {
  county_id: number;
  date: string;
  sex: string | null;
  race: string | null;
  age_group: string;
  count: number;
}

export interface MvPipelineHealth {
  hour: string;
  status: string;
  run_count: number;
  avg_duration_seconds: number | null;
}

export interface MvErrorSummary {
  hour: string;
  category: ErrorCategory;
  code: string;
  severity: ErrorSeverityLevel;
  source_id: number | null;
  county_id: number | null;
  error_count: number;
  affected_runs: number;
}

export interface MvSourceReliability {
  source_id: number;
  source_name: string;
  source_type: SourceType;
  counties_covered: number;
  total_records_7d: number;
  total_errors_7d: number;
  success_rate: number;
}

// ============================================================================
// RPC FUNCTION RETURN TYPES
// ============================================================================

export interface DashboardOverview {
  total_records_24h: number;
  total_records_7d: number;
  active_counties: number;
  active_sources: number;
  error_rate_24h: number;
  avg_daily_records: number;
}

export interface TopCountyResult {
  county_id: number;
  county_name: string;
  county_slug: string;
  total_bookings: number;
  avg_bond: number | null;
  felony_pct: number | null;
}

export interface RecentError {
  error_id: string;
  error_timestamp: string;
  category: ErrorCategory;
  code: string;
  severity: ErrorSeverityLevel;
  county_name: string | null;
  source_name: string | null;
  message: string;
}

export interface RealtimeStats {
  total_records: number;
  new_records: number;
  counties_active: number;
  duplicate_rate: number;
  error_count: number;
}

export interface CountyTrend {
  date: string;
  total_bookings: number;
  avg_bond: number | null;
  felony_count: number;
  misdemeanor_count: number;
}

// ============================================================================
// DATABASE TYPE HELPERS
// ============================================================================

/**
 * Helper type for insert operations (omits generated fields)
 */
export type InsertEnrichedRecord = Omit<
  EnrichedRecord,
  'id' | 'created_at' | 'updated_at' | 'enriched_at'
>;

export type InsertCandidateRecord = Omit<
  CandidateRecord,
  'id' | 'created_at' | 'charges_count'
>;

export type InsertCharge = Omit<Charge, 'charge_id' | 'created_at'>;

export type InsertErrorEvent = Omit<ErrorEvent, 'error_id' | 'event_timestamp'>;

/**
 * Supabase Database schema definition for type inference
 */
export interface Database {
  public: {
    Tables: {
      counties: {
        Row: County;
        Insert: Omit<County, 'created_at'>;
        Update: Partial<Omit<County, 'county_id'>>;
      };
      sources: {
        Row: Source;
        Insert: Omit<Source, 'source_id' | 'created_at'>;
        Update: Partial<Omit<Source, 'source_id'>>;
      };
      county_sources: {
        Row: CountySource;
        Insert: CountySource;
        Update: Partial<CountySource>;
      };
      error_codes: {
        Row: ErrorCode;
        Insert: ErrorCode;
        Update: Partial<ErrorCode>;
      };
      candidate_records: {
        Row: CandidateRecord;
        Insert: InsertCandidateRecord;
        Update: Partial<Omit<CandidateRecord, 'id' | 'charges_count'>>;
      };
      enriched_records: {
        Row: EnrichedRecord;
        Insert: InsertEnrichedRecord;
        Update: Partial<Omit<EnrichedRecord, 'id'>>;
      };
      charges: {
        Row: Charge;
        Insert: InsertCharge;
        Update: Partial<Omit<Charge, 'charge_id'>>;
      };
      error_events: {
        Row: ErrorEvent;
        Insert: InsertErrorEvent;
        Update: never; // Immutable
      };
      pipeline_runs: {
        Row: PipelineRun;
        Insert: Omit<PipelineRun, 'created_at'>;
        Update: Partial<Omit<PipelineRun, 'id' | 'created_at'>>;
      };
      escalations: {
        Row: Escalation;
        Insert: Omit<Escalation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Escalation, 'id' | 'created_at'>>;
      };
      audit_log: {
        Row: AuditLogEntry;
        Insert: Omit<AuditLogEntry, 'created_at'>;
        Update: never; // Immutable
      };
      evidence_snapshots: {
        Row: EvidenceSnapshot;
        Insert: Omit<EvidenceSnapshot, 'id' | 'created_at'>;
        Update: never; // Immutable
      };
    };
    Views: {
      mv_daily_county_stats: {
        Row: MvDailyCountyStats;
      };
      mv_hourly_ingestion: {
        Row: MvHourlyIngestion;
      };
      mv_charge_analysis: {
        Row: MvChargeAnalysis;
      };
      mv_demographics: {
        Row: MvDemographics;
      };
      mv_pipeline_health: {
        Row: MvPipelineHealth;
      };
      mv_error_summary: {
        Row: MvErrorSummary;
      };
      mv_source_reliability: {
        Row: MvSourceReliability;
      };
    };
    Functions: {
      get_dashboard_overview: {
        Args: Record<string, never>;
        Returns: DashboardOverview[];
      };
      get_top_counties: {
        Args: { p_days?: number; p_limit?: number };
        Returns: TopCountyResult[];
      };
      get_recent_errors: {
        Args: { p_hours?: number; p_limit?: number };
        Returns: RecentError[];
      };
      get_realtime_stats: {
        Args: { hours?: number };
        Returns: RealtimeStats[];
      };
      get_county_trend: {
        Args: { p_county_id: number; p_days?: number };
        Returns: CountyTrend[];
      };
      refresh_dashboard_views: {
        Args: Record<string, never>;
        Returns: void;
      };
      refresh_view: {
        Args: { view_name: string };
        Returns: void;
      };
      cleanup_expired_candidates: {
        Args: Record<string, never>;
        Returns: number;
      };
    };
    Enums: {
      charge_severity: ChargeSeverity;
      source_type: SourceType;
      scraper_pattern: ScraperPattern;
      error_category: ErrorCategory;
      error_severity_level: ErrorSeverityLevel;
    };
  };
}
