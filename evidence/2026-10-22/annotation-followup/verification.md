# Annotation follow-up verification

22 October 2026, Asia/Singapore. Local preview: http://127.0.0.1:3000/.

This records the requested marker, navigation, and explanatory-copy changes. It is not a formal behavioural or legal audit.

## Agreed numbering

The user selected grouped navigation in this chat: **seven numbered groups containing eight audit records**. No existing record was discarded.

| Group | Records |
| --- | --- |
| DP 1 | `dp-scarcity` |
| DP 2 | `dp-drip-pricing` |
| DP 3 | `dp-visual-steering` (Visual Interference); `dp-asymmetric-friction` (Obstruction & Roadblock) |
| DP 4 | `dp-roadblock-confirmshame` |
| DP 5 | `dp-seat-pressure` (new) |
| DP 6 | `dp-hidden-baggage` |
| DP 7 | `dp-travel-protection` (new) |

DP 3's native disclosure keeps two individually selectable subtopics. Its friction record explicitly identifies its overlap with DP 4's Basic dialog and distinguishes that interaction from the recommendation ribbon. Grouping does not make these independent validated findings.

## Implemented scope

- Reused the static rose AuditMarker and attached pointer for the Seats separation warning, Bags gate-fee warning, and Review insurance card. The new flags open their own records and follow the existing global visibility toggle and Original/Ethical mode condition.
- Preserved the Bags heading `Avoid Up to £60 Gate Fee!`, currency, amount, and displayed dimensions. The revised explanation acknowledges that the allowance cards already show dimensions.
- Added a Seats explanation covering pressure to reserve seats to sit with fellow travellers, the free random alternative, risk wording, and the extra confirmation. It acknowledges the demo's one-adult booking and untested group-seating outcomes.
- Added a separate insurance explanation: Original starts Review checked at £14.50; Ethical starts unchecked. Insurance remains distinct from newsletter consent. The numbered flag sits outside the checkbox label; the inherited unnumbered annotation also follows the visibility toggle.
- Derived groups from explicit record numbers. The banner and inspector both state group count and record count. Retained the dialog's existing width, maximum height, typography, and panel formatting; bounded the narrow navigation height so both navigation and detail can scroll.
- Left prices, fare definitions, selection handlers, booking navigation, insurance defaults, newsletter logic, and DP 1–4 content unchanged. New/updated explanations distinguish prototype observations and hypotheses from external research or legal findings.

## Verification

- `node --import tsx --test tests/audit-annotations.test.tsx`: **4 passed, 0 failed**. Tests cover the exact mapping and retained IDs, separate DP 3 content, marker mode/toggle visibility, and insurance defaults/totals independently of newsletter consent. Before implementation, three new-feature tests failed and the existing insurance/default regression passed.
- Existing portable Bun `run lint` (`tsc --noEmit`): **exit 0**.
- Existing portable Bun `run build`: **exit 0**. The inherited Vite future-config warning about `__dirname` remains.
- `git diff --check`: **exit 0** after the source changes.
- **53 final browser checks passed**, including all **24 existing-marker click combinations**: six occurrences in Original and comparison views, at desktop and narrow sizes. Both DP 1 occurrences, DP 2, DP 3, Basic continuation's DP 4, and the modal's DP 4 opened the expected record.
- Inspected actual **1440×1000** and **390×844** CSS viewports, with Original/Ethical annotations on/off, the seat warning dialog, the Basic dialog, both DP 3 topics, and comparison-view existing markers. The phone-frame control was not used as responsive evidence. Reset the temporary viewport override afterward.
- Checked insurance audit clicks preserve the selected checkbox, newsletter state, and total; checked Ethical defaults by leaving and re-entering Review. All six new-marker style measurements have 10px bold text, 19px pill height, no animation, zero target gap, and a 4px pointer.
- Baseline preservation: **128 of 137 pre-existing files remain byte-for-byte identical**. The other nine are the intended edited source files; there are no unexpected changes. In particular, the inherited uncommitted `FareSelectionDark.tsx` and `FlightSelection.tsx`, both handoffs, earlier evidence, package manifest, and lockfile retain their initial hashes. See `preservation-results.json` and `baseline-hashes.json`.

## Evidence index

- `final-new-markers-desktop.jpg` / `final-new-markers-narrow.jpg`: close-ups of the three new annotations with their actual targets.
- `final-all-markers-desktop.jpg` / `final-all-markers-narrow.jpg`: all six existing occurrences plus the three additions.
- `final-audit-dp3-visual-*` / `final-audit-dp3-friction-*`: independent DP 3 topics in the compact inspector.
- `final-audit-dp5-*`, `final-audit-dp6-*`, `final-audit-dp7-*`: each new or revised explanation, desktop/narrow.
- `final-original-*`, `final-ethical-*`, `final-comparison-*`: viewport captures, visibility states, and affected dialogs. There are 72 final viewport captures and 30 close-ups. Screenshot rasters are scaled by the browser tool; crop provenance records the CSS-to-raster conversion.
- `final-interaction-checks.json`, `final-marker-styles.json`, `final-new-marker-styles.json`, `final-crop-provenance.json`: interaction results, measurements, and screenshot crop sources. Contact sheets contain labelled crops of real browser captures; no UI pixels were synthesized.
- `regression-tests.txt`, `typecheck.txt`, `build.txt`: final automated command output.

Draft/incomplete screenshot attempts were removed from this new evidence directory. Earlier evidence directories were preserved.

## Limits

The inherited narrow fare matrix still requires horizontal panning. Switching modes while Review stays open retains its current insurance selection; leave and re-enter to compare initial defaults. Later comparison-mode steps retain their existing single Ethical branch. The complete booking journey and simulated payment confirmation were not retested; external research and inherited DP 1–4 assertions were not revalidated.

No AUDIT.md, dependency change, commit, push, deployment, or booking-flow redesign was made.
