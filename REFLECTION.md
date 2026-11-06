# Group reflection on choice architecture and AI collaboration

**Course:** MGMT 6108 Decision Architecture for Managers  
**Project:** Ryanair Fare Bundle and Ancillary Decision Architecture  
**Group Members:** Aishan [AS], Roy [RO], Xianlong [XL], Zinuo [ZN]  
**Repository:** https://github.com/psifield/ryanair-darkpatterns  
**Live Application:** https://ryanair-darkpatterns.vercel.app/  
**Date:** 5 November 2026

## 1. How we audited the booking flow [AS, RO, XL, ZN]

When we audited Ryanair's desktop flow for Variant B, we asked the usual usability question, "Can people do what they came to do?" Then we asked, "Which choice does this screen make easy, for whom and through which principle?" [AS]. To decide whether a design was a nudge, sludge or a grey case, we looked at whose goal it served. We used Week 4 for framing, Week 7 for fluency and Week 9 for norms [AS, ZN].

The first commit (`5579bef`) already contained an early Variant B. By the time we wrote the formal audit, we could see how easy it would be to explain an existing design as if we had predicted it [RO, XL]. The course flagged this timing problem as "AUDIT.md written after the build". We recorded our assumptions about the prototype in `AUDIT.md` under `Added after building` and set out the hypotheses and scope for future testing separately [AS, ZN].

The course's warning about "A prettier B" pushed us to look at what travelers saw at the moment of choice [RO, XL]. We kept Ryanair's under-seat bag diagram (40 x 20 x 25 cm) so travelers could check what would fit before getting to the gate [AS].

## 2. How our prompts changed [RO, XL]

We used Google Stitch to scaffold the prototype and OpenAI Codex for the fare tables. Google AI Studio helped with the React logic. The nine entries in `PROMPTS.md` record what we asked for and how we assessed the results [RO, XL].

### Broad requests (entries 1 to 4) [RO, AS]

Early prompts focused on reproducing Seats, Bags and Extras. Requests like "make checkout ethical" led to changes in appearance at the cost of useful information [AS]. One agent removed luggage dimensions (55 x 40 x 20 cm) and weight limits, leaving travelers without the details they needed to choose a bag [RO].

### Requirements for each component (entries 5 to 8) [XL, ZN]

We adopted RGOGC and began specifying what each component should do [XL]. Entry 6 defined four fare cards with return totals and expandable drawers for comparing inclusions. Regular, for example, showed a £189.86 return total and a £58.50 increase over Basic [XL, ZN]. Entries 7 and 8 added checkout opt-ins and split views while preserving the test IDs and frozen audit findings [XL].

### Comparing the same choices (entry 9) [RO]

Original divided Extras into two stages (`1. Airport & trip`, `2. Transport & parking`), while Ethical showed everything together. We moved the sub-step state into `BookingAddOnView` so the tabs would switch together. We also mirrored selections so reviewers could see how each version presented the same choice at the same time [RO].

## 3. What went wrong with AI-generated work [RO, XL, AS]

### A clipped audit marker [AS, XL]

The tool positioned Audit Marker 3 (`DP 3 · Visual Steering`) using a negative offset (`-top-4`). The marker was cut off by its `overflow: hidden` container [AS]. We adjusted the card wrappers, moved the marker flush with the banner and checked the result on desktop and mobile [XL].

### A missing React import [RO]

In Entry 9, the model added tab switching to `SideBySideView.tsx` and forgot to import `useState` from React, which caused a `ReferenceError`. Visual inspection had missed the error. We used `npm test` and `tsc --noEmit` before pushing to catch mistakes like this [RO].

### Checking citations against the lectures [AS, ZN]

After the model invented external citations, we opened each of the five lecture PDFs to check the mechanisms ourselves [AS]. We logged the pages we used, including Week 4 pp. 27, 41-44, 45, 48, 64 and Week 7 pp. 6-7, 13-15, 20. We dropped citations we could not verify [ZN, AS].

## 4. Why the extras are sold this way [AS, RO, ZN]

### Base fares and ancillary revenue [ZN, XL]

Week 4 (Reference Dependence and Diminishing Sensitivity, PDF pp. 27, 41-44) helped us see how a low headline fare frames the prices that follow [ZN]. We looked at the airline's profit and loss (P&L) to understand the pressure to sell extras. We treated the £110.98 return fare as a way to draw people in at close to cost. Aggregators rank flights by headline fare, so airlines have a reason to unbundle extras and recover margin at checkout [XL, ZN].

We assumed ancillaries accounted for over 35% of revenue and all net profit. On that assumption, we saw removing upsells altogether as a risk to the airline's viability. We kept the extras available in Variant B and made the prices clear before travelers chose [ZN, XL].

### Per-flight upgrade prices [AS, RO]

We used diminishing sensitivity (Sungjong Roh, Week 4, p. 44) to explain the +£27.75 "per flight" label. Against a £110.00 ticket, £27.75 can feel like a small addition. On a return trip the upgrade is £55.50 [AS]. We treated this as a grey case because the bundle can be useful and the price format still leaves travelers to calculate the total [RO, AS]. Variant B puts the return total next to the per-leg breakdown. We used the Week 7 material on processing fluency (pp. 6-7) to make the arithmetic easier to follow and give travelers more reason to trust the price [RO].

### Pre-paid inflight credit [RO, AS]

The pre-paid credit offer (`"Get More, Pay Less"`) gives travelers a 10% saving if they spend the voucher in full (£4.50 for £5.00 in credit) [RO]. The "FREE CREDIT" badge calls attention to the deal and can add pressure to take it [AS]. The Zero-Price Effect (Week 4, p. 48) helps explain why a traveler might overlook breakage. Any credit they leave unspent is non-refundable, so the airline keeps the money paid for that portion [RO]. Variant B keeps the discount and shows what the voucher costs and what it is worth. Travelers can leave the selection at "No credit" without penalty [AS, RO].

### Travel insurance defaults [RO, XL]

Variant A starts with two boxes checked, one for £14.50 Comprehensive Travel Protection and one for promotional emails. We used default bias (Week 9) to explain why travelers might leave those choices in place [RO]. Variant B lists the insurance tiers in Extras and starts at "No insurance" (£0). At Review & Pay (Entry 7), the £14.50 policy starts unchecked for travelers who have yet to choose cover. They can add it by checking the box [RO, XL].

## 5. Testing the redesign and avoiding sludge [ZN, XL]

### Price comprehension and the peer walkthrough [ZN, XL]

We used peer feedback to develop hypotheses, keeping in mind the course warning about "Friends as proof" [ZN, XL]. The audit set out a separate test of price comprehension. We estimated that detecting a 20 percentage-point gain (50% in A to 70% in B) would take approximately 97 participants per arm at alpha=0.05 and 80% power [ZN].

We expected the four neutral fare cards to make inclusions easier to compare and lead more travelers to choose Regular. In our 16-person peer walkthrough, we saw people choose Basic without opening the drawer [ZN]. The walkthrough gave us little reason to expect a shift to Regular. The base fare still drew people's attention, so we wanted to test whether a more visible prompt to compare features would change their choices [XL, ZN].

### Where Variant B could make booking harder [XL, ZN]

Opening the 20-row inclusions table by default would give travelers a lot to scroll through and take in on a phone. We kept it in a drawer they could open when they wanted to compare fares [XL].

Asking travelers to confirm each declined extra in a dialog would add a step to a decision they had already made. Variant B lets them decline directly [ZN].

## 6. Team contributions [AS, RO, XL, ZN]

* Aishan [AS] mapped findings to the Week 4 and Week 7 decks, led mobile testing and wrote the descriptions, severity ratings and drivers for Findings 1 and 2 in `AUDIT.md`.
* Roy [RO] managed the repository, dependencies and Git workflow. Roy took the lead on prompts for Entries 1 to 5 and Entry 9 and designed how `SideBySideView.tsx` keeps sub-steps and selections in sync.
* Xianlong [XL] consolidated `AUDIT.md` and led the prompts for Entries 6 to 8, including the fare comparison and checkout opt-ins. Xianlong also maintained the tests and TypeScript types.
* Zinuo [ZN] benchmarked airline practices, led severity scoring and calculated agreement. Zinuo developed hypotheses, guardrails and criteria for rejecting Variant B repairs in the pilot.

## 7. Conclusion [AS, RO, XL, ZN]

Selling extras separately helps budget carriers keep base fares low and lets passengers pay for what they need. We wanted to keep that flexibility without making a tired traveler catch a preselected charge, work out a price revealed late or click through extra screens to decline an offer.

AI sped up implementation. It also reproduced some of the patterns we meant to fix and removed information travelers needed. The readings helped us decide what to ask for. We wrote those details into the prompts and used automated checks to see whether the booking flow behaved as specified.
