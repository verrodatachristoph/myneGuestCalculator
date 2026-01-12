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
    onSettingsChange({
      ...settings,
      seasons: {
        ...settings.seasons,
        [season]: { ...settings.seasons[season], pricePerNight: parseFloat(value) || 0 },
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saisonpreise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {SEASON_ORDER.map(({ key }) => (
            <div key={key}>
              <Label>{settings.seasons[key].name}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  value={settings.seasons[key].pricePerNight}
                  onChange={(e) => handlePriceChange(key, e.target.value)}
                />
                <span className="text-sm text-slate-400 whitespace-nowrap">/ Nacht</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
