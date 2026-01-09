/**
 * Competitive Landscape Configuration
 * 
 * CANONICAL SOURCE: /supporting-docs/ArrestDelta - Competitive Landscape.md
 * All content preserved verbatim from original with minimal overlay improvements.
 * NUMERIC VALUATIONS REDACTED per High-Risk Content Rule (no sources in repo).
 * See /supporting-docs/competitive-landscape.changelog.md for tracked changes.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Player {
    name: string;
    description: string;
    showCompNumbers: boolean; // false by default per rule
}

export interface BucketSection {
    id: string;
    title: string;
    whatTheyDo: string[];
    structuralLimitations: string[];
    roleInEcosystem?: string; // Optional as not all have it explicitly in the same header format
    mainPlayers: Player[];
    keyTakeaway: string;
}

export interface ThesisSection {
    title: string;
    problemStatement: string;
}

export interface EcosystemGrid {
    rows: BucketSection[];
}

export interface DifferentiationSection {
    title: string;
    subtitle: string;
    points: string[];
    conclusion: string;
}

export interface StandaloneSection {
    title: string;
    reasons: string[];
    conclusion: string;
}

export interface CompetitiveLandscapeConfig {
    thesis: ThesisSection;
    ecosystem: EcosystemGrid;
    differentiation: DifferentiationSection;
    standalone: StandaloneSection;
    investorSummary: string;
    slideNavTitles: string[];
}

// ============================================================================
// CONFIGURATION DATA
// ============================================================================

export const COMPETITIVE_LANDSCAPE_CONFIG: CompetitiveLandscapeConfig = {
    thesis: {
        title: "The Market Has Moved Toward Timeliness — Not Toward Decision Confidence",
        problemStatement: "The arrest-data ecosystem has evolved toward faster detection, but the hardest problem remains unsolved: knowing whether an arrest record has meaningfully changed over time and whether that change is reliable enough to act on."
    },
    ecosystem: {
        rows: [
            {
                id: "traditional",
                title: "1. Traditional Background Checks (Point-in-Time)",
                whatTheyDo: [
                    "Establish an initial criminal history snapshot",
                    "Deeply embedded in onboarding and compliance workflows"
                ],
                structuralLimitations: [
                    "Static by design",
                    "No visibility into post-check changes",
                    "Not suitable for continuous operational decisions"
                ],
                roleInEcosystem: "Necessary foundation; insufficient for dynamic risk environments",
                mainPlayers: [
                    { name: "Checkr", description: "private; widely estimated large, monetised incumbent", showCompNumbers: false },
                    { name: "HireRight", description: "public; public-scale platform", showCompNumbers: false },
                    { name: "Sterling", description: "public; acquired/private again; public-scale platform", showCompNumbers: false },
                    { name: "First Advantage", description: "public; public-scale platform", showCompNumbers: false }
                ],
                keyTakeaway: "This is a large, monetised, slow-moving market optimised for checks, not change."
            },
            {
                id: "continuous",
                title: "2. Continuous Monitoring & Near-Real-Time Arrest Detection",
                whatTheyDo: [
                    "Detect new arrest events faster",
                    "Use direct integrations and pointer searches",
                    "Verify record existence at the county level"
                ],
                structuralLimitations: [
                    "Optimised for event detection, not ongoing record evolution",
                    "Arrests treated as discrete events, not stateful entities",
                    "Limited ability to distinguish: Material vs cosmetic changes, Stable vs provisional updates",
                    "High downstream manual review burden",
                    "False positives accrue after the initial arrest"
                ],
                roleInEcosystem: undefined,
                mainPlayers: [
                    { name: "Checkr Continuous Checks", description: "part of a multi-billion-dollar platform", showCompNumbers: false },
                    { name: "Certn", description: "private; meaningful venture-backed player", showCompNumbers: false },
                    { name: "GoodHire", description: "private; meaningful venture-backed player", showCompNumbers: false }
                ],
                keyTakeaway: "Frequency improves awareness, but does not deliver decision-grade confidence. This segment validates demand, but remains noise-heavy and operationally risky."
            },
            {
                id: "aggregators",
                title: "3. Data Aggregators & Investigative Platforms",
                whatTheyDo: [
                    "Aggregate public and proprietary records",
                    "Provide broad access to risk and investigative data"
                ],
                structuralLimitations: [
                    "No native concept of state transitions",
                    "Minimal verification of meaningful change",
                    "Interpretation pushed entirely to customers"
                ],
                roleInEcosystem: "Access layer, not decision layer",
                mainPlayers: [
                    { name: "LexisNexis Risk", description: "part of RELX; massive data incumbent", showCompNumbers: false },
                    { name: "Thomson Reuters CLEAR", description: "part of TR; massive data incumbent", showCompNumbers: false },
                    { name: "TransUnion", description: "public; massive data incumbent", showCompNumbers: false }
                ],
                keyTakeaway: "These companies are massive, but they sell data access, not decision certainty."
            },
            {
                id: "osint",
                title: "4. OSINT & Scraping-Based Platforms",
                whatTheyDo: [
                    "Powerful investigative tooling",
                    "Flexible, analyst-driven workflows"
                ],
                structuralLimitations: [
                    "Manual and operator-dependent",
                    "Not built for automated enterprise decisions",
                    "Not suitable for Trust & Safety workflows at scale"
                ],
                roleInEcosystem: undefined,
                mainPlayers: [
                    { name: "Babel Street", description: "private; established investigator tool", showCompNumbers: false },
                    { name: "ShadowDragon", description: "private; niche enterprise", showCompNumbers: false },
                    { name: "Maltego", description: "private; smaller, investigator-focused", showCompNumbers: false }
                ],
                keyTakeaway: "Strong tools, but not infrastructure."
            },
            {
                id: "internal",
                title: "5. Internal & Manual Systems (Hidden but Widespread)",
                whatTheyDo: [
                    "Custom scripts",
                    "Analyst workflows",
                    "Manual county checks"
                ],
                structuralLimitations: [
                    "Expensive, fragile, non-scalable",
                    "High human error",
                    "Significant compliance risk"
                ],
                roleInEcosystem: undefined,
                mainPlayers: [
                    { name: "Internal Systems", description: "Exists inside nearly every large enterprise", showCompNumbers: false }
                ],
                keyTakeaway: "Represents latent demand, not a competitive threat."
            }
        ]
    },
    differentiation: {
        title: "Where ArrestDelta Is Fundamentally Different",
        subtitle: "ArrestDelta does not compete on speed alone. It delivers:",
        points: [
            "Stateful change modeling, not event alerts",
            "Verification beyond record existence",
            "Biometric identity resolution (facial recognition) to reduce mis-attribution",
            "Confidence-weighted outputs, not raw updates"
        ],
        conclusion: "This combination materially reduces false positives and enables defensible action."
    },
    standalone: {
        title: "Why This Is a Standalone Company",
        reasons: [
            "Incumbents optimise for checks or access",
            "Verification + identity resolution increases complexity and liability",
            "Accuracy compounds with time, coverage, and learning"
        ],
        conclusion: "That makes ArrestDelta an independent infrastructure layer, not a feature."
    },
    investorSummary: "Multi-billion-dollar incumbents solve access and onboarding. ArrestDelta solves the unsolved layer: verified, identity-certain change detection enterprises can actually act on.",
    slideNavTitles: [
        "Thesis",
        "Landscape",
        "Different",
        "Standalone",
        "Summary"
    ]
};

export default COMPETITIVE_LANDSCAPE_CONFIG;
