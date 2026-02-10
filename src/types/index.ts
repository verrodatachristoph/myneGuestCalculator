// Season types
export type SeasonType = 'holidayPremium' | 'holiday' | 'peak' | 'low';

export interface SeasonConfig {
  name: string;
  pricePerNight: number;
}

export type Seasons = Record<SeasonType, SeasonConfig>;

// Extras configuration
export interface Extras {
  touristTax: number;      // Kurtaxe pro Person pro Tag
  laundryPackage: number;  // Wäschepaket pro Person pro Aufenthalt
  finalCleaning: number;   // Endreinigung pauschal pro Aufenthalt
}

// Guest type
export type GuestType = 'family' | 'friends';

// Complete settings
export interface Settings {
  seasons: Seasons;
  extras: Extras;
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
  rentFull: number;
  rentCost: number;          // rentFull × 10% VAT
  touristTaxTotal: number;
  laundryTotal: number;
  cleaningTotal: number;
  totalCost: number;

  // Per participant (100%)
  rentSharePP: number;
  touristTaxPP: number;
  laundryPP: number;
  cleaningSharePP: number;
  perPerson: number;

  // Guest share (with multiplier)
  guestSharePercent: number;
  guestRentShare: number;
  guestCleaningShare: number;
  guestTouristTax: number;
  guestLaundry: number;
  perGuest: number;
  guestTotal: number;

  // Counts
  totalPersons: number;
  guestCount: number;
}
