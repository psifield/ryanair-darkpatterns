import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { resolveStudyEntry } from './studyEntry';
import type { StudyEntry } from './studyEntry';
import './index.css';

const params = new URLSearchParams(window.location.search);
const hasExplicitParticipant = params.get('mode') === 'participant' || params.has('study');

// If participant mode is explicitly requested via ?mode=participant or ?study, use study entry
// Otherwise, start directly on the Review & Comparison page by default!
const entry: StudyEntry = hasExplicitParticipant
  ? resolveStudyEntry(window.location.search, () => window.localStorage)
  : { mode: 'review', variant: params.get('v') === 'A' ? 'A' : 'B' };

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App entry={entry} initialViewMode={params.get('v') ? undefined : 'side-by-side'} />
  </StrictMode>,
);
