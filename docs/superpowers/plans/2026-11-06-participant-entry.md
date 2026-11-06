# Participant Entry Implementation Plan

> **For agentic workers:** Use test-driven development and execute the plan in the current chat. Steps use checkbox syntax for tracking.

**Goal** Deliver the participant and review entry paths, consent, and debrief for #1, #2, #3, and #7.

**Architecture** Resolve the entry once before React mounts. Reuse the existing fare screens and their selection actions. A participant completes fare choice, keeps the fare screen available for questions, then opens the debrief. The full booking flow opens at `?mode=review`.

**Tech stack** React, TypeScript, Vite, browser storage, and Node's test runner.

**Spec** The 6 November follow-up scope in this chat, the assignment guardrails in [HANDOFF.md](../../../HANDOFF.md), and the prospective test plan in [AUDIT.md](../../../AUDIT.md).

## Constraints

- Work on #1, #2, #3, and #7. Participant links are `?v=A`, `?v=B`, and the bare URL. A valid `v` overrides saved assignment.
- Keep the fare stimulus and the pilot's fare-choice endpoint. The debrief identifies the arm, states the simulation made no purchase, and explains the three fare-choice designs studied in A.
- Keep audit, comparison, variant switching, and booking steps after fare choice in review mode. Use a neutral participant title and copy.
- Preserve [AUDIT.md](../../../AUDIT.md). Log the substantive scope and implementation in [PROMPTS.md](../../../PROMPTS.md).

## Tasks

- [x] Add failing Node tests in `tests/study-entry.test.tsx` for consent gating, review startup, and assignment. Reproduce the missing consent and link behavior in a browser before implementation.
- [x] Add `resolveStudyEntry(search, getStorage, random?)` in `src/studyEntry.ts` and call it in `src/main.tsx`. Test explicit overrides, both random arms, reload persistence, and fallback when storage is unavailable.
- [x] Gate participant and review UI in `src/App.tsx`. Add consent and debrief copy in `src/components/StudyScreen.tsx`. Keep fare choices accessible while debrief is available. Use neutral fare and document labels in participant mode.
- [x] Verify direct A and B links, reloads, Basic upsell completion, a paid fare, debrief wording, and review controls at desktop and phone widths. Run the Node test suite, TypeScript check, and production build. Record the results in `PROMPTS.md`.

## Follow-up for #4, #5, and #8

- [x] Reproduce real branding, the footer email field, and A's Basic confirmation staying on Flights in review mode.
- [x] Use Alderwake Air and the `ALDW` prefix in the shared itinerary and booking UI. Keep original screenshots under `evidence/` and replace the branded prepaid credit image with the fictional mark.
- [x] Remove the newsletter signup. Reuse fare completion to open Seats after the A upsell in review mode and enable debrief in participant mode.
- [x] Check both arms, split review, phone layout, and the existing booking controls. Run the suite, type check, and build, then record the WhatsApp draft and deferred work in the handoff.
