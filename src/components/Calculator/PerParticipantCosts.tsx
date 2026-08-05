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
          <Row label="Wäsche" value={formatCurrency(costs.laundryPP)} />
          <Row label={`Reinigung (1/${costs.totalPersons})`} value={formatCurrency(costs.cleaningSharePP)} />
          {costs.petTotal > 0 && (
            <Row label={`Haustier (1/${costs.totalPersons})`} value={formatCurrency(costs.petSharePP)} />
          )}

          <div className="pt-3 mt-3 border-t border-border">
            <Row label="Pro Teilnehmer" value={formatCurrency(costs.perPerson)} bold />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-semibold text-foreground' : ''}`}>
      <span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
      <span className={bold ? '' : 'text-foreground'}>{value}</span>
    </div>
  )
}
