import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CAR_HIRE_PRICES, CREDIT_PRICE_FACTOR, FAST_TRACK_PRICE, INSURANCE_PLANS, PARKING_PRICES } from '../data/bookingExtras';
import type { CarHireOption, InsurancePlan, ParkingOption } from '../data/bookingExtras';
import type { ExtrasStepProps } from './ExtrasStep';

const panel = 'min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5';
const continueButton = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#073590] px-4 py-2 text-sm font-semibold text-white hover:bg-[#052973] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590] cursor-pointer scroll-mt-48';

interface ExtraOption<T> {
  value: T;
  label: string;
  price: number;
  detail?: string;
}

function ExtraChoices<T extends string | number>({
  name, title, description, options, value, onChange,
}: {
  name: string;
  title: string;
  description: string;
  options: readonly ExtraOption<T>[];
  value: T;
  onChange?: (value: T) => void;
}) {
  return (
    <fieldset aria-labelledby={`${name}-title`} className={panel}>
      <h4 id={`${name}-title`} className="text-base font-bold text-slate-900">{title}</h4>
      <p className="mb-3 mt-1 text-sm text-slate-600">{description}</p>
      <div className="space-y-2">
        {options.map(option => (
          <label
            key={option.value}
            className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-sm hover:bg-slate-50 has-checked:border-[#073590] has-checked:bg-blue-50 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#073590]"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className="mt-0.5 size-4 shrink-0 scroll-mt-48 accent-[#073590]"
            />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-900">{option.label}</span>
              {option.detail && <span className="mt-0.5 block text-slate-600">{option.detail}</span>}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-[#073590]">£{option.price.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const insuranceDetails: Record<InsurancePlan, string> = {
  none: 'Continue with no cover from this booking.',
  standard: 'Trip cover for medical expenses, baggage, cancellation and delayed departure.',
  plus: 'Trip cover with higher limits for medical expenses, baggage and cancellation, plus electronics cover.',
  comprehensive: 'Trip cover for unexpected illness, medical repatriation, cancellation and flight delays.',
  annual: 'One year of standard cover. Each trip can be up to 90 days.',
};

const insuranceOptions = (['none', 'standard', 'plus', 'comprehensive', 'annual'] as const).map(value => ({
  value,
  ...INSURANCE_PLANS[value],
  detail: insuranceDetails[value],
}));

const parkingOptions: ExtraOption<ParkingOption>[] = [
  { value: 'none', label: 'No parking', price: 0 },
  { value: 'long-stay', label: 'Long Stay', price: PARKING_PRICES['long-stay'], detail: 'Free 5-minute shuttle to the terminal. Keep your keys.' },
  { value: 'short-stay', label: 'Short Stay', price: PARKING_PRICES['short-stay'], detail: '2-minute covered walk to the terminal. Keep your keys.' },
  { value: 'meet-greet', label: 'Meet & Greet', price: PARKING_PRICES['meet-greet'], detail: 'Drop off your car and keys at the terminal forecourt.' },
];

const carHireOptions: ExtraOption<CarHireOption>[] = [
  { value: 'none', label: 'No car hire', price: 0 },
  { value: 'economy', label: 'Economy', price: CAR_HIRE_PRICES.economy, detail: 'Volkswagen Polo or similar. Manual, 5 seats and room for 2 bags.' },
  { value: 'estate', label: 'Estate', price: CAR_HIRE_PRICES.estate, detail: 'Skoda Octavia Combi or similar. Manual, 5 seats and room for 5 bags.' },
  { value: 'suv', label: 'SUV', price: CAR_HIRE_PRICES.suv, detail: 'Nissan Qashqai or similar. Automatic, 5 seats and room for 4 large bags.' },
];

const creditOptions = [0, 5, 10, 15, 20].map(value => ({
  value,
  label: value ? `£${value} credit` : 'No credit',
  price: value * CREDIT_PRICE_FACTOR,
}));

export function EthicalExtrasStep({
  fastTrackIncluded = false, fastTrackSelected, onToggleFastTrack,
  insurancePlan, onSelectInsurance, prepaidCredit, onSelectPrepaidCredit,
  selectedParking = 'none', onSelectParking, selectedCarHire = 'none', onSelectCarHire,
  bookingTotal, onBack, onNext,
}: ExtrasStepProps) {
  const hasExtras = (fastTrackSelected && !fastTrackIncluded) || insurancePlan !== 'none'
    || prepaidCredit > 0 || selectedParking !== 'none' || selectedCarHire !== 'none';

  return (
    <section className="mx-auto max-w-5xl space-y-6 pb-8 pt-2" aria-labelledby="optional-extras-title">
      <div className={`${panel} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex-[1_1_18rem]">
          <h2 id="optional-extras-title" className="text-2xl font-black tracking-tight text-[#073590]">Optional extras</h2>
          <p className="mt-1 text-sm text-slate-600">Choose what you need for your trip. The price shown is the amount added to your booking.</p>
        </div>
        <button type="button" onClick={onNext} className={continueButton}>
          {hasExtras ? 'Continue to review' : 'Continue without extras'}
          <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))] items-start gap-5">
        <div className="min-w-0 space-y-4">
          <h3 className="text-lg font-bold text-[#073590]">Airport and trip</h3>
          {fastTrackIncluded ? (
            <div className={panel}>
              <h4 className="text-base font-bold text-slate-900">Security Fast Track</h4>
              <p className="mt-1 text-sm text-slate-600">Fast Track at London Stansted is included with your fare.</p>
            </div>
          ) : (
            <ExtraChoices
              name="fast-track" title="Security Fast Track" description="Available for the departure from London Stansted."
              options={[
                { value: 'none', label: 'No Fast Track', price: 0 },
                { value: 'add', label: 'Stansted Fast Track', price: FAST_TRACK_PRICE, detail: 'Access to the dedicated security lane for one traveller.' },
              ]}
              value={fastTrackSelected ? 'add' : 'none'} onChange={value => onToggleFastTrack(value === 'add')}
            />
          )}
          <ExtraChoices
            name="insurance" title="Travel insurance" description="Total premium for one traveller. Annual cover is priced for one year."
            options={insuranceOptions} value={insurancePlan} onChange={onSelectInsurance}
          />
          <ExtraChoices
            name="credit" title="Prepaid onboard credit" description="Use credit for food, drinks or other purchases on board."
            options={creditOptions} value={prepaidCredit} onChange={onSelectPrepaidCredit}
          />
        </div>
        <div className="min-w-0 space-y-4">
          <h3 className="text-lg font-bold text-[#073590]">Transport</h3>
          <ExtraChoices
            name="parking" title="Stansted parking" description="Total for 4 days, lowest price first."
            options={parkingOptions} value={selectedParking} onChange={onSelectParking}
          />
          <ExtraChoices
            name="car-hire" title="Palanga car hire" description="Airport pickup. Total for 4 days, lowest price first."
            options={carHireOptions} value={selectedCarHire} onChange={onSelectCarHire}
          />
        </div>
      </div>

      <div className={`${panel} flex flex-wrap items-center justify-between gap-3`}>
        <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590] cursor-pointer scroll-mt-48">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to bags
        </button>
        {bookingTotal !== undefined && (
          <p aria-live="polite" className="text-sm text-slate-700">Booking total <strong className="tabular-nums text-[#073590]">£{bookingTotal.toFixed(2)}</strong></p>
        )}
        <button type="button" onClick={onNext} className={continueButton}>
          Continue to review <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
