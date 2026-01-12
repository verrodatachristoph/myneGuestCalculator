import type { Settings, Stay } from '@/types'

export const VAT_RATE = 0.10 // 10% MwSt Österreich - fix, nicht konfigurierbar

// Prices from MYNE Saisonverteilungsplan - Alpine Terrace Brixen im Thale
export const DEFAULT_SETTINGS: Settings = {
  seasons: {
    peak: { name: 'Spitzensaison', pricePerNight: 250 },
    high: { name: 'Hauptsaison', pricePerNight: 199 },
    mid: { name: 'Zwischensaison', pricePerNight: 173 },
    low: { name: 'Nebensaison', pricePerNight: 107 },
  },
  extras: {
    touristTax: 3.5,
    laundryPackage: 15,
    finalCleaning: 95,
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

export const SEASON_ORDER: Array<{ key: 'peak' | 'high' | 'mid' | 'low' }> = [
  { key: 'peak' },
  { key: 'high' },
  { key: 'mid' },
  { key: 'low' },
]
