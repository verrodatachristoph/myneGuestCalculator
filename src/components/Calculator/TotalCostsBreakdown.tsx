import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import type { CostBreakdown, Settings } from '@/types'
import { formatCurrency } from '@/lib/formatters'

interface TotalCostsBreakdownProps {
  costs: CostBreakdown
  settings: Settings
}

export function TotalCostsBreakdown({ costs, settings }: TotalCostsBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gesamtkosten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Season breakdown - muted section */}
          <div className="space-y-1 pb-3 mb-3 border-b border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bruttomiete ({costs.nights} Nächte)</span>
              <span className="text-muted-foreground">{formatCurrency(costs.rentFull)}</span>
            </div>
            {costs.seasonBreakdown.map((s) => (
              <div key={s.season} className="flex justify-between text-xs pl-3">
                <span className="text-muted-foreground">
                  {settings.seasons[s.season].name} ({s.nights}× {formatCurrency(s.pricePerNight)})
                </span>
                <span className="text-muted-foreground">{formatCurrency(s.subtotal)}</span>
              </div>
            ))}
          </div>

          {/* Cost items that sum up */}
          <Row label="Mietkosten (10% MwSt)" value={formatCurrency(costs.rentCost)} />
          <Row
            label={`Kurtaxe (${costs.totalPersons} × ${costs.nights} × ${formatCurrency(settings.extras.touristTax)})`}
            value={formatCurrency(costs.touristTaxTotal)}
          />
          <Row
            label={`Wäsche (${costs.totalPersons} × ${formatCurrency(settings.extras.laundryPackage)})`}
            value={formatCurrency(costs.laundryTotal)}
          />
          <Row label="Endreinigung" value={formatCurrency(costs.cleaningTotal)} />

          <div className="pt-3 mt-3 border-t border-border">
            <Row label="Gesamt" value={formatCurrency(costs.totalCost)} bold />
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
