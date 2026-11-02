# Course Evidence and Prompt Log Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Give every existing audit record a relevant lecture citation and a qualified explanation, while recording the actual work in PROMPTS.md.

**Architecture:** Retain the current DarkPatternAnnotation records, renderer, IDs and booking behaviour. Update explanatory strings and matching annotation labels; append the process record without rewriting earlier entries.

**Tech Stack:** Existing React, TypeScript, Vite, Markdown and Node test runner. No new dependencies.

**Spec:** PROMPTS.md, Entry 4, records the lecturer feedback and substantive scope decisions. Xianlong's clarification on 31 October 2026 requires a selective log that gives the lecturer useful evidence of the work and judgement.

**Status:** Prepared on 30 October 2026; logging scope revised and implementation authorised on 31 October 2026. Implemented and locally verified on 31 October 2026. Final wording awaits Xianlong's review.

## Global Constraints

- AUDIT.md is frozen. Its starting SHA-256 is E3625DD61AB31287BB4DE91195D2FDDB07E07DC638326D3F7D642592005BAD87.
- Cover all 11 records in the 10 numbered groups, including both DP3 leaves. Keep their IDs and numbers.
- Cite lecture week and one-based lecture PDF pages first. Reuse readings when relevant. Original assigned book/article pages are supplementary and must be verified before inclusion.
- Distinguish an observation, a course mechanism and an untested application. A citation does not verify airline policies, popularity, deception, a behavioural effect or a legal violation.
- Preserve fares, selections, defaults, handlers, navigation, layout and the existing B implementation.
- Preserve PROMPTS.md Entries 1-3. Record corrections in a new dated entry. Attribute student decisions to Xianlong and AI assessments to Codex.
- Log prompts that materially affect the analysis, design, implementation, evidence or validation. Use exact text or clearly label excerpts, with actual output and judgement. Omit acknowledgements, coordination instructions and repetitive clarification exchanges. Keep meaningful failures and corrections. Unknown prompt times stay unknown; records made after an exchange say so.
- Lecture PDFs and rendered slides remain outside the repository. No commit, push or deployment is part of this change.

## Review Focus

- Page-number errors: compare each proposed locator below with the actual one-based PDF page; do not present lecture page numbers as publication pages.
- Overstated mechanisms: retain explicit limits for availability accuracy, emotional responses, defaults, visual prominence and social norms.
- Duplicate navigation: both DP3 records must still open independently and identify the same overlapping upsell as DP4 where applicable.
- Copy length: evidence paragraphs must remain readable and scrollable on desktop and a narrow viewport.
- Historical preservation: AUDIT.md's hash and the original PROMPTS.md prefix must remain unchanged.

## Verified Source Map

These are lecture connections, not verified original-publication page citations. Relevant complete pages and selected diagrams were checked; this is not a claim that every page of every deck was closely read.

| Record | Lecture support to lead with | Application and required limit |
| --- | --- | --- |
| DP1 seat availability | Week 4, PDF pp. 27, 48 | Limited reference-framing connection: the quoted fare may become a reference point. A missed offer is not automatically an experienced loss. No direct scarcity-specific lesson was located; availability accuracy and urgency effects remain unverified. |
| DP2 upgrade pricing | Week 4, PDF p. 27, pp. 41-44, especially p. 44 | Tiered upgrades and incremental price framing. Keep arithmetic burden as a hypothesis; neither hidden mandatory fees nor actual calculation errors are established. |
| DP3 visual presentation | Week 7, PDF pp. 6-7, 13-15, 20 | Processing fluency, spacing and contrast. Separate readability/comparison from visual prominence; no universal gold/yellow effect or measured purchase effect. |
| DP3 overlapping Basic upsell | Week 4, PDF pp. 27, 45, 48 | Include its own explicit locators even though it shares DP4's mechanism. State that this is the same interaction, not an additional finding or score. |
| DP4 Basic upsell | Week 4, PDF pp. 27, 45, 48 | Reference state, loss framing and the distinction between losses and foregone gains. Extras were not taken away. Confirmshaming and repeated obstruction remain unestablished. |
| DP5 seat pressure | Week 4, PDF p. 64 | Negativity bias is the closest primary connection for the separation warning. The one-adult prototype cannot establish group separation risks or anxiety effects. |
| DP6 baggage warning | Week 4, PDF pp. 27, 64; pp. 31-33 as an optional framing analogy | The potential gate fee may foreground a negative outcome. Airline surcharge/discount framing is an analogy, not an experiment on this warning. The fee, dimensions and unnecessary purchases remain unverified. |
| DP7 preselected protection | Week 4, PDF pp. 73-76, especially p. 75 | Explicit opt-in/opt-out wording and starting entitlements. Explain retention through inaction without transferring the lecture examples' effect sizes to this prototype. |
| DP8 Fast Track | Week 4, PDF pp. 27, 64; Week 7, PDF pp. 13-15, 20 | Queue contrast foregrounds a negative outcome; action contrast may affect noticeability/readability. Do not claim proven anxiety, fear of missing flights, impulsive clicks or actual queue-time differences. |
| DP9 insurance | Week 4, PDF pp. 41-44, 64-65; Week 7, PDF pp. 13-15, 20 | Incremental upgrade pricing, insurance framing, negative refusal wording and contrast. The cards show daily rates; describe the visible presentation precisely. No proven shame, hidden total, policy value or purchase effect. |
| DP10 transport | Week 9, PDF pp. 13-14, 27, 35, 39, 48 | Descriptive social information and relevant reference groups. Popularity accuracy and effects are unverified. Late placement alone does not establish sunk-cost escalation. |

Local lecture sources:

- Week 4: MGMT6108_AY2627August_Week04_Preview.pdf.
- Week 7: MGMT6108_Week07_Preview.pdf.
- Week 8: MGMT6108_Week08_Review.pdf.
- Week 9: MGMT6108_Week09_REview.pdf.
- All remain in C:/Users/zhang/Documents/Decision Architecture Readings.

Week 8, PDF pp. 53-56 and 65-66, supplies context-specific colour examples and boundary conditions; it does not justify a universal airline gold/yellow purchase claim. Weeks 1-3 supplied no stronger scarcity/default match than the Week 4 connections above.

Supplementary taxonomy was checked against the primary Mathur paper: https://arxiv.org/html/1907.07032. Section 5.1.3 covers misdirection, including pressured selling and confirmshaming. Social Proof is section 5.1.4; section 5.1.2 is Urgency. Obstruction is section 5.1.6 and its observed type is Hard to Cancel; do not attribute a named interstitial-roadblock type to that paper.

## Task 1: Update and Verify the Audit Explanations

**Files:**

- Modify src/data/mockData.ts: the 11 existing records' evidence strings and any explanation/title that overstates the verified support.
- Modify src/components/DarkPatternInspector.tsx: clarify one-based lecture locators and replace the stale blanket statement that team ratings remain unmeasured.
- Modify src/components/ExtrasStep.tsx and src/components/FastTrackModal.tsx: matching audit-marker titles, labels and analysis notes only.
- Modify src/types/booking.ts: rename the DP10 category literal from Social Proof & Sunk Cost to Social Proof.
- Modify tests/audit-annotations.test.tsx: update the existing navigation expectations from 7 groups/8 records to the current 10 groups/11 records.

**Interfaces:**

- Consumes DARK_PATTERNS_AUDIT: DarkPatternAnnotation[] and DARK_PATTERN_GROUPS.
- Produces the same records, fields, IDs, numbers and callbacks, with revised explanatory strings. No new data model or runtime behaviour.

- [x] Run the existing tests and type check before editing. Baseline: 2 of 4 tests fail because they expect 8 records/7 groups; the current application has 11 records/10 groups. Type checking passes.
- [x] Update the two stale test expectations and explicit record-ID list to include DP8, DP9 and DP10. Retain the DP3 selection and insurance/default assertions.
- [x] Run the full existing test command; expect 4 tests passing:

      node --import tsx --test tests/audit-annotations.test.tsx

- [x] Apply the source map. Every Evidence, Course Source & Limits paragraph must start with a self-contained lecture citation, then explain applicability and limits. Add original publication pages only when actually verified.
- [x] Narrow DP8's title to Fast Track Interstitial & Queue Framing and DP10's title to Transport Popularity Cues & Late Add-ons. Update their matching markers. Describe sunk-cost escalation as unestablished, and correct or remove the invalid external attributions. Keep applicable Mathur references supplementary.
- [x] Check corresponding prototype observations against the components. For DP9, preserve the distinction between the displayed £1.17/£1.52 daily rates and the £0.35 incremental tag; do not infer a verified policy total or value.
- [x] Run the full tests, type check, build and whitespace check; inspect every changed record in the rendered inspector. Check desktop and a narrow viewport, both DP3 leaves, and evidence text for DP6, DP7 and DP10. Save representative screenshots outside the repository.

      node --import tsx --test tests/audit-annotations.test.tsx
      node ./node_modules/typescript/bin/tsc --noEmit
      node ./node_modules/vite/bin/vite.js build
      git diff --check

No new logic or copy-mirroring tests are needed. Source accuracy is checked against the lecture pages; the existing tests cover navigation, marker visibility and the insurance default.

## Task 2: Complete the Append-only Work Log

**Files:**

- Modify PROMPTS.md by appending substantive implementation requests, response summaries, checks, problems and decisions after Entry 4.

**Interfaces:**

- Consumes the actual conversation and verification output, plus the source map above.
- Produces a chronological Markdown record of substantive prompts or labelled excerpts, honest output summaries, separate student/AI assessments and lecture/principle checks.

- [x] Keep Entries 1-3 intact and retain Entry 4's substantive lecturer feedback, decisions and source corrections.
- [x] Log prompts and outcomes that explain a material decision or change. Summarise useful clarification under its relevant entry; omit approval-only and coordination-only messages. Never fill in Xianlong's acceptance or participant outcomes.
- [x] Record tests/build results with observed counts and any warnings/failures. Explain the baseline's stale test expectations and any remaining source gaps.
- [x] Verify AUDIT.md's SHA-256 against the frozen hash above. Verify the original PROMPTS.md content is still an unchanged prefix, allowing only newline representation differences.
- [x] Review the final diff: only planned explanatory text, category typing, relevant test expectations and appended log content may change. Report local completion and remaining limitations without implying publication or experimental validation.

## Handoff

Xianlong authorised implementation after reviewing the task list. Source research, matching-label updates and an independent source check were parallelised. All 11 rendered records were checked at desktop width; DP6, DP7 and DP10 evidence also passed wrapping checks at mobile width. The browser viewport override was reset, and DP6 was left open on localhost.

Verification: all four tests, type checking, production build and whitespace checks passed. The pre-existing Vite __dirname config warning remains. Original-publication page locators and behavioural effects remain unverified. No commit, push or deployment was performed.
