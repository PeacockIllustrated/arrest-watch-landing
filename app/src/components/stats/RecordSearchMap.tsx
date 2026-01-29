import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Import the counties SVG as a raw URL
import usaCountiesSvg from '../../assets/Usa_counties_large.svg';
import { COUNTY_ID_TO_NAME } from '../../assets/county_map';

// =============================================================================
// TYPES
// =============================================================================

export interface RecordSearchMapProps {
  // Selection state
  selectedState: string | null;
  selectedCounty: string | null;
  onStateSelect: (stateId: string | null) => void;
  onCountySelect: (countyFips: string | null, countyName: string | null) => void;

  // Data for visualization
  countyRecordCounts?: Map<string, number>;
  unavailableCounties?: Set<string>;

  // Display options
  height?: string;
  showTooltips?: boolean;
}

type ZoomLevel = 'country' | 'state';

interface ViewBoxDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TooltipData {
  name: string;
  count: number;
  percentage: number;
  x: number;
  y: number;
  isUnavailable: boolean;
}

// State name to ID mapping
const STATE_NAMES: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA',
  Colorado: 'CO', Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA',
  Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA', Maine: 'ME', Maryland: 'MD',
  Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS', Missouri: 'MO',
  Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', New_Hampshire: 'NH', New_Jersey: 'NJ',
  New_Mexico: 'NM', New_York: 'NY', North_Carolina: 'NC', North_Dakota: 'ND', Ohio: 'OH',
  Oklahoma: 'OK', Oregon: 'OR', Pennsylvania: 'PA', Rhode_Island: 'RI', South_Carolina: 'SC',
  South_Dakota: 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT', Vermont: 'VT',
  Virginia: 'VA', Washington: 'WA', West_Virginia: 'WV', Wisconsin: 'WI', Wyoming: 'WY',
  District_of_Columbia: 'DC',
};

// Counties without digital source (show hatched pattern)
const DEFAULT_UNAVAILABLE_COUNTIES = new Set([
  'c12003', // Baker County
  'c12013', // Calhoun County
  'c12035', // Flagler County
  'c12059', // Holmes County
  'c12063', // Jackson County
  'c12065', // Jefferson County
  'c12067', // Lafayette County
  'c12075', // Levy County
  'c12077', // Liberty County
  'c12101', // Pasco County
  'c12125', // Union County
  'c12131', // Walton County
]);

// =============================================================================
// FIPS STATE PREFIXES - Map state FIPS prefix to state name
// =============================================================================

const STATE_FIPS_PREFIX: Record<string, string> = {
  '01': 'Alabama', '02': 'Alaska', '04': 'Arizona', '05': 'Arkansas', '06': 'California',
  '08': 'Colorado', '09': 'Connecticut', '10': 'Delaware', '11': 'District_of_Columbia',
  '12': 'Florida', '13': 'Georgia', '15': 'Hawaii', '16': 'Idaho', '17': 'Illinois',
  '18': 'Indiana', '19': 'Iowa', '20': 'Kansas', '21': 'Kentucky', '22': 'Louisiana',
  '23': 'Maine', '24': 'Maryland', '25': 'Massachusetts', '26': 'Michigan', '27': 'Minnesota',
  '28': 'Mississippi', '29': 'Missouri', '30': 'Montana', '31': 'Nebraska', '32': 'Nevada',
  '33': 'New_Hampshire', '34': 'New_Jersey', '35': 'New_Mexico', '36': 'New_York',
  '37': 'North_Carolina', '38': 'North_Dakota', '39': 'Ohio', '40': 'Oklahoma', '41': 'Oregon',
  '42': 'Pennsylvania', '44': 'Rhode_Island', '45': 'South_Carolina', '46': 'South_Dakota',
  '47': 'Tennessee', '48': 'Texas', '49': 'Utah', '50': 'Vermont', '51': 'Virginia',
  '53': 'Washington', '54': 'West_Virginia', '55': 'Wisconsin', '56': 'Wyoming',
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

/**
 * Get state name from FIPS code (e.g., "c12086" -> "Florida")
 */
function getStateFromFips(fips: string): string | null {
  // Remove 'c' prefix if present
  const cleanFips = fips.startsWith('c') ? fips.slice(1) : fips;
  // First 2 digits are state FIPS
  const statePrefix = cleanFips.slice(0, 2);
  return STATE_FIPS_PREFIX[statePrefix] || null;
}

/**
 * Aggregate county counts by state
 */
function aggregateByState(countyRecordCounts: Map<string, number>): Map<string, number> {
  const stateCounts = new Map<string, number>();
  for (const [fips, count] of countyRecordCounts) {
    const state = getStateFromFips(fips);
    if (state) {
      stateCounts.set(state, (stateCounts.get(state) || 0) + count);
    }
  }
  return stateCounts;
}

// =============================================================================
// RECORD SEARCH MAP COMPONENT
// =============================================================================

const RecordSearchMap: React.FC<RecordSearchMapProps> = ({
  selectedState,
  selectedCounty,
  onStateSelect,
  onCountySelect,
  countyRecordCounts = new Map(),
  unavailableCounties = DEFAULT_UNAVAILABLE_COUNTIES,
  height = '400px',
  showTooltips = true,
}) => {
  // Core state
  const [currentLevel, setCurrentLevel] = useState<ZoomLevel>('country');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Refs
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const viewBoxRef = useRef<ViewBoxDimensions>({ x: 0, y: 0, width: 960, height: 600 });
  const [svgLoaded, setSvgLoaded] = useState(false);

  // Refs for data that event handlers need (avoids SVG reload on data change)
  const countyRecordCountsRef = useRef(countyRecordCounts);
  const unavailableCountiesRef = useRef(unavailableCounties);
  const totalRecordsRef = useRef(0);
  const statesWithDataRef = useRef<Set<string>>(new Set());

  // Refs for handler functions (to avoid stale closures in event listeners)
  const handleStateClickRef = useRef<(stateId: string) => void>(() => {});
  const handleCountyClickRef = useRef<(countyId: string, countyName: string) => void>(() => {});

  // Calculate totals and state-level aggregations
  const { totalRecords, maxCount, stateRecordCounts, statesWithData } = useMemo(() => {
    const values = Array.from(countyRecordCounts.values());
    const stateCounts = aggregateByState(countyRecordCounts);
    return {
      totalRecords: values.reduce((sum, v) => sum + v, 0),
      maxCount: Math.max(...values, 1),
      stateRecordCounts: stateCounts,
      statesWithData: new Set(stateCounts.keys()),
    };
  }, [countyRecordCounts]);

  // Keep refs in sync with props (for event handlers)
  useEffect(() => {
    countyRecordCountsRef.current = countyRecordCounts;
    unavailableCountiesRef.current = unavailableCounties;
    totalRecordsRef.current = totalRecords;
    statesWithDataRef.current = statesWithData;
  }, [countyRecordCounts, unavailableCounties, totalRecords, statesWithData]);

  // Sync external state with internal zoom level
  useEffect(() => {
    if (selectedState) {
      setCurrentLevel('state');
    } else {
      setCurrentLevel('country');
    }
  }, [selectedState]);

  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================

  const applyViewBox = useCallback((vb: ViewBoxDimensions, animate = true) => {
    if (svgRef.current) {
      if (animate) {
        setIsAnimating(true);
        svgRef.current.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      }
      svgRef.current.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);
      viewBoxRef.current = vb;
      if (animate) {
        setTimeout(() => {
          if (svgRef.current) {
            svgRef.current.style.transition = '';
          }
          setIsAnimating(false);
        }, 500);
      }
    }
  }, []);

  const getCountyColor = useCallback(
    (fipsId: string): string => {
      // Check if unavailable
      if (unavailableCounties.has(fipsId)) {
        return 'url(#hatched)';
      }

      // Get record count for heat map
      const count = countyRecordCounts.get(fipsId) || 0;
      if (count === 0) {
        return 'var(--map-county-empty, #1a1a1a)';
      }

      // Calculate intensity based on count (log scale for better distribution)
      const intensity = Math.min(Math.log(count + 1) / Math.log(maxCount + 1), 1);

      // Gradient from dark surface to accent red
      const r = Math.round(26 + intensity * (228 - 26));
      const g = Math.round(26 - intensity * 26);
      const b = Math.round(26 + intensity * (40 - 26));
      const alpha = 0.7 + intensity * 0.3;

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    [countyRecordCounts, unavailableCounties, maxCount]
  );

  const highlightState = useCallback((stateId: string) => {
    if (!svgRef.current) return;
    const allGroups = svgRef.current.querySelectorAll('g[data-state]');
    allGroups.forEach((group) => {
      const gId = group.getAttribute('data-state');
      if (gId === stateId) {
        group.setAttribute('data-selected', 'true');
        group.removeAttribute('data-dimmed');
      } else {
        group.setAttribute('data-dimmed', 'true');
        group.removeAttribute('data-selected');
      }
    });
  }, []);

  const clearHighlights = useCallback(() => {
    if (!svgRef.current) return;
    const allGroups = svgRef.current.querySelectorAll('g[data-state]');
    allGroups.forEach((group) => {
      group.removeAttribute('data-selected');
      group.removeAttribute('data-dimmed');
    });
    const allPaths = svgRef.current.querySelectorAll('path');
    allPaths.forEach((path) => {
      path.removeAttribute('data-selected-county');
    });
  }, []);

  const zoomToState = useCallback(
    (stateId: string) => {
      if (!svgRef.current) return;
      const stateGroup = svgRef.current.querySelector(`g[id="${stateId}"]`);
      if (stateGroup) {
        const bbox = (stateGroup as SVGGraphicsElement).getBBox();
        const padding = Math.max(bbox.width, bbox.height) * 0.2;
        applyViewBox({
          x: bbox.x - padding,
          y: bbox.y - padding,
          width: bbox.width + padding * 2,
          height: bbox.height + padding * 2,
        });
        highlightState(stateId);
      }
    },
    [applyViewBox, highlightState]
  );

  const resetZoom = useCallback(() => {
    applyViewBox({ x: 0, y: 0, width: 960, height: 600 });
    clearHighlights();
  }, [applyViewBox, clearHighlights]);

  // Apply selection styling to county
  const updateCountySelection = useCallback((countyId: string | null) => {
    if (!svgRef.current) return;

    // Clear all county selections
    const allPaths = svgRef.current.querySelectorAll('path[data-selected-county]');
    allPaths.forEach((path) => {
      path.removeAttribute('data-selected-county');
    });

    // Apply new selection
    if (countyId) {
      const countyPath = svgRef.current.querySelector(`path[id="${countyId}"]`);
      if (countyPath) {
        countyPath.setAttribute('data-selected-county', 'true');
      }
    }
  }, []);

  // Update county colors based on record counts (for selected state)
  const updateCountyColors = useCallback(() => {
    if (!svgRef.current || currentLevel !== 'state' || !selectedState) return;

    const stateGroup = svgRef.current.querySelector(`g[id="${selectedState}"]`);
    if (!stateGroup) return;

    const paths = stateGroup.querySelectorAll('path');
    paths.forEach((path) => {
      const fipsId = path.id;
      if (fipsId) {
        const color = getCountyColor(fipsId);
        path.style.fill = color;
      }
    });
  }, [currentLevel, selectedState, getCountyColor]);

  // ==========================================================================
  // ACTION HANDLERS
  // ==========================================================================

  const handleStateClick = useCallback(
    (stateId: string) => {
      // Only allow clicking states that have data
      if (statesWithDataRef.current.has(stateId)) {
        setCurrentLevel('state');
        zoomToState(stateId);
        onStateSelect(stateId);
      }
    },
    [zoomToState, onStateSelect]
  );

  const handleCountyClick = useCallback(
    (countyId: string, countyName: string) => {
      if (currentLevel !== 'state') return;

      // Toggle selection
      if (selectedCounty === countyId) {
        updateCountySelection(null);
        onCountySelect(null, null);
      } else {
        updateCountySelection(countyId);
        onCountySelect(countyId, countyName);
      }
    },
    [currentLevel, selectedCounty, updateCountySelection, onCountySelect]
  );

  const handleBackClick = useCallback(() => {
    if (currentLevel === 'state') {
      setCurrentLevel('country');
      resetZoom();
      onStateSelect(null);
      onCountySelect(null, null);
    }
  }, [currentLevel, resetZoom, onStateSelect, onCountySelect]);

  // Keep handler refs in sync (so event listeners always call latest version)
  useEffect(() => {
    handleStateClickRef.current = handleStateClick;
    handleCountyClickRef.current = handleCountyClick;
  }, [handleStateClick, handleCountyClick]);

  // ==========================================================================
  // SVG LOADING
  // ==========================================================================

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(usaCountiesSvg);
        const svgText = await response.text();

        if (svgContainerRef.current) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svgText, 'image/svg+xml');
          const svgElement = doc.querySelector('svg');

          if (svgElement) {
            // Clear container
            while (svgContainerRef.current.firstChild) {
              svgContainerRef.current.removeChild(svgContainerRef.current.firstChild);
            }

            // Clean existing styles
            svgElement.querySelectorAll('style').forEach((s) => s.remove());

            // Setup defs
            let defs = svgElement.querySelector('defs');
            if (!defs) {
              defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
              svgElement.prepend(defs);
            }

            // ================================================================
            // SVG FILTER - Creates the red outline effect for states (like DeepMapViz)
            // ================================================================
            const stateFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            stateFilter.setAttribute('id', 'state-outline-filter');
            stateFilter.setAttribute('x', '-10%');
            stateFilter.setAttribute('y', '-10%');
            stateFilter.setAttribute('width', '120%');
            stateFilter.setAttribute('height', '120%');

            const feMorphology = document.createElementNS('http://www.w3.org/2000/svg', 'feMorphology');
            feMorphology.setAttribute('in', 'SourceAlpha');
            feMorphology.setAttribute('operator', 'dilate');
            feMorphology.setAttribute('radius', '1.2');
            feMorphology.setAttribute('result', 'dilated');
            stateFilter.appendChild(feMorphology);

            const feComposite1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            feComposite1.setAttribute('in', 'dilated');
            feComposite1.setAttribute('in2', 'SourceAlpha');
            feComposite1.setAttribute('operator', 'out');
            feComposite1.setAttribute('result', 'outline');
            stateFilter.appendChild(feComposite1);

            const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
            feFlood.setAttribute('flood-color', '#E40028');
            feFlood.setAttribute('flood-opacity', '0.85');
            feFlood.setAttribute('result', 'color');
            stateFilter.appendChild(feFlood);

            const feComposite2 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            feComposite2.setAttribute('in', 'color');
            feComposite2.setAttribute('in2', 'outline');
            feComposite2.setAttribute('operator', 'in');
            feComposite2.setAttribute('result', 'coloredOutline');
            stateFilter.appendChild(feComposite2);

            const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
            const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            feMergeNode1.setAttribute('in', 'coloredOutline');
            feMerge.appendChild(feMergeNode1);
            const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            feMergeNode2.setAttribute('in', 'SourceGraphic');
            feMerge.appendChild(feMergeNode2);
            stateFilter.appendChild(feMerge);
            defs.appendChild(stateFilter);

            // ================================================================
            // HATCHED PATTERN - For unavailable counties
            // ================================================================
            const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
            pattern.setAttribute('id', 'hatched');
            pattern.setAttribute('patternUnits', 'userSpaceOnUse');
            pattern.setAttribute('width', '6');
            pattern.setAttribute('height', '6');
            pattern.setAttribute('patternTransform', 'rotate(45)');
            const patternRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            patternRect.setAttribute('width', '6');
            patternRect.setAttribute('height', '6');
            patternRect.setAttribute('fill', 'rgba(20, 20, 20, 0.9)');
            pattern.appendChild(patternRect);
            const patternLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            patternLine.setAttribute('x1', '0');
            patternLine.setAttribute('y1', '0');
            patternLine.setAttribute('x2', '0');
            patternLine.setAttribute('y2', '6');
            patternLine.setAttribute('stroke', 'rgba(80, 80, 80, 0.4)');
            patternLine.setAttribute('stroke-width', '2');
            pattern.appendChild(patternLine);
            defs.appendChild(pattern);

            // ================================================================
            // GLOW FILTER - For selected county
            // ================================================================
            const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            glowFilter.setAttribute('id', 'county-glow');
            glowFilter.setAttribute('x', '-100%');
            glowFilter.setAttribute('y', '-100%');
            glowFilter.setAttribute('width', '300%');
            glowFilter.setAttribute('height', '300%');

            const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
            feGaussianBlur.setAttribute('stdDeviation', '2');
            feGaussianBlur.setAttribute('result', 'glow');
            glowFilter.appendChild(feGaussianBlur);

            const glowMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
            const gm1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            gm1.setAttribute('in', 'glow');
            const gm2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            gm2.setAttribute('in', 'glow');
            const gm3 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            gm3.setAttribute('in', 'SourceGraphic');
            glowMerge.appendChild(gm1);
            glowMerge.appendChild(gm2);
            glowMerge.appendChild(gm3);
            glowFilter.appendChild(glowMerge);
            defs.appendChild(glowFilter);

            // ================================================================
            // CUSTOM STYLES - Matching DeepMapViz aesthetic
            // ================================================================
            const customStyle = document.createElementNS('http://www.w3.org/2000/svg', 'style');
            customStyle.textContent = `
              /* Base path styling */
              path {
                fill: var(--bg-surface, #1a1a1a) !important;
                stroke: none !important;
                stroke-width: 0 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                vector-effect: non-scaling-stroke;
              }

              /* ============================================ */
              /* COUNTRY VIEW - State level styling          */
              /* ============================================ */

              /* All states get the red outline filter */
              g[data-state] {
                filter: url(#state-outline-filter);
                cursor: pointer;
              }

              /* States WITHOUT data - grayed out, not clickable */
              g[data-state][data-no-data="true"] {
                filter: none !important;
                opacity: 0.3;
                cursor: not-allowed;
              }
              g[data-state][data-no-data="true"] path {
                fill: #0d0d0d !important;
              }

              /* States WITH data - hoverable */
              g[data-state][data-has-data="true"]:not([data-selected="true"]):not([data-dimmed="true"]):hover path {
                fill: var(--accent, #E40028) !important;
                opacity: 1 !important;
              }

              /* ============================================ */
              /* STATE VIEW - Zoomed into a state            */
              /* ============================================ */

              /* Selected state (zoomed in) */
              g[data-selected="true"] {
                filter: none !important;
              }
              g[data-selected="true"] path {
                stroke: rgba(228, 0, 40, 0.4) !important;
                stroke-width: 0.3px !important;
              }
              g[data-selected="true"] path:hover {
                stroke: rgba(228, 0, 40, 0.8) !important;
                stroke-width: 0.8px !important;
                filter: brightness(1.2);
              }

              /* Dimmed states (not selected, in state view) */
              g[data-dimmed="true"] {
                opacity: 0.08;
                filter: none !important;
                pointer-events: none;
              }
              g[data-dimmed="true"] path {
                stroke: none !important;
              }

              /* ============================================ */
              /* COUNTY SELECTION                            */
              /* ============================================ */

              /* Selected county */
              path[data-selected-county="true"] {
                stroke: #E40028 !important;
                stroke-width: 2px !important;
                filter: url(#county-glow);
                animation: pulseGlow 1.5s ease-in-out infinite;
              }

              /* Hide borders/separators */
              #borders, #separator, .separator, path[id*="separator"] {
                display: none !important;
              }

              @keyframes pulseGlow {
                0%, 100% {
                  stroke-width: 2px;
                  filter: url(#county-glow) drop-shadow(0 0 3px rgba(228, 0, 40, 0.5));
                }
                50% {
                  stroke-width: 2.5px;
                  filter: url(#county-glow) drop-shadow(0 0 6px rgba(228, 0, 40, 0.8));
                }
              }
            `;
            defs.appendChild(customStyle);

            // Set attributes
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            if (!svgElement.hasAttribute('viewBox')) {
              svgElement.setAttribute('viewBox', '0 0 960 600');
            }

            // Append to container
            svgContainerRef.current.appendChild(svgElement);
            svgRef.current = svgElement;

            // Setup state groups
            const groups = svgElement.querySelectorAll('g[id]');
            groups.forEach((group) => {
              const stateId = group.getAttribute('id');
              if (stateId && STATE_NAMES[stateId]) {
                group.setAttribute('data-state', stateId);

                group.addEventListener('click', (e: Event) => {
                  e.stopPropagation();
                  handleStateClickRef.current(stateId);
                });
              }
            });

            // Setup county paths with tooltips and click handlers
            const paths = svgElement.querySelectorAll('path');
            paths.forEach((path) => {
              const fipsId = path.id;
              const countyName =
                COUNTY_ID_TO_NAME[fipsId] || path.querySelector('title')?.textContent || '';

              if (fipsId && countyName) {
                path.setAttribute('data-county-name', countyName);

                path.addEventListener('click', (e: Event) => {
                  e.stopPropagation();
                  const parentGroup = path.closest('g[id]');
                  const stateId = parentGroup?.getAttribute('id');

                  // Only respond if this state has data
                  if (stateId && statesWithDataRef.current.has(stateId)) {
                    // Check if we're in state view (zoomed in) or country view
                    const isStateSelected = parentGroup?.getAttribute('data-selected') === 'true';

                    if (isStateSelected) {
                      // In state view - toggle county selection
                      handleCountyClickRef.current(fipsId, countyName);
                    } else {
                      // In country view - zoom to state
                      handleStateClickRef.current(stateId);
                    }
                  }
                });

                if (showTooltips) {
                  path.addEventListener('mouseenter', (e: MouseEvent) => {
                    const parentGroup = path.closest('g[id]');
                    if (parentGroup?.getAttribute('data-selected') === 'true') {
                      const count = countyRecordCountsRef.current.get(fipsId) || 0;
                      const isUnavailable = unavailableCountiesRef.current.has(fipsId);
                      const total = totalRecordsRef.current;
                      const rect = svgContainerRef.current?.getBoundingClientRect();
                      if (rect) {
                        setTooltipData({
                          name: countyName.replace(' County', ''),
                          count,
                          percentage: total > 0 ? (count / total) * 100 : 0,
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                          isUnavailable,
                        });
                      }
                      setHoveredElement(fipsId);
                    }
                  });

                  path.addEventListener('mouseleave', () => {
                    setTooltipData(null);
                    setHoveredElement(null);
                  });

                  path.addEventListener('mousemove', (e: MouseEvent) => {
                    const rect = svgContainerRef.current?.getBoundingClientRect();
                    if (rect && tooltipData) {
                      setTooltipData((prev) =>
                        prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null
                      );
                    }
                  });
                }
              }
            });

            setSvgLoaded(true);
          }
        }
      } catch (error) {
        console.error('Failed to load map SVG:', error);
      }
    };

    fetchSvg();
  }, [handleStateClick, handleCountyClick, showTooltips]);

  // Mark states with/without data
  useEffect(() => {
    if (!svgLoaded || !svgRef.current) return;

    const stateGroups = svgRef.current.querySelectorAll('g[data-state]');
    stateGroups.forEach((group) => {
      const stateId = group.getAttribute('data-state');
      if (stateId) {
        if (statesWithData.has(stateId)) {
          group.setAttribute('data-has-data', 'true');
          group.removeAttribute('data-no-data');
        } else {
          group.setAttribute('data-no-data', 'true');
          group.removeAttribute('data-has-data');
        }
      }
    });
  }, [svgLoaded, statesWithData]);

  // Update county colors when counts change (state view)
  useEffect(() => {
    if (svgLoaded) {
      updateCountyColors();
    }
  }, [svgLoaded, updateCountyColors, countyRecordCounts]);

  // Sync external selection with internal state
  useEffect(() => {
    if (selectedState && svgLoaded) {
      zoomToState(selectedState);
    } else if (!selectedState && svgLoaded) {
      resetZoom();
    }
  }, [selectedState, svgLoaded, zoomToState, resetZoom]);

  useEffect(() => {
    updateCountySelection(selectedCounty);
  }, [selectedCounty, updateCountySelection]);

  // ==========================================================================
  // BREADCRUMB
  // ==========================================================================

  const breadcrumb = useMemo(() => {
    const items: { label: string; onClick?: () => void }[] = [
      { label: 'USA', onClick: selectedState ? handleBackClick : undefined },
    ];

    if (selectedState) {
      items.push({
        label: selectedState.replace(/_/g, ' '),
        onClick: selectedCounty ? () => onCountySelect(null, null) : undefined,
      });
    }

    if (selectedCounty) {
      const countyName =
        COUNTY_ID_TO_NAME[selectedCounty]?.replace(' County', '') || selectedCounty;
      items.push({ label: countyName });
    }

    return items;
  }, [selectedState, selectedCounty, handleBackClick, onCountySelect]);

  // ==========================================================================
  // LEGEND
  // ==========================================================================

  const legendGradient = useMemo(() => {
    return [
      { percent: 0, color: 'rgba(26, 26, 26, 1)' },
      { percent: 25, color: 'rgba(80, 20, 30, 0.85)' },
      { percent: 50, color: 'rgba(140, 10, 35, 0.9)' },
      { percent: 75, color: 'rgba(190, 5, 38, 0.95)' },
      { percent: 100, color: 'rgba(228, 0, 40, 1)' },
    ];
  }, []);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div
      style={{
        width: '100%',
        height,
        background: 'var(--bg-base, #050505)',
        border: '1px solid var(--card-border, rgba(255,255,255,0.08))',
        borderRadius: '0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Grid Overlay - subtle surveillance aesthetic */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Corner accents */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderTop: '2px solid rgba(228, 0, 40, 0.4)',
          borderLeft: '2px solid rgba(228, 0, 40, 0.4)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '32px',
          height: '32px',
          borderTop: '2px solid rgba(228, 0, 40, 0.4)',
          borderRight: '2px solid rgba(228, 0, 40, 0.4)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderBottom: '2px solid rgba(228, 0, 40, 0.4)',
          borderLeft: '2px solid rgba(228, 0, 40, 0.4)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '32px',
          height: '32px',
          borderBottom: '2px solid rgba(228, 0, 40, 0.4)',
          borderRight: '2px solid rgba(228, 0, 40, 0.4)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />

      {/* Breadcrumb Navigation */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 0, 0, 0.75)',
          padding: '8px 14px',
          border: '1px solid rgba(228, 0, 40, 0.25)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {breadcrumb.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span style={{ color: 'rgba(228, 0, 40, 0.5)', fontSize: '0.65rem' }}>/</span>
            )}
            <span
              onClick={item.onClick}
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: item.onClick ? 'var(--accent, #E40028)' : 'var(--text-primary, #fff)',
                cursor: item.onClick ? 'pointer' : 'default',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (item.onClick) e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Total Records Badge */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '2px',
          background: 'rgba(0, 0, 0, 0.75)',
          padding: '8px 14px',
          border: '1px solid rgba(228, 0, 40, 0.25)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span
          style={{
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {currentLevel === 'country' ? 'ALL REGIONS' : selectedState?.replace(/_/g, ' ').toUpperCase()}
        </span>
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--accent, #E40028)',
            fontFamily: 'var(--font-heading, monospace)',
            letterSpacing: '-0.02em',
          }}
        >
          {formatNumber(
            currentLevel === 'country'
              ? totalRecords
              : selectedState
                ? stateRecordCounts.get(selectedState) || 0
                : totalRecords
          )}
        </span>
        <span
          style={{
            fontSize: '0.55rem',
            color: 'rgba(255, 255, 255, 0.35)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          RECORDS
        </span>
      </div>

      {/* Map Container */}
      <div
        ref={svgContainerRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isAnimating ? 0.95 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Enhanced Tooltip */}
      {tooltipData && showTooltips && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(tooltipData.x + 12, (svgContainerRef.current?.offsetWidth || 400) - 160),
            top: tooltipData.y - 8,
            transform: 'translateY(-100%)',
            background: 'rgba(0, 0, 0, 0.92)',
            border: '1px solid rgba(228, 0, 40, 0.35)',
            padding: '10px 14px',
            pointerEvents: 'none',
            zIndex: 30,
            minWidth: '140px',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* County name */}
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-primary, #fff)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(228, 0, 40, 0.25)',
              paddingBottom: '6px',
            }}
          >
            {tooltipData.name}
          </div>

          {tooltipData.isUnavailable ? (
            <div
              style={{
                fontSize: '0.65rem',
                color: 'rgba(255, 255, 255, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span style={{ fontSize: '0.8rem' }}>&#8709;</span>
              <span>No data source</span>
            </div>
          ) : (
            <>
              {/* Record count */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '3px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'rgba(255, 255, 255, 0.45)',
                    textTransform: 'uppercase',
                  }}
                >
                  Records
                </span>
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--accent, #E40028)',
                  }}
                >
                  {tooltipData.count.toLocaleString()}
                </span>
              </div>

              {/* Percentage of total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'rgba(255, 255, 255, 0.45)',
                    textTransform: 'uppercase',
                  }}
                >
                  Share
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {tooltipData.percentage.toFixed(1)}%
                </span>
              </div>

              {/* Mini bar indicator */}
              <div
                style={{
                  marginTop: '6px',
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.min(tooltipData.percentage * 2, 100)}%`,
                    height: '100%',
                    background: 'var(--accent, #E40028)',
                  }}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Legend (only shown in state view) */}
      {currentLevel === 'state' && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            zIndex: 20,
            background: 'rgba(0, 0, 0, 0.75)',
            padding: '10px 14px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              fontSize: '0.55rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.45)',
              marginBottom: '6px',
            }}
          >
            Record Density
          </div>

          {/* Gradient bar */}
          <div
            style={{
              width: '100px',
              height: '6px',
              background: `linear-gradient(90deg, ${legendGradient.map((l) => l.color).join(', ')})`,
              marginBottom: '4px',
            }}
          />

          {/* Labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.5rem',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            <span>LOW</span>
            <span>HIGH</span>
          </div>

          {/* Unavailable indicator */}
          <div
            style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <div
              style={{
                width: '14px',
                height: '14px',
                background:
                  'repeating-linear-gradient(45deg, rgba(20,20,20,0.9), rgba(20,20,20,0.9) 2px, rgba(80,80,80,0.4) 2px, rgba(80,80,80,0.4) 4px)',
              }}
            />
            <span style={{ fontSize: '0.5rem', color: 'rgba(255, 255, 255, 0.35)' }}>
              NO SOURCE
            </span>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0, 0, 0, 0.75)',
          padding: '6px 10px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: currentLevel === 'state' ? 'var(--accent, #E40028)' : '#444',
            boxShadow: currentLevel === 'state' ? '0 0 6px rgba(228, 0, 40, 0.5)' : 'none',
            animation: currentLevel === 'state' ? 'pulse 2s infinite' : 'none',
          }}
        />
        <span
          style={{
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {currentLevel === 'country'
            ? `${statesWithData.size} STATE${statesWithData.size !== 1 ? 'S' : ''} WITH DATA`
            : selectedCounty
              ? 'COUNTY SELECTED'
              : 'SELECT COUNTY'}
        </span>
      </div>

      {/* Loading State */}
      {!svgLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted, #666)',
            fontSize: '0.75rem',
            zIndex: 40,
            background: 'rgba(0, 0, 0, 0.9)',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid rgba(228, 0, 40, 0.2)',
              borderTopColor: 'var(--accent, #E40028)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '12px',
            }}
          />
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.65rem',
            }}
          >
            Loading Map
          </span>
        </div>
      )}

      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default RecordSearchMap;
