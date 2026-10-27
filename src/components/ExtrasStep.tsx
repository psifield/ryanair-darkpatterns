import React, { useState } from 'react';
import {
  ShieldCheck,
  Shield,
  Zap,
  HelpCircle,
  Check,
  Plane,
  X,
  CreditCard,
  Heart,
  Briefcase,
  AlertOctagon,
  Calendar,
  Smartphone,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Car,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Fuel,
  Key,
  ShieldAlert
} from 'lucide-react';
import { AuditMarker } from './AuditMarker';

export type InsurancePlan = 'none' | 'standard' | 'plus' | 'annual';
export type ParkingOption = 'none' | 'short-stay' | 'meet-greet' | 'long-stay';
export type CarHireOption = 'none' | 'economy' | 'suv' | 'estate';

interface ExtrasStepProps {
  isDarkPattern: boolean;
  showAuditMarkers: boolean;
  onOpenAuditItem?: (id: string) => void;
  fastTrackSelected: boolean;
  onToggleFastTrack: (enabled: boolean) => void;
  insurancePlan: InsurancePlan;
  onSelectInsurance: (plan: InsurancePlan) => void;
  prepaidCredit: number; // in £, e.g. 0, 5, 10, 15, 20
  onSelectPrepaidCredit: (amount: number) => void;
  selectedParking?: ParkingOption;
  onSelectParking?: (parking: ParkingOption) => void;
  selectedCarHire?: CarHireOption;
  onSelectCarHire?: (car: CarHireOption) => void;
  onBack: () => void;
  onNext: () => void;
}

export const ExtrasStep: React.FC<ExtrasStepProps> = ({
  isDarkPattern,
  showAuditMarkers,
  onOpenAuditItem,
  fastTrackSelected,
  onToggleFastTrack,
  insurancePlan,
  onSelectInsurance,
  prepaidCredit,
  onSelectPrepaidCredit,
  selectedParking = 'none',
  onSelectParking,
  selectedCarHire = 'none',
  onSelectCarHire,
  onBack,
  onNext,
}) => {
  // Local UI state
  const [activeSubStep, setActiveSubStep] = useState<'all' | 'airport' | 'transport'>('all');
  const [passengerAccordionOpen, setPassengerAccordionOpen] = useState(false);
  const [showPrepaidSelector, setShowPrepaidSelector] = useState(false);
  const [activeCaptureModal, setActiveCaptureModal] = useState<string | null>(null);
  const [viewOriginalScreenshots, setViewOriginalScreenshots] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-2 pb-12">
      {/* Top Header & Sub-step Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-xs">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#073590] tracking-tight">
            The best deals for your trip
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Airport services, travel protection, and on-board credit for flight FR 286
          </p>
        </div>

        {/* Ryanair Sub-Step Indicator & Capture Gallery Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold bg-gray-50 border border-gray-200 p-1 rounded-full">
            <button
              onClick={() => setActiveSubStep('airport')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition cursor-pointer ${
                activeSubStep === 'airport'
                  ? 'bg-[#073590] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeSubStep === 'airport' ? 'bg-[#f1c40f] text-[#073590]' : 'border border-gray-300'
              }`}>
                1
              </span>
              <span>Airport & trip</span>
            </button>

            <span className="text-gray-300">•</span>

            <button
              onClick={() => setActiveSubStep('transport')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition cursor-pointer ${
                activeSubStep === 'transport'
                  ? 'bg-[#073590] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                activeSubStep === 'transport' ? 'bg-[#f1c40f] text-[#073590]' : 'border border-gray-300'
              }`}>
                2
              </span>
              <span>Transport & Parking</span>
            </button>

            <span className="text-gray-300">•</span>

            <button
              onClick={() => setActiveSubStep('all')}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeSubStep === 'all'
                  ? 'bg-[#f1c40f] text-[#073590] font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              View All
            </button>
          </div>

          <button
            onClick={() => setViewOriginalScreenshots(!viewOriginalScreenshots)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#073590] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-lg transition cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-[#073590]" />
            <span>{viewOriginalScreenshots ? 'Hide Real-Site Captures' : 'View Real Captures'}</span>
          </button>
        </div>
      </div>

      {/* Real-Site Screenshots Showcase Banner */}
      {viewOriginalScreenshots && (
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-700 space-y-4 animate-in fade-in duration-200 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div>
              <h3 className="text-sm font-black text-[#f1c40f] flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>Original Ryanair Real-Site Captured Extras Screens</span>
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Exact reference screenshots provided from the Ryanair booking flow
              </p>
            </div>
            <button
              onClick={() => setViewOriginalScreenshots(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-amber-300 block">1. Security Fast Track</span>
              <div
                onClick={() => setActiveCaptureModal('/assets/aistudio/image_16909bab.png')}
                className="cursor-pointer rounded-lg overflow-hidden border border-slate-600 hover:border-amber-400 transition max-h-44 bg-black flex items-center justify-center"
              >
                <img
                  src="/assets/aistudio/image_16909bab.png"
                  alt="Security Fast Track Real Capture"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-[10px] text-slate-400">image_16909bab.png</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-amber-300 block">2. Travel Insurance Matrix</span>
              <div
                onClick={() => setActiveCaptureModal('/assets/aistudio/image_fcdb3a57.png')}
                className="cursor-pointer rounded-lg overflow-hidden border border-slate-600 hover:border-amber-400 transition max-h-44 bg-black flex items-center justify-center"
              >
                <img
                  src="/assets/aistudio/image_fcdb3a57.png"
                  alt="Travel Insurance Real Capture"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-[10px] text-slate-400">image_fcdb3a57.png</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-amber-300 block">3. Pre-paid Credit Card</span>
              <div
                onClick={() => setActiveCaptureModal('/assets/aistudio/image_6967650a.png')}
                className="cursor-pointer rounded-lg overflow-hidden border border-slate-600 hover:border-amber-400 transition max-h-44 bg-black flex items-center justify-center"
              >
                <img
                  src="/assets/aistudio/image_6967650a.png"
                  alt="Pre-paid Credit Real Capture"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-[10px] text-slate-400">image_6967650a.png</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-STEP 1: AIRPORT & TRIP ANCILLARIES */}
      {/* ========================================================================= */}
      {(activeSubStep === 'all' || activeSubStep === 'airport') && (
        <>
          {/* 1. SECURITY FAST TRACK CARD (image_16909bab.png) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-blue-200">
        {/* Card Header */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073590] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                <Zap className="w-5 h-5 text-[#073590]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#073590]">Security Fast Track</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                  Access an exclusive Fast Track lane with short queues and breeze through security.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCaptureModal('/assets/aistudio/image_16909bab.png')}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#073590] hover:underline shrink-0 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#073590]" />
              <span>Frequently Asked Questions</span>
            </button>
          </div>
        </div>

        {/* Dotted border separator */}
        <div className="border-t border-dashed border-gray-200 mx-5 sm:mx-6" />

        {/* Card Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Graphic: Authentic Cropped Illustration (Everyone Else vs Fast Track) */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full flex items-center justify-center bg-white p-1">
              <img
                src="/assets/aistudio/fast_track_graphic.png"
                alt="Security Fast Track: Everyone Else queue vs Fast Track lane"
                className="w-full max-w-[380px] h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Right Features & Add-on List */}
          <div className="lg:col-span-7 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Why choose Security Fast Track?</h4>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Price Match</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Crowd Free</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-black bg-[#ffc709] text-gray-900 shadow-xs border border-amber-300">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Dedicated Fast Track Lane</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Save Time</span>
                </span>
              </div>
            </div>

            {/* Speech Bubble Tooltip positioned with upward pointer to Dedicated Fast Track Lane */}
            <div className="flex justify-end pr-6 pt-0.5">
              <div className="relative bg-[#fff9db] border border-[#fde047] text-[#854d0e] text-[11px] font-bold px-3 py-1 rounded shadow-xs">
                <span>Avoid the queues with an exclusive Fast Track lane.</span>
                <span className="absolute -top-1.5 right-12 w-2.5 h-2.5 bg-[#fff9db] border-l border-t border-[#fde047] rotate-45" />
              </div>
            </div>

            {/* Flight Availability Rows */}
            <div className="space-y-2">
              {/* London Stansted (Available) */}
              <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 transition">
                <div className="flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-[#073590]" />
                  <span className="text-xs sm:text-sm font-black text-gray-900 tracking-wide uppercase">
                    LONDON STANSTED
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 block leading-tight">Per person</span>
                    <span className="text-sm font-black text-[#073590]">£7.49</span>
                  </div>

                  <button
                    onClick={() => onToggleFastTrack(!fastTrackSelected)}
                    className={`text-xs font-bold px-5 py-2.5 rounded-lg transition shadow-xs cursor-pointer whitespace-nowrap ${
                      fastTrackSelected
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1352a2] hover:bg-[#073590] text-white'
                    }`}
                  >
                    {fastTrackSelected ? 'Added ✓' : 'Add for all'}
                  </button>
                </div>
              </div>

              {/* Palanga (Not Available) */}
              <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-lg border border-gray-100 bg-gray-50 text-gray-400 text-xs">
                <div className="flex items-center gap-2.5">
                  <Plane className="w-4 h-4 text-gray-400" />
                  <span className="font-bold tracking-wide uppercase text-gray-400">PALANGA</span>
                </div>

                <div className="flex items-center gap-1.5 font-medium text-gray-400 text-xs">
                  <span>⊘</span>
                  <span>Not available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Centered Footer Accordion (Matching image_16909bab.png) */}
        <div className="border-t border-gray-200 py-3 bg-gray-50/50 text-center">
          <button
            onClick={() => setPassengerAccordionOpen(!passengerAccordionOpen)}
            className="text-xs font-bold text-[#073590] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Add per passenger</span>
            {passengerAccordionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {passengerAccordionOpen && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg text-xs space-y-2 max-w-sm mx-auto shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">Passenger 1 (Adult)</span>
                <button
                  onClick={() => onToggleFastTrack(!fastTrackSelected)}
                  className="font-bold text-[#073590] hover:underline"
                >
                  {fastTrackSelected ? 'Remove (-£7.49)' : 'Add (+£7.49)'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TRAVEL INSURANCE COMPARISON TABLE (image_fcdb3a57.png) */}
      {/* ========================================================================= */}
      <div className="space-y-3">
        {/* UK Government Warning Alert Box (Authentic from image_fcdb3a57.png) */}
        <div className="bg-[#e8f4fd] border border-[#bce0fd] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#0c5460] shadow-xs">
          <Info className="w-4 h-4 text-[#0070ba] shrink-0 mt-0.5" />
          <p className="font-medium leading-relaxed">
            The UK Government advises that all citizens travelling to the EU purchase travel insurance in advance of travelling.
          </p>
        </div>

        {/* Travel Insurance Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073590] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                <Shield className="w-5 h-5 text-[#073590]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#073590]">Travel insurance</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 font-medium">
                  You can't put a price on peace of mind
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCaptureModal('/assets/aistudio/image_fcdb3a57.png')}
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#073590] hover:underline shrink-0 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#073590]" />
              <span>Frequently Asked Questions</span>
            </button>
          </div>

          <div className="border-t border-dashed border-gray-200 mx-5 sm:mx-6" />

          {/* Matrix Content */}
          <div className="p-4 sm:p-6 pt-10 space-y-4">
            {/* Scrollable Container with Guaranteed Proportions */}
            <div className="overflow-x-auto pb-4 -mx-1 px-1">
              <div className="min-w-[840px] grid grid-cols-[1.3fr_1fr_1.08fr_1fr] gap-3.5 items-start">
                {/* ========================================================= */}
                {/* Feature Labels Column */}
                {/* ========================================================= */}
                <div className="space-y-2">
                  {/* Header / Brand Area */}
                  <div className="h-[76px] flex flex-col justify-center px-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xl text-amber-500 tracking-tighter">✕✕</span>
                      <span className="font-black text-base tracking-widest text-gray-900">XCOVER</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Cover underwritten by XCover</span>
                  </div>

                  {/* Feature Rows */}
                  <div className="h-[64px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Heart className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Medical expenses</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block mt-0.5">
                        Cover for emergency costs & repatriation (pre-existing excluded)
                      </span>
                    </div>
                  </div>

                  <div className="h-[64px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Briefcase className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Personal baggage</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block mt-0.5">
                        Cover if lost, damaged or stolen (single item limits apply)
                      </span>
                    </div>
                  </div>

                  <div className="h-[64px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <AlertOctagon className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Cancellation or cutting trip short</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block mt-0.5">
                        Cover for specific insured events
                      </span>
                    </div>
                  </div>

                  <div className="h-[48px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Calendar className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Delayed departure</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block">Cover if delayed &gt;3hrs</span>
                    </div>
                  </div>

                  <div className="h-[48px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Smartphone className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Personal electronics & gadgets</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block">Damaged, lost or stolen</span>
                    </div>
                  </div>

                  <div className="h-[48px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Calendar className="w-4 h-4 text-gray-600 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs text-gray-900 leading-tight">Full year of insurance</span>
                      <span className="text-[10.5px] text-gray-500 font-normal leading-tight block">Max. single trip duration 90 days</span>
                    </div>
                  </div>

                  <div className="h-[44px] flex items-center bg-gray-50/90 border border-gray-100 rounded-lg p-2.5 gap-2.5">
                    <Plane className="w-4 h-4 text-gray-600 shrink-0" />
                    <span className="font-bold text-xs text-gray-900 leading-tight">Airline failure service guarantee</span>
                  </div>

                  {/* Spacer for button alignment */}
                  <div className="h-[52px]" />
                </div>

                {/* ========================================================= */}
                {/* Column 1: STANDARD INSURANCE */}
                {/* ========================================================= */}
                <div
                  className={`rounded-xl border-2 p-3.5 pt-3 flex flex-col justify-between relative transition shadow-xs ${
                    insurancePlan === 'standard'
                      ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                      : 'border-[#0070ba]/40 bg-white hover:border-[#0070ba]'
                  }`}
                >
                  {/* Left Top Accent Pill Tab */}
                  <div className="absolute top-0 left-0 w-2.5 h-8 bg-[#0070ba] rounded-tl-[10px] rounded-br-sm" />

                  <div className="space-y-2">
                    {/* Header */}
                    <div className="h-[76px] flex flex-col justify-center text-center border-b border-gray-100 pb-2">
                      <span className="text-xs font-black tracking-wider uppercase text-gray-900">
                        STANDARD INSURANCE
                      </span>
                      <div className="text-base font-black text-[#073590] mt-0.5">£1.17</div>
                      <span className="text-[10px] text-gray-500 block">Per person per day</span>
                    </div>

                    {/* Feature Rows */}
                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#0070ba] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £2,500,000</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#0070ba] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £1,500</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#0070ba] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £3,000</span>
                    </div>

                    <div className="h-[48px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#0070ba] stroke-[3]" />
                    </div>

                    <div className="h-[48px] flex items-center justify-center text-gray-300 font-bold">-</div>

                    <div className="h-[48px] flex items-center justify-center text-gray-300 font-bold">-</div>

                    <div className="h-[44px] flex items-center justify-center text-gray-300 font-bold">-</div>
                  </div>

                  {/* Action Button */}
                  <div className="h-[52px] flex items-center justify-center pt-2">
                    <button
                      onClick={() => onSelectInsurance(insurancePlan === 'standard' ? 'none' : 'standard')}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-xs ${
                        insurancePlan === 'standard'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#0070ba] hover:bg-[#005a96] text-white'
                      }`}
                    >
                      {insurancePlan === 'standard' ? 'Selected ✓' : 'Agree and add'}
                    </button>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* Column 2: INSURANCE PLUS (Highlighted in Yellow Border) */}
                {/* ========================================================= */}
                <div
                  className={`rounded-xl border-2 p-3.5 pt-3 flex flex-col justify-between relative transition shadow-md ${
                    insurancePlan === 'plus'
                      ? 'border-[#073590] ring-3 ring-[#073590] bg-[#fffcf0]'
                      : 'border-[#ffc709] bg-[#fffdf5] hover:border-amber-400'
                  }`}
                >
                  {/* Left Top Accent Pill Tab */}
                  <div className="absolute top-0 left-0 w-2.5 h-8 bg-[#ffc709] rounded-tl-[10px] rounded-br-sm" />

                  {/* Audit Marker for DP 9 (Micro-price Framing & Steering) */}
                  {showAuditMarkers && isDarkPattern && (
                    <div className="absolute -top-3 right-2 z-30">
                      <AuditMarker
                        number={9}
                        auditId="dp-insurance-confirmshame"
                        title="Insurance Micro-price Framing & Loaded Refusal"
                        label="Micro-Pricing (+£0.35/day)"
                        align="right"
                        onOpenAuditItem={onOpenAuditItem}
                      />
                    </div>
                  )}

                  {/* Floating Gadget Tag Directly Centered Over Insurance Plus */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 flex items-center gap-1.5 bg-[#ffc709] text-gray-900 text-[11px] font-black px-3.5 py-1 rounded-full shadow-md border border-amber-300">
                    <Smartphone className="w-3.5 h-3.5 text-gray-900 shrink-0" />
                    <span>Protect your gadgets for <em>just £0.35 extra</em> per day</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ffc709] border-r border-b border-amber-300 rotate-45" />
                  </div>

                  <div className="space-y-2">
                    {/* Header */}
                    <div className="h-[76px] flex flex-col justify-center text-center border-b border-amber-200/70 pb-2">
                      <span className="text-xs font-black tracking-wider uppercase text-amber-950">
                        INSURANCE PLUS
                      </span>
                      <div className="text-base font-black text-[#073590] mt-0.5">£1.52</div>
                      <span className="text-[10px] text-gray-600 block">Per person per day</span>
                    </div>

                    {/* Feature Rows */}
                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                      <span className="text-[11px] font-black text-gray-900 mt-0.5">Up to £5,000,000 nil excess</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                      <span className="text-[11px] font-black text-gray-900 mt-0.5">Up to £2,000 nil excess</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                      <span className="text-[11px] font-black text-gray-900 mt-0.5">Up to £5,000 nil excess</span>
                    </div>

                    <div className="h-[48px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                    </div>

                    <div className="h-[48px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                    </div>

                    <div className="h-[48px] flex items-center justify-center text-gray-300 font-bold">-</div>

                    <div className="h-[44px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#d97706] stroke-[3]" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="h-[52px] flex items-center justify-center pt-2">
                    <button
                      onClick={() => onSelectInsurance(insurancePlan === 'plus' ? 'none' : 'plus')}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-black whitespace-nowrap transition cursor-pointer shadow-sm ${
                        insurancePlan === 'plus'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#ffc709] hover:bg-[#e5b200] text-[#073590]'
                      }`}
                    >
                      {insurancePlan === 'plus' ? 'Selected ✓' : 'Agree and add'}
                    </button>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* Column 3: ANNUAL STANDARD */}
                {/* ========================================================= */}
                <div
                  className={`rounded-xl border-2 p-3.5 pt-3 flex flex-col justify-between relative transition shadow-xs ${
                    insurancePlan === 'annual'
                      ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                      : 'border-[#073590]/40 bg-white hover:border-[#073590]'
                  }`}
                >
                  {/* Left Top Accent Pill Tab */}
                  <div className="absolute top-0 left-0 w-2.5 h-8 bg-[#073590] rounded-tl-[10px] rounded-br-sm" />

                  <div className="space-y-2">
                    {/* Header */}
                    <div className="h-[76px] flex flex-col justify-center text-center border-b border-gray-100 pb-2">
                      <span className="text-xs font-black tracking-wider uppercase text-gray-900">
                        ANNUAL STANDARD
                      </span>
                      <div className="text-base font-black text-[#073590] mt-0.5">£28.18</div>
                      <span className="text-[10px] text-gray-500 block">Per person</span>
                    </div>

                    {/* Feature Rows */}
                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#073590] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £2,500,000</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#073590] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £1,500</span>
                    </div>

                    <div className="h-[64px] flex flex-col justify-center items-center text-center">
                      <Check className="w-5 h-5 text-[#073590] stroke-[3]" />
                      <span className="text-[11px] font-bold text-gray-800 mt-0.5">Up to £3,000</span>
                    </div>

                    <div className="h-[48px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#073590] stroke-[3]" />
                    </div>

                    <div className="h-[48px] flex items-center justify-center text-gray-300 font-bold">-</div>

                    <div className="h-[48px] flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#073590] stroke-[3]" />
                    </div>

                    <div className="h-[44px] flex items-center justify-center text-gray-300 font-bold">-</div>
                  </div>

                  {/* Action Button */}
                  <div className="h-[52px] flex items-center justify-center pt-2">
                    <button
                      onClick={() => onSelectInsurance(insurancePlan === 'annual' ? 'none' : 'annual')}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer shadow-xs ${
                        insurancePlan === 'annual'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-[#073590] hover:bg-[#052973] text-white'
                      }`}
                    >
                      {insurancePlan === 'annual' ? 'Selected ✓' : 'Agree and add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Decline Insurance Option */}
            <div className="pt-2 text-right relative flex items-center justify-end">
              {showAuditMarkers && isDarkPattern && (
                <AuditMarker
                  number={9}
                  auditId="dp-insurance-confirmshame"
                  title="Insurance Micro-price Framing & Loaded Refusal"
                  label="Confirmshaming Refusal"
                  align="right"
                  onOpenAuditItem={onOpenAuditItem}
                />
              )}
              <button
                onClick={() => onSelectInsurance('none')}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 hover:underline cursor-pointer"
              >
                No thanks, I will travel without insurance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PRE-PAID CREDIT: GET MORE, PAY LESS (image_6967650a.png) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073590] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
              <CreditCard className="w-5 h-5 text-[#073590]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#073590]">Pre-paid Credit: Get More, Pay Less</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Choose any products from our Inflight Magazine, including gifts, food and drink, and purchase more for less with the Pre-paid Credit.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveCaptureModal('/assets/aistudio/image_6967650a.png')}
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#073590] hover:underline shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#073590]" />
            <span>How does it work?</span>
          </button>
        </div>

        <div className="border-t border-dashed border-gray-200 mx-5 sm:mx-6" />

        {/* Card Body */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Attendant Photo Column */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xs max-w-sm mx-auto">
              <img
                src="/assets/aistudio/image_6967650a.png"
                alt="Ryanair flight attendant presenting inflight menu"
                className="w-full h-44 object-cover object-[10%_50%]"
              />
            </div>
          </div>

          {/* Right Credit Options */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h4 className="text-xs font-bold text-gray-900 mb-2">Why choose Inflight Credit?</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Get 10% more credit for free</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Easy to use on board</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Valid for all inflight magazine purchases</span>
                </span>
              </div>
            </div>

            {/* Credit Selector Banner */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/70 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-[#073590] rounded-md shadow-xs flex items-center justify-center text-[#f1c40f] font-black text-xs">
                  RYN
                </div>
                <div>
                  <span className="text-xs font-black text-blue-900 block">+ 10% more credit</span>
                  <span className="text-[10px] text-gray-500">
                    {prepaidCredit > 0 ? `Selected: £${prepaidCredit} credit` : 'From £4.31 - £17.24 (Up to £1.72 FREE CREDIT)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {showPrepaidSelector ? (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[5, 10, 15, 20].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          onSelectPrepaidCredit(prepaidCredit === amt ? 0 : amt);
                          setShowPrepaidSelector(false);
                        }}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded transition ${
                          prepaidCredit === amt
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-[#073590]'
                        }`}
                      >
                        £{amt} (pay £{(amt * 0.9).toFixed(2)})
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        onSelectPrepaidCredit(0);
                        setShowPrepaidSelector(false);
                      }}
                      className="text-xs text-gray-500 hover:underline px-1"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowPrepaidSelector(true)}
                    className="bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs cursor-pointer"
                  >
                    {prepaidCredit > 0 ? `£${prepaidCredit} Selected (Change)` : 'Choose amount now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

        </>
      )}

      {/* ========================================================================= */}
      {/* SUB-STEP 2: TRANSPORT & PARKING ANCILLARIES */}
      {/* ========================================================================= */}
      {(activeSubStep === 'all' || activeSubStep === 'transport') && (
        <>
          {/* ===================================================================== */}
          {/* 4. AIRPORT PARKING (London Stansted - STN) */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-blue-200">
            {/* Header */}
            <div className="p-5 sm:p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073590] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Car className="w-5 h-5 text-[#073590]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-black text-[#073590]">Airport Parking</h3>
                      <span className="text-[11px] font-bold bg-blue-100 text-[#073590] px-2.5 py-0.5 rounded-full">
                        London Stansted (STN)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Save up to 40% with official Stansted airport parking. Safe, secure, and right by the terminal for 04 Oct – 08 Oct (4 days).
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#073590] shrink-0">
                  <HelpCircle className="w-3.5 h-3.5 text-[#073590]" />
                  <span>Parking Information</span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mx-5 sm:mx-6" />

            {/* Badges / Guarantees & Scarcity Nudge */}
            <div className="p-5 sm:p-6 pb-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Official Stansted Parking</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>24/7 CCTV & Barrier Access</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Free Cancellation up to 24h</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-black bg-[#ffc709] text-gray-900 shadow-xs border border-amber-300">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Guaranteed Bay</span>
                </span>
              </div>

              {isDarkPattern && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-medium">
                      <strong>High Demand Alert:</strong> 89% of Stansted official parking spaces are already reserved for Oct 04 – Oct 08.
                    </span>
                  </div>
                  <span className="hidden md:inline-block text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Only 3 spaces left at this rate
                  </span>
                </div>
              )}
            </div>

            {/* 3 Parking Tier Options */}
            <div className="p-5 sm:p-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Stansted Short Stay */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-xs ${
                  selectedParking === 'short-stay'
                    ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Walk to Terminal
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      2 min walk
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Stansted Short Stay</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-snug">
                      Covered walkway direct to the check-in hall. No transfer buses needed.
                    </p>
                  </div>

                  <ul className="text-xs text-gray-600 space-y-1.5 pt-1">
                    <li className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#073590]" />
                      <span>2 min covered walk to terminal</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Automatic number plate recognition</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Keep your own keys</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">4 days total</span>
                    <span className="text-base font-black text-[#073590]">£50.00</span>
                    <span className="text-[10px] text-gray-400 block">£12.50/day</span>
                  </div>

                  <button
                    onClick={() => onSelectParking?.(selectedParking === 'short-stay' ? 'none' : 'short-stay')}
                    className={`text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedParking === 'short-stay'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1352a2] hover:bg-[#073590] text-white'
                    }`}
                  >
                    {selectedParking === 'short-stay' ? 'Added ✓' : 'Select'}
                  </button>
                </div>
              </div>

              {/* Option 2: Meet & Greet Valet */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-md relative ${
                  selectedParking === 'meet-greet'
                    ? 'border-[#073590] ring-3 ring-[#073590] bg-[#fffcf0]'
                    : 'border-[#ffc709] bg-[#fffdf5] hover:border-amber-400'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ffc709] text-gray-900 text-[10px] font-black px-3 py-0.5 rounded-full shadow-xs border border-amber-300">
                  MOST POPULAR & CONVENIENT
                </div>

                {showAuditMarkers && isDarkPattern && (
                  <div className="absolute -top-3 right-2 z-30">
                    <AuditMarker
                      number={10}
                      auditId="dp-transport-social-proof"
                      title="Transport Bandwagon Steering & Sunk Cost Timing"
                      label="Bandwagon / Sunk Cost"
                      align="right"
                      onOpenAuditItem={onOpenAuditItem}
                    />
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider">
                      Terminal Forecourt
                    </span>
                    <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      Chauffeur Valet
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Stansted Meet & Greet</h4>
                    <p className="text-xs text-gray-700 mt-1 leading-snug">
                      Drive straight to the terminal forecourt. Step out, hand over your keys, and head straight to departures.
                    </p>
                  </div>

                  <ul className="text-xs text-gray-700 space-y-1.5 pt-1">
                    <li className="flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-[#073590]" />
                      <span>Dedicated valet check-in booth</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#d97706] stroke-[3]" />
                      <span>Zero walking with luggage</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#d97706] stroke-[3]" />
                      <span>Vehicle inspected on handover</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 mt-3 border-t border-amber-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-600 block">4 days total</span>
                    <span className="text-base font-black text-[#073590]">£65.00</span>
                    <span className="text-[10px] text-gray-500 block">£16.25/day</span>
                  </div>

                  <button
                    onClick={() => onSelectParking?.(selectedParking === 'meet-greet' ? 'none' : 'meet-greet')}
                    className={`text-xs font-black px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedParking === 'meet-greet'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#ffc709] hover:bg-[#e5b200] text-[#073590]'
                    }`}
                  >
                    {selectedParking === 'meet-greet' ? 'Added ✓' : 'Select Valet'}
                  </button>
                </div>
              </div>

              {/* Option 3: Official Long Stay */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-xs ${
                  selectedParking === 'long-stay'
                    ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Park & Ride
                    </span>
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      Best Value
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Stansted Long Stay</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-snug">
                      Budget-friendly secured parking with free frequent courtesy shuttles directly to terminal.
                    </p>
                  </div>

                  <ul className="text-xs text-gray-600 space-y-1.5 pt-1">
                    <li className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#073590]" />
                      <span>Free 5-min shuttle bus (every 10m)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Full perimeter fencing & CCTV</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Self-park: keep your keys</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">4 days total</span>
                    <span className="text-base font-black text-[#073590]">£39.96</span>
                    <span className="text-[10px] text-gray-400 block">£9.99/day</span>
                  </div>

                  <button
                    onClick={() => onSelectParking?.(selectedParking === 'long-stay' ? 'none' : 'long-stay')}
                    className={`text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedParking === 'long-stay'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1352a2] hover:bg-[#073590] text-white'
                    }`}
                  >
                    {selectedParking === 'long-stay' ? 'Added ✓' : 'Select'}
                  </button>
                </div>
              </div>
            </div>

            {/* Decline Parking Option */}
            <div className="p-4 pt-1 pb-4 text-right border-t border-gray-100">
              <button
                onClick={() => onSelectParking?.('none')}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 hover:underline cursor-pointer"
              >
                No thanks, I will arrange my own airport transport
              </button>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 5. CAR HIRE IN PALANGA (PLQ) */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all hover:border-blue-200">
            {/* Header */}
            <div className="p-5 sm:p-6 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#073590] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Key className="w-5 h-5 text-[#073590]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg sm:text-xl font-black text-[#073590]">Car Hire in Palanga</h3>
                      <span className="text-[11px] font-bold bg-blue-100 text-[#073590] px-2.5 py-0.5 rounded-full">
                        Palanga Airport (PLQ)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      Compare verified car hire partners with pick-up directly at Palanga Airport Arrivals. 04 Oct – 08 Oct (4 days).
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#073590] shrink-0">
                  <HelpCircle className="w-3.5 h-3.5 text-[#073590]" />
                  <span>Car Hire Price Promise</span>
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200 mx-5 sm:mx-6" />

            {/* Badges / Guarantees & Scarcity */}
            <div className="p-5 sm:p-6 pb-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Free Cancellation up to 48h</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Full-to-Full Fuel Policy</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold bg-[#fef3c7] text-[#92400e]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Pick up at Terminal Desk</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-black bg-[#ffc709] text-gray-900 shadow-xs border border-amber-300">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Unlimited Mileage</span>
                </span>
              </div>

              {isDarkPattern && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-medium">
                      <strong>Low Availability in Palanga:</strong> 82% of automatic vehicles already booked for October 04 – 08.
                    </span>
                  </div>
                  <span className="hidden md:inline-block text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    High season demand
                  </span>
                </div>
              )}
            </div>

            {/* 3 Car Tier Options */}
            <div className="p-5 sm:p-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Car 1: Economy Polo */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-xs ${
                  selectedCarHire === 'economy'
                    ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Supplier: Hertz
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Economy
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Volkswagen Polo</h4>
                    <span className="text-xs text-gray-500">or similar economy class</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#073590]" />
                      <span>5 Seats</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#073590]" />
                      <span>2 Bags</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#073590]" />
                      <span>Manual / Petrol</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Air conditioning</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">4 days rental</span>
                    <span className="text-base font-black text-[#073590]">£78.00</span>
                    <span className="text-[10px] text-gray-400 block">£19.50/day</span>
                  </div>

                  <button
                    onClick={() => onSelectCarHire?.(selectedCarHire === 'economy' ? 'none' : 'economy')}
                    className={`text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedCarHire === 'economy'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1352a2] hover:bg-[#073590] text-white'
                    }`}
                  >
                    {selectedCarHire === 'economy' ? 'Booked ✓' : 'Book Car'}
                  </button>
                </div>
              </div>

              {/* Car 2: Compact SUV */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-md relative ${
                  selectedCarHire === 'suv'
                    ? 'border-[#073590] ring-3 ring-[#073590] bg-[#fffcf0]'
                    : 'border-[#ffc709] bg-[#fffdf5] hover:border-amber-400'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#ffc709] text-gray-900 text-[10px] font-black px-3 py-0.5 rounded-full shadow-xs border border-amber-300">
                  CUSTOMER FAVOURITE
                </div>

                {showAuditMarkers && isDarkPattern && (
                  <div className="absolute -top-3 right-2 z-30">
                    <AuditMarker
                      number={10}
                      auditId="dp-transport-social-proof"
                      title="Transport Bandwagon Steering & Sunk Cost Timing"
                      label="Social Proof / Sunk Cost"
                      align="right"
                      onOpenAuditItem={onOpenAuditItem}
                    />
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider">
                      Supplier: Sixt
                    </span>
                    <span className="text-[11px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      Automatic SUV
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Nissan Qashqai</h4>
                    <span className="text-xs text-gray-600">or similar compact SUV</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#073590]" />
                      <span>5 Seats</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#073590]" />
                      <span>4 Large Bags</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#073590]" />
                      <span>Automatic</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
                      <span>GPS Included</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-amber-200/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-600 block">4 days rental</span>
                    <span className="text-base font-black text-[#073590]">£119.20</span>
                    <span className="text-[10px] text-gray-500 block">£29.80/day</span>
                  </div>

                  <button
                    onClick={() => onSelectCarHire?.(selectedCarHire === 'suv' ? 'none' : 'suv')}
                    className={`text-xs font-black px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedCarHire === 'suv'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#ffc709] hover:bg-[#e5b200] text-[#073590]'
                    }`}
                  >
                    {selectedCarHire === 'suv' ? 'Booked ✓' : 'Book SUV'}
                  </button>
                </div>
              </div>

              {/* Car 3: Family Estate */}
              <div
                className={`rounded-xl border-2 p-4 flex flex-col justify-between transition shadow-xs ${
                  selectedCarHire === 'estate'
                    ? 'border-[#073590] ring-2 ring-[#073590] bg-blue-50/20'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Supplier: Green Motion
                    </span>
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                      Family Estate
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-gray-900 text-base">Skoda Octavia Combi</h4>
                    <span className="text-xs text-gray-500">or similar station wagon</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#073590]" />
                      <span>5 Seats</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#073590]" />
                      <span>5 Bags (640L boot)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Fuel className="w-3.5 h-3.5 text-[#073590]" />
                      <span>Manual / Diesel</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cruise Control</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">4 days rental</span>
                    <span className="text-base font-black text-[#073590]">£96.00</span>
                    <span className="text-[10px] text-gray-400 block">£24.00/day</span>
                  </div>

                  <button
                    onClick={() => onSelectCarHire?.(selectedCarHire === 'estate' ? 'none' : 'estate')}
                    className={`text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs cursor-pointer ${
                      selectedCarHire === 'estate'
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-[#1352a2] hover:bg-[#073590] text-white'
                    }`}
                  >
                    {selectedCarHire === 'estate' ? 'Booked ✓' : 'Book Estate'}
                  </button>
                </div>
              </div>
            </div>

            {/* Decline Car Hire Option */}
            <div className="p-4 pt-1 pb-4 text-right border-t border-gray-100">
              <button
                onClick={() => onSelectCarHire?.('none')}
                className="text-xs font-bold text-gray-500 hover:text-gray-800 hover:underline cursor-pointer"
              >
                No thanks, I will travel without car hire
              </button>
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM STEPPER NAVIGATION */}
      {/* ========================================================================= */}
      <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2.5 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bags</span>
          </button>

          {activeSubStep === 'transport' && (
            <button
              onClick={() => setActiveSubStep('airport')}
              className="text-xs font-semibold text-[#073590] hover:underline px-2 py-1 cursor-pointer"
            >
              ← Back to Airport & Trip
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeSubStep === 'airport' && (
            <button
              onClick={() => setActiveSubStep('transport')}
              className="text-xs font-bold text-[#073590] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2.5 rounded-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Next: Transport & Parking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onNext}
            className="bg-[#073590] hover:bg-[#052973] text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer transform active:scale-95"
          >
            <span>Continue to Review & Pay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal for viewing original captures in full detail */}
      {activeCaptureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full p-4 space-y-3 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <span className="text-xs font-bold text-white font-mono">{activeCaptureModal}</span>
              <button
                onClick={() => setActiveCaptureModal(null)}
                className="text-white hover:text-amber-400 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-lg bg-black flex items-center justify-center">
              <img
                src={activeCaptureModal}
                alt="Ryanair Real Capture"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
