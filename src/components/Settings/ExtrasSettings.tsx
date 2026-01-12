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
    const numValue = parseFloat(value) || 0
    onSettingsChange({
      ...settings,
      extras: {
        ...settings.extras,
        [field]: numValue,
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Zusatzkosten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="touristTax">Kurtaxe</Label>
            <div className="flex items-center gap-2">
              <Input
                id="touristTax"
                type="number"
                min={0}
                step={0.5}
                value={settings.extras.touristTax}
                onChange={(e) => handleChange('touristTax', e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm whitespace-nowrap">pro Person/Tag</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="laundryPackage">Wäschepaket</Label>
            <div className="flex items-center gap-2">
              <Input
                id="laundryPackage"
                type="number"
                min={0}
                step={1}
                value={settings.extras.laundryPackage}
                onChange={(e) => handleChange('laundryPackage', e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm whitespace-nowrap">pro Person</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finalCleaning">Endreinigung</Label>
            <div className="flex items-center gap-2">
              <Input
                id="finalCleaning"
                type="number"
                min={0}
                step={5}
                value={settings.extras.finalCleaning}
                onChange={(e) => handleChange('finalCleaning', e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground text-sm whitespace-nowrap">pauschal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
