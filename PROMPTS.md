# PROMPTS.md - Ryanair Fare & Extras Decision Architecture
*Members:* Aishan, Roy, Xianlong, Zinuo
*Live link:* https://ryanair-darkpatterns.vercel.app/

---

## Entry 1 - extras tab population (Screen A baseline) · 2026-10-27, 14:45 · sent by Roy · AI Studio

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

## Entry 2 - transport & parking ancillary flow (Screen A baseline) · 2026-10-28, 02:55 · sent by Roy · AI Studio

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

## Entry 3 - ancillary audit markers integration (Screen A baseline) · 2026-10-28, 03:15 · sent by Roy · AI Studio

GOAL: Audit Ryanair's replicated ancillary flow and post-seat transition using deceptive pattern concepts, and place interactive audit markers across Screen A.

CONTEXT: Flight booking London Stansted to Palanga, 4-day return trip.

WHAT TO BUILD:
- Flag the post-seat Fast Track interstitial modal as an obstruction pattern that exploits queue anxiety and visual contrast to steer add-on sales before baggage selection.
- Flag the Travel Protection matrix for daily micro-rate framing (+£0.35/day) that exploits diminishing sensitivity, and mark the emotionally loaded refusal link that guilts travellers into accepting coverage.
- Flag the unverified "Most Popular" and "Customer Favourite" badges on high-cost airport parking and car hire as bandwagon cues that leverage sunk cost escalation late in the checkout funnel.
- Expand the audit inspector modal to display full behavioral breakdowns, psychological impacts, and proposed ethical remedies for each marked pattern.

GUARDRAILS: Front-end only. Change only Screen A. Keep the existing booking flow intact while making all markers interactive.

*What came back:* AI Studio mounted interactive audit marker badges on the Fast Track roadblock modal, Extras Fast Track card, Insurance Plus card, refusal button, and parking/car hire cards, expanded DarkPatternAnnotation types, and added comprehensive audit dossiers in DarkPatternInspector.

*Our judgement, and what we changed next:* Verified that toggling "Show Audit Markers" accurately displays DP 8, DP 9, and DP 10 directly on the corresponding elements and opens their respective audit dossiers in the modal inspector. Confirmed all citations match course material on loss framing, confirmshaming, and bandwagon heuristics. Next step is designing Screen B's ethical active-choice alternatives for these ancillary steps.

*Principle check:* Mathur et al. (2019), Obstruction (§5.1.4), Confirmshaming (§5.1.3), Social Proof (§5.1.2); Week 4, Loss Framing & Sunk Cost Escalation (Roh pp. 27, 45, 87–90); Week 7, Asymmetric Visual Weight & Processing Fluency.


---

## Entry 4 - lecturer consultation and citation scope · 2026-10-30, time not captured · sent by Xianlong · Codex

*Recording note:* Recorded after the consultation; exact prompt time was not captured. The prompt excerpt below retains the lecturer feedback. Subsequent substantive decisions are summarised under judgement.

~~~text
okay, so i bascially had a consultation with our lecturer, and this is what he recommended:

1. each dark pattern should have its own reading attached to it in the Evidence, Course Source & Limits. for example, DP 2 shows some correct reading referencing. an example of some dark patterns not having any reference attached to it is DP 6.
2. academic sources like the paper from Mathur in DP 4, 8, 9, 10 are okay, but do not add marks towards the entire assignment, since our lecturer prioritises his own readings and will not give marks for academic references outside of our own. so if possible, please use course readings to fill up the Evidence section

~~~

*What came back:* The initial review produced a [source map for all 11 audit records](docs/superpowers/plans/2026-10-30-course-evidence.md) and identified unsupported claims and incorrect taxonomy references. The resulting UI changes and verification are recorded below under 31 October.

*Our judgement, and what we changed next:* Xianlong prioritised lecture week and PDF page citations, with original assigned readings added when their pages can be verified. Xianlong allowed relevant readings to support multiple DPs, retained external papers as supplementary sources, and accepted narrowing explanations to what the readings support. AUDIT.md stays frozen; subsequent improvements and their rationale belong in PROMPTS.md. Codex proposed the corrections below.

*Principle check:* Week 4, PDF p. 44, supports incremental upgrade framing; p. 64 covers negativity bias; pp. 73-76 cover opt-in/opt-out choices and starting entitlements. Week 7, PDF pp. 13-15 and 20, supports processing-fluency and contrast explanations. Week 9, PDF pp. 13-14, 27, 35, 39 and 48, supports analysing popularity cues as social information. DP1's reference-framing connection remains limited; it is not direct evidence of a scarcity effect. These are lecture PDF locators; original publication pages remain unverified.

*Baseline checks, 30 October 2026:* Type checking passed. Two of the four existing tests failed because the navigation expectations still specify seven groups/eight records; the app has ten groups/eleven records. The marker-visibility and insurance-default tests passed. These checks preceded UI revisions and do not verify the historical test claims in Entries 1-3.

### Dated correction to inherited claims - 2026-10-30

The following are Codex's findings from the present checks. They supplement the historical log; they do not rewrite what Roy recorded or retrospectively certify earlier tests.

- Entry 2's "higher-margin" description is unsupported by profit data. The visible cards establish higher prices for those options, not higher margins.
- Entry 3's blanket claim that all citations match the course material is too broad. The present review checked specific lecture passages and found mismatched external section references.
- Week 4, PDF pp. 87-90, concerns hedonic editing, not a demonstration of sunk-cost escalation or lower sensitivity to ancillary prices. DP10 has a closer course connection in Week 9's social-norm material.
- In [Mathur et al.'s primary paper](https://arxiv.org/html/1907.07032), Social Proof is section 5.1.4, Urgency is section 5.1.2, and Obstruction is section 5.1.6. The obstruction type observed in that paper is Hard to Cancel; the paper does not supply a named interstitial-roadblock type. Section 5.1.3 contains misdirection types including pressured selling and confirmshaming.
- Lecture support makes a mechanism plausible to discuss; it does not establish that users experienced anxiety, shame, underestimation, unwanted purchases or other measured effects in this prototype.

### Implementation and checks - 2026-10-31

Codex updated all 11 Evidence, Course Source & Limits paragraphs with lecture week and PDF page citations first. Both DP3 records have their own citations, while the overlapping upsell remains identified as the same interaction as DP4. Original assigned-book/article page citations remain unverified and were not added.

The source check changed several explanations. DP6 now cites Week 4's framing and negativity-bias material; DP7 cites its opt-in/opt-out examples. DP8 describes queue contrast and an interruption without asserting measured anxiety. DP9 now distinguishes the displayed £1.17/£1.52 daily rates from the £0.35 upgrade tag, and labels whole-trip pricing as a proposed repair. DP10 uses Week 9 social information, with the supplementary Mathur reference corrected to section 5.1.4; its title and markers no longer assert sunk-cost escalation.

*Verification:* The initial two failing navigation tests expected seven groups/eight records. After updating those expectations to ten groups/eleven records, all four existing tests passed, including marker visibility and the independent insurance-default check. Type checking and the production build passed. The build still emits the existing Vite warning about __dirname in its config. Browser checks opened every record, including both DP3 leaves, and checked desktop layout plus mobile evidence wrapping for DP6, DP7 and DP10. These checks verify the prototype's presentation and existing controls, not psychological effects.

*Judgement:* Xianlong's lecture-first citation requirement determined the revision. Codex retained uncertainty where the readings do not establish an effect, especially DP1's limited framing connection and the unverified popularity cues. The final wording awaits Xianlong's review. AUDIT.md and the earlier three prompt entries were preserved; booking behaviour, fares and defaults were not changed.

---

## Entry 5 - side-by-side dual comparison expansion (Flights, Seats & Bags) · 2026-11-05, 12:50 · sent by Roy · AI Studio

GOAL: Fix layout issues in the side-by-side comparison mode for Flights, and expand the dual comparison to the Seats and Bags steps so evaluators can contrast the dark patterns against the ethical redesign directly.

CONTEXT: Flight booking London Stansted (STN) to Palanga (PLQ), 4-day return trip.

WHAT TO BUILD:
- Fix the Flights comparison: make the fare table fit comfortably without horizontal scrolling, and arrange the ethical fare cards into a clean 2-by-2 grid so text and buttons are no longer squished.
- Build a side-by-side view for Seats: display Ryanair's seat separation warnings, confirmshaming pop-up, and Fast Track roadblock on the left, directly contrasted with the calm, transparent free seat policy on the right.
- Build a side-by-side view for Bags: display Ryanair's £60 gate fee penalty threats and steering toward paid cabin bags on the left, contrasted with honest bag dimensions and clear allowances on the right.
- Connect both side-by-side views into the main flow so steps navigate smoothly and cart totals stay synchronized.

GUARDRAILS: Front-end only. Keep all automated tests passing. Do not alter dark pattern numbers or audit scores.

*What came back:* AI Studio fixed the card squishing and horizontal scrolling on the Flights tab, created responsive side-by-side comparison views for both the Seats and Bags steps, and wired them into the booking flow. All automated tests pass cleanly.

*Our judgement, and what we changed next:* Verified that evaluators can now compare the original flow with the ethical redesign side by side across Flights, Seats, and Bags without visual clutter. The behavioral contrast is immediately obvious: choosing a free seat on the left triggers fear warnings and an intrusive Fast Track roadblock, whereas the right side allocates freely and proceeds directly. Next step is completing the ethical redesign for the Extras step (travel insurance, parking, and car hire) and building its side-by-side view.

*Principle check:* Week 10, Usability Principles (Consistency between variants, Recognition rather than Recall, Clean and readable layout); Week 8, Visual Asymmetry & Color Steering; Week 9, Social Norms & Loss/Penalty Framing (seat separation anxiety, gate penalty threats).



