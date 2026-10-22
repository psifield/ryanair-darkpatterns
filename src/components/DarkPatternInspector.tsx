import React from 'react';
import { DARK_PATTERNS_AUDIT, DARK_PATTERN_GROUPS } from '../data/mockData';
import { DarkPatternAnnotation } from '../types/booking';
import { X, AlertTriangle, ShieldCheck, Scale, Brain, Lightbulb, ChevronDown } from 'lucide-react';

interface DarkPatternInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPatternId?: string | null;
  onSelectPattern: (id: string) => void;
}

export const DarkPatternInspector: React.FC<DarkPatternInspectorProps> = ({
  isOpen,
  onClose,
  selectedPatternId,
  onSelectPattern,
}) => {
  if (!isOpen) return null;

  const activePattern: DarkPatternAnnotation =
    DARK_PATTERNS_AUDIT.find((p) => p.id === selectedPatternId) || DARK_PATTERNS_AUDIT[0];

  const renderPattern = (item: DarkPatternAnnotation, subtopic = false) => {
    const isSelected = item.id === activePattern.id;
    return (
      <button
        key={item.id}
        onClick={() => onSelectPattern(item.id)}
        aria-label={`DP ${item.number}: ${item.category} · ${item.title}`}
        aria-current={isSelected ? 'true' : undefined}
        title={item.title}
        className={`w-full text-left p-3 rounded-lg text-xs transition cursor-pointer flex flex-col gap-1 ${
          isSelected ? 'bg-blue-900 text-white shadow-xs font-semibold' : 'hover:bg-gray-200/70 text-gray-700'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {!subtopic && <span className="text-[10px] font-bold opacity-80 shrink-0">DP {item.number}</span>}
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${
            isSelected ? 'bg-blue-800 text-blue-200' : 'bg-gray-200 text-gray-600'
          }`}>
            {item.category}
          </span>
        </div>
        <div className="line-clamp-1 font-bold">{item.title}</div>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-rose-500/20 text-rose-400 rounded-md border border-rose-500/30">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Ryanair UX Audit: Fare-choice Evidence
              </h2>
              <p className="text-xs text-slate-400">
                Three main candidates; DP 1/5/6/7 are context. DP 3 friction overlaps DP 4.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close audit"
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Sidebar List + Detail Panel */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Numbered groups retain individually selectable audit records. */}
          <div className="w-full md:w-72 max-h-48 md:max-h-none bg-slate-50 border-r border-gray-200 overflow-y-auto p-3 space-y-1.5 shrink-0">
            <div className="text-[11px] font-bold text-gray-500 px-2 py-1">
              {DARK_PATTERN_GROUPS.length} groups · {DARK_PATTERNS_AUDIT.length} audit records
            </div>
            {DARK_PATTERN_GROUPS.map((group) => {
              if (group.items.length === 1) return renderPattern(group.items[0]);
              const isActiveGroup = group.items.some(item => item.id === activePattern.id);
              return (
                <details key={group.number} open={isActiveGroup} className="group rounded-lg border border-slate-200">
                  <summary className={`list-none cursor-pointer p-3 text-xs font-bold rounded-lg flex items-center justify-between gap-2 ${
                    isActiveGroup ? 'bg-blue-100 text-blue-950' : 'text-gray-700 hover:bg-gray-200/70'
                  }`}>
                    <span>
                      <span className="block text-[10px] opacity-80">DP {group.number} · {group.items.length} records</span>
                      Visual & choice architecture
                    </span>
                    <ChevronDown aria-hidden="true" className="w-4 h-4 shrink-0 group-open:rotate-180" />
                  </summary>
                  <div className="pl-3 pr-1 pb-1 space-y-1 border-l-2 border-blue-200 ml-3">
                    {group.items.map(item => renderPattern(item, true))}
                  </div>
                </details>
              );
            })}
          </div>

          {/* Right Area: Deep Dive for Selected Pattern */}
          <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-5 bg-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded border border-rose-200">
                  {activePattern.category}
                </span>
                <span className="text-xs text-gray-500">Candidate label: {activePattern.patternType}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900">{activePattern.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Target Element: <span className="font-semibold text-gray-700">{activePattern.elementTarget}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Retrospective draft, 23 Oct 2026. B predates this audit; effects and team ratings remain unmeasured. See root AUDIT.md.
              </p>
            </div>

            {/* Before vs After Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original Dark Pattern Behavior */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Observation & Evidence Status</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {activePattern.originalBehavior}
                </p>
              </div>

              {/* Ethical UI Fix */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Existing B & Proposed Repair</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {activePattern.ethicalFix}
                </p>
              </div>
            </div>

            {/* Behavioral Psychology Mechanism */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1.5">
                <Brain className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Mechanism Hypothesis & Whose Goal Wins</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                {activePattern.psychologicalImpact}
              </p>
            </div>

            {/* Regulatory & Legal Implications */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs mb-1.5">
                <Scale className="w-4 h-4 text-slate-700 shrink-0" />
                <span>Evidence, Course Source & Limits</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activePattern.regulatoryContext}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-gray-500">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Switch to Split View in the top banner for side-by-side live comparison.</span>
          </div>

          <button
            onClick={onClose}
            className="bg-[#073590] hover:bg-[#052973] text-white font-bold px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Got it, close audit
          </button>
        </div>
      </div>
    </div>
  );
};
