export interface Milestone {
    id: string;
    title: string;
    months: string;
    objective: string;
    unlocks: string[];
    capitalDeployed: string[];
    outcome: string;
}

export interface AllocationItem {
    category: string;
    amount: string; // Keeping as string to preserve '$' and 'k' formatting exactly
    value: number; // For the bar chart visualization
}

export interface UseOfFundsConfig {
    pageTitle: string;
    thesis: {
        headline: string;
        content: string[];
        subContent: string;
    };
    raiseOverview: {
        title: string;
        points: string[];
    };
    milestones: Milestone[];
    allocation: {
        title: string;
        items: AllocationItem[];
        total: string;
        note: string;
    };
    efficiencyMetrics: {
        title: string;
        intro: string;
        metrics: string[]; // "Signal Chips"
        closing: string;
    };
    investorSummary: {
        title: string;
        content: string;
    };
    disciplineStatement: {
        title: string;
        content: string;
    };
}

export const USE_OF_FUNDS_CONFIG: UseOfFundsConfig = {
    pageTitle: "Use of Funds - Milestone-Based Plan",
    thesis: {
        headline: "Capital Is a Tool to De-Risk the Business, Not to Fund Exploration",
        content: [
            "We are raising this pre-seed round to achieve a **specific, measurable set of milestones** that materially de-risk Arrest Delta and position the company for a strong Series A.",
            "We are not using this capital to “find product-market fit.”"
        ],
        subContent: "We are using it to **prove it, harden it, and scale it responsibly**."
    },
    raiseOverview: {
        title: "Total Capital Raised",
        points: [
            "$1.0m pre-seed investment",
            "Founder runway and core technical development already in place",
            "Capital deployed with strict discipline across commercial, technical, and risk milestones"
        ]
    },
    milestones: [
        {
            id: "m1",
            title: "Enterprise Validation",
            months: "Months 0-4",
            objective: "Prove that enterprises will pay for Arrest Delta and deploy it in live environments.",
            unlocks: [
                "1-2 paid design partner agreements",
                "Clear pilot success criteria defined with enterprise buyers",
                "Validation of pricing, scope, and procurement pathway"
            ],
            capitalDeployed: [
                "Sales execution and travel",
                "Legal review of pilot agreements",
                "Limited marketing to support credibility (content, materials)"
            ],
            outcome: "Paid pilots in production-adjacent environments with real accountability."
        },
        {
            id: "m2",
            title: "Signal Quality & Trust",
            months: "Months 3-6",
            objective: "Demonstrate that Arrest Delta materially reduces false positives and improves confidence in arrest-change detection.",
            unlocks: [
                "Live validation of verification logic",
                "Evidence of reduced manual review and alert noise",
                "Auditability suitable for Trust & Safety and Legal teams"
            ],
            capitalDeployed: [
                "Infrastructure scaling",
                "Data normalization and verification refinement",
                "Security and compliance hardening"
            ],
            outcome: "Proof that Arrest Delta delivers *decision-grade* intelligence, not raw data."
        },
        {
            id: "m3",
            title: "Reference Customers & ARR",
            months: "Months 6-9",
            objective: "Convert early pilots into long-term enterprise contracts and establish reference credibility.",
            unlocks: [
                "3-4 enterprise customers under contract",
                "$500k-$700k ARR",
                "At least one referenceable customer"
            ],
            capitalDeployed: [
                "Hiring of one enterprise account executive",
                "Continued GTM execution",
                "Customer success support"
            ],
            outcome: "Repeatable enterprise sales motion with reference support."
        },
        {
            id: "m4",
            title: "Scalable Growth Foundation",
            months: "Months 9-12",
            objective: "Prepare the business for sustained growth and Series A readiness.",
            unlocks: [
                "6 enterprise customers live",
                "$1m+ ARR run rate",
                "$3m+ qualified pipeline",
                "Expansion path for additional “Delta” products"
            ],
            capitalDeployed: [
                "GTM acceleration",
                "Expanded jurisdiction coverage",
                "Legal, compliance, and procurement readiness"
            ],
            outcome: "A de-risked, enterprise-validated company ready for Series A."
        }
    ],
    allocation: {
        title: "Capital Allocation Summary",
        items: [
            { category: "Sales & Marketing / GTM", amount: "$250k", value: 250000 },
            { category: "Marketing & Authority Building", amount: "$150k", value: 150000 },
            { category: "Legal & Compliance", amount: "$75k", value: 75000 },
            { category: "Cloud & Infrastructure", amount: "$150k", value: 150000 },
            { category: "Contingency & Runway Buffer", amount: "$200k", value: 200000 },
            { category: "Flex / Optionality", amount: "$175k", value: 175000 }
        ],
        total: "$1.0m",
        note: "We intentionally avoid over-investing in headcount or marketing until validation milestones are met."
    },
    efficiencyMetrics: {
        title: "How We Measure Capital Efficiency",
        intro: "We evaluate capital deployment against:",
        metrics: [
            "Pilot-to-contract conversion",
            "False-positive reduction metrics",
            "Sales cycle duration",
            "Reference readiness",
            "Pipeline coverage (≥3:1)"
        ],
        closing: "Capital is only deployed further once milestones are met."
    },
    investorSummary: {
        title: "Investor Summary (One Line)",
        content: "This capital allows us to convert enterprise validation into repeatable revenue, prove signal quality at scale, and reach $1m+ ARR with reference customers, without premature scaling."
    },
    disciplineStatement: {
        title: "Final Discipline Statement",
        content: "If we do not meet these milestones within the expected timeframe, we will **not** increase burn or scale prematurely. We will reassess scope, positioning, or focus before deploying additional capital."
    }
};
