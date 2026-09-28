import React from 'react';
import { Briefcase, AlertTriangle, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface BagsStepProps {
  isDarkPattern: boolean;
  onBack: () => void;
  onNext: () => void;
  additionalLuggage: number;
  onSetAdditionalLuggage: (qty: number) => void;
}

export const BagsStep: React.FC<BagsStepProps> = ({
  isDarkPattern,
  onBack,
  onNext,
  additionalLuggage,
  onSetAdditionalLuggage,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-4">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#073590]">Baggage Options</h2>
          <p className="text-xs text-gray-500 mt-1">Review your cabin and hold luggage allowances</p>
        </div>

        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 px-3 py-2 rounded-lg transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Seats</span>
        </button>
      </div>

      {isDarkPattern ? (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-xs space-y-1 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Avoid Up to £60 Gate Fee!</span>
          </div>
          <p className="text-rose-950 leading-relaxed">
            Oversized or non-compliant bags discovered at the gate will incur an immediate penalty charge of up to £60.00 per item! Add a 10kg overhead bag now to ensure boarding without hassle.
          </p>
        </div>
      ) : (
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-1 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-[#073590] text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Honest Baggage Allowances</span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Every passenger is entitled to 1 small personal underseat bag (40×20×25 cm) included in their base fare.
            Review the exact measurements below before deciding if you require additional baggage.
          </p>
        </div>
      )}

      {/* Luggage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Small Personal Bag */}
        <div className="bg-white rounded-xl border-2 border-emerald-600/70 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-extrabold text-sm text-gray-900">1 Small Personal Bag</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Included Free
              </span>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxe_uuU5jYdtTogzFxca9GllGJ3VxNiLtJ_ErxiODLYvKUKnhMrl5JJn-dqJRNT37vehL5WoESLexnELMzVmP8-2v8FnC9aMw37p6UtPDYrWp9yUt7h1k517ucIcj6NLtPhXNI0LZgesPJYf_Usys8rYDULif4eeK7mLrhQ6zFldDR3Jff9A99o-3KfnyI0WAtmBC-97WgQ2llEUlizxGs_73HNgLuF53bafgF0qJDYNb_W6FS-Z8"
              alt="Small bag"
              className="w-full h-32 object-cover rounded-lg mb-3"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs text-gray-600 leading-relaxed">
              Dimensions: <strong>40 × 20 × 25 cm</strong>. Must fit under the airplane passenger seat in front of you. Perfect for laptops, handbags, and small backpacks.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center font-bold text-xs text-emerald-700">
            ✓ Confirmed with your ticket
          </div>
        </div>

        {/* 10kg Overhead Locker Bag */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-extrabold text-sm text-gray-900">10kg Overhead Cabin Bag</span>
              <span className="text-xs font-bold text-[#073590]">+£15.00 / flight</span>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD16_BaFgiIp5TWAhwoqh1u_5k8ZLTnZjlF3Y8oCK15VxjvQTYU8ydFrug_t9uYTbRuDhO08oTKpJ11DEf2_602UbYZpFSmoqEkSoggvh_qfk_i_ZP3pmzBpzM8x7cqfZPGexwG1d6gSne8iQbYtcuKdF_Q6aknAfYma9uCvr1uoYZV03-jjXMsVJCW95LSVTvAKDZhPw32vpBkcEHdh-ZICEmlsEScGYbBhe9lZ6Lug9acNWY6BxY"
              alt="10kg cabin bag"
              className="w-full h-32 object-cover rounded-lg mb-3"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs text-gray-600 leading-relaxed">
              Dimensions: <strong>55 × 40 × 20 cm</strong>. Stowed in overhead locker + Priority Boarding included.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">Add to booking:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSetAdditionalLuggage(Math.max(0, additionalLuggage - 1))}
                className="w-7 h-7 rounded border border-gray-300 font-bold flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="font-bold text-sm w-4 text-center">{additionalLuggage}</span>
              <button
                onClick={() => onSetAdditionalLuggage(additionalLuggage + 1)}
                className="w-7 h-7 rounded bg-[#073590] text-white font-bold flex items-center justify-center hover:bg-[#052973]"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#073590] hover:bg-[#052973] text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Review & Pay</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
