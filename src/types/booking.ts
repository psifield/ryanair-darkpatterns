export type ViewMode = 'dark-pattern' | 'ethical' | 'side-by-side';
export type DeviceView = 'desktop' | 'mobile';

export interface FlightLeg {
  id: string;
  flightNumber: string;
  departureAirport: string;
  departureCode: string;
  arrivalAirport: string;
  arrivalCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  date: string;
  dayOfWeek: string;
  basePrice: number;
  seatsLeft?: number;
  availableDates: {
    date: string;
    dayOfWeek: string;
    price: number | null;
    isAvailable: boolean;
  }[];
}

export type FareTierId = 'BASIC' | 'REGULAR' | 'PLUS' | 'FLEXI_PLUS';

export interface FareTier {
  id: FareTierId;
  name: string;
  tagline: string;
  surchargePerFlight: number; // e.g. 29.25
  totalPrice: number; // e.g. 131.36 + 2 * 29.25 = 189.86
  roundtripSurcharge: number; // 58.50
  imageUrl?: string;
  features: {
    smallBag: boolean;
    reservedSeat: boolean | string;
    priorityBoarding: boolean;
    cabinBag10kg: boolean;
    checkedBag20kg: boolean;
    fastTrack: boolean;
    flexibleChange: boolean;
  };
}

export interface DarkPatternAnnotation {
  id: string;
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  title: string;
  patternType: string;
  category:
    | 'Scarcity & Urgency'
    | 'Visual Interference'
    | 'Price Framing'
    | 'Upsell Interruption'
    | 'Emotional Pressure'
    | 'Baggage Warning'
    | 'Default Selection'
    | 'Obstruction & Roadblocks'
    | 'Social Proof & Sunk Cost';
  elementTarget: string;
  originalBehavior: string;
  ethicalFix: string;
  psychologicalImpact: string;
  regulatoryContext: string;
}

export interface BookingState {
  outboundSelected: boolean;
  inboundSelected: boolean;
  outboundDate: string;
  inboundDate: string;
  selectedTier: FareTierId;
  showUpsellModal: boolean;
  step: 'flights' | 'seats' | 'bags' | 'extras' | 'review';
  selectedSeat?: string;
  additionalLuggage?: number;
  newsletterOptIn: boolean;
}
