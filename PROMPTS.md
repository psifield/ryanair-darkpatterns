# PROMPTS.md - Ryanair Fare & Extras Decision Architecture
*Members:* Aishan, Roy, Xianlong, Zinuo
*Live link:* https://ryanair-darkpatterns.vercel.app/

---

## Entry 1 - extras tab population (Screen A baseline) · 2026-10-27, 12:15 · sent by Roy · AI Studio

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

## Entry 2 - transport & parking ancillary flow (Screen A baseline) · 2026-10-27, 14:30 · sent by Roy · AI Studio

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

