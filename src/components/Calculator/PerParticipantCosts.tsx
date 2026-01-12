import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown } from '@/types'
import { formatCurrency } from '@/lib/formatters'

interface PerParticipantCostsProps {
  costs: CostBreakdown
}

export function PerParticipantCosts({ costs }: PerParticipantCostsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kosten pro Teilnehmer (bei 100%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Mietanteil (1/{costs.totalPersons})</span>
            <span className="text-ocean">{formatCurrency(costs.rentSharePP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Kurtaxe</span>
            <span className="text-ocean">{formatCurrency(costs.touristTaxPP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Wäsche</span>
            <span className="text-ocean">{formatCurrency(costs.laundryPP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Reinigungsanteil (1/{costs.totalPersons})</span>
            <span className="text-ocean">{formatCurrency(costs.cleaningSharePP)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-gray-200 font-semibold">
            <span className="text-ocean">Pro Teilnehmer</span>
            <span className="text-ocean">{formatCurrency(costs.perPerson)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
