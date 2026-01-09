# Customer Access & Targeting — Changelog

This file documents all edits made during the implementation of the Customer Access & Targeting investor deck page.

## Canonical Source
- **File**: `supporting-docs/ArrestDelta - Customer Access & Trageting.md`
- **Implementation Date**: 2026-01-09

---

## Edit Log

### Structural / Layout Edits (No Content Changes)

| Section | Edit Type | Before | After | Reason |
|---------|-----------|--------|-------|--------|
| Thesis | Layout | Two bullets as paragraph list | Two separate "PILLAR" cards | **Clarity** — Visual separation improves comprehension |
| Segments | Structure | Linear text blocks | 4-panel grid (Why, Roles, Strategy, Outcome) | **Clarity** — Easier to scan segment details |
| Marketing Role | Layout | Sequential list | Two-column comparator | **Clarity** — Direct juxtaposition of "does" vs "does not" |

---

### Copy Edits (Minimal Overlay)

| Location | Before (Canonical) | After (Displayed) | Reason |
|----------|-------------------|-------------------|--------|
| **None** | — | — | All copy preserved verbatim |

> **Note**: No textual edits were made to canonical content. All headings, bullets, and summary text match the source document exactly.

---

### Added Elements (Non-Canonical)

| Element | Content | Justification |
|---------|---------|---------------|
| Slide 2 instruction text | "Select a target segment to view access strategy and expected outcomes." | **Clarity** — UI affordance explanation only; introduces no claims |
| Dossier panel empty state | "SELECT A TARGET / Click a segment to view details" | **Clarity** — UI state indicator |
| Tooltip: Marketing Does | "Supports enterprise sales directly" | **Clarity** — Derived from canonical framing; logged here |
| Tooltip: Marketing Does Not | "Not aligned with high-trust enterprise sales" | **Clarity** — Derived from canonical framing; logged here |

---

### Preserved Verbatim (Critical Content)

The following content was preserved **exactly as written** in the canonical source:

- ✓ Segment names and "optional/primary" designations
- ✓ All "Why this segment" bullets
- ✓ All "Buyer roles" bullets
- ✓ All "Access strategy" bullets
- ✓ All "Marketing support" bullets
- ✓ All "Outcome" bullets (including exact quantities: "3–5", "2–4", "2–3")
- ✓ Marketing role "does" and "does not" lists
- ✓ Whitepaper title: "Why arrest monitoring fails at scale and how enterprises fix it"
- ✓ All buying triggers
- ✓ "Why this scales" bullets
- ✓ Investor Summary (complete, verbatim)
- ✓ "Permission to engage" line for Regulated Enterprises
- ✓ "Augmentation, not replacement" narrative for Screening Providers

---

## Files Created/Modified

| File | Action | Notes |
|------|--------|-------|
| `app/src/lib/customerAccessTargetingConfig.ts` | NEW | Typed config with all canonical content |
| `app/src/pages/investor/CustomerAccessTargeting.tsx` | NEW | 9-slide page component |
| `app/src/App.tsx` | MODIFIED | Added import and route only |
| `supporting-docs/customer-access-targeting.changelog.md` | NEW | This file |
| `supporting-docs/customer-access-targeting.selfcheck.md` | NEW | Self-verification |

---

## Review Checklist

- [x] No customer names/logos added beyond canonical
- [x] No new distribution channels added
- [x] No new buying triggers or roles invented
- [x] No traction claims made
- [x] All quantities match canonical source exactly
- [x] Existing pages untouched (route addition only)
