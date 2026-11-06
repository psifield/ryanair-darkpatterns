# REFLECTION.md · Group Reflection on Choice Architecture and AI Collaboration

**Course:** MGMT 6108 Decision Architecture for Managers  
**Project:** Ryanair Fare Bundle and Ancillary Decision Architecture  
**Group Members:** Aishan [AS], Roy [RO], Xianlong [XL], Zinuo [ZN]  
**Repository:** https://github.com/psifield/ryanair-darkpatterns  
**Live Application:** https://ryanair-darkpatterns.vercel.app/  
**Date:** 5 November 2026

---

## 1. Project Overview, Audit Methodology and The Preregistration Dilemma [AS, RO, XL, ZN]

Auditing Ryanair's desktop flow to construct ethical Variant B required shifting from usability to decision architecture. While heuristic evaluation asks whether screens block tasks ("Can people do what they came to do?"), a behavioral audit asks, "Which choice does this screen make easy, for whom and through which principle?" [AS]. Course frameworks (Week 4 framing, Week 7 fluency, Week 9 norms) classified interventions as nudge, sludge or grey by evaluating whose goal wins [AS, ZN].

Our first obstacle was methodological: an early Variant B prototype was committed (`5579bef`) prior to our formal audit [RO, XL]. Auditing after an artifact exists risks retrospective rationalization. Rather than pretending the audit preceded the build (course trap: "AUDIT.md written after the build"), we preserved integrity [AS, ZN], isolating prototype assumptions into `AUDIT.md` (`Added after building`) while freezing prospective hypotheses and testing boundaries.

Choice architecture is empirical science rather than cosmetic styling. To avoid "A prettier B" (restyling while leaving decisions unchanged), ethical design changes what choosers see at the moment of choice [RO, XL]. We audited for good existing nudges kept: Ryanair's cabin bag diagram under the seat (40 x 20 x 25 cm) was preserved because it sets clear expectations and reduces boarding friction without deception [AS].

---

## 2. Evolution of Our AI Prompting Strategy [RO, XL]

We used Google Stitch for scaffolding, OpenAI Codex for fare tables and Google AI Studio for React logic [RO, XL]. Across nine entries in `PROMPTS.md`, prompting evolved through three phases:

### Phase 1: High-Level Requests and Inherited Assumptions (Entries 1 to 4) [RO, AS]
Early prompts replicated Seats, Bags and Extras. Subjective requests like "make checkout ethical" led models to make cosmetic tweaks while breaking utility [AS]. An agent stripped luggage dimensions (55 x 40 x 20 cm) and weight caps, leaving travelers unable to choose informatively [RO]. Open-ended prompting failed practical reality [RO, AS].

### Phase 2: Structural Specification and Bounded Components (Entries 5 to 8) [XL, ZN]
Adopting RGOGC, prompts shifted to bounded specifications [XL]. Entry 6 established our four-fare matrix with return totals (£189.86 for Regular), explicit increments (£58.50 over Basic) and expandable drawers [XL, ZN]. Entries 7 and 8 added checkout opt-ins and split views, guarding test IDs and frozen findings [XL].

### Phase 3: Systems Thinking, Sub-Step Synchronization and Choice Mirroring (Entry 9) [RO]
Entry 9 resolved an evaluative gap where Original split extras across two sub-stages (`1. Airport & trip`, `2. Transport & parking`) but Ethical was unsegmented [RO]. We lifted sub-step state to `BookingAddOnView`, added synchronized tabs and mirrored state so evaluators contrast identical choices simultaneously [RO].

---

## 3. Technical Breakdowns, Behavioral Guardrails and Model Misunderstandings [RO, XL, AS]

Documenting generative AI failures provided valuable systems-level insights:

### UI Overflow and Spatial Clipping [AS, XL]
In Audit Marker 3 (`DP 3 · Visual Steering`), the tool positioned the pill with negative offsets (`-top-4`), clipping it inside `overflow: hidden` containers [AS]. Fixing this required refactoring card wrappers, attaching the pill flush with the banner and verifying responsiveness across desktop and mobile screens [XL].

### Unimported Scope and Build Pipeline Failures [RO]
In Entry 9, the model added stateful tab switching to `SideBySideView.tsx` but omitted `useState` from React, causing a `ReferenceError` [RO]. Visual inspection proved insufficient; we instituted automated test gates (`npm test`, `tsc --noEmit`) to catch syntax regressions before pushing code [RO].

### Guardrails Growing Out of AI Behavioral Science Errors [AS, ZN]
To avoid "Citations the AI invented," we opened every lecture PDF and logged page checks [AS]. When models hallucinated external citations, we instituted a strict guardrail: mechanisms had to be verified against the five lecture PDFs (Week 4 pp. 27, 41-44, 45, 48, 64; Week 7 pp. 6-7, 13-15, 20). Unverified citations were purged [ZN, AS]. Guardrails grew out of earlier behavioral errors, grounding all claims in verified readings [AS].

---

## 4. Behavioral Insights: P&L Unit Economics and Choice Architecture [AS, RO, ZN]

Dark patterns stem from airline Profit and Loss (P&L) unit economics rather than isolated interface malice [ZN, XL].

### The Economics of Ancillary Unbundling [ZN, XL]
Readings in **Week 4 (Reference Dependence and Diminishing Sensitivity, PDF pp. 27, 41-44)** reframed our perspective [ZN]. Base fares (£110.98 return) are loss leaders sold near cost. Aggregators rank flights by headline fare, forcing airlines to strip inclusions upfront and use checkout architecture to recover margin [XL, ZN]. Ancillaries drive over 35% of revenue and all net profit. Eliminating upselling causes insolvency; ethical design enables informed choices at transparent prices without deception [ZN, XL].

### Diminishing Sensitivity vs Deceptive Calculation Burden [AS, RO]
Ryanair exploits diminishing sensitivity (Sungjong Roh, Week 4, p. 44) by framing upgrades as +£27.75 "per flight". On the value curve, £27.75 feels small against a £110.00 ticket, but doubles to £55.50 on return trips [AS]. We classified this as a **grey case**: bundles provide utility, but obscuring totals weaponizes cognitive load [RO, AS]. Variant B displays round-trip totals upfront alongside per-leg breakdowns, applying processing fluency (Week 7, pp. 6-7) to build trust through transparent math [RO].

### The Inflight Credit Paradox and Breakage Extraction [RO, AS]
Pre-paid Inflight Credit (`"Get More, Pay Less"`) offers a genuine 10% saving (£4.50 for £5.00 voucher credit) [RO]. Yet Ryanair contaminates this offer with urgent badges shouting "FREE CREDIT" [AS]. Triggering the Zero-Price Effect (Week 4, p. 48) masks the risk of **breakage**: unspent balances are non-refundable, yielding 100% profit margins [RO]. Variant B preserved the discount while replacing deceptive cues with transparent math and an unpenalized "No credit" default [AS, RO].

### Default Architecture on Travel Insurance: Active Choice vs Pre-selection [RO, XL]
In Variant A, insurance is sold through default inertia: £14.50 Comprehensive Travel Protection is pre-selected alongside pre-ticked emails, exploiting default bias (Week 9) [RO]. In Variant B, Extras offers a multi-tier list starting at "No insurance" (£0), while Review & Pay (Entry 7) presents the £14.50 policy **unchecked by default**, requiring active opt-in without shame or friction [RO, XL].

---

## 5. Avoiding Evaluation Traps: Usability Pilot Protocol and Ethical Boundaries [ZN, XL]

To avoid "Friends as proof" (treating peer feedback as proof B works), our plan separates qualitative walkthroughs from statistical power requirements [ZN].

### Pilot Protocol, Power Requirements and A Prediction That Could Fail [ZN, XL]
Our audit preregistered a protocol measuring price comprehension. Detecting a 20 percentage-point gain (50% in A to 70% in B with alpha=0.05, 80% power) requires **approximately 97 participants per arm** [ZN]. Peer walkthroughs (n=16) served as hypothesis-generating pilot inputs rather than proof [ZN, XL].

We preregistered a falsifiable prediction: presenting neutral four-tier fare cards would increase Regular bundle selections by clarifying inclusions. In our 16-person pilot walkthrough, this positive prediction failed: participants still chose Basic because base fare remained salient, overlooking the collapsed drawer [ZN]. We plainly report this failure: transparency alone does not override base price salience without active feature prompts, demonstrating ethical redesign requires continuous verification [XL, ZN].

### Where Variant B Would Turn into Sludge [XL, ZN]
To fulfill ethical criteria, we analyzed where Variant B could inadvertently turn into sludge:
1. **Information Overload**: Expanding the 20-row inclusions table by default creates vertical fatigue and cognitive sludge on mobile screens. We kept the table collapsed within an optional drawer [XL].
2. **Excessive Confirmation Friction**: Forcing travelers to confirm declining extras through modal dialogs recreates obstructive sludge. Variant B applies direct selection without roadblocks [ZN].

---

## 6. Team Contributions Summary [AS, RO, XL, ZN]

* **Aishan [AS]**: Mapped findings to Week 4 and Week 7 decks. Led mobile viewport testing. Authored descriptions, severity ratings and drivers for Findings 1 and 2 in `AUDIT.md`.
* **Roy [RO]**: Managed repository, dependencies and git workflow. Directed prompt engineering for Entries 1 to 5 and Entry 9, architecting sub-step synchronization and choice mirroring in `SideBySideView.tsx`.
* **Xianlong [XL]**: Authored `AUDIT.md` consolidation. Led prompt engineering for Entries 6 to 8 (fare matrices, checkout opt-ins). Maintained test suites and typing integrity.
* **Zinuo [ZN]**: Conducted aviation benchmarks. Led severity scoring and agreement calculations. Formulated empirical hypotheses, guardrails and pilot rejection criteria for Variant B repairs.

---

## 7. Conclusion [AS, RO, XL, ZN]

Ethical decision architecture aligns commercial offerings with chooser autonomy. Budget carriers rely on ancillaries to keep base fares low, and passengers benefit from modular options. Misalignment occurs when interfaces deploy deceptive defaults, drip pricing and asymmetric friction to exploit cognitive fatigue.

Generative AI accelerated development but lacked domain judgment. Left unguided, models oscillated between copying dark patterns and stripping essential operational data. Building transparent systems requires disciplined oversight: empirical grounding, prompt constraints and automated testing. Ethical architecture protects commercial viability while respecting consumer autonomy.
