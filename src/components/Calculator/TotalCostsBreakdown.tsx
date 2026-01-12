import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown, Stay, Settings } from '@/types'
import { formatCurrency } from '@/lib/formatters'

interface TotalCostsBreakdownProps {
  costs: CostBreakdown
  stay: Stay
  settings: Settings
}

export function TotalCostsBreakdown({ costs, stay, settings }: TotalCostsBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gesamtkosten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Miete ({stay.nights} x {formatCurrency(settings.seasons[stay.season].pricePerNight)})
            </span>
            <span>{formatCurrency(costs.rentFull)}</span>
          </div>
          <div className="flex justify-between pl-4 text-muted-foreground">
            <span>→ davon 10% MwSt (echte Kosten)</span>
            <span>{formatCurrency(costs.rentCost)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Kurtaxe ({costs.totalPersons} x {stay.nights} x {formatCurrency(settings.extras.touristTax)})
            </span>
            <span>{formatCurrency(costs.touristTaxTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Wäsche ({costs.totalPersons} x {formatCurrency(settings.extras.laundryPackage)})
            </span>
            <span>{formatCurrency(costs.laundryTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Endreinigung</span>
            <span>{formatCurrency(costs.cleaningTotal)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-border font-semibold">
            <span>Gesamt</span>
            <span>{formatCurrency(costs.totalCost)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
