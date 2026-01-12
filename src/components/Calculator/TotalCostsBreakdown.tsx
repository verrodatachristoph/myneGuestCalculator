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
        <div className="space-y-3">
          <Row
            label={`Miete (${stay.nights} × ${formatCurrency(settings.seasons[stay.season].pricePerNight)})`}
            value={formatCurrency(costs.rentFull)}
          />
          <div className="pl-4 text-xs text-slate-400">
            → davon 10% MwSt = {formatCurrency(costs.rentCost)}
          </div>
          <Row
            label={`Kurtaxe (${costs.totalPersons} × ${stay.nights} × ${formatCurrency(settings.extras.touristTax)})`}
            value={formatCurrency(costs.touristTaxTotal)}
          />
          <Row
            label={`Wäsche (${costs.totalPersons} × ${formatCurrency(settings.extras.laundryPackage)})`}
            value={formatCurrency(costs.laundryTotal)}
          />
          <Row label="Endreinigung" value={formatCurrency(costs.cleaningTotal)} />

          <div className="pt-3 mt-3 border-t border-slate-100">
            <Row label="Gesamt" value={formatCurrency(costs.totalCost)} bold />
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
