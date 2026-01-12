/**
 * Leadership Bios Configuration
 * Data for the Leadership section on the Data Room page
 */

export interface LeadershipBio {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string | null;
    email?: string;
}

export const LEADERSHIP_BIOS: LeadershipBio[] = [
    {
        id: 'michael-king',
        name: 'michael king',
        role: 'Founder & CEO',
        bio: `Michael King is the Founder and CEO of Arrest Delta, bringing over 25 years of experience building, scaling, and commercializing mission-critical technology businesses in complex, high-stakes environments. Throughout his career, Michael has operated at the intersection of revenue, operations, and execution, responsible for turning technically complex products into scalable, enterprise-grade platforms trusted by large organizations. He has repeatedly led go-to-market strategy, built durable sales models, and driven growth where accuracy, reliability, and accountability were non-negotiable.

Michael founded Arrest Delta after repeatedly seeing a gap between how organizations should act on sensitive data and the unreliable, noisy signals they are often forced to rely on. His focus is ensuring Arrest Delta is built not as a data product, but as decision infrastructure, designed to surface verified change, reduce false positives, and integrate cleanly into real operational workflows.

As CEO, Michael is responsible for ensuring Arrest Delta scales with the same discipline he has applied throughout his career: clear accountability, rigorous execution, and an uncompromising focus on trust. His leadership ensures the platform meets the standards required by enterprises and public-safety organizations operating in environments where mistakes carry real consequences.`,
        image: 'founder.png',
        email: 'michael@arrestdelta.com',
    },
    {
        id: 'tom-peacock',
        name: 'tom peacock',
        role: 'Co-founder & CTO',
        bio: `Tom Peacock is Co-founder & CTO at Arrest Delta, leading product engineering end-to-end - from workflow-first UX and information architecture through to data modelling, authentication/RBAC, and production deployment.

He builds the trust layer that makes Arrest Delta defensible in high-stakes environments: strict validation, explicit permissions, audit trails, and monitoring that keeps behaviour inspectable. His focus is simple: reduce noise, prevent unverified signals from becoming actions, and surface change only when it's confirmed.

Tom's ethos is preventative engineering - identify failure modes early, design systems that are hard to misuse, and ship with discipline. He's driven by turning ambiguity into verified state transitions teams can act on with confidence.`,
        image: 'co-founder.png',
        email: 'tom@arrestdelta.com',
    },
    {
        id: 'mark-collins',
        name: 'mark collins',
        role: 'Senior Policing Advisor',
        bio: `At Arrest Delta, Mark brings the perspective of a senior policing leader who was ultimately accountable for high-risk operational decisions. Having served as both Chief Constable in the UK and Police Commissioner of the Virgin Islands, Mark spent decades making time-critical decisions based on incomplete and rapidly changing information, where acting on outdated or unverified data carried real consequences. His role at ArrestDelta is to ensure the platform reflects how senior law risk leaders actually make decisions: by detecting meaningful change, validating it rigorously, and enabling action only when the signal can be trusted.`,
        image: 'mark.png',
    },
];

