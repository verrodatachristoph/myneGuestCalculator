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
        <CardTitle>Pro Teilnehmer (100%)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Row label={`Mietanteil (1/${costs.totalPersons})`} value={formatCurrency(costs.rentSharePP)} />
          <Row label="Kurtaxe" value={formatCurrency(costs.touristTaxPP)} />
          <Row label="Wäsche" value={formatCurrency(costs.laundryPP)} />
          <Row label={`Reinigung (1/${costs.totalPersons})`} value={formatCurrency(costs.cleaningSharePP)} />

          <div className="pt-3 mt-3 border-t border-slate-100">
            <Row label="Pro Teilnehmer" value={formatCurrency(costs.perPerson)} bold />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-semibold text-slate-800' : ''}`}>
      <span className={bold ? '' : 'text-slate-500'}>{label}</span>
      <span className={bold ? '' : 'text-slate-700'}>{value}</span>
    </div>
  )
}
