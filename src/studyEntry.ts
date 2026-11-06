export type StudyVariant = 'A' | 'B';

export interface StudyEntry {
  mode: 'participant' | 'review';
  variant: StudyVariant;
}

const variantKey = 'decision-architecture.study-variant';
const isStudyVariant = (value: string | null): value is StudyVariant => value === 'A' || value === 'B';

export function resolveStudyEntry(
  search: string,
  getStorage: () => Pick<Storage, 'getItem' | 'setItem'>,
  random = Math.random,
): StudyEntry {
  const params = new URLSearchParams(search);
  const requested = params.get('v');
  if (params.get('mode') === 'review') {
    return { mode: 'review', variant: requested === 'B' ? 'B' : 'A' };
  }
  if (isStudyVariant(requested)) return { mode: 'participant', variant: requested };

  const drawVariant = (): StudyVariant => random() < 0.5 ? 'A' : 'B';
  let assigned: StudyVariant | undefined;
  try {
    const storage = getStorage();
    const saved = storage.getItem(variantKey);
    if (isStudyVariant(saved)) return { mode: 'participant', variant: saved };
    assigned = drawVariant();
    storage.setItem(variantKey, assigned);
  } catch {
    console.warn('The study assignment could not be saved in this browser.');
  }
  return { mode: 'participant', variant: assigned ?? drawVariant() };
}
