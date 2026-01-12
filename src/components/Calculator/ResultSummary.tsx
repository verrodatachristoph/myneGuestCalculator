import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown } from '@/types'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { MULTIPLIER_LABELS } from '@/lib/constants'

interface ResultSummaryProps {
  costs: CostBreakdown
}

export function ResultSummary({ costs }: ResultSummaryProps) {
  return (
    <Card className="border-2 border-beach bg-ocean text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <span className="inline-flex items-center rounded-full bg-beach px-2.5 py-0.5 text-xs font-medium text-white">
            {formatPercent(costs.multiplier)}
          </span>
          {MULTIPLIER_LABELS[costs.multiplierKey]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div>
            <p className="text-sm text-white/70 mb-1">Beitrag pro Gast</p>
            <p className="text-4xl font-bold text-beach">{formatCurrency(costs.perGuest)}</p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Anzahl Gäste</span>
              <span className="text-white">{costs.guestCount}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-white/70">Gesamtbeitrag aller Gäste</span>
              <span className="font-semibold text-beach">{formatCurrency(costs.guestTotal)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
