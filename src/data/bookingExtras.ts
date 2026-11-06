import type { BookingStep, FareTier } from '../types/booking';

export const FAST_TRACK_PRICE = 7.49;
export const CREDIT_PRICE_FACTOR = 0.9;
export const CABIN_BAG_PRICE_PER_FLIGHT = 15;
export const RANDOM_SEAT = 'Random (Free)';
const RESERVED_SEAT_PRICE = 8;

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
  additionalLuggage: number; // Selected 10 kg cabin bags, beyond the small personal bag.
  newsletterOptIn: boolean;
  fastTrackSelected: boolean;
  insurancePlan: InsurancePlan | null; // null means the traveller has not made a choice.
  prepaidCredit: number;
  selectedParking: ParkingOption;
  selectedCarHire: CarHireOption;
}

export const EMPTY_BOOKING_CHOICES: BookingChoices = {
  selectedSeat: '',
  additionalLuggage: 0,
  newsletterOptIn: false,
  fastTrackSelected: false,
  insurancePlan: null,
  prepaidCredit: 0,
  selectedParking: 'none',
  selectedCarHire: 'none',
};

export function getSeatPrice(fare: FareTier, seat: string) {
  if (!seat || seat === RANDOM_SEAT) return 0;
  const row = Number.parseInt(seat, 10);
  const included = fare.id === 'REGULAR' && row >= 18 && row <= 33;
  return included ? 0 : RESERVED_SEAT_PRICE;
}

export function getCabinBagPricing(fare: FareTier, quantity: number) {
  const includedBags = fare.features.cabinBag10kg ? 1 : 0;
  const paidCabinBags = Math.max(0, quantity - includedBags);
  return { paidCabinBags, luggageCost: paidCabinBags * CABIN_BAG_PRICE_PER_FLIGHT * 2 };
}

export function getBookingPricing(fare: FareTier, booking: BookingChoices, isDarkPattern: boolean, step: BookingStep) {
  const fastTrackIncluded = !isDarkPattern && fare.features.fastTrack;
  const fastTrackCost = booking.fastTrackSelected && !fastTrackIncluded ? FAST_TRACK_PRICE : 0;
  const insurancePlan = booking.insurancePlan ?? (isDarkPattern && step === 'review' ? 'comprehensive' : 'none');
  const insuranceCost = INSURANCE_PLANS[insurancePlan].price;
  const seatCost = getSeatPrice(fare, booking.selectedSeat);
  const { paidCabinBags, luggageCost } = getCabinBagPricing(fare, booking.additionalLuggage);
  const creditCost = booking.prepaidCredit * CREDIT_PRICE_FACTOR;
  const parkingCost = PARKING_PRICES[booking.selectedParking];
  const carHireCost = CAR_HIRE_PRICES[booking.selectedCarHire];
  const total = fare.totalPrice + seatCost + luggageCost + fastTrackCost
    + insuranceCost + creditCost + parkingCost + carHireCost;
  return {
    fastTrackIncluded, fastTrackCost, insurancePlan, insuranceCost, seatCost,
    paidCabinBags, luggageCost, creditCost, parkingCost, carHireCost, total,
  };
}
