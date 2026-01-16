import React, { useEffect, useRef, useState, useContext } from 'react';
import usaCountiesSvg from '../../assets/Usa_counties_large.svg';
import DemoSimContext from '../../context/DemoSimContext';

// =============================================================================
// STATE MAP PREVIEW - Simplified state-focused map for Source Health page
// =============================================================================

interface StateMapPreviewProps {
    stateId: string; // SVG group ID like 'Florida'
    height?: string;
    aspectRatio?: string; // e.g. '1 / 1' for square
}

/**
 * A simplified map component that shows only a single state zoomed to fit.
 * Applies health overlays from DemoSimContext.
 * Uses viewBox zooming with overflow hidden instead of hiding elements.
 */
const StateMapPreview: React.FC<StateMapPreviewProps> = ({
    stateId,
    height = '300px',
    aspectRatio = '1 / 1',
}) => {
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Get health data from context
    const demoSim = useContext(DemoSimContext);

    // Load and configure SVG
    useEffect(() => {
        let cancelled = false;

        const loadSvg = async () => {
            if (!svgContainerRef.current) return;

            // Reset state
            setLoaded(false);
            setError(false);
            svgRef.current = null;

            // Clear the container
            svgContainerRef.current.innerHTML = '';

            try {
                const response = await fetch(usaCountiesSvg);
                const svgText = await response.text();

                if (cancelled || !svgContainerRef.current) return;

                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = doc.querySelector('svg');

                if (!svgElement) {
                    setError(true);
                    return;
                }

                // Clean out embedded styles
                svgElement.querySelectorAll('style').forEach((s) => s.remove());
                svgElement.querySelectorAll('defs style').forEach((s) => s.remove());

                // Add our styles to defs
                let defs = svgElement.querySelector('defs');
                if (!defs) {
                    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    svgElement.prepend(defs);
                }

                const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                style.textContent = `
                    g[id] {
                        visibility: hidden;
                    }
                    g[id="${stateId}"] {
                        visibility: visible !important;
                    }
                    path {
                        fill: rgba(228, 0, 40, 0.3) !important;
                        stroke: #E40028 !important;
                        stroke-width: 0.6px !important;
                        transition: fill 0.3s ease;
                        cursor: pointer;
                    }
                    path:hover {
                        fill: rgba(228, 0, 40, 0.7) !important;
                    }
                    path[data-pulsing="true"] {
                        animation: countyPulse 0.4s ease-in-out 3;
                        fill: #E40028 !important;
                    }
                    path[data-health="degraded"] {
                        fill: rgba(255, 165, 0, 0.6) !important;
                        stroke: #ffa500 !important;
                    }
                    path[data-health="down"] {
                        fill: rgba(100, 100, 100, 0.5) !important;
                        stroke: #666666 !important;
                    }
                    @keyframes countyPulse {
                        0% { fill: #E40028 !important; opacity: 1; }
                        50% { fill: #E40028 !important; opacity: 0.4; }
                        100% { fill: #E40028 !important; opacity: 1; }
                    }
                    #borders, #separator, .separator, path[id*="separator"] {
                        display: none !important;
                    }
                `;
                defs.appendChild(style);

                // Set base attributes
                svgElement.setAttribute('width', '100%');
                svgElement.setAttribute('height', '100%');
                svgElement.style.width = '100%';
                svgElement.style.height = '100%';

                if (cancelled || !svgContainerRef.current) return;

                // Append first so we can get bounding box
                svgContainerRef.current.appendChild(svgElement);
                svgRef.current = svgElement;

                // Find the target state group and calculate viewBox
                const stateGroup = svgElement.querySelector(`g[id="${stateId}"]`) as SVGGraphicsElement;

                if (stateGroup) {
                    try {
                        const bbox = stateGroup.getBBox();
                        const padding = Math.max(bbox.width, bbox.height) * 0.15;

                        // Calculate square viewBox for 1:1 aspect ratio
                        const maxDim = Math.max(bbox.width, bbox.height) + padding * 2;
                        const centreX = bbox.x + bbox.width / 2;
                        const centreY = bbox.y + bbox.height / 2;

                        svgElement.setAttribute(
                            'viewBox',
                            `${centreX - maxDim / 2} ${centreY - maxDim / 2} ${maxDim} ${maxDim}`
                        );
                        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                    } catch (bboxError) {
                        console.warn('Could not get bbox, using default viewBox');
                        svgElement.setAttribute('viewBox', '0 0 960 600');
                    }
                } else {
                    // State not found - show full USA fallback
                    console.warn(`State "${stateId}" not found in SVG`);
                    svgElement.setAttribute('viewBox', '0 0 960 600');
                }

                if (!cancelled) {
                    setLoaded(true);
                }
            } catch (err) {
                console.error('Failed to load state map:', err);
                if (!cancelled) {
                    setError(true);
                }
            }
        };

        loadSvg();

        return () => {
            cancelled = true;
        };
    }, [stateId]);

    // Apply health overlays when countyHealth changes
    useEffect(() => {
        if (!svgRef.current || !demoSim?.countyHealth || !loaded) return;

        Object.entries(demoSim.countyHealth).forEach(([jurisdictionId, health]) => {
            const countyPath = svgRef.current?.querySelector(`path[id="${jurisdictionId}"]`);
            if (countyPath) {
                if (health.state === 'healthy') {
                    countyPath.removeAttribute('data-health');
                } else {
                    countyPath.setAttribute('data-health', health.state);
                }
            }
        });
    }, [demoSim?.countyHealth, loaded]);

    // Apply pulse effect
    useEffect(() => {
        if (!svgRef.current || !demoSim?.activePulse || !loaded) return;

        const { jurisdictionId } = demoSim.activePulse;
        const countyPath = svgRef.current.querySelector(`path[id="${jurisdictionId}"]`);

        if (countyPath) {
            countyPath.setAttribute('data-pulsing', 'true');
            const timeout = setTimeout(() => {
                countyPath.removeAttribute('data-pulsing');
            }, 1200);
            return () => clearTimeout(timeout);
        }
    }, [demoSim?.activePulse, loaded]);

    return (
        <div
            style={{
                width: '100%',
                height,
                aspectRatio,
                background: 'var(--bg-base, #050505)',
                border: '1px solid var(--card-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* SVG container */}
            <div
                ref={svgContainerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                }}
            />

            {/* Loading state */}
            {!loaded && !error && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                }}>
                    Loading map...
                </div>
            )}

            {/* Error state */}
            {error && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                }}>
                    Map unavailable
                </div>
            )}
        </div>
    );
};

export default StateMapPreview;
