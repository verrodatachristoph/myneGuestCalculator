import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface HelpSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function HelpSection({ title, children, defaultOpen = false }: HelpSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 sm:py-4 text-left text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
      >
        <span className="pr-2">{title}</span>
        <svg
          className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pb-4 text-xs sm:text-sm text-muted-foreground space-y-2">{children}</div>}
    </div>
  )
}

export function Help() {
  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="flex items-start sm:items-center gap-2 text-amber-500 text-sm sm:text-base">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Wichtiger Hinweis zum Saisonkalender</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground text-sm sm:text-base font-medium mb-2">
            Der hinterlegte Saisonkalender gilt ausschließlich für:
          </p>
          <p className="text-base sm:text-lg font-bold text-primary mb-4">
            "Alpine Terrace - Brixen im Thale" (2026/2027)
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm mb-3">
            Wenn du dieses Tool für eine andere MYNE-Immobilie nutzen möchtest, musst du
            <strong className="text-foreground"> zwingend den Saisonkalender anpassen</strong>.
            Die Saisonzeiten und Preise variieren je nach Immobilie und Jahr erheblich!
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Die Saisonpläne erhältst du von MYNE oder findest sie in deinem Eigentümerportal.
            Anpassung in: <code className="bg-secondary px-1 rounded text-[10px] sm:text-xs break-all">src/lib/seasonCalendar.ts</code>
          </p>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Hilfe & Erklärungen</CardTitle>
        </CardHeader>
        <CardContent>
          <HelpSection title="Was macht dieses Tool?" defaultOpen>
            <p>
              Der MYNE Kostenverteiler hilft dir, die Kosten eines Ferienaufenthalts fair zwischen
              Eigentümern und Gästen aufzuteilen. Er berücksichtigt dabei:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Die saisonabhängigen Mietpreise deiner Immobilie</li>
              <li>Kurtaxe pro Person und Nacht</li>
              <li>Wäschepakete pro Person</li>
              <li>Die pauschale Endreinigung</li>
            </ul>
          </HelpSection>

          <HelpSection title="Wie funktioniert die Kostenberechnung?">
            <p className="font-medium text-foreground">1. Bruttomiete</p>
            <p>Die Bruttomiete wird basierend auf dem Saisonkalender berechnet. Jede Nacht wird der entsprechenden Saison zugeordnet und mit dem jeweiligen Preis multipliziert.</p>

            <p className="font-medium text-foreground mt-3">2. Mietkosten (10% MwSt)</p>
            <p>
              Nach österreichischem Steuerrecht für Ferienimmobilien gelten nur 10% der Bruttomiete als "echte Kosten",
              die auf die Teilnehmer umgelegt werden. Die restlichen 90% fließen an MYNE/den Eigentümer.
            </p>

            <p className="font-medium text-foreground mt-3">3. Zusatzkosten</p>
            <p>Kurtaxe, Wäschepaket und Endreinigung werden vollständig auf alle Teilnehmer umgelegt.</p>
          </HelpSection>

          <HelpSection title="Was bedeutet der Gästeanteil-Slider (0-200%)?">
            <p>Der Slider bestimmt, wie viel Prozent ihres fairen Anteils die Gäste zahlen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>0%</strong> - Gäste zahlen nichts (z.B. bei Einladungen)</li>
              <li><strong>50%</strong> - Gäste zahlen die Hälfte ihres Anteils</li>
              <li><strong>100%</strong> - Faire Aufteilung: Jeder zahlt seinen Anteil</li>
              <li><strong>150%</strong> - Gäste zahlen etwas mehr, z.B. als Ausgleich für Eigentümer-Organisation</li>
              <li><strong>200%</strong> - Gäste zahlen das Doppelte ihres Anteils</li>
            </ul>
          </HelpSection>

          <HelpSection title="Was ist der Gewinnaufschlag?">
            <p>
              Der Gewinnaufschlag wird <strong>zusätzlich</strong> zum Slider-Wert berechnet und ermöglicht es,
              mit der Vermietung an Gäste einen Gewinn zu erzielen:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Kein Gewinn</strong> - Nur der Slider-Wert wird angewendet</li>
              <li><strong>+50% Gewinn</strong> - 50 Prozentpunkte werden auf den Slider addiert</li>
              <li><strong>+100% Gewinn</strong> - 100 Prozentpunkte werden auf den Slider addiert</li>
            </ul>
            <p className="mt-2">
              <strong>Beispiel:</strong> Bei 200% Gästeanteil + 100% Gewinn zahlen Gäste effektiv 300% ihres fairen Anteils.
              Dein Anteil wird dann negativ angezeigt = dein Gewinn!
            </p>
          </HelpSection>

          <HelpSection title="Was bedeuten Eigentümer und Gäste?">
            <p>
              <strong>Eigentümer</strong> sind Personen, die an der Immobilie beteiligt sind.
              Sie werden bei der Berechnung des "fairen Anteils" berücksichtigt, zahlen aber nicht den Gästepreis.
            </p>
            <p className="mt-2">
              <strong>Gäste</strong> sind eingeladene Personen, die den berechneten Gästebeitrag zahlen sollen.
            </p>
            <p className="mt-2">
              <strong>Beispiel:</strong> 2 Eigentümer + 2 Gäste = 4 Personen gesamt.
              Bei fairer Aufteilung (100%) zahlt jeder Gast 1/4 der Gesamtkosten.
            </p>
          </HelpSection>

          <HelpSection title="Wie teile ich die Abrechnung?">
            <p>Am Ende der Berechnung findest du drei Teilen-Optionen:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Kopieren</strong> - Kopiert die Abrechnung in die Zwischenablage</li>
              <li><strong>WhatsApp</strong> - Öffnet WhatsApp mit vorausgefüllter Nachricht</li>
              <li><strong>E-Mail</strong> - Öffnet dein E-Mail-Programm mit vorausgefülltem Text</li>
            </ul>
          </HelpSection>

          <HelpSection title="Was bedeutet 'pro Nacht' unter dem Gastbeitrag?">
            <p>
              Dieser Wert zeigt, wie viel ein Gast pro Nacht zahlt. Das ist praktisch zum Vergleich
              mit Hotelpreisen - oft ist ein MYNE-Aufenthalt deutlich günstiger!
            </p>
          </HelpSection>

          <HelpSection title="Wo werden meine Einstellungen gespeichert?">
            <p>
              Alle Einstellungen (Saisonpreise, Zusatzkosten) werden lokal in deinem Browser gespeichert.
              Sie bleiben auch nach dem Schließen des Browsers erhalten, werden aber nicht mit anderen
              Geräten synchronisiert.
            </p>
          </HelpSection>
        </CardContent>
      </Card>

      {/* Technical Info */}
      <Card>
        <CardHeader>
          <CardTitle>Für Entwickler</CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm text-muted-foreground space-y-3">
          <p>
            Dieses Tool ist Open Source. Der Quellcode ist auf GitHub verfügbar.
          </p>
          <p>
            <strong className="text-foreground">Saisonkalender anpassen:</strong><br />
            Bearbeite <code className="bg-secondary px-1 rounded text-[10px] sm:text-xs break-all">src/lib/seasonCalendar.ts</code> und füge die
            Saisonperioden deiner Immobilie hinzu.
          </p>
          <p>
            <strong className="text-foreground">Standardpreise anpassen:</strong><br />
            Bearbeite <code className="bg-secondary px-1 rounded text-[10px] sm:text-xs break-all">src/lib/constants.ts</code> um die
            Default-Werte zu ändern.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
