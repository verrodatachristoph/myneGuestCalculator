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

      {costs.guestCount > 0 ? (
        <>
          <ResultSummary costs={costs} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TotalCostsBreakdown costs={costs} stay={stay} settings={settings} />
            <PerParticipantCosts costs={costs} />
            <GuestShareCalculation costs={costs} />
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="text-slate-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">Keine Gäste vorhanden</p>
          <p className="text-slate-400 text-sm mt-1">Füge Personen hinzu und markiere mindestens eine als Gast</p>
        </div>
      )}
    </div>
  )
}
