import React from 'react';
import { ViewMode, DeviceView } from '../types/booking';
import { Eye, Columns, AlertTriangle, Smartphone, Monitor, BookOpen } from 'lucide-react';

interface ComparisonBannerProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  deviceView: DeviceView;
  onDeviceViewChange: (device: DeviceView) => void;
  showAuditMarkers: boolean;
  onToggleAuditMarkers: () => void;
  onOpenAuditDrawer: () => void;
  auditCount: number;
  auditGroupCount: number;
}

export const ComparisonBanner: React.FC<ComparisonBannerProps> = ({
  viewMode,
  onViewModeChange,
  deviceView,
  onDeviceViewChange,
  showAuditMarkers,
  onToggleAuditMarkers,
  onOpenAuditDrawer,
  auditCount,
  auditGroupCount,
}) => {
  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50 px-3 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: App Title and Dark Pattern count badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-100">
              Ryanair UX Audit & Comparison
            </span>
          </div>

          <button
            onClick={onOpenAuditDrawer}
            className="flex items-center gap-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>{auditGroupCount} groups · {auditCount} audit records</span>
          </button>
        </div>

        {/* Center: Mode Switcher (Dark Pattern vs Ethical vs Split View) */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onViewModeChange('dark-pattern')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'dark-pattern'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-300"></span>
            <span>Original Prototype</span>
          </button>

          <button
            onClick={() => onViewModeChange('ethical')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'ethical'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
            <span>Ethical Redesign</span>
          </button>

          <button
            onClick={() => onViewModeChange('side-by-side')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'side-by-side'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Side-by-Side Split</span>
          </button>
        </div>

        {/* Right: Controls & Audit Hotspot Toggle */}
        <div className="flex items-center gap-2">
          {/* Audit Hotspots Toggle */}
          <button
            onClick={onToggleAuditMarkers}
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
              showAuditMarkers
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Toggle clickable annotations directly on the UI"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Show Audit Markers</span>
          </button>

          {/* Device Frame Viewport Toggle (Desktop vs Mobile) */}
          <div className="hidden lg:flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => onDeviceViewChange('desktop')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                deviceView === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeviceViewChange('mobile')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                deviceView === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Device Frame"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Full Audit Handbook Button */}
          <button
            onClick={onOpenAuditDrawer}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Full UX Audit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
