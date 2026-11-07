import type { StudyVariant } from '../studyEntry';

interface StudyScreenProps {
  stage: 'consent' | 'debrief';
  variant: StudyVariant;
  onConsent: () => void;
  onBackToFlights?: () => void;
  onContinueToBooking?: () => void;
  onOpenReviewMode?: () => void;
}

export function StudyScreen({
  stage,
  variant,
  onConsent,
  onBackToFlights,
  onContinueToBooking,
  onOpenReviewMode,
}: StudyScreenProps) {
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

          {onOpenReviewMode && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#073590]">Course Evaluator &amp; Grader View</span>
                <span className="bg-[#073590] text-white text-[10px] font-bold px-2 py-0.5 rounded">Quick Access</span>
              </div>
              <p className="text-blue-800">
                Skip the participant randomized trial and open the complete comparison mode to inspect both variants and all 11 audit records.
              </p>
              <button
                type="button"
                onClick={onOpenReviewMode}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#073590] bg-white px-4 py-2 font-bold text-[#073590] hover:bg-blue-50 transition cursor-pointer"
              >
                Open Review &amp; Comparison Mode →
              </button>
            </div>
          )}
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

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row flex-wrap gap-3">
            {onBackToFlights && (
              <button
                type="button"
                onClick={onBackToFlights}
                className="min-h-11 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]"
              >
                ← Back to flight selection
              </button>
            )}
            {onContinueToBooking && (
              <button
                type="button"
                onClick={onContinueToBooking}
                className="min-h-11 cursor-pointer rounded-lg bg-[#073590] px-4 py-2.5 font-semibold text-white hover:bg-[#052973] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]"
              >
                Continue booking demo (Seats, Bags & Extras) →
              </button>
            )}
            {onOpenReviewMode && (
              <button
                type="button"
                onClick={onOpenReviewMode}
                className="min-h-11 cursor-pointer rounded-lg bg-emerald-700 px-4 py-2.5 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                Open Review & Comparison Mode →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
