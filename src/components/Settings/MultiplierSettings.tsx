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
    const percent = parseFloat(value) || 0
    onSettingsChange({
      ...settings,
      multipliers: {
        ...settings.multipliers,
        [key]: percent / 100,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multiplikatoren</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Anteil der Miete und Reinigung, den Gäste zahlen (Kurtaxe und Wäsche immer 100%)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MULTIPLIER_KEYS.map((key) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`multiplier-${key}`}>{MULTIPLIER_LABELS[key]}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`multiplier-${key}`}
                  type="number"
                  min={0}
                  max={100}
                  step={5}
                  value={Math.round(settings.multipliers[key] * 100)}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground text-sm">%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
