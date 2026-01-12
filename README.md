# Kostenverteiler - Alpine Terrace

Ein Kostenverteilungs-Tool für MYNE-Ferienimmobilien, das eine faire Aufteilung der Urlaubskosten zwischen Eigentümern und Gästen ermöglicht.

**Live-Demo**: [kostenverteiler.vercel.app](https://kostenverteiler.vercel.app) *(URL anpassen)*

---

## Wichtiger Hinweis

> **Der hinterlegte Saisonkalender gilt ausschließlich für die Immobilie "Alpine Terrace - Brixen im Thale" (Saisonpläne 2026/2027).**
>
> **Wenn du dieses Tool für eine andere MYNE-Immobilie nutzen möchtest, musst du ZWINGEND den Saisonkalender anpassen!**
>
> Die Saisonzeiten und Preise variieren je nach Immobilie und Jahr erheblich. Eine falsche Konfiguration führt zu falschen Berechnungen!

## Features

- **Saisonbasierte Berechnung**: Automatische Erkennung der Saison (Spitzen-, Haupt-, Zwischen-, Nebensaison) basierend auf dem Reisezeitraum
- **Flexible Kostenverteilung**: Gästeanteil von 0% bis 200% einstellbar
- **Gewinnaufschlag**: Optionaler Aufschlag von +50% oder +100% auf den Gästeanteil
- **Personenverwaltung**: Beliebig viele Personen hinzufügen, als Eigentümer oder Gast markieren
- **Detaillierte Kostenaufschlüsselung**: Miete, Kurtaxe, Wäschepaket, Endreinigung
- **Teilen-Funktion**: Abrechnung per WhatsApp, E-Mail oder Zwischenablage teilen
- **Dark/Light Mode**: Automatische Erkennung der Systemeinstellung oder manueller Wechsel
- **Integrierte Hilfe**: Ausführliche Erklärungen aller Funktionen direkt in der App
- **Responsive Design**: Optimiert für Desktop und Mobile

## Kostenberechnung

### Grundprinzip

Die Berechnung basiert auf dem österreichischen Steuerrecht für Ferienimmobilien:

1. **Bruttomiete**: Saisonpreis × Anzahl Nächte
2. **Mietkosten**: Nur 10% MwSt der Bruttomiete gelten als "echte Kosten" für die Verteilung
3. **Zusatzkosten**: Kurtaxe, Wäschepaket und Endreinigung werden vollständig umgelegt

### Gästeanteil-Slider (0-200%)

- **0%**: Gäste zahlen nichts (Eigentümer trägt alles)
- **100%**: Gäste zahlen ihren fairen Anteil (Kosten / Anzahl Personen)
- **200%**: Gäste zahlen das Doppelte ihres Anteils

### Gewinnaufschlag

Der Gewinnaufschlag wird zusätzlich zum Slider-Wert berechnet:
- Bei 200% Gästeanteil + 100% Gewinn = 300% effektiver Gästeanteil
- Dies ermöglicht es, mit der Vermietung an Gäste Gewinn zu erzielen

## Installation

```bash
# Repository klonen
git clone https://github.com/YOUR_USERNAME/myne-kostenverteiler.git
cd myne-kostenverteiler

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

## Konfiguration

### Saisonkalender anpassen

**Dies ist der wichtigste Schritt!** Öffne `src/lib/seasonCalendar.ts` und passe die Saisonperioden für deine Immobilie an:

```typescript
const SEASON_PERIODS_2026: SeasonPeriod[] = [
  // Spitzensaison (Peak)
  { start: '2026-01-01', end: '2026-01-05', season: 'peak' },
  // ... weitere Perioden

  // Hauptsaison (High)
  { start: '2026-01-06', end: '2026-04-02', season: 'high' },
  // ... weitere Perioden
]
```

Die Saisonpläne erhältst du von MYNE oder findest sie in deinem Eigentümerportal.

### Saisonpreise anpassen

In `src/lib/constants.ts` kannst du die Preise pro Nacht für jede Saison anpassen:

```typescript
export const DEFAULT_SETTINGS: Settings = {
  seasons: {
    peak: { name: 'Spitzensaison', pricePerNight: 250 },
    high: { name: 'Hauptsaison', pricePerNight: 199 },
    mid: { name: 'Zwischensaison', pricePerNight: 173 },
    low: { name: 'Nebensaison', pricePerNight: 107 },
  },
  extras: {
    touristTax: 3.5,      // Kurtaxe pro Person/Nacht
    laundryPackage: 15,   // Wäschepaket pro Person
    finalCleaning: 95,    // Endreinigung pauschal
  },
}
```

## Tech Stack

- **React 18** mit TypeScript
- **Vite** als Build-Tool
- **Tailwind CSS** für Styling
- **localStorage** für Persistenz der Einstellungen

## Projektstruktur

```
src/
├── components/
│   ├── Calculator/     # Rechner-Komponenten
│   ├── Settings/       # Einstellungen-Komponenten
│   └── ui/             # Wiederverwendbare UI-Komponenten
├── hooks/              # Custom React Hooks
├── lib/                # Utilities, Berechnungen, Konstanten
└── types/              # TypeScript Type-Definitionen
```

## Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## Autor

Entwickelt von Christoph Ludwig (MYNE Property Owner)

---

**Hinweis**: Dieses Tool ist ein privates Projekt und steht in keiner offiziellen Verbindung zu MYNE.
