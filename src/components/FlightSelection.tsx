import React from 'react';
import { FlightLeg } from '../types/booking';
import { Check, Info, Plane } from 'lucide-react';
import { AuditMarker } from './AuditMarker';

interface FlightSelectionProps {
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
  isDarkPattern: boolean;
  showAuditMarkers?: boolean;
  onOpenAuditItem?: (id: string) => void;
}

export const FlightSelection: React.FC<FlightSelectionProps> = ({
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
  isDarkPattern,
  showAuditMarkers = false,
  onOpenAuditItem,
}) => {
  const bothSelected = outboundSelected && inboundSelected;

  return (
    <div className="space-y-6">
      {/* Selected Flights Summary Strip (when both selected) */}
      {bothSelected && (
        <section
          className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-xs transition-all"
          data-purpose="selected-flights-strip"
        >
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h2 className="text-lg font-bold text-[#073590]">Your selected flights</h2>
            </div>
            <button
              onClick={onResetFlights}
              className="text-xs font-semibold text-[#073590] hover:underline"
            >
              Edit flights
            </button>
          </div>

          <div className="space-y-4">
            {/* Outbound Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
              <div className="flex items-center gap-4">
                <div className="text-center font-bold px-2.5 py-1 bg-gray-100 rounded">
                  <span className="block text-lg leading-none">04</span>
                  <span className="text-[10px] text-gray-500 uppercase">OCT</span>
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900">
                    {outboundFlight.departureTime}{' '}
                    <span className="text-xs font-normal text-gray-500">{outboundFlight.departureAirport}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Flight {outboundFlight.flightNumber} • {outboundFlight.duration}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">
                  {outboundFlight.arrivalTime}{' '}
                  <span className="text-xs font-normal text-gray-500">{outboundFlight.arrivalAirport}</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600">
                  Selected (£{outboundFlight.basePrice.toFixed(2)})
                </div>
              </div>
            </div>

            {/* Inbound Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <div className="text-center font-bold px-2.5 py-1 bg-gray-100 rounded">
                  <span className="block text-lg leading-none">08</span>
                  <span className="text-[10px] text-gray-500 uppercase">OCT</span>
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900">
                    {inboundFlight.departureTime}{' '}
                    <span className="text-xs font-normal text-gray-500">{inboundFlight.departureAirport}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Flight {inboundFlight.flightNumber} • {inboundFlight.duration}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">
                  {inboundFlight.arrivalTime}{' '}
                  <span className="text-xs font-normal text-gray-500">{inboundFlight.arrivalAirport}</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600">
                  Selected (£{inboundFlight.basePrice.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flight Selection Process Area (visible when picking or reviewing) */}
      <div className={`space-y-6 ${bothSelected ? 'hidden md:block' : ''}`}>
        {/* 1. Outbound Flight Segment */}
        <section className={`bg-white rounded-lg border overflow-hidden shadow-xs relative transition ${
          outboundSelected ? 'border-emerald-600/70' : 'border-gray-200'
        }`}>
          {/* Header Strip */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#073590] -rotate-45" />
              <h2 className="text-base font-bold text-[#073590]">
                {outboundFlight.departureAirport} to {outboundFlight.arrivalAirport}
              </h2>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span>Sort flights by</span>
              <select className="text-xs py-1 px-2 border border-gray-300 rounded font-semibold text-gray-700 bg-white">
                <option>Price (Low to High)</option>
                <option>Departure time</option>
              </select>
            </div>
          </div>

          {/* Date Carousel Ribbon */}
          <div className="grid grid-cols-5 text-center border-b border-gray-200 divide-x divide-gray-200 bg-white">
            {outboundFlight.availableDates.map((item) => {
              const isCurrent = item.date === selectedOutboundDate;
              if (!item.isAvailable) {
                return (
                  <div key={item.date} className="p-2.5 opacity-40 cursor-not-allowed bg-gray-50/50">
                    <span className="block text-xs font-bold text-gray-400">{item.date}</span>
                    <span className="text-[11px] text-gray-400">{item.dayOfWeek}</span>
                    <span className="text-xs block mt-1">✈️</span>
                  </div>
                );
              }
              return (
                <button
                  key={item.date}
                  onClick={() => onSelectOutboundDate(item.date)}
                  className={`p-2.5 transition text-left sm:text-center ${
                    isCurrent
                      ? 'bg-blue-50/70 border-b-4 border-[#073590]'
                      : 'hover:bg-blue-50/40'
                  }`}
                >
                  <span className={`block text-xs font-bold ${isCurrent ? 'text-[#073590]' : 'text-gray-700'}`}>
                    {item.date}
                  </span>
                  <span className={`text-[11px] ${isCurrent ? 'text-[#073590] font-semibold' : 'text-gray-500'}`}>
                    {item.dayOfWeek}
                  </span>
                  <span className={`text-xs block mt-1 font-bold ${isCurrent ? 'text-[#073590] text-sm font-black' : 'text-[#073590]'}`}>
                    £{item.price?.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Outbound Flight Card Details */}
          <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-8 flex-1">
              <div className="flex flex-col items-center">
                <svg className="h-6 w-auto text-[#f1c40f]" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50,5 C25.14,5 5,25.14 5,50 C5,74.86 25.14,95 50,95 C74.86,95 95,74.86 95,50 C95,25.14 74.86,5 50,5 Z M76,46 L62,49 L46,31 L40,33 L49,52 L36,55 L31,50 L27,51 L30,59 L35,67 L39,66 L38,59 L52,56 L47,76 L53,77 L66,54 L80,51 C82,50 82,47 76,46 Z" />
                </svg>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider">Ryanair</span>
              </div>

              <div className="flex-1 max-w-sm flex items-center justify-between gap-3">
                <div>
                  <div className="text-2xl font-black text-gray-900 leading-none">{outboundFlight.departureTime}</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">{outboundFlight.departureAirport}</div>
                </div>

                {/* Duration bar */}
                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[11px] font-medium text-gray-500">{outboundFlight.flightNumber}</span>
                  <div className="w-full flex items-center gap-1 my-1">
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                    <svg className="w-3.5 h-3.5 text-[#f1c40f] rotate-90" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                  </div>
                  <span className="text-[11px] text-gray-400">{outboundFlight.duration}</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-gray-900 leading-none">{outboundFlight.arrivalTime}</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">{outboundFlight.arrivalAirport}</div>
                </div>
              </div>
            </div>

            {/* Price & Action CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 gap-2">
              <div className="text-left sm:text-right">
                <span className="text-[11px] block text-gray-500">Basic Fare</span>
                <span className="text-2xl font-black text-[#073590] leading-none">
                  £{outboundFlight.basePrice.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col items-end relative">
                {/* DARK PATTERN: Fake Scarcity badge */}
                {isDarkPattern && outboundFlight.seatsLeft && (
                  <div className={`relative mb-1 ${showAuditMarkers ? 'mt-5' : ''}`}>
                    <span className="text-[11px] text-blue-700 font-bold">
                      {outboundFlight.seatsLeft} seats left at this price
                    </span>
                    {showAuditMarkers && (
                      <AuditMarker
                        number={1}
                        auditId="dp-scarcity"
                        title="Context: Scarcity Accuracy Unverified"
                        onOpenAuditItem={onOpenAuditItem}
                      />
                    )}
                  </div>
                )}

                <button
                  onClick={onToggleOutbound}
                  className={`font-bold px-6 py-2 rounded text-sm transition ${
                    outboundSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#073590] hover:bg-[#052973] text-white shadow-xs'
                  }`}
                >
                  {outboundSelected ? 'Selected ✓' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Prompt Banner Between Flights */}
        <div className="text-center py-1">
          {isDarkPattern ? (
            <div className="inline-flex items-center gap-2 bg-[#073590] text-white text-xs font-medium px-4 py-2 rounded-md shadow-sm">
              <Info className="w-4 h-4 text-[#f1c40f]" />
              <span>Choose a flight to continue</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#073590] text-xs font-medium px-4 py-2 rounded-md shadow-2xs">
              <Info className="w-4 h-4 text-[#073590]" />
              <span>Select your outbound and return flights above to view fares with transparent all-inclusive pricing</span>
            </div>
          )}
        </div>

        {/* 2. Inbound Return Flight Segment */}
        <section className={`bg-white rounded-lg border overflow-hidden shadow-xs relative transition ${
          inboundSelected ? 'border-emerald-600/70' : 'border-gray-200'
        }`}>
          {/* Header Strip */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#073590] rotate-[135deg]" />
              <h2 className="text-base font-bold text-[#073590]">
                {inboundFlight.departureAirport} to {inboundFlight.arrivalAirport}
              </h2>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span>Sort flights by</span>
              <select className="text-xs py-1 px-2 border border-gray-300 rounded font-semibold text-gray-700 bg-white">
                <option>Price (Low to High)</option>
                <option>Departure time</option>
              </select>
            </div>
          </div>

          {/* Date Carousel Ribbon */}
          <div className="grid grid-cols-5 text-center border-b border-gray-200 divide-x divide-gray-200 bg-white">
            {inboundFlight.availableDates.map((item) => {
              const isCurrent = item.date === selectedInboundDate;
              if (!item.isAvailable) {
                return (
                  <div key={item.date} className="p-2.5 opacity-40 cursor-not-allowed bg-gray-50/50">
                    <span className="block text-xs font-bold text-gray-400">{item.date}</span>
                    <span className="text-[11px] text-gray-400">{item.dayOfWeek}</span>
                    <span className="text-xs block mt-1">✈️</span>
                  </div>
                );
              }
              return (
                <button
                  key={item.date}
                  onClick={() => onSelectInboundDate(item.date)}
                  className={`p-2.5 transition text-left sm:text-center ${
                    isCurrent
                      ? 'bg-blue-50/70 border-b-4 border-[#073590]'
                      : 'hover:bg-blue-50/40'
                  }`}
                >
                  <span className={`block text-xs font-bold ${isCurrent ? 'text-[#073590]' : 'text-gray-700'}`}>
                    {item.date}
                  </span>
                  <span className={`text-[11px] ${isCurrent ? 'text-[#073590] font-semibold' : 'text-gray-500'}`}>
                    {item.dayOfWeek}
                  </span>
                  <span className={`text-xs block mt-1 font-bold ${isCurrent ? 'text-[#073590] text-sm font-black' : 'text-[#073590]'}`}>
                    £{item.price?.toFixed(2)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Inbound Flight Card Details */}
          <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 sm:gap-8 flex-1">
              <div className="flex flex-col items-center">
                <svg className="h-6 w-auto text-[#f1c40f]" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50,5 C25.14,5 5,25.14 5,50 C5,74.86 25.14,95 50,95 C74.86,95 95,74.86 95,50 C95,25.14 74.86,5 50,5 Z M76,46 L62,49 L46,31 L40,33 L49,52 L36,55 L31,50 L27,51 L30,59 L35,67 L39,66 L38,59 L52,56 L47,76 L53,77 L66,54 L80,51 C82,50 82,47 76,46 Z" />
                </svg>
                <span className="text-[10px] font-bold text-gray-500 tracking-wider">Ryanair</span>
              </div>

              <div className="flex-1 max-w-sm flex items-center justify-between gap-3">
                <div>
                  <div className="text-2xl font-black text-gray-900 leading-none">{inboundFlight.departureTime}</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">{inboundFlight.departureAirport}</div>
                </div>

                {/* Duration bar */}
                <div className="flex-1 flex flex-col items-center px-2">
                  <span className="text-[11px] font-medium text-gray-500">{inboundFlight.flightNumber}</span>
                  <div className="w-full flex items-center gap-1 my-1">
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                    <svg className="w-3.5 h-3.5 text-[#f1c40f] rotate-90" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                  </div>
                  <span className="text-[11px] text-gray-400">{inboundFlight.duration}</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-gray-900 leading-none">{inboundFlight.arrivalTime}</div>
                  <div className="text-xs font-medium text-gray-500 mt-1">{inboundFlight.arrivalAirport}</div>
                </div>
              </div>
            </div>

            {/* Price & Action CTA */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 gap-2">
              <div className="text-left sm:text-right">
                <span className="text-[11px] block text-gray-500">Basic Fare</span>
                <span className="text-2xl font-black text-[#073590] leading-none">
                  £{inboundFlight.basePrice.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-col items-end relative">
                {/* DARK PATTERN: Fake Scarcity badge */}
                {isDarkPattern && inboundFlight.seatsLeft && (
                  <div className={`relative mb-1 ${showAuditMarkers ? 'mt-5' : ''}`}>
                    <span className="text-[11px] text-blue-700 font-bold">
                      {inboundFlight.seatsLeft} seats left at this price
                    </span>
                    {showAuditMarkers && (
                      <AuditMarker
                        number={1}
                        auditId="dp-scarcity"
                        title="Context: Scarcity Accuracy Unverified"
                        onOpenAuditItem={onOpenAuditItem}
                      />
                    )}
                  </div>
                )}

                <button
                  onClick={onToggleInbound}
                  className={`font-bold px-6 py-2 rounded text-sm transition ${
                    inboundSelected
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#073590] hover:bg-[#052973] text-white shadow-xs'
                  }`}
                >
                  {inboundSelected ? 'Selected ✓' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
