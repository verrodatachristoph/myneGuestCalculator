import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown } from '@/types'
import { formatCurrency } from '@/lib/formatters'

interface GuestShareCalculationProps {
  costs: CostBreakdown
}

export function GuestShareCalculation({ costs }: GuestShareCalculationProps) {
  const percentLabel = `${costs.guestSharePercent}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gästeanteil ({percentLabel})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Row
            label={`Mietanteil (× ${percentLabel})`}
            value={formatCurrency(costs.guestRentShare)}
          />
          <Row label={`Kurtaxe (× ${percentLabel})`} value={formatCurrency(costs.guestTouristTax)} />
          <Row label={`Wäsche (× ${percentLabel})`} value={formatCurrency(costs.guestLaundry)} />
          <Row
            label={`Reinigung (× ${percentLabel})`}
            value={formatCurrency(costs.guestCleaningShare)}
          />

          <div className="pt-3 mt-3 border-t border-border">
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
      <span className={bold ? 'text-foreground' : 'text-muted-foreground'}>{label}</span>
      <span className={accent ? 'text-accent font-bold' : bold ? 'text-foreground' : 'text-foreground'}>{value}</span>
    </div>
  )
}
