import { useMemo } from 'react'
import { StayDetails } from './StayDetails'
import { PersonsList } from './PersonsList'
import { ResultSummary } from './ResultSummary'
import { TotalCostsBreakdown } from './TotalCostsBreakdown'
import { PerParticipantCosts } from './PerParticipantCosts'
import { GuestShareCalculation } from './GuestShareCalculation'
import { calculateCosts } from '@/lib/calculations'
import type { Settings, Stay } from '@/types'

interface CalculatorProps {
  settings: Settings
  stay: Stay
  onStayChange: (stay: Stay) => void
}

export function Calculator({ settings, stay, onStayChange }: CalculatorProps) {
  const costs = useMemo(() => calculateCosts(settings, stay), [settings, stay])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StayDetails settings={settings} stay={stay} onStayChange={onStayChange} />
        <PersonsList stay={stay} onStayChange={onStayChange} />
      </div>

      {costs.guestCount > 0 && (
        <>
          <ResultSummary costs={costs} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TotalCostsBreakdown costs={costs} stay={stay} settings={settings} />
            <PerParticipantCosts costs={costs} />
            <GuestShareCalculation costs={costs} />
          </div>
        </>
      )}

      {costs.guestCount === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Keine Gäste vorhanden.</p>
          <p className="text-sm">Fügen Sie Personen hinzu und markieren Sie mindestens eine Person als Gast (nicht Eigentümer).</p>
        </div>
      )}
    </div>
  )
}
