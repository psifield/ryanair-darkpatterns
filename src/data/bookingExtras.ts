import type { FareTier } from '../types/booking';

export const FAST_TRACK_PRICE = 7.49;
export const CREDIT_PRICE_FACTOR = 0.9;

export const INSURANCE_PLANS = {
  none: { label: 'No insurance', price: 0 },
  standard: { label: 'Standard', price: 4.68 },
  plus: { label: 'Plus', price: 6.08 },
  comprehensive: { label: 'Comprehensive', price: 14.50 },
  annual: { label: 'Annual Standard', price: 28.18 },
} as const;

export const PARKING_PRICES = {
  none: 0,
  'long-stay': 39.96,
  'short-stay': 50,
  'meet-greet': 65,
} as const;

export const CAR_HIRE_PRICES = {
  none: 0,
  economy: 78,
  estate: 96,
  suv: 119.20,
} as const;

export type InsurancePlan = keyof typeof INSURANCE_PLANS;
export type ParkingOption = keyof typeof PARKING_PRICES;
export type CarHireOption = keyof typeof CAR_HIRE_PRICES;

export interface BookingChoices {
  selectedSeat: string;
  additionalLuggage: number;
  newsletterOptIn: boolean;
  fastTrackSelected: boolean;
  insurancePlan: InsurancePlan;
  prepaidCredit: number;
  selectedParking: ParkingOption;
  selectedCarHire: CarHireOption;
}

export const EMPTY_BOOKING_CHOICES: BookingChoices = {
  selectedSeat: '',
  additionalLuggage: 0,
  newsletterOptIn: false,
  fastTrackSelected: false,
  insurancePlan: 'none',
  prepaidCredit: 0,
  selectedParking: 'none',
  selectedCarHire: 'none',
};

export function getBookingPricing(fare: FareTier, booking: BookingChoices, isDarkPattern: boolean) {
  const fastTrackIncluded = !isDarkPattern && fare.features.fastTrack;
  const chargeFastTrack = booking.fastTrackSelected && !fastTrackIncluded;
  const seatPrice = /^(15|16)/.test(booking.selectedSeat) ? 8 : 0;
  const total = fare.totalPrice + seatPrice + booking.additionalLuggage * 30
    + (chargeFastTrack ? FAST_TRACK_PRICE : 0) + INSURANCE_PLANS[booking.insurancePlan].price
    + booking.prepaidCredit * CREDIT_PRICE_FACTOR + PARKING_PRICES[booking.selectedParking]
    + CAR_HIRE_PRICES[booking.selectedCarHire];
  return { fastTrackIncluded, chargeFastTrack, total };
}
