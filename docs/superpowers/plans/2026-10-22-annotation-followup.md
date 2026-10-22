# Annotation follow-up implementation plan

> Execute in this chat in the existing local checkout. The user authorized implementation and selected grouped navigation. Preserve every inherited change; no delegated work, commits, pushes, deployment, dependencies, or AUDIT.md.

**Goal:** Add Seats, Bags, and travel-protection annotations with seven numbered groups containing eight records.

**Architecture:** Keep stable audit record IDs; give each record its agreed number and derive navigation groups from those numbers. Reuse AuditMarker and the existing global toggle/callback. Use a native disclosure for DP 3's two distinct topics and retain the bounded audit dialog.

**Tech stack:** Existing React, TypeScript, Vite, Tailwind; Node's test runner and installed tsx for a small regression check.

**Spec:** ANNOTATION_HANDOFF.md and the user's grouped-navigation choice in this chat.

## Constraints and review focus

- DP 1–4 marker styling, IDs, clicks, fare content, prices, and booking handlers stay intact.
- DP 3 contains Visual Interference and Obstruction & Roadblock; friction overlaps DP 4 and is not the ribbon mechanism.
- DP 5 Seats; DP 6 baggage; DP 7 travel protection. Seven groups, eight records, no record discarded.
- Preserve the Bags warning's £60; acknowledge the dimensions already shown below it.
- Explain the prototype's social-pressure/default mechanisms as hypotheses, without research or legal conclusions. Insurance is distinct from newsletter consent.
- New flags must disappear with the global toggle and in Ethical mode; opening insurance's audit must leave its checkbox and total intact.
- On narrow screens, navigation and detail must each remain scrollable within the existing dialog size.

## Task 1: Grouped records and navigation

- [x] Add `tests/audit-annotations.test.tsx`: assert the exact seven-group/eight-record mapping, unique retained IDs, and independent DP 3 leaf selection.
- [x] Run `node --import tsx --test tests/audit-annotations.test.tsx`; confirm missing grouping fails before implementation.
- [x] Update `src/types/booking.ts` and `src/data/mockData.ts` with numbers, two new records, qualified baggage/friction content, and derived `DARK_PATTERN_GROUPS`.
- [x] Update `DarkPatternInspector.tsx`, `ComparisonBanner.tsx`, and their App caller: compact disclosure, explicit counts, direct leaf selection, bounded mobile navigation.

## Task 2: New markers

- [x] Include render checks for new marker numbers, global off, Ethical mode, insurance defaults, and newsletter independence in the same test file.
- [x] Extend `AuditMarker.tsx`'s number type; pass toggle/callback through `App.tsx` to Seats, Bags, and Review.
- [x] Attach DP 5 to the separation warning, DP 6 to the gate-fee warning, and DP 7 to the insurance card outside its checkbox label. Preserve booking handlers and all prices.
- [x] Rerun the regression test until it passes.

## Task 3: Verification and evidence

- [x] Inspect 1440×1000 and 390×844 actual viewports: new markers on/off, Original/Ethical initial states, seat confirmation, Basic modal, and DP 1–4 regression including comparison mode.
- [x] Test both DP 3 leaves, disclosure collapse/expand, direct marker opening, and all new marker clicks; verify insurance selection/total/newsletter survive an audit click.
- [x] Save actual screenshots, close-ups, interaction results, and verification notes under `evidence/2026-10-22/annotation-followup/`.
- [x] Run existing portable Bun `run lint`, `run build`, and `git diff --check`; inspect diff and baseline hashes for inherited-file preservation.
- [x] Reset the temporary viewport override; leave the local preview available.

