# Preview UI and candidate-case review

Reviewed 22 October 2026 (Asia/Singapore). Preliminary discussion evidence, not a formal audit or a scope change. Web research used the user's requested Search Service connector.

## Observed prototype behaviour

- The Original, Ethical Redesign, and Side-by-Side controls render their respective views. The toolbar and in-page banners explicitly judge the variants, and audit markers start enabled. These are useful demonstration controls; a participant-facing test would need neutral presentation.
- In Original mode, clicking `Continue with basic for £131.36` opens an upsell modal headed `REGULAR is ideal for your trip!`. The upgrade button is yellow and prominent; the Basic continuation is pale but enabled. Clicking `Continue with Basic` closes the dialog without advancing to Seats. A complete booking task has not been verified.
- At the approximately 714 CSS-pixel browser pane, Side-by-Side stacks the variants despite a left/right legend. Source inspection confirms a two-column layout only at the `xl` breakpoint. The original separates Basic from three upgrade columns; the ethical view uses four fare cards, different copy, and a separate continuation area. These simultaneous differences complicate attribution in an A/B test.
- Tested the Ethical view at an actual 390 x 844 viewport, rather than the built-in device frame. The toolbar, airline header, navigation, and mode banner occupy substantial space; the fixed continuation area also takes a large part of the visible lower screen. The page root did not overflow horizontally in this observation (reported document width 387 CSS pixels). The booking stepper has its own horizontal scrolling.
- Returned to Original mode and reset the temporary viewport override. No application source was changed.

Screenshots in this directory:

- `review-basic-upsell.jpg`
- `review-comparison-controls.jpg`
- `review-ethical-full.jpg`
- `review-ethical-390.jpg`

## Claims requiring qualification

- The Basic interruption and unequal visual emphasis are the strongest observed candidates. This observation concerns our simulation; dated evidence of the actual Ryanair interaction is still needed.
- The modal does not establish guilt or shame. Describe its observable interruption and presentation before assigning a confirmshaming label. The existing roadblock and asymmetric-friction annotations substantially overlap.
- A low-seat message is not established as false by this prototype. A price explicitly labelled per flight is not, by itself, evidence of hidden mandatory charges. A highlighted recommendation is not automatically deceptive.
- The ethical view and audit data use 40 x 20 x 25 cm for a small bag. Ryanair's dated announcement and current terms give 40 x 30 x 20 cm. Any historical reconstruction needs an explicit date; a current reconstruction needs verified current rules.

## Primary sources and alternative cases

Accessed 22 October 2026. Publication dates below describe the historical evidence, not a live audit of those companies today.

1. **Amazon Prime cancellation, historical case.** The Norwegian Consumer Council's 14 January 2021 report documents the cancellation journey (case discussion begins on printed page 14). The European Commission's 1 July 2022 release describes the obstacles and Amazon's commitment to a two-step EU/EEA process; its annex contains old and replacement screenshots. This offers a clearer evidence trail than the presently unverified Ryanair modal reproduction.
   - [Consumer Council report](https://storage02.forbrukerradet.no/media/2021/01/2021-01-14-you-can-log-out-but-you-can-never-leave-final.pdf)
   - [European Commission release and screenshot annex](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_22_4186/IP_22_4186_EN.pdf)
   - [FTC September 2025 settlement announcement](https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-against-amazon): additional enforcement context concerning Prime enrolment and cancellation. A settlement announcement is not a live observation of the current interface.
2. **Google/YouTube cookie choice, historical comparison.** Google's 21 April 2022 announcement describes adding equal first-screen Accept all and Reject all buttons following regulator discussions. A small static consent task would be straightforward to simulate. The old CNIL English announcement could not be fetched (503), so do not present it as read or rely on its original text here.
   - [Google's documented redesign](https://blog.google/company-news/inside-google/around-the-globe/google-europe/new-cookie-choices-in-europe/)
3. **Fortnite purchase confirmation, historical case.** The FTC's March 2023 order announcement describes confusing controls leading to unwanted single-button purchases. This has strong primary documentation, but recreating a game's controller and shop context faithfully is less convenient for this web prototype.
   - [FTC order announcement](https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-finalizes-order-requiring-fortnite-maker-epic-games-pay-245-million-tricking-users-making)
4. **Ryanair factual reference.** The airline announced the larger free personal-bag allowance on 4 September 2025. This verifies the baggage discrepancy, not the prototype's other dark-pattern assertions.
   - [Ryanair announcement](https://corporate.ryanair.com/news/ryanair-rolls-out-bigger-bag-sizers-at-allairports-from-thurs-4-sept/)
   - [Current conditions of carriage](https://www.ryanair.com/ie/en/useful-info/help-centre/terms-and-conditions)

## Recommendation for discussion

The existing Ryanair app is a useful base, but its six inherited labels are not six verified findings. Keeping it would minimize rebuilding; focus on selecting Basic and understanding the total upgrade cost, subject to obtaining real-interface evidence. If choosing a fresh case for evidence strength, prefer a fictional subscription-cancellation journey based on a clearly dated Amazon record. Confirm that a historical case meets the lecturer's expectations before committing to that direction.

A candidate Amazon task is to stop the next renewal while understanding when benefits end. A proposed primary measure could be successful intended cancellation, with understanding of the benefit end date as a guardrail. These are planning suggestions, not preregistered predictions or measured results. An informative confirmation can serve users; repeated pressure screens need separate justification.

No formal AUDIT.md, group ratings, study results, redesign, commit, push, or deployment was created. Course-reading/page verification, real Ryanair screen provenance, and the rest of the booking journey remain outstanding.
