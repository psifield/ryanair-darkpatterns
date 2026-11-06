import React, { useId } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { FARE_TIERS } from '../data/mockData';
import type { FareTier, FareTierId } from '../types/booking';

interface FareSelectionEthicalProps {
  onSelectTier: (tier: FareTierId) => void;
  selectedTier: FareTierId;
  onProceedToNextStep: () => void;
  continueLabel?: string;
  showAuditMarkers?: boolean;
  onOpenAuditItem?: (id: string) => void;
}

interface FareFeature {
  label: string;
  detail?: string;
  display: (fare: FareTier) => string;
}

const fares = Object.values(FARE_TIERS);
const inclusion = (included: boolean) => included ? 'Included' : 'Not included';
const seatByFare: Record<FareTierId, string> = {
  BASIC: 'Free random seat',
  REGULAR: 'Rows 18–33',
  PLUS: 'Standard seat',
  FLEXI_PLUS: 'Any reserved seat',
};

const essentials: FareFeature[] = [
  { label: 'Seat', display: fare => seatByFare[fare.id] },
  { label: '10 kg cabin bag', detail: '55 × 40 × 20 cm', display: fare => inclusion(fare.features.cabinBag10kg) },
  { label: '20 kg checked bag', display: fare => inclusion(fare.features.checkedBag20kg) },
];

const comparison: FareFeature[] = [
  { label: 'Underseat bag', detail: '40 × 20 × 25 cm', display: fare => inclusion(fare.features.smallBag) },
  ...essentials,
  { label: 'Boarding', display: fare => fare.features.priorityBoarding ? 'Priority' : 'Standard' },
  { label: 'Security Fast Track', display: fare => inclusion(fare.features.fastTrack) },
  { label: 'Airport check-in', display: fare => fare.id === 'PLUS' ? 'Included' : 'See fare terms' },
  { label: 'Flight changes', display: fare => fare.features.flexibleChange ? 'No change fee' : 'Standard terms' },
];

const nextButton = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#073590] px-4 py-2 text-sm font-semibold text-white hover:bg-[#052973] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]';

export function FareSelectionEthical({
  onSelectTier, selectedTier, onProceedToNextStep, continueLabel = 'Continue to seats',
}: FareSelectionEthicalProps) {
  const headingId = useId();
  const selectedFare = FARE_TIERS[selectedTier];

  return (
    <section className="@container space-y-4 pt-2" aria-labelledby={headingId} data-purpose="fare-selection-matrix">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex-[1_1_18rem]">
          <h2 id={headingId} className="text-2xl font-black tracking-tight text-[#073590]">Choose your fare</h2>
          <p className="mt-1 text-sm text-slate-600">Return prices for one adult. All fares include a small underseat bag.</p>
        </div>
        <button type="button" onClick={onProceedToNextStep} className={nextButton}>
          Continue with {selectedFare.name}
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </header>

      <div className="grid gap-3 @min-[28rem]:grid-cols-2 @min-[59rem]:grid-cols-4">
        {fares.map(fare => {
          const isSelected = fare.id === selectedTier;
          return (
            <article
              key={fare.id}
              className={`flex min-w-0 flex-col rounded-xl border bg-white p-4 ${isSelected ? 'border-[#073590] ring-1 ring-[#073590]' : 'border-slate-200'}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                <h3 className="text-lg font-bold text-slate-900">{fare.name}</h3>
                {isSelected && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#073590]">Selected</span>}
              </div>

              <div className="mt-3">
                <p className="text-2xl font-black tracking-tight tabular-nums text-slate-900">£{fare.totalPrice.toFixed(2)}</p>
                <p className="text-xs text-slate-600">Return total</p>
              </div>
              <div className="mt-2 min-h-10 text-xs text-slate-600">
                {fare.id === 'BASIC' ? (
                  <p className="font-semibold text-slate-800">Base fare</p>
                ) : (
                  <>
                    <p className="font-semibold text-slate-800">+£{fare.roundtripSurcharge.toFixed(2)} vs Basic return</p>
                    <p>+£{fare.surchargePerFlight.toFixed(2)} per flight</p>
                  </>
                )}
              </div>

              <dl className="my-3 flex-1 divide-y divide-slate-100 border-y border-slate-100 text-xs">
                {essentials.map(feature => (
                  <div key={feature.label} className="flex items-baseline justify-between gap-2 py-2">
                    <dt className="text-slate-600">{feature.label}</dt>
                    <dd className="text-right font-medium text-slate-900">{feature.display(fare)}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectTier(fare.id)}
                className={`min-h-11 w-full cursor-pointer rounded-lg border px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590] ${isSelected ? 'border-[#073590] bg-blue-50 text-[#073590]' : 'border-slate-300 text-slate-800 hover:bg-slate-50'}`}
              >
                Select {fare.name}
              </button>
            </article>
          );
        })}
      </div>

      <details className="group rounded-xl border border-slate-200 bg-white">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#073590] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590] [&::-webkit-details-marker]:hidden">
          Compare all fare inclusions
          <ChevronDown className="size-4 group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="overflow-x-auto border-t border-slate-200 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#073590]" tabIndex={0} role="region" aria-label="Fare inclusions comparison">
          <table className="w-full min-w-[32rem] border-collapse text-left text-xs">
            <thead className="bg-slate-50 text-slate-800">
              <tr>
                <th scope="col" className="px-4 py-2">Feature</th>
                {fares.map(fare => <th scope="col" key={fare.id} className="px-3 py-2">{fare.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparison.map(feature => (
                <tr key={feature.label}>
                  <th scope="row" className="px-4 py-2 font-semibold text-slate-900">
                    {feature.label}
                    {feature.detail && <span className="block font-normal text-slate-600">{feature.detail}</span>}
                  </th>
                  {fares.map(fare => <td key={fare.id} className="px-3 py-2 text-slate-700">{feature.display(fare)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div aria-live="polite">
          <p className="text-xs font-semibold text-slate-600">Selected return fare</p>
          <p className="text-base font-bold tabular-nums text-slate-900">{selectedFare.name} · £{selectedFare.totalPrice.toFixed(2)}</p>
        </div>
        <button type="button" onClick={onProceedToNextStep} className={nextButton}>
          {continueLabel} <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
