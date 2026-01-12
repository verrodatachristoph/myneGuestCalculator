import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { Settings, MultiplierKey } from '@/types'
import { MULTIPLIER_LABELS } from '@/lib/constants'

interface MultiplierSettingsProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

const MULTIPLIER_KEYS: MultiplierKey[] = [
  'withMeFamily',
  'withMeFriends',
  'withoutMeFamily',
  'withoutMeFriends',
]

export function MultiplierSettings({ settings, onSettingsChange }: MultiplierSettingsProps) {
  const handleChange = (key: MultiplierKey, value: string) => {
    onSettingsChange({
      ...settings,
      multipliers: { ...settings.multipliers, [key]: (parseFloat(value) || 0) / 100 },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multiplikatoren</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500 mb-4">
          Anteil der Miete und Reinigung, den Gäste zahlen
        </p>
        <div className="grid grid-cols-2 gap-4">
          {MULTIPLIER_KEYS.map((key) => (
            <div key={key}>
              <Label>{MULTIPLIER_LABELS[key]}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step={5}
                  value={Math.round(settings.multipliers[key] * 100)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
                <span className="text-sm text-slate-400">%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
