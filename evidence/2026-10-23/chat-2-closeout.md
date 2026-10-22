# Chat 2 closeout and Chat 3 handoff

23 October 2026 (Asia/Singapore). **Chat 2's evidence and scope work is complete for handoff.** This does not mean the final audit, group ratings, participant study or release is complete.

The user intends to create a draft `AUDIT.md` in Chat 3, publish the reviewed app changes and draft to the repository, and let teammates view the deployment or clone the repository before contributing their own severity ratings. Pending human ratings do not prevent that handoff. No commit, push or deployment has been performed in this closeout.

## Settled decision and evidence

**Decision:** whether a traveller selecting a return fare keeps Basic or buys a paid fare bundle. Keep Seats, Bags, insurance and the full payment journey outside the main test.

The user supplied three fresh real-site captures and clarified the interaction: **initial Basic continuation → Regular upsell popup → either popup button applies the corresponding fare**. No further friction at this point was reported. The direct paid-selection path, recurrence and exact next page were not independently replayed.

- [Screenshot digest and provenance](ryanair-fare-screens/README.md): original images, verified copy hashes, route/date context, observed presentation and calculated prices. The captures were provided on 23 October; exact capture time and CSS viewport remain unknown.
- [Course reading map](course-reading-map.md) and [source manifest](course-sources.json): targeted review of five lecture decks, with supporting Week 4 and Week 7 PDF pages checked. Original book/article page citations remain unverified.
- [Official Ryanair bundle descriptions](https://help.ryanair.com/hc/en-ie/articles/12888555638161-What-are-Ryanair-s-fare-bundle-options), accessed 23 October 2026: supports broad inclusions, not captured prices or the click path.
- [Mathur et al., section 5.1.3](https://arxiv.org/html/1907.07032), accessed 23 October 2026: supports distinctions between visual interference, pressured selling and shame-based refusal wording; it is not a Ryanair effect estimate.

## Candidate findings for the audit

### 1. Upgrade-price framing and calculation burden

- **Where:** fare-table upgrade prices and the Basic/Regular popup.
- **What:** paid fares show an increment per flight; the popup emphasises “only”/“just” £27.75 more. For the captured return trip, the derived Regular increment is £55.50 and the derived total is £166.48. Upgraded checkout totals were not observed.
- **Principle:** Week 4 lecture PDF pp. 27 and 41-44, particularly the tiered-pricing passage on p. 44. Theory supports a hypothesis about relative increments; it does not establish a multiplication error.
- **Mechanism and goal alignment:** the incremental frame may make upgrading feel less costly or complicate whole-trip comparison. This could benefit upgrade sales when it causes underestimation. A clearly understood upgrade that fits a traveller's needs can benefit the traveller. Treat as a grey candidate pending evidence.
- **Severity drivers, without an anchor score:** possible cost is the upgrade increment when unwanted; the frequency of misunderstanding and effect on trust are unknown. Multiplication can be learned around, but that does not establish that users notice the need. Individual and agreed ratings remain pending.
- **Repair and prediction:** show whole-trip totals and increments together, on one consistent basis. Predict more correct whole-trip cost answers. Reconsider if comprehension does not improve or the price basis becomes less clear. No measured baseline or numeric effect estimate exists.

### 2. Unequal presentation and ease of comparison

- **Where:** Basic strip, paid comparison columns and highlighted recommendation/actions.
- **What:** Basic is separate above the paid matrix; Plus is highlighted on the table and Regular in the popup. Both popup choices are available.
- **Principle:** Week 7 lecture PDF pp. 6-7, 13-15 and 20, on fluency and presentation. Prominence and processing fluency are distinct possible mechanisms; neither effect has been measured here.
- **Mechanism and goal alignment:** emphasis may favour paid fares and separation may complicate comparison. The recommendation can help if its basis fits a traveller's needs; suitability is unknown. Treat as a grey visual-steering candidate, not proven deception.
- **Severity drivers, without an anchor score:** presentation is visible in this journey; its effect on fare fit, cost, learnability and trust is unmeasured. Individual and agreed ratings remain pending.
- **Repair and prediction:** make Basic's price/inclusions comparable and selection actions similarly prominent, while retaining useful feature information. Predict better identification of a suitable fare and its inclusions. Reconsider if comprehension or task completion worsens. A revision changing several elements tests their combined effect, not colour alone.

### 3. Basic-triggered upsell with missing-feature framing

- **Where:** popup after the initial Basic continuation.
- **What:** the interface asks the traveller to revisit Basic, highlights excluded extras and recommends Regular. Either action applies the selected fare, according to the user.
- **Principle:** Week 4 lecture PDF pp. 27, 45 and 48, on reference dependence and loss framing. Foregone extras are not automatically perceived losses. The user reported feeling shamed; that experience is recorded separately from a taxonomy finding.
- **Mechanism and goal alignment:** an interruption and missing-feature frame may encourage reconsideration in favour of an upgrade. It may also help a traveller who overlooked a needed inclusion. Use upsell interruption with visual pressure, or pressured-selling candidate; classify alignment against a stated traveller need.
- **Severity drivers, without an anchor score:** one prompt on this Basic path is supported; no repeated obstruction was reported. Any resulting cost, error, annoyance or trust effect is unmeasured. Both choices work. Individual and agreed ratings remain pending.
- **Repair and prediction:** apply Basic directly, with voluntary access to the comparison. Predict fewer unwanted upgrades for a Basic-compatible task, while checking understanding of exclusions and asking about perceived pressure. Reconsider if mistaken expectations about baggage or seating increase.

## Disposition of the eight prototype records

The UI contains seven numbered groups and eight records. These are not eight independently established main findings.

| Prototype record | Evidence decision |
| --- | --- |
| DP 1 scarcity | Scarcity copy is visible; fabricated scarcity is unverified. Keep as context outside the focused fare test. |
| DP 2 drip/anchoring | Retain with a narrower price-framing/calculation-burden description. Per-flight pricing is explicit; hidden mandatory fees are not established. |
| DP 3 visual | Retain as candidate 2 above, with effects and recommendation suitability unmeasured. |
| DP 4 modal/confirmshaming | Retain the observed upsell as candidate 3. Neutral refusal wording does not clearly establish confirmshaming. |
| DP 3 obstruction/friction subtopic | Merge analytically with candidate 3. It overlaps the same popup; quantified friction asymmetry and repeated barriers are unsupported. |
| DP 5 Seats | Prototype demonstration outside the main decision; fresh real-site captures do not verify this step. |
| DP 6 baggage | Prototype demonstration outside the main decision; preserve the distinction between a simulated warning and verified real-site conduct. |
| DP 7 travel protection | Prototype demonstration outside the main decision; no new real-site evidence of its default was supplied. |

Inherited annotation wording in the app still includes stronger claims than these findings. Chat 3 should make the audit's evidence status explicit. Do not silently treat all app labels as verified facts or change either variant as part of writing the audit.

## Proposed evaluation and useful support to retain

- **Primary metric:** proportion answering both the return-trip total and upgrade increment correctly for Regular, using a fixed, versioned fare scenario.
- **Guardrail:** proportion completing a valid fare selection without assistance. Also check whether the selected fare fits an explicitly stated baggage/seat need and whether its exclusions are understood.
- **Secondary evidence:** completion time and a direct question about perceived pressure. Upgrade rate alone is not a measure of consumer benefit.
- **Retain:** clear feature comparisons and the small-bag under-seat limitation. A helpful, justified recommendation need not be removed automatically.
- **Reject or revise:** repairs without a comprehension benefit, or with worse completion or need matching, should be reconsidered. Numeric forecasts, sample plan and decision thresholds must be stated prospectively for the next test, not described as existing results.
- **Version limit:** the captured real-site prices differ from the prototype. Do not use £166.48 as the answer key for a demo that still uses different prices; derive the key from the tested version. Keep the same economic choices across A and B.

## Chat 3 work and human inputs

1. Create root `AUDIT.md` from these qualified findings, citing the evidence and verified lecture PDF pages. Mark missing original-publication page references explicitly where needed.
2. Include member identifiers and individual/agreed severity fields with a clear `Pending` status. Each member rates privately before seeing others' scores; then record individual ratings and discuss an agreed score. Do not substitute AI scores for team judgements.
3. Keep the chronology explicit: the Ethical variant already existed before this audit. These notes cannot preregister that implementation. Separate future predictions from later observations.
4. Prepare the prospective test details and unresolved human inputs transparently. Keep app variants unchanged while writing the audit.
5. For the user's intended publication step, review the changed source and new files, run the relevant checks, commit/push the selected deliverables, and verify which commit Vercel actually serves. A new audit file alone will not publish the local UI changes. Keep the lecture PDFs outside the published repository.

The older Chat 3 sample prompt in `HANDOFF.md` excludes pushing because it predates this proposed sharing workflow. Use the user's latest explicit instructions for the next chat; this closeout itself does not perform a release.

Latest saved UI verification is [annotation-followup/verification.md](../2026-10-22/annotation-followup/verification.md): four regression tests, type checking and build passed, plus 53 final browser checks. That is the prior verification record, not a newly run release check. The inherited Vite warning and narrow fare-matrix panning are documented there. The UI changes and research notes remain uncommitted locally; root `AUDIT.md` has not yet been created.
