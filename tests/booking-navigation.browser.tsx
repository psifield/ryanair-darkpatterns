import React, { act, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import type { StudyEntry } from '../src/studyEntry';

// Run against real DOM events in Vite's development browser, without a second test framework.
(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const booking = document.getElementById('booking')!;
const results = document.getElementById('results')!;
const cases: { name: string; entry: StudyEntry; actions: RegExp[]; total: string }[] = [];

for (const mode of ['participant', 'review'] as const) {
  cases.push(
    { name: `${mode} A: keep Basic after the upsell`, entry: { mode, variant: 'A' }, actions: [/^Continue with Basic →$/, /^Continue with Basic$/], total: '131.36' },
    { name: `${mode} A: switch to Regular in the upsell`, entry: { mode, variant: 'A' }, actions: [/^Continue with Basic →$/, /^Switch to Regular$/], total: '189.86' },
    { name: `${mode} A: quick Basic continuation`, entry: { mode, variant: 'A' }, actions: [/^Continue with basic for £131\.36$/, /^Continue with Basic$/], total: '131.36' },
    { name: `${mode} A: confirm a selected Plus fare`, entry: { mode, variant: 'A' }, actions: [/^\+£43\.24/, /^Continue with Plus →$/], total: '217.84' },
    { name: `${mode} B: confirm Basic`, entry: { mode, variant: 'B' }, actions: [mode === 'participant' ? /^Confirm fare choice$/ : /^Continue to seats$/], total: '131.36' },
    { name: `${mode} B: quick Basic continuation`, entry: { mode, variant: 'B' }, actions: [/^Continue with Basic$/], total: '131.36' },
    { name: `${mode} B: select and confirm Regular`, entry: { mode, variant: 'B' }, actions: [/^Select Regular$/, mode === 'participant' ? /^Confirm fare choice$/ : /^Continue to seats$/], total: '189.86' },
  );
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function click(label: RegExp) {
  const buttons = [...booking.querySelectorAll('button')].filter(button => label.test(button.textContent!.replace(/\s+/g, ' ').trim()));
  assert(buttons.length === 1, `Expected one button matching ${label}, found ${buttons.length}`);
  await act(async () => buttons[0].click());
}

let failures = 0;
for (const scenario of cases) {
  const result = document.createElement('li');
  results.append(result);
  const root = createRoot(booking);
  try {
    await act(async () => root.render(<StrictMode><App entry={scenario.entry} /></StrictMode>));
    if (scenario.entry.mode === 'participant') await click(/^Agree and continue$/);
    for (const action of scenario.actions) {
      await click(action);
      assert(!booking.querySelector('[aria-label="Fare choice complete"]'), 'Fare selection must not insert a debrief prompt');
    }
    assert(booking.querySelector('[aria-current="step"]')?.textContent?.trim() === 'Seats', 'Fare confirmation must open Seats');
    assert(booking.querySelector('[title="Cart Summary"]')?.textContent?.includes(scenario.total), `Seats must keep the selected fare total £${scenario.total}`);
    assert(!booking.querySelector('[aria-labelledby="study-heading"]'), 'Fare confirmation must not open the debrief');
    assert(document.activeElement === booking.querySelector('main'), 'Keyboard focus must move to the Seats content');
    if (scenario.entry.mode === 'participant') {
      await click(/^Study Debrief$/);
      assert(booking.querySelector('#study-heading')?.textContent?.trim() === 'Study debrief', 'Participants must still be able to open the debrief');
      await click(/^← Return to booking$/);
      assert(booking.querySelector('[aria-current="step"]')?.textContent?.trim() === 'Seats', 'Returning from the debrief must preserve the booking step');
    }
    result.textContent = `PASS: ${scenario.name}`;
  } catch (error) {
    failures++;
    result.textContent = `FAIL: ${scenario.name}: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    await act(async () => root.unmount());
  }
}

document.getElementById('summary')!.textContent = `${cases.length - failures}/${cases.length} booking navigation checks passed`;
document.body.dataset.testStatus = failures ? 'failed' : 'passed';
