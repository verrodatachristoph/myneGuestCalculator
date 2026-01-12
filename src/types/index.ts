// Season types
export type SeasonType = 'peak' | 'high' | 'mid' | 'low';

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

// Multiplier keys
export type MultiplierKey =
  | 'withMeFamily'
  | 'withMeFriends'
  | 'withoutMeFamily'
  | 'withoutMeFriends';

export type Multipliers = Record<MultiplierKey, number>;

// Complete settings
export interface Settings {
  seasons: Seasons;
  extras: Extras;
  multipliers: Multipliers;
}

// Person in the stay
export interface Person {
  id: string;
  name: string;
  isOwner: boolean;
}

// Stay details
export interface Stay {
  season: SeasonType;
  nights: number;
  withOwner: boolean;
  guestType: GuestType;
  persons: Person[];
}

// Calculation results
export interface CostBreakdown {
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
  multiplierKey: MultiplierKey;
  multiplier: number;
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
