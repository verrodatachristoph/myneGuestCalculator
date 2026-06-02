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
  const seasonOrder: SeasonType[] = ['holidayPremium', 'holiday', 'peak', 'low']

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
  // Die 10% MwSt sind im Bruttopreis bereits enthalten und werden herausgerechnet.
  // Nur diese enthaltene MwSt ist sofort zu zahlen, der Nettobetrag wird gestundet.
  const rentCost = rentFull * (VAT_RATE / (1 + VAT_RATE)) // = rentFull / 11

  // Schritt 2: Zusatzkosten berechnen
  const laundryTotal = extras.laundryPackage * totalPersons
  const cleaningTotal = extras.finalCleaning
  const totalCost = rentCost + laundryTotal + cleaningTotal

  // Schritt 3: Kosten pro Teilnehmer (bei 100%)
  const rentSharePP = totalPersons > 0 ? rentCost / totalPersons : 0
  const laundryPP = extras.laundryPackage // Pro Person
  const cleaningSharePP = totalPersons > 0 ? cleaningTotal / totalPersons : 0
  const perPerson = rentSharePP + laundryPP + cleaningSharePP

  // Schritt 4: Gästeanteil berechnen mit Schieberegler-Prozent + Gewinnaufschlag
  const effectivePercent = guestSharePercent + profitMargin
  const multiplier = effectivePercent / 100
  const guestRentShare = rentSharePP * multiplier
  const guestCleaningShare = cleaningSharePP * multiplier
  const guestLaundry = laundryPP * multiplier
  const perGuest = guestRentShare + guestLaundry + guestCleaningShare
  const guestTotal = perGuest * guestCount

  return {
    nights,
    seasonBreakdown,
    rentFull,
    rentCost,
    laundryTotal,
    cleaningTotal,
    totalCost,
    rentSharePP,
    laundryPP,
    cleaningSharePP,
    perPerson,
    guestSharePercent,
    guestRentShare,
    guestCleaningShare,
    guestLaundry,
    perGuest,
    guestTotal,
    totalPersons,
    guestCount,
  }
}
