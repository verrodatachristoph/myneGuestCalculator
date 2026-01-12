import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { Settings } from '@/types'

interface ExtrasSettingsProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export function ExtrasSettings({ settings, onSettingsChange }: ExtrasSettingsProps) {
  const handleChange = (field: keyof Settings['extras'], value: string) => {
    onSettingsChange({
      ...settings,
      extras: { ...settings.extras, [field]: parseFloat(value) || 0 },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zusatzkosten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="text-xs sm:text-sm">Kurtaxe</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                step={0.5}
                value={settings.extras.touristTax}
                onChange={(e) => handleChange('touristTax', e.target.value)}
              />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">€/Pers./Tag</span>
            </div>
          </div>

          <div>
            <Label className="text-xs sm:text-sm">Wäschepaket</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                value={settings.extras.laundryPackage}
                onChange={(e) => handleChange('laundryPackage', e.target.value)}
              />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">€/Person</span>
            </div>
          </div>

          <div>
            <Label className="text-xs sm:text-sm">Endreinigung</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                value={settings.extras.finalCleaning}
                onChange={(e) => handleChange('finalCleaning', e.target.value)}
              />
              <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">€ pauschal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
