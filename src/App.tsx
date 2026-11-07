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
import { StudyScreen } from './components/StudyScreen';
import type { StudyEntry, StudyVariant } from './studyEntry';

export interface AppProps {
  entry: StudyEntry;
  initialViewMode?: ViewMode;
}

export default function App({ entry, initialViewMode }: AppProps) {
  const [modeOverride, setModeOverride] = useState<'participant' | 'review' | null>(null);
  const [variantOverride, setVariantOverride] = useState<StudyVariant | null>(null);
  const isReview = (modeOverride ?? entry.mode) === 'review';
  const currentVariant = variantOverride ?? entry.variant;
  const [studyStage, setStudyStage] = useState<'consent' | 'fare' | 'debrief'>('consent');
  const [confirmedFare, setConfirmedFare] = useState<FareTierId | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(
    initialViewMode ?? (currentVariant === 'B' ? 'ethical' : 'dark-pattern')
  );
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [currentStep, setCurrentStep] = useState<BookingStep>('flights');
  const [maxStepReached, setMaxStepReached] = useState<BookingStep>('flights');
  const stepContentRef = useRef<HTMLElement>(null);
  const debriefButtonRef = useRef<HTMLButtonElement>(null);

  const STEP_ORDER: BookingStep[] = ['flights', 'seats', 'bags', 'extras', 'review'];

  const handleStepChange = (newStep: BookingStep) => {
    const newIndex = STEP_ORDER.indexOf(newStep);
    const maxIndex = STEP_ORDER.indexOf(maxStepReached);
    if (newIndex > maxIndex) {
      setMaxStepReached(newStep);
    }
    setCurrentStep(newStep);
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.history?.replaceState) return;

    const currentUrl = new URL(window.location.href);
    let targetV = 'review';
    if (viewMode === 'dark-pattern' || (!isReview && currentVariant === 'A')) {
      targetV = 'A';
    } else if (viewMode === 'ethical' || (!isReview && currentVariant === 'B')) {
      targetV = 'B';
    } else if (viewMode === 'side-by-side') {
      targetV = 'review';
    }

    if (!isReview) {
      currentUrl.searchParams.set('mode', 'participant');
    } else {
      currentUrl.searchParams.delete('mode');
      currentUrl.searchParams.delete('review');
      currentUrl.searchParams.delete('view');
    }

    currentUrl.searchParams.set('v', targetV);

    const newSearch = currentUrl.search;
    if (window.location.search !== newSearch) {
      window.history.replaceState(null, '', `${window.location.pathname}${newSearch}${window.location.hash}`);
    }
  }, [isReview, viewMode, currentVariant]);

  useEffect(() => {
    if (isReview && viewMode !== 'side-by-side' && currentStep === 'flights') return;
    window.scrollTo(0, 0);
    stepContentRef.current?.focus({ preventScroll: true });
  }, [currentStep, isReview, studyStage, viewMode]);

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

  const [showAuditMarkers, setShowAuditMarkers] = useState(isReview);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>('dp-roadblock-confirmshame');

  const currentCartTotal = viewMode === 'side-by-side'
    ? undefined
    : getBookingPricing(FARE_TIERS[selectedTier], bookings[viewMode], viewMode === 'dark-pattern', currentStep).total;

  const showDebriefAction = !isReview && confirmedFare === selectedTier && outboundSelected && inboundSelected && !showUpsellModal;

  useEffect(() => {
    if (showDebriefAction) debriefButtonRef.current?.focus();
  }, [confirmedFare, showDebriefAction]);

  const changeBooking = (mode: PrototypeMode, changes: Partial<BookingChoices>) => {
    setBookings(previous => {
      const passengerChanges = { ...changes };
      delete passengerChanges.newsletterOptIn;

      return {
        'dark-pattern': {
          ...previous['dark-pattern'],
          ...passengerChanges,
          ...(changes.newsletterOptIn !== undefined && (viewMode === 'side-by-side' || mode === 'dark-pattern')
            ? { newsletterOptIn: changes.newsletterOptIn }
            : {}),
        },
        ethical: {
          ...previous.ethical,
          ...passengerChanges,
          ...(changes.newsletterOptIn !== undefined && (viewMode === 'side-by-side' || mode === 'ethical')
            ? { newsletterOptIn: changes.newsletterOptIn }
            : {}),
        },
      };
    });
  };

  const handleToggleOutbound = () => setOutboundSelected(!outboundSelected);
  const handleToggleInbound = () => setInboundSelected(!inboundSelected);
  const handleResetFlights = () => {
    setOutboundSelected(false);
    setInboundSelected(false);
    setConfirmedFare(null);
    setMaxStepReached('flights');
  };

  const handleSelectTier = (tier: FareTierId) => {
    setSelectedTier(tier);
    if (!isReview) {
      setConfirmedFare(tier);
    }
  };

  const handleContinueFromFare = (tier: FareTierId) => {
    setSelectedTier(tier);
    if (isReview) {
      handleStepChange('seats');
    } else {
      setConfirmedFare(tier);
    }
  };

  const handleConfirmOriginalFare = (tier: FareTierId) => {
    setSelectedTier(tier);
    setShowUpsellModal(false);
    handleContinueFromFare(tier);
  };

  const handleOpenAuditItem = (id: string) => {
    setSelectedAuditId(id);
    setIsAuditModalOpen(true);
  };

  const handleResetSimulation = (mode?: PrototypeMode) => {
    if (mode === 'ethical' || currentVariant === 'B') {
      setViewMode('ethical');
      setVariantOverride('B');
    } else if (mode === 'dark-pattern' || currentVariant === 'A') {
      setViewMode('dark-pattern');
      setVariantOverride('A');
    }
    setCurrentStep('flights');
    setMaxStepReached('flights');
    setConfirmedFare(null);
    setSelectedTier('BASIC');
    setShowUpsellModal(false);
    setOutboundSelected(true);
    setInboundSelected(true);
    setStudyStage('fare');
    setBookings({
      'dark-pattern': { ...EMPTY_BOOKING_CHOICES, newsletterOptIn: true },
      ethical: { ...EMPTY_BOOKING_CHOICES },
    });
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
        showScarcity={isReview && mode === 'dark-pattern'}
        showAuditMarkers={showAuditMarkers}
        onOpenAuditItem={handleOpenAuditItem}
      />

      {(viewMode === 'side-by-side' || (outboundSelected && inboundSelected)) && (
        <div className="space-y-3 pt-2">
          {showDebriefAction && (
            <section aria-label="Fare choice complete" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-700">Keep this screen open for any follow-up questions before viewing the debrief.</p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  ref={debriefButtonRef}
                  onClick={() => setStudyStage('debrief')}
                  className="min-h-11 cursor-pointer rounded-lg bg-[#073590] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#052973] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]"
                >
                  View debrief
                </button>
                <button
                  type="button"
                  onClick={() => handleStepChange('seats')}
                  className="min-h-11 cursor-pointer rounded-lg border border-[#073590] bg-white px-4 py-2.5 text-sm font-semibold text-[#073590] hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#073590]"
                >
                  Continue to Seats &amp; Extras →
                </button>
              </div>
            </section>
          )}
          {mode === 'dark-pattern' ? (
            <FareSelectionDark
              onSelectTier={handleSelectTier}
              selectedTier={selectedTier}
              showUpsellModal={showUpsellModal}
              onOpenUpsellModal={() => setShowUpsellModal(true)}
              onCloseUpsellModal={() => setShowUpsellModal(false)}
              onConfirmBasic={() => handleConfirmOriginalFare('BASIC')}
              onSwitchToRegular={() => handleConfirmOriginalFare('REGULAR')}
              onProceedToNextStep={(tier) => handleContinueFromFare(tier ?? selectedTier)}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
            />
          ) : (
            <FareSelectionEthical
              onSelectTier={handleSelectTier}
              selectedTier={selectedTier}
              onProceedToNextStep={() => handleContinueFromFare(selectedTier)}
              continueLabel={isReview ? undefined : 'Confirm fare choice'}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
            />
          )}
        </div>
      )}
    </>
  );

  if (studyStage === 'debrief' || (!isReview && studyStage !== 'fare')) {
    return (
      <main ref={stepContentRef} tabIndex={-1} className="grid min-h-screen place-items-center bg-[#f2f5f8] px-4 py-8">
        <StudyScreen
          stage={studyStage === 'debrief' ? 'debrief' : 'consent'}
          variant={currentVariant}
          onConsent={() => setStudyStage('fare')}
          onBackToFlights={() => setStudyStage('fare')}
          onContinueToBooking={() => {
            setStudyStage('fare');
            handleStepChange('seats');
          }}
          onOpenReviewMode={() => {
            setModeOverride('review');
            setViewMode('side-by-side');
            setShowAuditMarkers(true);
            setStudyStage('fare');
          }}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f5f8] text-[#1b2738] flex flex-col font-sans selection:bg-[#f1c40f] selection:text-[#073590]">
      {!isReview ? (
        <aside aria-label="Participant study banner" className="bg-[#073590] text-white px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2.5 h-2.5 rounded-full ${currentVariant === 'B' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
            <span className="font-semibold text-blue-100">
              Active participant session · Version {currentVariant} ({currentVariant === 'A' ? 'Original Prototype' : 'Ethical Redesign'})
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {currentVariant === 'B' ? (
              <button
                type="button"
                onClick={() => {
                  setVariantOverride('A');
                  setViewMode('dark-pattern');
                }}
                className="font-bold text-white bg-blue-800 hover:bg-blue-700 px-2.5 py-1 rounded transition cursor-pointer"
              >
                Switch to Version A →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setVariantOverride('B');
                  setViewMode('ethical');
                }}
                className="font-bold text-white bg-blue-800 hover:bg-blue-700 px-2.5 py-1 rounded transition cursor-pointer"
              >
                Switch to Version B →
              </button>
            )}
            <button
              type="button"
              onClick={() => setStudyStage('debrief')}
              className="font-bold text-white bg-blue-800 hover:bg-blue-700 px-2.5 py-1 rounded transition cursor-pointer"
            >
              Study Debrief
            </button>
            <button
              type="button"
              onClick={() => {
                setModeOverride('review');
                setViewMode('side-by-side');
                setShowAuditMarkers(true);
              }}
              className="font-bold underline text-yellow-300 hover:text-yellow-200 cursor-pointer"
            >
              Switch to Review &amp; Side-by-Side Comparison →
            </button>
          </div>
        </aside>
      ) : (
        <ComparisonBanner
          viewMode={viewMode}
          onViewModeChange={(mode) => {
            setViewMode(mode);
            if (mode === 'dark-pattern') setVariantOverride('A');
            if (mode === 'ethical') setVariantOverride('B');
          }}
          deviceView={deviceView}
          onDeviceViewChange={setDeviceView}
          showAuditMarkers={showAuditMarkers}
          onToggleAuditMarkers={() => setShowAuditMarkers(!showAuditMarkers)}
          onOpenAuditDrawer={() => setIsAuditModalOpen(true)}
          auditCount={DARK_PATTERNS_AUDIT.length}
          auditGroupCount={DARK_PATTERN_GROUPS.length}
          onSwitchToParticipant={() => {
            setModeOverride('participant');
            setViewMode(currentVariant === 'B' ? 'ethical' : 'dark-pattern');
          }}
        />
      )}

      <div className={`flex-1 flex flex-col ${deviceView === 'mobile' ? 'max-w-md mx-auto my-6 border-8 border-slate-900 rounded-[40px] overflow-hidden shadow-2xl bg-white' : 'w-full'}`}>
        <Header
          cartTotal={currentCartTotal}
          onEditSearch={() => handleStepChange('flights')}
          outboundDate={selectedOutboundDate}
          inboundDate={selectedInboundDate}
        />

        {(isReview || currentStep !== 'flights') && (
          <BookingStepper
            currentStep={currentStep}
            maxStepReached={maxStepReached}
            onStepChange={handleStepChange}
          />
        )}

        <main ref={stepContentRef} tabIndex={-1} className="flex-1 w-full mx-auto px-3 sm:px-6 py-6">
          {currentStep === 'flights' ? (
            viewMode === 'side-by-side' ? (
              <SideBySideView original={renderFlights('dark-pattern')} ethical={renderFlights('ethical')} />
            ) : (
              <div className="max-w-6xl mx-auto space-y-6">
                {isReview && (
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const nextMode = viewMode === 'dark-pattern' ? 'ethical' : 'dark-pattern';
                          setViewMode(nextMode);
                          setVariantOverride(nextMode === 'dark-pattern' ? 'A' : 'B');
                        }}
                        className={`font-bold px-3 py-1 rounded-md transition cursor-pointer ${
                          viewMode === 'dark-pattern' ? 'bg-rose-200 text-rose-900 hover:bg-rose-300' : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'
                        }`}
                      >
                        Switch to {viewMode === 'dark-pattern' ? 'Version B (Ethical Redesign)' : 'Version A (Original Prototype)'} →
                      </button>
                      <button
                        onClick={() => setViewMode('side-by-side')}
                        className="font-bold px-3 py-1 rounded-md bg-blue-100 text-blue-900 hover:bg-blue-200 transition cursor-pointer"
                      >
                        Switch to Side-by-Side Split →
                      </button>
                    </div>
                  </div>
                )}
                {renderFlights(!isReview ? (currentVariant === 'A' ? 'dark-pattern' : 'ethical') : viewMode)}
              </div>
            )
          ) : (
            <BookingAddOnView
              step={currentStep}
              viewMode={viewMode}
              selectedTier={selectedTier}
              bookings={bookings}
              onChangeBooking={changeBooking}
              onStepChange={handleStepChange}
              showAuditMarkers={showAuditMarkers}
              onOpenAuditItem={handleOpenAuditItem}
              onViewDebrief={() => setStudyStage('debrief')}
              onResetSimulation={handleResetSimulation}
            />
          )}
        </main>

      </div>

      {isReview && (
        <DarkPatternInspector
          isOpen={isAuditModalOpen}
          onClose={() => setIsAuditModalOpen(false)}
          selectedPatternId={selectedAuditId}
          onSelectPattern={setSelectedAuditId}
        />
      )}
    </div>
  );
}
