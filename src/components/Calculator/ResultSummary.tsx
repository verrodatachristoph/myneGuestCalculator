import { useState } from 'react'
import { jsPDF } from 'jspdf'
import type { CostBreakdown, Stay } from '@/types'
import { formatCurrency } from '@/lib/formatters'

interface ResultSummaryProps {
  costs: CostBreakdown
  stay: Stay
  onStayChange: (stay: Stay) => void
}

function formatDateGerman(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function ResultSummary({ costs, stay, onStayChange }: ResultSummaryProps) {
  const [copied, setCopied] = useState(false)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStayChange({ ...stay, guestSharePercent: Number(e.target.value) })
  }

  const setPercent = (value: number) => {
    onStayChange({ ...stay, guestSharePercent: value })
  }

  const setProfit = (value: number) => {
    onStayChange({ ...stay, profitMargin: value })
  }

  const getShareMessage = () => {
    const guestNames = stay.persons.filter(p => !p.isOwner).map(p => p.name).join(', ')

    return `Abrechnung Urlaub

Reisezeitraum
Anreise: ${formatDateGerman(stay.checkIn)}
Abreise: ${formatDateGerman(stay.checkOut)}
Nächte: ${costs.nights}

Gäste
${guestNames || 'Keine Gäste'}
Anzahl: ${costs.guestCount}

Kosten pro Gast
Mietanteil: ${formatCurrency(costs.guestRentShare)}
Kurtaxe: ${formatCurrency(costs.guestTouristTax)}
Wäschepaket: ${formatCurrency(costs.guestLaundry)}
Reinigung: ${formatCurrency(costs.guestCleaningShare)}

Gesamt pro Person: ${formatCurrency(costs.perGuest)}

Bitte überweise deinen Anteil per PayPal. Danke!`
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareMessage())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = getShareMessage()
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareWhatsApp = () => {
    const message = getShareMessage().replace(/\n/g, '\n')
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShareEmail = () => {
    const subject = 'Abrechnung Urlaub'
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(getShareMessage())}`
    window.open(mailtoUrl, '_blank')
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const guestNames = stay.persons.filter(p => !p.isOwner).map(p => p.name)

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Abrechnung Urlaub', 20, 25)

    // Subtitle
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text('Alpine Terrace - Brixen im Thale', 20, 33)
    doc.setTextColor(0)

    // Line
    doc.setDrawColor(200)
    doc.line(20, 38, 190, 38)

    let y = 50

    // Travel period
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Reisezeitraum', 20, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Anreise: ${formatDateGerman(stay.checkIn)}`, 20, y)
    y += 6
    doc.text(`Abreise: ${formatDateGerman(stay.checkOut)}`, 20, y)
    y += 6
    doc.text(`Nächte: ${costs.nights}`, 20, y)
    y += 12

    // Guests
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Gäste', 20, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    if (guestNames.length > 0) {
      guestNames.forEach(name => {
        doc.text(`• ${name}`, 20, y)
        y += 6
      })
    } else {
      doc.text('Keine Gäste', 20, y)
      y += 6
    }
    y += 6

    // Cost breakdown
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Kosten pro Gast', 20, y)
    y += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)

    const costItems = [
      ['Mietanteil', formatCurrency(costs.guestRentShare)],
      ['Kurtaxe', formatCurrency(costs.guestTouristTax)],
      ['Wäschepaket', formatCurrency(costs.guestLaundry)],
      ['Reinigung', formatCurrency(costs.guestCleaningShare)],
    ]

    costItems.forEach(([label, value]) => {
      doc.text(label, 20, y)
      doc.text(value, 80, y)
      y += 6
    })

    y += 4
    doc.setDrawColor(200)
    doc.line(20, y, 100, y)
    y += 8

    // Total
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.text('Gesamt pro Gast:', 20, y)
    doc.text(formatCurrency(costs.perGuest), 80, y)
    y += 12

    // Per night
    if (costs.nights > 0) {
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text(`(${formatCurrency(costs.perGuest / costs.nights)} pro Nacht)`, 20, y)
      doc.setTextColor(0)
    }

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text('Erstellt mit MYNE Kostenverteiler', 20, 280)

    // Save
    const fileName = `Abrechnung_${formatDateGerman(stay.checkIn).replace(/\./g, '-')}.pdf`
    doc.save(fileName)
  }

  const ownerShare = costs.totalCost - costs.guestTotal
  const profitMargin = stay.profitMargin || 0

  return (
    <div className="bg-gradient-to-br from-primary/10 to-card rounded-2xl p-4 sm:p-8 border border-primary/20 shadow-lg text-foreground">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-foreground">Gästeanteil</label>
          <span className="px-2 sm:px-3 py-1 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium">
            {stay.guestSharePercent}%{profitMargin > 0 && ` +${profitMargin}%`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={stay.guestSharePercent}
          onChange={handleSliderChange}
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs mt-1">
          <button
            type="button"
            onClick={() => setPercent(0)}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            0%
          </button>
          <button
            type="button"
            onClick={() => setPercent(100)}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            100%
          </button>
          <button
            type="button"
            onClick={() => setPercent(200)}
            className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            200%
          </button>
        </div>
        <div className="flex gap-1.5 sm:gap-2 mt-3">
          <button
            type="button"
            onClick={() => setProfit(0)}
            className={`flex-1 py-1.5 px-2 sm:px-3 text-[10px] sm:text-xs font-medium rounded-md transition-colors ${
              profitMargin === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Kein Gewinn
          </button>
          <button
            type="button"
            onClick={() => setProfit(50)}
            className={`flex-1 py-1.5 px-2 sm:px-3 text-[10px] sm:text-xs font-medium rounded-md transition-colors ${
              profitMargin === 50
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            +50%
          </button>
          <button
            type="button"
            onClick={() => setProfit(100)}
            className={`flex-1 py-1.5 px-2 sm:px-3 text-[10px] sm:text-xs font-medium rounded-md transition-colors ${
              profitMargin === 100
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            +100%
          </button>
        </div>
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <p className="text-muted-foreground text-sm mb-1 sm:mb-2">Beitrag pro Gast</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight text-accent">{formatCurrency(costs.perGuest)}</p>
        {costs.nights > 0 && (
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">
            {formatCurrency(costs.perGuest / costs.nights)} pro Nacht
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
        <div>
          <p className="text-muted-foreground text-xs sm:text-sm">Gesamtkosten</p>
          <p className="text-base sm:text-xl font-semibold">{formatCurrency(costs.totalCost)}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs sm:text-sm">Gäste zahlen</p>
          <p className="text-base sm:text-xl font-semibold text-primary">{formatCurrency(costs.guestTotal)}</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs sm:text-sm">{ownerShare < 0 ? 'Mein Gewinn' : 'Mein Anteil'}</p>
          <p className={`text-base sm:text-xl font-semibold ${ownerShare < 0 ? 'text-green-500' : ''}`}>
            {formatCurrency(Math.abs(ownerShare))}
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 text-center">Abrechnung teilen</p>
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleCopyToClipboard}
            className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              copied
                ? 'bg-green-500/20 text-green-500'
                : 'bg-secondary hover:bg-secondary/80 text-foreground'
            }`}
            title="In Zwischenablage kopieren"
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            <span className="hidden sm:inline">{copied ? 'Kopiert!' : 'Kopieren'}</span>
          </button>
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-medium rounded-lg transition-colors"
            title="Per WhatsApp teilen"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={handleShareEmail}
            className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-medium rounded-lg transition-colors"
            title="Per E-Mail teilen"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">E-Mail</span>
          </button>
          <button
            type="button"
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-3 bg-secondary hover:bg-secondary/80 text-foreground text-xs sm:text-sm font-medium rounded-lg transition-colors"
            title="Als PDF exportieren"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>
    </div>
  )
}
