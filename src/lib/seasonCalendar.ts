import type { SeasonType } from '@/types'

// Season periods based on MYNE Saisonverteilungsplan 2026-2028
type SeasonPeriod = {
  start: string  // YYYY-MM-DD
  end: string    // YYYY-MM-DD
  season: SeasonType
}

// BF entries are listed BEFORE HF so they take priority in getSeasonForDate().
// BF dates: CI and CO both inclusive (full period from PDF tables).
// HF dates: Beginn inclusive, Ende exclusive from PDF tables, converted to inclusive end.
// NZ: default for all dates not matching BF or HF.

// 2026 Season Calendar
const SEASON_PERIODS_2026: SeasonPeriod[] = [
  // Besondere Feiertage - Premium* (Neujahr, Ostern, Weihnachten) = 325€
  { start: '2026-01-01', end: '2026-01-02', season: 'holidayPremium' },   // Neujahr Beginn* (CI 28/12/25, CO 02/01/26)
  { start: '2026-04-03', end: '2026-04-06', season: 'holidayPremium' },   // Ostern* (CI 03/04, CO 06/04)
  { start: '2026-12-25', end: '2026-12-27', season: 'holidayPremium' },   // Weihnachten* (CI 25/12, CO 27/12)
  { start: '2026-12-28', end: '2026-12-31', season: 'holidayPremium' },   // Neujahr* (CI 28/12, CO 02/01/27)

  // Besondere Feiertage - Standard = 287,50€
  { start: '2026-02-12', end: '2026-02-16', season: 'holiday' },          // Karneval (CI 12/02, CO 16/02)
  { start: '2026-05-01', end: '2026-05-02', season: 'holiday' },          // 1. Mai (CI 01/05, CO 02/05)
  { start: '2026-05-14', end: '2026-05-15', season: 'holiday' },          // Christi Himmelfahrt (CI 14/05, CO 15/05)
  { start: '2026-05-25', end: '2026-05-26', season: 'holiday' },          // Pfingstmontag (CI 25/05, CO 26/05)
  { start: '2026-10-31', end: '2026-11-01', season: 'holiday' },          // Reformationstag (CI 31/10, CO 01/11)

  // Hauptferienzeiten = 250€ (Beginn/Ende aus PDF, Ende exklusiv)
  { start: '2026-01-01', end: '2026-01-05', season: 'peak' },             // Neujahr (01/01-06/01)
  { start: '2026-02-02', end: '2026-02-20', season: 'peak' },             // Winterferien (02/02-21/02)
  { start: '2026-03-27', end: '2026-04-10', season: 'peak' },             // Osterferien (27/03-11/04)
  { start: '2026-07-04', end: '2026-09-13', season: 'peak' },             // Sommerferien (04/07-14/09)
  { start: '2026-10-09', end: '2026-11-06', season: 'peak' },             // Herbstferien (09/10-07/11)
  { start: '2026-12-23', end: '2026-12-30', season: 'peak' },             // Weihnachtsferien (23/12-31/12)
]

// 2027 Season Calendar (BF=16, HF=136, NZ=213)
const SEASON_PERIODS_2027: SeasonPeriod[] = [
  // Besondere Feiertage - Premium* = 325€
  { start: '2027-01-01', end: '2027-01-02', season: 'holidayPremium' },   // Neujahr Beginn* (CI 28/12/26, CO 02/01/27)
  { start: '2027-03-26', end: '2027-03-29', season: 'holidayPremium' },   // Ostern* (CI 26/03, CO 29/03)
  { start: '2027-12-25', end: '2027-12-27', season: 'holidayPremium' },   // Weihnachten* (CI 25/12, CO 27/12)
  { start: '2027-12-28', end: '2027-12-31', season: 'holidayPremium' },   // Neujahr* (CI 28/12, CO 02/01/28)

  // Besondere Feiertage - Standard = 287,50€
  { start: '2027-02-04', end: '2027-02-07', season: 'holiday' },          // Karneval (CI 04/02, CO 07/02)
  { start: '2027-05-01', end: '2027-05-02', season: 'holiday' },          // 1. Mai (CI 01/05, CO 02/05)
  { start: '2027-05-06', end: '2027-05-07', season: 'holiday' },          // Christi Himmelfahrt (CI 06/05, CO 07/05)
  { start: '2027-05-17', end: '2027-05-18', season: 'holiday' },          // Pfingstmontag (CI 17/05, CO 18/05)
  { start: '2027-10-31', end: '2027-11-01', season: 'holiday' },          // Reformationstag (CI 31/10, CO 01/11)

  // Hauptferienzeiten = 250€
  { start: '2027-01-01', end: '2027-01-07', season: 'peak' },             // Neujahr (01/01-08/01)
  { start: '2027-02-01', end: '2027-02-11', season: 'peak' },             // Winterferien (01/02-12/02)
  { start: '2027-03-22', end: '2027-04-02', season: 'peak' },             // Osterferien (22/03-03/04)
  { start: '2027-07-01', end: '2027-09-10', season: 'peak' },             // Sommerferien (01/07-11/09)
  { start: '2027-10-11', end: '2027-11-05', season: 'peak' },             // Herbstferien (11/10-06/11)
  { start: '2027-12-23', end: '2027-12-30', season: 'peak' },             // Weihnachtsferien (23/12-31/12)
]

// 2028 Season Calendar – Schaltjahr (BF=17, HF=139, NZ=210)
const SEASON_PERIODS_2028: SeasonPeriod[] = [
  // Besondere Feiertage - Premium* = 325€
  { start: '2028-01-01', end: '2028-01-02', season: 'holidayPremium' },   // Neujahr Beginn* (CI 28/12/27, CO 02/01/28)
  { start: '2028-04-14', end: '2028-04-17', season: 'holidayPremium' },   // Ostern* (CI 14/04, CO 17/04)
  { start: '2028-12-25', end: '2028-12-27', season: 'holidayPremium' },   // Weihnachten* (CI 25/12, CO 27/12)
  { start: '2028-12-28', end: '2028-12-31', season: 'holidayPremium' },   // Neujahr* (CI 28/12, CO 02/01/29)

  // Besondere Feiertage - Standard = 287,50€
  { start: '2028-02-24', end: '2028-02-28', season: 'holiday' },          // Karneval (CI 24/02, CO 28/02)
  { start: '2028-05-01', end: '2028-05-02', season: 'holiday' },          // 1. Mai (CI 01/05, CO 02/05)
  { start: '2028-05-25', end: '2028-05-26', season: 'holiday' },          // Christi Himmelfahrt (CI 25/05, CO 26/05)
  { start: '2028-06-05', end: '2028-06-06', season: 'holiday' },          // Pfingstmontag (CI 05/06, CO 06/06)
  { start: '2028-10-31', end: '2028-11-01', season: 'holiday' },          // Reformationstag (CI 31/10, CO 01/11)

  // Hauptferienzeiten = 250€
  { start: '2028-01-01', end: '2028-01-07', season: 'peak' },             // Neujahr (01/01-08/01)
  { start: '2028-02-26', end: '2028-03-02', season: 'peak' },             // Winterferien (26/02-03/03)
  { start: '2028-04-09', end: '2028-04-21', season: 'peak' },             // Osterferien (09/04-22/04)
  { start: '2028-07-01', end: '2028-09-09', season: 'peak' },             // Sommerferien (01/07-10/09)
  { start: '2028-10-03', end: '2028-11-03', season: 'peak' },             // Herbstferien (03/10-04/11)
  { start: '2028-12-21', end: '2028-12-30', season: 'peak' },             // Weihnachtsferien (21/12-31/12)
]

// Combined season periods
const ALL_SEASON_PERIODS: SeasonPeriod[] = [
  ...SEASON_PERIODS_2026,
  ...SEASON_PERIODS_2027,
  ...SEASON_PERIODS_2028,
]

// Supported date range
const CALENDAR_START = '2026-01-01'
const CALENDAR_END = '2028-12-31'

// Cache for date lookups
const seasonCache = new Map<string, SeasonType>()

/**
 * Get the season for a specific date
 */
export function getSeasonForDate(dateStr: string): SeasonType {
  // Check cache first
  if (seasonCache.has(dateStr)) {
    return seasonCache.get(dateStr)!
  }

  const date = new Date(dateStr)

  for (const period of ALL_SEASON_PERIODS) {
    const start = new Date(period.start)
    const end = new Date(period.end)

    if (date >= start && date <= end) {
      seasonCache.set(dateStr, period.season)
      return period.season
    }
  }

  // Default to low season if not found in any period
  seasonCache.set(dateStr, 'low')
  return 'low'
}

/**
 * Get all dates between check-in and check-out (excluding check-out day)
 */
export function getDateRange(checkIn: string, checkOut: string): string[] {
  if (!checkIn || !checkOut) return []

  const dates: string[] = []
  const current = new Date(checkIn)
  const end = new Date(checkOut)

  if (isNaN(current.getTime()) || isNaN(end.getTime())) return []

  while (current < end) {
    dates.push(current.toISOString().split('T')[0])
    current.setUTCDate(current.getUTCDate() + 1)
  }

  return dates
}

/**
 * Calculate number of nights
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0
  const diffTime = end.getTime() - start.getTime()
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return nights > 0 ? nights : 0
}

/**
 * Format date for display (German format)
 */
export function formatDateGerman(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Check if a date range is fully covered by the season calendar
 */
export function isDateRangeCovered(checkIn: string, checkOut: string): { covered: boolean; uncoveredYears: number[] } {
  if (!checkIn || !checkOut) {
    return { covered: true, uncoveredYears: [] }
  }

  const start = new Date(checkIn)
  const end = new Date(checkOut)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { covered: true, uncoveredYears: [] }
  }

  const calendarStart = new Date(CALENDAR_START)
  const calendarEnd = new Date(CALENDAR_END)

  const uncoveredYears = new Set<number>()

  // Check if start is before calendar
  if (start < calendarStart) {
    uncoveredYears.add(start.getFullYear())
  }

  // Check if end is after calendar (subtract 1 day since checkOut is not included)
  const lastNight = new Date(end)
  lastNight.setUTCDate(lastNight.getUTCDate() - 1)
  if (lastNight > calendarEnd) {
    uncoveredYears.add(lastNight.getFullYear())
  }

  return {
    covered: uncoveredYears.size === 0,
    uncoveredYears: Array.from(uncoveredYears).sort()
  }
}

/**
 * Get the supported year range
 */
export function getSupportedYearRange(): { start: number; end: number } {
  return {
    start: new Date(CALENDAR_START).getFullYear(),
    end: new Date(CALENDAR_END).getFullYear()
  }
}

/**
 * Count nights per season for a stay
 */
export function countNightsPerSeason(checkIn: string, checkOut: string): Record<SeasonType, number> {
  const counts: Record<SeasonType, number> = { holidayPremium: 0, holiday: 0, peak: 0, low: 0 }
  const dates = getDateRange(checkIn, checkOut)

  for (const dateStr of dates) {
    const season = getSeasonForDate(dateStr)
    counts[season]++
  }

  return counts
}

/**
 * Count days per season for a given year (for verification)
 */
export function countDaysPerSeason(year: number): Record<SeasonType, number> {
  const counts: Record<SeasonType, number> = { holidayPremium: 0, holiday: 0, peak: 0, low: 0 }

  const startDate = new Date(`${year}-01-01`)
  const endDate = new Date(`${year}-12-31`)

  const current = new Date(startDate)
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0]
    const season = getSeasonForDate(dateStr)
    counts[season]++
    current.setUTCDate(current.getUTCDate() + 1)
  }

  return counts
}
