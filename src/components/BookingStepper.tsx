import React from 'react';
import { Plane, Armchair, Briefcase, Sparkles, CreditCard, Lock } from 'lucide-react';
import type { BookingStep } from '../types/booking';

interface BookingStepperProps {
  currentStep: BookingStep;
  maxStepReached?: BookingStep;
  onStepChange: (step: BookingStep) => void;
  canNavigateForward?: boolean;
}

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

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const maxStepIndex = steps.findIndex((s) => s.id === maxStepReached);

  return (
    <nav aria-label="Booking steps" className="bg-white border-b border-gray-200 sticky top-[98px] z-20 shadow-xs">
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
              disabled={!isUnlocked}
              aria-current={isActive ? 'step' : undefined}
              title={isUnlocked ? step.label : `Complete previous steps to unlock ${step.label}`}
              onClick={() => {
                if (isUnlocked) {
                  onStepChange(step.id);
                }
              }}
              className={`flex items-center gap-1.5 py-3 px-4 shrink-0 transition-colors border-b-2 font-medium ${
                isActive
                  ? 'border-[#073590] text-[#073590] font-bold bg-blue-50/30'
                  : isPassed
                  ? 'border-transparent text-emerald-700 hover:text-[#073590] cursor-pointer'
                  : isUnlocked
                  ? 'border-transparent text-gray-600 hover:text-[#073590] cursor-pointer'
                  : 'border-transparent text-gray-400 opacity-40 cursor-not-allowed'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#073590]' : isPassed ? 'text-emerald-600' : isUnlocked ? 'text-gray-600' : 'text-gray-300'}`} />
              <span>{step.label}</span>
              {!isUnlocked && (
                <Lock className="w-3 h-3 text-gray-400 ml-0.5 opacity-60" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
