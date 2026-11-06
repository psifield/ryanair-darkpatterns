import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { FlightSelection } from '../src/components/FlightSelection';
import { INBOUND_FLIGHT, OUTBOUND_FLIGHT } from '../src/data/mockData';
import { resolveStudyEntry } from '../src/studyEntry';

const variantKey = 'decision-architecture.study-variant';

function studyStorage(saved?: string) {
  const data = new Map<string, string>();
  if (saved !== undefined) data.set(variantKey, saved);
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value); },
  };
}

test('the bare link draws either variant once per browser', () => {
  for (const [draw, variant] of [[0.25, 'A'], [0.75, 'B']] as const) {
    const storage = studyStorage();
    const getStorage = () => storage;
    assert.deepEqual(resolveStudyEntry('', getStorage, () => draw), { mode: 'participant', variant });
    assert.equal(storage.getItem(variantKey), variant);
    assert.deepEqual(resolveStudyEntry('', getStorage, () => 1 - draw), { mode: 'participant', variant });
  }
});

test('direct links override the saved variant without replacing it', () => {
  for (const [saved, requested] of [['A', 'B'], ['B', 'A']] as const) {
    const storage = studyStorage(saved);
    assert.deepEqual(resolveStudyEntry(`?v=${requested}`, () => storage), { mode: 'participant', variant: requested });
    assert.equal(storage.getItem(variantKey), saved);
  }
});

test('an invalid URL or stored variant falls back to a valid assignment', () => {
  const storage = studyStorage('old-value');
  assert.deepEqual(resolveStudyEntry('?v=C', () => storage, () => 0.75), { mode: 'participant', variant: 'B' });
  assert.equal(storage.getItem(variantKey), 'B');
});

test('review entry bypasses participant assignment', () => {
  const getStorage = () => { throw new Error('review should not need storage'); };
  assert.deepEqual(resolveStudyEntry('?mode=review', getStorage), { mode: 'review', variant: 'A' });
  assert.deepEqual(resolveStudyEntry('?mode=review&v=B', getStorage), { mode: 'review', variant: 'B' });
});

test('participant entry still works when the browser denies storage', t => {
  t.mock.method(console, 'warn', () => {});
  const deniedStorage = () => { throw new DOMException('Storage blocked', 'SecurityError'); };
  assert.deepEqual(resolveStudyEntry('', deniedStorage, () => 0.25), { mode: 'participant', variant: 'A' });
  const storage = { getItem: () => null, setItem: deniedStorage };
  assert.deepEqual(resolveStudyEntry('', () => storage, () => 0.75), { mode: 'participant', variant: 'B' });
});

test('each participant variant starts with consent before the fare task', () => {
  for (const variant of ['A', 'B'] as const) {
    const html = renderToStaticMarkup(<App entry={{ mode: 'participant', variant }} />);
    assert.ok(html.includes('Study consent'), `variant ${variant} should start at consent`);
    assert.doesNotMatch(html, /Continue with Basic|Full UX Audit|Side-by-Side Split|Currently Viewing/);
  }
});

test('review opens the requested variant with booking and comparison controls', () => {
  const html = renderToStaticMarkup(<App entry={{ mode: 'review', variant: 'B' }} />);
  assert.ok(html.includes('Ethical Redesign (Untested)'), 'review should start in B');
  assert.match(html, /Side-by-Side Split/);
  assert.match(html, /Review &amp; Pay/);
  assert.doesNotMatch(html, /Study consent/);
});

test('the participant flight cards omit simulated seat availability in both designs', () => {
  const noop = () => {};
  for (const isDarkPattern of [true, false]) {
    const html = renderToStaticMarkup(<FlightSelection
      outboundFlight={OUTBOUND_FLIGHT}
      inboundFlight={INBOUND_FLIGHT}
      outboundSelected
      inboundSelected
      selectedOutboundDate={OUTBOUND_FLIGHT.date}
      selectedInboundDate={INBOUND_FLIGHT.date}
      onSelectOutboundDate={noop}
      onSelectInboundDate={noop}
      onToggleOutbound={noop}
      onToggleInbound={noop}
      onResetFlights={noop}
      isDarkPattern={isDarkPattern}
      showScarcity={false}
    />);
    assert.doesNotMatch(html, /seats? left at this price/);
  }
});

test('Original review keeps the seat-availability example for the audit', () => {
  const html = renderToStaticMarkup(<App entry={{ mode: 'review', variant: 'A' }} />);
  assert.match(html, /1[^\d]+seats? left at this price/);
  assert.match(html, /4[^\d]+seats left at this price/);
});

test('both review variants show the fictional airline and flight numbers', () => {
  for (const variant of ['A', 'B'] as const) {
    const html = renderToStaticMarkup(<App entry={{ mode: 'review', variant }} />);
    assert.ok(html.includes('Alderwake Air'), `variant ${variant} should show the fictional airline`);
    assert.ok(html.includes('Alderwake Portal'));
    assert.ok(html.includes('ALDW 286') && html.includes('ALDW 285'));
    assert.doesNotMatch(html, /ryanair|\bFR 28[56]\b/i);
  }
});

test('review never asks for a newsletter email address', () => {
  const html = renderToStaticMarkup(<App entry={{ mode: 'review', variant: 'A' }} />);
  assert.ok(!html.includes('type="email"'), 'the footer should not ask for an email address');
});
