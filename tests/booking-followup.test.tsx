import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { BookingAddOnView } from '../src/components/SideBySideView';
import { EMPTY_BOOKING_CHOICES, getBookingPricing } from '../src/data/bookingExtras';
import type { BookingChoices } from '../src/data/bookingExtras';
import { FARE_TIERS } from '../src/data/mockData';
import type { BookingStep, FareTierId, PrototypeMode } from '../src/types/booking';

const noop = () => {};
const modes = ['dark-pattern', 'ethical'] as const;

function renderStep(
  step: Exclude<BookingStep, 'flights'>,
  mode: PrototypeMode,
  tier: FareTierId,
  choices: Partial<BookingChoices> = {},
) {
  const booking = { ...EMPTY_BOOKING_CHOICES, ...choices };
  return renderToStaticMarkup(<BookingAddOnView
    step={step}
    viewMode={mode}
    selectedTier={tier}
    bookings={{ 'dark-pattern': booking, ethical: booking }}
    onChangeBooking={noop}
    onStepChange={noop}
    showAuditMarkers={false}
    onOpenAuditItem={noop}
  />);
}

test('only Original Review adds Comprehensive for an untouched booking', () => {
  for (const mode of modes) {
    const isOriginal = mode === 'dark-pattern';
    const fare = FARE_TIERS.BASIC;
    assert.equal(getBookingPricing(fare, EMPTY_BOOKING_CHOICES, isOriginal, 'extras').total.toFixed(2), '131.36');
    assert.equal(
      getBookingPricing(fare, EMPTY_BOOKING_CHOICES, isOriginal, 'review').total.toFixed(2),
      isOriginal ? '145.86' : '131.36',
    );
  }
});

test('declining insurance keeps Review unchecked and at the base price in both designs', () => {
  for (const mode of modes) {
    const review = renderStep('review', mode, 'BASIC', { insurancePlan: 'none' });
    assert.match(review, /Add Comprehensive Medical/);
    assert.doesNotMatch(review, /checked=""|Travel Protection \(/);
    assert.match(review, /Pay £131\.36 &amp; Confirm/);
  }
});

test('the selected Extras policy is the sole insurance on Review in both designs', () => {
  for (const mode of modes) {
    for (const [insurancePlan, label, total] of [
      ['standard', 'Standard', '136.04'],
      ['plus', 'Plus', '137.44'],
      ['annual', 'Annual Standard', '159.54'],
    ] as const) {
      const review = renderStep('review', mode, 'BASIC', { insurancePlan });
      assert.doesNotMatch(review, /Add Comprehensive Medical|£14\.50/);
      assert.ok(review.includes(`Travel Protection (${label})`));
      assert.ok(review.includes(`Pay £${total} &amp; Confirm`));
    }
  }
});

test('Regular offers a row 18 seat and carries it into Review at no extra charge', () => {
  for (const mode of modes) {
    const seats = renderStep('seats', mode, 'REGULAR');
    assert.match(seats, /Seat 18A<\/span><span>Included/);
    assert.match(seats, /Seat 15A<\/span><span>\+£8\.00/);
    const review = renderStep('review', mode, 'REGULAR', { selectedSeat: '18A', insurancePlan: 'none' });
    assert.match(review, /Seat Reservation \(18A\).*Included/);
    assert.match(review, /Pay £189\.86 &amp; Confirm/);
  }
});

test('Regular includes the first selected cabin bag and charges for additional bags', () => {
  for (const mode of modes) {
    const bags = renderStep('bags', mode, 'REGULAR', { additionalLuggage: 1 });
    assert.match(bags, /1 included.*\+£15\.00 \/ flight/);
    const included = renderStep('review', mode, 'REGULAR', { additionalLuggage: 1, insurancePlan: 'none' });
    assert.match(included, /10 kg Cabin Bag.*Included/);
    assert.match(included, /Pay £189\.86 &amp; Confirm/);

    const upgraded = renderStep('review', mode, 'REGULAR', {
      selectedSeat: '15A', additionalLuggage: 2, insurancePlan: 'none',
    });
    assert.match(upgraded, /Extra Overhead Bags \(1\).*\+£30\.00/);
    assert.match(upgraded, /Pay £227\.86 &amp; Confirm/);
  }
});

test('Basic still charges £8 for a reservation and £30 return for the first cabin bag', () => {
  for (const mode of modes) {
    const review = renderStep('review', mode, 'BASIC', {
      selectedSeat: '15A', additionalLuggage: 1, insurancePlan: 'none',
    });
    assert.match(review, /Seat Reservation \(15A\).*\+£8\.00/);
    assert.match(review, /Extra Overhead Bags \(1\).*\+£30\.00/);
    assert.match(review, /Pay £169\.36 &amp; Confirm/);
  }
});
