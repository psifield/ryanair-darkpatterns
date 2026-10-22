# Annotation follow-up handoff

Prepared 22 October 2026 (Asia/Singapore). The user requested that the next tweaks happen in a new chat. No new Seats, Bags, Review, or audit implementation was made while preparing this handoff.

## Workspace and preserved state

- Work in `C:\Users\zhang\Documents\Decision Architecture Project` using the current local checkout. Preserve all uncommitted work. Do not reset, stash, replace, or clean the tree.
- Read `HANDOFF.md` for historical context and `evidence/2026-10-22/annotation-consistency/verification.md` for the latest completed annotation work. This document describes the next requested scope; older planning-only restrictions in the historical handoff are not the current implementation request.
- Current source changes: modified `src/components/FareSelectionDark.tsx` and `src/components/FlightSelection.tsx`; new `src/components/AuditMarker.tsx`. `HANDOFF.md` and `evidence/` are untracked. This new handoff is also untracked.
- DP 1–4 now share static rose pills, 10px bold text, and a small downward pointer. No bounce, pulse, breathing, or floating gap. DP 1 appears on both flight cards; DP 2 marks Regular's per-flight price; DP 3 marks the yellow ribbon; DP 4 marks Basic continuation and the modal's `DP 4 · Confirmshaming` label. Preserve their appearance, compact spacing, clicks, toggle, and the earlier ribbon clipping fixes.
- Original, Ethical, comparison, and Basic modal views were visually checked at 1440×1000 and 390×844, annotations on/off. All 24 marker click checks passed. Type check, production build, and diff whitespace checks passed after the final code change. The full booking journey was not retested. The inherited narrow fare matrix still pans horizontally.
- Evidence is under `evidence/2026-10-22/annotation-consistency/`, including full viewport captures, individual close-ups, and desktop/narrow contact sheets. These describe the pre-follow-up state; do not rewrite them as evidence of future changes.

## User's requested next changes

1. Add DP 5 in Seats, with an audit explanation of the pressure to pay for a reserved seat to sit with fellow travellers versus accepting random allocation.
2. Renumber the old DP 5, Ambiguous Baggage Allowance Framing, to DP 6. Add its flag in Bags beside the gate-fee warning card (the actual inherited heading is `Avoid Up to £60 Gate Fee!`; the user referred to `$60`). Preserve the existing currency and amount.
3. Add a Review & Pay flag and audit explanation for automatically opted-in Travel Protection Insurance. The user also called this DP 6, creating a numbering conflict with baggage.
4. Move the old DP 6, Asymmetrical Choice Architecture, either to DP 7 or into a collapsible DP 3 group with Visual Interference and Obstruction & Roadblock as separately selectable subtopics. Preserve the audit dialog's compact dimensions and formatting; a dropdown was permitted, not mandated.

## Decision needed before implementation

The user has not resolved the two uses of DP 6 or chosen between a separate friction entry and the proposed DP 3 group. Ask one concise numbering/grouping question in the new chat before dependent edits. Do not silently invent an agreed mapping.

Two coherent options to present:

- Flat list: DP 1–4 unchanged; DP 5 Seats; DP 6 baggage; DP 7 old choice-friction entry; DP 8 travel protection. This preserves the user's proposed renumbering of old DP 6 to DP 7, adds two records to the original six, and can use the dialog's existing sidebar scrolling without enlarging it.
- Grouped list: DP 1–2 unchanged; DP 3 contains separate visual-interference and choice-friction subtopics; DP 4 Basic modal; DP 5 Seats; DP 6 baggage; DP 7 travel protection. This is seven numbered groups representing eight retained/new audit records. Define what the count means explicitly instead of confusing group count with record count.

The old friction entry describes the Basic roadblock already covered by DP 4, more directly than the ribbon styling covered by DP 3. A DP 3 dropdown can group the two topics for navigation, but should not claim they are the same mechanism. Do not consolidate or discard an entry without resolving the user's preference.

The current request authorizes new audit content and renumbering. The prior task's unchanged-count constraint does not prohibit this new work; it prohibited manipulating the count merely to make a mismatch disappear. Keep the resulting count traceable to the agreed records/groups.

## Source findings for the next chat

- `src/data/mockData.ts`: `DARK_PATTERNS_AUDIT` currently contains six records, in order: `dp-scarcity`, `dp-drip-pricing`, `dp-visual-steering`, `dp-roadblock-confirmshame`, `dp-hidden-baggage`, `dp-asymmetric-friction`. Keep stable string IDs for existing entries where possible.
- `src/components/DarkPatternInspector.tsx`: sidebar numbers currently come from `idx + 1`; both its heading and the top banner use the array length. Grouping would require keeping selected leaf IDs, numbering, headings, and counts consistent. Its dialog already has bounded dimensions and a scrollable sidebar.
- `src/components/AuditMarker.tsx`: the number type currently allows only `1 | 2 | 3 | 4`; extend it only as required by the agreed mapping. Reuse its static styling and attached pointer for new flags.
- `src/types/booking.ts`: `DarkPatternAnnotation.category` is a closed union. New category names, if needed, must be represented consistently in the type and data.
- `src/App.tsx`: `SeatsStep`, `BagsStep`, and `ReviewStep` currently receive neither `showAuditMarkers` nor `onOpenAuditItem`; wire the existing global state/callback through to new flags. Do not change navigation or selection handlers.
- `src/components/SeatsStep.tsx`: Original mode shows `Warning: Do not get separated!` and claims passengers on the same booking are likely to be separated. The free-random-seat path opens `Are you sure you want to risk it?`, with a prominent paid-seat button and a decline label about taking the risk. Discuss this pressure copy and extra friction; truthful disclosure of random allocation alone is not evidence of deception. The inherited journey is for one adult; do not add travellers or change the booking to support a claim.
- `src/components/BagsStep.tsx`: the Original warning is `Avoid Up to £60 Gate Fee!`. The small-bag card below already displays dimensions. Flag the requested warning and ensure the explanation matches what is present; do not repeat the old assertion that this tab hides all dimensions. Avoid changing fare/bag content or asserting current real-world fees from this simulation.
- `src/components/ReviewStep.tsx`: `insuranceOptIn` is initialized with `useState(isDarkPattern)`; the optional premium is £14.50 and contributes to the local review total. This is distinct from the newsletter checkbox. Original mode also has an existing unnumbered `Dark Pattern: Pre-selected Opt-in` tag. New numbered annotation should respect the global toggle and must not accidentally toggle insurance when clicked. Annotate the default-selection mechanism; do not turn this task into a change to insurance defaults, price calculations, or newsletter handling.
- Insurance initialization happens on mount; switching modes while Review remains mounted retains current checkbox state. Verify initial Original and Ethical states by leaving/re-entering Review or starting fresh. Do not silently broaden scope to fix this inherited state behavior.
- Side-by-side comparison is implemented for flights/fares. Later steps currently receive `isDarkPattern={viewMode === 'dark-pattern'}`. Do not redesign the later steps into a dual flow as part of annotation work.

## Workflow and boundaries

Inspect relevant source and rendered behavior, resolve numbering/grouping, give a brief plan, then make the smallest coherent patch. Explain new records as observations/hypotheses about this prototype; do not invent research, legal conclusions, group ratings, or measured effects.

Keep this chat focused on the requested markers and audit explanations. Preserve prices, fare content, trip details, booking behavior, and inherited work. Do not create `AUDIT.md`, commit, push, or deploy without a new user request.

Verify all new flags and audit selections, global toggle, Original/Ethical states, affected dialogs, existing DP 1–4 regression, and actual desktop/narrow views. Judge screenshots visually, not only bounding boxes. Save new dated evidence separately from the completed verification above. Run the existing type check and production build.

Portable Bun: `node_modules/.cache/local-tools/bun-v1.4.4/bun-windows-aarch64/bun.exe`. Run `bun run lint` (TypeScript check) and `bun run build` with that executable, plus `git diff --check`. The inherited Vite `__dirname` compatibility warning remains. No new test framework is installed.

Preview used by the previous chat: `http://127.0.0.1:3000/`. Recheck availability; reuse it if appropriate. If needed, start Vite explicitly with `node .\node_modules\vite\bin\vite.js --host 127.0.0.1 --port 3000 --strictPort`, preserving loopback-only access. Do not use the clean script.
