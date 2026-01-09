**Canonical Risk Example (use this one)**

**Scenario: Trust-critical workforce role (e.g. rideshare, delivery, healthcare support, security contractor)**

**The real risk**

An individual is **lawfully hired**, passes a background check, and is granted system or physical access.

Weeks or months later:

* They are **arrested** for a serious offense  
* The record appears first as a **booking / holding event**  
* Identity data is **partial, delayed, or ambiguous**  
* No automatic alert reaches the employer

The organisation continues to grant access **without knowing the risk profile has changed**.

---

**BEFORE ArrestDelta (current state)**

**What happens today**

1. **Point-in-time check**  
   * Background check clears at hiring  
   * No persistent identity link is maintained  
2. **Post-access blind spot**  
   * Arrest occurs after access is granted  
   * Appears in fragmented county systems  
   * Often delayed, incomplete, or name-only  
3. **Discovery is reactive**  
   * Found via:  
     * A refresh weeks later  
     * A customer complaint  
     * Media exposure  
     * Law enforcement inquiry  
4. **Manual scramble**  
   * Internal teams rush to verify:  
     * Is this the same person?  
     * Is the record accurate?  
     * Is action justified?  
   * Access is suspended **after** exposure, not before

**Resulting risk**

* Unnecessary exposure window (days → weeks)  
* High false-positive risk if action is rushed  
* Legal and reputational fallout  
* Teams act under pressure, not confidence

**Key problem:**

Systems surface *events*, not *verified change*.  
---

**AFTER ArrestDelta (with verification-first monitoring)**

**What changes**

1. **Identity is resolved at onboarding**  
   * ArrestDelta establishes a persistent identity reference  
   * Biometric-supported identity confirmation (where permitted)  
   * This identity anchor persists beyond hiring  
2. **Continuous, state-aware monitoring**  
   * ArrestDelta monitors for **state transitions**, not raw events  
   * Booking signals are treated as provisional  
   * Noise and partial records are suppressed  
3. **Verification before alerting**  
   * Identity confirmation is applied to the new record  
   * State transition is verified (e.g. booking → confirmed arrest)  
   * Confidence threshold is calculated  
4. **Controlled alert delivery**  
   * Only once verification criteria are met:  
     * Alert is routed to Trust & Safety / Legal  
     * Context and confidence are included  
   * No alert is fired prematurely  
5. **Measured response**  
   * Teams act with:  
     * Verified identity  
     * Verified change  
     * Documented audit trail

**Resulting outcome**

* Exposure window reduced **without increasing false positives**  
* No reactive scramble  
* Defensible, auditable decisions  
* Access is reviewed **before** external escalation

**Key shift:**

Action is triggered by *verified change*, not noisy detection.  
---

**One-line before / after (investor soundbite)**

**Before:**

“We find out something happened , then scramble to confirm it.”

**After:**

“We confirm change first , then decide if action is warranted.”  
