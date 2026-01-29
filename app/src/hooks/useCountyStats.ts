// =============================================================================
// COUNTY STATS HOOK - Per-county statistics and detail data
// =============================================================================
// Fetches county-specific data including trends, demographics, and sources.
// =============================================================================

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type {
  County,
  CountySource,
  Source,
  MvDemographics,
  CountyTrend,
} from '../lib/types/supabaseSchema';
import type {
  CountyModel,
  CountyDetailModel,
  CountySourceModel,
  LoadingState,
} from '../lib/types/viewModels';
import { toCountyModel } from '../lib/adapters/recordAdapter';
import {
  toDemographicsBreakdown,
  toDailyTrendPoints,
} from '../lib/adapters/statsAdapter';

// =============================================================================
// CONFIGURATION
// =============================================================================

const TREND_DAYS = 30;

// =============================================================================
// TYPES
// =============================================================================

export interface CountyStatsState {
  counties: CountyModel[];
  selectedCounty: CountyDetailModel | null;
  loading: LoadingState;
}

export interface UseCountyStatsReturn extends CountyStatsState {
  loadCounties: () => Promise<void>;
  loadCountyDetail: (countyIdOrSlug: number | string) => Promise<void>;
  clearSelection: () => void;
}

// =============================================================================
// DEMO DATA
// =============================================================================

const DEMO_COUNTIES: CountyModel[] = [
  { countyId: 1, name: 'Miami-Dade', slug: 'miami-dade', fips: '12086', population: 2716940, region: 'Southeast' },
  { countyId: 2, name: 'Broward', slug: 'broward', fips: '12011', population: 1944375, region: 'Southeast' },
  { countyId: 3, name: 'Hillsborough', slug: 'hillsborough', fips: '12057', population: 1459762, region: 'Central' },
  { countyId: 4, name: 'Orange', slug: 'orange', fips: '12095', population: 1393452, region: 'Central' },
  { countyId: 5, name: 'Palm Beach', slug: 'palm-beach', fips: '12099', population: 1496770, region: 'Southeast' },
];

const DEMO_COUNTY_DETAIL: CountyDetailModel = {
  countyId: 1,
  name: 'Miami-Dade',
  slug: 'miami-dade',
  fips: '12086',
  population: 2716940,
  region: 'Southeast',
  totalBookings7d: 1247,
  avgBond: 15000,
  felonyPercent: 42.5,
  trend: { direction: 'up', percentChange: 8.2, isPositive: false },
  formattedAvgBond: '$15,000',
  formattedFelonyPercent: '42.5%',
  sources: [
    {
      sourceId: 1,
      name: 'arrests.org',
      displayName: 'Arrests.org',
      sourceType: 'aggregator',
      isPrimary: true,
      isActive: true,
      reliability: 95,
      hasBookingTime: true,
      hasMugshots: true,
      lastVerified: new Date(),
    },
  ],
  demographics: {
    bySex: [
      { label: 'M', count: 875, percent: 70.2 },
      { label: 'F', count: 372, percent: 29.8 },
    ],
    byRace: [
      { label: 'White', count: 498, percent: 39.9 },
      { label: 'Black', count: 436, percent: 35.0 },
      { label: 'Hispanic', count: 250, percent: 20.0 },
      { label: 'Other', count: 63, percent: 5.1 },
    ],
    byAgeGroup: [
      { label: '18-25', count: 312, percent: 25.0 },
      { label: '26-35', count: 437, percent: 35.0 },
      { label: '36-45', count: 287, percent: 23.0 },
      { label: '46-55', count: 137, percent: 11.0 },
      { label: '56+', count: 74, percent: 6.0 },
    ],
  },
  dailyTrend: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    dateLabel: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    totalBookings: 35 + Math.floor(Math.random() * 20),
    avgBond: 12000 + Math.floor(Math.random() * 6000),
    felonyCount: 15 + Math.floor(Math.random() * 10),
    misdemeanorCount: 20 + Math.floor(Math.random() * 10),
  })),
  chargeDistribution: [
    { statuteCode: '784.03', description: 'Battery', severity: 'Misdemeanor', count: 156, percent: 12.5, avgBond: 2500 },
    { statuteCode: '316.193', description: 'DUI', severity: 'Misdemeanor', count: 134, percent: 10.7, avgBond: 5000 },
    { statuteCode: '893.13', description: 'Drug Possession', severity: 'Felony', count: 98, percent: 7.9, avgBond: 10000 },
  ],
};

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

export function useCountyStats(): UseCountyStatsReturn {
  // Check if we're in demo mode
  const isDemo = import.meta.env.VITE_PORTAL_MODE === 'demo';

  // State
  const [counties, setCounties] = useState<CountyModel[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<CountyDetailModel | null>(null);
  const [loading, setLoading] = useState<LoadingState>(INITIAL_LOADING);

  // =============================================================================
  // FETCH ALL COUNTIES
  // =============================================================================

  const loadCounties = useCallback(async (): Promise<void> => {
    // Demo mode
    if (isDemo) {
      setCounties(DEMO_COUNTIES);
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
      const { data, error } = await supabase
        .from('counties')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      const countyModels = (data || []).map((c) => toCountyModel(c as County));

      // DEBUG: Log counties with FIPS codes
      const withFips = countyModels.filter(c => c.fips);
      const withoutFips = countyModels.filter(c => !c.fips);
      console.log('[useCountyStats] ===== COUNTY DEBUG =====');
      console.log('[useCountyStats] Loaded counties:', countyModels.length);
      console.log('[useCountyStats] Counties with FIPS:', withFips.length);
      console.log('[useCountyStats] Counties without FIPS:', withoutFips.length);
      console.log('[useCountyStats] First 10 counties with FIPS:', withFips.slice(0, 10).map(c => ({
        id: c.countyId,
        name: c.name,
        fips: c.fips,
        svgFips: c.fips ? `c${c.fips}` : null,
      })));
      if (withoutFips.length > 0) {
        console.log('[useCountyStats] Counties missing FIPS:', withoutFips.slice(0, 5).map(c => ({ id: c.countyId, name: c.name })));
      }
      console.log('[useCountyStats] ===== END DEBUG =====');

      setCounties(countyModels);

      setLoading({
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load counties';
      console.error('[useCountyStats] Load counties error:', errorMessage);

      // Fallback to demo data on error so the UI still shows content
      console.log('[useCountyStats] Falling back to demo data for counties');
      setCounties(DEMO_COUNTIES);

      setLoading({
        isLoading: false,
        isRefreshing: false,
        error: `Using demo data (${errorMessage})`,
        lastUpdated: new Date(),
      });
    }
  }, [isDemo]);

  // =============================================================================
  // FETCH COUNTY DETAIL
  // =============================================================================

  const loadCountyDetail = useCallback(
    async (countyIdOrSlug: number | string): Promise<void> => {
      // Demo mode
      if (isDemo) {
        setSelectedCounty(DEMO_COUNTY_DETAIL);
        return;
      }

      setLoading((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Fetch county basic info
        let countyQuery = supabase.from('counties').select('*');

        if (typeof countyIdOrSlug === 'number') {
          countyQuery = countyQuery.eq('county_id', countyIdOrSlug);
        } else {
          countyQuery = countyQuery.eq('slug', countyIdOrSlug);
        }

        const { data: countyData, error: countyError } = await countyQuery.single();

        if (countyError || !countyData) {
          throw new Error('County not found');
        }

        const county = countyData as County;
        const countyId = county.county_id;

        // Fetch related data in parallel
        const [sourcesResult, demographicsResult, trendResult, statsResult] = await Promise.all([
          // County sources
          supabase
            .from('county_sources')
            .select(`
              *,
              sources(source_id, name, display_name, source_type, is_active, reliability)
            `)
            .eq('county_id', countyId),

          // Demographics from materialized view
          supabase
            .from('mv_demographics')
            .select('*')
            .eq('county_id', countyId)
            .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]),

          // Trend data via RPC
          supabase.rpc('get_county_trend', {
            p_county_id: countyId,
            p_days: TREND_DAYS,
          }),

          // Quick stats from RPC
          supabase.rpc('get_top_counties', {
            p_days: 7,
            p_limit: 67, // All counties
          }),
        ]);

        // Process sources
        const sources: CountySourceModel[] = (sourcesResult.data || []).map((cs) => {
          const source = (cs as CountySource & { sources: Source }).sources;
          return {
            sourceId: source.source_id,
            name: source.name,
            displayName: source.display_name || source.name,
            sourceType: source.source_type,
            isPrimary: (cs as CountySource).is_primary,
            isActive: source.is_active,
            reliability: source.reliability,
            hasBookingTime: (cs as CountySource).has_booking_time,
            hasMugshots: (cs as CountySource).has_mugshots,
            lastVerified: (cs as CountySource).last_verified
              ? new Date((cs as CountySource).last_verified as string)
              : null,
          };
        });

        // Process demographics
        const demographics = toDemographicsBreakdown(
          (demographicsResult.data || []) as MvDemographics[]
        );

        // Process trend
        const dailyTrend = toDailyTrendPoints(
          (trendResult.data || []) as CountyTrend[]
        );

        // Find this county's stats
        const countyStats = (statsResult.data || []).find(
          (s: { county_id: number }) => s.county_id === countyId
        );

        // Build detail model
        const detail: CountyDetailModel = {
          countyId: county.county_id,
          name: county.name,
          slug: county.slug,
          fips: county.fips,
          population: county.population,
          region: county.region,
          totalBookings7d: countyStats?.total_bookings ?? 0,
          avgBond: countyStats?.avg_bond ?? null,
          felonyPercent: countyStats?.felony_pct ?? null,
          trend: {
            direction: 'stable',
            percentChange: 0,
            isPositive: true,
          },
          formattedAvgBond: countyStats?.avg_bond
            ? `$${Math.round(countyStats.avg_bond).toLocaleString()}`
            : 'N/A',
          formattedFelonyPercent: countyStats?.felony_pct
            ? `${countyStats.felony_pct.toFixed(1)}%`
            : 'N/A',
          sources,
          demographics,
          dailyTrend,
          chargeDistribution: [], // Would need additional query
        };

        setSelectedCounty(detail);

        setLoading({
          isLoading: false,
          isRefreshing: false,
          error: null,
          lastUpdated: new Date(),
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load county';
        console.error('[useCountyStats] Load county detail error:', errorMessage);

        // Fallback to demo data on error so the UI still shows content
        console.log('[useCountyStats] Falling back to demo data for county detail');
        setSelectedCounty(DEMO_COUNTY_DETAIL);

        setLoading({
          isLoading: false,
          isRefreshing: false,
          error: `Using demo data (${errorMessage})`,
          lastUpdated: new Date(),
        });
      }
    },
    [isDemo]
  );

  // =============================================================================
  // UTILITY FUNCTIONS
  // =============================================================================

  const clearSelection = useCallback(() => {
    setSelectedCounty(null);
  }, []);

  // =============================================================================
  // INITIAL LOAD
  // =============================================================================

  useEffect(() => {
    loadCounties();
  }, [loadCounties]);

  // =============================================================================
  // RETURN
  // =============================================================================

  return {
    counties,
    selectedCounty,
    loading,
    loadCounties,
    loadCountyDetail,
    clearSelection,
  };
}

export default useCountyStats;
