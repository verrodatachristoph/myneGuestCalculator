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
            <span className="text-muted-foreground">Mietanteil (1/{costs.totalPersons})</span>
            <span>{formatCurrency(costs.rentSharePP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Kurtaxe</span>
            <span>{formatCurrency(costs.touristTaxPP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Wäsche</span>
            <span>{formatCurrency(costs.laundryPP)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Reinigungsanteil (1/{costs.totalPersons})</span>
            <span>{formatCurrency(costs.cleaningSharePP)}</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-border font-semibold">
            <span>Pro Teilnehmer</span>
            <span>{formatCurrency(costs.perPerson)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
