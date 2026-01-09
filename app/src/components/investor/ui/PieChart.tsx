import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PieData {
    label: string;
    value: number;
    color: string;
}

interface PieChartProps {
    data: PieData[];
    size?: number;
    innerRadius?: number; // 0 for pie, >0 for donut
}

const PieChart: React.FC<PieChartProps> = ({
    data,
    size = 400,
    innerRadius = 120
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = size / 2;
    const center = size / 2;

    let startAngle = 0;

    // Helper to converting degrees to radians
    const degToRad = (deg: number) => (deg - 90) * (Math.PI / 180);

    // Helper to calculate coordinates
    const getCoordinatesForPercent = (percent: number) => {
        const x = center + radius * Math.cos(degToRad(percent * 360));
        const y = center + radius * Math.sin(degToRad(percent * 360));
        return [x, y];
    };

    const slices = data.map((item, index) => {
        const sliceAngle = (item.value / total) * 360;
        const endAngle = startAngle + sliceAngle;

        // Calculate path
        const x1 = center + radius * Math.cos(degToRad(startAngle));
        const y1 = center + radius * Math.sin(degToRad(startAngle));
        const x2 = center + radius * Math.cos(degToRad(endAngle));
        const y2 = center + radius * Math.sin(degToRad(endAngle));

        const x3 = center + innerRadius * Math.cos(degToRad(endAngle));
        const y3 = center + innerRadius * Math.sin(degToRad(endAngle));
        const x4 = center + innerRadius * Math.cos(degToRad(startAngle));
        const y4 = center + innerRadius * Math.sin(degToRad(startAngle));

        const largeArcFlag = sliceAngle > 180 ? 1 : 0;

        const pathData = [
            `M ${x1} ${y1}`, // Move to outer start
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
            `L ${x3} ${y3}`, // Line to inner end
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`, // Inner arc (reverse)
            `Z` // Close
        ].join(' ');

        const currentStartAngle = startAngle;
        startAngle += sliceAngle;

        return {
            ...item,
            path: pathData,
            startAngle: currentStartAngle,
            endAngle,
            centerAngle: currentStartAngle + (sliceAngle / 2)
        };
    });

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: size, aspectRatio: '1', margin: '0 auto' }}>
            <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%' }}>
                <AnimatePresence>
                    {slices.map((slice, index) => (
                        <motion.path
                            key={index}
                            d={slice.path}
                            fill={slice.color}
                            stroke="rgba(0,0,0,0.5)"
                            strokeWidth="2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                                scale: hoveredIndex === index ? 1.05 : 1
                            }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                originX: "50%",
                                originY: "50%",
                                cursor: 'crosshair'
                            }}
                        />
                    ))}
                </AnimatePresence>
            </svg>

            {/* Center Text (Total or Hovered Value) */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                {hoveredIndex !== null ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key="hovered"
                    >
                        <div className="text-muted text-mono" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                            {data[hoveredIndex].label}
                        </div>
                        <div className="text-red" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            ${(data[hoveredIndex].value / 1000).toFixed(0)}k
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                            {((data[hoveredIndex].value / total) * 100).toFixed(1)}%
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key="default"
                    >
                        <div className="text-muted text-mono" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>TOTAL DEPLOYMENT</div>
                        <div className="text-white" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                            ${(total / 1000000).toFixed(1)}m
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default PieChart;
