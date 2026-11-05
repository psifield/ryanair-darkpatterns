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

---

## Entry 6 - ethical booking interface (Screen B) · 2026-11-05, time not captured · sent by Xianlong · Codex

*Initial prompt:*

~~~text
alright. i was thinking of refining the ethical UI a bit since we haven't really touched it.
~~~

*Follow-up prompt:*

~~~text
hmmmm, please reverse the changes you made in AUDIT.md and do it in PROMPTS.md instead. also, please spin up the website, as what i meant is to change the UI of the ethical version itself
~~~

*What came back:* In Screen B, travellers go straight from Seats to Bags and can decide about Fast Track in Extras. The Extras screen shows the **£7.49** charge for the Stansted departure, or says the service is included with the fare. Each paid extra has a clear way to decline it. Parking and car hire show the full four-day cost, with the cheapest options first and no popularity badges.

Insurance lists the full premium for each policy and starts at **No insurance**. Review shows the policy chosen in Extras and includes its premium in the total. For this itinerary, Plus costs **£6.08**. The **£14.50** Comprehensive offer is a separate policy, available in A's Review and B's Extras at this stage.

The fare follow-up made the selected price and next action explicit. Regular, for example, shows a **£189.86 return total**, **£58.50 more than Basic**, with the per-flight increase shown separately. The main button reads **Continue with Regular** when that fare is selected.

*Our judgement, and what we changed next:* The first pass concentrated on Findings 4–6. After the follow-up, Codex refined the Ethical fare screen and opened it in the local preview. The four fares share a card layout with return totals, upgrade differences, and the same seat and bag rows. The full inclusions table can be expanded, and the selected fare can continue straight to Seats. Xianlong confirmed that `AUDIT.md` is frozen and that prompts and implementation notes belong here.

*Verification:* All seven tests, type checking and the production build passed. Browser checks confirmed Regular's £189.86 return total, the expandable comparison and direct continuation with Basic. The fare cards fit in one column at phone width and four on desktop. Earlier desktop and phone checks covered Extras and checkout totals. On phones, the cart total clipped and Review opened partway down after continuing from Extras. Codex adjusted the header and step scrolling, then checked the flow again. Effects on traveller decisions remain untested.

---

## Entry 7 - checkout opt-ins (Screen B) · 2026-11-05, time not captured · sent by Xianlong · Codex

~~~text
i realise that the travel insurance option in the Review and Pay tab of the ethical version is not present. could you add the travel insurance option from the original prototype to the ethical version, but keep it unchecked to differentiate it from the original version? also, communication preferences should be unchecked in the ethical redesign too.
~~~

*What came back:* Ethical Review & Pay offers the same **£14.50 Comprehensive travel protection** as the Original Prototype. When no policy has been chosen, its box starts unchecked. Checking it adds one premium to the price breakdown; clearing it removes that charge. The separate **Communication Preferences** box also starts unchecked in Ethical and can be changed independently of insurance. Both boxes start checked in the Original Prototype.

Review uses the policy already selected in Extras. Comprehensive appears as checked if it was chosen there. For another policy, such as Plus, Review shows the policy and its premium and directs the traveller back to Extras to change it. That keeps the selected cover visible without offering a second policy at checkout.

*Verification:* All eight tests, type checking and the production build passed. In the local preview, adding and removing Comprehensive changed both the cart and the payment amount between £131.36 and £145.86. Promotional emails had no effect on the price. Selecting Plus in Extras showed one £6.08 policy at Review, for a £137.44 total. Revisiting Review kept the chosen settings, and switching to Original showed its own defaults.

---

## Entry 8 - comparison across the booking flow · 2026-11-05, time not captured · sent by Xianlong · Codex

~~~text
okay, one more thing i'd like to get ironed out. when navigating to the Side-by-Side Split tab, the Seats, Bags, Extras, and Review & Pay sub-tabs do not actually show a side-by-side split of the original and ethical redesign. only the Flights sub-tab has a working side-by-side split view. please implement side-by-side split views for the other tabs so that as a user of this website, i will be able to clearly view both designs for all tabs, not just the Flights tab.
~~~

*What came back:* The split layout now stays in place when moving from Flights to Seats, Bags, Extras or Review & Pay. Both columns advance together and use the same itinerary and fare. Each version keeps its own seat, bag, extras and email choices, so the Review screens show separate price breakdowns and totals for the same base trip.

The Original Fast Track dialog opens inside its own column, leaving the Ethical design visible. At desktop width the two versions sit alongside each other. At phone width they stack, with **Jump to Original** and **Jump to Ethical** links so travellers can move between versions without scrolling through a whole booking step.

*Verification:* Nine tests, type checking and the production build passed. Browser checks covered all five steps at desktop and phone widths and confirmed that the Original Fast Track dialog stayed inside its column. With Basic in both views, Original totalled £161.35 after selecting seat 15A and Fast Track and retaining its default insurance. Ethical totalled £167.44 after selecting one bag and Plus cover. These totals confirmed that the choices stayed with the intended version.

---

## Entry 9 - synchronized extras sub-tabs and mirrored comparison choices · 2026-11-05, 19:15 · sent by Roy · AI Studio

GOAL: Synchronize the sub-step categories and user selections across the Original and Ethical designs in Side-by-Side mode, so both columns navigate and compare extras on an equal, apples-to-apples basis.

CONTEXT: Flight booking London Stansted (STN) to Palanga (PLQ), 4-day return trip.

WHAT TO BUILD:
- Synchronize Extras sub-step categories: add matching sub-step pill tabs (`1. Airport & trip`, `2. Transport & parking` and `View All`) to the Ethical redesign, and share category state so both sides switch categories together.
- Align step navigation: ensure both sides provide a *"Next: Transport & Parking"* button on Stage 1, and only advance to the final Review & Pay step once Stage 2 (*Transport & parking*) or *"View All"* is complete.
- Mirror user choices in Side-by-Side mode: when interacting in comparison mode, selecting any add-on (Fast Track, insurance, parking, car hire, seats or bags) updates both designs simultaneously so evaluators can contrast how the exact same choices are framed and billed.
- Keep all automated tests passing and verify that standalone views preserve their respective defaults.

GUARDRAILS: Front-end only. Keep all 9 automated tests passing. Do not alter existing audit findings or scoring.

*What came back:* AI Studio added matching category pill tabs to the Ethical Extras screen, connected both designs to a shared sub-step controller in the split view, aligned the bottom progression buttons and updated the booking handler to mirror user selections across both columns during side-by-side mode. All 9 automated tests continue to pass cleanly.

*Our judgement, and what we changed next:* Verified that clicking between "Airport & trip" and "Transport & parking" now switches both columns simultaneously. On Stage 1, both sides display airport services and advance together to transport; on Stage 2, both display parking and car hire side by side. Selecting an option on either side now mirrors to the other, allowing evaluators to see directly how the same passenger selections are nudged and priced under dark patterns versus transparent choice architecture.

*Principle check:* Week 10, Usability Principles (Consistency & Standards between variants, Error Prevention and Visibility of System Status); Week 4, Reference Framing & Drip Pricing (ensuring transparent comparison across stages); Week 9, Social Norms & Default Bias.

