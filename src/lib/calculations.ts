import type { Settings, Stay, CostBreakdown, MultiplierKey } from '@/types'
import { VAT_RATE } from './constants'

export function getMultiplierKey(withOwner: boolean, guestType: 'family' | 'friends'): MultiplierKey {
  if (withOwner && guestType === 'family') return 'withMeFamily'
  if (withOwner && guestType === 'friends') return 'withMeFriends'
  if (!withOwner && guestType === 'family') return 'withoutMeFamily'
  return 'withoutMeFriends'
}

export function calculateCosts(settings: Settings, stay: Stay): CostBreakdown {
  const { seasons, extras, multipliers } = settings
  const { season, nights, withOwner, guestType, persons } = stay

  const totalPersons = persons.length
  const guestCount = persons.filter((p) => !p.isOwner).length

  // Schritt 1: Gesamtkosten berechnen
  const rentFull = seasons[season].pricePerNight * nights
  const rentCost = rentFull * VAT_RATE // Nur 10% MwSt sind echte Kosten
  const touristTaxTotal = extras.touristTax * totalPersons * nights
  const laundryTotal = extras.laundryPackage * totalPersons
  const cleaningTotal = extras.finalCleaning
  const totalCost = rentCost + touristTaxTotal + laundryTotal + cleaningTotal

  // Schritt 2: Kosten pro Teilnehmer (bei 100%)
  const rentSharePP = totalPersons > 0 ? rentCost / totalPersons : 0
  const touristTaxPP = extras.touristTax * nights // Pro Person
  const laundryPP = extras.laundryPackage // Pro Person
  const cleaningSharePP = totalPersons > 0 ? cleaningTotal / totalPersons : 0
  const perPerson = rentSharePP + touristTaxPP + laundryPP + cleaningSharePP

  // Schritt 3: Multiplikator bestimmen
  const multiplierKey = getMultiplierKey(withOwner, guestType)
  const multiplier = multipliers[multiplierKey]

  // Schritt 4: Gästeanteil berechnen
  // Miete & Reinigung: Mit Multiplikator
  // Kurtaxe & Wäsche: Immer volle Kosten pro Person
  const guestRentShare = rentSharePP * multiplier
  const guestCleaningShare = cleaningSharePP * multiplier
  const guestTouristTax = touristTaxPP
  const guestLaundry = laundryPP
  const perGuest = guestRentShare + guestTouristTax + guestLaundry + guestCleaningShare
  const guestTotal = perGuest * guestCount

  return {
    rentFull,
    rentCost,
    touristTaxTotal,
    laundryTotal,
    cleaningTotal,
    totalCost,
    rentSharePP,
    touristTaxPP,
    laundryPP,
    cleaningSharePP,
    perPerson,
    multiplierKey,
    multiplier,
    guestRentShare,
    guestCleaningShare,
    guestTouristTax,
    guestLaundry,
    perGuest,
    guestTotal,
    totalPersons,
    guestCount,
  }
}
