# Competitive Landscape — Content Changelog

**Source:** `/supporting-docs/ArrestDelta - Competitive Landscape.md`
**Implementation:** `lib/competitiveLandscapeConfig.ts` & `pages/investor/CompetitiveLandscape.tsx`

This document tracks all changes made to the original source text during implementation.

---

## 1. High-Risk Content Redaction (Source Gating)

**Rule:** You may only display numeric valuation/market-cap figures IF they are already sourced inside the repo.
**Status:** No `sources.md` or citations found in repo.
**Action:** All specific valuation numbers were redacted and replaced with neutral, qualitative descriptors found elsewhere in the text or generally descriptive of the category level.

| Company | Original Claim | New Display Text | Reason |
|---------|----------------|------------------|--------|
| **Checkr** | "$4B–$5B+ valuation" | "large, monetised incumbent" | Uncited financial figure |
| **HireRight** | "market cap historically $1–2B" | "public-scale platform" | Uncited financial figure |
| **Sterling** | "historically $1–1.5B" | "public-scale platform" | Uncited financial figure |
| **First Advantage** | "market cap historically $3–4B" | "public-scale platform" | Uncited financial figure |
| **Certn** | "estimated $200–400M" | "meaningful venture-backed player" | Uncited financial figure |
| **GoodHire** | "estimated $100–200M" | "meaningful venture-backed player" | Uncited financial figure |
| **LexisNexis Risk** | "implied business value $10B+" | "massive data incumbent" | Uncited financial figure |
| **TR CLEAR** | "implied multi-billion-dollar segment" | "massive data incumbent" | Uncited financial figure |
| **TransUnion** | "market cap historically $10–15B" | "massive data incumbent" | Uncited financial figure |
| **Babel Street** | "estimated $500M–$1B" | "established investigator tool" | Uncited financial figure |

---

## 2. Structural/Visual Adaptations

These are presentation-layer changes, not content modifications:

*   **Ecosystem Grid:** Interactive console allowing users to expand categories for details.
*   **Thesis Presentation:** Split into a "Timeliness" vs "Confidence" toggle to illustrate the market gap, replacing a static header.
*   **Micro-Visual:** Added "Stateful vs Event" visual in Differentiation slide to illustrate the concept.
*   **Slide Structure:** Converted the category list into individual horizontal slides for depth, as per "One Bucket Per Slide" requirement.

---

## No Other Content Modifications

The following canonical elements were preserved **verbatim** (or with minor punctuation fixes):

- All "What they do" bullets
- All "Structural limitation" bullets
- All "Key Takeaway" statements
- DIFFERENTIATION points
- STANDALONE COMPANY rationale
- INVESTOR SUMMARY statement
