import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Settings, SeasonType } from '@/types'
import { getSeasonForDate } from '@/lib/seasonCalendar'
import { formatCurrency } from '@/lib/formatters'

interface SeasonCalendarViewProps {
  settings: Settings
}

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
]

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const SEASON_COLORS: Record<SeasonType, string> = {
  holidayPremium: 'season-holidayPremium',
  holiday: 'season-holiday',
  peak: 'season-peak',
  low: 'season-low',
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Convert to Monday = 0
}

function MonthCalendarLarge({ year, month, settings }: { year: number; month: number; settings: Settings }) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const days: Array<{ day: number; season: SeasonType } | null> = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const season = getSeasonForDate(dateStr)
    days.push({ day, season })
  }

  return (
    <div className="flex-1">
      <div className="text-sm font-semibold text-foreground mb-2 text-center">{MONTHS[month]} {year}</div>
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-[10px] text-muted-foreground text-center font-medium py-1">
            {day}
          </div>
        ))}
        {days.map((item, index) => (
          <div
            key={index}
            className={`aspect-square text-xs flex items-center justify-center rounded ${
              item ? SEASON_COLORS[item.season] : ''
            }`}
            title={item ? `${item.day}. ${MONTHS[month]} - ${settings.seasons[item.season].name}` : ''}
          >
            {item?.day}
          </div>
        ))}
      </div>
    </div>
  )
}

const SUPPORTED_YEARS = [2026, 2027, 2028]

export function SeasonCalendarView({ settings }: SeasonCalendarViewProps) {
  const [selectedYear, setSelectedYear] = useState(2026)
  const [currentPage, setCurrentPage] = useState(0) // 0-5 for 6 pages of 2 months each

  const startMonth = currentPage * 2
  const months = [startMonth, startMonth + 1]

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else {
      const idx = SUPPORTED_YEARS.indexOf(selectedYear)
      if (idx > 0) {
        setSelectedYear(SUPPORTED_YEARS[idx - 1])
        setCurrentPage(5)
      }
    }
  }

  const goToNextPage = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1)
    } else {
      const idx = SUPPORTED_YEARS.indexOf(selectedYear)
      if (idx < SUPPORTED_YEARS.length - 1) {
        setSelectedYear(SUPPORTED_YEARS[idx + 1])
        setCurrentPage(0)
      }
    }
  }

  const yearIdx = SUPPORTED_YEARS.indexOf(selectedYear)
  const canGoPrev = currentPage > 0 || yearIdx > 0
  const canGoNext = currentPage < 5 || yearIdx < SUPPORTED_YEARS.length - 1

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Saisonkalender</CardTitle>
          <div className="flex gap-2">
            {SUPPORTED_YEARS.map(year => (
              <Button
                key={year}
                variant={selectedYear === year ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => { setSelectedYear(year); setCurrentPage(0) }}
              >
                {year}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded flex-shrink-0 ${SEASON_COLORS.holidayPremium}`}></div>
            <span>Feiertage* ({formatCurrency(settings.seasons.holidayPremium.pricePerNight)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded flex-shrink-0 ${SEASON_COLORS.holiday}`}></div>
            <span>Feiertage ({formatCurrency(settings.seasons.holiday.pricePerNight)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded flex-shrink-0 ${SEASON_COLORS.peak}`}></div>
            <span>Hauptferien ({formatCurrency(settings.seasons.peak.pricePerNight)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded flex-shrink-0 ${SEASON_COLORS.low}`}></div>
            <span>Neben ({formatCurrency(settings.seasons.low.pricePerNight)})</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mb-4">* Neujahr, Ostern, Weihnachten</p>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPrevPage}
            disabled={!canGoPrev}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {MONTHS[startMonth]} – {MONTHS[startMonth + 1]} {selectedYear}
          </span>
          <button
            type="button"
            onClick={goToNextPage}
            disabled={!canGoNext}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Two Month Calendar */}
        <div className="flex flex-col sm:flex-row gap-6 mb-6">
          {months.map(month => (
            <MonthCalendarLarge key={month} year={selectedYear} month={month} settings={settings} />
          ))}
        </div>

        {/* Page Indicator */}
        <div className="flex justify-center gap-1.5 mb-6">
          {Array.from({ length: 6 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentPage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentPage ? 'bg-primary' : 'bg-secondary hover:bg-secondary/80'
              }`}
            />
          ))}
        </div>

        {/* Download Links */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">Original-Saisonpläne:</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {SUPPORTED_YEARS.map(year => (
              <a
                key={year}
                href={`/docs/MYNE - Alpine Terrace - Saisonverteilungsplan ${year}.pdf`}
                download
                className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Saisonplan {year} (PDF)
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
