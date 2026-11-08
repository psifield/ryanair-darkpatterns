# Group reflection on choice architecture and AI collaboration

**Course:** MGMT 6108 Decision Architecture for Managers  
**Project:** Ryanair Fare Bundle and Ancillary Decision Architecture  
**Group Members:** Aishan [AS], Roy [RO], Xianlong [XL], Zinuo [ZN]  
**Repository:** https://github.com/psifield/ryanair-darkpatterns  
**Live Application:** https://ryanair-darkpatterns.vercel.app/  
**Date:** 5 November 2026

**Documentation clarification:** 8 November 2026. The revisions below clarify attribution, arithmetic and evidence limits; they do not record new participant results or a unanimous team decision.

## 1. How we audited the booking flow [AS, RO, XL, ZN]

When we audited Ryanair's desktop flow for Variant B, we asked the usual usability question, "Can people do what they came to do?" Then we asked, "Which choice does this screen make easy, for whom and through which principle?" [AS]. To decide whether a design was a nudge, sludge or a grey case, we looked at whose goal it served. We used Week 4 for framing, Week 7 for fluency and Week 9 for norms [AS, ZN].

The first commit (`5579bef`) already contained an early Variant B. By the time we wrote the formal audit, we could see how easy it would be to explain an existing design as if we had predicted it [RO, XL]. The course flagged this timing problem as "AUDIT.md written after the build". We recorded our assumptions about the prototype in `AUDIT.md` under `Added after building` and set out the hypotheses and scope for future testing separately [AS, ZN].

The course's warning about "A prettier B" pushed us to look at what travelers saw at the moment of choice [RO, XL]. We retained the prototype's under-seat bag diagram (40 x 20 x 25 cm) as decision support [AS]. This is a simulation detail, not current airline guidance: [Ryanair's official fare-bundle page](https://help.ryanair.com/hc/en-ie/articles/12888555638161-What-are-Ryanair-s-fare-bundle-options), checked on 8 November 2026, specifies 40 x 20 x 30 cm. The prototype's 55 x 40 x 20 cm cabin-bag dimensions must also be distinguished from a dated policy check.

## 2. How our prompts changed [RO, XL]

We used Google Stitch to scaffold the prototype and OpenAI Codex for the fare tables. Google AI Studio helped with the React logic. The nineteen entries in [PROMPTS.md](PROMPTS.md) mainly document later development, corrections and checks; they are not a complete log of the early B build [RO, XL].

### Broad requests (entries 1 to 4) [RO, AS]

Early prompts focused on reproducing Seats, Bags and Extras. Requests like "make checkout ethical" led to changes in appearance at the cost of useful information [AS]. One agent removed luggage dimensions (55 x 40 x 20 cm) and weight limits, leaving travelers without the details they needed to choose a bag [RO].

### Requirements for each component (entries 5 to 8) [XL, ZN]

We adopted RGOGC and began specifying what each component should do [XL]. Entry 6 defined four fare cards with return totals and expandable drawers for comparing inclusions. Regular, for example, showed a £189.86 return total and a £58.50 increase over Basic [XL, ZN]. Entries 7 and 8 added checkout opt-ins and split views while preserving the test IDs and frozen audit findings [XL].

### Comparing the same choices (entry 9) [RO]

Original divided Extras into two stages (`1. Airport & trip`, `2. Transport & parking`), while Ethical showed everything together. We moved the sub-step state into `BookingAddOnView` so the tabs would switch together. We also mirrored selections so reviewers could see how each version presented the same choice at the same time [RO].

### Follow-up testing and step navigation (entries 10 to 19) [RO, XL]

Later entries expanded the prototype into a structured participant experiment and tightened booking navigation [RO]. Entries 10 to 12 implemented random pilot arm assignment, informed consent, study debriefs and Alderwake Air re-branding while verifying all 26 automated unit tests [XL]. Entries 13 to 19 addressed edge cases discovered during interactive walkthroughs: keeping study debrief accessible across all steps, synchronizing URL state (`?v=A/B/review`), fixing the simulation reset workflow to preserve the active test arm, replacing disabled stepper tabs with guidance alert popups that prompt participants to complete their current booking step first and harmonizing final documentation [RO].

## 3. What went wrong with AI-generated work [RO, XL, AS]

### A clipped audit marker [AS, XL]

The tool positioned Audit Marker 3 (`DP 3 · Visual Steering`) using a negative offset (`-top-4`). The marker was cut off by its `overflow: hidden` container [AS]. We adjusted the card wrappers, moved the marker flush with the banner and checked the result on desktop and mobile [XL].

### A missing React import [RO]

In Entry 9, the model added tab switching to `SideBySideView.tsx` and forgot to import `useState` from React, which caused a `ReferenceError`. Visual inspection had missed the error. We used `npm test` and `tsc --noEmit` before pushing to catch mistakes like this [RO].

### Checking citations against the lectures [AS, ZN]

After the model invented external citations, we opened each of the five lecture PDFs to check the mechanisms ourselves [AS]. We logged the pages we used, including Week 4 pp. 27, 41-44, 45, 48, 64 and Week 7 pp. 6-7, 13-15, 20. We dropped citations we could not verify [ZN, AS].

## 4. Why the extras are sold this way [AS, RO, ZN]

### Base fares and ancillary revenue [ZN, XL]

Week 4 (Reference Dependence and Diminishing Sensitivity, PDF pp. 27, 41-44) informed our hypothesis about how a headline fare frames later prices [ZN]. Our initial business interpretation treated the captured £110.98 return fare as close to operating cost [XL, ZN]. The repository contains no route-level cost evidence establishing that claim; the displayed fare alone cannot do so.

We initially assumed ancillaries accounted for over 35% of revenue and all net profit [ZN, XL]. These were team assumptions, not verified financial findings: no supporting period-specific accounts or cost allocation is documented here. We cannot infer ancillary profit or airline viability from revenue shares. Keeping optional extras available with clear prices can be justified by different traveller needs without those assumptions.

### Per-flight upgrade prices [AS, ZN]

ZN favoured Sludge: Basic shows a return total while Regular shows a per-flight increment. His proposed chain was inconsistent units → calculation effort → skipped calculation → underestimated return upgrade cost → greater willingness to upgrade. This is theory, not a tested causal result. For ZN, calculation costs can be sludge without extra refusal steps; unaffected travellers do not establish consumer benefit. Whose goal benefits matters more than universal effectiveness.

AS favoured Grey: travellers already decided for or against upgrading may face little additional burden; undecided travellers still receive genuine incremental prices, not false information or hidden fees. Unequal effects weaken a categorical Sludge judgement. We distinguish observable calculation burden, hypothesised behaviour and possible goal beneficiaries. The lecturer defines Grey as “Both goals served, or unclear”. The final F1 verdict remains Grey because effects and beneficiaries remain uncertain, not because ZN accepted AS's position or consumer benefit was proven; ZN's dissent remains.

### Pre-paid inflight credit [RO, AS]

In the prototype, pre-paid credit gives a 10% saving if used in full (£4.50 for £5.00 in credit) [RO]. The "FREE CREDIT" framing could draw attention to the offer, but its effect is untested [AS]. Week 4 p. 48 discusses losses versus foregone gains; it does not verify a Zero-Price Effect for this offer. Unused value could reduce the benefit if credit is non-refundable; the real offer's refund terms and breakage are unverified. Variant B displays cost and credit value and permits "No credit" without a charge [AS, RO].

### Travel insurance defaults [RO, XL]

Entry 7 records an earlier prototype with both £14.50 Comprehensive Travel Protection and promotional emails checked in A, and unchecked in B [RO, XL]. Default retention was a hypothesis, not a measured consumer response; the recorded course check points to Week 4 pp. 73–76. Entry 12 later records that an explicit insurance decline persists and a chosen policy is carried to Review. In the four-day scenario, Standard is £4.68, Plus £6.08, and their difference £1.40 (£0.35/day); Comprehensive £14.50 is a separate option. B's Extras starts at "No insurance" (£0). These are versioned prototype observations, not evidence of current real-site defaults.

## 5. Testing the redesign and avoiding sludge [ZN, XL]

### Price comprehension and the peer walkthrough [ZN, XL]

We used peer feedback to develop hypotheses, keeping in mind the course warning about "Friends as proof" [ZN, XL]. The earlier reflection reported approximately 97 participants per arm [ZN]. **Calculation clarification, 8 November 2026:** for independent binary comprehension outcomes, equal allocation, assumed pA=0.50 and pB=0.70, two-sided alpha=0.05 and 80% power, the normal approximation without continuity correction gives:

`n = [1.959964√(2×0.60×0.40) + 0.841621√(0.50×0.50 + 0.70×0.30)]² / 0.20² = 92.9988`, rounded up to **93 per arm**.

This reproduces the paper's reported approximation of 93 under these assumptions; its calculation method still needs confirmation. The original method behind 97 is not recorded and cannot be reconstructed. There is no allowance here for attrition, clustering or separate task-profile power. The rates remain planning assumptions. This calculation does not change the proposed 24-person Fare Selection pilot or establish its power; the later Extras findings await a separate future test.

Our initial expectation of more Regular choices was too narrow. Choice quality means selecting the **lowest-cost suitable fare**: Basic for the light-travel task, Regular for the bags-and-seat task. In the informal 16-person peer walkthrough, the team reported people choosing Basic without opening the drawer [ZN]. This was not the formal randomised pilot; the available record gives no task-level counts establishing unsuitable choices. Basic selection alone is not an error, and the walkthrough does not show that price attention caused it. A future comparison prompt should be judged by comprehension and need-fit, not by increasing Regular sales [XL, ZN].

### Where Variant B could make booking harder [XL, ZN]

Opening the 20-row inclusions table by default would give travelers a lot to scroll through and take in on a phone. We kept it in a drawer they could open when they wanted to compare fares [XL].

Asking travelers to confirm each declined extra in a dialog would add a step to a decision they had already made. Variant B lets them decline directly [ZN].

## 6. Team contributions [AS, RO, XL, ZN]

* Aishan [AS] mapped findings to the Week 4 and Week 7 decks, led mobile testing and wrote the descriptions, severity ratings and drivers for Findings 1 and 2 in `AUDIT.md`.
* Roy [RO] managed the repository, dependencies and Git workflow. Roy took the lead on prompts for Entries 1 to 5, Entry 9 and Entries 13 to 19, designed how `SideBySideView.tsx` keeps sub-steps and selections in sync and implemented the step navigation guidance popups.
* Xianlong [XL] consolidated `AUDIT.md` and led the prompts for Entries 6 to 8, including the fare comparison and checkout opt-ins. Xianlong also maintained the tests and TypeScript types.
* Zinuo [ZN] benchmarked airline practices, led severity scoring and calculated agreement. Zinuo developed hypotheses, guardrails and criteria for rejecting Variant B repairs in the pilot.

## 7. Conclusion [AS, RO, XL, ZN]

Selling extras separately can let passengers pay for what they need. We wanted to keep that flexibility without making a tired traveler catch a preselected charge, work out a price revealed late or click through extra screens to decline an offer; this does not establish how much unbundling lowers base fares or contributes to profit.

AI sped up implementation. It also reproduced some of the patterns we meant to fix and removed information travelers needed. The readings helped us decide what to ask for. We wrote those details into the prompts and used automated checks to see whether the booking flow behaved as specified.
