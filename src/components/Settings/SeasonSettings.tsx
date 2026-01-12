import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { Settings, SeasonType } from '@/types'
import { SEASON_ORDER } from '@/lib/constants'

interface SeasonSettingsProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export function SeasonSettings({ settings, onSettingsChange }: SeasonSettingsProps) {
  const handlePriceChange = (season: SeasonType, value: string) => {
    const price = parseFloat(value) || 0
    onSettingsChange({
      ...settings,
      seasons: {
        ...settings.seasons,
        [season]: {
          ...settings.seasons[season],
          pricePerNight: price,
        },
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saisonpreise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SEASON_ORDER.map(({ key }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={`season-${key}`}>{settings.seasons[key].name}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`season-${key}`}
                  type="number"
                  min={0}
                  step={1}
                  value={settings.seasons[key].pricePerNight}
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground text-sm whitespace-nowrap">pro Nacht</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
