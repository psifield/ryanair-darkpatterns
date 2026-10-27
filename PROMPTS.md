# PROMPTS.md - Ryanair Fare & Extras Decision Architecture
*Members:* Aishan, Roy, Xianlong, Zinuo
*Live link:* https://ryanair-darkpatterns.vercel.app/

---

## Entry 1 - extras tab population (Screen A baseline) · 2026-10-27, 12:15 (SGT) · sent by Roy · AI Studio

ROLE: Front-end React developer.
GOAL: Populate the missing "Extras" tab and post-seat transition for the Original Prototype (viewMode === 'dark-pattern') using uploaded screenshots of Ryanair's real booking flow.
CONTEXT: Flight booking London Stansted to Palanga, 4-day return trip.
WHAT TO BUILD:
- Fast Track prompt positioned immediately after the "Seats" selection tab.
- Extras tab populated with Travel Protection, Airport Parking, and Car Hire matching the real Ryanair baseline screenshots.
GUARDRAILS: Front-end only. Change only Screen A. Change nothing else.

*What came back:* AI Studio generated the transition for Fast Track security after Seats, along with the full card layout for Travel Protection and airport extras on the Extras tab and wired all ancillary selections into the final checkout review total.

*Our judgement, and what we changed next:* Verified that Screen A now captures Ryanair's multi-step ancillary upsell sequence. Tested state clearing and price aggregation across the entire booking funnel. Everything builds cleanly with zero errors. Next step is designing Screen B's ethical active-choice alternative.

*Principle check:* Week 4, Reference Dependence & Sunk Cost Salience; Week 7, Processing Fluency.

---

## Entry 2 - transport & parking ancillary flow (Screen A baseline) · 2026-10-27, 12:45 (SGT) · sent by Roy · AI Studio

ROLE: Front-end React developer.
GOAL: Complete the replication of Ryanair's real Extras tab for the Original Prototype (viewMode === 'dark-pattern') by adding the Transport & Parking ancillary flow.
CONTEXT: Flight booking London Stansted (STN) to Palanga (PLQ), 4-day return trip.
WHAT TO BUILD:
- Replicate Ryanair's Airport Parking section at London Stansted (Short Stay, Meet & Greet, and Long Stay) matching the real layout, pricing, and visual presentation.
- Replicate Ryanair's Car Hire vehicle selection (Economy, Compact, SUV) based on the live booking flow captures.
- Connect sub-step filtering between "Airport & trip" and "Transport & parking".
- Wire parking and car rental selections into the Review step checkout price summary.
GUARDRAILS: Front-end only. Change only Screen A. Replicate Ryanair's real baseline without inventing or modifying features.

*What came back:* AI Studio built the interactive Stansted Airport Parking and Car Hire selection cards directly matching Ryanair's visual design, including their sub-step toggle and full price aggregation into the checkout summary.

*Our judgement, and what we changed next:* Verified that the cards and pricing accurately reflect Ryanair's live baseline flow, with selections updating the total on the Review screen. In our audit analysis, we noted that Ryanair's presentation highlights higher-margin options (Meet & Greet and SUV) through visual prominence and popularity badges, escalating costs late in the funnel. Next step is pushing to deploy this baseline on Vercel, positioning the audit markers, and designing Screen B's ethical alternative.

*Principle check:* Week 4, Reference Dependence, Sunk Cost Escalation & Drip Timing (Roh pp. 27, 87–90); Week 7, Processing Fluency & Asymmetric Visual Prominence; Mathur et al. (2019), Bandwagon / Social Proof Heuristic.

---

## Entry 3 - ancillary audit markers integration (Screen A baseline) · 2026-10-27, 13:10 (SGT) · sent by Roy · AI Studio

ROLE: Front-end React developer.
GOAL: Map Ryanair's replicated ancillary flow and post-seat transition to behavioural design literature and mount interactive audit markers (DP 8–10) across Screen A.
CONTEXT: Flight booking London Stansted to Palanga, 4-day return trip.
WHAT TO BUILD:
- Position audit marker DP 8 on the post-seat Fast Track interstitial modal and the Extras tab Security Fast Track card.
- Position audit marker DP 9 on the Travel Protection insurance matrix (Plus tier daily micro-rate framing) and confirmshaming refusal link.
- Position audit marker DP 10 on the Airport Parking (Meet & Greet Valet) and Car Hire (Nissan Qashqai SUV) social proof badges.
- Expand DarkPatternAnnotation types and integrate comprehensive audit dossiers for DP 8–10 into DarkPatternInspector.
GUARDRAILS: Front-end only. Change only Screen A. Anchor every marker to specific syllabus readings (Mathur et al. 2019; Gray et al. 2018; Week 4; Week 7).

*What came back:* AI Studio mounted interactive audit marker badges on the Fast Track roadblock modal, Extras Fast Track card, Insurance Plus card, refusal button, and parking/car hire cards, expanded DarkPatternAnnotation types, and added comprehensive audit dossiers in DarkPatternInspector.

*Our judgement, and what we changed next:* Verified that toggling "Show Audit Markers" accurately displays DP 8, DP 9, and DP 10 directly on the corresponding elements and opens their respective audit dossiers in the modal inspector. Confirmed all citations match course material on loss framing, confirmshaming, and bandwagon heuristics. Next step is designing Screen B's ethical active-choice alternatives for these ancillary steps.

*Principle check:* Mathur et al. (2019), Obstruction (§5.1.4), Confirmshaming (§5.1.3), Social Proof (§5.1.2); Week 4, Loss Framing & Sunk Cost Escalation (Roh pp. 27, 45, 87–90); Week 7, Asymmetric Visual Weight & Processing Fluency.

