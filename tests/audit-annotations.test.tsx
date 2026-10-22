import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as auditData from '../src/data/mockData';
import { DarkPatternInspector } from '../src/components/DarkPatternInspector';
import { SeatsStep } from '../src/components/SeatsStep';
import { BagsStep } from '../src/components/BagsStep';
import { ReviewStep } from '../src/components/ReviewStep';

const noop = () => {};
const markerProps = { isDarkPattern: true, showAuditMarkers: true, onOpenAuditItem: noop };

test('seven numbered groups retain eight distinct audit records', () => {
  assert.equal(auditData.DARK_PATTERNS_AUDIT.length, 8);
  assert.deepEqual(auditData.DARK_PATTERN_GROUPS.map(group => [group.number, group.items.map(item => item.id)]), [
    [1, ['dp-scarcity']],
    [2, ['dp-drip-pricing']],
    [3, ['dp-visual-steering', 'dp-asymmetric-friction']],
    [4, ['dp-roadblock-confirmshame']],
    [5, ['dp-seat-pressure']],
    [6, ['dp-hidden-baggage']],
    [7, ['dp-travel-protection']],
  ]);
  assert.equal(new Set(auditData.DARK_PATTERN_GROUPS.flatMap(group => group.items.map(item => item.id))).size, 8);
});

test('both DP 3 leaves open their own content in one expanded navigation group', () => {
  for (const id of ['dp-visual-steering', 'dp-asymmetric-friction']) {
    const record = auditData.DARK_PATTERNS_AUDIT.find(item => item.id === id)!;
    const html = renderToStaticMarkup(<DarkPatternInspector isOpen onClose={noop} onSelectPattern={noop} selectedPatternId={id} />);
    assert.match(html, /7 groups.*8 (?:audit )?records/);
    assert.match(html, /<details[^>]*open=""/);
    assert.ok(html.includes('Visual Interference'));
    assert.ok(html.includes('Upsell Interruption'));
    assert.ok(html.includes(record.elementTarget.replaceAll('&', '&amp;').replaceAll('"', '&quot;')));
  }
});

test('new flags use agreed numbers and follow both mode and global visibility', () => {
  for (const [Component, props, number] of [
    [SeatsStep, { selectedSeat: '', onSelectSeat: noop, onBack: noop, onNext: noop }, 5],
    [BagsStep, { additionalLuggage: 0, onSetAdditionalLuggage: noop, onBack: noop, onNext: noop }, 6],
    [ReviewStep, { selectedTier: 'BASIC', selectedSeat: '', additionalLuggage: 0, newsletterOptIn: true, onToggleNewsletter: noop, onBack: noop }, 7],
  ] as const) {
    const render = (overrides = {}) => renderToStaticMarkup(React.createElement(Component as React.ComponentType<any>, { ...props, ...markerProps, ...overrides }));
    assert.match(render(), new RegExp(`aria-label="DP ${number}:`));
    assert.doesNotMatch(render({ showAuditMarkers: false }), /aria-label="DP /);
    assert.doesNotMatch(render({ isDarkPattern: false }), /aria-label="DP /);
  }
});

test('insurance keeps its £14.50 default and total independently of newsletter and annotations', () => {
  const props = { ...markerProps, selectedTier: 'BASIC' as const, selectedSeat: '', additionalLuggage: 0, newsletterOptIn: false, onToggleNewsletter: noop, onBack: noop };
  for (const showAuditMarkers of [true, false]) {
    const original = renderToStaticMarkup(<ReviewStep {...props} showAuditMarkers={showAuditMarkers} />);
    assert.equal((original.match(/checked=""/g) ?? []).length, 1);
    assert.match(original, /Pay £145\.86 &amp; Confirm/);
    const ethical = renderToStaticMarkup(<ReviewStep {...props} showAuditMarkers={showAuditMarkers} isDarkPattern={false} />);
    assert.equal((ethical.match(/checked=""/g) ?? []).length, 0);
    assert.match(ethical, /Pay £131\.36 &amp; Confirm/);
  }
});
