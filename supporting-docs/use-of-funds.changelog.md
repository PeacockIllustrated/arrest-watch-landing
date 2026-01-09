# Changelog: Use of Funds & Milestones Page

## Overview
Created a new investor deck page `UseOfFunds.tsx` sourcing content strictly from `ArrestDelta - Use of Funds _ Milestones.md`.

## Changes

### 1. New Page: Use of Funds
- **Created** `app/src/pages/investor/UseOfFunds.tsx`.
- **Created** `app/src/lib/useOfFundsConfig.ts` to Type and store canonical content.
- **Added Route**: `/investor-delta/appendix/use-of-funds`.

### 2. Navigation & Deck Hub
- **Modified** `Slide13_Raise.tsx`: Added a "VIEW DETAILED MILESTONE PLAN →" link to the new page.
- **Modified** `lib/decks.ts`: Registered "USE OF FUNDS" deck with ID `use-of-funds`. It now appears in the Deck Hub (`/decks`) and integration with the provisioning system is automatic.
- **Navigation Update**: Implemented standard "Navigation Dots" at the bottom of `UseOfFunds.tsx` to align with the Investor Pack navigation system. Includes hover states, click-to-scroll, and active index tracking.

### 3. Content Adjustments from Canonical
| Section | Original | Implementation | Reason |
| :--- | :--- | :--- | :--- |
| **All** | Markdown Text | Rendered via React/CSS | Design fidelity |
| **Milestones** | List Format | Interactive "Ops Console" | Improved comprehension |
| **Allocation** | Table | Toggleable Table/Bar Chart | Visual budget lens |
| **Efficiency** | List | "Signal Chips" | visual clarity |

### 4. Refactoring (Brand Alignment)
- **Components**: Replaced generic divs with `RadarNode` and `GlassPanel`.
- **Typography**: Updated headers to use `text-huge` and `text-large`.
- **Visuals**:
    - Added `RadarNode` background to Thesis/Summary.
    - Fixed `RadarNode` centering and animation (switched to `type="radar"`).
    - Improved Milestone button contrast.
    - **Allocation Layout**: Tightened table padding and added margin to footer note to prevent overlap with navigation dots.

## Deviations
- None. All numbers and copy match the canonical markdown verbatim.
