import React from 'react';
import { BagsStep } from './BagsStep';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface SideBySideBagsViewProps {
  additionalLuggage: number;
  onSetAdditionalLuggage: (qty: number) => void;
  onBack: () => void;
  onNext: () => void;
  showAuditMarkers: boolean;
  onOpenAuditItem: (id: string) => void;
}

export const SideBySideBagsView: React.FC<SideBySideBagsViewProps> = ({
  additionalLuggage,
  onSetAdditionalLuggage,
  onBack,
  onNext,
  showAuditMarkers,
  onOpenAuditItem,
}) => {
  return (
    <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 py-4 space-y-4">
      {/* Side-by-Side Context Banner */}
      <div className="bg-blue-900 text-white rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm sm:text-base">
            Side-by-Side Dual Comparison Mode — Baggage Framing & Penalty Urgency
          </span>
          <span className="text-xs text-blue-200">
            Compare gate fee threat framing and visual steering against clear, neutral dimension allowances
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-rose-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            Left: Original Prototype (DP 6 Gate Penalty Urgency)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Right: Ethical Redesign (Transparent Sizing)
          </span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: ORIGINAL DARK PATTERN BAGS                                   */}
        {/* ========================================================================= */}
        <div className="bg-slate-100 rounded-2xl p-3 sm:p-4 border-2 border-rose-300 shadow-sm space-y-4">
          <div className="bg-rose-900 text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="font-bold text-sm">Original Baggage Options (Dark Patterns)</span>
            </div>
            <span className="text-[11px] bg-rose-800 text-rose-200 px-2.5 py-0.5 rounded-full">
              DP 6 · £60 Gate Fine Threat • Asymmetric Steering
            </span>
          </div>

          <BagsStep
            isDarkPattern={true}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
            additionalLuggage={additionalLuggage}
            onSetAdditionalLuggage={onSetAdditionalLuggage}
            onBack={onBack}
            onNext={onNext}
            isSplitView={true}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: ETHICAL REDESIGN BAGS                                       */}
        {/* ========================================================================= */}
        <div className="bg-slate-100 rounded-2xl p-3 sm:p-4 border-2 border-emerald-400 shadow-sm space-y-4">
          <div className="bg-emerald-950 text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm">Ethical Baggage Redesign</span>
            </div>
            <span className="text-[11px] bg-emerald-800 text-emerald-100 px-2.5 py-0.5 rounded-full">
              Neutral Dimensions • Transparent Allowances
            </span>
          </div>

          <BagsStep
            isDarkPattern={false}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
            additionalLuggage={additionalLuggage}
            onSetAdditionalLuggage={onSetAdditionalLuggage}
            onBack={onBack}
            onNext={onNext}
            isSplitView={true}
          />
        </div>
      </div>
    </div>
  );
};
