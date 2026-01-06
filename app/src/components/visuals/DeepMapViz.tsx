import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// Import the counties SVG as a raw URL
import usaCountiesSvg from '../../assets/Usa_counties_large.svg';
import { COUNTY_ID_TO_NAME } from '../../assets/county_map';

// Types for data binding (ready for real data integration)
export interface CountyData {
    id: string;
    name: string;
    stateId: string;
    arrestCount?: number;
    alertCount?: number;
}

export interface StateData {
    id: string;
    name: string;
    arrestCount?: number;
    alertCount?: number;
    countyCount?: number;
}

interface DeepMapVizProps {
    isScanning?: boolean;
    height?: string;
    onStateSelect?: (stateId: string | null) => void;
    onCountySelect?: (countyId: string | null, stateId: string | null) => void;
    stateData?: Map<string, StateData>;
    countyData?: Map<string, CountyData>;
}

type ZoomLevel = 'country' | 'state' | 'county';

interface ViewBoxDimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}

// State name mapping for search
const STATE_NAMES: { [key: string]: string } = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New_Hampshire': 'NH', 'New_Jersey': 'NJ',
    'New_Mexico': 'NM', 'New_York': 'NY', 'North_Carolina': 'NC', 'North_Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode_Island': 'RI', 'South_Carolina': 'SC',
    'South_Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West_Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District_of_Columbia': 'DC'
};

const DeepMapViz: React.FC<DeepMapVizProps> = ({
    isScanning = false,
    height = '31rem',
    onStateSelect,
    onCountySelect,
    stateData,
    countyData,
}) => {
    // Core state
    const [currentLevel, setCurrentLevel] = useState<ZoomLevel>('country');
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
    const [hoveredElement, setHoveredElement] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Refs for state access inside event listeners (avoids re-binding)
    const currentLevelRef = useRef<ZoomLevel>('country');
    const selectedStateRef = useRef<string | null>(null);
    const selectedCountyRef = useRef<string | null>(null);

    // Track current viewBox for smooth zooming
    const viewBoxRef = useRef<ViewBoxDimensions>({ x: 0, y: 0, width: 960, height: 600 });

    // Sync refs with state
    useEffect(() => { currentLevelRef.current = currentLevel; }, [currentLevel]);
    useEffect(() => { selectedStateRef.current = selectedState; }, [selectedState]);
    useEffect(() => { selectedCountyRef.current = selectedCounty; }, [selectedCounty]);

    // Refs for SVG
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [svgLoaded, setSvgLoaded] = useState(false);

    // --- HELPER FUNCTIONS ---

    const applyViewBox = useCallback((vb: ViewBoxDimensions) => {
        if (svgRef.current) {
            svgRef.current.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);
            viewBoxRef.current = vb; // Keep ref in sync
        }
    }, []);

    // Scroll Zoom Logic
    useEffect(() => {
        const container = svgContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // Prevent page scroll

            if (!svgRef.current) return;

            const { deltaY, clientX, clientY } = e;
            const zoomFactor = deltaY > 0 ? 1.1 : 0.9; // Zoom out : Zoom in

            // Get SVG dimensions
            const svgRect = container.getBoundingClientRect();

            // Calculate cursor position relative to SVG (0-1 range)
            const mouseX = (clientX - svgRect.left) / svgRect.width;
            const mouseY = (clientY - svgRect.top) / svgRect.height;

            // Current viewBox
            const currentVB = viewBoxRef.current;

            // Calculate new dimensions
            let newWidth = currentVB.width * zoomFactor;
            let newHeight = currentVB.height * zoomFactor;

            // Clamp zoom levels (Min: ~County, Max: ~USA*1.5)
            // Min width (zoom in cap) - e.g. 20 units
            if (newWidth < 20) {
                newWidth = 20;
                newHeight = 20 * (600 / 960); // Aspect ratio
            }
            // Max width (zoom out cap) - e.g. 1500 units
            if (newWidth > 1500) {
                newWidth = 1500;
                newHeight = 1500 * (600 / 960);
            }

            // If clamped, don't change position if we didn't change size? 
            // Actually, simplified check: if scale didn't change much, return.
            if (Math.abs(newWidth - currentVB.width) < 0.1) return;

            // Calculate new X/Y to keep cursor steady
            // geometric zoom: newX = oldX + (mouseRatio * (oldWidth - newWidth))
            const newX = currentVB.x + (mouseX * (currentVB.width - newWidth));
            const newY = currentVB.y + (mouseY * (currentVB.height - newHeight));

            const newVB = { x: newX, y: newY, width: newWidth, height: newHeight };

            applyViewBox(newVB);
        };

        // Non-passive listener to allow preventDefault
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [applyViewBox]);

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

    const highlightCounty = useCallback((countyId: string) => {
        if (!svgRef.current) return;
        const allPaths = svgRef.current.querySelectorAll('path');
        allPaths.forEach((path) => {
            if (path.id === countyId) {
                path.setAttribute('data-highlighted', 'true');
                path.removeAttribute('data-dimmed');
            } else {
                path.setAttribute('data-dimmed', 'true');
                path.removeAttribute('data-highlighted');
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
            path.removeAttribute('data-highlighted');
            path.removeAttribute('data-dimmed');
        });
    }, []);

    const zoomToState = useCallback((stateId: string) => {
        if (!svgRef.current) return;
        const stateGroup = svgRef.current.querySelector(`g[id="${stateId}"]`);
        if (stateGroup) {
            const bbox = (stateGroup as SVGGraphicsElement).getBBox();
            const padding = Math.max(bbox.width, bbox.height) * 0.3;
            applyViewBox({
                x: bbox.x - padding,
                y: bbox.y - padding,
                width: bbox.width + padding * 2,
                height: bbox.height + padding * 2,
            });
            highlightState(stateId);
        }
    }, [applyViewBox, highlightState]);

    const zoomToCounty = useCallback((countyId: string) => {
        if (!svgRef.current) return;
        const countyPath = svgRef.current.querySelector(`path[id="${countyId}"]`);
        if (countyPath) {
            const bbox = (countyPath as SVGGraphicsElement).getBBox();
            const padding = Math.max(bbox.width, bbox.height) * 0.5;
            applyViewBox({
                x: bbox.x - padding,
                y: bbox.y - padding,
                width: bbox.width + padding * 2,
                height: bbox.height + padding * 2,
            });
            highlightCounty(countyId);
        }
    }, [applyViewBox, highlightCounty]);

    const resetZoom = useCallback(() => {
        applyViewBox({ x: 0, y: 0, width: 960, height: 600 });
        clearHighlights();
    }, [applyViewBox, clearHighlights]);


    // --- ACTION HANDLERS (Called by event listeners or UI) ---

    const handleStateAction = useCallback((stateId: string) => {
        if (currentLevelRef.current === 'country') {
            setSelectedState(stateId);
            setCurrentLevel('state');
            zoomToState(stateId);
            onStateSelect?.(stateId);
        }
    }, [onStateSelect, zoomToState]);

    const handleCountyAction = useCallback((countyId: string) => {
        const currentLvl = currentLevelRef.current;
        const currentSelCounty = selectedCountyRef.current;
        const currentSelState = selectedStateRef.current;

        if (currentLvl === 'state') {
            // Toggle off check handled by reference mostly, but here via state flow
            if (currentSelCounty === countyId) {
                // Deselect
                setSelectedCounty(null);
                zoomToState(currentSelState || '');
                onCountySelect?.(null, currentSelState);
                return;
            }
            setSelectedCounty(countyId);
            setCurrentLevel('county');
            zoomToCounty(countyId);
            onCountySelect?.(countyId, currentSelState);
        } else if (currentLvl === 'county') {
            if (currentSelCounty === countyId) {
                // Deselect
                setSelectedCounty(null);
                setCurrentLevel('state');
                zoomToState(currentSelState || '');
                onCountySelect?.(null, currentSelState);
            } else {
                // Switch
                setSelectedCounty(countyId);
                zoomToCounty(countyId);
                onCountySelect?.(countyId, currentSelState);
            }
        }
    }, [onCountySelect, zoomToState, zoomToCounty]);


    // --- EVENT LISTENER SETUP (Stable, uses Refs) ---

    // --- INITIALIZATION ---

    // Apply base theme styles
    const applyBaseStyles = useCallback(() => {
        if (!svgRef.current) return;

        // Clear any data attributes from previous state
        const paths = svgRef.current.querySelectorAll('path');
        paths.forEach((path) => {
            path.removeAttribute('data-highlighted');
            path.removeAttribute('data-dimmed');
        });

        // Add data-state attribute to each state group for CSS targeting
        const groups = svgRef.current.querySelectorAll('g[id]');
        groups.forEach((group) => {
            const stateId = group.getAttribute('id');
            if (stateId && STATE_NAMES[stateId]) {
                group.setAttribute('data-state', stateId);
                group.removeAttribute('data-selected');
                group.removeAttribute('data-dimmed');
            }
        });
    }, []);

    const setupEventListeners = useCallback(() => {
        if (!svgRef.current) return;

        // State Groups
        const stateGroups = svgRef.current.querySelectorAll('g[id]');
        stateGroups.forEach((group) => {
            const stateId = group.getAttribute('id');
            if (!stateId || !STATE_NAMES[stateId]) return;

            // Remove old listeners to be safe (though we only run this once)
            const newGroup = group.cloneNode(true) as Element;
            group.parentNode?.replaceChild(newGroup, group);
        });

        // Re-query after cleaning (or just attach if we trust once-only)
        // Since we are running this effect ONCE, we just attach.
        // We use the refs inside listeners.

        const freshStateGroups = svgRef.current.querySelectorAll('g[id]');
        freshStateGroups.forEach((group) => {
            const stateId = group.getAttribute('id');
            if (!stateId || !STATE_NAMES[stateId]) return;

            group.addEventListener('click', (e: Event) => {
                e.stopPropagation();
                handleStateAction(stateId);
            });

            group.addEventListener('mouseenter', () => setHoveredElement(stateId));
            group.addEventListener('mouseleave', () => setHoveredElement(null));
        });

        // County Paths
        const paths = svgRef.current.querySelectorAll('path');
        paths.forEach((path) => {
            const title = path.querySelector('title');
            if (title) {
                const countyName = title.textContent || '';
                const countyId = path.id;
                path.setAttribute('data-county', countyName);

                path.addEventListener('click', (e: Event) => {
                    e.stopPropagation(); // Always stop propagation on county click to prevent State click
                    // Only act if we are NOT in country view (or if we want to allow deep linking from country view)
                    if (currentLevelRef.current !== 'country') {
                        handleCountyAction(countyId);
                    } else {
                        // In country view, clicking a county should bubble to state? 
                        // Actually, if we stop propagation, we must handle state click manually or allow bubble.
                        // Let's manually trigger state click if in country view:
                        const parentGroup = path.closest('g[id]');
                        if (parentGroup) {
                            const stateId = parentGroup.getAttribute('id');
                            if (stateId) handleStateAction(stateId);
                        }
                    }
                });

                path.addEventListener('mouseenter', () => {
                    if (currentLevelRef.current !== 'country') setHoveredElement(countyId);
                });

                path.addEventListener('mouseleave', () => setHoveredElement(null));
            }
        });

        // Background
        svgRef.current.addEventListener('click', () => {
            if (currentLevelRef.current === 'county') {
                setSelectedCounty(null);
                setCurrentLevel('state');
                const sState = selectedStateRef.current;
                if (sState) {
                    // We need to call the helper, but helper depends on refs/state? 
                    // No, zoomToState just manipulates DOM.
                    // However, we can't call complex React callbacks easily here without closure issues?
                    // Actually, since we only run setup ONCE, these closures capture initial state...
                    // WAIT. This is the problem.
                    // Closures capture initial values.
                    // We MUST use Refs for logic inside these listeners if we only bind once.
                }
                // Actually, simpler: Use a dedicated handled function that checks refs.
            } else if (currentLevelRef.current === 'state') {
                setSelectedState(null);
                setCurrentLevel('country');
                // Reset zoom manually here or trigger a reaction?
                // Since we don't have access to the latest 'resetZoom' closure if it changed...
                // But resets are stable.
            }
        });

        // RE-IMPLEMENTING BACKGROUND CLICK via React-bound function call to be safe?
        // No, let's just use the component-level handleBackgroundClick which we will expose or attach to a wrapper div?
        // Actually, attaching to SVG element is good.
        // Let's perform the logic directly using refs to be safe.

    }, [handleStateAction, handleCountyAction]);

    // WRAPPER for background click that is React-aware (attached to container or SVG via React prop?)
    // Better to attach via React prop `onClick` on the container, rather than native addEventListener, 
    // to ensure we always have latest state closure.
    const onContainerClick = useCallback(() => {
        if (currentLevel === 'county') {
            setSelectedCounty(null);
            setCurrentLevel('state');
            if (selectedState) zoomToState(selectedState);
            onCountySelect?.(null, selectedState);
        } else if (currentLevel === 'state') {
            setSelectedState(null);
            setCurrentLevel('country');
            resetZoom();
            onStateSelect?.(null);
        }
    }, [currentLevel, selectedState, onStateSelect, onCountySelect, zoomToState, resetZoom]);


    // MAIN EFFECT: LOAD SVG (Once)
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
                        svgContainerRef.current.innerHTML = '';

                        // Clean
                        svgElement.querySelectorAll('style').forEach(s => s.remove());
                        svgElement.querySelectorAll('defs style').forEach(s => s.remove());

                        // Inject Defs
                        let defs = svgElement.querySelector('defs');
                        if (!defs) {
                            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                            svgElement.prepend(defs);
                        }

                        // Filter
                        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
                        filter.setAttribute('id', 'state-outline-filter');
                        filter.setAttribute('x', '-10%');
                        filter.setAttribute('y', '-10%');
                        filter.setAttribute('width', '120%');
                        filter.setAttribute('height', '120%');
                        filter.innerHTML = `
                            <feMorphology in="SourceAlpha" operator="dilate" radius="1.2" result="dilated"/>
                            <feComposite in="dilated" in2="SourceAlpha" operator="out" result="outline"/>
                            <feFlood flood-color="#E40028" flood-opacity="0.8" result="color"/>
                            <feComposite in="color" in2="outline" operator="in" result="coloredOutline"/>
                            <feMerge>
                                <feMergeNode in="coloredOutline"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        `;
                        defs.appendChild(filter);

                        // Styles
                        const customStyle = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                        customStyle.textContent = `
                            path {
                                fill: var(--bg-surface, #1a1a1a) !important;
                                stroke: none !important;
                                stroke-width: 0 !important;
                                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                                cursor: pointer;
                                vector-effect: non-scaling-stroke;
                            }
                            g[data-state] { filter: url(#state-outline-filter); }
                            g[data-state]:not([data-selected="true"]):hover path {
                                fill: var(--accent, #E40028) !important;
                                opacity: 1 !important;
                            }
                            g[data-selected="true"] path {
                                fill: var(--bg-surface, #1a1a1a) !important;
                                stroke: var(--accent, #E40028) !important;
                                stroke-width: 0.5px !important;
                                stroke-opacity: 0.5 !important;
                            }
                            g[data-selected="true"] path:hover {
                                fill: var(--accent, #E40028) !important;
                                stroke: var(--accent, #E40028) !important;
                                stroke-width: 1px !important;
                                opacity: 1 !important;
                            }
                            g[data-dimmed="true"] { opacity: 0.15; filter: none !important; }
                            g[data-dimmed="true"] path { stroke: none !important; }
                            path[data-highlighted="true"] { fill: var(--accent, #E40028) !important; opacity: 1 !important; }
                            #borders, #separator, .separator, path[id*="separator"] { display: none !important; }
                        `;
                        defs.appendChild(customStyle);

                        // Attributes
                        svgElement.setAttribute('width', '100%');
                        svgElement.setAttribute('height', '100%');
                        svgElement.style.width = '100%';
                        svgElement.style.height = '100%';
                        if (!svgElement.hasAttribute('viewBox')) svgElement.setAttribute('viewBox', '0 0 960 600');

                        // Append
                        svgContainerRef.current.appendChild(svgElement);
                        svgRef.current = svgElement;

                        // Init styling
                        applyBaseStyles();

                        // Calls specialized setup that binds listeners using REFS
                        setupEventListeners();

                        setSvgLoaded(true);
                    }
                }
            } catch (error) {
                console.error('Failed to load map SVG:', error);
            }
        };

        fetchSvg();
    }, []); // RUN ONCE


    // State for sidebar lists
    const [availableCounties, setAvailableCounties] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        if (selectedState && svgRef.current) {
            const stateGroup = svgRef.current.querySelector(`g[id="${selectedState}"]`);
            if (stateGroup) {
                const counties: { id: string, name: string }[] = [];
                stateGroup.querySelectorAll('path').forEach(path => {
                    const fipsId = path.id;
                    const name = COUNTY_ID_TO_NAME[fipsId] || path.getAttribute('data-name') || fipsId;
                    path.setAttribute('data-name', name);
                    counties.push({ id: fipsId, name });
                });
                setAvailableCounties(counties.sort((a, b) => a.name.localeCompare(b.name)));
            }
        } else {
            setAvailableCounties([]);
        }
    }, [selectedState, svgLoaded]);

    const filteredList = useMemo(() => {
        const lowerQuery = searchQuery.toLowerCase();
        if (currentLevel === 'country') {
            return Object.entries(STATE_NAMES)
                .map(([name, code]) => ({ id: name, name: name.replace(/_/g, ' '), code }))
                .filter(item => item.name.toLowerCase().includes(lowerQuery))
                .sort((a, b) => a.name.localeCompare(b.name));
        } else {
            return availableCounties
                .filter(c => c.name.toLowerCase().includes(lowerQuery));
        }
    }, [searchQuery, currentLevel, availableCounties]);

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height,
                background: 'var(--bg-base, #050505)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--border-radius, 0px)',
                overflow: 'hidden',
                position: 'relative'
            }}
            className="deep-map-container"
        >
            {/* SIDEBAR TOOLBAR */}
            <div style={{
                width: '30%',
                minWidth: '280px',
                borderRight: '1px solid var(--card-border)',
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10
            }}>
                {/* Header / Breadcrumbs */}
                <div style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--card-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-subtle, rgba(255,255,255,0.02))'
                }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', color: 'var(--text-primary)' }}>
                        {currentLevel === 'country' ? 'COVERAGE' : selectedState?.replace(/_/g, ' ')}
                    </div>
                    {currentLevel !== 'country' && (
                        <button
                            onClick={onContainerClick} // Maps to 'Back' logic
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--card-border)',
                                color: 'var(--text-muted)',
                                fontSize: '0.65rem',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                borderRadius: '2px'
                            }}
                        >
                            BACK TO USA
                        </button>
                    )}
                </div>

                {/* Search Input */}
                <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>
                    <input
                        type="text"
                        placeholder={currentLevel === 'country' ? "SEARCH STATE..." : "SEARCH COUNTY..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            background: 'var(--bg-input, rgba(255,255,255,0.05))',
                            border: 'none',
                            padding: '0.6rem',
                            color: 'var(--text-primary, white)',
                            fontSize: '0.8rem',
                            fontFamily: 'monospace',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Scrollable List */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filteredList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                if (currentLevel === 'country') {
                                    handleStateAction(item.id);
                                } else {
                                    handleCountyAction(item.id);
                                }
                            }}
                            onMouseEnter={() => setHoveredElement(item.id)}
                            onMouseLeave={() => setHoveredElement(null)}
                            style={{
                                padding: '0.75rem 1rem',
                                fontSize: '0.75rem',
                                borderBottom: '1px solid var(--card-border-subtle, rgba(255,255,255,0.03))',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s ease',
                                background: (selectedState === item.id || selectedCounty === item.id)
                                    ? 'rgba(228, 0, 40, 0.1)'
                                    : (hoveredElement === item.id ? 'var(--bg-hover, rgba(255,255,255,0.05))' : 'transparent'),
                                color: (selectedState === item.id || selectedCounty === item.id || hoveredElement === item.id)
                                    ? 'var(--accent, #E40028)'
                                    : 'var(--text-secondary, #888)'
                            }}
                        >
                            <span>{item.name}</span>
                            {(selectedState === item.id || selectedCounty === item.id) && (
                                <span style={{ fontSize: '0.6rem', opacity: 0.8 }}>ACTIVE</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Stats */}
                <div style={{
                    padding: '0.75rem',
                    borderTop: '1px solid var(--card-border)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted, #555)',
                    background: 'var(--bg-surface-2, #080808)'
                }}>
                    {currentLevel === 'country'
                        ? `${filteredList.length} JURISDICTIONS`
                        : `${filteredList.length} COUNTIES`
                    }
                </div>
            </div>

            {/* MAP AREA */}
            <div style={{
                flex: 1,
                position: 'relative',
                background: 'var(--bg-base)',
                overflow: 'hidden'
            }}>
                {/* SVG Container - Click for Background Back */}
                <div
                    ref={svgContainerRef}
                    onClick={(e) => {
                        // Only trigger background click if target is the SVG/Container itself, not internal paths
                        // Actually event bubbling from paths is stopped, so this might work for empty areas?
                        // But SVG fills container.
                        // We rely on stopPropagation in path/group listeners.
                        if (e.target === svgContainerRef.current || e.target === svgRef.current) {
                            onContainerClick();
                        }
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />

                {/* Status Indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-body, inherit)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted, #666)',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: isScanning ? 'var(--accent, #E40028)' : '#444',
                        animation: isScanning ? 'pulse 1.5s infinite' : 'none',
                    }} />
                    {isScanning ? 'LIVE MONITORING' : 'STANDBY'}
                </div>

                {/* Grid Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }} />

                {/* Loading State */}
                {!svgLoaded && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted, #666)',
                        fontFamily: 'var(--font-body, inherit)',
                        fontSize: '0.875rem',
                    }}>
                        Loading map...
                    </div>
                )}
            </div>

            <style>{`
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
                
.deep-map-container {
    display: flex;
}

@media(max-width: 768px) {
    .deep-map-container {
        flex-direction: column-reverse;
        height: auto !important;
    }
    .deep-map-container > div:first-child {
        width: 100% !important;
        height: 300px;
    }
    .deep-map-container > div:last-child {
        height: 300px;
    }
}
`}</style>
        </div>
    );
};

export default DeepMapViz;
