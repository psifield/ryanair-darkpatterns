import React from 'react';
import { PlaneTakeoff, ShoppingCart } from 'lucide-react';
import { AIRLINE } from '../data/mockData';

interface HeaderProps {
  cartTotal?: number;
  onEditSearch?: () => void;
  outboundDate?: string;
  inboundDate?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartTotal,
  onEditSearch,
  outboundDate = '4 Oct',
  inboundDate = '8 Oct',
}) => {
  return (
    <header className="bg-[#073590] text-white sticky top-0 z-30 shadow-md">
      {/* Primary Brand & Utility Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Brand Logo & Links */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-1.5">
            <PlaneTakeoff className="size-5 shrink-0 text-[#f1c40f] sm:size-6" aria-hidden="true" />
            <span className="text-base font-black tracking-tight text-white sm:text-xl">{AIRLINE.name}</span>
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-gray-200 hover:underline cursor-pointer">
            Fees
          </span>
        </div>

        {/* Right: Utility Links & Cart Badge */}
        <div className="flex items-center space-x-3 sm:space-x-5 text-xs font-medium">
          <span className="hidden sm:inline-block text-gray-200 hover:underline cursor-pointer">
            FAQs
          </span>
          <span className="hidden sm:inline-block text-gray-200 hover:underline cursor-pointer">
            My bookings
          </span>
          <span className="text-gray-200 hover:underline cursor-pointer">Log in</span>

          <button className="hidden sm:inline-block bg-[#f1c40f] hover:bg-yellow-400 text-[#073590] font-black px-3.5 py-1.5 rounded-full text-xs transition shadow-sm">
            {AIRLINE.portal}
          </button>

          {cartTotal !== undefined && (
            <div
              className="flex items-center gap-1.5 font-bold text-white text-xs bg-[#052973] px-3 py-1.5 rounded-md border border-blue-900 shadow-inner"
              title="Cart Summary"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#f1c40f]" />
              <span className="font-mono tabular-nums">£{cartTotal.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Flight Search Summary Strip */}
      <div className="bg-white border-b border-gray-200 text-[#1b2738] py-2.5 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-[#073590]">
              <span>London Stansted</span>
              <svg className="w-4 h-4 text-gray-400 mx-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              <span>Palanga</span>
            </div>
            <span className="text-xs text-gray-500 font-normal pl-2 border-l border-gray-300">
              Return • {outboundDate} - {inboundDate} • 1 Adult
            </span>
          </div>

          <button
            onClick={onEditSearch}
            className="text-xs font-semibold text-[#073590] border border-[#073590] px-3 py-1 rounded hover:bg-blue-50 transition"
          >
            Edit search
          </button>
        </div>
      </div>
    </header>
  );
};
