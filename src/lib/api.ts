import type { Settings } from '@/types'

export async function loadSettings(): Promise<Settings | null> {
  // In development, skip API (Vercel functions not available locally)
  if (import.meta.env.DEV) return null

  try {
    const response = await fetch('/api/settings')
    if (!response.ok) return null
    return await response.json()
  } catch {
    // API not available - silently fall back to localStorage
    return null
  }
}

export async function saveSettings(settings: Settings): Promise<boolean> {
  // In development, skip API (Vercel functions not available locally)
  if (import.meta.env.DEV) return false

  try {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })
    return response.ok
  } catch {
    // API not available - silently fall back to localStorage
    return false
  }
}
