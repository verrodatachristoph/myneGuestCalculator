import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Select, SelectOption } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { Settings, Stay, SeasonType, GuestType } from '@/types'
import { SEASON_ORDER } from '@/lib/constants'
import { formatCurrency } from '@/lib/formatters'

interface StayDetailsProps {
  settings: Settings
  stay: Stay
  onStayChange: (stay: Stay) => void
}

export function StayDetails({ settings, stay, onStayChange }: StayDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufenthalt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Saison</Label>
            <Select
              value={stay.season}
              onChange={(e) => onStayChange({ ...stay, season: e.target.value as SeasonType })}
            >
              {SEASON_ORDER.map(({ key }) => (
                <SelectOption key={key} value={key}>
                  {settings.seasons[key].name} ({formatCurrency(settings.seasons[key].pricePerNight)})
                </SelectOption>
              ))}
            </Select>
          </div>

          <div>
            <Label>Nächte</Label>
            <Input
              type="number"
              min={1}
              value={stay.nights}
              onChange={(e) => onStayChange({ ...stay, nights: Math.max(1, parseInt(e.target.value) || 1) })}
            />
          </div>

          <div>
            <Label>Bin ich dabei?</Label>
            <Select
              value={stay.withOwner ? 'yes' : 'no'}
              onChange={(e) => onStayChange({ ...stay, withOwner: e.target.value === 'yes' })}
            >
              <SelectOption value="yes">Ja</SelectOption>
              <SelectOption value="no">Nein</SelectOption>
            </Select>
          </div>

          <div>
            <Label>Gäste sind...</Label>
            <Select
              value={stay.guestType}
              onChange={(e) => onStayChange({ ...stay, guestType: e.target.value as GuestType })}
            >
              <SelectOption value="family">Familie</SelectOption>
              <SelectOption value="friends">Freunde</SelectOption>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
