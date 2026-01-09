# Changelog: Technical Appendix — System Logic

## [1.0.0] - 2026-01-09
### Added
- Created new grouped deck page: `technical-appendix-system-logic`.
- Created typed config `technicalAppendixSystemLogicConfig.ts`.
- Sourced content from:
    - `ArrestDelta - Product flow.md`
    - `Technical Appendix (System Overview).md`
    - `Technical Breakdown by Flow Step.md`

### Modifications (Overlay Edits)
*Changes made to canonical text for deck context:*

#### Intro
- Added neutral framing line: "Architecture intent: detection → identity certainty → verification → routing."

#### Product Flow
- No text changes.
- Visual hierarchy: Step 4 (Verification Gate) highlighted as per design instructions.

#### System Overview
- Preserved verbatim structure.
- Formatted "Processing Flow" as a list of steps for readability in the appendix panel.

#### Technical Breakdown
- Preserved verbatim structure.
- Mapped "What happens technically" bullets to `technicalDetails` array.
- Extracted "Key design principle" to `designPrinciple` field.

### Risk & Compliance Check
- [x] No performance guarantees (latency/real-time) added.
- [x] No coverage scale claims added.
- [x] Biometric references include "where legally permitted" qualifier.
- [x] Design does not use biometric/surveillance imagery.
