# Market Sizing Deck - Content Changelog

**Source:** `/supporting-docs/Market Sizing.md`
**Implementation:** `lib/marketSizingConfig.ts` & `pages/investor/MarketSizing.tsx`

This document tracks all changes made to the original source text during the implementation of the investor deck section.

## 1. Buyer Count Defensibility (SAM)

*   **Original:** `~1,000–1,500 enterprises globally meet these criteria`
*   **Overlay:** Added footnote: *"Directional estimate based on category counts across public company lists and known platform categories."*
*   **Reason:** **Defensibility**. Clarifies methodology without adding new hard numbers.

## 2. ACV Anchoring (SAM)

*   **Original:** `$150k–$250k` (Average enterprise ACV)
*   **Overlay:** Added anchoring note: *"Anchored to existing enterprise spend on screening, monitoring, and manual review workflows."*
*   **Reason:** **Defensibility**. Grounds the pricing in existing budget buckets to avoid "arbitrary number" feel.

## 3. "Multi-billion Outcome" Risk Control (TAO)

*   **Original:** `The opportunity supports a **multi-billion-dollar outcome** if ArrestDelta becomes the standard layer...`
*   **Overlay:** `The opportunity supports multi-billion-dollar potential if ArrestDelta becomes the standard layer...`
*   **Reason:** **Risk Control**. Slight softening from definitive "outcome" to "potential" to avoid over-claiming, while preserving the core "if/then" logic.

## 4. Temporal Ambiguity (SAM)

*   **Original:** `This is the market we are actively selling into with ArrestDelta today.`
*   **Overlay:** `This is the near-term US-focused serviceable market.`
*   **Reason:** **Clarity/Risk**. "Today" can age poorly in static decks. "Near-term" is more precise for an investor presentation shelf-life.

## 5. Structural/Visual Adaptations

*   **Expansion Levers:** Converted list format to "Dossier Cards" for interactive disclosure.
*   **SAM Calculation:** Visualized as a "Command Calculator" interface.

## 6. Mobile Responsiveness & Polish

*   **Slide 4 (SOM):** Adjusted grid to stack vertically on mobile (<768px) and hid the vertical divider line.
*   **Slide 5 (Expansion):** Changed 4-column grid to single-column stack on mobile to prevent squished content.
*   **Slide 7 (Summary):**
    *   Redesigned for clarity: Shortened headline, replaced long quote with metric cards.
    *   Responsive Grid: Metric cards stack vertically on mobile.
    *   Font Sizes: Added `text-huge` and `text-large` overrides for mobile screens to prevent overflow.
