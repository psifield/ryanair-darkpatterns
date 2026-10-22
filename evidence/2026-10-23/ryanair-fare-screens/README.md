# Ryanair fare decision: screenshot evidence digest

Prepared 23 October 2026 (Asia/Singapore). Working research notes for the user-selected decision, **Basic versus a paid fare bundle**. This is evidence preparation for the later audit, not a completed audit or user study.

## Provenance and scope

The user supplied these three images as fresh captures from Ryanair. The address bar shows `ryanair.com/gb/en/trip/flights/select`. The visible booking is one adult, London Stansted–Palanga return, 1–8 November 2026, priced in GBP. The URL supplies the year.

The original PNGs were copied without editing or resizing. Each is 2303 × 1476 pixels; all three copies match their source SHA-256 hashes. [provenance.json](provenance.json) records filenames, dimensions and hashes. The provided date is known; exact capture time, browser zoom and CSS viewport are unknown. Image dimensions do not establish the CSS viewport. These are new reference captures, not recovered screenshots from the original Stitch/AI Studio input.

| Image | Visible evidence | Limits |
| --- | --- | --- |
| [01: flight selection](01-flight-selection-original.png) | Outbound morning flight £23.99; evening alternative £17.99; return £86.99. The return displays “4 seats left at this price”. | The basket in subsequent images is consistent with £23.99 + £86.99 = £110.98. The scarcity statement and struck-through prices are visible, but their accuracy is not established by the image. |
| [02: fare selection](02-fare-selection-original.png) | Basic is a separate strip above the three paid columns, with an outlined “Continue with basic for £110.98” button. Regular is +£27.75, Plus +£38.99 and Flexi Plus +£92.00, each labelled “on each flight”. Plus has a gold border and “IDEAL FOR YOUR TRIP TO PALANGA” ribbon. | Per-flight pricing is disclosed. The screenshot does not establish hidden mandatory fees, the basis of the recommendation, or a traveller's need for the included extras. Information icons are present; their contents were not inspected. |
| [03: Basic/Regular modal](03-basic-upsell-original.png) | “REGULAR is ideal for your trip!” appears above a feature comparison. Basic has red crosses for excluded extras; Regular has a blue Recommended banner and yellow “Switch to Regular” button. Basic has an outlined blue-text “Continue with Basic” button. The background shows Basic as the selected fare. | The user reports that the initial Basic continuation opens this popup and either popup button applies the corresponding fare. No further friction at this point was reported. Exact subsequent navigation, recurrence and the direct paid-selection path have not been independently replayed. |

## User-reported sequence

On 23 October 2026 the user clarified: after pressing “continue with basic”, they received the “REGULAR is ideal for your trip!” popup shown in image 03. This supports **initial Basic continuation → Regular upsell popup**. It is a user report accompanying the captures, not an independently replayed interaction.

In a follow-up on the same date, the user confirmed that either “Continue with Basic” or “Switch to Regular” inside the popup results in the chosen plan being selected. They reported no further friction at this point and described the pitch as “shaming you to get the regular flight tier”. Record that description as this user's experience of pressure, separately from a taxonomy classification or a measured effect across participants.

The supported sequence is **initial Basic continuation → Regular upsell popup → either button applies the corresponding fare**. Do not describe repeated rejection barriers or a blocked Basic choice. The exact next page and a comparison with choosing Regular directly from the fare table remain unverified; a specific click-count difference is not established.

## Three candidate mechanisms

1. **Per-flight price framing and calculation burden.** A return traveller must translate the displayed upgrade increment into a whole-trip cost. Possible underestimation is a testable hypothesis. Calling this hidden mandatory pricing would exceed the evidence.
2. **Unequal visual emphasis and recommendation.** Basic and the paid bundles receive different layouts and emphasis. Plus is highlighted on the fare table; Regular is highlighted in the modal. This may steer attention and perceived suitability. The images do not establish deceptive intent, personalised suitability, or harm to the chooser.
3. **An additional Basic upsell prompt.** The user confirms one Basic-triggered modal, which revisits Basic and emphasises missing features. Both popup choices apply the corresponding fare, with no further friction at this point reported. Describe this as an upsell interruption with visual pressure, a candidate for pressured selling. The neutral refusal label supplies no clear evidence of confirmshaming, despite the user's reported experience of pressure. A specific friction difference against the direct paid path is unverified. Treat the existing roadblock and asymmetric-friction annotations as overlapping descriptions of this prompt; do not count them as independent main findings or imply repeated obstruction.

The [Mathur et al. taxonomy, section 5.1.3](https://arxiv.org/html/1907.07032) distinguishes shame-based refusal language, visual emphasis and pressured upselling. It informs these candidate labels; it does not demonstrate effects in this Ryanair journey. Reviewed 23 October 2026; exact print-page mapping is still pending.

## Price arithmetic, not observed checkout totals

For one adult and two flights, applying the displayed increment to each flight gives:

| Fare | Displayed increment per flight | Calculated return increment | Calculated total including £110.98 Basic |
| --- | ---: | ---: | ---: |
| Regular | £27.75 | £55.50 | £166.48 |
| Plus | £38.99 | £77.98 | £188.96 |
| Flexi Plus | £92.00 | £184.00 | £294.98 |

These totals are calculations from the captured labels, not verified upgraded basket or checkout prices.

## Implications for the prototype and later audit

- The app is a reconstruction. Its Basic £131.36 and Regular +£29.25 differ from these captures. Its modal Basic continuation uses grey text/border where the captured site uses blue. Do not silently treat those prototype details as evidence of the real interface. No application code was changed while preparing this digest.
- Retain useful decision support: the feature comparison and clear statement that the small bag must fit under the seat. A recommendation could also help if its basis matches the traveller's needs. An upgrade is not inherently a poor outcome.
- Main evaluation should assess whole-trip price comprehension and whether the selected fare fits a stated baggage/seat need, with completion as a guardrail. An upgrade-rate reduction alone would not demonstrate improvement.
- Keep the flight scarcity message as contextual evidence. Seats, baggage warnings and insurance elsewhere in the prototype are outside this focused fare-choice test; these images do not verify those later steps.
- The Ethical variant already existed before this evidence review. Record that chronology honestly. Predictions for the next revision/test can be written prospectively; they cannot retroactively preregister the existing redesign.

Course lecture connections and verified PDF page references are now recorded in the [course reading map](../course-reading-map.md). The supplied files are lecture decks; original book/article page citations remain unverified. Still needed before a final audit: independent teammate severity ratings and a reconciled rationale; prospective predictions, metrics and test procedure. The exact next page, direct paid path and recurrence remain evidence limits; further comparison would be required if claiming a quantified friction asymmetry. The user's account is qualitative walkthrough evidence; no formal participant outcomes or severity ratings have been collected here.

Ryanair's [official fare-bundle reference](https://help.ryanair.com/hc/en-ie/articles/12888555638161-What-are-Ryanair-s-fare-bundle-options), reviewed 23 October 2026, corroborates the broad inclusions (Basic small bag; Regular seat/priority/10 kg cabin bag; Plus seat/20 kg check-in bag). It does not verify these prices or the click sequence.
