# Chat 3: audit draft and explanatory-copy verification

23 October 2026, Asia/Singapore. Local checkout, including inherited uncommitted UI work. No commit, push or deployment in this task.

## Delivered scope

- Root [AUDIT.md](../../../AUDIT.md) follows the user's supplied template with product/decision/group/screenshot metadata and seven fields per finding. Unknowns and all scores stay Pending.
- Three main candidates: upgrade-price framing/calculation burden; unequal presentation/comparison; Basic upsell with missing-feature framing. DP 3 friction overlaps DP 4. Scarcity is context; Seats/Bags/travel protection are prototype-only records outside the main test.
- All findings are dated under `Added after building`. The document prominently states that the existing B predates the audit, and cannot be retroactively preregistered. Its forecasts and pilot tolerances are untested assumptions, not measured baselines or results.
- Audit explanations, scope/category labels, marker titles and necessary mode/comparison labels now agree. The legacy IDs, seven groups/eight records and their wiring remain intact. Existing CSS classes, booking handlers, prices, defaults and B implementation are preserved; one informational status paragraph was added to the inspector.
- No lecture PDF or rendered lecture page was copied into deliverables. No redesign, unrelated refactoring, dependency change, study infrastructure, `PROMPTS.md` or `REFLECTION.md` was added.

## Fresh verification

Exact command output is saved in [checks.txt](checks.txt).

- `node --import tsx --test tests/audit-annotations.test.tsx`: **4 passed, 0 failed**. Exact IDs/grouping, DP 3 leaf selection, annotation visibility, and £14.50 insurance/default totals remain covered. One assertion was updated for the qualified navigation category; no new business logic was introduced.
- Existing portable Bun `run lint` (`tsc --noEmit`): **exit 0**.
- Existing portable Bun `run build`: **exit 0**. The inherited Vite warning about future native-config support for `__dirname` remains; no configuration change was made.
- `git diff --check`: **exit 0**.
- Document checks: three complete finding-field sets; Pending private/individual/agreed rating workflow; honest chronology; explicitly untested numerical forecasts; local links; captured and demo arithmetic. The two cited lecture PDFs still match the existing source manifest's SHA-256 hashes. Original capture/template images and earlier evidence retain baseline hashes.
- Reviewed supporting assignment PDF pp. 5, 12, 29–30 and relevant Week 4/7 pages using the bundled PDF reader. Week 4 pp. 27, 44, 45, 48 and Week 7 pp. 6–7, 13–15, 20 were checked against the indexed map; original book/article pagination remains Pending.
- Reopened the official Ryanair fare-bundle page and Mathur et al. section 5.1.3 on 23 October 2026. The official small-bag dimensions differ from the preserved demo; the audit states that limit. Neither source verifies this journey's interaction effects or upgraded checkout prices.

## Browser verification

Reused the existing `http://127.0.0.1:3000/` preview after a strict-port start reported that port 3000 was already in use. No existing process was stopped or server configuration changed. Tested actual CSS viewport overrides of **1440 × 1000** and **390 × 844**, then reset the override. Browser automation was used for prototype verification, not to replay the live airline flow.

[browser-checks.json](browser-checks.json) records **30 successful targeted checks**:

- All eight audit records selected/rendered at each viewport, including both DP 3 leaves. Checked the candidate/context wording and existing-B chronology note. A separate price check confirmed both real-capture and demo bases appear.
- Both visible desktop scarcity markers and the DP 2/3/4 fare markers opened the matching records. At narrow width, checked the three fare markers and the popup's DP 4. The existing responsive flight section hides its scarcity cards when both flights are selected at narrow width; this is not a newly introduced marker failure.
- Basic popup continuation kept the demo at **£131.36**; switching in the popup applied Regular at **£189.86**. This is a local prototype check, not independent verification of the user's reported real-site path or a click-count measurement.
- Comparison labels described candidate mechanisms and an untested B. Existing B displayed the unchanged **£189.86 / £58.50** Regular answer key.
- Visually inspected the desktop and narrow audit panel. Existing narrow navigation and detail scrolling remain; the fare matrix still needs horizontal panning. No CSS/layout redesign was performed.

Screenshots:

- [Desktop upsell record](audit-modal-desktop.png)
- [Desktop price record](audit-price-desktop.png)
- [Narrow upsell record](audit-modal-narrow.png)
- [Narrow Basic popup with qualified marker](basic-popup-narrow.png)

Browser checks used current DOM state to correct automation selectors; resolved selector timeouts were not treated as product failures or included in the success count. They required no application changes. An optional TypeScript AST comparison was unavailable through the installed compiler package; preservation was instead checked through the full source delta, hashes and explicit class/handler comparisons.

## Preservation and release boundary

An ignored snapshot was recorded before editing. [preservation.json](preservation.json) reports every inherited file's disposition against that snapshot. All original flight/fare data before `DARK_PATTERNS_AUDIT` are byte-for-byte identical. Existing class attributes and event-handler attribute lines in the eight edited source files match the snapshot, excluding the declared new status paragraph. The existing B component, Seats/Bags/Review components, AuditMarker, package/lock/config files and all earlier evidence are unchanged. Source-delta inspection confirms explanatory-copy changes only; the test change is the category-label assertion.

The root audit and aligned copy are ready for team review and the later selected-files publication step. That release must audit both inherited work and these additions and verify the deployed commit; this task did not publish anything.

Still Pending: group/roster; independently locked and agreed scores/drivers/dates; lecturer's chronology interpretation; original-publication page references; exact real-capture device/time/version metadata; study controls, final protocol/build and participant data. The draft is not a claim of full assignment compliance or a study-ready production build. No full payment journey or real transaction was tested.
