# Alderwake Air booking prototype

This class project compares two fare-choice designs for a fictional airline. The pilot opens with consent, ends at fare choice, and offers a debrief.

| Link | Opens |
| --- | --- |
| [Pilot A](https://ryanair-darkpatterns.vercel.app/?v=A) | Variant A, the reconstructed fare choice |
| [Pilot B](https://ryanair-darkpatterns.vercel.app/?v=B) | Variant B, the redesigned fare choice |
| [Random pilot assignment](https://ryanair-darkpatterns.vercel.app/) | Assigns A or B at random on the first visit and remembers that choice in the browser |
| [Review demo](https://ryanair-darkpatterns.vercel.app/?mode=review) | The full simulated booking, with audit markers, variant switching, and side-by-side comparison |

A direct A or B link opens the requested variant for that visit. Reviewers can add `&v=B` to start the demo in B. Use the same query strings in a local preview. [Deployment verification](docs/prototype-followup-handoff.md#published-status)
