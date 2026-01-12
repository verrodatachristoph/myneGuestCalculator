import { Button } from '@/components/ui/Button'
import { SeasonSettings } from './SeasonSettings'
import { ExtrasSettings } from './ExtrasSettings'
import { MultiplierSettings } from './MultiplierSettings'
import type { Settings as SettingsType } from '@/types'
import { DEFAULT_SETTINGS } from '@/lib/constants'

interface SettingsProps {
  settings: SettingsType
  onSettingsChange: (settings: SettingsType) => void
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  const handleReset = () => {
    if (confirm('Einstellungen auf Standardwerte zurücksetzen?')) {
      onSettingsChange(DEFAULT_SETTINGS)
    }
  }

  return (
    <div className="space-y-6">
      <SeasonSettings settings={settings} onSettingsChange={onSettingsChange} />
      <ExtrasSettings settings={settings} onSettingsChange={onSettingsChange} />
      <MultiplierSettings settings={settings} onSettingsChange={onSettingsChange} />

      <div className="flex justify-end">
        <Button variant="secondary" onClick={handleReset}>
          Auf Standardwerte zurücksetzen
        </Button>
      </div>
    </div>
  )
}
