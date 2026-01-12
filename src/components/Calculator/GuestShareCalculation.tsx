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
        <CardTitle>Gästeanteil (Multiplikator: {formatPercent(costs.multiplier)})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Mietanteil ({formatCurrency(costs.rentSharePP)} x {formatPercent(costs.multiplier)})
            </span>
            <span>{formatCurrency(costs.guestRentShare)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Kurtaxe (immer voll)</span>
            <span>{formatCurrency(costs.guestTouristTax)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Wäsche (immer voll)</span>
            <span>{formatCurrency(costs.guestLaundry)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Reinigung ({formatCurrency(costs.cleaningSharePP)} x {formatPercent(costs.multiplier)})
            </span>
            <span>{formatCurrency(costs.guestCleaningShare)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-border font-semibold">
            <span>Pro Gast</span>
            <span className="text-primary">{formatCurrency(costs.perGuest)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
