import React from 'react';
import { FareTierId } from '../types/booking';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

interface FareSelectionEthicalProps {
  onSelectTier: (tier: FareTierId) => void;
  selectedTier: FareTierId;
  onProceedToNextStep: () => void;
  showAuditMarkers?: boolean;
  onOpenAuditItem?: (id: string) => void;
}

export const FareSelectionEthical: React.FC<FareSelectionEthicalProps> = ({
  onSelectTier,
  selectedTier,
  onProceedToNextStep,
  showAuditMarkers = false,
  onOpenAuditItem,
}) => {
  const tiers = [
    {
      id: 'BASIC' as FareTierId,
      name: 'Basic',
      tagline: 'Travel light',
      price: 131.36,
      upgrade: 'Included in base fare (£0 upgrade)',
      features: [
        { text: '1 Small personal bag', subtext: 'Must fit under seat in front (40×20×25 cm)', included: true },
        { text: 'Random seat allocation', subtext: 'Assigned free during check-in', included: false },
        { text: '10kg overhead cabin bag not included', subtext: 'Available as standalone add-on', included: false },
        { text: 'Standard boarding', subtext: 'Board with main group', included: false },
      ],
    },
    {
      id: 'REGULAR' as FareTierId,
      name: 'Regular',
      tagline: 'Cabin Bag & Seat',
      price: 189.86,
      upgrade: '+£58.50 total roundtrip (+£29.25/flight)',
      features: [
        { text: '1 Small personal bag', subtext: 'Fits under seat (40×20×25 cm)', included: true },
        { text: '10kg Overhead cabin bag', subtext: 'With Priority Boarding (55×40×20 cm)', included: true },
        { text: 'Reserved standard seat', subtext: 'Select rows 18–33 included', included: true },
        { text: '20kg check-in bag not included', subtext: '', included: false },
      ],
    },
    {
      id: 'PLUS' as FareTierId,
      name: 'Plus',
      tagline: 'Check-in Bag',
      price: 217.84,
      upgrade: '+£86.48 total roundtrip (+£43.24/flight)',
      features: [
        { text: '1 Small personal bag', subtext: 'Under seat (40×20×25 cm)', included: true },
        { text: '20kg Checked bag', subtext: 'Checked bag drop at airport desk', included: true },
        { text: 'Reserved standard seat', subtext: 'Select preferred standard row', included: true },
        { text: 'Free airport check-in', subtext: 'Check-in at desk or mobile app', included: true },
      ],
    },
    {
      id: 'FLEXI_PLUS' as FareTierId,
      name: 'Flexi Plus',
      tagline: 'Maximum Flexibility',
      price: 320.36,
      upgrade: '+£189.00 total roundtrip (+£94.50/flight)',
      features: [
        { text: '1 Small bag + 10kg overhead cabin bag', subtext: 'Priority boarding included', included: true },
        { text: 'Any reserved seat', subtext: 'Including front rows and extra legroom', included: true },
        { text: 'Fast Track airport security', subtext: 'Speed through security checkpoints', included: true },
        { text: 'Flexible flight date changes', subtext: '+£0 flight change fee', included: true },
      ],
    },
  ];

  return (
    <section className="pt-2" data-purpose="fare-selection-matrix">
      {/* Section Header with Transparency Guarantee */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#073590]">Choose your fare</h2>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Transparent Pricing — What you see is what you pay
              </span>
            </div>
            <p className="text-xs text-gray-600 max-w-3xl leading-relaxed">
              Clear roundtrip bundles with honest inclusions and accurate baggage dimensions. No forced popups,
              no hidden check-in fees, and no manipulative steering.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 text-xs text-gray-700 shrink-0">
            <span className="font-semibold text-gray-600">Base roundtrip:</span>
            <span className="font-black text-[#073590] text-base">£131.36</span>
          </div>
        </div>
      </div>

      {/* 4 Balanced Fare Cards Grid (Image 7 / 9) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;

          return (
            <div
              key={tier.id}
              className={`bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between transition relative shadow-xs ${
                isSelected
                  ? 'border-2 border-[#073590] shadow-md ring-1 ring-blue-100'
                  : 'border border-gray-200 hover:border-gray-300'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 left-4 bg-[#073590] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                  Currently Selected
                </div>
              )}

              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{tier.name}</h3>
                    <span className="text-xs font-semibold text-gray-500">{tier.tagline}</span>
                  </div>
                </div>

                <div className="my-2.5">
                  <div className="text-2xl font-black text-gray-900 leading-none">
                    £{tier.price.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-1 font-medium">{tier.upgrade}</div>
                </div>

                <ul className="space-y-2.5 text-xs border-t border-gray-100 pt-3 text-gray-700 mt-3">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      {feat.included ? (
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0 mt-0.5" />
                      ) : (
                        <span className="text-gray-300 font-bold shrink-0 mt-0.5 w-4 text-center">—</span>
                      )}
                      <div>
                        <span className={`font-medium ${feat.included ? 'text-gray-900' : 'text-gray-400'}`}>
                          {feat.text}
                        </span>
                        {feat.subtext && (
                          <span className="block text-[11px] text-gray-500">{feat.subtext}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#073590] text-white shadow-xs'
                      : 'border-2 border-[#073590] text-[#073590] hover:bg-[#073590] hover:text-white'
                  }`}
                >
                  {isSelected
                    ? `Selected (Total £${tier.price.toFixed(2)})`
                    : `Select ${tier.name} (£${tier.price.toFixed(2)})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Neutral Inclusions Comparison Matrix */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs mt-6 mb-20">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#073590]">Complete Inclusions Comparison</h3>
            <span className="text-xs text-gray-500 hidden sm:inline">• Transparent side-by-side view</span>
          </div>
          <span className="text-xs text-gray-500">Prices include all mandatory taxes & charges</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[620px]">
            <div className="grid grid-cols-5 text-xs font-bold text-gray-700 bg-gray-100/70 p-3 border-b border-gray-200">
              <div>Features & Bags</div>
              <div className="text-center font-bold text-gray-900">Basic (£131.36)</div>
              <div className="text-center text-[#073590]">Regular (£189.86)</div>
              <div className="text-center text-[#073590]">Plus (£217.84)</div>
              <div className="text-center text-[#073590]">Flexi Plus (£320.36)</div>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">Under-seat personal bag (40×20×25cm)</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">10kg Overhead locker cabin bag (55×40×20cm)</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">Priority Boarding</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">20kg Checked-in luggage</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
                <span className="text-center text-gray-400 font-medium">—</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">Seat Reservation</span>
                <span className="text-center text-gray-500">Random at check-in</span>
                <span className="text-center text-emerald-600 font-semibold">Standard row 18–33</span>
                <span className="text-center text-emerald-600 font-semibold">Standard row 18–33</span>
                <span className="text-center text-emerald-600 font-bold">✓ Any seat choice</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">Airport Security Fast Track</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-gray-400 font-medium">—</span>
                <span className="text-center text-emerald-600 font-bold">✓ Included</span>
              </div>

              <div className="grid grid-cols-5 items-center p-3 hover:bg-gray-50/60">
                <span className="text-gray-800 font-medium">Flight Change Flexibility</span>
                <span className="text-center text-gray-500">Standard terms</span>
                <span className="text-center text-gray-500">Standard terms</span>
                <span className="text-center text-gray-500">Standard terms</span>
                <span className="text-center text-emerald-600 font-bold">✓ Free flight change</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Clear Summary Bar (Sticky Bottom from Image 9) */}
      <aside className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-300 shadow-2xl z-40 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wide">
                Total Price:
              </span>
              <span className="text-2xl font-black text-[#073590] leading-none">
                £{tiers.find((t) => t.id === selectedTier)?.price.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              <span className="font-semibold text-gray-800">
                {tiers.find((t) => t.id === selectedTier)?.name} fare
              </span>{' '}
              selected for 1 passenger, roundtrip
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span
              onClick={() =>
                alert(
                  'Baggage allowance summary:\n• Personal bag: 40×20×25cm (Free under seat)\n• 10kg cabin bag: 55×40×20cm (Priority)\n• 20kg checked bag (Check-in desk)\nAll fares guaranteed without hidden booking fees.'
                )
              }
              className="text-xs text-[#073590] font-semibold underline hover:text-[#052973] cursor-pointer"
            >
              Review baggage allowances & fare rules
            </span>

            <button
              onClick={onProceedToNextStep}
              className="bg-[#073590] hover:bg-[#052973] text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-sm transition whitespace-nowrap flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Seats & Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};
