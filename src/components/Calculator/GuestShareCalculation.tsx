import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown } from '@/types'
import { formatCurrency, formatPercent } from '@/lib/formatters'

interface GuestShareCalculationProps {
  costs: CostBreakdown
}

export function GuestShareCalculation({ costs }: GuestShareCalculationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gästeanteil ({formatPercent(costs.multiplier)})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Row
            label={`Mietanteil (× ${formatPercent(costs.multiplier)})`}
            value={formatCurrency(costs.guestRentShare)}
          />
          <Row label="Kurtaxe (voll)" value={formatCurrency(costs.guestTouristTax)} />
          <Row label="Wäsche (voll)" value={formatCurrency(costs.guestLaundry)} />
          <Row
            label={`Reinigung (× ${formatPercent(costs.multiplier)})`}
            value={formatCurrency(costs.guestCleaningShare)}
          />

          <div className="pt-3 mt-3 border-t border-slate-100">
            <Row label="Pro Gast" value={formatCurrency(costs.perGuest)} bold accent />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-semibold' : ''}`}>
      <span className={bold ? 'text-slate-800' : 'text-slate-500'}>{label}</span>
      <span className={accent ? 'text-ocean font-bold' : bold ? 'text-slate-800' : 'text-slate-700'}>{value}</span>
    </div>
  )
}
