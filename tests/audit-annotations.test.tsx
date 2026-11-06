import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as auditData from '../src/data/mockData';
import { EMPTY_BOOKING_CHOICES } from '../src/data/bookingExtras';
import { DarkPatternInspector } from '../src/components/DarkPatternInspector';
import { FareSelectionEthical } from '../src/components/FareSelectionEthical';
import { SeatsStep } from '../src/components/SeatsStep';
import { BagsStep } from '../src/components/BagsStep';
import { ExtrasStep } from '../src/components/ExtrasStep';
import { ReviewStep } from '../src/components/ReviewStep';
import * as comparison from '../src/components/SideBySideView';

const noop = () => {};
const markerProps = { isDarkPattern: true, showAuditMarkers: true, onOpenAuditItem: noop };
const reviewProps = {
  fare: auditData.FARE_TIERS.BASIC,
  booking: EMPTY_BOOKING_CHOICES,
  onSelectInsurance: noop,
  onToggleNewsletter: noop,
  onBack: noop,
};

test('ten numbered groups retain eleven distinct audit records', () => {
  assert.equal(auditData.DARK_PATTERNS_AUDIT.length, 11);
  assert.deepEqual(auditData.DARK_PATTERN_GROUPS.map(group => [group.number, group.items.map(item => item.id)]), [
    [1, ['dp-scarcity']],
    [2, ['dp-drip-pricing']],
    [3, ['dp-visual-steering', 'dp-asymmetric-friction']],
    [4, ['dp-roadblock-confirmshame']],
    [5, ['dp-seat-pressure']],
    [6, ['dp-hidden-baggage']],
    [7, ['dp-travel-protection']],
    [8, ['dp-fast-track-roadblock']],
    [9, ['dp-insurance-confirmshame']],
    [10, ['dp-transport-social-proof']],
  ]);
  assert.equal(new Set(auditData.DARK_PATTERN_GROUPS.flatMap(group => group.items.map(item => item.id))).size, 11);
});

test('both DP 3 leaves open their own content in one expanded navigation group', () => {
  for (const id of ['dp-visual-steering', 'dp-asymmetric-friction']) {
    const record = auditData.DARK_PATTERNS_AUDIT.find(item => item.id === id)!;
    const html = renderToStaticMarkup(<DarkPatternInspector isOpen onClose={noop} onSelectPattern={noop} selectedPatternId={id} />);
    assert.match(html, /10 groups.*11 (?:audit )?records/);
    assert.match(html, /<details[^>]*open=""/);
    assert.ok(html.includes('Visual Interference'));
    assert.ok(html.includes('Upsell Interruption'));
    assert.ok(html.includes(record.elementTarget.replaceAll('&', '&amp;').replaceAll('"', '&quot;')));
  }
});

test('new flags use agreed numbers and follow both mode and global visibility', () => {
  for (const [Component, props, number] of [
    [SeatsStep, { fare: auditData.FARE_TIERS.BASIC, selectedSeat: '', onSelectSeat: noop, onBack: noop, onNext: noop }, 5],
    [BagsStep, { fare: auditData.FARE_TIERS.BASIC, additionalLuggage: 0, onSetAdditionalLuggage: noop, onBack: noop, onNext: noop }, 6],
    [ReviewStep, reviewProps, 7],
  ] as const) {
    const render = (overrides = {}) => renderToStaticMarkup(React.createElement(Component as React.ComponentType<any>, { ...props, ...markerProps, ...overrides }));
    assert.match(render(), new RegExp(`aria-label="DP ${number}:`));
    assert.doesNotMatch(render({ showAuditMarkers: false }), /aria-label="DP /);
    assert.doesNotMatch(render({ isDarkPattern: false }), /aria-label="DP /);
  }
});

test('review offers the same £14.50 policy with different defaults by mode', () => {
  const props = { ...markerProps, ...reviewProps };
  for (const showAuditMarkers of [true, false]) {
    const original = renderToStaticMarkup(<ReviewStep {...props} showAuditMarkers={showAuditMarkers} />);
    assert.equal((original.match(/checked=""/g) ?? []).length, 1);
    assert.match(original, /Pay £145\.86 &amp; Confirm/);
    const ethical = renderToStaticMarkup(<ReviewStep {...props} showAuditMarkers={showAuditMarkers} isDarkPattern={false} />);
    assert.match(ethical, /Add Comprehensive Medical &amp; Trip Cancellation Cover \(\+£14\.50\)/);
    assert.equal((ethical.match(/type="checkbox"/g) ?? []).length, 2);
    assert.equal((ethical.match(/checked=""/g) ?? []).length, 0);
    assert.match(ethical, /Pay £131\.36 &amp; Confirm/);
  }
});

test('ethical extras default to no insurance and show the full Plus premium', () => {
  const html = renderToStaticMarkup(<ExtrasStep
    isDarkPattern={false}
    showAuditMarkers={true}
    fastTrackSelected={false}
    onToggleFastTrack={noop}
    insurancePlan="none"
    onSelectInsurance={noop}
    prepaidCredit={0}
    onSelectPrepaidCredit={noop}
    onBack={noop}
    onNext={noop}
  />);
  const insuranceInputs = html.match(/<input[^>]*name="insurance"[^>]*>/g) ?? [];
  const selected = insuranceInputs.filter(input => input.includes('checked=""'));
  assert.equal(selected.length, 1, 'expected a single selected insurance option');
  assert.ok(selected[0].includes('value="none"'));
  assert.ok(html.includes('£6.08'), 'expected the full Plus premium to be visible');
  assert.ok(!html.includes('£0.35 extra'), 'the daily upgrade should not replace the total');
});

test('ethical review carries the selected policy price without a second insurance offer', () => {
  const html = renderToStaticMarkup(<ReviewStep
    {...reviewProps}
    isDarkPattern={false}
    showAuditMarkers={true}
    booking={{ ...EMPTY_BOOKING_CHOICES, insurancePlan: 'plus' }}
  />);
  assert.ok(html.includes('Pay £137.44 &amp; Confirm'));
  assert.ok(!html.includes('£14.50'), 'expected only the selected Plus policy at Review');
});

test('ethical review reflects a previously selected Comprehensive policy once', () => {
  const html = renderToStaticMarkup(<ReviewStep
    {...reviewProps}
    isDarkPattern={false}
    showAuditMarkers={false}
    booking={{ ...EMPTY_BOOKING_CHOICES, insurancePlan: 'comprehensive' }}
  />);
  assert.equal((html.match(/checked=""/g) ?? []).length, 1);
  assert.match(html, /Pay £145\.86 &amp; Confirm/);
});

test('ethical fare choice exposes the active fare and its return price', () => {
  const html = renderToStaticMarkup(<FareSelectionEthical
    selectedTier="REGULAR" onSelectTier={noop} onProceedToNextStep={noop}
  />);
  const selected = html.match(/<button[^>]*aria-pressed="true"[^>]*>[^<]+/g) ?? [];
  assert.equal(selected.length, 1, 'expected a single active fare control');
  assert.ok(selected[0].includes('Regular'));
  assert.ok(html.includes('£189.86'));
  assert.ok(html.includes('+£58.50'));
  assert.ok(html.includes('+£29.25'));
});

test('the split view renders the Original and Ethical versions of every step after Flights', () => {
  const View = comparison.BookingAddOnView;
  assert.equal(typeof View, 'function', 'booking steps after Flights should support comparison');
  const bookings = {
    'dark-pattern': { ...EMPTY_BOOKING_CHOICES, newsletterOptIn: true },
    ethical: EMPTY_BOOKING_CHOICES,
  };

  for (const [step, originalContent, ethicalContent] of [
    ['seats', /Warning: Do not get separated!/, /Seat Allocation Policy/],
    ['bags', /Avoid Up to £60 Gate Fee!/, /Honest Baggage Allowances/],
    ['extras', /The best deals for your trip/, /Optional extras/],
    ['review', /Pay £145\.86 &amp; Confirm/, /Pay £131\.36 &amp; Confirm/],
  ] as const) {
    const html = renderToStaticMarkup(<View
      step={step} viewMode="side-by-side" selectedTier="BASIC" bookings={bookings}
      onChangeBooking={noop} onStepChange={noop} showAuditMarkers={false} onOpenAuditItem={noop}
    />);
    const original = html.indexOf('aria-label="Original Prototype"');
    const ethical = html.indexOf('aria-label="Ethical Redesign"');
    assert.ok(original >= 0 && ethical > original, `${step} should have two labelled comparison panes`);
    assert.match(html.slice(original, ethical), originalContent);
    assert.match(html.slice(ethical), ethicalContent);
  }
});
