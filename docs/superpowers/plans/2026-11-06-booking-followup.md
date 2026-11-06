# Booking Follow-up Implementation Plan

**Goal** Finish issues #9–#12 from the [handoff](../../prototype-followup-handoff.md), then document and check access for #6.

**Architecture** Keep the availability cue in the Original review demo and omit it from both pilot arms. Price bookings from the selected fare, booking choices, and current step. Record a decline separately from an untouched insurance choice.

**Tech stack** React, TypeScript, Vite, Node's test runner, and Edge.

## Constraints

- Preserve the three pilot treatments and stop participant navigation at fare choice.
- Preserve the documented insurance defaults for untouched bookings. A defaults to Comprehensive (£14.50) at Review and B starts unchecked.
- Keep the published URL from [REFLECTION.md](../../../REFLECTION.md). Preserve the frozen [AUDIT.md](../../../AUDIT.md).

## Tasks

- [x] Reproduce #10 and #11 in `tests/booking-followup.test.tsx`. Make `BookingChoices.insurancePlan` nullable for untouched bookings and keep `'none'` for explicit declines. Use the same step-aware `getBookingPricing` in the cart and Review. Verify defaults, all policy premiums, changes made at Review, and mirrored choices in comparison.
- [x] Reproduce #12 in the same test file. Price a row 18 seat and the first 10 kg cabin bag at £0 for Regular. Verify a paid seat is £8 and every bag beyond the inclusion is £30 return. Check the cart and Review after changing the fare or returning to Seats and Bags. Check Basic at £131.36 before extras.
- [x] Verify #9 in both participant arms after consent, and verify the Original review example. Gate the badges in `FlightSelection.tsx` using review mode.
- [x] Add the root README with four entry links. Check each published URL in a fresh browser session, verify the local production build, and record the actual status in the handoff and WhatsApp draft.
- [ ] Recheck pilot and review entry behavior when the follow-up is published again.
