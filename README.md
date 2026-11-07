# Alderwake Air booking prototype

This class project compares two fare-choice designs for a fictional airline. The pilot opens with consent, ends at fare choice and offers a debrief.

| Link | Opens |
| --- | --- |
| [Review and comparison demo](https://ryanair-darkpatterns.vercel.app/) | The default full simulated booking with audit markers, variant switching and side-by-side comparison |
| [Random pilot assignment](https://ryanair-darkpatterns.vercel.app/?mode=participant) | Assigns A or B at random on the first visit and remembers that choice in the browser |
| [Pilot A](https://ryanair-darkpatterns.vercel.app/?v=A) | Variant A, the reconstructed fare choice |
| [Pilot B](https://ryanair-darkpatterns.vercel.app/?v=B) | Variant B, the redesigned fare choice |

A direct A or B link opens the requested participant variant for that visit. Reviewers can add `?v=B` to start the demo in B. Use the same query strings in a local preview. [Deployment verification](docs/prototype-followup-handoff.md#published-status)
