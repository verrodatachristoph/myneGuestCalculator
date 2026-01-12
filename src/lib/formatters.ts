export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function formatPercent(decimal: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(decimal)
}
