import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { FARE_TIERS } from '../data/mockData';
import { getBookingPricing } from '../data/bookingExtras';
import type { BookingChoices } from '../data/bookingExtras';
import type { BookingStep, FareTierId, PrototypeMode, ViewMode } from '../types/booking';
import { SeatsStep } from './SeatsStep';
import { BagsStep } from './BagsStep';
import { ExtrasStep } from './ExtrasStep';
import { ReviewStep } from './ReviewStep';

export function SideBySideView({ original, ethical }: { original: React.ReactNode; ethical: React.ReactNode }) {
  return (
    <div className="@container mx-auto w-full max-w-[1700px] space-y-4">
      <div className="rounded-xl bg-blue-900 p-4 text-white">
        <h2 className="font-bold">Side-by-Side Comparison</h2>
        <p className="mt-1 text-sm text-blue-100">Both designs follow the same booking step. Seat, bag and extras choices are separate.</p>
        <div className="mt-2 flex flex-wrap gap-x-4 text-sm font-semibold @min-[44rem]:hidden">
          <a className="inline-flex min-h-11 items-center underline" href="#compare-original">Jump to Original</a>
          <a className="inline-flex min-h-11 items-center underline" href="#compare-ethical">Jump to Ethical</a>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-4 @min-[44rem]:grid-cols-2">
        <section id="compare-original" aria-label="Original Prototype" className="min-w-0 scroll-mt-48 space-y-3 rounded-2xl border-2 border-rose-300 bg-slate-100 p-2 sm:p-3">
          <h3 className="flex items-center gap-2 rounded-xl bg-rose-900 p-3 text-sm font-bold text-white">
            <AlertTriangle className="size-4 shrink-0 text-rose-300" aria-hidden="true" />
            Original Prototype
          </h3>
          {original}
        </section>
        <section id="compare-ethical" aria-label="Ethical Redesign" className="min-w-0 scroll-mt-48 space-y-3 rounded-2xl border-2 border-emerald-400 bg-slate-100 p-2 sm:p-3">
          <h3 className="flex items-center gap-2 rounded-xl bg-emerald-950 p-3 text-sm font-bold text-white">
            <ShieldCheck className="size-4 shrink-0 text-emerald-300" aria-hidden="true" />
            Ethical Redesign
          </h3>
          {ethical}
        </section>
      </div>
    </div>
  );
}

interface BookingAddOnViewProps {
  step: Exclude<BookingStep, 'flights'>;
  viewMode: ViewMode;
  selectedTier: FareTierId;
  bookings: Record<PrototypeMode, BookingChoices>;
  onChangeBooking: (mode: PrototypeMode, changes: Partial<BookingChoices>) => void;
  onStepChange: (step: BookingStep) => void;
  showAuditMarkers: boolean;
  onOpenAuditItem: (id: string) => void;
}

export function BookingAddOnView({
  step, viewMode, selectedTier, bookings, onChangeBooking, onStepChange, showAuditMarkers, onOpenAuditItem,
}: BookingAddOnViewProps) {
  const renderStep = (mode: PrototypeMode) => {
    const isDarkPattern = mode === 'dark-pattern';
    const common = { isDarkPattern, showAuditMarkers, onOpenAuditItem };
    const inComparison = viewMode === 'side-by-side';
    const booking = bookings[mode];
    const update = (changes: Partial<BookingChoices>) => onChangeBooking(mode, changes);

    switch (step) {
      case 'seats':
        return <SeatsStep
          {...common}
          key={mode}
          inComparison={inComparison}
          selectedSeat={booking.selectedSeat}
          onSelectSeat={selectedSeat => update({ selectedSeat })}
          fastTrackSelected={booking.fastTrackSelected}
          onToggleFastTrack={fastTrackSelected => update({ fastTrackSelected })}
          onBack={() => onStepChange('flights')}
          onNext={() => onStepChange('bags')}
        />;
      case 'bags':
        return <BagsStep
          {...common}
          isSplitView={inComparison}
          additionalLuggage={booking.additionalLuggage}
          onSetAdditionalLuggage={additionalLuggage => update({ additionalLuggage })}
          onBack={() => onStepChange('seats')}
          onNext={() => onStepChange('extras')}
        />;
      case 'extras': {
        const { fastTrackIncluded, total } = getBookingPricing(FARE_TIERS[selectedTier], booking, isDarkPattern);
        return <ExtrasStep
          {...common}
          inComparison={inComparison}
          fastTrackSelected={booking.fastTrackSelected}
          fastTrackIncluded={fastTrackIncluded}
          onToggleFastTrack={fastTrackSelected => update({ fastTrackSelected })}
          insurancePlan={booking.insurancePlan}
          onSelectInsurance={insurancePlan => update({ insurancePlan })}
          prepaidCredit={booking.prepaidCredit}
          onSelectPrepaidCredit={prepaidCredit => update({ prepaidCredit })}
          selectedParking={booking.selectedParking}
          onSelectParking={selectedParking => update({ selectedParking })}
          selectedCarHire={booking.selectedCarHire}
          onSelectCarHire={selectedCarHire => update({ selectedCarHire })}
          bookingTotal={total}
          onBack={() => onStepChange('bags')}
          onNext={() => onStepChange('review')}
        />;
      }
      case 'review': {
        const { chargeFastTrack } = getBookingPricing(FARE_TIERS[selectedTier], booking, isDarkPattern);
        return <ReviewStep
          {...common}
          key={mode}
          selectedTier={selectedTier}
          selectedSeat={booking.selectedSeat}
          additionalLuggage={booking.additionalLuggage}
          fastTrackSelected={chargeFastTrack}
          insurancePlan={booking.insurancePlan}
          onSelectInsurance={insurancePlan => update({ insurancePlan })}
          prepaidCredit={booking.prepaidCredit}
          selectedParking={booking.selectedParking}
          selectedCarHire={booking.selectedCarHire}
          newsletterOptIn={booking.newsletterOptIn}
          onToggleNewsletter={() => update({ newsletterOptIn: !booking.newsletterOptIn })}
          onBack={() => onStepChange('extras')}
        />;
      }
    }
  };

  return viewMode === 'side-by-side'
    ? <SideBySideView original={renderStep('dark-pattern')} ethical={renderStep('ethical')} />
    : renderStep(viewMode);
}
