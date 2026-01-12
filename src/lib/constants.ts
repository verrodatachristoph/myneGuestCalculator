import type { Settings, Stay, MultiplierKey } from '@/types'

export const VAT_RATE = 0.10 // 10% MwSt Österreich - fix, nicht konfigurierbar

export const DEFAULT_SETTINGS: Settings = {
  seasons: {
    peak: { name: 'Spitzensaison', pricePerNight: 180 },
    high: { name: 'Hauptsaison', pricePerNight: 150 },
    mid: { name: 'Zwischensaison', pricePerNight: 120 },
    low: { name: 'Nebensaison', pricePerNight: 90 },
  },
  extras: {
    touristTax: 3.5,
    laundryPackage: 15,
    finalCleaning: 95,
  },
  multipliers: {
    withMeFamily: 0.3,
    withMeFriends: 0.5,
    withoutMeFamily: 0.6,
    withoutMeFriends: 0.8,
  },
}

export const DEFAULT_STAY: Stay = {
  season: 'high',
  nights: 7,
  withOwner: true,
  guestType: 'friends',
  persons: [
    { id: '1', name: 'Eigentümer', isOwner: true },
    { id: '2', name: 'Gast 1', isOwner: false },
    { id: '3', name: 'Gast 2', isOwner: false },
    { id: '4', name: 'Gast 3', isOwner: false },
  ],
}

export const MULTIPLIER_LABELS: Record<MultiplierKey, string> = {
  withMeFamily: 'Mit mir + Familie',
  withMeFriends: 'Mit mir + Freunde',
  withoutMeFamily: 'Ohne mich + Familie',
  withoutMeFriends: 'Ohne mich + Freunde',
}

export const SEASON_ORDER: Array<{ key: 'peak' | 'high' | 'mid' | 'low' }> = [
  { key: 'peak' },
  { key: 'high' },
  { key: 'mid' },
  { key: 'low' },
]
