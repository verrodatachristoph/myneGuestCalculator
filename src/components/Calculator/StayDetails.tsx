import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { Stay, Settings } from '@/types'
import { calculateNights, isDateRangeCovered, getSupportedYearRange, countNightsPerSeason } from '@/lib/seasonCalendar'
import { formatCurrency } from '@/lib/formatters'

interface StayDetailsProps {
  stay: Stay
  onStayChange: (stay: Stay) => void
  settings: Settings
}

const SEASON_COLORS = {
  peak: 'bg-emerald-600',
  high: 'bg-emerald-500',
  mid: 'bg-emerald-400/60',
  low: 'bg-emerald-200/40',
}

export function StayDetails({ stay, onStayChange, settings }: StayDetailsProps) {
  const nights = calculateNights(stay.checkIn, stay.checkOut)
  const coverage = isDateRangeCovered(stay.checkIn, stay.checkOut)
  const supportedRange = getSupportedYearRange()
  const nightsPerSeason = countNightsPerSeason(stay.checkIn, stay.checkOut)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufenthalt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Anreise</Label>
            <Input
              type="date"
              value={stay.checkIn}
              onChange={(e) => onStayChange({ ...stay, checkIn: e.target.value })}
            />
          </div>

          <div>
            <Label>Abreise</Label>
            <Input
              type="date"
              value={stay.checkOut}
              min={stay.checkIn}
              onChange={(e) => onStayChange({ ...stay, checkOut: e.target.value })}
            />
          </div>

          <div>
            <Label>Nächte</Label>
            <div className="h-11 px-4 rounded-lg bg-secondary border border-border flex items-center text-foreground">
              {nights} {nights === 1 ? 'Nacht' : 'Nächte'}
            </div>
          </div>
        </div>

        {/* Season Breakdown */}
        {nights > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Saisonverteilung:</p>
            <div className="space-y-1.5 text-xs">
              {(['peak', 'high', 'mid', 'low'] as const).map((season) => {
                const count = nightsPerSeason[season]
                if (count === 0) return null
                return (
                  <div key={season} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded flex-shrink-0 ${SEASON_COLORS[season]}`} />
                    <span className="text-foreground">
                      {count} × {settings.seasons[season].name}
                    </span>
                    <span className="text-muted-foreground ml-auto">
                      {formatCurrency(count * settings.seasons[season].pricePerNight)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {!coverage.covered && (
          <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-sm text-accent font-medium">
              Hinweis: Für {coverage.uncoveredYears.join(', ')} liegt kein Saisonkalender vor.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Aktuell sind nur {supportedRange.start}–{supportedRange.end} hinterlegt.
              Für Tage außerhalb wird Nebensaison angenommen.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
