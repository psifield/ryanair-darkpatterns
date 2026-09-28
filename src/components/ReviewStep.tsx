import React, { useState } from 'react';
import { FareTierId } from '../types/booking';
import { FARE_TIERS } from '../data/mockData';
import { ArrowLeft, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ReviewStepProps {
  isDarkPattern: boolean;
  selectedTier: FareTierId;
  selectedSeat: string;
  additionalLuggage: number;
  newsletterOptIn: boolean;
  onToggleNewsletter: () => void;
  onBack: () => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  isDarkPattern,
  selectedTier,
  selectedSeat,
  additionalLuggage,
  newsletterOptIn,
  onToggleNewsletter,
  onBack,
}) => {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [insuranceOptIn, setInsuranceOptIn] = useState(isDarkPattern); // pre-checked in dark pattern!

  const tier = FARE_TIERS[selectedTier] || FARE_TIERS.BASIC;
  const seatCost = selectedSeat.startsWith('15') || selectedSeat.startsWith('16') ? 8.0 : 0.0;
  const luggageCost = additionalLuggage * 30.0; // £15 each flight
  const insuranceCost = insuranceOptIn ? 14.5 : 0.0;

  const grandTotal = tier.totalPrice + seatCost + luggageCost + insuranceCost;

  if (bookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-5 shadow-sm mt-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Booking Confirmed!</h2>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Reference: <span className="font-mono font-bold text-gray-900">RYN-847291</span> • London Stansted (STN) ⇄ Palanga (PLQ)
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Fare Bundle:</span>
            <span className="font-bold">{tier.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Seat:</span>
            <span className="font-bold">{selectedSeat || 'Random free'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Paid:</span>
            <span className="font-black text-[#073590] text-sm">£{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => setBookingConfirmed(false)}
          className="bg-[#073590] hover:bg-[#052973] text-white font-bold text-xs px-6 py-2.5 rounded-lg transition cursor-pointer"
        >
          Reset Simulation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#073590]">Review & Pay</h2>
          <p className="text-xs text-gray-500 mt-1">Review your final itemized breakdown</p>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-2 rounded-lg transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bags</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Flight Summary & Addons */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900 border-b pb-2">Selected Flights</h3>

            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center py-1">
                <div>
                  <div className="font-bold text-gray-800">London Stansted (STN) → Palanga (PLQ)</div>
                  <div className="text-[11px] text-gray-500">Sun, 04 Oct • FR 286 • 17:20 - 21:45</div>
                </div>
                <span className="font-bold text-gray-800">£51.99</span>
              </div>

              <div className="flex justify-between items-center py-1 border-t border-gray-100 pt-2">
                <div>
                  <div className="font-bold text-gray-800">Palanga (PLQ) → London Stansted (STN)</div>
                  <div className="text-[11px] text-gray-500">Thu, 08 Oct • FR 285 • 15:50 - 16:20</div>
                </div>
                <span className="font-bold text-gray-800">£79.37</span>
              </div>
            </div>
          </div>

          {/* Travel Insurance Add-on (Dark Pattern Pre-check demo) */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900">Travel Protection Insurance</h3>
              {isDarkPattern && (
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">
                  Dark Pattern: Pre-selected Opt-in
                </span>
              )}
            </div>

            <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={insuranceOptIn}
                onChange={(e) => setInsuranceOptIn(e.target.checked)}
                className="mt-0.5 rounded text-[#073590] focus:ring-[#073590]"
              />
              <div>
                <span className="font-bold text-gray-800 block">
                  Add Comprehensive Medical & Trip Cancellation Cover (+£14.50)
                </span>
                <span className="text-gray-500 text-[11px] block mt-0.5">
                  Protects against unexpected illness, medical repatriation, and flight delays.
                </span>
              </div>
            </label>
          </div>

          {/* Marketing Opt-in */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs space-y-2">
            <h3 className="font-bold text-sm text-gray-900">Communication Preferences</h3>
            <label className="flex items-start gap-3 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={newsletterOptIn}
                onChange={onToggleNewsletter}
                className="mt-0.5 rounded text-[#073590] focus:ring-[#073590]"
              />
              <span>
                Send me promotional emails about flash sales, route launches, and discounted car hire.
              </span>
            </label>
          </div>
        </div>

        {/* Right Col: Price Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs h-fit space-y-4">
          <h3 className="font-bold text-sm text-gray-900 border-b pb-2">Price Breakdown</h3>

          <div className="space-y-2 text-xs divide-y divide-gray-100">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Base Flights (Return):</span>
              <span className="font-semibold">£131.36</span>
            </div>

            <div className="flex justify-between py-1 pt-2">
              <span className="text-gray-600">{tier.name} Bundle Upgrade:</span>
              <span className="font-semibold">+£{tier.roundtripSurcharge.toFixed(2)}</span>
            </div>

            {seatCost > 0 && (
              <div className="flex justify-between py-1 pt-2">
                <span className="text-gray-600">Seat Reservation ({selectedSeat}):</span>
                <span className="font-semibold">+£{seatCost.toFixed(2)}</span>
              </div>
            )}

            {luggageCost > 0 && (
              <div className="flex justify-between py-1 pt-2">
                <span className="text-gray-600">Extra Overhead Bags ({additionalLuggage}):</span>
                <span className="font-semibold">+£{luggageCost.toFixed(2)}</span>
              </div>
            )}

            {insuranceOptIn && (
              <div className="flex justify-between py-1 pt-2">
                <span className="text-gray-600">Travel Insurance:</span>
                <span className="font-semibold">+£{insuranceCost.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 text-base">
              <span className="font-black text-gray-900">Total:</span>
              <span className="font-black text-[#073590] text-xl">£{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setBookingConfirmed(true)}
            className="w-full bg-[#f1c40f] hover:bg-yellow-400 text-[#073590] font-black text-sm py-3 rounded-lg shadow-sm transition cursor-pointer"
          >
            Pay £{grandTotal.toFixed(2)} & Confirm
          </button>

          <p className="text-[10px] text-gray-400 text-center">
            By confirming, you agree to terms & conditions and passenger rights notices.
          </p>
        </div>
      </div>
    </div>
  );
};
