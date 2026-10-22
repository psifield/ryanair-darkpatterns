# Course connections for the fare-bundle audit

Reviewed 23 October 2026 (Asia/Singapore). Focal decision: **keep Basic or buy a paid fare bundle**. Pair this note with the [real-site screenshot digest](ryanair-fare-screens/README.md).

## Sources and method

The user supplied five lecture PDFs in `C:/Users/zhang/Documents/Decision Architecture Readings`: Week 1 (100 pages), Week 2 (142), Week 3 (101), Week 4 (91) and Week 7 (48), totalling 482 PDF pages. A keyword scan covered the extractable text of every page; complete selected pages were then read in context. The scan was not a claim to have closely read or visually inspected all 482 pages.

The strongest connections are in the Week 4 and Week 7 decks. Key supporting pages were also rendered and visually inspected to check diagrams, contrast examples and page locations. The provided PDFs remain unchanged and outside this repository. No lecture PDF or rendered lecture page is included as a deliverable.

**All locators below are one-based PDF page numbers.** These files are lecture decks, not the full assigned books or journal articles. Their page numbers must not be presented as pages of Kahneman, Petrova et al., Lee & Aaker or another underlying publication. Original book/article page citations remain unverified.

Local source titles, credited to Sungjong Roh in the PDF metadata:

- `MGMT6108_AY2627August_Week04_Preview.pdf`: Week 4, *Framing the Same but Different Rewards and Incentives*.
- `MGMT6108_Week07_Preview.pdf`: Week 7, *Fluency, Fluency: How it feels to have some thoughts*.

## Finding 1: upgrade-price framing and calculation burden

**Lecture support.** Week 4, PDF p. 27, explains reference dependence. PDF pp. 41-44 develop diminishing sensitivity, with p. 44 explicitly applying it to tiered pricing and upgrades: an incremental upgrade cost can feel less significant in the context of an existing purchase. The lecture does not test per-flight airline pricing or establish that consumers fail to multiply a return-flight increment.

**Observed screen.** Regular is advertised at +£27.75 on each flight; the modal uses “only” and “just”. For the captured one-adult return itinerary, the calculated increment is £55.50 and the calculated total is £166.48. These are derived values, not observed upgraded checkout totals.

**Audit inference.** Emphasising an increment may make the upgrade feel comparatively small. Requiring a traveller to calculate a whole-trip total may also reduce price comprehension. Both are hypotheses for this interface; neither establishes hidden mandatory fees. Do not claim that diminishing sensitivity itself proves an arithmetic error.

**Repair and check.** Display each whole-trip total and whole-trip upgrade increment together, with the same basis for every fare. Compare correct answers about the return-trip total and increment. A fall in upgrade rate alone would not establish a benefit. Reconsider the repair if it does not improve comprehension or makes the applicable price basis less clear.

## Finding 2: unequal presentation and ease of comparison

**Lecture support.** Week 7, PDF pp. 6-7 and 20, introduces processing fluency as the subjective ease of processing information. PDF pp. 13-15 demonstrate fonts, spacing and contrast as sources of fluency. These are the closest supplied course connections to the screen's presentation. They do not establish that a particular yellow hue universally increases purchases, or that prominence and fluency are the same mechanism.

**Observed screen.** Basic is a separate strip above three paid columns. Plus receives the gold recommendation on the fare table. In the popup, Regular receives a Recommended banner and a filled yellow action button; Basic has an outlined blue action button. Both choices are available.

**Audit inference.** Unequal prominence may draw attention towards a paid fare. Separating Basic from the main matrix may also make like-for-like comparison harder. The screenshots establish the presentation, while the attention, fluency and choice effects remain unmeasured. A recommendation can be useful when its basis fits the traveller's needs.

**Repair and check.** Make Basic's total and inclusions comparable with the paid fares and use similarly prominent selection controls. Preserve readable feature explanations. Check identification of the fare that meets a stated baggage/seat need and accuracy about inclusions, alongside completion time. Reconsider if comprehension or task completion worsens. A single A/B comparison changing layout, copy and controls together would test the combined revision, not isolate colour or fluency.

## Finding 3: Basic-triggered upsell and missing-feature framing

**Lecture support.** Week 4, PDF p. 27, explains how framing can influence the reference state; PDF p. 45 introduces loss aversion. PDF p. 48 specifically distinguishes losses from foregone gains and says framing affects whether an outcome is perceived as a gain or loss. This distinction limits how strongly the mechanism can be claimed here.

**Observed and reported interaction.** The user reports: initial Basic continuation opens the Regular upsell popup; either popup button then applies the corresponding fare, with no further friction at this point reported. The popup highlights extras excluded from Basic using red crosses, alongside Regular's recommendation and prominent upgrade action. The user described the experience as shaming them towards Regular.

**Audit inference.** The prompt may frame Basic as missing desirable benefits and invite reconsideration. A loss-framing account requires those benefits to become a perceived reference point; they were not actually taken away. Do not claim demonstrated loss aversion or an endowment effect. Keep the user's reported feeling of pressure distinct from the taxonomy label: the neutral “Continue with Basic” text does not clearly establish confirmshaming. Use **upsell interruption with visual pressure**, or a **pressured-selling candidate**, provisionally. Roadblock and asymmetric-friction annotations overlap this single prompt; repeated obstruction and a measured click-count difference are unsupported.

**Repair and check.** Make a Basic selection apply directly, while keeping the feature comparison available for voluntary review. Test whether travellers with a stated Basic-compatible need select a suitable fare and understand what it excludes. Also ask about perceived pressure; do not infer that feeling from clicks alone. Reconsider if direct selection produces more mistaken expectations about baggage or seat inclusion. Travellers who need the paid extras may appropriately choose a bundle.

## Boundaries for the later audit

- Course mechanisms support explanations to test, not causal findings about this particular screen.
- These supplied files do not include Week 5 or Week 8. Do not attribute a label effect or a specific colour-psychology claim to those missing lectures. The Week 7 preview supplied here does not establish a regulatory-fit explanation for this fare choice.
- Week 4 PDF pp. 87-90 discuss hedonic editing and integration/segregation of monetary outcomes. That is adjacent material, but it does not directly prove underestimation of per-flight prices. The tiered-upgrade passage on p. 44 is the closer fit.
- Retain useful inclusions and baggage explanations. Determine choice quality against a stated traveller need, rather than assuming every upgrade is unwanted.
- The existing Ethical variant predates these notes. The proposed checks above are ideas for a future revision/test; they are not retrospectively preregistered predictions. No baselines, effect sizes, participant results or severity ratings have been invented.
- Next required human input: independent severity ratings from each teammate, followed by a discussion of frequency, cost, learnability and trust. The theories alone do not determine a severity score.
