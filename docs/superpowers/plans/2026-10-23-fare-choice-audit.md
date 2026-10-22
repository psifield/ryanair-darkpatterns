# Fare-choice audit implementation plan

**Goal:** Create a reviewable root `AUDIT.md` and align the website's audit explanations with its qualified evidence.

**Architecture:** Keep the existing React prototype and annotation IDs. Change documentation and explanatory strings only; preserve fare data, handlers, defaults, marker wiring, layout and the existing B component.

**Tech stack:** Markdown, React, TypeScript, Vite; existing Node test runner and portable Bun.

**Spec:** Latest Chat 3 request in `HANDOFF.md`; assignment template in `evidence/2026-10-23/audit-template-original.png`; evidence in the Chat 2 closeout and course reading map.

## Constraints and review focus

- Preserve inherited uncommitted work; compare with an ignored baseline snapshot.
- Three main candidates, seven numbered groups, eight records; DP 3 friction overlaps DP 4.
- Separate observations, user reports and hypotheses; do not infer false scarcity, hidden mandatory fees, repeated obstruction, a click-count difference or established confirmshaming.
- B predates this audit; no retrospective preregistration claim. Unknown metadata, identities and ratings stay Pending.
- Lecture PDF pages are not original publication pages. Keep lecture files and renders outside deliverables.
- No redesign, behavioural change, new dependency, commit, push or deployment in this task.

## Task 1: Draft the audit

**Create:** `AUDIT.md`.

- [x] Follow the supplied template: metadata, decision sentence and all seven finding fields, including private individual/agreed ratings and severity drivers.
- [x] Cite verified lecture PDF pages and evidence; distinguish captured prices from the demo's answer key.
- [x] Put retrospective findings and corrections under dated `Added after building`; include a prospective protocol, primary metric, guardrail, rejection conditions and useful support to retain.
- [x] Check every local reference, required field, arithmetic calculation and Pending human input.

## Task 2: Align explanatory copy

**Modify:** `src/data/mockData.ts`, `src/components/DarkPatternInspector.tsx`, necessary marker/mode/comparison labels in `FareSelectionDark.tsx`, `FlightSelection.tsx`, `ComparisonBanner.tsx`, `SideBySideView.tsx` and `src/App.tsx`; annotation category strings in `src/types/booking.ts` and their existing test assertion.

- [x] Qualify titles, mechanisms, sources and scope; describe existing B as untested.
- [x] Retain all IDs/numbers and change no booking/visual implementation.
- [x] Run `node --import tsx --test tests/audit-annotations.test.tsx`, portable Bun `run lint`, portable Bun `run build`, and `git diff --check`.
- [x] Inspect the affected audit view on desktop and narrow viewports and check marker navigation.

## Task 3: Record the handoff

**Modify:** `HANDOFF.md`. **Create:** `evidence/2026-10-23/chat-3-audit/verification.md` and targeted browser evidence.

- [x] Record fresh checks and baseline preservation, chronology/source limits, and unresolved human inputs.
- [x] Report the draft ready for review and the later publication step without claiming a release or study has occurred.
