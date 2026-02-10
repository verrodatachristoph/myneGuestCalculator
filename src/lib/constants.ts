import type { Settings, Stay } from '@/types'

export const VAT_RATE = 0.10 // 10% MwSt Österreich - fix, nicht konfigurierbar

// Prices from MYNE Saisonverteilungsplan - Alpine Terrace Brixen im Thale
export const DEFAULT_SETTINGS: Settings = {
  seasons: {
    holidayPremium: { name: 'Bes. Feiertage (Neujahr/Ostern/Weihn.)', pricePerNight: 325 },
    holiday: { name: 'Besondere Feiertage', pricePerNight: 287.5 },
    peak: { name: 'Hauptferienzeiten', pricePerNight: 250 },
    low: { name: 'Nebenzeiten', pricePerNight: 140 },
  },
  extras: {
    touristTax: 3.5,
    laundryPackage: 20,
    finalCleaning: 205,
  },
}

// Default stay without pre-selected dates
export const DEFAULT_STAY: Stay = {
  checkIn: '',
  checkOut: '',
  guestType: 'friends',
  guestSharePercent: 100,
  profitMargin: 0,
  persons: [
    { id: '1', name: 'Eigentümer 1', isOwner: true },
    { id: '2', name: 'Eigentümer 2', isOwner: true },
    { id: '3', name: 'Gast 1', isOwner: false },
    { id: '4', name: 'Gast 2', isOwner: false },
  ],
}

export const GUEST_TYPE_LABELS: Record<'family' | 'friends', string> = {
  family: 'Familie',
  friends: 'Freunde',
}

export const SEASON_ORDER: Array<{ key: 'holidayPremium' | 'holiday' | 'peak' | 'low' }> = [
  { key: 'holidayPremium' },
  { key: 'holiday' },
  { key: 'peak' },
  { key: 'low' },
]
