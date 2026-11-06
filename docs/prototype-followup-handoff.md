# Prototype follow-up handoff

The follow-up builds on the 6 November 2026 audit baseline at `ea9e724`. The pilot ends at fare choice. Use `?mode=review` for the full booking demo. [Pilot protocol](../AUDIT.md)

## Participant entry and branding

- **#1** `?v=A` and `?v=B` select the specified participant variant. The bare URL randomly assigns an arm and saves it in browser storage. Explicit links override the saved arm for that visit.
- **#2 and #3** Consent precedes fare choice. Confirming a fare enables **View debrief** and keeps fares visible for follow-up questions. The debrief names the variant, states that no order was placed and no payment was taken, and describes the three studied designs in A.
- **#4** Both variants and the full demo use fictional Alderwake Air branding, a takeoff icon, and `ALDW` flight and booking codes. The original screenshots moved from `public/assets/aistudio/` to the repository evidence folder with their original filenames and bytes. Older capture paths in the audit refer to those archived files. [Source captures](../evidence/source-captures/aistudio/)
- **#5** The footer email signup was removed. The simulated promotional opt-in checkbox at Review is a separate audit element and takes no email address.
- **#7** Audit markers, variant switching, and side-by-side comparison open in the full demo at `?mode=review`.
- **#8** In that demo, either choice in A's Basic upsell closes it and opens Seats with the chosen fare. In participant mode, fare confirmation enables debrief.

All 18 tests, the TypeScript check, and the production build passed. Twelve local Edge scenarios covered participant entry, assignment, debrief, branding, the review flow, and Basic continuation at desktop and phone widths. The production output excludes the original source captures. [Implementation log](../PROMPTS.md)

## Booking follow-up

- **#9** Both pilot arms omit the simulated seat-availability badges. Original review still shows one outbound seat and four inbound seats as audit context. This is the recommended pilot treatment for group review because scarcity is outside the fare-choice study.
- **#10 and #11** A adds £14.50 Comprehensive at Review when the traveller has yet to make an insurance choice. B starts unchecked. An explicit decline keeps Basic at £131.36. Choosing Plus in Extras shows only that policy at £6.08, bringing Basic to £137.44. Review displays the same total as the cart, including after leaving and returning.
- **#12** Both versions offer row 18 as an included Regular seat and include the first selected 10 kg cabin bag. Those choices keep Regular at £189.86 before insurance. A paid seat and a second cabin bag add £38.00 to that total. Basic still charges £8.00 for a reservation and £30.00 return for the first cabin bag.

All 26 tests, the TypeScript check, the production build, and 11 local Edge scenarios passed. The scenarios covered both pilot arms at desktop and phone widths, assignment and overrides, the Original scarcity example, the insurance choices and totals, mirrored insurance in split view, and Regular and Basic pricing. [Implementation log](../PROMPTS.md)

## Published status

**#6** The README lists the four entry links. On 7 November 2026 (SGT), five fresh Edge sessions verified the direct pilot links through consent and debrief, the bare link's saved assignment after a direct override, the full review demo, and direct entry to review in B. A fresh link check is pending for the next release. [README](../README.md)

## Prompt log for the follow-up chat

Entries 10 and 11 cover the initial checklist verification, participant entry, branding, and Basic continuation. Blocks labeled *Edited user input* or *Edited follow-up* preserve the request with more polished wording. [Prompt log](../PROMPTS.md)

Entry 12 already records the booking follow-up. When asked to update the log, expand that entry with the substantive requests from the booking chat using the same labels. Keep the original issue numbers, scope, and decisions. Record what was implemented, the checks actually run, and whether they used the local or published build.
