import { SeasonSettings } from './SeasonSettings'
import { ExtrasSettings } from './ExtrasSettings'
import { SeasonCalendarView } from './SeasonCalendarView'
import type { Settings as SettingsType } from '@/types'

interface SettingsProps {
  settings: SettingsType
  onSettingsChange: (settings: SettingsType) => void
}

export function Settings({ settings, onSettingsChange }: SettingsProps) {
  return (
    <div className="space-y-6">
      <SeasonCalendarView settings={settings} />
      <SeasonSettings settings={settings} onSettingsChange={onSettingsChange} />
      <ExtrasSettings settings={settings} onSettingsChange={onSettingsChange} />
    </div>
  )
}
