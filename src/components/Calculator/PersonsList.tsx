import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { Stay, Person } from '@/types'

interface PersonsListProps {
  stay: Stay
  onStayChange: (stay: Stay) => void
}

export function PersonsList({ stay, onStayChange }: PersonsListProps) {
  const addPerson = () => {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: `Gast ${stay.persons.filter((p) => !p.isOwner).length + 1}`,
      isOwner: false,
    }
    onStayChange({ ...stay, persons: [...stay.persons, newPerson] })
  }

  const removePerson = (id: string) => {
    if (stay.persons.length <= 1) return
    onStayChange({ ...stay, persons: stay.persons.filter((p) => p.id !== id) })
  }

  const updatePerson = (id: string, updates: Partial<Person>) => {
    onStayChange({
      ...stay,
      persons: stay.persons.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })
  }

  const ownerCount = stay.persons.filter((p) => p.isOwner).length
  const guestCount = stay.persons.filter((p) => !p.isOwner).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Personen</CardTitle>
          <span className="text-sm text-muted-foreground">
            {ownerCount} Eigentümer, {guestCount} Gäste
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stay.persons.map((person) => (
            <div key={person.id} className="flex items-center gap-2 sm:gap-3">
              <Input
                value={person.name}
                onChange={(e) => updatePerson(person.id, { name: e.target.value })}
                placeholder="Name"
                className="flex-1 min-w-0"
              />
              <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none flex-shrink-0">
                <input
                  type="checkbox"
                  checked={person.isOwner}
                  onChange={(e) => updatePerson(person.id, { isOwner: e.target.checked })}
                  className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-ring"
                />
                <span className="text-xs sm:text-sm text-muted-foreground">Eigent.</span>
              </label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePerson(person.id)}
                disabled={stay.persons.length <= 1}
                className="flex-shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </Button>
            </div>
          ))}
        </div>

        <Button variant="secondary" onClick={addPerson} className="mt-4 w-full">
          + Person hinzufügen
        </Button>
      </CardContent>
    </Card>
  )
}
