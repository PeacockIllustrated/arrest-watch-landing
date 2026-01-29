import React, { useState, useMemo, useRef } from 'react';
import { Card, CardHeader, CardBody } from '../ui';
import type { DailyTrendPoint, TimeSeriesPoint } from '../../lib/types/viewModels';

// =============================================================================
// TREND CHART - SVG line chart for time series data
// =============================================================================

interface TrendChartProps {
  data: DailyTrendPoint[] | TimeSeriesPoint[];
  title?: string;
  valueKey?: 'totalBookings' | 'avgBond' | 'felonyCount' | 'value';
  height?: number;
  showGrid?: boolean;
  lineColor?: string;
  fillGradient?: boolean;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  date: string;
  value: number;
}

const PADDING = { top: 20, right: 20, bottom: 30, left: 50 };

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  title = 'Trend',
  valueKey = 'totalBookings',
  height = 200,
  showGrid = true,
  lineColor = 'var(--accent)',
  fillGradient = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    date: '',
    value: 0,
  });

  // Get value from data point based on valueKey
  const getValue = (point: DailyTrendPoint | TimeSeriesPoint): number => {
    if (valueKey === 'value' && 'value' in point) {
      return point.value;
    }
    if (valueKey in point) {
      const val = (point as DailyTrendPoint)[valueKey as keyof DailyTrendPoint];
      return typeof val === 'number' ? val : 0;
    }
    return 0;
  };

  // Get label from data point
  const getLabel = (point: DailyTrendPoint | TimeSeriesPoint): string => {
    if ('dateLabel' in point) return point.dateLabel;
    if ('label' in point) return point.label;
    return '';
  };

  // Calculate chart dimensions and scales
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return null;

    const width = 600; // Fixed internal width, will scale with viewBox
    const chartWidth = width - PADDING.left - PADDING.right;
    const chartHeight = height - PADDING.top - PADDING.bottom;

    const values = data.map(getValue);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Add 10% padding to value range
    const paddedMin = Math.max(0, minValue - valueRange * 0.1);
    const paddedMax = maxValue + valueRange * 0.1;
    const paddedRange = paddedMax - paddedMin;

    // Calculate points
    const points = data.map((point, index) => {
      const x = PADDING.left + (index / (data.length - 1 || 1)) * chartWidth;
      const normalizedValue = (getValue(point) - paddedMin) / paddedRange;
      const y = PADDING.top + chartHeight - normalizedValue * chartHeight;
      return { x, y, value: getValue(point), label: getLabel(point) };
    });

    // Create SVG path
    const pathD = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    // Create fill path (closed area under curve)
    const fillPathD = `${pathD} L ${points[points.length - 1].x} ${PADDING.top + chartHeight} L ${points[0].x} ${PADDING.top + chartHeight} Z`;

    // Calculate Y-axis ticks (5 ticks)
    const yTicks = Array.from({ length: 5 }, (_, i) => {
      const value = paddedMin + (paddedRange * i) / 4;
      const y = PADDING.top + chartHeight - (i / 4) * chartHeight;
      return { value: Math.round(value), y };
    });

    // Calculate X-axis labels (show ~5-7 labels)
    const xLabelInterval = Math.ceil(data.length / 6);
    const xLabels = data
      .filter((_, i) => i % xLabelInterval === 0 || i === data.length - 1)
      .map((_point, filteredIndex) => {
        const originalIndex = filteredIndex * xLabelInterval;
        const actualIndex = Math.min(originalIndex, data.length - 1);
        const x = PADDING.left + (actualIndex / (data.length - 1 || 1)) * chartWidth;
        return { label: getLabel(data[actualIndex]), x };
      });

    return {
      width,
      points,
      pathD,
      fillPathD,
      yTicks,
      xLabels,
      chartHeight,
      chartWidth,
    };
  }, [data, height, valueKey]);

  // Handle mouse events for tooltip
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartData || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const scaleX = chartData.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;

    // Find closest point
    let closestPoint = chartData.points[0];
    let closestDist = Infinity;

    chartData.points.forEach((point) => {
      const dist = Math.abs(point.x - mouseX);
      if (dist < closestDist) {
        closestDist = dist;
        closestPoint = point;
      }
    });

    if (closestDist < 30) {
      setTooltip({
        visible: true,
        x: closestPoint.x,
        y: closestPoint.y,
        date: closestPoint.label,
        value: closestPoint.value,
      });
    } else {
      setTooltip((prev) => ({ ...prev, visible: false }));
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  if (!chartData || data.length === 0) {
    return (
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div
            style={{
              height: `${height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            No trend data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody cardPadding="0">
        <div style={{ padding: '16px', paddingTop: '8px' }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${chartData.width} ${height}`}
            style={{
              width: '100%',
              height: `${height}px`,
              overflow: 'visible',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Gradient definition for fill */}
            {fillGradient && (
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
                </linearGradient>
              </defs>
            )}

            {/* Grid lines */}
            {showGrid &&
              chartData.yTicks.map((tick, i) => (
                <line
                  key={`grid-${i}`}
                  x1={PADDING.left}
                  y1={tick.y}
                  x2={PADDING.left + chartData.chartWidth}
                  y2={tick.y}
                  stroke="var(--border-subtle)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

            {/* Y-axis labels */}
            {chartData.yTicks.map((tick, i) => (
              <text
                key={`y-label-${i}`}
                x={PADDING.left - 8}
                y={tick.y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {tick.value.toLocaleString()}
              </text>
            ))}

            {/* X-axis labels */}
            {chartData.xLabels.map((label, i) => (
              <text
                key={`x-label-${i}`}
                x={label.x}
                y={height - 8}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="10"
                fontFamily="var(--font-body)"
              >
                {label.label}
              </text>
            ))}

            {/* Area fill */}
            {fillGradient && (
              <path
                d={chartData.fillPathD}
                fill="url(#areaGradient)"
                stroke="none"
              />
            )}

            {/* Main line */}
            <path
              d={chartData.pathD}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points (small circles) */}
            {chartData.points.map((point, i) => (
              <circle
                key={`point-${i}`}
                cx={point.x}
                cy={point.y}
                r={tooltip.visible && tooltip.x === point.x ? 5 : 3}
                fill={tooltip.visible && tooltip.x === point.x ? lineColor : 'var(--card-bg)'}
                stroke={lineColor}
                strokeWidth="2"
                style={{ transition: 'r 0.15s ease, fill 0.15s ease' }}
              />
            ))}

            {/* Tooltip */}
            {tooltip.visible && (
              <g>
                {/* Vertical line */}
                <line
                  x1={tooltip.x}
                  y1={PADDING.top}
                  x2={tooltip.x}
                  y2={PADDING.top + chartData.chartHeight}
                  stroke="var(--text-muted)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                  opacity="0.5"
                />
                {/* Tooltip box */}
                <rect
                  x={tooltip.x - 45}
                  y={tooltip.y - 40}
                  width="90"
                  height="32"
                  rx="0"
                  fill="var(--surface)"
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                />
                <text
                  x={tooltip.x}
                  y={tooltip.y - 28}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontSize="9"
                  fontFamily="var(--font-body)"
                >
                  {tooltip.date}
                </text>
                <text
                  x={tooltip.x}
                  y={tooltip.y - 14}
                  textAnchor="middle"
                  fill="var(--text-primary)"
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="var(--font-mono)"
                >
                  {tooltip.value.toLocaleString()}
                </text>
              </g>
            )}
          </svg>
        </div>
      </CardBody>
    </Card>
  );
};

export default TrendChart;
