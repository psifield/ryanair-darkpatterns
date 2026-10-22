# Annotation consistency verification

22 October 2026 (Asia/Singapore). Local preview: http://127.0.0.1:3000/.

This records a presentation change and source mapping, not a new behavioural audit.

## What changed

- Added `src/components/AuditMarker.tsx` and used it for all six marker occurrences in `FlightSelection.tsx` and `FareSelectionDark.tsx`.
- Every marker uses the existing DP 3 rose pill treatment: 10px bold text, 19px pill height, a 4px downward pointer, and no animation. Normal case and letter spacing prevent the ribbon's typography from changing DP 3's label.
- DP 1 sits above each seats-left message. DP 2 sits above the Regular per-flight price. DP 3 remains attached to the yellow ribbon. DP 4 sits above Basic continuation and the modal heading; the latter explicitly reads `DP 4 · Confirmshaming`.
- The modal marker aligns left to avoid its close button at narrow widths. The Basic banner wraps its existing contents to keep the continuation button and marker inside the card.
- Preserved the earlier uncommitted ribbon headroom, scroller, and rounded-corner fixes. Existing click IDs, annotation toggle, fare content, prices, and booking handlers remain unchanged.

## Why the banner says six

`App.tsx` passes `DARK_PATTERNS_AUDIT.length` to `ComparisonBanner`. That array contains six records. `DarkPatternInspector` numbers them by array position (`idx + 1`), independently of how many page markers are rendered.

| Dialog number | Record ID | On-page annotation |
| --- | --- | --- |
| DP 1 | `dp-scarcity` | Both flight cards' seats-left messages; two occurrences of one ID |
| DP 2 | `dp-drip-pricing` | Regular's per-flight upgrade price |
| DP 3 | `dp-visual-steering` | Yellow Plus recommendation ribbon |
| DP 4 | `dp-roadblock-confirmshame` | Basic continuation and its upsell modal; Confirmshaming belongs here |
| DP 5 | `dp-hidden-baggage` | Audit dialog only; baggage information record |
| DP 6 | `dp-asymmetric-friction` | Audit dialog only; unequal friction between Basic and upgrade selection |

DP 6 discusses the extra Basic confirmation step already described by DP 4. It is an overlapping account of the same interaction, not another independently marked screen element. Thus the current count means **six audit records**, with **four distinct on-page marker IDs**. It does not establish six independent, validated findings.

The array, numbering, count, and inherited audit claims were not edited. Any later decision to relabel the count, qualify a claim, or consolidate overlapping entries belongs to a separate content review.

## Verification

- Existing `bun run lint` (`tsc --noEmit`): passed after the final code change.
- Existing `bun run build`: passed after the final code change. The inherited Vite warning about `__dirname` and future native config loading remains.
- `git diff --check`: passed.
- Original, Ethical, and Side-by-Side comparison views were visually inspected at actual 1440×1000 and 390×844 browser viewports, with annotations on and off. The built-in phone frame was not used as viewport evidence.
- Both flight cards were inspected with markers on and off. At narrow widths, use **Edit flights** to reveal the cards; the existing UI otherwise hides them when both flights are selected.
- The Basic upsell was inspected in Original and comparison views, at both viewport sizes, with markers on and off. Its annotated heading clears the close control. Basic continuation still dismisses the modal, and the close control remains operable.
- All six marker occurrences opened the expected audit entry in both Original and comparison views, at both sizes: 24 successful click checks (`interaction-checks.json`).
- The toggle removes/restores the markers. Ethical view has no DP markers in either toggle state, as before.
- Computed styles confirm shared colour, typography, pill height, pointer dimensions, no animation, and a zero gap between each marker and its target wrapper (`marker-styles.json`). Screenshots were also judged visually; these measurements were supplementary.
- Hash checks preserved all 19 pre-existing handoff, evidence, audit-data, package, and lock files byte-for-byte. The existing uncommitted source changes were retained; the new source diff is limited to the shared marker and its two callers.

## Screenshot index

- `marker-closeups-desktop.jpg` and `marker-closeups-narrow.jpg`: all six occurrences together with their targets. These are labelled crops of actual browser captures, enlarged for reading.
- `dp1-*`, `dp2-*`, `dp3-*`, `dp4-*`: individual close-ups.
- `original-desktop-*` / `original-narrow-*`: flight cards, fares, and Basic modal with annotations on/off.
- `comparison-desktop-*` / `comparison-narrow-*`: comparison-view fares, flight cards, and Basic modal with annotations on/off, including the panned fare matrix where needed.
- `ethical-desktop-*` / `ethical-narrow-*`: Ethical view with the annotation toggle on/off.
- `audit-record-5.jpg` / `audit-record-6-overlap.jpg`: the two dialog-only records and the six-entry list.
- Matching `.geometry.json` files record viewport dimensions and marker/target rectangles for the captures.

## Scope limits

The inherited fare matrix still needs horizontal panning in narrow containers. The comparison view retains its existing stacked narrow layout and fixed Ethical continuation bar. This task did not redesign those behaviours or retest the complete booking journey, and it did not validate the inherited behavioural or regulatory claims. No `AUDIT.md`, commit, push, deployment, or dependency change was made.
