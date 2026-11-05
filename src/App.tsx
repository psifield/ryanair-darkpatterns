import React, { useEffect, useRef, useState } from 'react';
import type { BookingStep, DeviceView, FareTierId, PrototypeMode, ViewMode } from './types/booking';
import { OUTBOUND_FLIGHT, INBOUND_FLIGHT, FARE_TIERS, DARK_PATTERNS_AUDIT, DARK_PATTERN_GROUPS } from './data/mockData';
import { EMPTY_BOOKING_CHOICES, getBookingPricing } from './data/bookingExtras';
import type { BookingChoices } from './data/bookingExtras';
import { Header } from './components/Header';
import { BookingStepper } from './components/BookingStepper';
import { FlightSelection } from './components/FlightSelection';
import { FareSelectionDark } from './components/FareSelectionDark';
import { FareSelectionEthical } from './components/FareSelectionEthical';
import { BookingAddOnView, SideBySideView } from './components/SideBySideView';
import { ComparisonBanner } from './components/ComparisonBanner';
import { DarkPatternInspector } from './components/DarkPatternInspector';
import { NewsletterFooter } from './components/NewsletterFooter';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('dark-pattern');
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [currentStep, setCurrentStep] = useState<BookingStep>('flights');
  const stepContentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (viewMode === 'dark-pattern' || (viewMode === 'ethical' && currentStep === 'flights')) return;
    window.scrollTo(0, 0);
    stepContentRef.current?.focus({ preventScroll: true });
  }, [currentStep, viewMode]);

  // Both designs use the same itinerary and fare.
  const [outboundSelected, setOutboundSelected] = useState(true);
  const [inboundSelected, setInboundSelected] = useState(true);
  const [selectedOutboundDate, setSelectedOutboundDate] = useState('04 Oct');
  const [selectedInboundDate, setSelectedInboundDate] = useState('08 Oct');
  const [selectedTier, setSelectedTier] = useState<FareTierId>('BASIC');
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  const [bookings, setBookings] = useState<Record<PrototypeMode, BookingChoices>>({
    'dark-pattern': { ...EMPTY_BOOKING_CHOICES, newsletterOptIn: true },
    ethical: { ...EMPTY_BOOKING_CHOICES },
  });

  const [showAuditMarkers, setShowAuditMarkers] = useState(true);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>('dp-roadblock-confirmshame');

  const currentCartTotal = viewMode === 'side-by-side'
    ? undefined
    : getBookingPricing(FARE_TIERS[selectedTier], bookings[viewMode], viewMode === 'dark-pattern').total;

  const changeBooking = (mode: PrototypeMode, changes: Partial<BookingChoices>) => {
    setBookings(previous => ({ ...previous, [mode]: { ...previous[mode], ...changes } }));
  };

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

  const renderFlights = (mode: PrototypeMode) => (
    <>
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
        isDarkPattern={mode === 'dark-pattern'}
        showAuditMarkers={showAuditMarkers}
        onOpenAuditItem={handleOpenAuditItem}
      />

      {(viewMode === 'side-by-side' || (outboundSelected && inboundSelected)) && (
        <div className="pt-2">
          {mode === 'dark-pattern' ? (
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
    </>
  );

  return (
    <div className="min-h-screen bg-[#f2f5f8] text-[#1b2738] flex flex-col font-sans selection:bg-[#f1c40f] selection:text-[#073590]">
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

      <div className={`flex-1 flex flex-col ${deviceView === 'mobile' ? 'max-w-md mx-auto my-6 border-8 border-slate-900 rounded-[40px] overflow-hidden shadow-2xl bg-white' : 'w-full'}`}>
        <Header
          cartTotal={currentCartTotal}
          onEditSearch={() => setCurrentStep('flights')}
          outboundDate={selectedOutboundDate}
          inboundDate={selectedInboundDate}
        />

        <BookingStepper
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          canNavigateForward={outboundSelected && inboundSelected}
        />

        <main ref={stepContentRef} tabIndex={-1} className="flex-1 w-full mx-auto px-3 sm:px-6 py-6">
          {currentStep === 'flights' ? (
            viewMode === 'side-by-side' ? (
              <SideBySideView original={renderFlights('dark-pattern')} ethical={renderFlights('ethical')} />
            ) : (
              <div className="max-w-6xl mx-auto space-y-6">
                <div className={`rounded-xl p-3 sm:p-4 border flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs ${
                  viewMode === 'dark-pattern' ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  <div className="flex items-center gap-2 font-medium">
                    <span className={`w-2.5 h-2.5 rounded-full ${viewMode === 'dark-pattern' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                    <span>
                      <strong>Currently Viewing:</strong>{' '}
                      {viewMode === 'dark-pattern' ? 'Original Prototype (Reconstructed Fare Choice)' : 'Ethical Redesign (Untested)'}
                    </span>
                  </div>

                  <button
                    onClick={() => setViewMode(viewMode === 'dark-pattern' ? 'ethical' : 'dark-pattern')}
                    className={`font-bold px-3 py-1 rounded-md transition cursor-pointer ${
                      viewMode === 'dark-pattern' ? 'bg-rose-200 text-rose-900 hover:bg-rose-300' : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'
                    }`}
                  >
                    Switch to {viewMode === 'dark-pattern' ? 'Ethical UI' : 'Original Prototype'} →
                  </button>
                </div>
                {renderFlights(viewMode)}
              </div>
            )
          ) : (
            <BookingAddOnView
              step={currentStep}
              viewMode={viewMode}
              selectedTier={selectedTier}
              bookings={bookings}
              onChangeBooking={changeBooking}
              onStepChange={setCurrentStep}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
            />
          )}
        </main>

        <NewsletterFooter />
      </div>

      <DarkPatternInspector
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        selectedPatternId={selectedAuditId}
        onSelectPattern={setSelectedAuditId}
      />
    </div>
  );
}
