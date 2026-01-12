import type { Settings } from '@/types'

// API URL - lokal Port 3001, auf Vercel /api
const API_URL = import.meta.env.DEV ? 'http://localhost:3001' : ''

export async function loadSettings(): Promise<Settings | null> {
  try {
    const response = await fetch(`${API_URL}/api/settings`)
    if (!response.ok) return null
    return await response.json()
  } catch {
    // API not available - silently fall back to localStorage
    return null
  }
}

export async function saveSettings(settings: Settings): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/settings`, {
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
