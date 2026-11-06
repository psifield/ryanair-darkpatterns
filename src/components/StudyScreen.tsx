import type { StudyVariant } from '../studyEntry';

interface StudyScreenProps {
  stage: 'consent' | 'debrief';
  variant: StudyVariant;
  onConsent: () => void;
}

export function StudyScreen({ stage, variant, onConsent }: StudyScreenProps) {
  return (
    <section aria-labelledby="study-heading" className="mx-auto w-full max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-slate-600">Class prototype</p>
      <h1 id="study-heading" className="text-2xl font-black tracking-tight text-[#073590] sm:text-3xl">
        {stage === 'consent' ? 'Study consent' : 'Study debrief'}
      </h1>
      {stage === 'consent' ? (
        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          <p>You’ll compare fares for a simulated return flight. The prototype places no orders, takes no payments, and asks for no personal information.</p>
          <p>Taking part is voluntary. You can stop at any time by closing this page.</p>
          <button type="button" onClick={onConsent} className="min-h-11 cursor-pointer rounded-lg bg-[#073590] px-4 py-2.5 font-semibold text-white hover:bg-[#052973] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]">
            Agree and continue
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          <p>No booking was made and no payment was taken. You saw <strong>Version {variant}</strong>.</p>
          <p>The study compares how three choices in Version A affect fare selection and understanding of the return price.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Upgrade prices shown per flight, leaving travellers to calculate the return cost.</li>
            <li>Unequal emphasis and detail across fares, drawing attention to paid upgrades.</li>
            <li>A Regular upsell after choosing Basic, highlighting features Basic leaves out.</li>
          </ul>
        </div>
      )}
    </section>
  );
}
