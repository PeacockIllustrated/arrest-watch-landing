/**
 * Market Sizing Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/Market Sizing.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * See /supporting-docs/market-sizing.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ThesisSection {
    eyebrow: string;
    headline: string;
    subheadline: string;
    keyPoints: string[];
}

export interface CoreAssumptionSection {
    eyebrow: string;
    headline: string;
    description: string;
    bullets: string[];
}

export interface BuyerSegment {
    id: string;
    name: string;
}

export interface SAMSection {
    eyebrow: string;
    headline: string;
    targetBuyerUniverse: {
        title: string;
        description: string;
        criteria: string[];
    };
    primarySegments: BuyerSegment[];
    buyerCount: {
        range: string;
        footnote: string; // OVERLAY: defensibility footnote
        geographicFocus: string;
    };
    pricing: {
        acvRange: string;
        midpoint: string;
        anchoringNote: string; // OVERLAY: ACV anchoring
    };
    calculation: {
        formula: string;
        result: string;
        contextNote: string; // OVERLAY: temporal clarity fix
    };
}

export interface SOMSection {
    eyebrow: string;
    headline: string;
    penetrationAssumption: {
        title: string;
        rate: string;
    };
    range: {
        customers: string;
        arr: string;
    };
    alignment: string;
}

export interface ExpansionLever {
    id: string;
    number: string;
    title: string;
    bullets: string[];
    note?: string;
}

export interface TAOSection {
    eyebrow: string;
    headline: string;
    disclaimer: string;
    considerations: string[];
    conclusion: string; // OVERLAY: conditional phrasing
}

export interface VentureScaleSection {
    eyebrow: string;
    headline: string;
    attributes: string[];
    closingStatement: string;
    positioning: string;
}

export interface InvestorSummarySection {
    eyebrow: string;
    summary: string;
}

export interface MarketSizingConfig {
    thesis: ThesisSection;
    coreAssumption: CoreAssumptionSection;
    sam: SAMSection;
    som: SOMSection;
    expansionLevers: ExpansionLever[];
    tao: TAOSection;
    ventureScale: VentureScaleSection;
    investorSummary: InvestorSummarySection;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const MARKET_SIZING_CONFIG: MarketSizingConfig = {
    thesis: {
        eyebrow: "MARKET SIZING",
        headline: "Real Demand, Real Budgets",
        subheadline: "We do not rely on abstract global TAM. We size from verified US workforce segments that require continuous monitoring.",
        keyPoints: [
            "We size the market from buyers who already make arrest-related decisions today, have budget authority, and feel the cost of false positives.",
            "Our approach is serviceable-first, focused on trust-critical US roles."
        ]
    },

    coreAssumption: {
        eyebrow: "PRICING MODEL",
        headline: "Enterprise Subscription",
        description: "ArrestDelta is sold as enterprise decision infrastructure with predictable annual billing.",
        bullets: [
            "Enterprise contracts, billed annually",
            "Per user / per month (PUPM) pricing model",
            "$8-$15 PUPM range (Average $12)"
        ]
    },

    sam: {
        eyebrow: "SERVICEABLE AVAILABLE MARKET (SAM)",
        headline: "Serviceable Market (US)",
        targetBuyerUniverse: {
            title: "Realistic US Buyers",
            description: "We focus on regulated and high-trust segments in the US workforce (~72-75M users):",
            criteria: [
                "Healthcare workers (~18M)",
                "Government & law enforcement (~22M)",
                "Education staff (~9M)",
                "Mobility / delivery / drivers (~12-15M)",
                "Other safety-critical roles (~10M)"
            ]
        },
        primarySegments: [
            { id: "healthcare", name: "Healthcare & Education Systems" },
            { id: "gov", name: "Federal & State Agencies" },
            { id: "mobility", name: "Mobility & Marketplace Platforms" }
        ],
        buyerCount: {
            range: "~73M Users",
            footnote: "Represents realistic US buyers we could sell into, even if not immediately targeted.",
            geographicFocus: "Focus: United States"
        },
        pricing: {
            acvRange: "$144",
            midpoint: "$144 / Year",
            anchoringNote: "Based on $12 PUPM blended enterprise average."
        },
        calculation: {
            formula: "73M users × $144 / year",
            result: "~$10.5B",
            contextNote: "Total Serviceable Available Market (US)."
        }
    },

    som: {
        eyebrow: "SERVICEABLE OBTAINABLE MARKET (SOM)",
        headline: "Initial Target Focus",
        penetrationAssumption: {
            title: "Target Customers (5-7 Year Horizon)",
            rate: "Enterprise Focus: Mobility, Healthcare, Agencies, & Large Orgs (>5k)"
        },
        range: {
            customers: "1,200 customers",
            arr: "~$300k ACV"
        },
        alignment: "Targeting ~1,000-1,500 enterprises. SOM estimate: ~$360M."
    },

    expansionLevers: [
        {
            id: "customer",
            number: "1",
            title: "Customer Expansion",
            bullets: [
                "More enterprises with Trust & Safety, Risk, or Compliance exposure",
                "Phased rollout within large organizations"
            ]
        },
        {
            id: "product",
            number: "2",
            title: "Product Expansion",
            bullets: [
                "ArrestDelta is the first product.",
                "Adjacencies: Court outcomes, Charge disposition, Warrant activity, Expungements"
            ],
            note: "Each expands ACV and wallet share."
        },
        {
            id: "integration",
            number: "3",
            title: "Depth of Integration",
            bullets: [
                "Alerts become workflow triggers",
                "Confidence scores inform automation",
                "ACV grows with dependency"
            ],
            note: "Supports deeper embedding and higher retention."
        },
        {
            id: "platform",
            number: "4",
            title: "Platform & Partner Distribution",
            bullets: [
                "Background screening providers",
                "Risk platforms",
                "Regulated service vendors"
            ],
            note: "Distribution through partners increases reach."
        }
    ],

    tao: {
        eyebrow: "TOTAL ADDRESSABLE MARKET (TAM)",
        headline: "US Workforce Opportunity",
        disclaimer: "Total Addressable Market based on full US employed population.",
        considerations: [
            "~160M employed individuals (US)",
            "Universal coverage potential",
            "$144 annual revenue per user"
        ],
        conclusion: "160M users × $144 / year = ~$23.0B TAM"
    },

    ventureScale: {
        eyebrow: "VENTURE SCALE",
        headline: "Value Drivers",
        attributes: [
            "High ACV ($250k-$500k blended early-stage)",
            "Strong expansion dynamics",
            "Infrastructure-level embedding",
            "Durable customer relationships",
            "Clear path to market leadership"
        ],
        closingStatement: "This is a trust-and-decision business.",
        positioning: "Accuracy compounds and switching costs increase over time."
    },

    investorSummary: {
        eyebrow: "INVESTOR SUMMARY",
        summary: "Targeting a ~$10.5B serviceable US market with a clear path to ~$360M SOM via high-ACV enterprise contracts."
    },

    slideNavTitles: [
        "Thesis", "Core", "SAM", "SOM", "Expansion", "Scale", "Summary"
    ]
};

export default MARKET_SIZING_CONFIG;
