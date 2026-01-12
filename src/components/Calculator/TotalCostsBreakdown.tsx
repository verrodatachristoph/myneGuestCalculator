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
            <span className="text-gray-500">
              Miete ({stay.nights} x {formatCurrency(settings.seasons[stay.season].pricePerNight)})
            </span>
            <span className="text-ocean">{formatCurrency(costs.rentFull)}</span>
          </div>
          <div className="flex justify-between pl-4 text-gray-400 text-xs">
            <span>→ davon 10% MwSt (echte Kosten)</span>
            <span>{formatCurrency(costs.rentCost)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Kurtaxe ({costs.totalPersons} x {stay.nights} x {formatCurrency(settings.extras.touristTax)})
            </span>
            <span className="text-ocean">{formatCurrency(costs.touristTaxTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">
              Wäsche ({costs.totalPersons} x {formatCurrency(settings.extras.laundryPackage)})
            </span>
            <span className="text-ocean">{formatCurrency(costs.laundryTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Endreinigung</span>
            <span className="text-ocean">{formatCurrency(costs.cleaningTotal)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
            <span className="text-ocean">Gesamt</span>
            <span className="text-ocean">{formatCurrency(costs.totalCost)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
