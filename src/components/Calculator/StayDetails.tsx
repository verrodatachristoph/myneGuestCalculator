import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectOption } from '@/components/ui/Select'
import type { Settings, Stay, SeasonType, GuestType } from '@/types'
import { SEASON_ORDER } from '@/lib/constants'
import { formatCurrency } from '@/lib/formatters'

interface StayDetailsProps {
  settings: Settings
  stay: Stay
  onStayChange: (stay: Stay) => void
}

export function StayDetails({ settings, stay, onStayChange }: StayDetailsProps) {
  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStayChange({ ...stay, season: e.target.value as SeasonType })
  }

  const handleNightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nights = parseInt(e.target.value, 10) || 1
    onStayChange({ ...stay, nights: Math.max(1, nights) })
  }

  const handleWithOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStayChange({ ...stay, withOwner: e.target.value === 'yes' })
  }

  const handleGuestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStayChange({ ...stay, guestType: e.target.value as GuestType })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufenthalt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="season">Saison</Label>
            <Select id="season" value={stay.season} onChange={handleSeasonChange}>
              {SEASON_ORDER.map(({ key }) => (
                <SelectOption key={key} value={key}>
                  {settings.seasons[key].name} ({formatCurrency(settings.seasons[key].pricePerNight)}/Nacht)
                </SelectOption>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nights">Anzahl Nächte</Label>
            <Input
              id="nights"
              type="number"
              min={1}
              value={stay.nights}
              onChange={handleNightsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="withOwner">Bin ich dabei?</Label>
            <Select id="withOwner" value={stay.withOwner ? 'yes' : 'no'} onChange={handleWithOwnerChange}>
              <SelectOption value="yes">Ja</SelectOption>
              <SelectOption value="no">Nein</SelectOption>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestType">Gäste sind...</Label>
            <Select id="guestType" value={stay.guestType} onChange={handleGuestTypeChange}>
              <SelectOption value="family">Familie</SelectOption>
              <SelectOption value="friends">Freunde</SelectOption>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
