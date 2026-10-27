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
