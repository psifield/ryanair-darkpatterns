import React from 'react';
import { DarkPatternAnnotation } from '../types/booking';

interface AuditMarkerProps {
  number: DarkPatternAnnotation['number'];
  auditId: string;
  title: string;
  label?: string;
  align?: 'left' | 'right';
  onOpenAuditItem?: (id: string) => void;
}

export const AuditMarker: React.FC<AuditMarkerProps> = ({
  number,
  auditId,
  title,
  label,
  align = 'right',
  onOpenAuditItem,
}) => (
  <button
    type="button"
    onClick={(event) => {
      event.stopPropagation();
      onOpenAuditItem?.(auditId);
    }}
    className={`absolute bottom-full ${align === 'left' ? 'left-0' : 'right-0'} z-20 whitespace-nowrap rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-[15px] normal-case tracking-normal text-white shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700`}
    title={title}
    aria-label={`DP ${number}: ${title}`}
  >
    ⚠️ DP {number}{label && ` · ${label}`}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-full right-3 border-x-4 border-x-transparent border-t-4 border-t-rose-500"
    />
  </button>
);
