import React from 'react';
import { Plane, Armchair, Briefcase, Sparkles, CreditCard } from 'lucide-react';

interface BookingStepperProps {
  currentStep: 'flights' | 'seats' | 'bags' | 'extras' | 'review';
  onStepChange: (step: 'flights' | 'seats' | 'bags' | 'extras' | 'review') => void;
  canNavigateForward?: boolean;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  onStepChange,
  canNavigateForward = true,
}) => {
  const steps = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'seats', label: 'Seats', icon: Armchair },
    { id: 'bags', label: 'Bags', icon: Briefcase },
    { id: 'extras', label: 'Extras', icon: Sparkles },
    { id: 'review', label: 'Review & Pay', icon: CreditCard },
  ] as const;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-[98px] z-20 shadow-xs">
      <div className="max-w-4xl mx-auto flex items-stretch justify-around text-xs font-medium text-gray-500 overflow-x-auto">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isPassed = steps.findIndex((s) => s.id === step.id) < steps.findIndex((s) => s.id === currentStep);

          return (
            <button
              key={step.id}
              onClick={() => {
                if (isPassed || canNavigateForward || isActive) {
                  onStepChange(step.id);
                }
              }}
              className={`flex items-center gap-1.5 py-3 px-4 shrink-0 transition-colors border-b-2 font-medium ${
                isActive
                  ? 'border-[#073590] text-[#073590] font-bold bg-blue-50/30'
                  : isPassed
                  ? 'border-transparent text-emerald-700 hover:text-[#073590]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#073590]' : isPassed ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
