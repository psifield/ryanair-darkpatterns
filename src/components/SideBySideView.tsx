import React from 'react';
import { FlightLeg, FareTierId } from '../types/booking';
import { FlightSelection } from './FlightSelection';
import { FareSelectionDark } from './FareSelectionDark';
import { FareSelectionEthical } from './FareSelectionEthical';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface SideBySideViewProps {
  outboundFlight: FlightLeg;
  inboundFlight: FlightLeg;
  outboundSelected: boolean;
  inboundSelected: boolean;
  selectedOutboundDate: string;
  selectedInboundDate: string;
  onSelectOutboundDate: (date: string) => void;
  onSelectInboundDate: (date: string) => void;
  onToggleOutbound: () => void;
  onToggleInbound: () => void;
  onResetFlights: () => void;
  selectedTier: FareTierId;
  onSelectTier: (tier: FareTierId) => void;
  showUpsellModal: boolean;
  onOpenUpsellModal: () => void;
  onCloseUpsellModal: () => void;
  onConfirmBasic: () => void;
  onSwitchToRegular: () => void;
  onProceedToNextStep: () => void;
  showAuditMarkers: boolean;
  onOpenAuditItem: (id: string) => void;
}

export const SideBySideView: React.FC<SideBySideViewProps> = ({
  outboundFlight,
  inboundFlight,
  outboundSelected,
  inboundSelected,
  selectedOutboundDate,
  selectedInboundDate,
  onSelectOutboundDate,
  onSelectInboundDate,
  onToggleOutbound,
  onToggleInbound,
  onResetFlights,
  selectedTier,
  onSelectTier,
  showUpsellModal,
  onOpenUpsellModal,
  onCloseUpsellModal,
  onConfirmBasic,
  onSwitchToRegular,
  onProceedToNextStep,
  showAuditMarkers,
  onOpenAuditItem,
}) => {
  return (
    <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 py-4 space-y-4">
      {/* Side-by-Side Context Banner */}
      <div className="bg-blue-900 text-white rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm sm:text-base">
            Side-by-Side Dual Comparison Mode
          </span>
          <span className="text-xs text-blue-200">
            Compare reconstructed fare choices; behavioural effects remain untested
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-rose-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            Left: Original Prototype
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Right: Existing B Prototype
          </span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: ORIGINAL DARK PATTERN UI                                     */}
        {/* ========================================================================= */}
        <div className="bg-slate-100 rounded-2xl p-3 sm:p-4 border-2 border-rose-300 shadow-sm space-y-4">
          <div className="bg-rose-900 text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="font-bold text-sm">Original Fare-choice Prototype</span>
            </div>
            <span className="text-[11px] bg-rose-800 text-rose-200 px-2.5 py-0.5 rounded-full">
              Price Framing • Upsell Candidates
            </span>
          </div>

          {/* Flight selection in dark mode */}
          <FlightSelection
            outboundFlight={outboundFlight}
            inboundFlight={inboundFlight}
            outboundSelected={outboundSelected}
            inboundSelected={inboundSelected}
            selectedOutboundDate={selectedOutboundDate}
            selectedInboundDate={selectedInboundDate}
            onSelectOutboundDate={onSelectOutboundDate}
            onSelectInboundDate={onSelectInboundDate}
            onToggleOutbound={onToggleOutbound}
            onToggleInbound={onToggleInbound}
            onResetFlights={onResetFlights}
            isDarkPattern={true}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
          />

          {/* Fare selection in dark mode */}
          <FareSelectionDark
            onSelectTier={onSelectTier}
            selectedTier={selectedTier}
            showUpsellModal={showUpsellModal}
            onOpenUpsellModal={onOpenUpsellModal}
            onCloseUpsellModal={onCloseUpsellModal}
            onConfirmBasic={onConfirmBasic}
            onSwitchToRegular={onSwitchToRegular}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
          />
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: ETHICAL REDESIGN                                            */}
        {/* ========================================================================= */}
        <div className="bg-slate-100 rounded-2xl p-3 sm:p-4 border-2 border-emerald-400 shadow-sm space-y-4">
          <div className="bg-emerald-950 text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm">Existing Ethical Redesign (Untested)</span>
            </div>
            <span className="text-[11px] bg-emerald-800 text-emerald-100 px-2.5 py-0.5 rounded-full">
              Whole-trip Prices • Direct Selection
            </span>
          </div>

          {/* Flight selection in ethical mode */}
          <FlightSelection
            outboundFlight={outboundFlight}
            inboundFlight={inboundFlight}
            outboundSelected={outboundSelected}
            inboundSelected={inboundSelected}
            selectedOutboundDate={selectedOutboundDate}
            selectedInboundDate={selectedInboundDate}
            onSelectOutboundDate={onSelectOutboundDate}
            onSelectInboundDate={onSelectInboundDate}
            onToggleOutbound={onToggleOutbound}
            onToggleInbound={onToggleInbound}
            onResetFlights={onResetFlights}
            isDarkPattern={false}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
          />

          {/* Fare selection in ethical mode */}
          <FareSelectionEthical
            onSelectTier={onSelectTier}
            selectedTier={selectedTier}
            onProceedToNextStep={onProceedToNextStep}
            showAuditMarkers={showAuditMarkers}
            onOpenAuditItem={onOpenAuditItem}
          />
        </div>
      </div>
    </div>
  );
};
