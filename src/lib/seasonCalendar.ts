import type { SeasonType } from '@/types'

// Season periods based on MYNE Saisonverteilungsplan
type SeasonPeriod = {
  start: string  // YYYY-MM-DD
  end: string    // YYYY-MM-DD
  season: SeasonType
}

// 2026 Season Calendar - exakte Daten aus PDF
const SEASON_PERIODS_2026: SeasonPeriod[] = [
  // Spitzensaison (Peak) - 43 Tage
  { start: '2026-01-01', end: '2026-01-05', season: 'peak' },      // 5 Tage
  { start: '2026-04-03', end: '2026-04-03', season: 'peak' },      // 1 Tag
  { start: '2026-04-06', end: '2026-04-06', season: 'peak' },      // 1 Tag
  { start: '2026-05-25', end: '2026-05-25', season: 'peak' },      // 1 Tag
  { start: '2026-07-20', end: '2026-08-14', season: 'peak' },      // 26 Tage
  { start: '2026-12-23', end: '2026-12-31', season: 'peak' },      // 9 Tage

  // Hauptsaison (High) - 155 Tage
  { start: '2026-01-06', end: '2026-04-02', season: 'high' },      // 87 Tage
  { start: '2026-04-04', end: '2026-04-05', season: 'high' },      // 2 Tage
  { start: '2026-04-07', end: '2026-04-10', season: 'high' },      // 4 Tage
  { start: '2026-05-26', end: '2026-05-26', season: 'high' },      // 1 Tag
  { start: '2026-07-04', end: '2026-07-19', season: 'high' },      // 16 Tage
  { start: '2026-08-15', end: '2026-09-12', season: 'high' },      // 29 Tage
  { start: '2026-10-12', end: '2026-10-12', season: 'high' },      // 1 Tag
  { start: '2026-10-17', end: '2026-10-31', season: 'high' },      // 15 Tage

  // Zwischensaison (Mid) - 40 Tage
  { start: '2026-04-11', end: '2026-04-11', season: 'mid' },       // 1 Tag
  { start: '2026-05-15', end: '2026-05-15', season: 'mid' },       // 1 Tag
  { start: '2026-05-23', end: '2026-05-24', season: 'mid' },       // 2 Tage
  { start: '2026-05-27', end: '2026-06-05', season: 'mid' },       // 10 Tage
  { start: '2026-06-29', end: '2026-07-03', season: 'mid' },       // 5 Tage
  { start: '2026-09-13', end: '2026-09-14', season: 'mid' },       // 2 Tage
  { start: '2026-10-05', end: '2026-10-11', season: 'mid' },       // 7 Tage
  { start: '2026-10-13', end: '2026-10-16', season: 'mid' },       // 4 Tage
  { start: '2026-11-02', end: '2026-11-06', season: 'mid' },       // 5 Tage
  { start: '2026-11-18', end: '2026-11-18', season: 'mid' },       // 1 Tag
  { start: '2026-12-21', end: '2026-12-22', season: 'mid' },       // 2 Tage

  // Nebensaison (Low) - 127 Tage (Rest des Jahres)
  // Wird als Default verwendet für alle nicht definierten Tage
]

// 2027 Season Calendar - exakte Daten aus PDF
const SEASON_PERIODS_2027: SeasonPeriod[] = [
  // Spitzensaison (Peak) - 42 Tage
  { start: '2027-01-01', end: '2027-01-06', season: 'peak' },      // 6 Tage
  { start: '2027-03-25', end: '2027-04-02', season: 'peak' },      // 9 Tage
  { start: '2027-05-17', end: '2027-05-18', season: 'peak' },      // 2 Tage
  { start: '2027-07-29', end: '2027-08-14', season: 'peak' },      // 17 Tage
  { start: '2027-12-24', end: '2027-12-31', season: 'peak' },      // 8 Tage

  // Hauptsaison (High) - 135 Tage
  { start: '2027-01-07', end: '2027-03-24', season: 'high' },      // 77 Tage
  { start: '2027-05-19', end: '2027-05-19', season: 'high' },      // 1 Tag
  { start: '2027-07-08', end: '2027-07-28', season: 'high' },      // 21 Tage
  { start: '2027-08-15', end: '2027-08-31', season: 'high' },      // 17 Tage
  { start: '2027-10-11', end: '2027-10-16', season: 'high' },      // 6 Tage
  { start: '2027-10-18', end: '2027-10-23', season: 'high' },      // 6 Tage
  { start: '2027-11-01', end: '2027-11-06', season: 'high' },      // 6 Tage
  { start: '2027-12-23', end: '2027-12-23', season: 'high' },      // 1 Tag

  // Zwischensaison (Mid) - 55 Tage
  { start: '2027-05-07', end: '2027-05-07', season: 'mid' },       // 1 Tag
  { start: '2027-05-15', end: '2027-05-16', season: 'mid' },       // 2 Tage
  { start: '2027-05-20', end: '2027-05-29', season: 'mid' },       // 10 Tage
  { start: '2027-06-28', end: '2027-07-07', season: 'mid' },       // 10 Tage
  { start: '2027-09-01', end: '2027-09-13', season: 'mid' },       // 13 Tage
  { start: '2027-10-04', end: '2027-10-10', season: 'mid' },       // 7 Tage
  { start: '2027-10-17', end: '2027-10-17', season: 'mid' },       // 1 Tag
  { start: '2027-10-24', end: '2027-10-31', season: 'mid' },       // 8 Tage
  { start: '2027-12-20', end: '2027-12-22', season: 'mid' },       // 3 Tage

  // Nebensaison (Low) - 133 Tage (Rest des Jahres)
]

// Combined season periods
const ALL_SEASON_PERIODS: SeasonPeriod[] = [
  ...SEASON_PERIODS_2026,
  ...SEASON_PERIODS_2027,
]

// Supported date range
const CALENDAR_START = '2026-01-01'
const CALENDAR_END = '2027-12-31'

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
    current.setDate(current.getDate() + 1)
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
  lastNight.setDate(lastNight.getDate() - 1)
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
  const counts: Record<SeasonType, number> = { peak: 0, high: 0, mid: 0, low: 0 }
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
  const counts: Record<SeasonType, number> = { peak: 0, high: 0, mid: 0, low: 0 }

  const startDate = new Date(`${year}-01-01`)
  const endDate = new Date(`${year}-12-31`)

  const current = new Date(startDate)
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0]
    const season = getSeasonForDate(dateStr)
    counts[season]++
    current.setDate(current.getDate() + 1)
  }

  return counts
}
