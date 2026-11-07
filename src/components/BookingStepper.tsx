import React, { useEffect, useState } from 'react';
import { Plane, Armchair, Briefcase, Sparkles, CreditCard, Check, Info, X } from 'lucide-react';
import type { BookingStep } from '../types/booking';

interface BookingStepperProps {
  currentStep: BookingStep;
  maxStepReached?: BookingStep;
  onStepChange: (step: BookingStep) => void;
  canNavigateForward?: boolean;
}

const STEP_GUIDANCE: Record<BookingStep, { title: string; hint: string }> = {
  flights: {
    title: 'Flight fare selection required',
    hint: 'Please select and confirm a fare bundle on the flights page first before proceeding.',
  },
  seats: {
    title: 'Seat choice required',
    hint: 'Please select a reserved seat or continue with free random allocation to proceed.',
  },
  bags: {
    title: 'Baggage review required',
    hint: 'Please review your cabin bag options and click "Continue to Extras" to proceed.',
  },
  extras: {
    title: 'Travel extras review required',
    hint: 'Please review your airport and travel protection options before proceeding to Review & Pay.',
  },
  review: {
    title: 'Final review',
    hint: 'Please review your final itinerary and complete confirmation.',
  },
};

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  maxStepReached = 'flights',
  onStepChange,
  canNavigateForward = false,
}) => {
  const steps = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'seats', label: 'Seats', icon: Armchair },
    { id: 'bags', label: 'Bags', icon: Briefcase },
    { id: 'extras', label: 'Extras', icon: Sparkles },
    { id: 'review', label: 'Review & Pay', icon: CreditCard },
  ] as const;

  const [blockedAttempt, setBlockedAttempt] = useState<{
    targetStepId: BookingStep;
    targetStepLabel: string;
  } | null>(null);

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const maxStepIndex = steps.findIndex((s) => s.id === maxStepReached);
  const currentStepLabel = steps[currentStepIndex]?.label ?? 'current';

  // Automatically dismiss blocked attempt notice after 5 seconds
  useEffect(() => {
    if (!blockedAttempt) return;
    const timer = setTimeout(() => setBlockedAttempt(null), 5000);
    return () => clearTimeout(timer);
  }, [blockedAttempt]);

  // Clear notice whenever step changes
  useEffect(() => {
    setBlockedAttempt(null);
  }, [currentStep]);

  return (
    <nav aria-label="Booking steps" className="bg-white border-b border-gray-200 sticky top-[98px] z-20 shadow-xs relative">
      <div className="max-w-4xl mx-auto flex items-stretch justify-around text-xs font-medium text-gray-500 overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPassed = index < currentStepIndex;
          const isUnlocked = index <= maxStepIndex || canNavigateForward;

          return (
            <button
              key={step.id}
              type="button"
              aria-current={isActive ? 'step' : undefined}
              title={isUnlocked ? step.label : `Click for guidance: please complete ${currentStepLabel} first`}
              onClick={() => {
                if (isUnlocked) {
                  setBlockedAttempt(null);
                  onStepChange(step.id);
                } else {
                  setBlockedAttempt({
                    targetStepId: step.id,
                    targetStepLabel: step.label,
                  });
                }
              }}
              className={`flex items-center gap-1.5 py-3 px-3 sm:px-4 shrink-0 transition-colors border-b-2 font-medium cursor-pointer relative ${
                isActive
                  ? 'border-[#073590] text-[#073590] font-bold bg-blue-50/40'
                  : isPassed
                  ? 'border-transparent text-emerald-700 hover:text-[#073590] hover:bg-emerald-50/30'
                  : isUnlocked
                  ? 'border-transparent text-gray-600 hover:text-[#073590] hover:bg-gray-50/60'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-amber-50/40'
              }`}
            >
              {isPassed ? (
                <Check className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              ) : (
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#073590]' : isUnlocked ? 'text-gray-600' : 'text-gray-400'}`} />
              )}
              <span>{step.label}</span>
              {!isUnlocked && (
                <span className="text-[10px] text-amber-700 bg-amber-100 font-semibold px-1.5 py-0.5 rounded ml-0.5 sm:inline hidden">
                  Step {index + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Floating step completion guidance indicator popup */}
      {blockedAttempt && (
        <div
          role="alert"
          aria-live="polite"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-30 w-full max-w-lg px-4 pointer-events-auto"
        >
          <div className="bg-slate-900 text-white rounded-xl shadow-2xl border-2 border-amber-400/50 p-4 flex items-start gap-3.5 text-xs">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-white text-sm">
                  {STEP_GUIDANCE[currentStep]?.title || 'Step completion required'}
                </p>
                <button
                  type="button"
                  onClick={() => setBlockedAttempt(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md transition cursor-pointer"
                  aria-label="Dismiss notice"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Please complete the <strong className="text-amber-300 underline underline-offset-2">{currentStepLabel}</strong> step first before proceeding to <span className="font-bold text-white">{blockedAttempt.targetStepLabel}</span>.
              </p>
              <p className="text-[11px] text-slate-400">
                {STEP_GUIDANCE[currentStep]?.hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
