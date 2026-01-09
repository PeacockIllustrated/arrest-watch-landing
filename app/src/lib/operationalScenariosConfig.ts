/**
 * Operational Scenarios Configuration
 * 
 * CANONICAL SOURCES: 
 * 1. /supporting-docs/Customer Risk Scenario Example.md
 * 2. /supporting-docs/Example Decision Scenario.md
 * 
 * All content preserved verbatim from original.
 */

export interface ScenarioStep {
    title: string;
    bullets: string[];
}

export interface ScenarioSection {
    eyebrow: string;
    headline: string;
    description: string;
    before: {
        title: string;
        steps: ScenarioStep[];
        result: string[];
        soundbite?: string;
    };
    after: {
        title: string;
        steps: ScenarioStep[];
        result: string[];
        soundbite?: string;
    };
    keyShift: string;
}

export interface OperationalScenariosConfig {
    pageTitle: string;
    pageSubtitle: string;
    scenarioA: ScenarioSection;
    scenarioB: ScenarioSection;
    slideNavTitles: string[];
}

export const OPERATIONAL_SCENARIOS_CONFIG: OperationalScenariosConfig = {
    pageTitle: "Operational Scenarios — Before / After",
    pageSubtitle: "Two canonical scenarios showing why verification must occur before alerts.",

    // SCENARIO A: Customer Risk Scenario
    scenarioA: {
        eyebrow: "SCENARIO A",
        headline: "Trust-Critical Workforce Role",
        description: "An individual is lawfully hired, passes a background check, and is granted system or physical access. Weeks or months later, the risk profile changes.",

        before: {
            title: "WITHOUT ArrestDelta (Current State)",
            steps: [
                {
                    title: "1. Point-in-time check",
                    bullets: [
                        "Background check clears at hiring",
                        "No persistent identity link is maintained"
                    ]
                },
                {
                    title: "2. Post-access blind spot",
                    bullets: [
                        "Arrest occurs after access is granted",
                        "Appears in fragmented county systems",
                        "Often delayed, incomplete, or name-only"
                    ]
                },
                {
                    title: "3. Discovery is reactive",
                    bullets: [
                        "Found via a refresh weeks later",
                        "A customer complaint",
                        "Media exposure",
                        "Law enforcement inquiry"
                    ]
                },
                {
                    title: "4. Manual scramble",
                    bullets: [
                        "Internal teams rush to verify if this is the same person",
                        "Access is suspended **after** exposure, not before"
                    ]
                }
            ],
            result: [
                "Unnecessary exposure window (days → weeks)",
                "High false-positive risk if action is rushed",
                "Legal and reputational fallout"
            ],
            soundbite: "“We find out something happened, then scramble to confirm it.”"
        },

        after: {
            title: "WITH ArrestDelta (Verification-First)",
            steps: [
                {
                    title: "1. Identity is resolved at onboarding",
                    bullets: [
                        "ArrestDelta establishes a persistent identity reference",
                        "Biometric-supported identity confirmation (where permitted)"
                    ]
                },
                {
                    title: "2. Continuous, state-aware monitoring",
                    bullets: [
                        "ArrestDelta monitors for **state transitions**, not raw events",
                        "Booking signals are treated as provisional",
                        "Noise and partial records are suppressed"
                    ]
                },
                {
                    title: "3. Verification before alerting",
                    bullets: [
                        "Identity confirmation is applied to the new record",
                        "State transition is verified (e.g. booking → confirmed arrest)",
                        "Confidence threshold is calculated"
                    ]
                },
                {
                    title: "4. Controlled alert delivery",
                    bullets: [
                        "Only once verification criteria are met",
                        "Alert is routed to Trust & Safety / Legal with context"
                    ]
                },
                {
                    title: "5. Measured response",
                    bullets: [
                        "Teams act with verified identity and verified change",
                        "Documented audit trail"
                    ]
                }
            ],
            result: [
                "Exposure window reduced **without increasing false positives**",
                "No reactive scramble",
                "Defensible, auditable decisions"
            ],
            soundbite: "“We confirm change first, then decide if action is warranted.”"
        },

        keyShift: "Action is triggered by *verified change*, not noisy detection."
    },

    // SCENARIO B: Decision Scenario
    scenarioB: {
        eyebrow: "SCENARIO B",
        headline: "Decision Logic & Exposure Control",
        description: "Reducing exposure without increasing false positives.",

        before: {
            title: "WITHOUT ArrestDelta",
            steps: [
                {
                    title: "Step 1",
                    bullets: ["Background check completed at onboarding"]
                },
                {
                    title: "Step 2",
                    bullets: ["No persistent identity reference maintained"]
                },
                {
                    title: "Step 3",
                    bullets: ["Arrest appears first as a provisional booking record"]
                },
                {
                    title: "Step 4",
                    bullets: ["Record is delayed, incomplete, or name-only"]
                },
                {
                    title: "Step 5",
                    bullets: ["Discovery occurs via periodic refresh, third-party notification, media, or external inquiry"]
                },
                {
                    title: "Step 6",
                    bullets: ["Internal teams rush to confirm identity and validity"]
                },
                {
                    title: "Step 7",
                    bullets: ["Action is taken after exposure, under time pressure"]
                }
            ],
            result: [
                "Reactive response, elevated false-positive risk, and limited auditability."
            ]
        },

        after: {
            title: "WITH ArrestDelta",
            steps: [
                {
                    title: "Step 1",
                    bullets: ["Identity is resolved and anchored at onboarding, using multi-signal verification which may include biometric confirmation where legally permitted"]
                },
                {
                    title: "Step 2",
                    bullets: ["ArrestDelta continuously monitors for state change"]
                },
                {
                    title: "Step 3",
                    bullets: ["Provisional signals are detected but suppressed"]
                },
                {
                    title: "Step 4",
                    bullets: ["Identity and state transition are verified first"]
                },
                {
                    title: "Step 5",
                    bullets: ["Confidence threshold is met before alerting"]
                },
                {
                    title: "Step 6",
                    bullets: ["Verified alert is routed with context and audit trail"]
                }
            ],
            result: [
                "Measured response, reduced exposure window, and defensible decision-making."
            ]
        },

        keyShift: "From reacting to ambiguous events to acting on identity-confirmed change."
    },

    slideNavTitles: ["Overview", "Risk Scenario", "Decision Logic"]
};
