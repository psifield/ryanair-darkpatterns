import React from 'react';
import { FareTierId } from '../types/booking';
import { FARE_TIERS } from '../data/mockData';
import { Check, X, Briefcase, Star, Info } from 'lucide-react';
import { AuditMarker } from './AuditMarker';

interface FareSelectionDarkProps {
  onSelectTier: (tier: FareTierId) => void;
  selectedTier: FareTierId;
  showUpsellModal: boolean;
  onOpenUpsellModal: () => void;
  onCloseUpsellModal: () => void;
  onConfirmBasic: () => void;
  onSwitchToRegular: () => void;
  showAuditMarkers?: boolean;
  onOpenAuditItem?: (id: string) => void;
}

export const FareSelectionDark: React.FC<FareSelectionDarkProps> = ({
  onSelectTier,
  selectedTier,
  showUpsellModal,
  onOpenUpsellModal,
  onCloseUpsellModal,
  onConfirmBasic,
  onSwitchToRegular,
  showAuditMarkers = false,
  onOpenAuditItem,
}) => {
  return (
    <section className="pt-2" data-purpose="fare-selection-matrix">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-[#073590]">Choose your fare</h2>
            {showAuditMarkers && (
              <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                Original Fare-choice Prototype
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 italic mt-0.5">
            * The selected fare type applies to all passengers for all flights
          </p>
        </div>

        {/* Basic Quick-Continue Banner */}
        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 bg-white border border-gray-200 rounded-lg p-2.5 px-4 shadow-xs relative">
          <div className="text-left">
            <span className="text-sm font-black tracking-wide text-gray-800">BASIC</span>
            <span className="block text-[11px] text-gray-400 italic">Travel light</span>
          </div>

          <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
            <Briefcase className="w-5 h-5 text-[#073590]" />
            <div className="text-[11px] leading-tight text-gray-600">
              <span className="font-bold block">1 small bag</span>
              <span className="text-[10px] text-gray-400">Must fit under the seat in front</span>
            </div>
          </div>

          <div className={`relative ml-auto ${showAuditMarkers ? 'mt-5' : ''}`}>
            <button
              onClick={onOpenUpsellModal}
              className="text-xs font-bold text-[#073590] border border-[#073590] hover:bg-blue-50 px-3 py-2 rounded transition whitespace-nowrap cursor-pointer"
            >
              Continue with basic for £131.36
            </button>
            {showAuditMarkers && (
              <AuditMarker
                number={4}
                auditId="dp-roadblock-confirmshame"
                title="Audit Candidate: Basic Upsell Prompt"
                onOpenAuditItem={onOpenAuditItem}
              />
            )}
          </div>
        </div>
      </div>

      {/* Keep the ribbon and its audit marker inside the horizontal scroller's clip. */}
      <div className={`overflow-x-auto pb-4 ${showAuditMarkers ? 'pt-8' : 'pt-4'}`}>
        <div className="min-w-[760px] bg-white rounded-lg border border-gray-200 shadow-xs">
          {/* Table Header: Columns for Features + 3 Bundles */}
          <div className="grid grid-cols-4 border-b border-gray-200">
            {/* Left Header Blank / Features Title */}
            <div className="p-4 flex flex-col justify-end">
              <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Features included
              </span>
            </div>

            {/* REGULAR TIER */}
            <div className={`p-3 text-center border-l border-gray-200 flex flex-col justify-between relative ${
              selectedTier === 'REGULAR' ? 'bg-blue-50/30' : ''
            }`}>
              <div>
                <img
                  alt="Regular bag feature"
                  className="w-full h-24 object-cover rounded mb-2"
                  src={FARE_TIERS.REGULAR.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-extrabold text-lg text-gray-900 uppercase">REGULAR</h3>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  Choose your seat and 10kg bag on board
                </p>
              </div>

              <div className={`relative ${showAuditMarkers ? 'mt-5' : 'mt-4'}`}>
                {showAuditMarkers && (
                  <AuditMarker
                    number={2}
                    auditId="dp-drip-pricing"
                    title="Audit Candidate: Per-flight Price Framing"
                    onOpenAuditItem={onOpenAuditItem}
                  />
                )}
                <button
                  onClick={() => onSelectTier('REGULAR')}
                  className="w-full bg-[#073590] hover:bg-blue-900 text-white font-bold py-2.5 px-2 rounded text-xs transition cursor-pointer"
                >
                  <span className="block text-sm font-black">+£29.25</span>
                  <span className="text-[10px] font-normal opacity-90">on each flight</span>
                </button>
              </div>
            </div>

            {/* PLUS TIER (Aggressively Highlighted Dark Pattern Steering) */}
            <div className={`relative p-3 text-center border-l-2 border-r-2 border-[#f1c40f] bg-yellow-50/30 flex flex-col justify-between ${
              selectedTier === 'PLUS' ? 'ring-2 ring-yellow-400' : ''
            }`}>
              {/* Top Ribbon Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f1c40f] text-[#073590] font-black text-[10px] px-3 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1 shadow-xs whitespace-nowrap">
                <Star className="w-3 h-3 fill-[#073590]" />
                <span>IDEAL FOR YOUR TRIP TO PALANGA</span>

                {showAuditMarkers && (
                  <AuditMarker
                    number={3}
                    auditId="dp-visual-steering"
                    title="Audit Candidate: Unequal Visual Presentation"
                    onOpenAuditItem={onOpenAuditItem}
                  />
                )}
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-gray-800 bg-yellow-100/90 p-2 rounded mb-2 border border-yellow-200">
                  <span className="font-bold">PLUS</span> is the only bundle with a{' '}
                  <span className="font-bold text-gray-900">20kg checked-in bag</span> included
                </div>

                <img
                  alt="Plus 20kg suitcase"
                  className="w-full h-24 object-cover rounded mb-2"
                  src={FARE_TIERS.PLUS.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-extrabold text-lg text-[#073590] uppercase">PLUS</h3>
                <p className="text-xs text-gray-500 italic mt-0.5">
                  Choose your seat and a 20kg checked in bag
                </p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => onSelectTier('PLUS')}
                  className="w-full bg-[#f1c40f] hover:bg-[#f4b800] text-[#073590] font-black py-2.5 px-2 rounded text-xs transition shadow-xs cursor-pointer"
                >
                  <span className="block text-sm font-black">+£43.24</span>
                  <span className="text-[10px] font-medium opacity-90">on each flight</span>
                </button>
              </div>
            </div>

            {/* FLEXI PLUS TIER */}
            <div className={`p-3 text-center border-l border-gray-200 rounded-tr-lg flex flex-col justify-between ${
              selectedTier === 'FLEXI_PLUS' ? 'bg-blue-50/30' : ''
            }`}>
              <div>
                <img
                  alt="Flexi Plus Traveler"
                  className="w-full h-24 object-cover rounded mb-2"
                  src={FARE_TIERS.FLEXI_PLUS.imageUrl}
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-extrabold text-lg text-gray-900 uppercase">FLEXI PLUS</h3>
                <p className="text-xs text-gray-500 italic mt-0.5">Our most flexible bundle</p>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => onSelectTier('FLEXI_PLUS')}
                  className="w-full bg-[#073590] hover:bg-blue-900 text-white font-bold py-2.5 px-2 rounded text-xs transition cursor-pointer"
                >
                  <span className="block text-sm font-black">+£94.50</span>
                  <span className="text-[10px] font-normal opacity-90">on each flight</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feature Matrix Rows */}
          <div className="divide-y divide-gray-100 text-xs rounded-b-lg overflow-hidden">
            {/* Row 1: 1 Small Bag */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span>1 small bag</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
            </div>

            {/* Row 2: Reserved Seat */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <span className="text-gray-600 font-bold">💺</span>
                <span>Reserved seat</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
                <span className="block text-[10px] text-gray-400">Specific rows</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-blue-700 font-bold text-base">✔</span>
                <span className="block text-[10px] text-gray-400">Specific rows</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
                <span className="block text-[10px] text-gray-400">Any seat</span>
              </div>
            </div>

            {/* Row 3: Priority Boarding */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <span className="text-gray-600 font-bold">⚡</span>
                <span>Priority boarding</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-gray-300 font-bold">-</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
            </div>

            {/* Row 4: 10kg Overhead Locker Bag */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span>10kg overhead locker bag</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-gray-300 font-bold">-</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
            </div>

            {/* Row 5: 20kg Check-in Bag */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <Briefcase className="w-4 h-4 text-gray-600" />
                <span>20kg check-in bag</span>
              </div>
              <div className="text-center">
                <span className="text-gray-300 font-bold">-</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
              <div className="text-center">
                <span className="text-gray-300 font-bold">-</span>
              </div>
            </div>

            {/* Row 6: Fast Track Security */}
            <div className="grid grid-cols-4 items-center py-3.5 px-4 hover:bg-gray-50/50">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                <span className="text-gray-600 font-bold">🛡️</span>
                <span>Fast Track Security</span>
              </div>
              <div className="text-center">
                <span className="text-gray-300 font-bold">-</span>
              </div>
              <div className="text-center border-x-2 border-[#f1c40f] bg-yellow-50/20">
                <span className="text-gray-300 font-bold">-</span>
              </div>
              <div className="text-center">
                <span className="text-blue-700 font-bold text-base">✔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AUTHENTIC CONFIRMSHAMING ROADBLOCK MODAL (Image 2)                       */}
      {/* ========================================================================= */}
      {showUpsellModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Close Button */}
            <button
              onClick={onCloseUpsellModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition z-20 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Modal Header */}
            <div className="p-6 text-center pb-2">
              <div className={`relative inline-block mb-1 ${showAuditMarkers ? 'mt-5' : ''}`}>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                  REGULAR is ideal for your trip!
                </h3>
                {showAuditMarkers && (
                  <AuditMarker
                    number={4}
                    auditId="dp-roadblock-confirmshame"
                    title="Audit Candidate: Basic Upsell Prompt"
                    label="Upsell prompt"
                    align="left"
                    onOpenAuditItem={onOpenAuditItem}
                  />
                )}
              </div>
              <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
                Basic does not include a 10kg overhead locker bag, priority boarding or seat selection.
                Upgrade to Regular for only{' '}
                <strong className="text-[#073590] font-black">£29.25 more</strong> per person on each flight.
              </p>
            </div>

            {/* Side-by-side comparison cards */}
            <div className="p-4 sm:p-6 pt-2">
              <div className="grid grid-cols-2 gap-3 items-stretch">
                {/* Left Card: Basic (Demoted Option with Red X's) */}
                <div className="border border-gray-200 rounded-lg p-3 flex flex-col justify-between bg-gray-50/70">
                  <div>
                    <img
                      alt="Basic underseat"
                      className="w-full h-20 object-cover rounded mb-2 opacity-80"
                      src={FARE_TIERS.BASIC.imageUrl}
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="font-extrabold text-sm text-center text-gray-800">BASIC</h4>
                    <p className="text-[10px] text-gray-400 italic text-center mb-3">Travel light</p>

                    {/* Comparison bullet points with Red ✖ */}
                    <div className="space-y-2.5 text-[11px] pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">1 small bag</span>
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Reserved seat</span>
                        <X className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Priority boarding</span>
                        <X className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">10kg overhead bag</span>
                        <X className="w-3.5 h-3.5 text-red-500 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                    <span className="block text-sm font-black text-gray-800">£131.36</span>
                    <span className="text-[10px] text-gray-400 block mb-2">Total price</span>
                    <button
                      onClick={onConfirmBasic}
                      className="w-full border border-gray-300 hover:bg-gray-100 text-gray-600 text-xs font-semibold py-2 px-1 rounded transition cursor-pointer"
                    >
                      Continue with Basic
                    </button>
                  </div>
                </div>

                {/* Right Card: Regular (Highlighted Upsell with Yellow CTA) */}
                <div className="border-2 border-[#073590] rounded-lg p-3 flex flex-col justify-between bg-white relative shadow-md">
                  {/* Recommended Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#073590] text-white font-extrabold text-[10px] px-3 py-0.5 rounded uppercase tracking-wider whitespace-nowrap">
                    Recommended
                  </div>

                  <div>
                    <img
                      alt="Regular luggage"
                      className="w-full h-20 object-cover rounded mb-2 mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9GToozmkWOQKCiOYyKkki-qrJx9ISfZTdeZTog_fVm2mJSl9UepSAEcXqbrpgy9A3n9_YnHy4ucG3kFAbyPtQhj51gQ_hAoSRMl0vCV9NEiquXAWpuP664_834GD430SsUMDqa1GAbBwlQVUM66Jf8Noo9ptOaPZI5XYwVmBTBlpKL5Q7NZVKFvjKNll6UpoTkeMyNy9COvBql1EpzMJHn_qPjOgl2g4cpRn0igw8CZMewseWgRk"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="font-black text-sm text-center text-[#073590]">REGULAR</h4>
                    <p className="text-[10px] text-gray-500 italic text-center mb-3">
                      Choose your seat & 10kg bag
                    </p>

                    <div className="space-y-2.5 text-[11px] pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">1 small bag</span>
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Reserved seat</span>
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Priority boarding</span>
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">10kg overhead bag</span>
                        <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                    <span className="block text-xs font-extrabold text-[#073590]">
                      just £29.25 more
                    </span>
                    <span className="text-[10px] text-gray-400 block mb-2">on each flight</span>
                    <button
                      onClick={onSwitchToRegular}
                      className="w-full bg-[#f1c40f] hover:bg-yellow-400 text-[#073590] font-black text-xs py-2 px-1 rounded shadow-xs transition cursor-pointer"
                    >
                      Switch to Regular
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
