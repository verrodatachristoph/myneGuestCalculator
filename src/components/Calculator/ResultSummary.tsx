import type { CostBreakdown } from '@/types'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import { MULTIPLIER_LABELS } from '@/lib/constants'

interface ResultSummaryProps {
  costs: CostBreakdown
}

export function ResultSummary({ costs }: ResultSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-ocean to-ocean-light rounded-2xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
          {formatPercent(costs.multiplier)} Anteil
        </span>
        <span className="text-white/80 text-sm">
          {MULTIPLIER_LABELS[costs.multiplierKey]}
        </span>
      </div>

      <div className="text-center mb-8">
        <p className="text-white/60 text-sm mb-2">Beitrag pro Gast</p>
        <p className="text-5xl font-bold tracking-tight">{formatCurrency(costs.perGuest)}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
        <div>
          <p className="text-white/60 text-sm">Anzahl Gäste</p>
          <p className="text-2xl font-semibold">{costs.guestCount}</p>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-sm">Gesamt aller Gäste</p>
          <p className="text-2xl font-semibold">{formatCurrency(costs.guestTotal)}</p>
        </div>
      </div>
    </div>
  )
}
