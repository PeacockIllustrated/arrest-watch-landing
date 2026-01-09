**ArrestDelta \- Technical Breakdown by Flow Step**

**System-Level Summary** 

ArrestDelta is designed to separate **detection**, **identity certainty**, and **verification** into distinct system layers.

This prevents raw public records data from directly triggering enterprise action and ensures that only stable, high-confidence changes result in alerts.

---

**1\. Public Records Ingestion**

*County and jurisdictional sources with variable structure, latency, and completeness.*

**Technical purpose**

To reliably ingest arrest-related data from highly fragmented public-sector systems without assuming uniform schemas, timing, or data quality.

**What happens technically**

* Data is ingested from multiple public records endpoints, portals, and feeds.  
* Each source is treated as:  
  * Structurally inconsistent  
  * Latency-variable  
  * Potentially incomplete or amended over time  
* Records are normalized into an internal canonical format that preserves:  
  * Source provenance  
  * Timestamp metadata  
  * Field-level confidence indicators

**Key design principle**

**Ingestion does not imply truth.**

At this stage, data is treated as *raw input*, not a decision signal.

---

**2\. Provisional Signal Detection**

*Initial booking or custody events are detected but treated as provisional.*

**Technical purpose**

To identify potentially relevant arrest-related activity without prematurely escalating incomplete or unstable records.

**What happens technically**

* New or changed records are detected as **provisional signals**.  
* Signals are flagged based on:  
  * Event type (e.g. booking, custody, hold)  
  * Jurisdictional context  
  * Record completeness  
* No alerts are generated at this stage.  
* Signals are queued for downstream identity resolution and verification.

**Key design principle**

**Detection is not confirmation.**

This layer prioritizes recall while deferring precision.

---

**3\. Identity Resolution**

*Records are resolved against an established identity reference using multiple signals, which may include biometric confirmation where legally permitted, to eliminate ambiguity and false matches.*

**Technical purpose**

To determine whether a provisional signal refers to a known individual with sufficient confidence to proceed.

**What happens technically**

* Provisional records are evaluated against an existing identity reference created at onboarding or access time.  
* Identity resolution uses multiple signals, which may include:  
  * Biographic attributes  
  * Historical identifiers  
  * Jurisdictional identifiers  
  * Biometric confirmation where legally permitted and available  
* Each match is assigned a confidence score reflecting:  
  * Signal consistency  
  * Source reliability  
  * Historical alignment

**Key design principle**

**Identity certainty is required before any decision logic is applied.**

Ambiguous matches are suppressed or held for further validation.

---

**4\. Verification Gate**

*State transitions are confirmed and confidence thresholds applied. Noise and incomplete signals are suppressed.*

**Technical purpose**

To confirm that a meaningful, stable state change has occurred and that it meets predefined confidence thresholds for action.

**What happens technically**

* ArrestDelta evaluates whether the provisional signal represents a **verified state transition**, not a transient or reversible condition.  
* The system assesses:  
  * Event progression (e.g. booking → confirmed arrest)  
  * Source corroboration where available  
  * Temporal stability  
* Confidence thresholds are applied based on:  
  * Customer policy  
  * Role sensitivity  
  * Jurisdictional reliability  
* Signals that do not meet thresholds are:  
  * Suppressed  
  * Deferred  
  * Or monitored without escalation

**Key design principle**

**Alerts are gated, not streamed.**

Verification occurs before alerts, not after.

---

**5\. Actionable Alert Routing**

*Only verified, high-confidence changes are routed to Trust & Safety, Legal, or Security teams.*

**Technical purpose**

To deliver decision-grade alerts that can be acted upon immediately without requiring downstream re-verification.

**What happens technically**

* Once verification criteria are met, an alert is generated with:  
  * Confirmed identity reference  
  * Verified state change context  
  * Confidence indicators  
  * Source audit metadata  
* Alerts are routed to the appropriate function:  
  * Trust & Safety  
  * Legal  
  * Security  
* Routing logic respects:  
  * Organisational workflows  
  * Escalation policies  
  * Audit and review requirements

**Key design principle**

**Every alert must be defensible.**

Recipients should not need to ask, “Is this real?” before acting.

---

