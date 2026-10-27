import React, { useState } from 'react';
import { Check, X, ShieldAlert, Sparkles, Image as ImageIcon } from 'lucide-react';
import { AuditMarker } from './AuditMarker';

interface FastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFastTrack: () => void;
  onSkip: () => void;
  isDarkPattern?: boolean;
  showAuditMarkers?: boolean;
  onOpenAuditItem?: (id: string) => void;
}

export const FastTrackModal: React.FC<FastTrackModalProps> = ({
  isOpen,
  onClose,
  onAddFastTrack,
  onSkip,
  isDarkPattern = true,
  showAuditMarkers = false,
  onOpenAuditItem,
}) => {
  const [showOriginalCapture, setShowOriginalCapture] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Bar */}
        <div className="bg-[#073590] text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold relative">
          <div className="flex items-center gap-2">
            {showAuditMarkers && isDarkPattern && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAuditItem?.('dp-fast-track-roadblock');
                }}
                className="whitespace-nowrap rounded-full bg-rose-500 hover:bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs cursor-pointer flex items-center gap-1 transition"
                title="DP 8: Fast Track Interstitial Roadblock & Queue Anxiety Framing"
              >
                ⚠️ DP 8 · Roadblock
              </button>
            )}
            <span className="bg-[#f1c40f] text-[#073590] text-[10px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase">
              Post-Seat Upsell
            </span>
            <span>Security Fast Track Roadblock</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOriginalCapture(!showOriginalCapture)}
              className="flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition text-blue-100 cursor-pointer"
              title="Toggle original real-site capture screenshot"
            >
              <ImageIcon className="w-3 h-3 text-[#f1c40f]" />
              <span>{showOriginalCapture ? 'Back to Interactive' : 'Original Capture'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode: Original Real-Site Capture */}
        {showOriginalCapture ? (
          <div className="p-4 bg-gray-900 text-white space-y-3">
            <div className="text-xs text-gray-300 flex items-center justify-between">
              <span>Original Ryanair Capture: Roadblock modal after Seats</span>
              <span className="font-mono text-[10px] text-gray-400">/assets/aistudio/image_27e49d5b.png</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-700 bg-black flex items-center justify-center max-h-[460px]">
              <img
                src="/assets/aistudio/image_27e49d5b.png"
                alt="Ryanair Fast Track modal after seats selection"
                className="w-full h-auto object-contain max-h-[460px]"
              />
            </div>
            <button
              onClick={() => setShowOriginalCapture(false)}
              className="w-full py-2 bg-[#073590] hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
            >
              Return to Interactive Dialog
            </button>
          </div>
        ) : (
          /* View Mode: Interactive Reconstructed Component */
          <div>
            {/* Visual Header / Graphic Banner */}
            <div className="relative bg-[#fed7aa]/20 border-b border-gray-100 overflow-hidden">
              {/* Illustration Banner */}
              <div className="relative h-44 sm:h-48 w-full bg-linear-to-b from-blue-50/50 to-amber-50/40 flex items-center justify-center overflow-hidden">
                {/* Embedded Authentic Graphic */}
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <div className="relative max-w-sm w-full mx-auto flex items-center justify-center">
                    <div className="relative rounded-lg overflow-hidden shadow-xs border border-amber-200/80 bg-white">
                      <img
                        src="/assets/aistudio/fast_track_graphic.png"
                        alt="Fast Track queue comparison: Everyone else queue vs Fast Track lane"
                        className="w-full max-h-40 object-contain block"
                      />
                    </div>
                  </div>
                </div>

                {/* FAST TRACK badge */}
                <div className="absolute top-3 right-4 bg-[#073590] text-white font-black text-xs px-2.5 py-1 rounded shadow-md tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#f1c40f]" />
                  <span>FAST TRACK</span>
                </div>
              </div>
            </div>

            {/* Modal Body Copy */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#073590] tracking-tight">
                    Skip long security queues with Fast Track
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                    Add Fast Track to your booking to get through security quicker.
                  </p>
                </div>
                {showAuditMarkers && isDarkPattern && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAuditItem?.('dp-fast-track-roadblock');
                    }}
                    className="shrink-0 whitespace-nowrap rounded-full bg-rose-500 hover:bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs cursor-pointer flex items-center gap-1 transition self-start"
                    title="DP 8: Queue Anxiety & Loss Framing"
                  >
                    ⚠️ DP 8 · Queue Loss Framing
                  </button>
                )}
              </div>

              {/* How to use */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">How to use:</h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span>Look for the dedicated Fast Track Lane at security.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span>Show your boarding pass and skip the long security queues.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span>Dedicated security lane to make sure you get to your gate quicker.</span>
                  </li>
                </ul>
              </div>

              {/* Dotted border separator matching Ryanair */}
              <div className="border-t border-dashed border-gray-300 pt-4" />

              {/* Pricing & Decision Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[11px] text-gray-500 font-medium block">From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#073590]">£7.49</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block">Per person, per flight</span>
                </div>

                <div className="flex items-center justify-end gap-3 w-full sm:w-auto flex-wrap">
                  {showAuditMarkers && isDarkPattern && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenAuditItem?.('dp-fast-track-roadblock');
                      }}
                      className="whitespace-nowrap rounded-full bg-rose-500 hover:bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs cursor-pointer flex items-center gap-1 transition"
                      title="DP 8: Asymmetric Action Contrast"
                    >
                      ⚠️ DP 8 · Visual Contrast
                    </button>
                  )}

                  <button
                    onClick={onSkip}
                    className="text-xs font-bold text-[#073590] hover:text-blue-800 hover:underline px-3 py-2 cursor-pointer transition"
                  >
                    No, thanks
                  </button>

                  <button
                    onClick={onAddFastTrack}
                    className="bg-[#f1c40f] hover:bg-[#e3af15] text-[#073590] font-black text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md transition transform active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Add Fast Track</span>
                  </button>
                </div>
              </div>

              {/* Deceptive Pattern UX Note */}
              {isDarkPattern && (
                <div className="mt-2 bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Dark Pattern Analysis (Roadblock & Scarcity Cue):</strong> Intercepts seat selection with a high-pressure queue fear graphic before allowing progression to baggage, steering travellers toward an optional £7.49 airport add-on.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
