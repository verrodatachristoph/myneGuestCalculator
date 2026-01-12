import type { Settings, Stay, CostBreakdown, SeasonType, SeasonBreakdown } from '@/types'
import { VAT_RATE } from './constants'
import { getDateRange, getSeasonForDate, calculateNights } from './seasonCalendar'

/**
 * Calculate the rent breakdown by season
 */
function calculateSeasonBreakdown(settings: Settings, checkIn: string, checkOut: string): SeasonBreakdown[] {
  const dates = getDateRange(checkIn, checkOut)
  const seasonCounts = new Map<SeasonType, number>()

  // Count nights per season
  for (const date of dates) {
    const season = getSeasonForDate(date)
    seasonCounts.set(season, (seasonCounts.get(season) || 0) + 1)
  }

  // Build breakdown
  const breakdown: SeasonBreakdown[] = []
  const seasonOrder: SeasonType[] = ['peak', 'high', 'mid', 'low']

  for (const season of seasonOrder) {
    const nights = seasonCounts.get(season) || 0
    if (nights > 0) {
      const pricePerNight = settings.seasons[season].pricePerNight
      breakdown.push({
        season,
        nights,
        pricePerNight,
        subtotal: nights * pricePerNight
      })
    }
  }

  return breakdown
}

export function calculateCosts(settings: Settings, stay: Stay): CostBreakdown {
  const { extras } = settings
  const { checkIn, checkOut, guestSharePercent, profitMargin = 0, persons } = stay

  const totalPersons = persons.length
  const guestCount = persons.filter((p) => !p.isOwner).length
  const nights = calculateNights(checkIn, checkOut)

  // Schritt 1: Saisonaufteilung und Mietkosten berechnen
  const seasonBreakdown = calculateSeasonBreakdown(settings, checkIn, checkOut)
  const rentFull = seasonBreakdown.reduce((sum, s) => sum + s.subtotal, 0)
  const rentCost = rentFull * VAT_RATE // Nur 10% MwSt sind echte Kosten

  // Schritt 2: Zusatzkosten berechnen
  const touristTaxTotal = extras.touristTax * totalPersons * nights
  const laundryTotal = extras.laundryPackage * totalPersons
  const cleaningTotal = extras.finalCleaning
  const totalCost = rentCost + touristTaxTotal + laundryTotal + cleaningTotal

  // Schritt 3: Kosten pro Teilnehmer (bei 100%)
  const rentSharePP = totalPersons > 0 ? rentCost / totalPersons : 0
  const touristTaxPP = extras.touristTax * nights // Pro Person
  const laundryPP = extras.laundryPackage // Pro Person
  const cleaningSharePP = totalPersons > 0 ? cleaningTotal / totalPersons : 0
  const perPerson = rentSharePP + touristTaxPP + laundryPP + cleaningSharePP

  // Schritt 4: Gästeanteil berechnen mit Schieberegler-Prozent + Gewinnaufschlag
  const effectivePercent = guestSharePercent + profitMargin
  const multiplier = effectivePercent / 100
  const guestRentShare = rentSharePP * multiplier
  const guestCleaningShare = cleaningSharePP * multiplier
  const guestTouristTax = touristTaxPP * multiplier
  const guestLaundry = laundryPP * multiplier
  const perGuest = guestRentShare + guestTouristTax + guestLaundry + guestCleaningShare
  const guestTotal = perGuest * guestCount

  return {
    nights,
    seasonBreakdown,
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
    guestSharePercent,
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
