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
    onStayChange({
      ...stay,
      persons: [...stay.persons, newPerson],
    })
  }

  const removePerson = (id: string) => {
    if (stay.persons.length <= 1) return
    onStayChange({
      ...stay,
      persons: stay.persons.filter((p) => p.id !== id),
    })
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
        <CardTitle>Personen ({stay.persons.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stay.persons.map((person) => (
            <div key={person.id} className="flex items-center gap-3">
              <Input
                value={person.name}
                onChange={(e) => updatePerson(person.id, { name: e.target.value })}
                placeholder="Name"
                className="flex-1"
              />
              <label className="flex items-center gap-2 text-sm text-ocean whitespace-nowrap cursor-pointer">
                <input
                  type="checkbox"
                  checked={person.isOwner}
                  onChange={(e) => updatePerson(person.id, { isOwner: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-ocean focus:ring-beach"
                />
                Eigentümer
              </label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePerson(person.id)}
                disabled={stay.persons.length <= 1}
                className="text-myne-red hover:text-myne-red hover:bg-red-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Button variant="outline" onClick={addPerson}>
            + Person hinzufügen
          </Button>
          <span className="text-sm text-gray-500">
            {ownerCount} Eigentümer, {guestCount} Gäste
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
