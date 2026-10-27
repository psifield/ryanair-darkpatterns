# AUDIT.md - Ryanair · the decision: keep Basic or buy a paid fare bundle

**Current status (2026-10-23):** Individual ratings recorded; final consolidated severity is **3/4, 2/4, 3/4**, using rounded averages. See [final consolidated findings and calculations](#final-consolidated-findings-and-severity-2026-10-23). Earlier Pending rating fields are retained as history; study results remain Pending.

**Original draft status:** Retrospective draft, created 23 October 2026 (Asia/Singapore). Ready for team review; ratings and study results are Pending.

**Chronology limitation:** The existing Ethical/B prototype predates this audit. It is already present in the initial repository commit, `5579bef45d918a5b1af75e91179736a582ea4f4f`. This document cannot retroactively meet the assignment's requirement to commit the audit before the first prompt for B. No date, prediction or result below is presented as a pre-build record. The lecturer's acceptance of this chronology remains Pending.

**Group:** Pending group number. **Members (4):** Aishan, Roy, Xianlong, Zinuo.

**Product:** Ryanair's browser fare-selection flow, studied through user-supplied captures and a local reconstruction. The prototype is a simulation, with no actual flight purchase in this audit.

**Screenshots taken:** Exact real-site capture date/time Pending; supplied as fresh captures on **2026-10-23**. Desktop browser view; physical device, operating system, browser version, zoom, CSS viewport and Ryanair site/build version Pending. Each original PNG is 2303 × 1476 pixels; raster dimensions do not establish a CSS viewport. The visible itinerary is one adult, London Stansted–Palanga return, 1–8 November 2026, GBP. [Originals and digest](evidence/2026-10-23/ryanair-fare-screens/README.md) · [copy hashes and provenance](evidence/2026-10-23/ryanair-fare-screens/provenance.json).

**Prototype screenshots:** Prior local verification is dated **2026-10-22**, at 1440 × 1000 and 390 × 844 CSS viewports; exact capture times, physical device and browser version Pending. The app displays 4–8 October and different prices. Package version `0.0.0` is not a deployed build identifier; the reviewed source includes uncommitted changes. See [prior verification](evidence/2026-10-22/annotation-followup/verification.md). Next study build/commit, deployment and capture metadata: Pending.

**Decision sentence:** When a traveller decides whether to keep Basic or buy a paid fare bundle for a return journey, the screen may steer them toward upgrading through incremental price framing (Week 4, reference dependence/diminishing sensitivity), unequal presentation and comparison effort (Week 7, processing fluency), and a Basic-triggered upsell highlighting excluded benefits (Week 4, framing of losses versus foregone gains). These mechanisms are hypotheses, not demonstrated behavioural effects; the verified course sources and PDF pages are given per finding.

**Chosen scope:** One consequential fare-bundle decision. Three qualified main candidates, not eight proven independent findings. Flight scarcity is context; Seats, baggage add-ons and travel protection are outside the main audit/test.

## Added after building

### 2026-10-23 — Retrospective evidence and prospective predictions

The findings are placed under this heading because B already existed. Each retains the supplied [assignment template's fields](evidence/2026-10-23/audit-template-original.png). The assignment brief is `mgmt6108-term-paper.pdf`, PDF pp. 29–30 (template begins at slide 46); its severity guidance is on PDF p. 12, slide 21. These are PDF locators, not slide numbers.

Observations below come from the captures, the user's walkthrough report, and the documented prototype. Predictions apply to a **future frozen test**, not to past development. No participant baseline, effect estimate, severity score or team agreement has been measured here. Numerical forecasts below are explicitly **untested planning assumptions**, not results or estimates derived from Ryanair users.

### Finding 1 - Upgrade-price framing and calculation burden

- **Where:** Paid-fare price buttons in [capture 02](evidence/2026-10-23/ryanair-fare-screens/02-fare-selection-original.png), and the Regular price in [capture 03](evidence/2026-10-23/ryanair-fare-screens/03-basic-upsell-original.png). Website record: DP 2, `dp-drip-pricing` (retained identifier).
- **What the user sees and does:** Regular is +£27.75, Plus +£38.99 and Flexi Plus +£92.00, explicitly labelled per flight. Basic is £110.98 for the captured return trip. The popup describes Regular's increment as small relative to the fare. A traveller wanting a whole-trip comparison must combine the base and two increments. For Regular, £27.75 × 2 = £55.50 extra; £110.98 + £55.50 = £166.48. These are calculations from displayed labels, not observed upgraded checkout totals. Underestimation has not been observed in a participant study; hidden mandatory charges are not established.
- **Principle:** **Week 4**, reference dependence and diminishing sensitivity. **Course source:** Sungjong Roh, `MGMT6108_AY2627August_Week04_Preview.pdf`, PDF p. 27 and pp. 41–44, especially p. 44 on tiered pricing/upgrades. The briefing maps Week 4 to Kahneman, chapters 26, 27 and 34, and Kern & Chugh; those original readings' relevant editions/pages are **Pending**, not verified citations. The lecture supports an incremental-frame hypothesis; it does not prove a return-flight multiplication error. See [reading map](evidence/2026-10-23/course-reading-map.md).
- **Mechanism, whose goal wins:** An increment may feel smaller in the context of an existing purchase; converting per-flight amounts may also create calculation burden. These are distinct hypotheses. The firm's upgrade-sales goal could win when the traveller underestimates an unwanted upgrade. A correctly understood bundle can serve a traveller who needs its extras. **Judgement: grey candidate**; a chooser-serving nudge if comparison helps their stated need, potential sludge if avoidable calculation burden undermines it. Intent and causal harm are unestablished.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. Preserve each member's score and driver in the rating ledger below before recording agreement. **Driver:** This frame is visible at the fare decision; how often it causes error is unknown. An unwanted Regular upgrade would add a calculated £55.50 in this capture, not an observed loss. Travellers can learn to multiply, but may not notice the basis. Comprehension and trust effects are unmeasured. No anchor score supplied.
- **Repair (what should be true afterwards):** Show the whole-trip total and upgrade increment together for every fare on the same passenger/journey basis; keep a readable per-flight breakdown. The existing B already displays the demo's totals; its benefit remains untested. Confirm the next tested version implements this requirement before recruitment.
- **Prediction:** The primary metric—answering **both** Regular's return total and return increment correctly—will be higher in B. **Untested forecast only:** about 50% in A to 70% in B, a 20 percentage-point difference; neither value is a measured baseline. **We drop or revise this repair if** a sufficiently precise follow-up rules out a positive comprehension benefit, or it makes the journey/passenger price basis less clear or breaches the completion/need-fit guardrails. An inconclusive small pilot leads to more evidence, not a claim of success.

### Finding 2 - Unequal presentation and ease of comparison

- **Where:** Basic strip above the paid matrix, Plus recommendation ribbon and fare actions in capture 02; Regular recommendation and actions in capture 03. Website record: DP 3 visual subtopic, `dp-visual-steering`.
- **What the user sees and does:** Basic sits separately above three paid columns. Plus has a gold border and destination recommendation in the table; Regular has a recommendation banner and filled yellow upgrade action in the popup. Basic's popup action is outlined with blue text. Both popup actions are available. The user must compare inclusions across differently presented options; no eye tracking, recommendation-suitability check or comprehension effect has been measured. The demo's grey Basic popup control differs from the real capture's blue control.
- **Principle:** **Week 7**, processing fluency and ease of processing. **Course source:** Sungjong Roh, `MGMT6108_Week07_Preview.pdf`, PDF pp. 6–7 and 20; fonts, spacing and contrast examples on pp. 13–15. The briefing lists Petrova et al. and Lee & Aaker for Week 7; original titles/page mappings relevant to this claim are **Pending**, and those originals are not treated as consulted sources. Visual prominence and subjective fluency are separate possible mechanisms. No specific colour effect or regulatory-fit effect is established by these pages.
- **Mechanism, whose goal wins:** Prominence may draw attention to paid options; a separate Basic layout may make comparison harder. This could favour sales over a traveller's lowest-cost suitable choice. A justified recommendation can also save effort when it fits that traveller's needs; its basis is unknown here. **Judgement: grey visual-steering candidate**, not proven deception or a measured attention effect. It becomes chooser-serving when it makes a suitable option easier to identify, and problematic when it systematically impairs need matching.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. **Driver:** The differing presentation is visible in this journey; exposure across other bookings is unknown. Possible cost is an unsuitable fare or extra comparison time, neither quantified. Learning the matrix may help; learnability, misunderstanding frequency and trust effects are unmeasured. No anchor score supplied.
- **Repair (what should be true afterwards):** Make Basic's price/inclusions comparable with paid fares and make fare-selection controls similarly prominent. Retain clear feature information and any recommendation whose basis is stated and useful. The existing B offers a four-fare comparison; a future test must verify equivalent economic choices in both arms.
- **Prediction:** More travellers in B will identify the lowest-cost bundle meeting the stated need **and** correctly identify its small-bag, seat and overhead-bag inclusions. **Untested forecast only:** about 60% in A to 80% in B; no observed baseline. **We drop or revise this repair if** a sufficiently precise follow-up shows no positive benefit on that joint outcome, or price comprehension, completion or need matching worsens beyond the proposed guardrails. A revision combining layout, wording and button emphasis tests their combined effect; it cannot establish that colour alone caused a difference.

### Finding 3 - Basic-triggered upsell with missing-feature framing

- **Where:** The Basic continuation action and subsequent Regular popup in capture 03. Website records: DP 4, `dp-roadblock-confirmshame`, and overlapping DP 3 friction subtopic, `dp-asymmetric-friction`.
- **What the user sees and does:** The user reports **initial Basic continuation → Regular upsell popup → either popup button applies the corresponding chosen fare**, with no further friction at that point reported. The popup highlights excluded extras with red crosses, recommends Regular and emphasises its upgrade action. The user described feeling shamed toward Regular; this is one person's reported pressure, not a taxonomy result or participant prevalence estimate. The exact next page, recurrence and direct paid-selection path were not independently replayed. Repeated roadblocks, a blocked/disabled Basic choice and a quantified click-count difference are unsupported.
- **Principle:** **Week 4**, reference dependence and framing of losses versus foregone gains. **Course source:** Roh, `MGMT6108_AY2627August_Week04_Preview.pdf`, PDF pp. 27, 45 and 48. Page 48 specifically distinguishes perceived losses from foregone gains. Original Kahneman/Kern & Chugh page citations are **Pending**. For terminology, [Mathur et al. (2019), section 5.1.3](https://arxiv.org/html/1907.07032), distinguishes visual interference, pressured selling and refusal language designed to shame. The HTML section was checked on 23 October 2026; print-page mapping Pending.
- **Mechanism, whose goal wins:** Revisiting Basic and presenting missing benefits may encourage upgrading. A loss-framing account requires those extras to become the traveller's reference point; no benefit was actually taken away, and loss aversion is unproven. The firm may gain an unwanted upgrade; a traveller who overlooked a needed inclusion may benefit. **Judgement: grey upsell-interruption/pressured-selling candidate**; potential sludge for a Basic-compatible goal, potentially helpful information for an extras-dependent goal. The neutral Basic refusal label does not clearly establish confirmshaming. DP 3 friction and DP 4 refer to this same interaction and receive one main finding/score.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. **Driver:** One prompt on this Basic path is supported, not repeated obstruction. Time, annoyance, monetary and trust effects are unmeasured; either popup choice works according to the user. Learning to dismiss it may reduce effort, but learnability has not been tested. No anchor score supplied.
- **Repair (what should be true afterwards):** Apply Basic directly, keeping voluntary access to the feature comparison and clear exclusions. The existing B selects fares without this popup; its effect on understanding is untested. Do not remove useful baggage/seat information merely to reduce prompts.
- **Prediction:** For the explicitly Basic-compatible, minimum-spend task, B will reduce selection of a costlier bundle that the task does not need. **Untested forecast only:** about 30% in A to 15% in B; no measured rate of unwanted upgrades exists. Also predict lower self-reported pressure; ask rather than infer it from clicks. **We drop or revise this repair if** baggage/seat-exclusion misunderstandings rise by more than the proposed 5 percentage-point guardrail, need matching or completion breaches its guardrail, or a sufficiently precise follow-up shows no reduction in task-incompatible upgrades. In the paid-needs task, an appropriate Regular choice is a benefit, not an error.

### Private ratings, then preserved agreement

Use the briefing's 0–4 scale: 0 not a problem; 1 cosmetic; 2 minor; 3 major; 4 severe. Rate frequency, cost, ability to learn around it and trust, not how strongly a theory sounds. Scores are judgements about this decision, not measured effect sizes.

Each teammate should inspect the same dated evidence and rate **privately before seeing anyone else's numbers**. Send sealed notes to a coordinator or submit simultaneously; the coordinator withholds all scores until every member has locked theirs. Sharing this score-free draft is compatible with that process. Do not publish early scores in the repository where remaining raters would see them. After locking, append one row per member per finding, preserve the original scores and reasons, then discuss an agreed score without overwriting individuals. Record dissent if agreement is not reached.

| Finding | Member | Independent score 0–4 | Individual driver |
| --- | --- | --- | --- |
| 1 | Aishan | Pending | Pending |
| 1 | Roy | Pending | Pending |
| 1 | Xianlong | Pending | Pending |
| 1 | Zinuo | Pending | Pending |
| 2 | Aishan | Pending | Pending |
| 2 | Roy | Pending | Pending |
| 2 | Xianlong | Pending | Pending |
| 2 | Zinuo | Pending | Pending |
| 3 | Aishan | Pending | Pending |
| 3 | Roy | Pending | Pending |
| 3 | Xianlong | Pending | Pending |
| 3 | Zinuo | Pending | Pending |

All twelve individual scores and drivers remain Pending. Publish the completed rating ledger only after all four members have locked their private scores.

| Finding | Agreed score 0–4 | Discussion date | Agreed driver / preserved disagreement |
| --- | --- | --- | --- |
| 1 | Pending | Pending | Pending |
| 2 | Pending | Pending | Pending |
| 3 | Pending | Pending | Pending |

### Prospective test plan — recorded 2026-10-23, not yet run

**Question and estimand:** Does the combined fare-choice revision improve return-trip cost comprehension while preserving valid completion, need matching and understanding of exclusions? A comparison of the existing A and B is exploratory: B predates these predictions and contains several simultaneous changes. It cannot isolate each mechanism or validate the original build chronology.

**Freeze the protocol before further development, then the stimulus before recruitment:** Before any further B implementation prompt, commit a new dated prospective entry specifying intended A/B differences, task wording, assumed answer key, exclusions and analysis; record that protocol commit's actual hash/date. After implementation, append the tested build/deployment, screenshots, confirmed answer key and any departures before recruiting. Preserve the prospective entry rather than rewriting it to match the build. Study readiness is **Pending**: use a fictional brand, consent/debrief, one stable A/B assignment per participant, and a participant view without audit markers, inspector or mode labels that disclose the hypothesis. The current demonstration is not asserted to provide those study controls. They are later work, not implemented by this audit. Stop at fare choice; do not include Seats, Bags, insurance or payment in the experiment. Hold fares, features, initial state and device conditions constant across A/B, documenting unavoidable differences.

**Recruitment and assignment:** Proposed convenience pilot: **24 consenting adults**, 12 per arm, with six per arm assigned each of two task profiles. Randomise arm 1:1 within profile using a prepared balanced list; each person sees one arm and one task only. Team members who built or audited the prototype are excluded. Recruit until the fixed target or a prespecified closing date (Pending), independent of observed outcomes. This is a procedure/comprehension pilot, not a powered efficacy claim. A later confirmatory sample size requires a justified baseline, smallest worthwhile effect and precision/power calculation; those inputs are Pending.

**Tasks:** (1) Travel with only a fitting under-seat small bag; accept random allocation, need no priority/flexibility, and minimise fare spend: Basic is the lowest-cost suitable bundle in this fixed task. (2) Need a 10 kg overhead cabin bag, priority boarding and a standard reserved seat, but no checked bag or flexibility; minimise fare spend: Regular is the lowest-cost suitable bundle. Evaluate the bundle decision only, not unpriced standalone alternatives or everyone's real travel preferences.

**Procedure:** Provide the same neutral task and consent explanation. Start timing at the fare-choice screen; allow normal comparison and calculation, recording calculator use without coaching. The traveller explicitly tells the facilitator their final fare; any Basic popup must be resolved before that choice is recorded. Do not count the preselected initial Basic state as completion. Record success within a proposed five-minute limit, then ask the two cost questions, the inclusion questions and perceived pressure on a 1–7 scale. Keep the fare screen available for the questions: this measures usable price information rather than unaided recall. Do not force a purchase or proceed to payment. Debrief after answers, explaining simulation, assignment and research purpose. No names, contact details, credentials or payment data; use anonymous participant codes and record withdrawal/technical failures without inventing replacement outcomes.

**Primary metric:** Proportion of assigned, consenting participants answering **both** “What is Regular's total for this return journey?” and “How much more is that than Basic for the whole return journey?” correctly in GBP to the penny. Blank or incorrect answers count as failures; report withdrawals and technical missingness by arm separately, plus a complete-case sensitivity summary. Freeze this scoring rule before testing.

**Guardrail:** Proportion completing a valid, explicit fare choice within five minutes without assistance. Proposed acceptable B-minus-A margin: **no worse than −5 percentage points**. Also require need-fit accuracy not to fall by more than 5 points and baggage/seat-exclusion errors not to rise by more than 5 points. These are **prospective design tolerances, not measured results**; the small pilot cannot establish such tight margins. Any apparent harm triggers investigation before expansion.

**Secondary/diagnostic outcomes:** Lowest-cost suitable fare plus correct inclusion answers (Finding 2); task-incompatible upgrades in the Basic-compatible profile (Finding 3); pressure ratings; time; assistance and calculation use. Upgrade rate alone is not consumer welfare. Report both task profiles separately as well as the prespecified balanced overall comparison; do not pool away harm to travellers who need paid extras.

**Analysis and decision:** Report arm counts/denominators, proportions, B-minus-A percentage-point differences and 95% intervals for the primary metric and guardrails (Wilson intervals per proportion; Newcombe interval for the difference). Report descriptive time/pressure distributions and all missingness. The pilot's positive point estimates alone do not establish benefit or noninferiority. Broad intervals mean inconclusive. Treat per-finding results as exploratory because the combined B changes multiple elements. A sufficiently precise follow-up whose interval's upper bound is at or below zero for a predicted benefit rejects that positive prediction; evidence of guardrail harm calls for revision. Freeze the follow-up precision/sample plan before running it. Keep or revise a repair against its own rejection condition, not a preference poll or a fall in upgrades alone.

#### Versioned arithmetic and answer keys

| Source/version | Basic return total | Regular per flight | Regular return increment | Regular return total |
| --- | ---: | ---: | ---: | ---: |
| Real-site captures supplied 2026-10-23 | £110.98 | +£27.75 | £55.50, calculated | £166.48, calculated |
| Current local demo, `FARE_TIERS` and existing B | £131.36 | +£29.25 | £58.50 | £189.86 |

For the demo, £51.99 + £79.37 = £131.36; £29.25 × 2 = £58.50; £131.36 + £58.50 = £189.86. Its Plus and Flexi Plus totals are £217.84 and £320.36. For the captures, calculated Plus/Flexi Plus totals are £188.96/£294.98. None of the captured upgraded totals was observed at checkout. **Use the frozen tested version's key**: a study retaining today's demo prices must score £189.86 and £58.50, not £166.48 and £55.50. Recalculate and record the key if the scenario changes; use identical economic choices in both arms.

### Useful decision support to retain

Retain the feature comparison, clear distinction between under-seat/overhead/checked baggage, and the statement that the small bag must fit under the seat. This can support the chooser's own goal by preventing a baggage mismatch; its effect is still a hypothesis. A recommendation can help if its basis matches the stated need. Paid extras can be useful. B would itself create sludge if equalised presentation made needs harder to compare or direct Basic selection concealed important exclusions.

The demo's 40 × 20 × 25 cm small-bag rule is a simulation detail, not current airline guidance. [Ryanair's official fare-bundle page](https://help.ryanair.com/hc/en-ie/articles/12888555638161-What-are-Ryanair-s-fare-bundle-options), checked 23 October 2026, states 40 × 20 × 30 cm for the small bag. It corroborates broad bundle inclusions, not captured prices or interaction paths. Do not present the demo's dimensions or all its feature claims as verified airline policy. Preserve the demo for this task; reconcile any study stimulus before testing and log that separately.

### 2026-10-23 — Post-build audit-copy corrections and website mapping

The website's “Ryanair UX Audit” explanations are aligned with this retrospective draft. Only explanatory titles, labels, scope/source statements and mechanism descriptions are in scope. Booking behaviour, prices, defaults, visual design and the existing B implementation are preserved. “Ethical” is the inherited variant name and a design aim, not a measured outcome. The seven numbered groups/eight records remain navigational records:

| Group / retained record ID | Status in this focused audit |
| --- | --- |
| DP 1 `dp-scarcity` | Context: availability copy is visible; fabricated scarcity is unverified. No main finding or severity score here. |
| DP 2 `dp-drip-pricing` | Main candidate 1: per-flight price framing/calculation burden. The legacy ID is not a finding of hidden mandatory costs. |
| DP 3 `dp-visual-steering` | Main candidate 2: unequal presentation and comparison. Effects/suitability unmeasured. |
| DP 3 `dp-asymmetric-friction` | Overlaps main candidate 3 / DP 4. No second main finding or score; direct paid-path comparison remains unverified for the real site. |
| DP 4 `dp-roadblock-confirmshame` | Main candidate 3: Basic upsell with missing-feature framing. Legacy ID does not establish confirmshaming. |
| DP 5 `dp-seat-pressure` | Prototype-only contextual demonstration; these real-site captures do not verify Seats. |
| DP 6 `dp-hidden-baggage` | Prototype-only contextual demonstration; supplied captures do not verify its warning, fee or dimensions. |
| DP 7 `dp-travel-protection` | Prototype-only contextual demonstration; no fresh real-site evidence of this default. |

Neither the retained identifiers nor taxonomy navigation establishes legal violations. Course theory is explanatory support, not causal evidence about these users. The copy correction is dated after building and is not an experimental repair or participant result. Verification of this draft and its copy alignment is recorded in [Chat 3 verification](evidence/2026-10-23/chat-3-audit/verification.md).

### Sources and outstanding human inputs

- **Assignment:** User-supplied [template image](evidence/2026-10-23/audit-template-original.png), preserved without editing; local `C:/Users/zhang/Downloads/mgmt6108-term-paper.pdf`, PDF p. 5 (course-to-reading map), p. 12 (severity) and pp. 29–30 (template/chronology). No claim that the new document repairs the chronology violation.
- **Real-site evidence:** [Screenshot digest](evidence/2026-10-23/ryanair-fare-screens/README.md), [originals/provenance](evidence/2026-10-23/ryanair-fare-screens/provenance.json) and the user's sequence report recorded there. Unknown capture metadata and unreplayed paths remain unknown.
- **Course sources:** [Reading map](evidence/2026-10-23/course-reading-map.md) and [hash/page manifest](evidence/2026-10-23/course-sources.json). Lecture PDFs remain in `C:/Users/zhang/Documents/Decision Architecture Readings`, outside published deliverables. All lecture locators above are one-based PDF pages; original book/article citations remain Pending. No lecture PDF or rendered lecture page is included here.
- **Taxonomy:** Mathur et al. (2019), *Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites*, [section 5.1.3](https://arxiv.org/html/1907.07032), checked 23 October 2026. It distinguishes candidate labels; it is not a Ryanair effect estimate. Print-page locator Pending.
- **Team inputs Pending:** Group number; privately locked individual ratings/drivers; agreed ratings/date/rationale; lecturer's interpretation of the existing-B chronology; original reading editions and publication-page citations.
- **Study inputs Pending:** Final stimulus/build and commit, consent/debrief and assignment controls, recruitment owner/closing date, tested-version key confirmation, final protocol sign-off and any follow-up sample calculation. No participants have been recruited or outcomes reported in this audit. Repository publication/deployment is a later step, not evidence that the study is ready.

### Future additions and chronology rule

After team review, preserve this dated retrospective record. Append the locked ratings and agreed rationale as a new dated entry; do not silently overwrite the original Pending state. Before requesting any subsequent B implementation, commit a clearly labelled prospective protocol/prediction entry and record its actual commit hash/date. Thereafter append implementation departures, corrections and observed outcomes under **Added after building**, keeping that prospective snapshot intact. The historical first prompt for the existing B and its exact time are Pending; do not reconstruct or backdate them.

### 2026-10-23 — Individual ratings received; consolidation Pending

This entry supersedes the individual-rating Pending placeholders in the original draft above. Agreed scores and group discussion remain **Pending** for the next step.

**Source and independence:** Xianlong supplied his, Zinuo's, Roy's and Aishan's responses in this chat; their scores and reasons are preserved below. Aishan's **2.5/4** is retained as submitted, without rounding.

The submitted reasons express individual judgements. Claims about psychological mechanisms or effects remain interpretations subject to the evidence limits in Findings 1–3; these ratings do not establish participant outcomes or verify additional course citations. The scale remains 0 not a problem; 1 cosmetic; 2 minor; 3 major; 4 severe.

| Finding | Member | Individual score 0–4 | Individual driver |
| --- | --- | --- | --- |
| 1 | Aishan | 2.5 | Based on Hedonic Editing from Weeks 4 and 5, the way prices are shown can affect how people feel about spending money. When upgrade prices are shown as small amounts per flight, users may focus on each amount instead of the total cost of the return trip. Although this has not been tested on this specific page, the theory helps explain why the design could affect how users see the price. I think this issue is between 2 to 3. |
| 1 | Roy | 3 | Reason (Cost & Mental Accounting): Hiding the return trip total behind a per-flight label (+£27.75) exploits diminishing sensitivity. An unintended upgrade adds £55.50 (a 50% increase over the base fare), shifting an unearned calculation burden onto the user. |
| 1 | Xianlong | 3 | Per-flight upgrade prices make the return cost harder to compare with Basic. Regular adds £55.50 across two flights, so overlooking that calculation could mean a substantial unintended spend. |
| 1 | Zinuo | 4 | I rated this 4/4 because Basic displays the total return fare, while upgrades show additional costs per flight in smaller text. This inconsistent pricing format makes it easy to underestimate the actual cost. For example, Regular adds £55.50 for a return trip, roughly 50% of the Basic fare, making this a significant pricing transparency issue. |
| 2 | Aishan | 1 | The fare options are presented differently. For example, Plus has a gold border and a recommendation label, while the upgrade button is more eye-catching. This may draw more attention to the paid options. However, there is no clear evidence that these design can actually change users’ decisions. I would rate this as 1/4 based on the current evidence. |
| 2 | Roy | 2 | Reason (Fluency): Separating Basic into a top strip and highlighting paid tiers with badges and yellow call to action(s) biases visual attention. However, Basic remains clearly visible and selectable, making this comparison disfluency rather than a blocker. |
| 2 | Xianlong | 2 | Paid fares receive more visual emphasis, which may make comparison less balanced. Basic remains visible and selectable, and the effect on choices has not been tested. |
| 2 | Zinuo | 2 | I rated this 2/4 because the visual emphasis on paid fares may influence users' choices, although Basic remains visible and selectable. |
| 3 | Aishan | 3 | After users select Basic, a pop-up suggests upgrading and highlights the features that Basic does not include. It may make users feel pressured and annoyed, especially when they have already made their choice. So a better design would let users continue with Basic directly and allow them to compare others if they want to. The comparison should also avoid repeating information that is already shown on the main page. Although the actual effect has not been tested, reducing these extra steps could make the booking process more comfortable and make user feel they are be respected. |
| 3 | Roy | 3 | Reason (Loss-Framing): Experienced by people who chose Basic tier. The modal forces an unnecessary speed bump and uses red 'X' icons to reframe unbundled features as active losses. Because the dismissal button is functional, it isn't a severe blocker, but it constitutes coercive choice architecture right at commitment. |
| 3 | Xianlong | 3 | After I choose Basic, the popup asks me to reconsider and stresses missing benefits. I see this pressure at commitment as a major issue, even though I can continue with Basic. |
| 3 | Zinuo | 2 | I rated this 2/4 because the upsell popup creates unnecessary friction and pressure, although users can still easily continue with Basic. |

**Consolidation status:** Pending. No final agreed score or shared rationale is recorded in this entry. Differences remain preserved: Finding 1 ranges from 2.5 to 4, Finding 2 from 1 to 2, and Finding 3 from 2 to 3.

### Final consolidated findings and severity (2026-10-23)

**Recorded decision:** Xianlong adopted **3/4 (Major), 2/4 (Minor), and 3/4 (Major)** for the audit's final consolidation on 23 October 2026 (Asia/Singapore). This entry supersedes the earlier Pending consolidated-score fields. All individual scores, reasons and differences remain preserved; this records Xianlong's consolidation rather than a unanimous team vote.

**Calculation:** Give each of the four members equal weight, take the arithmetic mean for each finding, then round to the nearest whole severity level (halves rounded up). Retain the exact mean alongside the final category. These means summarise judgements on the 0–4 scale, not measured behavioural effects.

| Finding | Aishan | Roy | Xianlong | Zinuo | Exact mean | Final consolidated severity |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | 2.5 | 3 | 3 | 4 | 3.125 | 3/4 (Major) |
| 2 | 1 | 2 | 2 | 2 | 1.75 | 2/4 (Minor) |
| 3 | 3 | 3 | 3 | 2 | 2.75 | 3/4 (Major) |

#### Finding 1: Upgrade-price framing and calculation burden (3/4, Major)

Basic displays the return fare, while paid upgrades display increments per flight. For Regular, the captured labels require calculating £27.75 × 2 = £55.50 extra, about 50% of Basic's £110.98, giving a calculated £166.48 total. This creates avoidable calculation burden and a risk of underestimating a substantial upgrade cost. Actual pricing errors or financial losses have not been observed. **Repair:** Show the full-journey total and upgrade increment together for every fare, with a readable per-flight breakdown.

#### Finding 2: Unequal presentation and ease of comparison (2/4, Minor)

Basic sits in a separate strip, while paid bundles receive stronger visual emphasis through borders, recommendations and prominent actions. This may draw attention to paid options and make comparison less balanced. Basic remains visible and selectable; the final minor rating reflects possible steering and comparison effort with no demonstrated effect on choices. **Repair:** Present Basic and paid fares on a comparable basis, with similarly prominent selection controls and clearly explained recommendations.

#### Finding 3: Basic-triggered upsell with missing-feature framing (3/4, Major)

In the reported flow, continuing with Basic opens a Regular upsell that stresses excluded benefits through red crosses and a prominent upgrade action. Reopening the decision after Basic has been chosen creates an interruption and may exert pressure at commitment. For a traveller whose needs fit Basic, this is a major concern even though either popup action applies the corresponding fare. **Repair:** Apply Basic directly and retain an optional feature comparison with clear exclusions.

**Evidence limits:** Underestimation, attention effects, loss framing and unwanted upgrades remain hypotheses. The submitted reasons are preserved, while the consolidated findings make no claim of proven psychological effects, repeated obstruction or measured harm. The existing source qualifications and chronology limitation still apply.

### 2026-10-28 — Ancillary flow audit (Fast Track, Insurance, Ground Transport)

Observations below audit the newly replicated post-seat transition and Extras tab ancillaries in Screen A.

---

### Finding 4 - Post-Seat Fast Track Interstitial Roadblock
- **Where:** Post-seat transition modal before Bags/Extras steps.
- **What the user sees and does:** Completing seat selection triggers a compulsory full-screen modal urging travellers to "Skip long security queues" for £7.49 per flight, showing a queue-contrast graphic ("Everyone else queue" vs "Fast Track lane") with an oversized yellow "Add Fast Track" button vs. a faint "No, thanks" text link.
- **Principle:** Week 4, framing and loss aversion (Kahneman ch. 26–27); Week 7, fluency and asymmetric visual weight (Petrova et al.; Lee & Aaker); Mathur et al. (2019) §5.1.4 (Obstruction / Interstitial Roadblock).
- **Mechanism, whose goal wins:** Primes queue anxiety and fear of missing flights to induce an impulsive add-on purchase before baggage can be evaluated. Asymmetric visual weight steers clicks to the paid action. The platform wins (£7.49/leg). SLUDGE.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. Preserve each member's score and driver in the rating ledger below before recording agreement. **Driver:** how often (100% of seat choosers reach it) and cost (£7.49/flight). No anchor score supplied.
- **Repair (what should be true afterwards):** Remove the roadblock modal completely. Position Fast Track as an optional card inside the Extras step with equal, neutral buttons.
- **Prediction:** Fast Track take-up drops from ~40% in A to 15% in B without reducing flight booking completion. We drop this repair if total booking completion falls by >5 percentage points.

---

### Finding 5 - Travel Insurance Micro-Rate Framing & Confirmshaming
- **Where:** Extras tab (Travel Protection matrix) and refusal control.
- **What the user sees and does:** Prominent UK FCDO warning induces compliance anxiety. The top-tier Plus plan is framed as "just £0.35 extra per day" rather than the lump-sum policy price (£14.50), and declining forces the traveller to click "No thanks, I will travel without insurance".
- **Principle:** Week 4, reference dependence & diminishing sensitivity (Kahneman ch. 34; Kern & Chugh); Mathur et al. (2019) §5.1.3 (Confirmshaming & Visual Steering).
- **Mechanism, whose goal wins:** Daily micro-rate reduces the perceived pain of paying, while confirmshaming induces guilt and loss aversion on refusal. The platform wins insurance commission. SLUDGE.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. Preserve each member's score and driver in the rating ledger below before recording agreement. **Driver:** cost (£14.50 policy) and harm to trust from confirmshaming. No anchor score supplied.
- **Repair (what should be true afterwards):** Display transparent whole-trip policy costs upfront (£14.50) without daily rate masking, with neutral active choice buttons ("None", "Standard", "Plus").
- **Prediction:** Insurance take-up moves from ~35% in A to 15% in B, while traveller comprehension of policy coverage increases from 40% to 75%.

---

### Finding 6 - Ground Transport Bandwagon Cues & Sunk Cost Timing
- **Where:** Extras tab (Transport & Parking cards).
- **What the user sees and does:** The £65.00 Meet & Greet Parking is styled with gold borders and an unverified "MOST POPULAR & CONVENIENT" badge, and the £119.20 Nissan Qashqai SUV has a "CUSTOMER FAVOURITE" badge.
- **Principle:** Week 9, descriptive norms and social proof (Goldstein & Mortensen; Berger & Heath); Week 4, sunk cost escalation and drip timing (Roh pp. 27, 87–90); Mathur et al. (2019) §5.1.2 (Social Proof Heuristic).
- **Mechanism, whose goal wins:** Unverified popularity badges manufacture consensus. Placing £65–£120 commitments at the very end of the funnel exploits sunk cost momentum, as travellers who already invested effort in flights, seats, and bags exhibit lower price resistance. Platform wins high-margin ancillaries. SLUDGE.
- **Severity 0–4:** Individual member scores **Pending**; agreed score **Pending**. Preserve each member's score and driver in the rating ledger below before recording agreement. **Driver:** high cost (£65–£120) and unverified social proof claims. No anchor score supplied.
- **Repair (what should be true afterwards):** Neutral card presentation sorted by transparent distance/price, remove unsubstantiated popularity badges, and display clear total trip prices.
- **Prediction:** Selection of Meet & Greet parking drops from ~55% in A to 25% in B, with travellers choosing options that match their actual budget.

---

### Private ratings ledger for Findings 4–6

All individual scores and drivers below remain **Pending** for team members to lock in privately before group discussion.

| Finding | Member | Independent score 0–4 | Individual driver |
| --- | --- | --- | --- |
| 4 | Aishan | Pending | Pending |
| 4 | Roy | Pending | Pending |
| 4 | Xianlong | Pending | Pending |
| 4 | Zinuo | Pending | Pending |
| 5 | Aishan | Pending | Pending |
| 5 | Roy | Pending | Pending |
| 5 | Xianlong | Pending | Pending |
| 5 | Zinuo | Pending | Pending |
| 6 | Aishan | Pending | Pending |
| 6 | Roy | Pending | Pending |
| 6 | Xianlong | Pending | Pending |
| 6 | Zinuo | Pending | Pending |

| Finding | Agreed score 0–4 | Discussion date | Agreed driver / preserved disagreement |
| --- | --- | --- | --- |
| 4 | Pending | Pending | Pending |
| 5 | Pending | Pending | Pending |
| 6 | Pending | Pending | Pending |
