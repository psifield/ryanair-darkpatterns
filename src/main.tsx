import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { resolveStudyEntry } from './studyEntry';
import './index.css';

const entry = resolveStudyEntry(window.location.search, () => window.localStorage);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App entry={entry} />
  </StrictMode>,
);
