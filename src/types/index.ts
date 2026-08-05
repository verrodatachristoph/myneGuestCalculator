// Season types
export type SeasonType = 'holidayPremium' | 'holiday' | 'peak' | 'low';

export interface SeasonConfig {
  name: string;
  pricePerNight: number;
}

export type Seasons = Record<SeasonType, SeasonConfig>;

// Extras configuration
export interface Extras {
  laundryPackage: number;  // Wäschepaket pro Person pro Aufenthalt
  finalCleaning: number;   // Endreinigung pauschal pro Aufenthalt
  petFee: number;          // Haustiergebühr pauschal pro Aufenthalt
}

// Guest type
export type GuestType = 'family' | 'friends';

// Complete settings
export interface Settings {
  seasons: Seasons;
  extras: Extras;
  clubDiscountPercent: number;  // MYNE Club Rabatt in %, nur auf die Miete
}

// Person in the stay
export interface Person {
  id: string;
  name: string;
  isOwner: boolean;
}

// Stay details - now with dates
export interface Stay {
  checkIn: string;   // ISO date string YYYY-MM-DD
  checkOut: string;  // ISO date string YYYY-MM-DD
  guestType: GuestType;
  guestSharePercent: number;  // 0-200%, default 100%
  profitMargin: number;       // 0, 50, or 100 - added on top for profit
  hasPet: boolean;            // Haustier dabei - löst die Haustiergebühr aus
  persons: Person[];
}

// Season breakdown for a stay
export interface SeasonBreakdown {
  season: SeasonType;
  nights: number;
  pricePerNight: number;
  subtotal: number;
}

// Calculation results
export interface CostBreakdown {
  // Date info
  nights: number;
  seasonBreakdown: SeasonBreakdown[];

  // Raw totals
  rentFull: number;          // Bruttomiete laut Saisonkalender
  rentDiscount: number;      // MYNE Club Rabatt auf die Bruttomiete
  rentAfterDiscount: number; // Bruttomiete nach Rabatt
  rentNetDeferred: number;   // gestundeter Nettoanteil der Miete
  rentCost: number;          // in rentAfterDiscount enthaltene 10% MwSt
  laundryTotal: number;
  cleaningTotal: number;
  petTotal: number;
  totalCost: number;

  // Per participant (100%)
  rentSharePP: number;
  laundryPP: number;
  cleaningSharePP: number;
  petSharePP: number;
  perPerson: number;

  // Guest share (with multiplier)
  guestSharePercent: number;
  guestRentShare: number;
  guestCleaningShare: number;
  guestLaundry: number;
  guestPetShare: number;
  perGuest: number;
  guestTotal: number;

  // Counts
  totalPersons: number;
  guestCount: number;
}
