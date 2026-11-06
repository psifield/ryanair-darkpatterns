import React, { useState } from 'react';
import { AlertTriangle, Check, ShieldCheck, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { AuditMarker } from './AuditMarker';
import { FastTrackModal } from './FastTrackModal';
import { OUTBOUND_FLIGHT } from '../data/mockData';
import { getSeatPrice, RANDOM_SEAT } from '../data/bookingExtras';
import type { FareTier } from '../types/booking';

const seats = ['15A', '15B', '15C', '16D', '16E', '16F', '18A', '18B', '18C'];

interface SeatsStepProps {
  isDarkPattern: boolean;
  inComparison?: boolean;
  showAuditMarkers: boolean;
  onOpenAuditItem?: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
  fare: FareTier;
  selectedSeat: string;
  onSelectSeat: (seat: string) => void;
  fastTrackSelected?: boolean;
  onToggleFastTrack?: (selected: boolean) => void;
}

export const SeatsStep: React.FC<SeatsStepProps> = ({
  isDarkPattern,
  inComparison = false,
  showAuditMarkers,
  onOpenAuditItem,
  onBack,
  onNext,
  fare,
  selectedSeat,
  onSelectSeat,
  fastTrackSelected = false,
  onToggleFastTrack,
}) => {
  const [showSeatWarning, setShowSeatWarning] = useState(false);
  const [showFastTrackModal, setShowFastTrackModal] = useState(false);
  const suggestedSeat = fare.id === 'REGULAR' ? '18A' : '15A';
  const suggestedSeatPrice = getSeatPrice(fare, suggestedSeat);

  const handleRandomSeat = () => {
    if (isDarkPattern) {
      setShowSeatWarning(true);
    } else {
      onSelectSeat(RANDOM_SEAT);
      onNext();
    }
  };

  const handleContinue = () => {
    if (isDarkPattern) {
      setShowFastTrackModal(true);
    } else {
      onNext();
    }
  };

  return (
    <div className={inComparison ? '@container relative w-full space-y-4' : '@container relative max-w-4xl mx-auto space-y-6 pt-2'}>
      {/* Step Header */}
      <div className={`bg-white rounded-xl border border-gray-200 shadow-xs flex flex-col @min-[28rem]:flex-row @min-[28rem]:items-center justify-between gap-4 ${inComparison ? 'p-3.5' : 'p-5'}`}>
        <div>
          <h2 className={`${inComparison ? 'text-lg' : 'text-2xl'} font-black text-[#073590]`}>Select your seats</h2>
          <p className="text-xs text-gray-500 mt-1">
            Flight {OUTBOUND_FLIGHT.flightNumber} • London Stansted (STN) to Palanga (PLQ)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-2 rounded-lg transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fares</span>
          </button>
        </div>
      </div>

      {/* Dark Pattern Fear Alert vs Ethical Calm Explanation */}
      {isDarkPattern ? (
        <div className="relative">
          {showAuditMarkers && (
            <AuditMarker number={5} auditId="dp-seat-pressure" title="Pressure to Reserve Seats Together" onOpenAuditItem={onOpenAuditItem} />
          )}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 text-xs space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Warning: Do not get separated!</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              If you do not choose a reserved seat now, our system will randomly allocate your seat at check-in.
              Passengers on the same booking are likely to be seated separately across different rows!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-1 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#073590] text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Seat Allocation Policy</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Standard random seat allocation is 100% free when you check in online between 24 and 2 hours before departure.
            Choose a seat below if you prefer to reserve a specific seat.
          </p>
        </div>
      )}

      {/* Interactive Simplified Airplane Cabin Seat Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs text-center space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Cabin layout</h3>

        <div className="max-w-xs mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
          <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Rows 15–18</div>
          {seats.map(seat => {
            const price = getSeatPrice(fare, seat);
            const selected = selectedSeat === seat;
            return (
              <button
                key={seat}
                aria-pressed={selected}
                onClick={() => onSelectSeat(seat)}
                className={`min-h-11 w-full py-2.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selected
                    ? 'bg-[#073590] text-white shadow-xs'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#073590]'
                }`}
              >
                <span>Seat {seat}</span>
                <span>{selected && 'Selected · '}{price > 0 ? `+£${price.toFixed(2)}` : 'Included'}</span>
              </button>
            );
          })}
        </div>

        {/* Free Option or Next */}
        <div className="pt-4 border-t border-gray-200 flex flex-col @min-[40rem]:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRandomSeat}
              className="text-xs font-bold text-[#073590] hover:underline cursor-pointer"
            >
              I'll take a free random seat
            </button>

            {isDarkPattern && (
              <button
                onClick={() => setShowFastTrackModal(true)}
                className="text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-1 rounded transition flex items-center gap-1 cursor-pointer"
                title="Preview post-seats roadblock modal"
              >
                <Zap className="w-3 h-3 text-amber-600" />
                <span>Preview Fast Track Modal</span>
              </button>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="bg-[#073590] hover:bg-[#052973] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition flex items-center gap-2 cursor-pointer"
          >
            <span>Confirm & Continue to Bags</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dark Pattern Seat Roadblock Dialog */}
      {showSeatWarning && isDarkPattern && (
        <div className={`inset-0 z-50 flex justify-center p-4 bg-black/60 backdrop-blur-xs ${inComparison ? 'absolute items-start rounded-xl' : 'fixed items-center'}`}>
          <div role="dialog" aria-label="Confirm seat allocation" className={`bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4 border border-gray-100 ${inComparison ? 'sticky top-44 max-h-[calc(100dvh-12rem)] overflow-y-auto' : ''}`}>
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-black text-gray-900">Are you sure you want to risk it?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                By choosing random allocation, you might be assigned a middle seat in the back of the plane.
                {suggestedSeatPrice > 0
                  ? <> Upgrade to a reserved seat for only <strong className="text-[#073590]">£{suggestedSeatPrice.toFixed(2)}</strong> to travel with peace of mind.</>
                  : ' You can reserve a seat in row 18 with your Regular fare.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onSelectSeat(suggestedSeat);
                  setShowSeatWarning(false);
                  setShowFastTrackModal(true);
                }}
                className="w-full bg-[#f1c40f] hover:bg-yellow-400 text-[#073590] font-black text-xs py-3 rounded-lg transition shadow-xs cursor-pointer"
              >
                Choose Seat {suggestedSeat} {suggestedSeatPrice > 0 ? `for £${suggestedSeatPrice.toFixed(2)}` : '(included)'}
              </button>

              <button
                onClick={() => {
                  onSelectSeat(RANDOM_SEAT);
                  setShowSeatWarning(false);
                  setShowFastTrackModal(true);
                }}
                className="w-full text-xs font-semibold text-gray-500 hover:text-gray-800 py-2 transition cursor-pointer"
              >
                No thanks, I will take the risk with random seating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Seats Roadblock: Fast Track Upsell Modal (image_27e49d5b.png) */}
      <FastTrackModal
        isOpen={showFastTrackModal}
        inComparison={inComparison}
        onClose={() => setShowFastTrackModal(false)}
        onAddFastTrack={() => {
          onToggleFastTrack?.(true);
          setShowFastTrackModal(false);
          onNext();
        }}
        onSkip={() => {
          setShowFastTrackModal(false);
          onNext();
        }}
        isDarkPattern={isDarkPattern}
        showAuditMarkers={showAuditMarkers}
        onOpenAuditItem={onOpenAuditItem}
      />
    </div>
  );
};
