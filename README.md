# Alderwake Air booking prototype

This class project compares two fare-choice designs for a fictional airline. The participant demo opens with consent and continues from fare confirmation to Seats, Bags, Extras and Review. The study debrief remains available from the participant banner and booking confirmation.

| Link | Opens |
| --- | --- |
| [Review and comparison demo](https://ryanair-darkpatterns.vercel.app/) | The default full simulated booking with audit markers, variant switching and side-by-side comparison |
| [Review A](https://ryanair-darkpatterns.vercel.app/?v=A) | Variant A with review and comparison controls |
| [Review B](https://ryanair-darkpatterns.vercel.app/?v=B) | Variant B with review and comparison controls |
| [Random pilot assignment](https://ryanair-darkpatterns.vercel.app/?mode=participant) | Assigns A or B at random on the first visit and remembers that choice in the browser |
| [Participant A](https://ryanair-darkpatterns.vercel.app/?v=A&mode=participant) | Consent followed by Variant A, the reconstructed booking flow |
| [Participant B](https://ryanair-darkpatterns.vercel.app/?v=B&mode=participant) | Consent followed by Variant B, the redesigned booking flow |

Participant links need `mode=participant`; `?v=A` and `?v=B` on their own open review mode. A direct participant link overrides the saved random assignment for that visit. Use the same query strings in a local preview. [Deployment verification](docs/prototype-followup-handoff.md#published-status)

Run `npm test`, `npm run lint` and `npm run build` for automated checks. For the interactive navigation regression checks, start `npm run dev` and open `/tests/booking-navigation.html`; all 14 scenarios should pass. This test page runs only in the development server and is excluded from the production build.

## Course project documents

- [AUDIT.md](AUDIT.md): historical audit, preserved ratings and predictions; [8 November post-build corrections](AUDIT.md#2026-11-08--post-build-corrections-and-evidence-limits) clarify F6 severity, insurance arithmetic and evidence limits.
- [REFLECTION.md](REFLECTION.md): design rationale, AI collaboration and testing limitations.
- [PROMPTS.md](PROMPTS.md): 19 historical entries, with a dated coverage note about the incomplete early B record.
- Evidence: [fare-selection captures and provenance](evidence/2026-10-23/ryanair-fare-screens/README.md), [Extras source-image index](evidence/source-captures/aistudio/README.md), and [reconstructed prototype verification](evidence/2026-10-22/annotation-followup/verification.md).

The proposed 24-person pilot covers F1–F3 (Fare Selection); F4–F6's predictions are reserved for a future Extras Test. The demo's broader navigation is not the pilot's research scope. This documentation clarification does not change the prototype entry points or study controls.
