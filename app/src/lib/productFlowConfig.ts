export const PRODUCT_FLOW_CONFIG = {
    meta: {
        title: 'ArrestDelta - Product Flow',
        subheading: 'How verified change becomes a safe, actionable signal'
    },
    slideNavTitles: ['THESIS', 'INFRASTRUCTURE', 'IMPACT'],
    intro: {
        paragraph1: 'ArrestDelta sits between fragmented public records and enterprise decision systems.',
        paragraph2: 'Rather than surfacing raw events, the platform detects and verifies state change before any alert is issued.',
        paragraph3: 'The flow below illustrates how provisional signals are filtered, confirmed, and escalated only when confidence thresholds are met.'
    },
    steps: [
        {
            id: 'ingestion',
            stepNumber: 1,
            title: 'Public Records Ingestion',
            description: 'County and jurisdictional sources with variable structure, latency, and completeness.'
        },
        {
            id: 'detection',
            stepNumber: 2,
            title: 'Provisional Signal Detection',
            description: 'Initial booking or custody events are detected but treated as provisional.'
        },
        {
            id: 'resolution',
            stepNumber: 3,
            title: 'Identity Resolution',
            description: 'Records are resolved against an established identity reference using multiple signals, which may include biometric confirmation where legally permitted, to eliminate ambiguity and false matches.'
        },
        {
            id: 'verification',
            stepNumber: 4,
            title: 'Verification Gate',
            description: 'State transitions are confirmed and confidence thresholds applied. Noise and incomplete signals are suppressed.',
            isGate: true
        },
        {
            id: 'routing',
            stepNumber: 5,
            title: 'Actionable Alert Routing',
            description: 'Only verified, high-confidence changes are routed to Trust & Safety, Legal, or Security teams.'
        }
    ],
    closing: {
        text: 'Verification occurs before alerts, not after.'
    }
};
