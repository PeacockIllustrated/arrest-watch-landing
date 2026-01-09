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
        headline: "We Size the Market From Where We Can Actually Sell",
        subheadline: "We do not start with abstract global TAM.",
        keyPoints: [
            "We size the market from buyers who already make arrest-related decisions today, have budget authority, and feel the cost of false positives and stale data.",
            "Our approach is serviceable-first, expandable-by-design."
        ]
    },

    coreAssumption: {
        eyebrow: "CORE ASSUMPTION",
        headline: "Enterprise Decision Infrastructure",
        description: "ArrestDelta is sold as enterprise decision infrastructure, not a per-check commodity.",
        bullets: [
            "Enterprise contracts",
            "Multi-year potential",
            "ACV expands with: Coverage, Geography, Additional \"Delta\" products, Depth of workflow integration"
        ]
    },

    sam: {
        eyebrow: "SERVICEABLE AVAILABLE MARKET (SAM)",
        headline: "Near-Term Target",
        targetBuyerUniverse: {
            title: "Target Buyer Universe (Year 1–3)",
            description: "We focus initially on enterprises that:",
            criteria: [
                "Make ongoing arrest-related decisions",
                "Already spend on background checks, monitoring, or internal review",
                "Face legal or reputational exposure from false positives"
            ]
        },
        primarySegments: [
            { id: "gig", name: "Gig & marketplace platforms" },
            { id: "bgc", name: "Background screening providers (as customers/partners)" },
            { id: "regulated", name: "Regulated enterprises with continuous risk review" }
        ],
        buyerCount: {
            range: "~1,000–1,500",
            footnote: "Directional estimate based on category counts across public company lists and known platform categories.",
            geographicFocus: "Initial geographic focus: United States"
        },
        pricing: {
            acvRange: "$150k–$250k",
            midpoint: "$175k",
            anchoringNote: "Anchored to existing enterprise spend on screening, monitoring, and manual review workflows."
        },
        calculation: {
            formula: "1,000 enterprises × $175k ACV",
            result: "$175M",
            contextNote: "This is the near-term US-focused serviceable market."
        }
    },

    som: {
        eyebrow: "SERVICEABLE OBTAINABLE MARKET (SOM)",
        headline: "First 36 Months",
        penetrationAssumption: {
            title: "Conservative Capture Assumption",
            rate: "2–3% penetration of SAM over 3 years"
        },
        range: {
            customers: "20–30 enterprise customers",
            arr: "$3.5M–$5.5M ARR"
        },
        alignment: "This aligns directly with our GTM plan and revenue model."
    },

    expansionLevers: [
        {
            id: "customer",
            number: "1",
            title: "Customer Expansion",
            bullets: [
                "More enterprises with Trust & Safety, Risk, or Compliance exposure",
                "International expansion beyond the US"
            ]
        },
        {
            id: "product",
            number: "2",
            title: "Product Expansion (\"Delta Stack\")",
            bullets: [
                "ArrestDelta is the first product.",
                "Natural adjacencies: Custody status changes, Court outcomes, Charge disposition, Warrant activity, Expungements and corrections"
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
            note: "This supports mid-six-figure and seven-figure contracts over time."
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
            note: "Distribution through partners increases reach without linear sales headcount."
        }
    ],

    tao: {
        eyebrow: "TOTAL ADDRESSABLE OPPORTUNITY",
        headline: "Directional, Not Inflated",
        disclaimer: "We do not present a single \"$XXB TAM\" number.",
        considerations: [
            "Global enterprise buyers",
            "Multiple Delta products",
            "Deep workflow integration"
        ],
        conclusion: "The opportunity supports multi-billion-dollar potential if ArrestDelta becomes the standard layer for arrest-related change intelligence."
    },

    ventureScale: {
        eyebrow: "VENTURE SCALE",
        headline: "Why This Is Venture-Scale",
        attributes: [
            "High ACV",
            "Strong expansion dynamics",
            "Infrastructure-level embedding",
            "Durable customer relationships",
            "Clear path from $1M → $10M → $100M ARR"
        ],
        closingStatement: "This is not a volume business.",
        positioning: "It is a trust-and-decision business, which historically supports large, defensible companies."
    },

    investorSummary: {
        eyebrow: "INVESTOR SUMMARY",
        summary: "We are targeting a conservative $175M serviceable market today, with clear expansion paths that support a multi-billion-dollar opportunity as ArrestDelta becomes embedded decision infrastructure."
    },

    slideNavTitles: [
        "Thesis", "Core", "SAM", "SOM", "Expansion", "Scale", "Summary"
    ]
};

export default MARKET_SIZING_CONFIG;
