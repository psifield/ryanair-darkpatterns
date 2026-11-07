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
