import React from 'react';
import { Card, CardHeader, CardBody } from '../ui';

// =============================================================================
// DEMOGRAPHICS CHART - Horizontal bar chart for demographic breakdowns
// =============================================================================

interface DemographicItem {
  label: string;
  count: number;
  percent: number;
}

interface DemographicsChartProps {
  title?: string;
  data: DemographicItem[];
  maxBars?: number;
  barColor?: string;
  showCount?: boolean;
}

export const DemographicsChart: React.FC<DemographicsChartProps> = ({
  title = 'Demographics',
  data,
  maxBars = 8,
  barColor = 'var(--accent)',
  showCount = true,
}) => {
  // Sort by count descending and limit
  const sortedData = [...data]
    .sort((a, b) => b.count - a.count)
    .slice(0, maxBars);

  // Find max percent for scaling
  const maxPercent = Math.max(...sortedData.map((d) => d.percent), 1);

  if (sortedData.length === 0) {
    return (
      <Card>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
            }}
          >
            No demographic data available
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sortedData.map((item, index) => (
            <div key={`${item.label}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Label */}
              <div
                style={{
                  width: '80px',
                  flexShrink: 0,
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
                title={item.label}
              >
                {item.label}
              </div>

              {/* Bar container */}
              <div
                style={{
                  flex: 1,
                  height: '20px',
                  background: 'var(--accent-muted, rgba(228, 0, 40, 0.1))',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Filled bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${(item.percent / maxPercent) * 100}%`,
                    background: barColor,
                    opacity: 0.8,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>

              {/* Percentage and count */}
              <div
                style={{
                  width: showCount ? '80px' : '50px',
                  flexShrink: 0,
                  textAlign: 'right',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                }}
              >
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {item.percent.toFixed(1)}%
                </span>
                {showCount && (
                  <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                    ({item.count.toLocaleString()})
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

// =============================================================================
// DEMOGRAPHICS PANEL - Combined view for all demographic categories
// =============================================================================

interface DemographicsBreakdown {
  bySex: DemographicItem[];
  byRace: DemographicItem[];
  byAgeGroup: DemographicItem[];
}

interface DemographicsPanelProps {
  demographics: DemographicsBreakdown;
  showCount?: boolean;
}

export const DemographicsPanel: React.FC<DemographicsPanelProps> = ({
  demographics,
  showCount = true,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DemographicsChart
        title="By Sex"
        data={demographics.bySex}
        barColor="var(--accent)"
        showCount={showCount}
      />
      <DemographicsChart
        title="By Race"
        data={demographics.byRace}
        barColor="var(--info, #3b82f6)"
        showCount={showCount}
      />
      <DemographicsChart
        title="By Age Group"
        data={demographics.byAgeGroup}
        barColor="var(--success)"
        showCount={showCount}
      />
    </div>
  );
};

export default DemographicsChart;
