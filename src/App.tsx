import React, { useState } from 'react';
import { ViewMode, DeviceView, FareTierId } from './types/booking';
import { OUTBOUND_FLIGHT, INBOUND_FLIGHT, FARE_TIERS, DARK_PATTERNS_AUDIT, DARK_PATTERN_GROUPS } from './data/mockData';
import { Header } from './components/Header';
import { BookingStepper } from './components/BookingStepper';
import { FlightSelection } from './components/FlightSelection';
import { FareSelectionDark } from './components/FareSelectionDark';
import { FareSelectionEthical } from './components/FareSelectionEthical';
import { SideBySideView } from './components/SideBySideView';
import { ComparisonBanner } from './components/ComparisonBanner';
import { DarkPatternInspector } from './components/DarkPatternInspector';
import { SeatsStep } from './components/SeatsStep';
import { BagsStep } from './components/BagsStep';
import { ReviewStep } from './components/ReviewStep';
import { NewsletterFooter } from './components/NewsletterFooter';

export default function App() {
  // Navigation & Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('dark-pattern');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [currentStep, setCurrentStep] = useState<'flights' | 'seats' | 'bags' | 'extras' | 'review'>('flights');

  // Flight Selection State
  const [outboundSelected, setOutboundSelected] = useState(true);
  const [inboundSelected, setInboundSelected] = useState(true);
  const [selectedOutboundDate, setSelectedOutboundDate] = useState('04 Oct');
  const [selectedInboundDate, setSelectedInboundDate] = useState('08 Oct');

  // Fare Bundle State
  const [selectedTier, setSelectedTier] = useState<FareTierId>('BASIC');
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  // Additional Add-ons State
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [additionalLuggage, setAdditionalLuggage] = useState<number>(0);
  const [newsletterOptIn, setNewsletterOptIn] = useState<boolean>(true);

  // Dark Pattern Audit / Inspector State
  const [showAuditMarkers, setShowAuditMarkers] = useState(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>('dp-roadblock-confirmshame');

  // Recalculate Cart Total
  const tierData = FARE_TIERS[selectedTier] || FARE_TIERS.BASIC;
  const seatPrice = selectedSeat.startsWith('15') || selectedSeat.startsWith('16') ? 8.0 : 0.0;
  const luggagePrice = additionalLuggage * 30.0;
  const currentCartTotal = tierData.totalPrice + seatPrice + luggagePrice;

  // Handlers
  const handleToggleOutbound = () => setOutboundSelected(!outboundSelected);
  const handleToggleInbound = () => setInboundSelected(!inboundSelected);
  const handleResetFlights = () => {
    setOutboundSelected(false);
    setInboundSelected(false);
  };

  const handleSelectTier = (tier: FareTierId) => {
    setSelectedTier(tier);
    if (viewMode === 'dark-pattern' && tier === 'BASIC') {
      setShowUpsellModal(true);
    }
  };

  const handleConfirmBasic = () => {
    setSelectedTier('BASIC');
    setShowUpsellModal(false);
  };

  const handleSwitchToRegular = () => {
    setSelectedTier('REGULAR');
    setShowUpsellModal(false);
  };

  const handleOpenAuditItem = (id: string) => {
    setSelectedAuditId(id);
    setIsAuditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f2f5f8] text-[#1b2738] flex flex-col font-sans selection:bg-[#f1c40f] selection:text-[#073590]">
      {/* Top Universal Control & Mode Comparison Bar */}
      <ComparisonBanner
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        deviceView={deviceView}
        onDeviceViewChange={setDeviceView}
        showAuditMarkers={showAuditMarkers}
        onToggleAuditMarkers={() => setShowAuditMarkers(!showAuditMarkers)}
        onOpenAuditDrawer={() => setIsAuditModalOpen(true)}
        auditCount={DARK_PATTERNS_AUDIT.length}
        auditGroupCount={DARK_PATTERN_GROUPS.length}
      />

      {/* Main Container: Wrap in Mobile Frame if deviceView === 'mobile' */}
      <div className={`flex-1 flex flex-col ${deviceView === 'mobile' ? 'max-w-md mx-auto my-6 border-8 border-slate-900 rounded-[40px] overflow-hidden shadow-2xl bg-white' : 'w-full'}`}>
        {/* Brand Header */}
        <Header
          cartTotal={currentCartTotal}
          onEditSearch={() => setCurrentStep('flights')}
          outboundDate={selectedOutboundDate}
          inboundDate={selectedInboundDate}
        />

        {/* Stepper Navigation */}
        <BookingStepper
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          canNavigateForward={outboundSelected && inboundSelected}
        />

        {/* Main Step Content */}
        <main className="flex-1 w-full mx-auto px-3 sm:px-6 py-6">
          {/* STEP 1: FLIGHTS & FARES */}
          {currentStep === 'flights' && (
            <>
              {/* SIDE-BY-SIDE DUAL VIEW */}
              {viewMode === 'side-by-side' ? (
                <SideBySideView
                  outboundFlight={OUTBOUND_FLIGHT}
                  inboundFlight={INBOUND_FLIGHT}
                  outboundSelected={outboundSelected}
                  inboundSelected={inboundSelected}
                  selectedOutboundDate={selectedOutboundDate}
                  selectedInboundDate={selectedInboundDate}
                  onSelectOutboundDate={setSelectedOutboundDate}
                  onSelectInboundDate={setSelectedInboundDate}
                  onToggleOutbound={handleToggleOutbound}
                  onToggleInbound={handleToggleInbound}
                  onResetFlights={handleResetFlights}
                  selectedTier={selectedTier}
                  onSelectTier={handleSelectTier}
                  showUpsellModal={showUpsellModal}
                  onOpenUpsellModal={() => setShowUpsellModal(true)}
                  onCloseUpsellModal={() => setShowUpsellModal(false)}
                  onConfirmBasic={handleConfirmBasic}
                  onSwitchToRegular={handleSwitchToRegular}
                  onProceedToNextStep={() => setCurrentStep('seats')}
                  showAuditMarkers={showAuditMarkers}
                  onOpenAuditItem={handleOpenAuditItem}
                />
              ) : (
                /* SINGLE VIEW (DARK PATTERN OR ETHICAL) */
                <div className="max-w-6xl mx-auto space-y-6">
                  {/* Informational Mode Indicator Banner */}
                  <div
                    className={`rounded-xl p-3 sm:p-4 border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs ${
                      viewMode === 'dark-pattern'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          viewMode === 'dark-pattern' ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                      ></span>
                      <span>
                        <strong>Currently Viewing:</strong>{' '}
                        {viewMode === 'dark-pattern'
                          ? 'Original Prototype (Reconstructed Fare Choice)'
                          : 'Existing Ethical Redesign (Untested)'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setViewMode(viewMode === 'dark-pattern' ? 'ethical' : 'dark-pattern')
                        }
                        className={`font-bold px-3 py-1 rounded-md transition cursor-pointer ${
                          viewMode === 'dark-pattern'
                            ? 'bg-rose-200 text-rose-900 hover:bg-rose-300'
                            : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'
                        }`}
                      >
                        Switch to {viewMode === 'dark-pattern' ? 'Ethical UI' : 'Original Prototype'} →
                      </button>
                    </div>
                  </div>

                  {/* Flight Selection Component */}
                  <FlightSelection
                    outboundFlight={OUTBOUND_FLIGHT}
                    inboundFlight={INBOUND_FLIGHT}
                    outboundSelected={outboundSelected}
                    inboundSelected={inboundSelected}
                    selectedOutboundDate={selectedOutboundDate}
                    selectedInboundDate={selectedInboundDate}
                    onSelectOutboundDate={setSelectedOutboundDate}
                    onSelectInboundDate={setSelectedInboundDate}
                    onToggleOutbound={handleToggleOutbound}
                    onToggleInbound={handleToggleInbound}
                    onResetFlights={handleResetFlights}
                    isDarkPattern={viewMode === 'dark-pattern'}
                    showAuditMarkers={showAuditMarkers}
                    onOpenAuditItem={handleOpenAuditItem}
                  />

                  {/* Fare Selection Component (Visible when flights are selected) */}
                  {outboundSelected && inboundSelected && (
                    <div className="pt-2">
                      {viewMode === 'dark-pattern' ? (
                        <FareSelectionDark
                          onSelectTier={handleSelectTier}
                          selectedTier={selectedTier}
                          showUpsellModal={showUpsellModal}
                          onOpenUpsellModal={() => setShowUpsellModal(true)}
                          onCloseUpsellModal={() => setShowUpsellModal(false)}
                          onConfirmBasic={handleConfirmBasic}
                          onSwitchToRegular={handleSwitchToRegular}
                          showAuditMarkers={showAuditMarkers}
                          onOpenAuditItem={handleOpenAuditItem}
                        />
                      ) : (
                        <FareSelectionEthical
                          onSelectTier={handleSelectTier}
                          selectedTier={selectedTier}
                          onProceedToNextStep={() => setCurrentStep('seats')}
                          showAuditMarkers={showAuditMarkers}
                          onOpenAuditItem={handleOpenAuditItem}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* STEP 2: SEATS */}
          {currentStep === 'seats' && (
            <SeatsStep
              isDarkPattern={viewMode === 'dark-pattern'}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
              selectedSeat={selectedSeat}
              onSelectSeat={setSelectedSeat}
              onBack={() => setCurrentStep('flights')}
              onNext={() => setCurrentStep('bags')}
            />
          )}

          {/* STEP 3: BAGS */}
          {currentStep === 'bags' && (
            <BagsStep
              isDarkPattern={viewMode === 'dark-pattern'}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
              additionalLuggage={additionalLuggage}
              onSetAdditionalLuggage={setAdditionalLuggage}
              onBack={() => setCurrentStep('seats')}
              onNext={() => setCurrentStep('review')}
            />
          )}

          {/* STEP 4 & 5: REVIEW & PAY */}
          {currentStep === 'review' && (
            <ReviewStep
              isDarkPattern={viewMode === 'dark-pattern'}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
              selectedTier={selectedTier}
              selectedSeat={selectedSeat}
              additionalLuggage={additionalLuggage}
              newsletterOptIn={newsletterOptIn}
              onToggleNewsletter={() => setNewsletterOptIn(!newsletterOptIn)}
              onBack={() => setCurrentStep('bags')}
            />
          )}

          {/* Optional EXTRAS step redirect */}
          {currentStep === 'extras' && (
            <div className="max-w-md mx-auto text-center py-12 space-y-4">
              <h3 className="text-xl font-bold text-[#073590]">Travel Extras</h3>
              <p className="text-xs text-gray-600">
                In Dark Pattern mode, car hire and airport parking are aggressively pre-bundled.
              </p>
              <button
                onClick={() => setCurrentStep('review')}
                className="bg-[#073590] text-white font-bold text-xs px-6 py-2 rounded-lg"
              >
                Proceed to Review & Pay →
              </button>
            </div>
          )}
        </main>

        {/* Authentic Ryanair Newsletter Footer */}
        <NewsletterFooter />
      </div>

      {/* Deep Dive UX Audit & Deceptive Pattern Modal */}
      <DarkPatternInspector
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        selectedPatternId={selectedAuditId}
        onSelectPattern={(id) => setSelectedAuditId(id)}
      />
    </div>
  );
}
