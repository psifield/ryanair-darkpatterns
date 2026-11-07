import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { resolveStudyEntry } from './studyEntry';
import type { StudyEntry } from './studyEntry';
import './index.css';

const params = new URLSearchParams(window.location.search);
const hasExplicitParticipant = params.get('mode') === 'participant' || params.has('study');

const requestedV = params.get('v');

// If participant mode is explicitly requested via ?mode=participant or ?study, use study entry
// Otherwise, start directly on the Review & Comparison page by default!
const entry: StudyEntry = hasExplicitParticipant
  ? resolveStudyEntry(window.location.search, () => window.localStorage)
  : { mode: 'review', variant: requestedV === 'B' ? 'B' : 'A' };

const initialViewMode = requestedV === 'A'
  ? 'dark-pattern'
  : requestedV === 'B'
  ? 'ethical'
  : 'side-by-side';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App entry={entry} initialViewMode={initialViewMode} />
  </StrictMode>,
);
